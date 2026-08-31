import type {BlogArticle, BlogInlinePart} from '../types';

const link = (text: string, href: string): BlogInlinePart => ({kind: 'link', text, href});

const imageRoot = '/blog/agent-workspace-connectors-en';

export const agentWorkspaceConnectorsEnArticle: BlogArticle = {
  slug: 'connectors-in-agent-workspace-state-trust-action-boundaries-en',
  title: 'Lecture Notes | When Connectors Enter the Agent Workspace: Boundaries of State, Trust, and Action',
  author: 'glide the',
  language: 'English',
  source: 'Ink & Memory',
  summary:
    'A product and systems design essay on what changes when connectors enter an Agent workspace: which state persists, how users can verify trust, and when proposed actions may safely become real changes.',
  tags: ['Agent workspace', 'Connectors', 'Interaction design'],
  publishedAt: '2026-08-31',
  readTime: '20 min read',
  accent: 'green',
  coverImage: {
    src: `${imageRoot}/01-workspace-as-subject.png`,
    alt: 'The workspace is the subject, connectors provide resources, and the Runtime handles the current execution',
    width: 1672,
    height: 941,
  },
  content: [
    {
      type: 'paragraph',
      content:
        'I have been wanting to write a design document about synchronizing interactions between connectors and workspaces, extending the state-management abstraction previously used for a local Agent’s context.',
    },
    {
      type: 'paragraph',
      content: [
        'The difference is that the earlier local-editor and Agent-context design, ',
        link(
          'Workspace State Management and Interaction Entry-Point Design',
          'https://mp.weixin.qq.com/s/RIdUu6gs3FlJI6tzRPEphA',
        ),
        ', described only the foundation for Agent interaction. Once connectors are added, whose perspective should organize the Agent’s context?',
      ],
    },
    {
      type: 'paragraph',
      content: 'How should a writer’s thought process interact more effectively with resources in this environment?',
    },
    {type: 'paragraph', content: 'Can the system architecture scale to downstream integrations?'},
    {
      type: 'paragraph',
      content:
        'I designed an abstract architecture for different connectors, divided mainly into authentication, data, action, and task layers, together with the corresponding user-interaction design.',
    },
    {
      type: 'quote',
      content: [
        [
          link(
            'https://github.com/glide-the/im-dream/tree/develop/docs/prd/notion-session',
            'https://github.com/glide-the/im-dream/tree/develop/docs/prd/notion-session',
          ),
        ],
      ],
    },
    {type: 'paragraph', content: 'This article was generated entirely by AI and is intended mainly to share the thinking.'},
    {
      type: 'paragraph',
      content:
        'When we discussed the Workspace before, the problem was relatively simple: the local editor held the document content, and the Agent used the workspace to understand the current file, the editing position, and the available actions. That design provided the interaction foundation for the Agent. Instead of seeing only a sentence entered by the user, it could understand the environment in which it was working.',
    },
    {type: 'paragraph', content: 'Once connectors enter the picture, the problem changes.'},
    {
      type: 'paragraph',
      content:
        'Resources in Notion, Google Drive, Slack, GitHub, or Linear are not managed directly by the current product. They have their own accounts, permissions, data structures, and update schedules. Users can continue editing content on the external platform, and other collaborators may be working there at the same time. What the Agent read during this run may not be identical to what the remote platform stores at this moment.',
    },
    {
      type: 'paragraph',
      content:
        'At that point, the central design question is no longer “How do we give remote data to the Agent?” It is “What should be the subject around which the Agent’s context is organized?”',
    },
    {
      type: 'paragraph',
      content:
        'A connector can provide data, but it is not a suitable subject for the context. One conversation may use several connectors alongside local documents, uploaded files, and results from earlier tasks. The conversation itself is not suitable either: its lifecycle is too short to preserve resources the user selected for the long term, synchronization progress, or unfinished actions. The Agent Runtime serves only the current execution and is released when that execution ends, so those states cannot belong to it.',
    },
    {type: 'paragraph', content: 'The workspace is what actually persists.'},
    {
      type: 'paragraph',
      content:
        'The workspace records what the user is working on, which resources the Agent may use, where each resource comes from, when it was last read, which changes are awaiting attention, and which long-running tasks remain unfinished. Connectors provide external resources to the workspace, and the current Agent receives from the workspace a view relevant to this run.',
    },
    {type: 'paragraph', content: 'My basic conclusion about connector context is therefore this:'},
    {
      type: 'paragraph',
      content:
        'The workspace is the subject, connectors are resource providers, the Agent Runtime is the current executor, and the chat box is only the interaction entry point.',
    },
    {
      type: 'image',
      src: `${imageRoot}/01-workspace-as-subject.png`,
      alt: 'The workspace is the subject, connectors provide resources, and the Runtime handles the current execution',
      width: 1672,
      height: 941,
    },
    {
      type: 'paragraph',
      content:
        'This conclusion is not an attempt to make the architecture look complete. It comes from the actual duration of a user’s work. A web-based Agent can usually perceive uploaded files and the current prompt, but it cannot see relationships among files, changes made earlier, the results of cross-application actions, or why a task stopped where it did. Real work crosses files, applications, and permission boundaries over hours or even days. If the Agent depends only on conversation text, it must guess what the user is doing every time it starts.',
    },
    {
      type: 'paragraph',
      content:
        'The point of bringing connectors into the workspace is precisely to turn those long-lived relationships into a working environment the Agent can understand.',
    },
    {type: 'heading', text: 'Local Editors and Remote Connectors Should Share a Boundary Without Losing Their Differences'},
    {
      type: 'paragraph',
      content:
        'The earlier design for workspace state management and interaction entry points established the foundation for interaction between the local editor and the Agent. The Agent could read the current document, understand the location of a passage, propose changes, and update the content after the user confirmed them. That design explained how an Agent could participate in writing, but it did not address the time, permissions, and ownership of remote resources.',
    },
    {
      type: 'paragraph',
      content:
        'Content in the local editor is managed directly by the current product. When the user changes the text, the system can obtain the new state immediately. Content exposed through a remote connector is managed by an external platform. The view held by the current product may lag behind, and a write must wait for confirmation from that external platform.',
    },
    {
      type: 'paragraph',
      content:
        'The two can therefore share a workspace-resource vocabulary: both have a resource identity, title, content reference, available actions, and current version. They cannot share identical update semantics.',
    },
    {
      type: 'paragraph',
      content:
        'A local editor can provide the current state directly. A remote resource usually provides the most recent workspace view together with the ability to read on demand. A local change can return to the editor immediately; a remote change must pass through version checking, external submission, and result refresh. Local permissions come from the current product, while remote permissions depend on both external authorization and the user’s selection.',
    },
    {
      type: 'paragraph',
      content:
        'It is reasonable to treat the local editor as a special kind of workspace resource provider. The shared layer defines only how the Agent discovers resources, reads them, understands their capabilities, and proposes actions. Each provider explains where its content comes from, how versions are evaluated, and how changes are completed.',
    },
    {
      type: 'paragraph',
      content:
        'This shared boundary also leaves room for future connectors. The Agent core does not need to understand every detail of Notion databases, Slack channels, GitHub Issues, or Linear projects. It needs to know which resources are in the current workspace, what role each resource plays in the task, what content can be read, which actions may be proposed, and whether the available material may be stale.',
    },
    {
      type: 'paragraph',
      content:
        'Differences among connectors are expressed through capabilities. A Notion page may support updating its body; a Slack message may allow only sending or replying; a GitHub resource may support comments, labels, and status changes. The common layer should not compress all of these into an ambiguous “write.” Each connector should describe the actions it truly provides and the scope of their effects.',
    },
    {
      type: 'paragraph',
      content:
        'Whether the system can scale downstream depends on the Agent core remaining organized around the workspace and the current task instead of embedding one platform’s objects in the generic flow. A new connector must translate its resources, permissions, versions, and actions into a form the workspace understands. The Agent’s reading, confirmation, and task flows should not have to be redesigned when the platform changes.',
    },
    {
      type: 'image',
      src: `${imageRoot}/02-local-and-remote-boundary.png`,
      alt: 'Local editors and remote connectors share a resource language while retaining different update semantics',
      width: 1672,
      height: 941,
    },
    {
      type: 'paragraph',
      content: 'What the product truly needs to manage is how these relationships come into being and how the user can see them.',
    },
    {
      type: 'paragraph',
      content:
        'Connect an account → choose a resource scope → mount it in the workspace → give the current conversation a temporary view → let the Agent read on demand',
    },
    {type: 'heading', text: 'The Agent Should Receive a Map Before Deciding What to Open'},
    {
      type: 'paragraph',
      content:
        'Putting all external content into the model context may appear to eliminate later read operations, but in practice it creates a different kind of confusion.',
    },
    {
      type: 'image',
      src: `${imageRoot}/03-resource-map-on-demand.png`,
      alt: 'The Agent first inspects a resource map, then opens content required by the current task',
      width: 1671,
      height: 941,
    },
    {type: 'heading', text: 'Context Should Be Organized Around What the Writer Is Doing'},
    {
      type: 'paragraph',
      content:
        'The earlier local-editor design rested on a clear premise: the user, document, and Agent all lived in the same product environment. The Edit Session could answer which article the user was editing, what the editor currently contained, and which passage the Agent should read. Organizing Agent context around the current document made sense because the local editor directly managed the document state, and the user’s actions were immediately reflected in that same state.',
    },
    {
      type: 'paragraph',
      content:
        'Connectors change that premise. A Notion page does not belong to the local editor and can be modified outside the product. A user’s resource selection may persist for months, while one Agent conversation lasts only minutes. The same remote page may appear simultaneously in several projects, conversations, and writing tasks. If the Agent Session continues to manage connector state, long-lived resource relationships become attached to a short-lived conversation. If context is instead organized directly around the Notion connector, platform concepts such as pages and databases enter the Agent’s general working model, forcing the system to accumulate exceptions when Google Drive, Slack, GitHub, or Linear is added later.',
    },
    {
      type: 'paragraph',
      content:
        'Once connectors enter the workspace, the central object of Agent context should therefore be the work the writer is currently doing.',
    },
    {
      type: 'paragraph',
      content:
        'The workspace records the parts of that work that persist: the current draft, selected resources, each resource’s purpose in the task, the latest reliable read, unresolved changes, and background tasks still in progress. One Agent run receives only a view of those states at the current moment. A connector explains where a resource comes from, what is allowed, and how fresh the content is; it does not determine how the full context is organized.',
    },
    {
      type: 'paragraph',
      content:
        'This design keeps the writing process at the center. A user connects Notion not so the Agent can study a connector, but so they can write an article, organize material, verify facts, or revise a proposal. The connector is only a source of resources. The Agent must first understand what the user is writing now, and only then which external materials matter to that work.',
    },
    {
      type: 'paragraph',
      content:
        'The same page may serve different purposes in different tasks. It can be a read-only reference, a target document currently being revised, or an example used to compare tone. Recording the page’s content is not enough; the workspace must record why the user placed it in the current task. The resource’s purpose directly affects the Agent’s actions: a reference may be excerpted and cited, a target document may receive proposed changes, and an example may be analyzed for style but should not be treated as the current draft.',
    },
    {
      type: 'paragraph',
      content:
        'Workspace context is therefore more than a resource list. It must also express how each resource relates to the current work. When the Agent receives a map, it should see the current writing object, relevant materials, their purposes, read times, and permitted actions. Full content can still be read on demand, but each resource’s place in the task should be clear from the beginning.',
    },
    {type: 'heading', text: 'The Writer’s Thought Process Should Drive Resource Interaction'},
    {
      type: 'paragraph',
      content:
        'Writing does not end after one sequence of “connect a resource, read the content, generate an answer.” The real process is iterative: a vague question takes shape; the writer searches for related material, selects passages, returns to the draft to try an idea, discovers that the argument is incomplete, searches again, and finally revises the prose and citations.',
    },
    {
      type: 'paragraph',
      content:
        'A connector product needs to support this movement back and forth. It should not treat external material as a one-time input, nor should it make the Agent start over from the entire resource library every time.',
    },
    {
      type: 'paragraph',
      content:
        'The workspace can preserve the choices a user makes during writing: why a page was added to the current project, which passage was cited, what note the Agent derived from it, and whether the user accepted that interpretation. This information is much closer to actual writing than the fact that “the connector contains one hundred pages.”',
    },
    {
      type: 'paragraph',
      content:
        'Suppose a user is writing a product retrospective. From Notion, they select an early proposal, a set of user feedback, and a launch record. Each source serves a different purpose: the early proposal recovers the original goal, the feedback tests the outcome, and the launch record confirms the timeline. If the Agent sees only three page titles, it has little basis for deciding how to use them. If the workspace records their purposes, the Agent can organize the material around the article being written.',
    },
    {
      type: 'paragraph',
      content:
        'The current draft remains the central object in the writing process. External resources may provide facts, examples, background, and language references, or they may themselves become targets for revision. The product must distinguish these relationships so the Agent does not treat a reference as a file to edit or a temporary note as a fact from the source.',
    },
    {
      type: 'paragraph',
      content:
        'When the Agent extracts material from an external resource, it should ideally create a working note that retains its source. The note may be rewritten, combined, or shortened while the source reference remains. If the original changes, the system can identify which notes may need to be checked again. The writer can then develop their own thinking while still knowing where those judgments began.',
    },
    {
      type: 'paragraph',
      content:
        'This is how a snapshot genuinely participates in writing. Its value is not limited to preventing overwrites; it helps the writer understand the point in time on which a judgment was based. When the user reopens the project after several days, the system can explain that a passage of analysis relied on information from three days ago and that the corresponding page was updated yesterday. The user can then decide whether to read it again.',
    },
    {
      type: 'paragraph',
      content:
        'Agent context should also change with the stage of writing. Exploration calls for a resource directory, search, and summaries. Once a position begins to form, only a few selected passages and working notes are needed. During revision, the current text and its related sources should be prominent. When preparing to write back to a remote platform, the target version, scope of change, and confirmation state should be added.',
    },
    {
      type: 'paragraph',
      content:
        'This matches a writer’s thought process better than assembling one fixed, oversized context. Context is not the sum of all available resources; it is the selection of information required by the work at hand.',
    },
    {
      type: 'image',
      src: `${imageRoot}/04-context-follows-writing-stage.png`,
      alt: 'Context contracts as writing moves from exploration to forming a position, revising the draft, and preparing to write back',
      width: 1672,
      height: 941,
    },
    {type: 'heading', text: 'Conflict: Why an Earlier Change Loses the Conditions for Execution'},
    {
      type: 'paragraph',
      content:
        'After the Agent reads a page, the user may continue editing it in Notion. Other collaborators may change the same content. Another Agent conversation may propose a new edit based on the same old version.',
    },
    {type: 'paragraph', content: 'This is not an occasional error. It is normal in remote collaboration.'},
    {
      type: 'paragraph',
      content:
        'Once the target content has changed, the original edit intent can no longer be submitted directly. The product needs to retain three pieces of content: the version the Agent originally read, the current version on the remote platform, and the change the Agent was preparing to submit.',
    },
    {
      type: 'paragraph',
      content:
        'After reviewing all three, the user can regenerate the proposal, keep the remote version, reapply only part of the change, or prepare the final text themselves.',
    },
    {
      type: 'paragraph',
      content:
        'The first responsibility of the product here is to prevent silent overwrites. Automatic merging is not appropriate for every kind of content, especially writing. Two revisions of the same sentence may both be structurally valid while expressing different intentions. Textual differences alone rarely tell the system which expression the user wants to preserve.',
    },
    {
      type: 'paragraph',
      content:
        'A conflict should not exist only inside the current chat message. The user may leave and return several hours later. The edit intent and conflict record need to belong to the workspace so they can be resolved in a later conversation or on a dedicated page.',
    },
    {
      type: 'paragraph',
      content:
        'After the conflict is resolved, the new resource state should return to the workspace first. Later Agents can continue from the updated version. The next conversation then does not have to depend on a temporary explanation buried in earlier chat text.',
    },
    {
      type: 'image',
      src: `${imageRoot}/05-version-conflict-stops-write.png`,
      alt: 'When the read version differs from the current remote version, the write must stop and the user must decide',
      width: 1672,
      height: 941,
    },
    {type: 'heading', text: 'How the Writer’s Thinking Enters Resource Interaction'},
    {
      type: 'paragraph',
      content:
        'Writing is not a matter of reading information from one file and outputting a result to another. Writers move back and forth among drafts, source material, annotations, old versions, and unresolved questions.',
    },
    {
      type: 'paragraph',
      content:
        'A product proposal may begin with meeting notes, then cite user interviews, connect to a Notion database, and compare those materials with an old conclusion in a local draft. The writer keeps one sentence, deletes another passage, sets a judgment aside, and several hours later discovers a new explanation in a different source.',
    },
    {type: 'paragraph', content: 'These changes make up the tacit knowledge of the writing process.'},
    {
      type: 'paragraph',
      content:
        'A conventional chat box usually preserves only what the user said and what the Agent answered. It cannot see why the user opened a file, why two sources are being compared, whether the last proposed change was rejected, or whether some material is still being imported in the background.',
    },
    {type: 'paragraph', content: 'The workspace needs to preserve these work-related relationships.'},
    {
      type: 'paragraph',
      content:
        'The current draft is the primary writing object. External pages are references. Comments record unresolved questions. Edit intents record actions being prepared. Task results indicate which materials are ready. The Agent does not need to know every mouse action, but it should know which resources the current task depends on and which earlier events affect the present decision.',
    },
    {
      type: 'paragraph',
      content:
        'This also means Workspace Context should not become a full-text collection of external material. It is better suited to describing the current writing environment:',
    },
    {type: 'paragraph', content: 'Which document is being worked on.'},
    {type: 'paragraph', content: 'Which relevant materials are mounted.'},
    {type: 'paragraph', content: 'Which resources were read recently.'},
    {type: 'paragraph', content: 'Whether any content may be stale.'},
    {type: 'paragraph', content: 'Which changes are waiting for confirmation.'},
    {type: 'paragraph', content: 'Whether background tasks have produced new results.'},
    {
      type: 'paragraph',
      content:
        'This information tells the Agent where the work currently stands. Full content is still read on demand, action history retains only what matters to the current task, and older material can be compressed into summaries and references.',
    },
    {
      type: 'paragraph',
      content:
        'The writer should also be able to inspect and adjust this context. They can see which sources the Agent used in the current run, remove irrelevant material, request a refresh of a page, pin a particular version, or save the current output back to the workspace.',
    },
    {
      type: 'paragraph',
      content:
        'This visibility matters more than simply increasing the model’s context length. Only when users can inspect the Agent’s basis can they judge whether its answer deserves further use.',
    },
    {type: 'heading', text: 'How Local Editors and External Connectors Enter the Same Workspace'},
    {
      type: 'paragraph',
      content:
        'Local editors and remote connectors can share part of a resource vocabulary: resource identity, title, reference, content version, read capability, proposed changes, and action history.',
    },
    {
      type: 'paragraph',
      content:
        'This lets the Agent understand a local draft and external material in similar ways. It can inspect a resource map, locate a target, read the content, propose a change, and then choose the concrete execution method according to the source.',
    },
    {type: 'paragraph', content: 'Their differences must not be erased.'},
    {
      type: 'paragraph',
      content:
        'The current product directly manages the local editor and can usually obtain a new state immediately after the user types. An external platform manages remote resources; reads depend on the network and permissions, and writes must wait for a remote result. External collaborators may also change the content while the Agent is working.',
    },
    {
      type: 'paragraph',
      content:
        'A local editor can therefore be treated as a workspace resource provider, but it should not be forced into the model of an ordinary remote connector. The shared abstraction covers only resource references, context presentation, and action proposals. Data ownership, version checks, authentication, and submission semantics remain with each source.',
    },
    {type: 'paragraph', content: 'This boundary also determines how future connectors should be integrated.'},
    {
      type: 'paragraph',
      content:
        'Google Drive provides files and directories. Slack provides channels and messages. GitHub provides repositories, Issues, and Pull Requests. Linear provides projects and tasks. They cannot all be reduced to the same kind of “document.”',
    },
    {
      type: 'paragraph',
      content:
        'The workspace needs to understand the common information: what the resource is, where it comes from, whether it can currently be read, which actions are available, and whether the content is fresh. Each resource retains its own type and operation model. A Slack message can be replied to, a GitHub Issue can be closed, a Linear task can change state, and a Notion page can update blocks. Capabilities are declared by the connector, so the Agent Runtime does not need advance knowledge of every platform’s details.',
    },
    {
      type: 'paragraph',
      content:
        'With this design, the core Agent flow remains unchanged when a new connector is added. It still obtains a resource view from the workspace, reads on demand, generates an action proposal, waits for any required confirmation, and then receives the result. The connector translates those common actions into requests the external platform understands.',
    },
    {
      type: 'paragraph',
      content:
        'Notion can be the first validation target, but it should not become the generic model itself. If the common design uses Page, Block, and Database as core concepts, every later Slack or GitHub integration will add exceptions. The workspace should use shared concepts such as resources, references, versions, and capabilities, while platform-specific information remains in resource types and capability descriptions.',
    },
    {type: 'heading', text: 'Connector States the User Needs to See'},
    {
      type: 'paragraph',
      content:
        'Connector state ultimately has to appear in the product interface. If the internal state is complete but the user sees only a green dot, the value of the design remains invisible.',
    },
    {
      type: 'paragraph',
      content:
        'The settings page should distinguish account status, resource scope, and resource readiness. If the account is authorized but no resources have been selected, it should explicitly say “No resources selected.” While a resource index is being built, it should show progress. If the latest refresh failed but older content remains usable, the interface should identify the last successful result currently in use.',
    },
    {
      type: 'paragraph',
      content:
        'The conversation interface should tell users which connector resources the Agent used in this run. If an answer depends on older content, it should show the read time. If the external platform is temporarily unavailable, continuing with stale content must be disclosed. Any action that changes content should show the target, scope, version, and confirmation state.',
    },
    {
      type: 'paragraph',
      content:
        'The workspace also needs a central place for long-running tasks in progress, proposed changes awaiting attention, and version conflicts. After leaving a conversation, the user should still be able to return here and continue handling them.',
    },
    {
      type: 'paragraph',
      content: 'Users do not need to understand internal APIs or storage mechanisms. They need to understand what is happening now:',
    },
    {type: 'paragraph', content: 'Whether the account is available.'},
    {type: 'paragraph', content: 'Which resources have entered the workspace.'},
    {type: 'paragraph', content: 'What the Agent used in this run.'},
    {type: 'paragraph', content: 'Whether any content may be stale.'},
    {type: 'paragraph', content: 'Which actions are waiting for their decision.'},
    {type: 'paragraph', content: 'Whether the remote result has been confirmed.'},
    {type: 'paragraph', content: 'These six pieces of information form the foundation of trust in a connector product.'},
    {
      type: 'image',
      src: `${imageRoot}/06-visible-trust-receipt.png`,
      alt: 'Connector trust comes from inspectable account, resource, evidence, freshness, decision, and result states',
      width: 1670,
      height: 941,
    },
    {type: 'heading', text: 'From the Chat Box to an Operating-System-Level Entry Point'},
    {
      type: 'paragraph',
      content:
        'Many web-based Agent experiences today still revolve around prompts and uploaded files. The user gives material to the model, waits for one answer, and manually copies the result back into the original application.',
    },
    {type: 'paragraph', content: 'That approach works for short tasks. Real work does not always fit into one conversational turn.'},
    {
      type: 'paragraph',
      content:
        'Materials are distributed across applications, permissions are managed by different accounts, files refer to one another, action results change later decisions, and long-running tasks must continue after the user leaves. Conversation history alone cannot represent these facts.',
    },
    {
      type: 'paragraph',
      content:
        'An Agent needs a persistent working environment. That environment knows where resources are, which content may be used, what the current version is, which actions were taken earlier, and which tasks remain unfinished.',
    },
    {
      type: 'paragraph',
      content:
        'An operating-system-level entry point does not mean that the product should copy the interface of a traditional operating system. It points to a more complete way of working: the Agent can discover resources, obtain limited capabilities, observe state changes, propose actions, wait for confirmation, continue long-running tasks, and preserve results as state that the next session can use directly.',
    },
    {
      type: 'paragraph',
      content:
        'Connectors serve as entry points to external resources, the workspace organizes the user’s long-lived work relationships, and the Agent Runtime handles the current execution. The four architectural layers address access, evidence, action, and duration respectively.',
    },
    {type: 'paragraph', content: 'The authentication layer answers whether the system may enter an external platform on the user’s behalf.'},
    {type: 'paragraph', content: 'The data layer answers what evidence the Agent may rely on at this moment.'},
    {type: 'paragraph', content: 'The action layer answers how a proposal becomes a real change.'},
    {type: 'paragraph', content: 'The task layer answers how work continues beyond the current conversation.'},
    {
      type: 'image',
      src: `${imageRoot}/07-four-boundaries-fountain-pen.png`,
      alt: 'Authentication, data, action, and task layers answer the questions of entry, evidence, change, and duration',
      width: 1671,
      height: 941,
    },
    {
      type: 'paragraph',
      content:
        'Once these four questions have clear answers, a connector is no longer merely an authorization button on a settings page. It becomes part of the workspace, allowing the writer to work continuously across local drafts, external material, prior actions, and long-running tasks.',
    },
    {
      type: 'paragraph',
      content:
        'The ultimate goal of connector design is not to let the Agent read more content. What must be established is a working relationship the user can inspect: what the Agent saw, why it was allowed to see it, which point in time the evidence represents, what it intends to change, and whether that change has actually happened.',
    },
    {
      type: 'paragraph',
      content:
        'Only when those questions are answered clearly can users entrust an Agent with long-running work that crosses files, applications, and permission boundaries.',
    },
  ],
};
