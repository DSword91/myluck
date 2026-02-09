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
        'gb.c_placeholder': '说点什么吧~',
        'gb.c_name': '昵称（可选）',
        'gb.c_submit': '发表评论',
        'gb.c_empty': '还没有评论，快来抢沙发~',
        'gb.c_loading': '加载评论中...',
        'gb.c_error': '评论加载失败，请稍后再试',
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
        'gb.c_placeholder': 'Say something~',
        'gb.c_name': 'Nickname (optional)',
        'gb.c_submit': 'Submit',
        'gb.c_empty': 'No comments yet. Be the first!',
        'gb.c_loading': 'Loading comments...',
        'gb.c_error': 'Failed to load comments, try later',
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

    document.getElementById('wish-submit').addEventListener('click', () => {
        const input = document.getElementById('wish-input');
        const text = input.value.trim();

        if (text.length < 2) { alert(I18n.t('gb.tooshort')); return; }
        if (!Security.rateLimit('wish', 5)) { alert(I18n.t('gb.toomany')); return; }
        if (Security.containsBadWords(text)) { alert(I18n.t('gb.bad')); return; }

        const wishes = getWishes();
        wishes.unshift({ text: Security.escapeHtml(text), time: new Date().toISOString() });
        saveWishes(wishes);
        input.value = '';
        renderWishes();
    });

    document.getElementById('wish-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('wish-submit').click();
    });

    document.addEventListener('langchange', renderWishes);
    renderWishes();

    // ========== Supabase 评论系统（免费、无需部署服务器） ==========
    // 配置说明：
    // 1. 注册 https://supabase.com （免费）
    // 2. 创建项目，运行以下 SQL：
    //    CREATE TABLE comments (
    //      id BIGSERIAL PRIMARY KEY,
    //      nickname TEXT DEFAULT '匿名',
    //      content TEXT NOT NULL,
    //      page TEXT DEFAULT 'guestbook',
    //      created_at TIMESTAMPTZ DEFAULT NOW()
    //    );
    //    ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
    //    CREATE POLICY "Anyone can read" ON comments FOR SELECT USING (true);
    //    CREATE POLICY "Anyone can insert" ON comments FOR INSERT WITH CHECK (
    //      length(content) > 0 AND length(content) < 500
    //    );
    // 3. 将下面的 URL 和 KEY 替换为你的项目值
    //    （Settings → API → Project URL 和 anon/public key）

    const SUPABASE_URL = 'https://qerajxnmtwyjtokhaonq.supabase.co';   // 填入你的 Supabase 项目 URL
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlcmFqeG5tdHd5anRva2hhb25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MTA1MjksImV4cCI6MjA4NjE4NjUyOX0.sUMZ_RIu9zLjMOB3nnruJezlQL0i-GrunDIkahWcF5E';   // 填入你的 anon (public) key

    async function initComments() {
        const container = document.getElementById('comment-area');
        if (!container) return;

        // 未配置 Supabase 时显示提示
        if (!SUPABASE_URL || !SUPABASE_KEY) {
            container.innerHTML = I18n.lang === 'zh'
                ? '<p style="text-align:center;color:var(--text-light);padding:20px;">💬 评论区即将开放，敬请期待~</p>'
                : '<p style="text-align:center;color:var(--text-light);padding:20px;">💬 Comments coming soon~</p>';
            return;
        }

        // 动态加载 Supabase JS SDK
        try {
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
            const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
            const loadTime = Date.now(); // 反机器人：记录页面加载时间

            // 渲染评论输入框（含蜜罐字段防机器人）
            container.innerHTML = `
                <div class="comment-form">
                    <input type="text" id="comment-nick" maxlength="20"
                        placeholder="${I18n.t('gb.c_name')}" class="comment-nick-input">
                    <textarea id="comment-text" maxlength="500" rows="3"
                        placeholder="${I18n.t('gb.c_placeholder')}" class="comment-textarea"></textarea>
                    <input type="text" id="comment-hp" style="position:absolute;left:-9999px;opacity:0;height:0;" tabindex="-1" autocomplete="off">
                    <button id="comment-submit" class="cta-btn">${I18n.t('gb.c_submit')}</button>
                </div>
                <div id="comment-list" class="comment-list">
                    <p style="text-align:center;color:var(--text-light);">${I18n.t('gb.c_loading')}</p>
                </div>`;

            // 加载评论
            await loadComments(supabase);

            // 提交评论
            document.getElementById('comment-submit').addEventListener('click', async () => {
                // 反机器人检查
                const hp = document.getElementById('comment-hp');
                if (hp && hp.value) return; // 蜜罐被填写 = 机器人
                if (Date.now() - loadTime < 3000) return; // 加载3秒内提交 = 机器人

                const nick = document.getElementById('comment-nick').value.trim() || (I18n.lang === 'zh' ? '匿名' : 'Anonymous');
                const text = document.getElementById('comment-text').value.trim();

                if (text.length < 2) { alert(I18n.t('gb.tooshort')); return; }
                if (!Security.rateLimit('comment', 10)) { alert(I18n.t('gb.toomany')); return; }
                if (Security.containsBadWords(text)) { alert(I18n.t('gb.bad')); return; }

                const btn = document.getElementById('comment-submit');
                btn.disabled = true;
                btn.textContent = '...';

                const { error } = await supabase.from('comments').insert({
                    nickname: Security.escapeHtml(nick),
                    content: Security.escapeHtml(text),
                    page: 'guestbook'
                });

                if (error) {
                    alert(I18n.t('gb.c_error'));
                    btn.disabled = false;
                    btn.textContent = I18n.t('gb.c_submit');
                    return;
                }

                document.getElementById('comment-nick').value = '';
                document.getElementById('comment-text').value = '';
                btn.disabled = false;
                btn.textContent = I18n.t('gb.c_submit');
                await loadComments(supabase);
            });

        } catch (e) {
            container.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:20px;">${I18n.t('gb.c_error')}</p>`;
        }
    }

    async function loadComments(supabase) {
        const list = document.getElementById('comment-list');
        if (!list) return;

        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('page', 'guestbook')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error || !data) {
            list.innerHTML = `<p style="text-align:center;color:var(--text-light);">${I18n.t('gb.c_error')}</p>`;
            return;
        }

        if (data.length === 0) {
            list.innerHTML = `<p style="text-align:center;color:var(--text-light);">${I18n.t('gb.c_empty')}</p>`;
            return;
        }

        list.innerHTML = data.map(c => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${Security.escapeHtml(c.nickname || '匿名')}</span>
                    <span class="comment-time">${formatDate(c.created_at)}</span>
                </div>
                <div class="comment-body">${Security.escapeHtml(c.content)}</div>
            </div>
        `).join('');
    }

    if (document.getElementById('comment-area')) {
        setTimeout(initComments, 300);
    }
})();
