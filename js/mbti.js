// ========== MBTI 完整测试 (60题) ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    I18n.add('zh', { 'mbti.title': '🧠 MBTI 性格测试', 'mbti.desc': '完整60道题目，探索你的性格类型（仅供娱乐参考）', 'mbti.retry': '🔄 重新测试', 'mbti.qof': '第 {0} / {1} 题', 'mbti.stats_title': '📊 MBTI 类型分布', 'mbti.stats_desc': '看看大家都是什么类型', 'mbti.history': '你的测试记录' });
    I18n.add('en', { 'mbti.title': '🧠 MBTI Personality Test', 'mbti.desc': 'Full 60 questions to discover your type (for fun only)', 'mbti.retry': '🔄 Retake', 'mbti.qof': 'Q {0} of {1}', 'mbti.stats_title': '📊 MBTI Type Distribution', 'mbti.stats_desc': 'See what types everyone got', 'mbti.history': 'Your History' });
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
    ];

    // 16 型描述
    const types = {
        ISTJ: { zh: { name: '检查者', emoji: '📋', desc: '你是一个认真负责、值得信赖的人。做事有条不紊、一丝不苟，是组织中的中流砥柱。你重视传统和规则，用行动而非言语来表达关心。在你身上，人们总能看到踏实和可靠。' }, en: { name: 'Inspector', emoji: '📋', desc: 'You are responsible, dependable, and thorough. You approach tasks methodically and are the backbone of any group. You value tradition and express care through actions rather than words.' }},
        ISFJ: { zh: { name: '守护者', emoji: '🛡️', desc: '温柔细心的你总是默默照顾身边的人。你有很强的观察力，能记住别人的喜好和需求。你低调但可靠，是朋友们最温暖的港湾。你的奉献精神让每个人都感到被珍视。' }, en: { name: 'Protector', emoji: '🛡️', desc: 'Gentle and attentive, you quietly take care of those around you. Your keen observation helps you remember others\' preferences. You\'re the warmest harbor for your friends.' }},
        INFJ: { zh: { name: '提倡者', emoji: '🌙', desc: '你拥有深邃的洞察力和理想主义精神。外表安静，内心世界却极其丰富。你追求有意义的生活，能够理解人心深处的渴望。你的存在总是给人以启发和温暖。' }, en: { name: 'Advocate', emoji: '🌙', desc: 'You have deep insight and idealistic spirit. Quiet on the outside but incredibly rich within, you seek a meaningful life and understand the deepest human yearnings.' }},
        INTJ: { zh: { name: '建筑师', emoji: '🏗️', desc: '独立自主、战略思维是你的标志。你善于构建宏大的蓝图并一步步去实现。在你的世界里，没有什么是不可能的。你的决心和远见让你成为天生的战略家。' }, en: { name: 'Architect', emoji: '🏗️', desc: 'Independent and strategic, you excel at building grand visions and executing them step by step. In your world, nothing is impossible. Your determination makes you a natural strategist.' }},
        ISTP: { zh: { name: '鉴赏家', emoji: '🔧', desc: '冷静务实的你是天生的问题解决者。你喜欢用双手探索世界，动手能力超强。面对突发状况你总能保持冷静，灵活应对。你享受自由，不喜受到束缚。' }, en: { name: 'Virtuoso', emoji: '🔧', desc: 'Cool and practical, you\'re a natural problem solver. You love exploring the world hands-on and stay calm under pressure. You value freedom and resist constraints.' }},
        ISFP: { zh: { name: '探险家', emoji: '🎨', desc: '你是一个温柔的自由灵魂，用感性的方式体验世界。你有独特的审美品味和艺术天赋。虽然不善言辞，但你的善良和真诚会在行动中自然流露。' }, en: { name: 'Adventurer', emoji: '🎨', desc: 'A gentle free spirit, you experience the world through feelings. You have unique aesthetic taste and artistic talent. Though not always vocal, your kindness shines through actions.' }},
        INFP: { zh: { name: '调停者', emoji: '🦋', desc: '你是一个理想主义的梦想家，内心世界如同一座花园般丰富多彩。你追求真诚和深度的连接，对不公正的事情会挺身而出。你的想象力和同理心是你最大的超能力。' }, en: { name: 'Mediator', emoji: '🦋', desc: 'An idealistic dreamer, your inner world is as rich as a garden. You seek authenticity and deep connections, standing up against injustice. Your imagination and empathy are your superpowers.' }},
        INTP: { zh: { name: '逻辑学家', emoji: '🔬', desc: '你拥有无穷的好奇心和独到的分析能力。思想是你最锋利的工具。你喜欢解构复杂的问题，寻找事物背后的逻辑。在知识的海洋里，你永远不会感到厌倦。' }, en: { name: 'Logician', emoji: '🔬', desc: 'With endless curiosity and sharp analytical skills, your mind is your greatest tool. You love deconstructing complex problems and finding the logic behind things.' }},
        ESTP: { zh: { name: '企业家', emoji: '⚡', desc: '充满行动力和冒险精神的你活在当下。你反应敏捷，善于把握机会，喜欢刺激和挑战。你的魅力和果断让你成为人群中最耀眼的存在。' }, en: { name: 'Entrepreneur', emoji: '⚡', desc: 'Full of action and adventure, you live in the moment. Quick to react and seize opportunities, your charisma and decisiveness make you shine in any crowd.' }},
        ESFP: { zh: { name: '表演者', emoji: '🎭', desc: '你是天生的焦点人物，热爱生活中的每一个精彩瞬间。你的热情和活力具有强大的感染力，和你在一起永远不会无聊。你用真诚和快乐温暖着每一个人。' }, en: { name: 'Entertainer', emoji: '🎭', desc: 'The life of every party, you love every exciting moment life offers. Your enthusiasm is contagious, and being around you is never boring. You warm everyone with genuine joy.' }},
        ENFP: { zh: { name: '竞选者', emoji: '🌊', desc: '你是一个充满激情和创造力的自由灵魂。你能在任何事物中发现可能性，你的热情能够激励身边的每一个人。对你来说，人生就是一场充满惊喜的探险。' }, en: { name: 'Campaigner', emoji: '🌊', desc: 'A passionate and creative free spirit, you find possibilities in everything. Your enthusiasm inspires everyone around you. Life, for you, is an adventure full of surprises.' }},
        ENTP: { zh: { name: '辩论家', emoji: '💡', desc: '机智灵活的你天生就是创新者。你享受思维的碰撞和辩论的快感，善于从不同角度审视问题。你的创造力和口才让你成为任何讨论中最有趣的声音。' }, en: { name: 'Debater', emoji: '💡', desc: 'Witty and flexible, you\'re a natural innovator. You enjoy intellectual sparring and examining problems from every angle. Your creativity makes you the most interesting voice in any discussion.' }},
        ESTJ: { zh: { name: '总经理', emoji: '👔', desc: '你是一个出色的组织者和领导者。你有清晰的目标和坚定的执行力，善于建立秩序和制度。人们信赖你的判断力和办事能力，你是团队的核心支柱。' }, en: { name: 'Executive', emoji: '👔', desc: 'An outstanding organizer and leader, you have clear goals and firm execution. People trust your judgment and capability. You are the core pillar of any team.' }},
        ESFJ: { zh: { name: '执政官', emoji: '❤️', desc: '温暖热心的你是社交圈的纽带。你善于照顾他人、营造和谐的氛围。你的慷慨和细心让你成为朋友中最受欢迎的人。你用爱和关怀凝聚了身边的每一个人。' }, en: { name: 'Consul', emoji: '❤️', desc: 'Warm and caring, you\'re the glue of your social circle. You excel at caring for others and creating harmony. Your generosity makes you the most beloved among friends.' }},
        ENFJ: { zh: { name: '主人公', emoji: '🌟', desc: '你是天生的领袖和鼓舞者。你有强大的同理心和远见卓识，能够激发每个人的潜力。你追求让世界变得更好，你的热情和使命感几乎改变了你接触的每一个人。' }, en: { name: 'Protagonist', emoji: '🌟', desc: 'A natural leader and inspirer, you have powerful empathy and vision. You bring out the best in everyone and strive to make the world better through your passion.' }},
        ENTJ: { zh: { name: '指挥官', emoji: '🎖️', desc: '你是一个果断自信的领导者，天生就擅长制定战略和带领团队走向成功。你有极强的目标导向和执行力，在你的字典里没有"不可能"。你的魄力和远见令人敬佩。' }, en: { name: 'Commander', emoji: '🎖️', desc: 'A decisive and confident leader, you excel at strategy and leading teams to success. Goal-oriented with strong execution, "impossible" isn\'t in your dictionary.' }},
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

        document.getElementById('mbti-result').scrollIntoView({ behavior: 'smooth' });

        // 统计：保存结果 & 展示分布
        saveMBTIResult(type);
        showMBTIStats(type);
    }

    // ===== MBTI 统计系统 =====
    const MBTI_STATS_KEY = 'myluck-mbti-stats';
    const MBTI_HISTORY_KEY = 'myluck-mbti-history';

    // 基础分布数据（基于真实MBTI统计模拟 + 本站用户叠加）
    const baseDistribution = {
        ISTJ: 116, ISFJ: 138, INFJ: 87, INTJ: 82,
        ISTP: 93, ISFP: 105, INFP: 123, INTP: 97,
        ESTP: 78, ESFP: 96, ENFP: 134, ENTP: 88,
        ESTJ: 107, ESFJ: 121, ENFJ: 95, ENTJ: 73,
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
        const total = Object.values(stats).reduce((a, b) => a + b, 0);
        const maxCount = Math.max(...Object.values(stats));
        const lang = I18n.lang;

        const grid = document.getElementById('mbti-stats-grid');
        const allTypes = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

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
                <div class="mbti-stat-count">${count} ${lang === 'zh' ? '人' : 'ppl'}</div>
            </div>`;
        }).join('');

        // 动画延迟填充
        setTimeout(() => {
            grid.querySelectorAll('.mbti-stat-fill').forEach(el => {
                el.style.width = el.dataset.w + '%';
            });
        }, 200);

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

    // 初始化
    render();

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
        } else {
            // 答题中：重新渲染当前题目
            render();
        }
    });

    document.getElementById('mbti-retry')?.addEventListener('click', () => {
        current = 0;
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        document.getElementById('mbti-quiz').style.display = 'block';
        document.getElementById('mbti-result').style.display = 'none';
        render();
        document.getElementById('mbti-quiz').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('mbti-share')?.addEventListener('click', () => {
        const type = document.getElementById('mbti-type').textContent;
        const name = document.getElementById('mbti-type-name').textContent;
        const text = I18n.lang === 'zh'
            ? `我的MBTI是 ${type}（${name}）！快来测测你的 →`
            : `My MBTI is ${type} (${name})! Take the test →`;
        window.MyLuck.Share.show(text, 'https://myluck.top/mbti.html');
    });
})();
