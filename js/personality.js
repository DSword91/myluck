// ========== 趣味性格标签测试 (8题) ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    I18n.add('zh', { 'ptest.title': '🧩 趣味性格标签', 'ptest.desc': '8个生活场景问题，测出你的隐藏性格标签' });
    I18n.add('en', { 'ptest.title': '🧩 Fun Personality Tags', 'ptest.desc': '8 life-scenario questions to reveal your hidden personality' });
    I18n.apply();

    const questions = {
        zh: [
            { q: '周末早上醒来，你最想做的第一件事是？', opts: [
                { t: '🛏️ 继续赖在床上享受慵懒时光', type: 'chill' },
                { t: '📱 看看有没有新消息', type: 'social' },
                { t: '🏃 出门运动或散步', type: 'active' },
                { t: '📖 读书或学习新东西', type: 'thinker' },
            ]},
            { q: '朋友突然约你去一个没去过的地方，你会？', opts: [
                { t: '🎉 太好了！立马出发', type: 'active' },
                { t: '🤔 先查评价再决定', type: 'thinker' },
                { t: '😊 朋友去哪我去哪', type: 'social' },
                { t: '😴 看心情再说吧', type: 'chill' },
            ]},
            { q: '如果给你一个超能力，你最想要？', opts: [
                { t: '⏰ 时间暂停 — 享受宁静片刻', type: 'chill' },
                { t: '🗣️ 读心术 — 理解每个人', type: 'social' },
                { t: '🦅 飞行能力 — 看更大的世界', type: 'active' },
                { t: '🧠 超级记忆 — 过目不忘', type: 'thinker' },
            ]},
            { q: '你在一个团队项目中通常扮演什么角色？', opts: [
                { t: '🎯 制定计划和分配任务', type: 'thinker' },
                { t: '🤝 协调关系和解决冲突', type: 'social' },
                { t: '🔥 冲在前面执行任务', type: 'active' },
                { t: '🌿 提供支持和后勤保障', type: 'chill' },
            ]},
            { q: '遇到压力很大的事情时，你会？', opts: [
                { t: '📊 列出问题逐个分析解决', type: 'thinker' },
                { t: '💬 找朋友倾诉释放压力', type: 'social' },
                { t: '🏋️ 通过运动或行动转移注意力', type: 'active' },
                { t: '🎵 听音乐/看剧让自己放松', type: 'chill' },
            ]},
            { q: '你梦想中的理想假期是？', opts: [
                { t: '🏝️ 在海边什么都不做发呆', type: 'chill' },
                { t: '🎡 和一群好友嗨玩一整天', type: 'social' },
                { t: '🏔️ 去没去过的地方冒险探索', type: 'active' },
                { t: '🏛️ 参观博物馆和历史遗迹', type: 'thinker' },
            ]},
            { q: '别人送你一个神秘礼物盒，你会？', opts: [
                { t: '🎁 立刻打开！等不及了', type: 'active' },
                { t: '🤔 先摇摇听听猜猜是什么', type: 'thinker' },
                { t: '📸 先拍照分享再拆', type: 'social' },
                { t: '😌 找个舒适的时间慢慢拆', type: 'chill' },
            ]},
            { q: '如果你是一种天气，你觉得自己最像？', opts: [
                { t: '☀️ 阳光明媚 — 温暖而热烈', type: 'social' },
                { t: '🌤️ 微风拂面 — 舒适而惬意', type: 'chill' },
                { t: '⛈️ 雷阵雨 — 有爆发力', type: 'active' },
                { t: '🌙 星空夜晚 — 深邃而宁静', type: 'thinker' },
            ]},
        ],
        en: [
            { q: 'What\'s the first thing you want to do on a weekend morning?', opts: [
                { t: '🛏️ Stay in bed and enjoy the coziness', type: 'chill' },
                { t: '📱 Check my messages', type: 'social' },
                { t: '🏃 Go for a run or walk', type: 'active' },
                { t: '📖 Read or learn something new', type: 'thinker' },
            ]},
            { q: 'A friend invites you to an unknown place. What do you do?', opts: [
                { t: '🎉 Let\'s go right now!', type: 'active' },
                { t: '🤔 Check reviews first', type: 'thinker' },
                { t: '😊 Wherever friends go, I go', type: 'social' },
                { t: '😴 Depends on my mood', type: 'chill' },
            ]},
            { q: 'If you could have one superpower?', opts: [
                { t: '⏰ Time freeze — enjoy a moment of peace', type: 'chill' },
                { t: '🗣️ Mind reading — understand everyone', type: 'social' },
                { t: '🦅 Flying — see the bigger world', type: 'active' },
                { t: '🧠 Perfect memory — never forget', type: 'thinker' },
            ]},
            { q: 'What role do you usually play in a team project?', opts: [
                { t: '🎯 Planner and task delegator', type: 'thinker' },
                { t: '🤝 Mediator and peacekeeper', type: 'social' },
                { t: '🔥 Frontline executor', type: 'active' },
                { t: '🌿 Support and logistics', type: 'chill' },
            ]},
            { q: 'How do you handle high-pressure situations?', opts: [
                { t: '📊 List and analyze problems one by one', type: 'thinker' },
                { t: '💬 Talk to friends to release stress', type: 'social' },
                { t: '🏋️ Exercise or take action to distract', type: 'active' },
                { t: '🎵 Listen to music or watch shows to relax', type: 'chill' },
            ]},
            { q: 'What\'s your dream vacation?', opts: [
                { t: '🏝️ Doing nothing at a beach', type: 'chill' },
                { t: '🎡 A fun day out with friends', type: 'social' },
                { t: '🏔️ Exploring uncharted territories', type: 'active' },
                { t: '🏛️ Visiting museums and history sites', type: 'thinker' },
            ]},
            { q: 'Someone gives you a mystery gift box. What do you do?', opts: [
                { t: '🎁 Open immediately! Can\'t wait!', type: 'active' },
                { t: '🤔 Shake it, listen, and guess first', type: 'thinker' },
                { t: '📸 Take a photo to share, then open', type: 'social' },
                { t: '😌 Find a cozy time to open it slowly', type: 'chill' },
            ]},
            { q: 'If you were a type of weather, which would you be?', opts: [
                { t: '☀️ Bright sunshine — warm and radiant', type: 'social' },
                { t: '🌤️ Gentle breeze — comfortable and easy', type: 'chill' },
                { t: '⛈️ Thunderstorm — powerful and intense', type: 'active' },
                { t: '🌙 Starry night — deep and serene', type: 'thinker' },
            ]},
        ],
    };

    const results = {
        chill: {
            zh: { emoji: '🌊', title: '佛系生活家', desc: '你是一个懂得享受生活的人！不焦虑、不内卷，拥有让人羡慕的松弛感。你知道生活不只是忙碌和竞争，还有无数美好值得慢慢品味。你的存在就像一杯温热的茶，让身边人都能感到安心和舒适。你是快节奏世界中一股清流。', tags: ['松弛感满满', '内心平静', '享受当下', '治愈系存在', '慢生活达人'] },
            en: { emoji: '🌊', title: 'Zen Life Master', desc: 'You know how to truly enjoy life! Free from anxiety and pressure, you have an enviable sense of relaxation. You understand that life is about savoring the beautiful moments. Your presence is like a warm cup of tea — soothing and comforting to everyone around you.', tags: ['Chill vibes', 'Inner peace', 'Present-focused', 'Healing presence', 'Slow living'] },
        },
        social: {
            zh: { emoji: '🌻', title: '人间小太阳', desc: '你天生就是社交场的焦点！善于倾听、善于共情、善于连接人与人之间的关系。你像一颗小太阳，无论走到哪里都能照亮身边人。你的真诚和热情是你最宝贵的品质。你的朋友们太幸运了，有你这样一个暖心的存在。', tags: ['社交达人', '善解人意', '温暖如阳', '人缘极佳', '氛围制造者'] },
            en: { emoji: '🌻', title: 'Little Sunshine', desc: 'You\'re naturally the center of any social scene! Great at listening, empathizing, and connecting people. Like a little sun, you brighten everyone\'s day wherever you go. Your sincerity and warmth are your most treasured qualities.', tags: ['Social star', 'Empathetic', 'Warm as sun', 'Popular', 'Vibe creator'] },
        },
        active: {
            zh: { emoji: '🚀', title: '冒险行动派', desc: '你是一个充满能量的行动派！不畏未知、勇于尝试，生活就是一场精彩的冒险。你的勇气和决心让你能突破常规、创造不凡。比起纠结和犹豫，你更喜欢直接上手做！你的执行力让人佩服，你就是那个把事情做成的人。', tags: ['勇于冒险', '精力充沛', '说干就干', '热爱探索', '执行力max'] },
            en: { emoji: '🚀', title: 'Adventure Action Hero', desc: 'You\'re a powerhouse of energy! Fearless of the unknown and always ready to try new things. Your courage and determination let you break boundaries and create the extraordinary. You\'re the person who makes things happen!', tags: ['Adventurous', 'Energetic', 'Just do it', 'Explorer', 'Max execution'] },
        },
        thinker: {
            zh: { emoji: '💡', title: '智慧思考者', desc: '你拥有独立且深入的思考能力！善于分析、热爱学习，你总能从细节中发现别人忽略的东西。你追求知识和真理，在你看来不断成长和进步就是最大的快乐。你的洞察力就是你的超能力，别人看到表面，你看到本质。', tags: ['理性分析', '好学不倦', '洞察力强', '追求卓越', '深度思考'] },
            en: { emoji: '💡', title: 'Wisdom Thinker', desc: 'You have independent and deep thinking abilities! Great at analysis and passionate about learning, you always discover what others miss. For you, continuous growth is the greatest joy. Your insight is your superpower.', tags: ['Analytical', 'Lifelong learner', 'Insightful', 'Excellence-seeker', 'Deep thinker'] },
        },
    };

    let current = 0, answers = [];

    function render() {
        const lang = I18n.lang;
        const qs = questions[lang] || questions.zh;

        if (current >= qs.length) { showResult(); return; }

        document.getElementById('ptest-quiz').style.display = 'block';
        document.getElementById('ptest-result').style.display = 'none';

        const q = qs[current];
        document.getElementById('pt-bar').style.width = (current / qs.length * 100) + '%';
        document.getElementById('pt-q').textContent = `Q${current + 1}. ${q.q}`;
        document.getElementById('pt-opts').innerHTML = q.opts.map(o =>
            `<button class="quiz-option" data-type="${o.type}">${o.t}</button>`
        ).join('');

        document.getElementById('pt-opts').querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', function () {
                answers.push(this.dataset.type);
                current++;
                render();
            });
        });
    }

    function showResult() {
        const counts = {};
        answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
        const winner = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 'chill';

        const lang = I18n.lang;
        const r = results[winner][lang] || results[winner].zh;

        document.getElementById('ptest-quiz').style.display = 'none';
        document.getElementById('ptest-result').style.display = 'block';
        document.getElementById('pt-emoji').textContent = r.emoji;
        document.getElementById('pt-title').textContent = r.title;
        document.getElementById('pt-desc').textContent = r.desc;
        document.getElementById('pt-tags').innerHTML = r.tags.map(t => `<span class="personality-tag">#${t}</span>`).join('');
    }

    render();

    document.getElementById('pt-retry')?.addEventListener('click', () => {
        current = 0; answers = [];
        render();
        document.getElementById('ptest-quiz').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('pt-share')?.addEventListener('click', () => {
        const title = document.getElementById('pt-title').textContent;
        const text = I18n.lang === 'zh'
            ? `我的性格标签是「${title}」！快来测测你的 →`
            : `My personality tag is "${title}"! Try it →`;
        window.MyLuck.Share.show(text, 'https://myluck.top/personality.html');
    });

    // 语言切换时重新渲染
    document.addEventListener('langchange', () => {
        const lang = I18n.lang;
        const qs = questions[lang] || questions.zh;
        if (current >= qs.length && answers.length > 0) {
            // 结果页：重新渲染
            showResult();
        } else if (current < qs.length) {
            // 答题中：重新渲染当前题目
            render();
        }
    });
})();
