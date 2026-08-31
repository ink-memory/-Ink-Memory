import {aiWritingArticle} from './articles/aiWriting';
import {agentWorkspaceConnectorsEnArticle} from './articles/agentWorkspaceConnectorsEn';
import {agentWorkspaceConnectorsZhArticle} from './articles/agentWorkspaceConnectorsZh';
import {workspaceArticle} from './articles/workspace';

export const blogArticles = [
  aiWritingArticle,
  workspaceArticle,
  agentWorkspaceConnectorsZhArticle,
  agentWorkspaceConnectorsEnArticle,
].sort((articleA, articleB) => articleB.publishedAt.localeCompare(articleA.publishedAt));
