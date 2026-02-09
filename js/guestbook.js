// ========== 许愿墙 + 评论区 ==========
(function () {
    'use strict';
    const { I18n, Security } = window.MyLuck;

    I18n.add('zh', {
        'gb.title': '🌟 许愿墙',
        'gb.desc': '写下你的心愿或今日好运感想，让好运传递给更多人',
        'gb.info': '心愿保存在你的浏览器中，仅供个人回顾。请文明发言~',
        'gb.placeholder': '写下你的心愿或感想...',
        'gb.submit': '🍀 许愿',
        'gb.empty': '还没有心愿，快来写下第一个吧~',
        'gb.toomany': '发送太频繁了，休息一下吧~',
        'gb.tooshort': '至少写几个字吧~',
        'gb.bad': '请文明发言哦~',
        'gb.comment_title': '💬 评论区',
        'gb.comment_desc': '和大家一起交流讨论，分享你的测试心得',
    });
    I18n.add('en', {
        'gb.title': '🌟 Wishing Wall',
        'gb.desc': 'Write your wish or thoughts, spread good luck to everyone',
        'gb.info': 'Wishes are saved in your browser for personal review. Be kind~',
        'gb.placeholder': 'Write your wish or thought...',
        'gb.submit': '🍀 Make a Wish',
        'gb.empty': 'No wishes yet. Be the first to make one~',
        'gb.toomany': 'Too fast! Take a break~',
        'gb.tooshort': 'Write a bit more~',
        'gb.bad': 'Please keep it friendly~',
        'gb.comment_title': '💬 Comments',
        'gb.comment_desc': 'Discuss and share your test experiences with everyone',
    });
    I18n.apply();

    // 预设心愿（让页面不那么空）
    const presetWishes = {
        zh: [
            { text: '希望今天考试顺利通过！🎓', time: '2026-02-08' },
            { text: '愿家人身体健康，万事如意 ❤️', time: '2026-02-07' },
            { text: '希望新的一年工作顺利，升职加薪！', time: '2026-02-06' },
            { text: '许个愿：希望暑假能去旅行 ✈️', time: '2026-02-05' },
            { text: '今天测到了88%的好运，开心！', time: '2026-02-04' },
            { text: '愿世界和平，每个人都能快乐 🌍', time: '2026-02-03' },
        ],
        en: [
            { text: 'Hope my exam goes well today! 🎓', time: '2026-02-08' },
            { text: 'Wishing health and happiness to my family ❤️', time: '2026-02-07' },
            { text: 'May this year bring great career success!', time: '2026-02-06' },
            { text: 'Wish: a wonderful vacation trip ✈️', time: '2026-02-05' },
            { text: 'Got 88% luck today, so happy!', time: '2026-02-04' },
            { text: 'May there be peace and joy for everyone 🌍', time: '2026-02-03' },
        ]
    };

    function getWishes() {
        try {
            return JSON.parse(localStorage.getItem('myluck-wishes')) || [];
        } catch { return []; }
    }

    function saveWishes(list) {
        // 最多保留50条
        localStorage.setItem('myluck-wishes', JSON.stringify(list.slice(0, 50)));
    }

    function formatDate(d) {
        const date = new Date(d);
        return date.toLocaleDateString(I18n.lang === 'zh' ? 'zh-CN' : 'en', { month: 'short', day: 'numeric' });
    }

    function renderWishes() {
        const wall = document.getElementById('wish-wall');
        const userWishes = getWishes();
        const lang = I18n.lang;
        const presets = presetWishes[lang] || presetWishes.zh;

        // 合并：用户心愿在前，预设在后
        const all = [...userWishes, ...presets];

        if (all.length === 0) {
            wall.innerHTML = `<p class="wish-empty">${I18n.t('gb.empty')}</p>`;
            return;
        }

        wall.innerHTML = all.map(w => `
            <div class="wish-note">
                ${Security.escapeHtml(w.text)}
                <span class="wish-time">${formatDate(w.time)}</span>
            </div>
        `).join('');
    }

    // 提交心愿
    document.getElementById('wish-submit').addEventListener('click', () => {
        const input = document.getElementById('wish-input');
        const text = input.value.trim();

        if (text.length < 2) {
            alert(I18n.t('gb.tooshort'));
            return;
        }

        if (!Security.rateLimit('wish', 5)) {
            alert(I18n.t('gb.toomany'));
            return;
        }

        if (Security.containsBadWords(text)) {
            alert(I18n.t('gb.bad'));
            return;
        }

        const wishes = getWishes();
        wishes.unshift({ text: Security.escapeHtml(text), time: new Date().toISOString() });
        saveWishes(wishes);
        input.value = '';
        renderWishes();
    });

    // 回车提交
    document.getElementById('wish-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('wish-submit').click();
    });

    // 语言切换时重新渲染
    document.addEventListener('langchange', renderWishes);

    renderWishes();

    // ========== Waline 评论系统 ==========
    // 服务端地址：部署 Waline 到 Vercel 后替换这里
    const WALINE_SERVER = 'https://waline.myluck.top';

    async function initWaline() {
        try {
            const { init } = await import('https://unpkg.com/@waline/client@v3/dist/waline.js');
            const placeholder = document.getElementById('waline-placeholder');
            if (placeholder) placeholder.style.display = 'none';
            init({
                el: '#waline',
                serverURL: WALINE_SERVER,
                lang: I18n.lang === 'zh' ? 'zh-CN' : 'en',
                dark: false,
                meta: ['nick'],
                requiredMeta: [],
                login: 'disable',
                pageSize: 20,
                wordLimit: 200,
                emoji: ['//unpkg.com/@waline/emojis@1.2.0/weibo', '//unpkg.com/@waline/emojis@1.2.0/bilibili'],
                locale: I18n.lang === 'zh' ? {
                    placeholder: '说点什么吧~（无需登录）',
                    sofa: '还没有评论，快来抢沙发吧~',
                    nick: '昵称（可选）',
                    submit: '发表评论',
                } : {
                    placeholder: 'Say something~ (no login required)',
                    sofa: 'No comments yet. Be the first!',
                    nick: 'Nickname (optional)',
                    submit: 'Submit',
                },
            });
        } catch (e) {
            // Waline 加载失败（可能是服务端未部署），显示提示
            const placeholder = document.getElementById('waline-placeholder');
            if (placeholder) {
                const lang = I18n.lang;
                placeholder.innerHTML = lang === 'zh'
                    ? '<p style="color:var(--text-light);font-size:.88rem;">💬 评论区即将开放，敬请期待~</p>'
                    : '<p style="color:var(--text-light);font-size:.88rem;">💬 Comments coming soon, stay tuned~</p>';
            }
        }
    }

    // 延迟加载 Waline（不阻塞页面）
    if (document.getElementById('waline')) {
        setTimeout(initWaline, 500);
    }
})();
