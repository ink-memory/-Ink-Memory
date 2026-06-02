import { motion } from 'motion/react';
import { GhostButton, SpeechBubble, QuirkyCard, ColorfulRoundCard, Section } from './components/UI';
import { Pencil, MessageCircle, Eye, Hand, Sparkles, RefreshCcw, Layers, Image as ImageIcon, History, BarChart, Users, Play } from 'lucide-react';

function Navbar() {
  return (
    <nav className="w-full p-4 md:px-12 md:py-6 flex justify-between items-center z-50 relative">
      <div className="text-[24px] md:text-[29px] leading-[1.3] font-bold text-type-black">I&M</div>
      <div className="flex gap-3 md:gap-4">
        <a href="http://localhost:5173/ink-and-memory/" target="_blank" rel="noopener noreferrer" className="bg-type-black text-paper-white px-4 py-2 rounded-buttons text-[14px] md:text-[16px] leading-[1.71] cursor-pointer hover:bg-type-black/80 transition-colors inline-block font-bold">
          Log In
        </a>
        <a href="http://localhost:5173/ink-and-memory/" target="_blank" rel="noopener noreferrer" className="bg-bubblegum-red text-paper-white px-4 py-2 rounded-buttons text-[14px] md:text-[16px] leading-[1.71] cursor-pointer hover:bg-bubblegum-red/90 transition-colors inline-block font-bold">
          Start Writing
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-canvas-almond pt-10 pb-20">
      
      {/* Background Decorative Stickers */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] md:left-[15%] z-0"
      >
        <ColorfulRoundCard bg="bg-sunshine-yellow" className="w-[100px] h-[100px] md:w-[180px] md:h-[180px]">
          <Pencil size={48} className="text-type-black md:hidden" />
          <Pencil size={64} className="text-type-black hidden md:block" />
        </ColorfulRoundCard>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[3%] md:right-[15%] z-0"
      >
        <SpeechBubble className="transform rotate-12 bg-bubblegum-red text-paper-white border-[3px] md:border-[4px] border-type-black border-solid shadow-none px-5 py-3 md:px-[43.2px] md:py-[28.8px]">
          <span className="text-[20px] md:text-[36px] font-bold">Hello!</span>
        </SpeechBubble>
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[5%] z-0"
      >
        <ColorfulRoundCard bg="bg-leafy-green" className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] border-[3px] md:border-[4px] border-type-black">
          <Sparkles size={32} className="text-type-black md:hidden" />
          <Sparkles size={40} className="text-type-black hidden md:block" />
        </ColorfulRoundCard>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[90vw] md:max-w-none">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[90px] sm:text-[180px] md:text-[240px] lg:text-[346px] leading-[0.9] text-type-black font-bold uppercase tracking-tighter"
        >
          INK
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[70px] sm:text-[140px] md:text-[180px] lg:text-[250px] leading-[0.9] text-type-black font-bold uppercase tracking-tighter -mt-2 md:-mt-12 text-outline"
          style={{ WebkitTextStroke: '0.04em #000', color: 'transparent' }}
        >
          & MEMORY
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-[-40px] z-20 px-2"
        >
          <SpeechBubble className="bg-paper-white border-[3px] md:border-[4px] border-type-black border-solid max-w-2xl mx-auto shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] px-5 py-4 md:px-[43.2px] md:py-[28.8px]">
            <p className="text-[18px] md:text-[29px] leading-[1.5] md:leading-[1.3] font-bold text-center">
              写作的 AI 搭档，从倾听到协作
            </p>
          </SpeechBubble>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-10 mx-auto max-w-xl md:max-w-3xl text-left bg-canvas-almond/90 p-5 md:p-8 rounded-cards border-2 border-transparent"
        >
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] mb-4 md:mb-6">
            AI 不只是助手。<br/>
            它可以读懂你的文字，理解你的意图，甚至直接帮你修改作品。
          </p>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] mb-6 md:mb-8 font-bold">
            但每一次动笔之前，它都会先停下来，告诉你：<br/>
            它想改哪里，为什么这样改，改完会变成什么样。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center p-3 md:p-4 bg-type-black text-paper-white rounded-cards text-[16px] md:text-[22px]">
            <span>你点头，它才执行。</span>
            <RefreshCcw size={20} className="hidden sm:block"/>
            <span>你拒绝，它就重新思考。</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <Section bg="bg-grape-punch">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-center">
        <div>
          <h2 className="text-[36px] md:text-[72px] leading-[1.2] md:leading-[1.1] text-paper-white font-bold mb-6 md:mb-8">
            谁最适合使用 <br/> Ink & Memory？
          </h2>
          <div className="bg-paper-white text-type-black rounded-cards p-6 md:p-8 text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]">
            <p className="mb-4">如果你只是想随手记几句，普通日记 App 也许已经够用。但如果你符合下面这些特征，Ink & Memory 会更适合你：</p>
            <ul className="space-y-3 md:space-y-4 list-disc pl-5 mb-6">
              <li>你经常写日记、随笔、灵感、梦境、情绪记录</li>
              <li>你希望 AI 不只是聊天，而是能真正参与写作过程</li>
              <li>你在意文字的私密性，不希望 AI 擅自改动你的内容</li>
              <li>你想长期积累个人写作记忆，让 AI 越来越懂你</li>
              <li>你希望从自己的文字中看见情绪、主题和行为模式</li>
            </ul>
            <p className="font-bold underline decoration-[3px] md:decoration-4 decoration-bubblegum-red underline-offset-4">
              Ink & Memory 不是给“随便试试”的人。它更适合那些愿意认真写，也愿意认真看见自己的人。
            </p>
          </div>
        </div>
        <div className="relative flex justify-center items-center mt-6 md:mt-0 pb-6 md:pb-0">
          <ColorfulRoundCard bg="bg-sunshine-yellow" className="w-[220px] h-[220px] md:w-[300px] md:h-[300px] border-[4px] md:border-[6px] border-type-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000000]">
            <Users size={80} className="text-type-black md:hidden" />
            <Users size={120} className="text-type-black hidden md:block" />
          </ColorfulRoundCard>
          <SpeechBubble className="absolute -top-4 right-2 md:top-10 md:-right-10 border-[3px] md:border-[4px] border-type-black rotate-6 shadow-[4px_4px_0px_#000] px-4 py-3 md:px-8 md:py-6">
            <span className="text-[16px] md:text-[22px] font-bold">It's for YOU!</span>
          </SpeechBubble>
        </div>
      </div>
    </Section>
  );
}

