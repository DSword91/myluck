// ========== 许愿墙 ==========
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
})();
