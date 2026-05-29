import { ReactNode } from 'react';

export function GhostButton({ children, onClick, className = "" }: { children: ReactNode, onClick?: () => void, className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-transparent text-paper-white border-[3px] border-paper-white rounded-buttons text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] px-4 py-2 hover:bg-paper-white/10 transition-colors cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export function SpeechBubble({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-paper-white text-type-black rounded-[48px] md:rounded-speechbubbles px-6 py-5 md:px-[43.2px] md:py-[28.8px] shadow-subtle ${className}`}>
      {children}
    </div>
  );
}

export function QuirkyCard({ children, bg = "bg-grape-punch", className = "" }: { children: ReactNode, bg?: string, className?: string }) {
  return (
    <div className={`${bg} rounded-cards p-5 md:p-[29px] ${className}`}>
      {children}
    </div>
  );
}

export function ColorfulRoundCard({ children, bg = "bg-leafy-green", className = "" }: { children: ReactNode, bg?: string, className?: string }) {
  return (
    <div className={`${bg} rounded-[100%] flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export function Section({ children, bg, className = "" }: { children: ReactNode, bg?: string, className?: string }) {
  return (
    <section className={`${bg ? bg : ''} w-full py-12 md:py-[60px] lg:py-[108px] px-4 md:px-8 lg:px-[108px] flex flex-col gap-8 md:gap-[30px] overflow-hidden ${className}`}>
      {children}
    </section>
  );
}
