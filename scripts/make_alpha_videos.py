#!/usr/bin/env python3
"""Create transparent WebM versions of the Ink & Memory character videos.

The source MP4s have black backgrounds, but the character itself contains black
details. A simple color key would punch holes in the face/hair/bag. This script
only removes near-black regions connected to the frame border, preserving dark
details inside the foreground character.
"""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

import cv2
import numpy as np


def connected_edge_background(near_black: np.ndarray) -> np.ndarray:
    """Return near-black pixels that are connected to any image edge."""
    count, labels = cv2.connectedComponents(near_black.astype(np.uint8), connectivity=8)
    if count <= 1:
        return np.zeros_like(near_black, dtype=bool)

    edge_labels = np.unique(
        np.concatenate(
            [
                labels[0, :],
                labels[-1, :],
                labels[:, 0],
                labels[:, -1],
            ]
        )
    )
    edge_labels = edge_labels[edge_labels != 0]
    if not len(edge_labels):
        return np.zeros_like(near_black, dtype=bool)

    return np.isin(labels, edge_labels)


def process_video(source: Path, target: Path, threshold: int, crf: int) -> None:
    cap = cv2.VideoCapture(str(source))
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open {source}")

    fps = cap.get(cv2.CAP_PROP_FPS) or 24
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))

    target.parent.mkdir(parents=True, exist_ok=True)
    command = [
        "ffmpeg",
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgba",
        "-s",
        f"{width}x{height}",
        "-r",
        f"{fps:.6f}",
        "-i",
        "-",
        "-an",
        "-c:v",
        "libvpx-vp9",
        "-pix_fmt",
        "yuva420p",
        "-auto-alt-ref",
        "0",
        "-b:v",
        "0",
        "-crf",
        str(crf),
        str(target),
    ]

    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    if process.stdin is None:
        raise RuntimeError("ffmpeg stdin is unavailable")

    frame_count = 0
    try:
        while True:
            ok, frame_bgr = cap.read()
            if not ok:
                break

            near_black = np.max(frame_bgr, axis=2) < threshold
            background = connected_edge_background(near_black)
            background = cv2.dilate(background.astype(np.uint8), kernel, iterations=1)
            alpha = ((1 - background) * 255).astype(np.uint8)
            alpha = cv2.GaussianBlur(alpha, (5, 5), 0)

            frame_rgba = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGBA)
            frame_rgba[:, :, 3] = alpha
            process.stdin.write(frame_rgba.tobytes())
            frame_count += 1
    finally:
        cap.release()
        process.stdin.close()

    return_code = process.wait()
    if return_code:
        raise RuntimeError(f"ffmpeg failed for {source} with exit code {return_code}")

    print(f"{source.name} -> {target.name} ({frame_count} frames)")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--threshold", type=int, default=46)
    parser.add_argument("--crf", type=int, default=30)
    parser.add_argument("videos", nargs="*", default=[f"assets/video-{i}.mp4" for i in range(1, 6)])
    args = parser.parse_args()

    for video in args.videos:
        source = Path(video)
        target = source.with_name(f"{source.stem}-alpha.webm")
        process_video(source, target, threshold=args.threshold, crf=args.crf)


if __name__ == "__main__":
    main()