function ValueProps() {
  return (
    <Section bg="bg-canvas-almond">
      <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
        <h2 className="text-[36px] md:text-[72px] leading-[1.2] md:leading-[1.1] text-type-black font-bold -rotate-2">
          写下来，<br className="md:hidden"/>让 AI 和你一起听见自己
        </h2>
        <p className="text-[20px] md:text-[29px] leading-[1.5] md:leading-[1.3] mt-6 md:mt-8">
          你写字，它倾听。你停顿，它提示。你需要修改时，它可以动笔。<br/>
          <span className="bg-sunshine-yellow px-2 font-bold leading-[1.6] md:leading-normal inline-block mt-2">但所有关键动作，都要经过你确认。</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[30px] max-w-7xl mx-auto w-full">
        {/* Card 1 */}
        <QuirkyCard bg="bg-leafy-green" className="border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] rotate-1 hover:rotate-0 transition-transform">
          <div className="bg-paper-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-[3px] border-type-black mb-4 md:mb-6">
            <Hand size={28} className="text-type-black md:hidden" />
            <Hand size={32} className="text-type-black hidden md:block" />
          </div>
          <h3 className="text-[28px] md:text-[36px] leading-[1.25] md:leading-[1.2] font-bold text-type-black mb-3 md:mb-4">AI 真的能改你的稿</h3>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] text-type-black">
            不是建议，是行动。但每一步都等你说“可以”。AI 可以直接对你的文档执行操作，但在动手前会弹出确认。
          </p>
        </QuirkyCard>

        {/* Card 2 */}
        <QuirkyCard bg="bg-bubblegum-red" className="border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] -rotate-1 hover:rotate-0 transition-transform">
          <div className="bg-paper-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-[3px] border-type-black mb-4 md:mb-6">
            <Layers size={28} className="text-type-black md:hidden" />
            <Layers size={32} className="text-type-black hidden md:block" />
          </div>
          <h3 className="text-[28px] md:text-[36px] leading-[1.25] md:leading-[1.2] font-bold text-paper-white mb-3 md:mb-4">四种 AI 写作工具</h3>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] text-paper-white">
            写入段落、删除段落、插入组件、回复评论。边界清楚，不越界。
          </p>
        </QuirkyCard>

        {/* Card 3 */}
        <QuirkyCard bg="bg-deep-indigo" className="border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] rotate-2 hover:rotate-0 transition-transform">
          <div className="bg-paper-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-[3px] border-type-black mb-4 md:mb-6">
            <Eye size={28} className="text-type-black md:hidden" />
            <Eye size={32} className="text-type-black hidden md:block" />
          </div>
          <h3 className="text-[28px] md:text-[36px] leading-[1.25] md:leading-[1.2] font-bold text-paper-white mb-3 md:mb-4">自动与逐步确认</h3>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] text-paper-white">
            你决定 AI 参与到什么程度。想要顺畅？自动模式。想要控制？逐步确认。随时切换。
          </p>
        </QuirkyCard>

        {/* Card 4 */}
        <QuirkyCard bg="bg-paper-white" className="border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-transform md:col-span-2 lg:col-span-3 mt-2 md:mt-0">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <ColorfulRoundCard bg="bg-sunshine-yellow" className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] shrink-0 border-[3px] md:border-[4px] border-type-black">
              <History size={40} className="text-type-black md:hidden" />
              <History size={64} className="text-type-black hidden md:block" />
            </ColorfulRoundCard>
            <div>
              <h3 className="text-[28px] md:text-[48px] leading-[1.2] font-bold text-type-black mb-3 md:mb-4">会呼吸的编辑器 & 带记忆的助手</h3>
              <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4] text-type-black mb-2 md:mb-4">
                不用新建文件，每天准备好空白页。自动记录、保存、归档。
                AI 带着你近期的写作记忆来和你对话。知道你反复写到什么，哪些情绪没有说完。
              </p>
            </div>
          </div>
        </QuirkyCard>
      </div>
    </Section>
  );
}

