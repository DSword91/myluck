// ========== MBTI 完整测试 (93题) ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    I18n.add('zh', { 'mbti.title': '🧠 MBTI 性格测试', 'mbti.desc': '完整93道题目，探索你的性格类型（仅供娱乐参考）', 'mbti.retry': '🔄 重新测试', 'mbti.qof': '第 {0} / {1} 题', 'mbti.stats_title': '📊 MBTI 类型分布', 'mbti.stats_desc': '看看大家都是什么类型', 'mbti.history': '你的测试记录', 'mbti.start_title': 'MBTI 性格类型测试', 'mbti.start_desc': '本测试共 93 道题目，全面评估你的性格类型。请根据直觉选择最接近你的选项。', 'mbti.start_tip1': '约需 10-15 分钟', 'mbti.start_tip2': '没有对错之分', 'mbti.start_tip3': '凭第一直觉作答', 'mbti.start_tip4': '仅供娱乐参考', 'mbti.start_btn': '开始测试', 'mbti.analysis_title': '📖 深度分析', 'mbti.strengths': '✅ 优势', 'mbti.weaknesses': '⚠️ 可能的挑战', 'mbti.careers': '💼 适合的方向', 'mbti.compatible': '💕 最佳拍档', 'mbti.cognitive': '🧩 认知功能' });
    I18n.add('en', { 'mbti.title': '🧠 MBTI Personality Test', 'mbti.desc': 'Full 93 questions to discover your type (for fun only)', 'mbti.retry': '🔄 Retake', 'mbti.qof': 'Q {0} of {1}', 'mbti.stats_title': '📊 MBTI Type Distribution', 'mbti.stats_desc': 'See what types everyone got', 'mbti.history': 'Your History', 'mbti.start_title': 'MBTI Personality Type Test', 'mbti.start_desc': '93 questions for a comprehensive personality assessment. Choose the option that feels most natural to you.', 'mbti.start_tip1': 'Takes 10-15 minutes', 'mbti.start_tip2': 'No right or wrong answers', 'mbti.start_tip3': 'Go with your first instinct', 'mbti.start_tip4': 'For entertainment only', 'mbti.start_btn': 'Start Test', 'mbti.analysis_title': '📖 In-Depth Analysis', 'mbti.strengths': '✅ Strengths', 'mbti.weaknesses': '⚠️ Potential Challenges', 'mbti.careers': '💼 Suitable Paths', 'mbti.compatible': '💕 Best Match', 'mbti.cognitive': '🧩 Cognitive Functions' });
    I18n.apply();

    // 题库：[维度, 中文A, 中文B, 英文A, 英文B]  A选项倾向 E/S/T/J, B选项倾向 I/N/F/P
    const Q = [
        // E/I (15题)
        ['EI','聚会时我喜欢主动和很多人聊天','聚会时我更愿意和一两个熟人待在一起','At parties I like chatting with many people','At parties I prefer staying with one or two close friends'],
        ['EI','我在人群中会感到精力充沛','独处时我才能真正充电','Being around people energizes me','I recharge best when alone'],
        ['EI','我倾向于先说出想法再思考','我倾向于先想清楚再开口','I tend to speak first, think later','I tend to think first, speak later'],
        ['EI','周末我更想出去社交','周末我更想宅在家里','On weekends I prefer going out','On weekends I prefer staying home'],
        ['EI','我交朋友比较快','我交朋友需要比较长的时间','I make friends quickly','It takes me a while to make friends'],
        ['EI','我喜欢团队合作','我更喜欢独立工作','I enjoy teamwork','I prefer working independently'],
        ['EI','我不介意成为关注焦点','我更喜欢待在幕后','I don\'t mind being the center of attention','I prefer staying in the background'],
        ['EI','和陌生人聊天对我来说很自然','和陌生人聊天让我有点紧张','Talking to strangers comes naturally','Talking to strangers makes me a bit nervous'],
        ['EI','我的朋友圈很广泛','我的朋友圈小但关系很深','I have a wide circle of friends','I have a small but deep circle of friends'],
        ['EI','我觉得安静太久会很无聊','我觉得热闹太久会很累','Too much quiet bores me','Too much socializing exhausts me'],
        ['EI','压力大时我想找人倾诉','压力大时我想自己独处','Under stress I seek people to talk to','Under stress I seek solitude'],
        ['EI','我的想法经常脱口而出','我的想法通常经过深思才说出','My thoughts often slip out spontaneously','I usually think carefully before speaking'],
        ['EI','我喜欢热闹的环境','我喜欢安静的环境','I enjoy lively environments','I enjoy quiet environments'],
        ['EI','同时做很多事让我兴奋','专注做一件事让我更舒服','Juggling many things excites me','Focusing on one thing feels more comfortable'],
        ['EI','别人说我外向活泼','别人说我沉稳内敛','Others describe me as outgoing','Others describe me as reserved'],

        // S/N (15题)
        ['SN','我更关注事实和细节','我更关注可能性和大方向','I focus more on facts and details','I focus more on possibilities and big picture'],
        ['SN','我相信亲身经验','我相信直觉和灵感','I trust hands-on experience','I trust intuition and inspiration'],
        ['SN','我偏好实际可行的方案','我偏好有创意的方案','I prefer practical solutions','I prefer creative solutions'],
        ['SN','我关注当下正在发生的事','我常常想象未来的可能性','I focus on what\'s happening now','I often imagine future possibilities'],
        ['SN','我喜欢按步骤一步步来','我喜欢跳跃式思考','I like following steps sequentially','I like thinking in leaps and connections'],
        ['SN','我会注意到环境中的具体细节','我更容易看到事物间的模式','I notice specific details in my surroundings','I tend to see patterns between things'],
        ['SN','我更信赖有数据支撑的结论','我更信赖自己的第六感','I trust conclusions backed by data','I trust my sixth sense'],
        ['SN','说明书对我很有帮助','我习惯摸索着自己搞定','Manuals and instructions help me a lot','I prefer figuring things out by experimenting'],
        ['SN','我描述事物时偏向具体','我描述事物时偏向抽象','I describe things in concrete terms','I describe things in abstract terms'],
        ['SN','我更享受完善已有的东西','我更享受发明全新的东西','I enjoy perfecting what already exists','I enjoy inventing something entirely new'],
        ['SN','别人觉得我务实可靠','别人觉得我有想象力','Others see me as practical and reliable','Others see me as imaginative'],
        ['SN','学东西时我喜欢案例和实操','学东西时我喜欢理论和概念','I learn better through examples and practice','I learn better through theories and concepts'],
        ['SN','我更喜欢确定的、已知的事物','我对未知的、新奇的事物更感兴趣','I prefer certainty and the familiar','I\'m drawn to the unknown and novel'],
        ['SN','面对问题我先看事实','面对问题我先看深层含义','Facing a problem I look at facts first','Facing a problem I look for deeper meaning first'],
        ['SN','我会说"实际上是怎样的"','我会说"有可能会变成怎样"','I tend to say "this is how it is"','I tend to say "this is what it could become"'],

        // T/F (15题)
        ['TF','做决定时我优先考虑逻辑','做决定时我优先考虑别人的感受','When deciding, I prioritize logic','When deciding, I prioritize people\'s feelings'],
        ['TF','正确比让人舒服更重要','让人舒服比坚持正确更重要','Being correct matters more than being pleasant','Being pleasant matters more than being correct'],
        ['TF','给反馈时我倾向直接坦率','给反馈时我倾向温和委婉','I give feedback directly and honestly','I give feedback gently and tactfully'],
        ['TF','说服我需要用道理和证据','说服我需要用情感和价值','Convince me with reasoning and evidence','Convince me with emotion and values'],
        ['TF','我更看重公平公正','我更看重和谐体谅','I value fairness and justice more','I value harmony and understanding more'],
        ['TF','我擅长分析问题','我擅长理解他人','I\'m good at analyzing problems','I\'m good at understanding people'],
        ['TF','我认为批评应该客观直接','我认为批评应该考虑对方感受','I think criticism should be objective','I think criticism should consider feelings'],
        ['TF','我更欣赏能力强的人','我更欣赏心地善良的人','I admire competent people more','I admire kind-hearted people more'],
        ['TF','争论时我追求找到真相','争论时我追求达成共识','In debates I seek truth','In debates I seek consensus'],
        ['TF','做选择时我列出利弊清单','做选择时我跟着心走','I make choices by listing pros and cons','I make choices by following my heart'],
        ['TF','我先处理问题再安抚情绪','我先安抚情绪再处理问题','I fix the problem first, feelings later','I address feelings first, problem later'],
        ['TF','规则应该一视同仁','规则应该因人而异','Rules should apply equally to everyone','Rules should be flexible for individuals'],
        ['TF','我对事不对人','我更关注事情对人的影响','I focus on the issue, not the person','I focus on how issues affect people'],
        ['TF','在团队中我通常提出方案','在团队中我通常协调关系','In teams I usually propose solutions','In teams I usually mediate relationships'],
        ['TF','面对困境我保持理性冷静','面对困境我会感同身受','In tough times I stay rational and calm','In tough times I empathize deeply'],

        // J/P (15题)
        ['JP','我喜欢提前做好计划','我喜欢随机应变','I like planning ahead','I prefer going with the flow'],
        ['JP','事情确定下来我会安心','保持选项开放让我更舒服','Having things decided feels comforting','Keeping options open feels more comfortable'],
        ['JP','我的工作区域通常很整洁','我的工作区域有一种"创造性混乱"','My workspace is usually tidy','My workspace has a \'creative chaos\''],
        ['JP','我会列清单来管理任务','我把任务记在脑子里','I make lists to manage tasks','I keep tasks in my head'],
        ['JP','我偏好有规律的日程','我偏好灵活自由的安排','I prefer a structured schedule','I prefer a flexible arrangement'],
        ['JP','截止日期前我通常提前完成','我经常在截止日期前才冲刺','I usually finish before deadlines','I often rush right before deadlines'],
        ['JP','出门旅行我会做详细攻略','出门旅行我喜欢随意探索','I make detailed travel plans','I prefer spontaneous exploration'],
        ['JP','做一件事做完再做下一件','我经常同时推进多件事','I finish one task before starting another','I often juggle multiple tasks'],
        ['JP','我更喜欢结构化的环境','我更喜欢开放自由的环境','I prefer structured environments','I prefer open, free environments'],
        ['JP','我做事有始有终','我可能同时开了很多坑','I always see things through to completion','I tend to start many things at once'],
        ['JP','规律的生活让我有安全感','太多规矩让我感觉被束缚','Routines make me feel secure','Too many rules make me feel constrained'],
        ['JP','我觉得"先工作后享乐"','我觉得"边工作边享乐"','I believe in \'work first, play later\'','I believe in \'mix work and play\''],
        ['JP','朋友约我我希望提前知道','朋友临时约我我也很开心','I want to know about plans in advance','I\'m happy with last-minute invitations'],
        ['JP','决策之后我很少后悔','我做完决定还会继续考虑','After a decision I rarely second-guess','After deciding I keep reconsidering'],
        ['JP','我觉得计划让事情更顺利','我觉得变化让事情更有趣','I think plans make things smoother','I think changes make things more exciting'],

        // 拓展题 E/I (9题)
        ['EI','我更喜欢大型聚会','我更喜欢小型聚餐','I prefer large gatherings','I prefer small dinners'],
        ['EI','我容易融入新的社交环境','我需要时间适应新环境','I easily blend into new social settings','I need time to adjust to new settings'],
        ['EI','讨论问题时我善于表达','讨论问题时我更善于倾听','In discussions I\'m good at expressing','In discussions I\'m a better listener'],
        ['EI','我喜欢边聊边思考','我需要安静才能好好思考','I like thinking while chatting','I need quiet to think properly'],
        ['EI','一个人待久了我会闷','和人待久了我需要独处','Being alone too long bores me','Being with people too long drains me'],
        ['EI','我经常主动发起对话','我通常等别人先开口','I often initiate conversations','I usually wait for others to start'],
        ['EI','我愿意在公共场合发言','在公共场合发言让我不自在','I\'m willing to speak publicly','Public speaking makes me uncomfortable'],
        ['EI','节假日我想外出社交','节假日我想在家休息','On holidays I want to socialize','On holidays I want to rest at home'],
        ['EI','我的能量来自人际互动','我的能量来自独处反思','My energy comes from social interactions','My energy comes from solitude and reflection'],

        // 拓展题 S/N (8题)
        ['SN','我喜欢有清楚的指令','我喜欢用自己的方式探索','I like having clear instructions','I prefer exploring my own way'],
        ['SN','我记忆中更多是具体事件','我记忆中更多是感受和印象','My memories are mostly specific events','My memories are mostly feelings and impressions'],
        ['SN','我注重当前的实际需求','我注重未来的发展潜力','I focus on current practical needs','I focus on future potential'],
        ['SN','我做事脚踏实地','我做事天马行空','I work in a grounded way','I work in an imaginative way'],
        ['SN','解决问题我从已知经验出发','解决问题我喜欢寻找全新思路','I solve problems from known experience','I solve problems by seeking fresh approaches'],
        ['SN','我更关心"是什么"','我更关心"为什么"和"如果"','I care more about "what is"','I care more about "why" and "what if"'],
        ['SN','我觉得实际经验比理论重要','我觉得理论和概念很有价值','Practical experience beats theory to me','Theory and concepts are valuable to me'],
        ['SN','我阅读时注意细节','我阅读时寻找隐含含义','When reading I focus on details','When reading I look for hidden meanings'],

        // 拓展题 T/F (8题)
        ['TF','我以公正为原则','我以同理心为原则','I am guided by fairness','I am guided by empathy'],
        ['TF','我觉得决策不应太感情用事','我觉得情感在决策中很重要','Decisions shouldn\'t be emotional','Emotions are important in decisions'],
        ['TF','我注重效率和成果','我注重人际和感受','I focus on efficiency and results','I focus on relationships and feelings'],
        ['TF','受到批评时我会理性反思','受到批评时我会感到受伤','When criticized I reflect rationally','When criticized I feel hurt'],
        ['TF','我用"是否合理"来评判事物','我用"是否合情"来评判事物','I judge things by "is it reasonable"','I judge things by "is it compassionate"'],
        ['TF','我认为竞争能激发潜力','我认为合作更能发挥价值','Competition brings out potential','Cooperation brings out the best'],
        ['TF','别人需要帮忙时我先分析原因','别人需要帮忙时我先表达支持','When others need help I analyze first','When others need help I show support first'],
        ['TF','我更看重一个人的能力表现','我更看重一个人的内心品质','I value competence more','I value inner character more'],

        // 拓展题 J/P (8题)
        ['JP','完成任务给我满足感','开始新项目给我兴奋感','Completing tasks gives me satisfaction','Starting new projects gives me excitement'],
        ['JP','我通常准时或提前到达','我经常踩着点或迟到','I usually arrive on time or early','I often arrive just on time or late'],
        ['JP','我的生活比较有规律','我的生活比较随性自由','My life is fairly routine','My life is fairly spontaneous'],
        ['JP','制定好计划后我会严格遵守','我会根据情况灵活调整计划','Once I make a plan I follow it strictly','I adjust plans flexibly as needed'],
        ['JP','没有计划我会感到焦虑','没有计划我会感到自在','Without plans I feel anxious','Without plans I feel free'],
        ['JP','做事情我追求结果和闭环','做事情我享受过程和探索','I pursue outcomes and closure','I enjoy the process and exploration'],
        ['JP','购物前我会做研究比较','购物我更靠当下的感觉','I research before buying','I buy based on how I feel in the moment'],
        ['JP','在混乱中我想马上整理','在混乱中我能安然自若','In chaos I want to organize immediately','In chaos I can remain calm'],
    ];

    // 16 型描述
    const types = {
        ISTJ: { zh: { name: '检查者', emoji: '📋', desc: '你是一个认真负责、值得信赖的人。做事有条不紊、一丝不苟，是组织中的中流砥柱。你重视传统和规则，用行动而非言语来表达关心。在你身上，人们总能看到踏实和可靠。', strengths: '责任心强、细致严谨、言出必行', weaknesses: '可能过于固执、不擅表达情感', careers: '会计、审计、工程师、项目管理', compatible: 'ESFP、ESTP' }, en: { name: 'Inspector', emoji: '📋', desc: 'You are responsible, dependable, and thorough. You approach tasks methodically and are the backbone of any group. You value tradition and express care through actions rather than words.', strengths: 'Reliable, detail-oriented, keeps promises', weaknesses: 'Can be rigid, difficulty expressing emotions', careers: 'Accounting, Auditing, Engineering, Project Mgmt', compatible: 'ESFP, ESTP' }},
        ISFJ: { zh: { name: '守护者', emoji: '🛡️', desc: '温柔细心的你总是默默照顾身边的人。你有很强的观察力，能记住别人的喜好和需求。你低调但可靠，是朋友们最温暖的港湾。你的奉献精神让每个人都感到被珍视。', strengths: '体贴入微、忠诚可靠、观察力强', weaknesses: '容易忽略自身需求、不善拒绝', careers: '医护、教育、社工、行政', compatible: 'ESFP、ESTP' }, en: { name: 'Protector', emoji: '🛡️', desc: 'Gentle and attentive, you quietly take care of those around you. Your keen observation helps you remember others\' preferences. You\'re the warmest harbor for your friends.', strengths: 'Caring, loyal, observant', weaknesses: 'May neglect own needs, difficulty saying no', careers: 'Healthcare, Education, Social Work, Admin', compatible: 'ESFP, ESTP' }},
        INFJ: { zh: { name: '提倡者', emoji: '🌙', desc: '你拥有深邃的洞察力和理想主义精神。外表安静，内心世界却极其丰富。你追求有意义的生活，能够理解人心深处的渴望。你的存在总是给人以启发和温暖。', strengths: '洞察力强、富有远见、善解人意', weaknesses: '可能过于理想化、容易内耗', careers: '心理咨询、写作、教育、非营利', compatible: 'ENFP、ENTP' }, en: { name: 'Advocate', emoji: '🌙', desc: 'You have deep insight and idealistic spirit. Quiet on the outside but incredibly rich within, you seek a meaningful life and understand the deepest human yearnings.', strengths: 'Insightful, visionary, empathetic', weaknesses: 'Can be overly idealistic, prone to burnout', careers: 'Counseling, Writing, Education, Nonprofit', compatible: 'ENFP, ENTP' }},
        INTJ: { zh: { name: '建筑师', emoji: '🏗️', desc: '独立自主、战略思维是你的标志。你善于构建宏大的蓝图并一步步去实现。在你的世界里，没有什么是不可能的。你的决心和远见让你成为天生的战略家。', strengths: '战略思维、独立自主、执行力强', weaknesses: '可能显得高冷、对他人要求过高', careers: '科研、战略顾问、技术架构、创业', compatible: 'ENFP、ENTP' }, en: { name: 'Architect', emoji: '🏗️', desc: 'Independent and strategic, you excel at building grand visions and executing them step by step. In your world, nothing is impossible.', strengths: 'Strategic thinking, independent, strong execution', weaknesses: 'Can seem aloof, high standards for others', careers: 'Research, Strategy Consulting, Tech Architecture, Startup', compatible: 'ENFP, ENTP' }},
        ISTP: { zh: { name: '鉴赏家', emoji: '🔧', desc: '冷静务实的你是天生的问题解决者。你喜欢用双手探索世界，动手能力超强。面对突发状况你总能保持冷静，灵活应对。你享受自由，不喜受到束缚。', strengths: '冷静应变、动手能力强、逻辑清晰', weaknesses: '不善表达感情、可能过于冒险', careers: '机械工程、技术支持、体育、手工艺', compatible: 'ESTJ、ENTJ' }, en: { name: 'Virtuoso', emoji: '🔧', desc: 'Cool and practical, you\'re a natural problem solver. You love exploring the world hands-on and stay calm under pressure.', strengths: 'Calm under pressure, hands-on, logical', weaknesses: 'Difficulty expressing feelings, can be risk-prone', careers: 'Mechanical Eng, Tech Support, Sports, Crafts', compatible: 'ESTJ, ENTJ' }},
        ISFP: { zh: { name: '探险家', emoji: '🎨', desc: '你是一个温柔的自由灵魂，用感性的方式体验世界。你有独特的审美品味和艺术天赋。虽然不善言辞，但你的善良和真诚会在行动中自然流露。', strengths: '审美独到、善良温暖、适应力强', weaknesses: '容易回避冲突、不善长期规划', careers: '设计、艺术、摄影、自然探索', compatible: 'ESTJ、ESFJ' }, en: { name: 'Adventurer', emoji: '🎨', desc: 'A gentle free spirit, you experience the world through feelings. You have unique aesthetic taste and artistic talent.', strengths: 'Artistic sense, warm-hearted, adaptable', weaknesses: 'Avoids conflict, difficulty with long-term planning', careers: 'Design, Art, Photography, Nature Exploration', compatible: 'ESTJ, ESFJ' }},
        INFP: { zh: { name: '调停者', emoji: '🦋', desc: '你是一个理想主义的梦想家，内心世界如同一座花园般丰富多彩。你追求真诚和深度的连接，对不公正的事情会挺身而出。你的想象力和同理心是你最大的超能力。', strengths: '共情力强、创造力丰富、忠于价值', weaknesses: '容易情绪化、可能逃避现实', careers: '写作、心理咨询、艺术、人文研究', compatible: 'ENFJ、ENTJ' }, en: { name: 'Mediator', emoji: '🦋', desc: 'An idealistic dreamer, your inner world is as rich as a garden. You seek authenticity and deep connections.', strengths: 'Empathetic, creative, value-driven', weaknesses: 'Can be emotional, may avoid reality', careers: 'Writing, Counseling, Art, Humanities Research', compatible: 'ENFJ, ENTJ' }},
        INTP: { zh: { name: '逻辑学家', emoji: '🔬', desc: '你拥有无穷的好奇心和独到的分析能力。思想是你最锋利的工具。你喜欢解构复杂的问题，寻找事物背后的逻辑。在知识的海洋里，你永远不会感到厌倦。', strengths: '分析力强、创新思维、求知欲旺', weaknesses: '社交被动、容易过度思考', careers: '科研、编程、数据分析、哲学', compatible: 'ENTJ、ESTJ' }, en: { name: 'Logician', emoji: '🔬', desc: 'With endless curiosity and sharp analytical skills, your mind is your greatest tool.', strengths: 'Analytical, innovative thinking, curious', weaknesses: 'Socially passive, overthinking', careers: 'Research, Programming, Data Analysis, Philosophy', compatible: 'ENTJ, ESTJ' }},
        ESTP: { zh: { name: '企业家', emoji: '⚡', desc: '充满行动力和冒险精神的你活在当下。你反应敏捷，善于把握机会，喜欢刺激和挑战。你的魅力和果断让你成为人群中最耀眼的存在。', strengths: '行动力强、适应力佳、魅力十足', weaknesses: '可能缺乏耐心、忽视长远后果', careers: '创业、销售、体育、急救', compatible: 'ISFJ、ISTJ' }, en: { name: 'Entrepreneur', emoji: '⚡', desc: 'Full of action and adventure, you live in the moment. Your charisma and decisiveness make you shine in any crowd.', strengths: 'Action-oriented, adaptable, charismatic', weaknesses: 'May lack patience, overlook long-term effects', careers: 'Entrepreneurship, Sales, Sports, Emergency Services', compatible: 'ISFJ, ISTJ' }},
        ESFP: { zh: { name: '表演者', emoji: '🎭', desc: '你是天生的焦点人物，热爱生活中的每一个精彩瞬间。你的热情和活力具有强大的感染力，和你在一起永远不会无聊。', strengths: '乐观开朗、善于社交、活力充沛', weaknesses: '可能缺乏计划性、容易分心', careers: '娱乐、公关、旅游、活动策划', compatible: 'ISFJ、ISTJ' }, en: { name: 'Entertainer', emoji: '🎭', desc: 'The life of every party, you love every exciting moment life offers. Your enthusiasm is contagious.', strengths: 'Optimistic, social, energetic', weaknesses: 'May lack planning, easily distracted', careers: 'Entertainment, PR, Tourism, Event Planning', compatible: 'ISFJ, ISTJ' }},
        ENFP: { zh: { name: '竞选者', emoji: '🌊', desc: '你是一个充满激情和创造力的自由灵魂。你能在任何事物中发现可能性，你的热情能够激励身边的每一个人。', strengths: '热情洋溢、创意无穷、善于启发', weaknesses: '容易三分钟热度、不擅处理细节', careers: '创意、媒体、教育、市场营销', compatible: 'INFJ、INTJ' }, en: { name: 'Campaigner', emoji: '🌊', desc: 'A passionate and creative free spirit, you find possibilities in everything. Your enthusiasm inspires everyone around you.', strengths: 'Passionate, creative, inspiring', weaknesses: 'May lose interest quickly, weak on details', careers: 'Creative, Media, Education, Marketing', compatible: 'INFJ, INTJ' }},
        ENTP: { zh: { name: '辩论家', emoji: '💡', desc: '机智灵活的你天生就是创新者。你享受思维的碰撞和辩论的快感，善于从不同角度审视问题。', strengths: '思维敏捷、口才出众、创新能力强', weaknesses: '可能过于好辩、不擅坚持到底', careers: '法律、创业、咨询、产品设计', compatible: 'INFJ、INTJ' }, en: { name: 'Debater', emoji: '💡', desc: 'Witty and flexible, you\'re a natural innovator. You enjoy intellectual sparring and examining problems from every angle.', strengths: 'Quick-witted, eloquent, innovative', weaknesses: 'Can be argumentative, difficulty following through', careers: 'Law, Entrepreneurship, Consulting, Product Design', compatible: 'INFJ, INTJ' }},
        ESTJ: { zh: { name: '总经理', emoji: '👔', desc: '你是一个出色的组织者和领导者。你有清晰的目标和坚定的执行力，善于建立秩序和制度。', strengths: '组织力强、务实高效、领导力佳', weaknesses: '可能过于强势、不善变通', careers: '管理、法律、金融、军事', compatible: 'ISFP、ISTP' }, en: { name: 'Executive', emoji: '👔', desc: 'An outstanding organizer and leader, you have clear goals and firm execution.', strengths: 'Organized, practical, strong leadership', weaknesses: 'Can be domineering, inflexible', careers: 'Management, Law, Finance, Military', compatible: 'ISFP, ISTP' }},
        ESFJ: { zh: { name: '执政官', emoji: '❤️', desc: '温暖热心的你是社交圈的纽带。你善于照顾他人、营造和谐的氛围。你的慷慨和细心让你成为朋友中最受欢迎的人。', strengths: '乐于助人、社交能力强、细心体贴', weaknesses: '过度在意他人评价、可能忽略自我', careers: '医护、教育、客服、公共关系', compatible: 'ISFP、ISTP' }, en: { name: 'Consul', emoji: '❤️', desc: 'Warm and caring, you\'re the glue of your social circle. Your generosity makes you the most beloved among friends.', strengths: 'Helpful, socially skilled, attentive', weaknesses: 'Overly concerned with others\' opinions, may neglect self', careers: 'Healthcare, Education, Customer Service, PR', compatible: 'ISFP, ISTP' }},
        ENFJ: { zh: { name: '主人公', emoji: '🌟', desc: '你是天生的领袖和鼓舞者。你有强大的同理心和远见卓识，能够激发每个人的潜力。', strengths: '同理心强、有感染力、善于引导', weaknesses: '可能过度牺牲自我、容易理想化', careers: '教育、人力资源、培训、心理咨询', compatible: 'INFP、ISFP' }, en: { name: 'Protagonist', emoji: '🌟', desc: 'A natural leader and inspirer, you have powerful empathy and vision. You bring out the best in everyone.', strengths: 'Empathetic, charismatic, good at mentoring', weaknesses: 'May over-sacrifice, idealistic', careers: 'Education, HR, Training, Counseling', compatible: 'INFP, ISFP' }},
        ENTJ: { zh: { name: '指挥官', emoji: '🎖️', desc: '你是一个果断自信的领导者，天生就擅长制定战略和带领团队走向成功。你有极强的目标导向和执行力。', strengths: '决断力强、战略思维、目标导向', weaknesses: '可能过于强势、不够耐心倾听', careers: '企业管理、战略咨询、投资、政治', compatible: 'INFP、INTP' }, en: { name: 'Commander', emoji: '🎖️', desc: 'A decisive and confident leader, you excel at strategy and leading teams to success. "Impossible" isn\'t in your dictionary.', strengths: 'Decisive, strategic, goal-oriented', weaknesses: 'Can be domineering, impatient with listening', careers: 'Executive Mgmt, Strategy Consulting, Investment, Politics', compatible: 'INFP, INTP' }},
    };

    // 认知功能映射
    const cognitiveFunctions = {
        ISTJ: { dom: 'Si', aux: 'Te', tert: 'Fi', inf: 'Ne' },
        ISFJ: { dom: 'Si', aux: 'Fe', tert: 'Ti', inf: 'Ne' },
        INFJ: { dom: 'Ni', aux: 'Fe', tert: 'Ti', inf: 'Se' },
        INTJ: { dom: 'Ni', aux: 'Te', tert: 'Fi', inf: 'Se' },
        ISTP: { dom: 'Ti', aux: 'Se', tert: 'Ni', inf: 'Fe' },
        ISFP: { dom: 'Fi', aux: 'Se', tert: 'Ni', inf: 'Te' },
        INFP: { dom: 'Fi', aux: 'Ne', tert: 'Si', inf: 'Te' },
        INTP: { dom: 'Ti', aux: 'Ne', tert: 'Si', inf: 'Fe' },
        ESTP: { dom: 'Se', aux: 'Ti', tert: 'Fe', inf: 'Ni' },
        ESFP: { dom: 'Se', aux: 'Fi', tert: 'Te', inf: 'Ni' },
        ENFP: { dom: 'Ne', aux: 'Fi', tert: 'Te', inf: 'Si' },
        ENTP: { dom: 'Ne', aux: 'Ti', tert: 'Fe', inf: 'Si' },
        ESTJ: { dom: 'Te', aux: 'Si', tert: 'Ne', inf: 'Fi' },
        ESFJ: { dom: 'Fe', aux: 'Si', tert: 'Ne', inf: 'Ti' },
        ENFJ: { dom: 'Fe', aux: 'Ni', tert: 'Se', inf: 'Ti' },
        ENTJ: { dom: 'Te', aux: 'Ni', tert: 'Se', inf: 'Fi' },
    };
    const cfNames = {
        zh: { Si: '内向感觉', Se: '外向感觉', Ni: '内向直觉', Ne: '外向直觉', Ti: '内向思考', Te: '外向思考', Fi: '内向情感', Fe: '外向情感' },
        en: { Si: 'Introverted Sensing', Se: 'Extraverted Sensing', Ni: 'Introverted Intuition', Ne: 'Extraverted Intuition', Ti: 'Introverted Thinking', Te: 'Extraverted Thinking', Fi: 'Introverted Feeling', Fe: 'Extraverted Feeling' }
    };

    let current = 0;
    let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    function render() {
        if (current >= Q.length) { showResult(); return; }

        const q = Q[current];
        const lang = I18n.lang;
        const progress = (current / Q.length) * 100;

        document.getElementById('mbti-bar').style.width = progress + '%';
        document.getElementById('mbti-progress-text').textContent =
            (lang === 'zh' ? `第 ${current + 1} / ${Q.length} 题` : `Q ${current + 1} of ${Q.length}`);
        document.getElementById('mbti-q').textContent =
            lang === 'zh' ? `Q${current + 1}. 以下两个选项，你更倾向于哪一个？` : `Q${current + 1}. Which statement resonates more with you?`;

        const optA = lang === 'zh' ? q[1] : q[3];
        const optB = lang === 'zh' ? q[2] : q[4];
        const dim = q[0];

        document.getElementById('mbti-opts').innerHTML = `
            <button class="mbti-option" data-choice="A">A. ${optA}</button>
            <button class="mbti-option" data-choice="B">B. ${optB}</button>`;

        document.getElementById('mbti-opts').querySelectorAll('.mbti-option').forEach(btn => {
            btn.addEventListener('click', function () {
                const choice = this.dataset.choice;
                if (choice === 'A') scores[dim[0]]++;
                else scores[dim[1]]++;
                current++;
                render();
            });
        });
    }

    function showResult() {
        const type = (scores.E >= scores.I ? 'E' : 'I') +
                     (scores.S >= scores.N ? 'S' : 'N') +
                     (scores.T >= scores.F ? 'T' : 'F') +
                     (scores.J >= scores.P ? 'J' : 'P');

        const info = types[type];
        const lang = I18n.lang;
        const data = info[lang] || info.zh;

        document.getElementById('mbti-quiz').style.display = 'none';
        document.getElementById('mbti-result').style.display = 'block';
        document.getElementById('mbti-emoji').textContent = data.emoji;
        document.getElementById('mbti-type').textContent = type;
        document.getElementById('mbti-type-name').textContent = data.name;
        document.getElementById('mbti-desc').textContent = data.desc;

        // 维度柱状图
        const dims = [
            ['E', 'I', scores.E, scores.I, lang === 'zh' ? '外向 E / 内向 I' : 'Extraversion / Introversion'],
            ['S', 'N', scores.S, scores.N, lang === 'zh' ? '感觉 S / 直觉 N' : 'Sensing / Intuition'],
            ['T', 'F', scores.T, scores.F, lang === 'zh' ? '思考 T / 情感 F' : 'Thinking / Feeling'],
            ['J', 'P', scores.J, scores.P, lang === 'zh' ? '判断 J / 感知 P' : 'Judging / Perceiving'],
        ];

        document.getElementById('mbti-dims').innerHTML = dims.map(([a, b, sa, sb, label]) => {
            const total = sa + sb;
            const pct = total ? Math.round((sa / total) * 100) : 50;
            const winner = sa >= sb ? a : b;
            return `<div class="mbti-dim">
                <div class="dim-label">${label}</div>
                <div class="dim-bar"><div class="dim-fill" style="width:${pct}%"></div></div>
                <div class="dim-value">${winner} (${sa >= sb ? pct : 100 - pct}%)</div>
            </div>`;
        }).join('');

        // 综合分析区域
        renderAnalysis(type, lang);

        document.getElementById('mbti-result').scrollIntoView({ behavior: 'smooth' });

        // 统计：保存结果 & 展示分布
        saveMBTIResult(type);
        showMBTIStats(type);
    }

    function renderAnalysis(type, lang) {
        const data = types[type][lang] || types[type].zh;
        const cf = cognitiveFunctions[type];
        const cfN = cfNames[lang] || cfNames.zh;

        let analysisEl = document.getElementById('mbti-analysis');
        if (!analysisEl) {
            analysisEl = document.createElement('div');
            analysisEl.id = 'mbti-analysis';
            analysisEl.className = 'mbti-analysis-section';
            const dimsEl = document.getElementById('mbti-dims');
            dimsEl.parentNode.insertBefore(analysisEl, dimsEl.nextSibling);
        }

        const secTitle = lang === 'zh' ? '深度分析' : 'In-Depth Analysis';
        const cfTitle = lang === 'zh' ? '认知功能栈' : 'Cognitive Function Stack';
        const strTitle = lang === 'zh' ? '核心优势' : 'Key Strengths';
        const weakTitle = lang === 'zh' ? '潜在盲点' : 'Potential Blind Spots';
        const careerTitle = lang === 'zh' ? '适合的职业方向' : 'Career Directions';
        const compatTitle = lang === 'zh' ? '最佳匹配类型' : 'Best Compatible Types';

        const cfLabels = lang === 'zh'
            ? ['主导功能', '辅助功能', '第三功能', '劣势功能']
            : ['Dominant', 'Auxiliary', 'Tertiary', 'Inferior'];

        analysisEl.innerHTML = `
            <h3 style="text-align:center;color:var(--primary);margin:24px 0 16px;font-size:1.15rem;">${secTitle}</h3>
            <div class="analysis-card">
                <h4>${cfTitle}</h4>
                <div class="cf-stack">
                    ${[['dom', cfLabels[0], 'var(--primary)'], ['aux', cfLabels[1], 'var(--secondary)'], ['tert', cfLabels[2], 'var(--accent)'], ['inf', cfLabels[3], '#aaa']].map(([k, label, color]) => `
                    <div class="cf-item">
                        <span class="cf-badge" style="background:${color};color:#fff;">${cf[k]}</span>
                        <span class="cf-name">${cfN[cf[k]]}</span>
                        <span class="cf-role">${label}</span>
                    </div>`).join('')}
                </div>
            </div>
            <div class="analysis-row">
                <div class="analysis-card half">
                    <h4>${strTitle}</h4>
                    <p>${data.strengths}</p>
                </div>
                <div class="analysis-card half">
                    <h4>${weakTitle}</h4>
                    <p>${data.weaknesses}</p>
                </div>
            </div>
            <div class="analysis-row">
                <div class="analysis-card half">
                    <h4>${careerTitle}</h4>
                    <p>${data.careers}</p>
                </div>
                <div class="analysis-card half">
                    <h4>${compatTitle}</h4>
                    <p>${data.compatible}</p>
                </div>
            </div>`;
    }

    // ===== MBTI 统计系统 =====
    const MBTI_STATS_KEY = 'myluck-mbti-stats';
    const MBTI_HISTORY_KEY = 'myluck-mbti-history';

    // 基础分布数据（基于真实MBTI统计研究，更接近全球比例）
    const baseDistribution = {
        ISTJ: 1160, ISFJ: 1380, INFJ: 150, INTJ: 210,
        ISTP: 540, ISFP: 880, INFP: 440, INTP: 330,
        ESTP: 430, ESFP: 850, ENFP: 810, ENTP: 320,
        ESTJ: 870, ESFJ: 1200, ENFJ: 250, ENTJ: 180,
    };

    function getMBTIStats() {
        try {
            const saved = JSON.parse(localStorage.getItem(MBTI_STATS_KEY));
            if (saved && typeof saved === 'object') return saved;
        } catch {}
        // 初始化：基于基础分布 + 随机偏移
        const stats = {};
        const seed = window.MyLuck.getTodaySeed();
        Object.keys(baseDistribution).forEach((type, i) => {
            const offset = Math.floor(window.MyLuck.seededRandom(seed + i * 7) * 40 - 20);
            stats[type] = baseDistribution[type] + offset;
        });
        localStorage.setItem(MBTI_STATS_KEY, JSON.stringify(stats));
        return stats;
    }

    function saveMBTIResult(type) {
        // 更新统计
        const stats = getMBTIStats();
        stats[type] = (stats[type] || 0) + 1;
        localStorage.setItem(MBTI_STATS_KEY, JSON.stringify(stats));

        // 保存历史记录
        const history = JSON.parse(localStorage.getItem(MBTI_HISTORY_KEY) || '[]');
        history.unshift({ type, date: new Date().toISOString().split('T')[0] });
        localStorage.setItem(MBTI_HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
    }

    function showMBTIStats(myType) {
        const statsEl = document.getElementById('mbti-stats');
        if (!statsEl) return;
        statsEl.style.display = 'block';
        statsEl.style.animation = 'fadeInUp .5s ease';

        const stats = getMBTIStats();
        const allTypes = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

        function renderStats() {
            const total = Object.values(stats).reduce((a, b) => a + b, 0);
            const maxCount = Math.max(...Object.values(stats));
            const lang = I18n.lang;
            const grid = document.getElementById('mbti-stats-grid');
            if (!grid) return;

            grid.innerHTML = allTypes.map(type => {
                const count = stats[type] || 0;
                const pct = total > 0 ? (count / total * 100).toFixed(1) : 0;
                const barWidth = maxCount > 0 ? (count / maxCount * 100) : 0;
                const isMe = type === myType;
                const youLabel = lang === 'zh' ? '← 你' : '← YOU';
                return `<div class="mbti-stat-item ${isMe ? 'my-type' : ''}" ${isMe ? `data-you="${youLabel}"` : ''}>
                    <div class="mbti-stat-type">${type}</div>
                    <div class="mbti-stat-bar"><div class="mbti-stat-fill" style="width:0%;" data-w="${barWidth}"></div></div>
                    <div class="mbti-stat-pct">${pct}%</div>
                    <div class="mbti-stat-count">${count.toLocaleString()} ${lang === 'zh' ? '人' : 'ppl'}</div>
                </div>`;
            }).join('');

            // 动画延迟填充
            setTimeout(() => {
                grid.querySelectorAll('.mbti-stat-fill').forEach(el => {
                    el.style.width = el.dataset.w + '%';
                });
            }, 200);
        }

        renderStats();

        // 实时变更：每3-6秒随机增加某个类型的人数
        if (window._mbtiStatsTimer) clearInterval(window._mbtiStatsTimer);
        window._mbtiStatsTimer = setInterval(() => {
            const rIdx = Math.floor(Math.random() * allTypes.length);
            const rType = allTypes[rIdx];
            stats[rType] = (stats[rType] || 0) + 1;
            localStorage.setItem(MBTI_STATS_KEY, JSON.stringify(stats));
            renderStats();
            // 重新触发条形动画
            const grid = document.getElementById('mbti-stats-grid');
            if (grid) {
                grid.querySelectorAll('.mbti-stat-fill').forEach(el => {
                    el.style.width = el.dataset.w + '%';
                });
            }
        }, Math.floor(Math.random() * 3000) + 3000);

        // 我的历史记录
        const history = JSON.parse(localStorage.getItem(MBTI_HISTORY_KEY) || '[]');
        if (history.length > 1) {
            const historyEl = document.getElementById('mbti-my-history');
            historyEl.innerHTML = `<div style="font-size:.82rem;color:var(--text-light);border-top:1px solid #f0f0f5;padding-top:12px;">
                <strong>${lang === 'zh' ? '📝 你的测试记录：' : '📝 Your history:'}</strong>
                ${history.slice(0, 5).map(h => `<span style="display:inline-block;padding:2px 8px;margin:2px;background:rgba(225,112,85,0.08);border-radius:8px;font-size:.78rem;">${h.type} <span style="opacity:.6">${h.date}</span></span>`).join('')}
            </div>`;
        }
    }

    // 初始化 — 显示开始界面，等待用户点击开始
    document.getElementById('mbti-start-btn')?.addEventListener('click', () => {
        // 检查人机验证
        if (window.MyLuck && window.MyLuck.Turnstile && !window.MyLuck.Turnstile.isVerified()) {
            const lang = I18n.lang;
            alert(lang === 'zh' ? '请先完成人机验证' : 'Please complete verification first');
            return;
        }
        document.getElementById('mbti-start').style.display = 'none';
        document.getElementById('mbti-quiz').style.display = 'block';
        render();
        document.getElementById('mbti-quiz').scrollIntoView({ behavior: 'smooth' });
    });

    // 语言切换时重新渲染当前状态
    document.addEventListener('langchange', () => {
        if (current >= Q.length) {
            // 结果页：重新渲染结果（不重置分数）
            const type = (scores.E >= scores.I ? 'E' : 'I') +
                         (scores.S >= scores.N ? 'S' : 'N') +
                         (scores.T >= scores.F ? 'T' : 'F') +
                         (scores.J >= scores.P ? 'J' : 'P');
            const info = types[type];
            const lang = I18n.lang;
            const data = info[lang] || info.zh;
            document.getElementById('mbti-type-name').textContent = data.name;
            document.getElementById('mbti-desc').textContent = data.desc;

            // 重新渲染维度标签
            const dims = [
                ['E', 'I', scores.E, scores.I, lang === 'zh' ? '外向 E / 内向 I' : 'Extraversion / Introversion'],
                ['S', 'N', scores.S, scores.N, lang === 'zh' ? '感觉 S / 直觉 N' : 'Sensing / Intuition'],
                ['T', 'F', scores.T, scores.F, lang === 'zh' ? '思考 T / 情感 F' : 'Thinking / Feeling'],
                ['J', 'P', scores.J, scores.P, lang === 'zh' ? '判断 J / 感知 P' : 'Judging / Perceiving'],
            ];
            document.getElementById('mbti-dims').innerHTML = dims.map(([a, b, sa, sb, label]) => {
                const total = sa + sb;
                const pct = total ? Math.round((sa / total) * 100) : 50;
                const winner = sa >= sb ? a : b;
                return `<div class="mbti-dim">
                    <div class="dim-label">${label}</div>
                    <div class="dim-bar"><div class="dim-fill" style="width:${pct}%"></div></div>
                    <div class="dim-value">${winner} (${sa >= sb ? pct : 100 - pct}%)</div>
                </div>`;
            }).join('');

            // 重新渲染统计
            showMBTIStats(type);
            // 重新渲染分析
            renderAnalysis(type, lang);
        } else {
            // 答题中：重新渲染当前题目
            render();
        }
    });

    document.getElementById('mbti-retry')?.addEventListener('click', () => {
        current = 0;
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        document.getElementById('mbti-quiz').style.display = 'none';
        document.getElementById('mbti-result').style.display = 'none';
        document.getElementById('mbti-start').style.display = 'block';
        document.getElementById('mbti-start').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('mbti-share')?.addEventListener('click', () => {
        const type = document.getElementById('mbti-type').textContent;
        const name = document.getElementById('mbti-type-name').textContent;
        const text = I18n.lang === 'zh'
            ? `我的MBTI是 ${type}（${name}）！快来测测你的 →`
            : `My MBTI is ${type} (${name})! Take the test →`;
        window.MyLuck.Share.show(text, 'https://myluck.top/mbti.html');
    });

    // ===== MBTI 排行榜 =====
    let lastMBTIType = null;

    const MBTI_TYPE_EMOJIS = {
        ISTJ:'📋', ISFJ:'🛡️', INFJ:'🌙', INTJ:'🏗️',
        ISTP:'🔧', ISFP:'🎨', INFP:'🦋', INTP:'🔬',
        ESTP:'⚡', ESFP:'🎭', ENFP:'🌊', ENTP:'💡',
        ESTJ:'👔', ESFJ:'❤️', ENFJ:'🌟', ENTJ:'🎖️'
    };

    async function loadMBTILeaderboard() {
        const LB = window.MyLuck && window.MyLuck.Leaderboard;
        if (!LB) return;

        const allTypeKeys = Object.keys(types);
        const lang = I18n.lang;

        await LB.load('mbti-board-list', 'mbti', {
            mode: 'recent',
            limit: 10,
            virtualCount: 8,
            virtualConfig: {
                getEntry: function(rng, idx) {
                    const typeIdx = Math.floor(rng(1) * allTypeKeys.length);
                    const tp = allTypeKeys[typeIdx];
                    var typeName = types[tp] ? (lang === 'en' ? types[tp].en.name : types[tp].zh.name) : tp;
                    return {
                        score: Math.floor(rng(2) * 40 + 60),
                        character_emoji: MBTI_TYPE_EMOJIS[tp] || '🧠',
                        character_title: tp + ' ' + typeName
                    };
                }
            },
            formatEntry: function(entry, i, medal) {
                const esc = window.MyLuck.Security ? window.MyLuck.Security.escapeHtml : (s) => s;
                const emoji = entry.character_emoji || '🧠';
                // 显示MBTI类型而非分数
                var mbtiType = entry.character_title || '';
                // 如果是从数据库来的，可能只有类型代码，尝试添加名称
                if (mbtiType && mbtiType.length === 4 && types[mbtiType]) {
                    var tName = lang === 'en' ? types[mbtiType].en.name : types[mbtiType].zh.name;
                    mbtiType = mbtiType + ' ' + tName;
                }
                return '<div class="lb-left">' + medal + '<span class="lb-name">' + emoji + ' ' + esc(entry.name || '匿名') + '</span></div><span class="lb-detail" style="font-size:.85rem;color:#6c5ce7;font-weight:600;">' + esc(mbtiType) + '</span>';
            }
        });
    }

    async function submitMBTIScore() {
        if (!lastMBTIType) return;
        const LB = window.MyLuck && window.MyLuck.Leaderboard;
        if (!LB) return;

        const rankBtn = document.getElementById('mbti-rank-btn');
        if (rankBtn) { rankBtn.disabled = true; rankBtn.textContent = '...'; }

        // 计算"得分"：四个维度中最大倾向百分比的平均值
        const dims = [
            [scores.E, scores.I],
            [scores.S, scores.N],
            [scores.T, scores.F],
            [scores.J, scores.P]
        ];
        const dimScores = dims.map(([a, b]) => {
            const total = a + b;
            return total ? Math.round(Math.max(a, b) / total * 100) : 50;
        });
        const avgScore = Math.round(dimScores.reduce((a, b) => a + b, 0) / 4);

        const typeName = types[lastMBTIType] ?
            (I18n.lang === 'en' ? types[lastMBTIType].en.name : types[lastMBTIType].zh.name) : lastMBTIType;

        await LB.submit('mbti', {
            name: I18n.lang === 'en' ? 'Anonymous' : '匿名',
            score: avgScore,
            character_emoji: MBTI_TYPE_EMOJIS[lastMBTIType] || '🧠',
            character_title: lastMBTIType
        }, {
            onSuccess: function() {
                if (rankBtn) rankBtn.textContent = I18n.t('mbti.ranked');
                loadMBTILeaderboard();
            },
            onFail: function() {
                alert(I18n.t('mbti.rank_fail'));
                if (rankBtn) { rankBtn.disabled = false; rankBtn.textContent = I18n.t('mbti.rank_btn'); }
            }
        });
        if (rankBtn && !rankBtn.disabled) { rankBtn.disabled = false; rankBtn.textContent = I18n.t('mbti.rank_btn'); }
    }

    // 在showResult中记录结果类型
    const origShowResult = showResult;
    showResult = function() {
        origShowResult();
        lastMBTIType = (scores.E >= scores.I ? 'E' : 'I') +
                       (scores.S >= scores.N ? 'S' : 'N') +
                       (scores.T >= scores.F ? 'T' : 'F') +
                       (scores.J >= scores.P ? 'J' : 'P');
        const rankBtn = document.getElementById('mbti-rank-btn');
        if (rankBtn) { rankBtn.style.display = 'inline-block'; rankBtn.disabled = false; rankBtn.textContent = I18n.t('mbti.rank_btn'); }
        // 结果出来后渲染排行榜区域的 Turnstile（开始页面的 token 可能已过期）
        if (window.MyLuck && window.MyLuck.Turnstile && window.MyLuck.Turnstile.isEnabled()) {
            window.MyLuck.Turnstile.render('turnstile-mbti-rank');
        }
        loadMBTILeaderboard();
    };

    // 绑定上榜按钮
    const mbtiRankBtn = document.getElementById('mbti-rank-btn');
    if (mbtiRankBtn) mbtiRankBtn.addEventListener('click', submitMBTIScore);

    // 初始化排行榜
    loadMBTILeaderboard();

    // 注入统计人数
    var mbtiVisitor = document.getElementById('mbti-visitor-count');
    if (mbtiVisitor && window.MyLuck && window.MyLuck.injectVisitorCount) {
        window.MyLuck.injectVisitorCount(mbtiVisitor, {
            id: 'mbti',
            labelZh: '做过MBTI测试',
            labelEn: 'took the MBTI test'
        });
    }

    // Turnstile
    if (window.MyLuck.Turnstile && window.MyLuck.Turnstile.isEnabled()) {
        window.MyLuck.Turnstile.render('turnstile-mbti');
    }
})();
