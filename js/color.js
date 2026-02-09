// ========== 幸运色彩测试 ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    I18n.add('zh', { 'color.title': '🎨 幸运色彩测试', 'color.desc': '选一个你最喜欢的颜色，看看它代表什么趣味含义' });
    I18n.add('en', { 'color.title': '🎨 Lucky Color Test', 'color.desc': 'Pick your favorite color and see what fun meaning it holds' });
    I18n.apply();

    const data = {
        red: {
            zh: { title: '🔴 热情如火的行动派', meaning: '选择红色的你，内心充满激情和行动力！你是一个敢想敢做的人，面对挑战迎难而上。你的热情很容易感染身边的人，是天生的领导者和鼓舞者。你的存在总是给团队注入源源不断的能量。', traits: ['充满活力', '勇于挑战', '热情洋溢', '行动力强', '感染力强'] },
            en: { title: '🔴 Passionate Action-Taker', meaning: 'Choosing red means you\'re full of passion and drive! You dare to dream big and act boldly. Your enthusiasm naturally inspires those around you, making you a born leader and motivator.', traits: ['Energetic', 'Brave', 'Passionate', 'Action-oriented', 'Inspiring'] },
        },
        orange: {
            zh: { title: '🟠 温暖阳光的社交达人', meaning: '钟情橙色的你像阳光一样温暖明亮！你善于社交，总能和不同的人打成一片。你的幽默感和亲和力是你最大的魅力，任何场合都能成为气氛担当。', traits: ['善于社交', '乐观开朗', '亲和力强', '幽默风趣', '气氛担当'] },
            en: { title: '🟠 Warm Social Butterfly', meaning: 'Loving orange means you\'re warm and bright like sunshine! Your humor and approachability are your greatest charms, and you light up any room you walk into.', traits: ['Social', 'Optimistic', 'Approachable', 'Humorous', 'Mood-maker'] },
        },
        yellow: {
            zh: { title: '🟡 智慧闪耀的思考者', meaning: '热爱黄色的你拥有敏捷的思维和无限创造力！你善于分析和思考，总能找到独特的解决方案。你的智慧和创新精神让你在人群中脱颖而出。', traits: ['思维敏捷', '富有创意', '好奇心强', '学习力佳', '创新精神'] },
            en: { title: '🟡 Brilliant Thinker', meaning: 'Loving yellow means you have a sharp mind and limitless creativity! You excel at analysis and always find unique solutions that set you apart from the crowd.', traits: ['Quick-minded', 'Creative', 'Curious', 'Fast learner', 'Innovative'] },
        },
        green: {
            zh: { title: '🟢 自然和谐的平衡大师', meaning: '偏爱绿色的你追求内心的和谐与平衡！你是一个稳重可靠的人，善于调解矛盾、维护和平。你热爱自然和生活中简单而美好的事物。你是大家心中的定海神针。', traits: ['稳重可靠', '善于平衡', '亲近自然', '内心平和', '包容大度'] },
            en: { title: '🟢 Natural Harmony Master', meaning: 'Loving green means you seek inner harmony and balance! You\'re steady and reliable, excellent at mediating conflicts and maintaining peace. You love nature and life\'s simple beauties.', traits: ['Reliable', 'Balanced', 'Nature-loving', 'Peaceful', 'Tolerant'] },
        },
        blue: {
            zh: { title: '🔵 深邃睿智的梦想家', meaning: '喜爱蓝色的你有着深邃的内心世界和远大的理想！你冷静理性，善于独立思考，有着坚定的原则和信念。你的沉稳和可靠让人格外信任。', traits: ['冷静理性', '目标清晰', '值得信赖', '思想深邃', '原则坚定'] },
            en: { title: '🔵 Wise Dreamer', meaning: 'Loving blue means you have a deep inner world and grand ideals! You\'re calm, rational, and an independent thinker with firm principles. Your composure earns deep trust from others.', traits: ['Rational', 'Goal-oriented', 'Trustworthy', 'Deep thinker', 'Principled'] },
        },
        purple: {
            zh: { title: '🟣 神秘优雅的艺术灵魂', meaning: '钟爱紫色的你拥有独特的审美和艺术品味！你注重精神世界的丰富，对美有着敏锐的感知力。你的神秘气质和独特品味让你魅力无穷。', traits: ['审美独特', '感性细腻', '气质优雅', '想象力丰富', '品味不凡'] },
            en: { title: '🟣 Mysterious Artistic Soul', meaning: 'Loving purple means you have unique aesthetics and artistic taste! You value a rich spiritual world and perceive beauty keenly. Your mysterious charm and taste make you endlessly fascinating.', traits: ['Aesthetic', 'Sensitive', 'Elegant', 'Imaginative', 'Refined taste'] },
        },
        pink: {
            zh: { title: '🩷 温柔浪漫的理想主义者', meaning: '钟情粉色的你有着温柔细腻的内心！你相信爱与美好，善于发现生活中的浪漫与温馨。你的温柔是治愈身边人的良药，你总能让人感到被关爱。', traits: ['温柔体贴', '浪漫唯美', '善解人意', '治愈系', '充满爱心'] },
            en: { title: '🩷 Romantic Idealist', meaning: 'Loving pink means you have a tender and delicate heart! You believe in love and beauty, finding romance in everyday life. Your gentleness heals those around you.', traits: ['Gentle', 'Romantic', 'Empathetic', 'Healing', 'Loving'] },
        },
        black: {
            zh: { title: '⚫ 沉稳神秘的力量型', meaning: '选择黑色的你有着强大的内心和独立的人格！你不随波逐流，有自己的想法和主见。你的神秘感和深沉气场让人印象深刻，你是一个内心强大的人。', traits: ['独立自主', '意志坚定', '沉稳内敛', '品味高级', '气场强大'] },
            en: { title: '⚫ Powerful Mystery', meaning: 'Choosing black means you have a strong inner world and independent personality! You don\'t follow the crowd and have your own convictions. Your mysterious aura leaves a lasting impression.', traits: ['Independent', 'Strong-willed', 'Composed', 'Sophisticated', 'Commanding'] },
        },
    };

    let selectedColor = null;

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.dataset.color;

            const lang = I18n.lang;
            const info = data[selectedColor][lang] || data[selectedColor].zh;

            document.getElementById('cr-title').textContent = info.title;
            document.getElementById('cr-meaning').textContent = info.meaning;
            document.getElementById('cr-traits').innerHTML = info.traits.map(t => `<span class="color-trait">${t}</span>`).join('');

            const el = document.getElementById('color-result');
            el.style.display = 'block';
            el.style.animation = 'none'; el.offsetHeight;
            el.style.animation = 'fadeInUp .5s ease';
        });
    });

    document.getElementById('color-share')?.addEventListener('click', () => {
        if (!selectedColor) return;
        const lang = I18n.lang;
        const info = data[selectedColor][lang] || data[selectedColor].zh;
        const text = lang === 'zh'
            ? `我的幸运色彩是「${info.title}」！来测测你的 →`
            : `My lucky color personality is "${info.title}"! Try it →`;
        window.MyLuck.Share.show(text, 'https://myluck.top/color.html');
    });

    // 语言切换时重新渲染已选颜色的结果
    document.addEventListener('langchange', () => {
        if (!selectedColor) return;
        const lang = I18n.lang;
        const info = data[selectedColor][lang] || data[selectedColor].zh;
        document.getElementById('cr-title').textContent = info.title;
        document.getElementById('cr-meaning').textContent = info.meaning;
        document.getElementById('cr-traits').innerHTML = info.traits.map(t => `<span class="color-trait">${t}</span>`).join('');
    });
})();