function DeepFeatures() {
  return (
    <Section bg="bg-sunshine-yellow">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] md:gap-[30px]">
        {/* Your voice cast */}
        <div className="bg-canvas-almond border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] p-6 md:p-8 rounded-cards lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <MessageCircle size={32} className="text-leafy-green md:hidden" />
            <MessageCircle size={40} className="text-leafy-green hidden md:block" />
            <h3 className="text-[28px] md:text-[36px] font-bold leading-[1.2]">你的声音角色团 & 声音卡组系统</h3>
          </div>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4]">
            理性分析者、极度共情者、犀利挑战者... 选择不同的“声音角色”，开启一场多视角的自我对话。你可以创建专属声音角色，浏览社区卡组，甚至一键 Fork 喜欢的卡组并修改成自己的版本。
          </p>
        </div>

        {/* AI Images */}
        <div className="bg-grape-punch text-paper-white border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] p-6 md:p-8 rounded-[60px] md:rounded-[100px] text-center flex flex-col items-center justify-center -rotate-2 hover:rotate-0 transition-transform">
          <ImageIcon size={48} className="mb-4 text-sunshine-yellow md:hidden" />
          <ImageIcon size={64} className="mb-4 text-sunshine-yellow hidden md:block" />
          <h3 className="text-[28px] md:text-[36px] font-bold mb-3 md:mb-4 leading-[1.2]">每日生成图</h3>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4]">
            不是照片，是你这一天情绪状态的视觉轮廓。
          </p>
        </div>

        {/* Deep Echo Analysis */}
        <div className="bg-bubblegum-red text-paper-white border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] p-6 md:p-8 rounded-cards rotate-1 hover:rotate-0 transition-transform lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <BarChart size={32} className="text-paper-white md:hidden" />
            <BarChart size={40} className="text-paper-white hidden md:block" />
            <h3 className="text-[28px] md:text-[36px] font-bold leading-[1.2]">深度回响分析</h3>
          </div>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4]">
            当文字积累到一定厚度，模式开始浮现。识别你反复提及的主题 (Echoes)，性格特质 (Traits) 与行为情绪模式 (Patterns)。不是为了定义你，而是多一次看见自己。
          </p>
        </div>

        {/* Writing Prompts */}
        <div className="bg-paper-white border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] p-6 md:p-8 rounded-cards">
          <div className="flex items-center gap-4 mb-4">
            <Sparkles size={32} className="text-grape-punch md:hidden" />
            <Sparkles size={40} className="text-grape-punch hidden md:block" />
            <h3 className="text-[28px] md:text-[36px] font-bold leading-[1.2]">写作灵感</h3>
          </div>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4]">
            停笔的那一刻，灵感轻轻落下。不是命令。而是一句轻轻的推门声。
          </p>
        </div>

        {/* History */}
        <div className="bg-deep-indigo text-paper-white border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] p-6 md:p-8 rounded-cards text-center">
          <History size={32} className="mx-auto mb-4 text-sunshine-yellow md:hidden" />
          <History size={40} className="mx-auto mb-4 text-sunshine-yellow hidden md:block" />
          <h3 className="text-[28px] md:text-[36px] font-bold mb-3 md:mb-4 leading-[1.2]">操作历史可追溯</h3>
          <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4]">
            AI 做了什么，你都看得见。无黑箱操作，不污染原文。
          </p>
        </div>

        {/* Friends Timeline */}
        <div className="bg-leafy-green text-type-black border-[3px] md:border-[4px] border-type-black shadow-[6px_6px_0px_#000] p-6 md:p-8 rounded-cards lg:col-span-2 flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 md:gap-8 -rotate-1 hover:rotate-0 transition-transform">
          <ColorfulRoundCard bg="bg-paper-white" className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] shrink-0 border-[3px] md:border-[4px] border-type-black">
            <Users size={32} className="text-type-black md:hidden" />
            <Users size={48} className="text-type-black hidden md:block" />
          </ColorfulRoundCard>
          <div className="text-center sm:text-left">
            <h3 className="text-[28px] md:text-[36px] font-bold mb-2 md:mb-3 leading-[1.2]">好友时间线</h3>
            <p className="text-[16px] md:text-[22px] leading-[1.6] md:leading-[1.4]">
              亲密，但有分寸。连接，但不打扰。在对方的时间线上，看见他们每天生成的情绪图片，而不是公开状态。
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CallToAction() {
  return (
    <Section bg="bg-leafy-green" className="border-t-[6px] md:border-t-[8px] border-type-black">
      <div className="max-w-4xl mx-auto w-full text-center py-10 md:py-16">
        <SpeechBubble className="bg-paper-white mx-auto inline-block border-[4px] md:border-[6px] border-type-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] rotate-2 mb-8 md:mb-12 px-5 py-4 md:px-12 md:py-8">
          <h2 className="text-[36px] md:text-[72px] leading-[1.2] md:leading-[1.1] font-bold text-type-black">
            开始与 AI 协作写作
          </h2>
        </SpeechBubble>

        <p className="text-[20px] md:text-[29px] leading-[1.5] md:leading-[1.3] text-type-black font-bold mb-8 md:mb-12 bg-canvas-almond inline-block px-5 py-3 md:px-6 md:py-4 border-[3px] md:border-[4px] border-type-black -rotate-1 rounded-cards">
          不是 AI 替你写。<br/>
          是 AI 和你一起写。
        </p>
        
        <br/>

        <a href="http://localhost:5173/ink-and-memory/" target="_blank" rel="noopener noreferrer" className="bg-type-black text-paper-white text-[20px] md:text-[36px] leading-[1.4] md:leading-[1.2] font-bold px-8 md:px-12 py-4 md:py-6 rounded-[24px] md:rounded-speechbubbles shadow-[6px_6px_0px_#fff] md:shadow-[8px_8px_0px_#fff] hover:-translate-y-1 hover:bg-grape-punch transition-all cursor-pointer inline-flex items-center">
          开始今天的书写 <Play size={28} className="ml-2 md:ml-3 md:w-10 md:h-10" />
        </a>

        <div className="mt-16 md:mt-20 pt-6 md:pt-8 border-t-[3px] md:border-t-[4px] border-type-black flex flex-col md:flex-row justify-between items-center text-[12px] md:text-[16px] font-bold text-type-black/80">
          <p className="mb-4 md:mb-0">© 2026 Ink & Memory. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="underline cursor-pointer">Privacy Policy</span>
            <span className="underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-canvas-almond text-type-black font-fictional selection:bg-grape-punch selection:text-paper-white">
      <Navbar />
      <Hero />
      <AudienceSection />
      <ValueProps />
      <DeepFeatures />
      <CallToAction />
    </div>
  );
}
