// ========== 每日运气测试 ==========
(function () {
    'use strict';
    const { I18n, seededRandom, getTodaySeed, getStars, animateCounter } = window.MyLuck;

    // 翻译
    I18n.add('zh', {
        'home.title': '测测今天的好运指数',
        'home.subtitle': '每天一次趣味测试，开启快乐好心情！',
        'home.cta': '开始测试 →',
        'home.more': '🎮 更多趣味测试',
        'home.more_desc': '感兴趣的话，来试试这些好玩的测试吧',
        'fortune.title': '🎯 每日运气测试',
        'fortune.desc': '输入你的信息，获取今日专属趣味运势（仅供娱乐）',
        'fortune.name': '你的昵称',
        'fortune.name_ph': '输入昵称（可选）',
        'fortune.month': '出生月份',
        'fortune.select_month': '请选择月份',
        'fortune.mood': '今天的心情',
        'fortune.mood_happy': '😊 开心', 'fortune.mood_calm': '😌 平静',
        'fortune.mood_excited': '🤩 兴奋', 'fortune.mood_tired': '😴 疲惫',
        'fortune.mood_anxious': '😰 焦虑',
        'fortune.submit': '✨ 查看今日运势',
        'fortune.r_work': '工作学习', 'fortune.r_social': '人际关系',
        'fortune.r_creative': '创造灵感', 'fortune.r_energy': '活力指数',
        'fortune.r_luck': '偶遇好运', 'fortune.r_wisdom': '灵光一闪',
        'fortune.share': '📤 分享给朋友',
        'quote.title': '💬 每日正能量',
        'card.mbti_title': 'MBTI 性格测试', 'card.mbti_desc': '完整93道正规题目，深度了解你的性格类型，发现真实的自己',
        'card.mbti_tag': '93题 · 约10-15分钟',
        'card.color_title': '幸运色彩测试', 'card.color_desc': '你最喜欢的颜色隐藏着什么趣味性格密码？点击揭晓',
        'card.color_tag': '8种色彩 · 秒出结果',
        'card.personality_title': '趣味性格标签', 'card.personality_desc': '8个生活场景问题，测出你的隐藏性格标签，准到你笑',
        'card.personality_tag': '8题 · 约2分钟',
        'card.guestbook_title': '祝福墙', 'card.guestbook_desc': '写下你的祝福，让好运传递给每一个人',
        'card.guestbook_tag': '全球祝福',
    });
    I18n.add('en', {
        'home.title': 'Test Your Lucky Index Today',
        'home.subtitle': 'A fun daily test for a great mood!',
        'home.cta': 'Start Test →',
        'home.more': '🎮 More Fun Tests',
        'home.more_desc': 'Interested? Try these fun quizzes!',
        'fortune.title': '🎯 Daily Luck Test',
        'fortune.desc': 'Enter your info for today\'s personalized fun result (for entertainment only)',
        'fortune.name': 'Your Nickname',
        'fortune.name_ph': 'Enter nickname (optional)',
        'fortune.month': 'Birth Month',
        'fortune.select_month': 'Select month',
        'fortune.mood': 'Today\'s Mood',
        'fortune.mood_happy': '😊 Happy', 'fortune.mood_calm': '😌 Calm',
        'fortune.mood_excited': '🤩 Excited', 'fortune.mood_tired': '😴 Tired',
        'fortune.mood_anxious': '😰 Anxious',
        'fortune.submit': '✨ Get My Luck',
        'fortune.r_work': 'Work/Study', 'fortune.r_social': 'Social',
        'fortune.r_creative': 'Creativity', 'fortune.r_energy': 'Energy',
        'fortune.r_luck': 'Luck', 'fortune.r_wisdom': 'Inspiration',
        'fortune.share': '📤 Share with Friends',
        'quote.title': '💬 Daily Inspiration',
        'card.mbti_title': 'MBTI Personality Test', 'card.mbti_desc': 'Full 93 questions to discover your personality type and understand yourself better',
        'card.mbti_tag': '93 Qs · ~10-15 min',
        'card.color_title': 'Lucky Color Test', 'card.color_desc': 'What does your favorite color reveal about your personality?',
        'card.color_tag': '8 Colors · Instant',
        'card.personality_title': 'Personality Tags', 'card.personality_desc': '8 fun scenario questions to uncover your hidden personality traits',
        'card.personality_tag': '8 Qs · ~2 min',
        'card.guestbook_title': 'Blessing Wall', 'card.guestbook_desc': 'Write your blessings, spread good luck to everyone',
        'card.guestbook_tag': 'Global Blessings',
    });
    I18n.apply();

    // 数据
    const tips = {
        zh: [
            '今天适合尝试新事物，好奇心会带来意想不到的收获！',
            '和朋友聊聊天，分享快乐让好心情加倍~',
            '静下心来读本好书，思维会更加清晰有力。',
            '今天的灵感特别丰富，适合做创意类事情！',
            '运动一下吧！活力满满的一天从行动开始。',
            '整理工作/学习计划，条理清晰效率翻倍！',
            '给自己一个小奖励，你值得被好好对待~',
            '今天学习新技能会事半功倍，吸收力max！',
            '放慢脚步感受生活，美好就在身边。',
            '勇敢面对困难，困难不过是化了妆的礼物！',
            '和家人聊聊天，温暖的对话是最好的能量补充。',
            '相信自己的判断力，今天做的决定会带来好结果！',
            '保持微笑，好运会被你的乐观吸引~',
            '换个角度思考问题，或许豁然开朗！',
            '今天适合出门走走，大自然会给你充电。',
            '专注当下，效率和质量都会超出预期！',
            '善待他人也善待自己，正能量会形成循环。',
            '早睡早起，规律作息是好状态的秘诀！',
            '今天的社交运特别好，主动联系朋友吧！',
            '整理房间或工作台，清爽环境带来清爽心情。',
        ],
        en: [
            'Try something new today — curiosity leads to unexpected rewards!',
            'Chat with a friend — shared joy doubles happiness~',
            'Read a good book — your mind will feel sharper and clearer.',
            'Your creativity is peaking today — great for creative work!',
            'Get some exercise! An energetic day starts with action.',
            'Organize your plans — clear structure boosts efficiency!',
            'Treat yourself — you deserve something nice today~',
            'Perfect day for learning new skills — absorption is at max!',
            'Slow down and appreciate life — beauty is in the small details.',
            'Face challenges bravely — difficulties are gifts in disguise!',
            'Talk to family — warm conversations are the best energy boost.',
            'Trust your judgment — today\'s decisions will bear fruit!',
            'Keep smiling — luck is drawn to your optimism~',
            'Try a new perspective — it might change everything!',
            'Go for a walk — nature will recharge your batteries.',
            'Focus on the present — quality and efficiency will surprise you!',
            'Be kind to others and yourself — positive energy comes full circle.',
            'Early to bed, early to rise — routine is the key to a great state!',
            'Your social luck is exceptional today — reach out to friends!',
            'Tidy your space — a clean environment brings a fresh mindset.',
        ],
    };

    const emojis = ['🌟', '🔥', '💫', '🌈', '🎉', '🍀', '⭐', '💎', '🌸', '🎯', '🚀', '💪'];
    const colors = {
        zh: [{ n: '薰衣草紫', h: '#a29bfe' }, { n: '珊瑚橙', h: '#ff7675' }, { n: '薄荷绿', h: '#55efc4' }, { n: '天空蓝', h: '#74b9ff' }, { n: '柠檬黄', h: '#ffeaa7' }, { n: '玫瑰粉', h: '#fd79a8' }, { n: '森林绿', h: '#00b894' }, { n: '宝石蓝', h: '#0984e3' }],
        en: [{ n: 'Lavender', h: '#a29bfe' }, { n: 'Coral', h: '#ff7675' }, { n: 'Mint', h: '#55efc4' }, { n: 'Sky Blue', h: '#74b9ff' }, { n: 'Lemon', h: '#ffeaa7' }, { n: 'Rose', h: '#fd79a8' }, { n: 'Forest', h: '#00b894' }, { n: 'Sapphire', h: '#0984e3' }],
    };
    const directions = {
        zh: ['东', '南', '西', '北', '东南', '东北', '西南', '西北'],
        en: ['East', 'South', 'West', 'North', 'Southeast', 'Northeast', 'Southwest', 'Northwest'],
    };

    // 名言
    const quotes = {
        zh: [
            { t: '生活不是等待暴风雨过去，而是学会在雨中翩翩起舞。', a: '维维安·格林' },
            { t: '每一个不曾起舞的日子，都是对生命的辜负。', a: '尼采' },
            { t: '你不需要很厉害才能开始，但你需要开始才能变得很厉害。', a: '齐格·金克拉' },
            { t: '种一棵树最好的时间是十年前，其次是现在。', a: '中国谚语' },
            { t: '成功不是终点，失败也并非末日，重要的是继续前进的勇气。', a: '丘吉尔' },
            { t: '不要害怕缓慢的进步，只需害怕停滞不前。', a: '中国谚语' },
            { t: '你比你想象的更勇敢，比你看起来更坚强。', a: 'A.A.米尔恩' },
            { t: '把每一天当作生命中的最后一天去活。', a: '史蒂夫·乔布斯' },
        ],
        en: [
            { t: 'Life isn\'t about waiting for the storm to pass, it\'s about learning to dance in the rain.', a: 'Vivian Greene' },
            { t: 'Every day not spent dancing is a day wasted.', a: 'Nietzsche' },
            { t: 'You don\'t have to be great to start, but you have to start to be great.', a: 'Zig Ziglar' },
            { t: 'The best time to plant a tree was 20 years ago. The second best time is now.', a: 'Chinese Proverb' },
            { t: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', a: 'Churchill' },
            { t: 'Do not fear going slowly, only fear standing still.', a: 'Chinese Proverb' },
            { t: 'You are braver than you believe, stronger than you seem.', a: 'A.A. Milne' },
            { t: 'Stay hungry, stay foolish.', a: 'Steve Jobs' },
        ],
    };

    // 生成运势
    function generate() {
        const month = parseInt(document.getElementById('fortune-month').value);
        if (!month) { document.getElementById('fortune-month').focus(); return; }

        const name = document.getElementById('fortune-name').value.trim();
        const mood = document.getElementById('fortune-mood').value;
        const moodSeed = { happy: 7, calm: 13, excited: 23, tired: 31, anxious: 41 }[mood] || 0;
        const nameSeed = name ? [...name].reduce((a, c) => a + c.charCodeAt(0), 0) : 0;

        const baseSeed = getTodaySeed() + month + moodSeed + nameSeed;

        // 彩蛋：纯白 + 八月 = 100% 好运
        const isEasterEgg = (name === '纯白') && month === 8;
        const luck = isEasterEgg ? 100 : Math.floor(seededRandom(baseSeed) * 40 + 60);
        const dims = isEasterEgg
            ? [5, 5, 5, 5, 5, 5]
            : [1, 2, 3, 4, 5, 6].map(i => Math.floor(seededRandom(baseSeed + i) * 3 + 3));
        const lang = I18n.lang;

        // UI
        document.getElementById('result-emoji').textContent = emojis[Math.floor(seededRandom(baseSeed + 10) * emojis.length)];
        document.getElementById('result-title').textContent = name
            ? (lang === 'zh' ? `${name} · 今日好运指数` : `${name}'s Luck Index`)
            : (lang === 'zh' ? `${month}月生 · 今日好运指数` : `Born in Month ${month} · Today's Luck`);

        const bar = document.getElementById('luck-bar');
        bar.style.width = '0%';
        document.getElementById('luck-value').textContent = luck + '%';

        ['r-work', 'r-social', 'r-creative', 'r-energy', 'r-luck', 'r-wisdom'].forEach((id, i) => {
            document.getElementById(id).textContent = getStars(dims[i]);
        });

        const tipList = tips[lang] || tips.zh;
        document.getElementById('lucky-tip').textContent = isEasterEgg
            ? (lang === 'zh' ? '💡 纯白专属：今天的你，运气值已经拉满，全世界都在为你让路！' : '💡 Special: Your luck is maxed out today, the whole world is making way for you!')
            : '💡 ' + tipList[Math.floor(seededRandom(baseSeed + 20) * tipList.length)];

        const colorList = colors[lang] || colors.zh;
        const c = colorList[Math.floor(seededRandom(baseSeed + 30) * colorList.length)];
        document.getElementById('lucky-color').innerHTML = `🎨 ${lang === 'zh' ? '幸运色' : 'Lucky Color'}：<span style="color:${c.h};font-weight:700;">${c.n}</span>`;
        document.getElementById('lucky-number').textContent = `🔢 ${lang === 'zh' ? '幸运数字' : 'Lucky #'}：${Math.floor(seededRandom(baseSeed + 40) * 99 + 1)}`;
        const dir = (directions[lang] || directions.zh)[Math.floor(seededRandom(baseSeed + 50) * 8)];
        document.getElementById('lucky-direction').textContent = `🧭 ${lang === 'zh' ? '幸运方位' : 'Lucky Dir'}：${dir}`;

        const result = document.getElementById('fortune-result');
        result.style.display = 'block';
        result.style.animation = 'none';
        result.offsetHeight;
        result.style.animation = 'fadeInUp .5s ease';
        setTimeout(() => { bar.style.width = luck + '%'; }, 100);

        result.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 保存分数用于上榜
        lastLuckScore = luck;
        lastResultName = name;
        var rankBtn = document.getElementById('fortune-rank-btn');
        if (rankBtn) { rankBtn.style.display = 'inline-block'; rankBtn.disabled = false; rankBtn.textContent = I18n.t('fortune.rank'); }
    }

    document.getElementById('fortune-submit').addEventListener('click', generate);

    // 分享
    document.getElementById('share-btn')?.addEventListener('click', () => {
        const title = document.getElementById('result-title').textContent;
        const luck = document.getElementById('luck-value').textContent;
        const text = I18n.lang === 'zh'
            ? `我在 MyLuck 测了${title}，结果是 ${luck}！快来试试 →`
            : `I got ${luck} on MyLuck's Daily Luck Test! Try it →`;
        window.MyLuck.Share.show(text, 'https://myluck.top');
    });

    // 每日名言 — 优先从 Hitokoto API 拉取，失败则用本地
    const seed = getTodaySeed();
    const lang = I18n.lang;
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    function setLocalQuote(lang) {
        const qList = quotes[lang] || quotes.zh;
        const q = qList[Math.floor(seededRandom(seed + 999) * qList.length)];
        quoteText.textContent = q.t;
        quoteAuthor.textContent = '—— ' + q.a;
    }

    async function fetchHitokoto() {
        try {
            // 类型: a=动画 b=漫画 c=游戏 d=文学 e=原创 f=网络 g=其他 h=影视 i=诗词 j=网易云 k=哲学 l=抖机灵
            const res = await fetch('https://v1.hitokoto.cn?c=d&c=i&c=k&encode=json&charset=utf-8', { signal: AbortSignal.timeout(3000) });
            const data = await res.json();
            if (data && data.hitokoto) {
                quoteText.textContent = data.hitokoto;
                quoteAuthor.textContent = '—— ' + (data.from_who || data.from || '佚名');
                // 缓存今日名言
                localStorage.setItem('myluck-hitokoto', JSON.stringify({ date: new Date().toISOString().split('T')[0], text: data.hitokoto, author: data.from_who || data.from || '佚名' }));
            }
        } catch {
            // API 失败则用本地名言，完全静默
            setLocalQuote(I18n.lang);
        }
    }

    // 检查缓存
    try {
        const cache = JSON.parse(localStorage.getItem('myluck-hitokoto'));
        const today = new Date().toISOString().split('T')[0];
        if (cache && cache.date === today) {
            if (lang === 'zh') {
                quoteText.textContent = cache.text;
                quoteAuthor.textContent = '—— ' + cache.author;
            } else {
                setLocalQuote(lang);
            }
        } else if (lang === 'zh') {
            setLocalQuote(lang); // 先展示本地，再异步更新
            fetchHitokoto();
        } else {
            setLocalQuote(lang);
        }
    } catch {
        setLocalQuote(lang);
    }

    // 连续签到条
    const fortuneCard = document.getElementById('fortune-card');
    if (fortuneCard) {
        window.MyLuck.Streak.renderBar(fortuneCard);
    }

    // 虚拟访客计数
    const quoteSection = document.getElementById('daily-quote');
    if (quoteSection) {
        window.MyLuck.injectVisitorCount(quoteSection.querySelector('.container'));
    }

    // 语言切换时重新渲染动态内容
    document.addEventListener('langchange', () => {
        setLocalQuote(I18n.lang);
        if (I18n.lang === 'zh') {
            try {
                const cache = JSON.parse(localStorage.getItem('myluck-hitokoto'));
                const today = new Date().toISOString().split('T')[0];
                if (cache && cache.date === today) {
                    quoteText.textContent = cache.text;
                    quoteAuthor.textContent = '—— ' + cache.author;
                } else {
                    fetchHitokoto();
                }
            } catch { /* ignore */ }
        }
        loadFortuneLeaderboard();
    });

    // ===== 运气排行榜 =====
    let lastLuckScore = 0;
    let lastResultName = '';

    async function loadFortuneLeaderboard() {
        const LB = window.MyLuck && window.MyLuck.Leaderboard;
        if (!LB) return;

        await LB.load('fortune-board-list', 'fortune', {
            limit: 10,
            virtualCount: 8,
            virtualConfig: {
                getEntry: function(rng, idx) {
                    return {
                        score: Math.floor(rng(1) * 40 + 60),
                        character_emoji: ['🌟','🔥','💫','🌈','🎉','🍀','⭐','💎','🌸','🎯'][Math.floor(rng(2) * 10)],
                        character_title: ''
                    };
                }
            },
            formatEntry: function(entry, i, medal) {
                const esc = window.MyLuck.Security ? window.MyLuck.Security.escapeHtml : (s) => s;
                const emoji = entry.character_emoji || '🍀';
                const scoreColor = entry.score >= 90 ? '#e17055' : entry.score >= 70 ? '#fdcb6e' : '#00b894';
                return '<div class="lb-left">' + medal + '<span class="lb-name">' + emoji + ' ' + esc(entry.name || '匿名') + '</span></div><span class="lb-score" style="color:' + scoreColor + '">' + entry.score + '%</span>';
            }
        });
    }

    async function submitFortuneScore() {
        if (!lastLuckScore) return;
        const LB = window.MyLuck && window.MyLuck.Leaderboard;
        if (!LB) return;

        const rankBtn = document.getElementById('fortune-rank-btn');
        if (rankBtn) { rankBtn.disabled = true; rankBtn.textContent = '...'; }

        const moodEmojis = { happy: '😊', calm: '😌', excited: '🤩', tired: '😴', anxious: '😰' };
        const mood = document.getElementById('fortune-mood').value;
        const emoji = moodEmojis[mood] || '🍀';

        await LB.submit('fortune', {
            name: lastResultName || (I18n.lang === 'en' ? 'Anonymous' : '匿名'),
            score: lastLuckScore,
            character_emoji: emoji,
            character_title: ''
        }, {
            onSuccess: function() {
                if (rankBtn) rankBtn.textContent = I18n.t('fortune.ranked');
                loadFortuneLeaderboard();
            },
            onFail: function() {
                alert(I18n.t('fortune.rank_fail'));
                if (rankBtn) { rankBtn.disabled = false; rankBtn.textContent = I18n.t('fortune.rank'); }
            }
        });
        if (rankBtn && !rankBtn.disabled) { rankBtn.disabled = false; rankBtn.textContent = I18n.t('fortune.rank'); }
    }

    // 绑定上榜按钮
    const fortuneRankBtn = document.getElementById('fortune-rank-btn');
    if (fortuneRankBtn) fortuneRankBtn.addEventListener('click', submitFortuneScore);

    // 初始化排行榜
    loadFortuneLeaderboard();

    // Turnstile 延迟渲染
    if (window.MyLuck.Turnstile && window.MyLuck.Turnstile.isEnabled()) {
        window.MyLuck.Turnstile.render('turnstile-fortune');
    }
})();
