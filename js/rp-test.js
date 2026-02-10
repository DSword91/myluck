// ========== 今日人品 RP 值测试 rp-test.js ==========
(function () {
    'use strict';

    // RP 评级表
    const RP_LEVELS = [
        { min: 96, level: '天选之人', cls: 'epic', emoji: '👑', desc: '今天简直是被老天爷钦点的幸运儿！走路都能捡到钱的级别，建议买彩票（不是）。' },
        { min: 90, level: '欧皇附体', cls: 'epic', emoji: '✨', desc: '简直是欧气满满！今天做什么都超级顺利，别人的好运都被你吸走了。' },
        { min: 80, level: '人品爆发', cls: 'great', emoji: '🎉', desc: '今天的人品值超高！好运环绕，适合做重要的事情和决定。' },
        { min: 70, level: '运势大好', cls: 'great', emoji: '🌟', desc: '人品相当不错！今天适合社交、谈合作、做重要决策。' },
        { min: 60, level: '小有好运', cls: 'good', emoji: '😊', desc: '人品还不错哦～虽然不至于天降横财，但小确幸还是会有的。' },
        { min: 50, level: '中规中矩', cls: 'normal', emoji: '😐', desc: '今天的人品嘛...中规中矩，不好不坏。该干嘛干嘛就好。' },
        { min: 40, level: '有点小背', cls: 'normal', emoji: '😅', desc: '今天可能会有点小不顺，别担心，只是暂时的。注意细心谨慎就好。' },
        { min: 30, level: '非酋出没', cls: 'low', emoji: '😭', desc: '今天...建议少出门，多喝热水。不过记住，非酋也有春天！' },
        { min: 20, level: '开局地狱', cls: 'low', emoji: '💀', desc: '今日人品暂时不在线，建议静养一天，等待明天的人品充值完成。' },
        { min: 0, level: '人品清零', cls: 'low', emoji: '🫠', desc: '恭喜你触发了隐藏结局！人品值已见底，但明天一定会暴涨的（大概）！' }
    ];

    // 趣味标签池
    const TAGS_POOL = {
        high: ['锦鲤体质', '人见人爱', '财运亨通', '逢考必过', '贵人相助', '心想事成', '万事如意', '自带光环', '运气满分', '天赋异禀'],
        mid: ['佛系青年', '随遇而安', '稳如老狗', '低调做人', '心态平和', '顺其自然', '一切随缘', '小心翼翼'],
        low: ['水逆预警', '出门小心', '防碰瓷', '少说多做', '保持低调', '多喝热水', '早睡早起', '远离是非']
    };

    // 基于名字+日期生成稳定种子
    function getNameSeed(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash = hash & hash; // to 32-bit int
        }
        const d = new Date();
        const daySeed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
        return Math.abs(hash ^ daySeed);
    }

    function seededRandom(seed) {
        let s = seed;
        return function () {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    }

    // 计算 RP 值
    function calcRP(name) {
        const seed = getNameSeed(name);
        const rng = seededRandom(seed);

        // 加权正态分布，让中间值更多
        const r1 = rng(), r2 = rng(), r3 = rng();
        let raw = (r1 + r2 + r3) / 3; // 0~1 正态趋势
        let score = Math.round(raw * 100);
        score = Math.max(0, Math.min(100, score));

        // 获取评级
        let ratingObj = RP_LEVELS[RP_LEVELS.length - 1];
        for (const r of RP_LEVELS) {
            if (score >= r.min) { ratingObj = r; break; }
        }

        // 获取标签
        const tags = [];
        const pool = score >= 70 ? TAGS_POOL.high : score >= 40 ? TAGS_POOL.mid : TAGS_POOL.low;
        const tagRng = seededRandom(seed + 7);
        const shuffled = pool.slice().sort(() => tagRng() - 0.5);
        tags.push(shuffled[0], shuffled[1], shuffled[2]);

        return { score, rating: ratingObj, tags };
    }

    // 动画计数器
    function animateScore(el, target, color) {
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(function () {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current;
            el.style.color = color;
        }, 30);
    }

    // 更新圆环
    function updateRing(score, color) {
        const fg = document.getElementById('rp-ring-fg');
        const circumference = 2 * Math.PI * 50; // r=50
        fg.style.strokeDasharray = circumference;
        fg.style.strokeDashoffset = circumference;
        fg.style.stroke = color;
        // 触发动画
        requestAnimationFrame(function () {
            fg.style.strokeDashoffset = circumference * (1 - score / 100);
        });
    }

    // 颜色映射
    function getColor(score) {
        if (score >= 80) return '#52c41a';
        if (score >= 60) return '#1890ff';
        if (score >= 40) return '#faad14';
        return '#f5222d';
    }

    // 显示结果
    function showResult(name) {
        if (!name.trim()) return;
        name = name.trim();

        const { score, rating, tags } = calcRP(name);
        const color = getColor(score);

        const resultDiv = document.getElementById('rp-result');
        resultDiv.style.display = 'block';

        // 分数动画
        animateScore(document.getElementById('rp-score'), score, color);
        updateRing(score, color);

        // 评级
        const levelEl = document.getElementById('rp-level');
        levelEl.textContent = rating.emoji + ' ' + rating.level;
        levelEl.className = 'rp-level ' + rating.cls;

        // 描述
        document.getElementById('rp-desc').textContent = rating.desc;

        // 标签
        const tagsEl = document.getElementById('rp-tags');
        tagsEl.innerHTML = '';
        tags.forEach(function (t) {
            const span = document.createElement('span');
            span.className = 'rp-tag';
            span.textContent = '#' + t;
            tagsEl.appendChild(span);
        });

        // 保存历史
        saveHistory(name, score, rating.level);

        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 本地历史记录
    function saveHistory(name, score, level) {
        const key = 'myluck_rp_history';
        let history = [];
        try { history = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { }

        // 检查是否已存在
        const existing = history.findIndex(h => h.name === name);
        if (existing >= 0) history.splice(existing, 1);

        history.unshift({ name, score, level, time: Date.now() });
        if (history.length > 10) history = history.slice(0, 10);
        localStorage.setItem(key, JSON.stringify(history));

        renderHistory(history);
    }

    function renderHistory(history) {
        const container = document.getElementById('rp-history');
        if (!container || !history.length) return;

        container.innerHTML = '';
        history.forEach(function (h) {
            const div = document.createElement('div');
            div.className = 'rp-history-item';
            div.innerHTML = '<span class="rp-history-name">' + escapeHtml(h.name) + '</span><span class="rp-history-score" style="color:' + getColor(h.score) + '">' + h.score + '分 · ' + h.level + '</span>';
            container.appendChild(div);
        });
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // 分享
    function shareRP() {
        const name = document.getElementById('rp-name').value.trim();
        const score = document.getElementById('rp-score').textContent;
        const level = document.getElementById('rp-level').textContent;
        const text = '我在 MyLuck 测了今日人品：' + score + '分【' + level + '】\n快来测测你的RP值 👉 https://myluck.top/rp-test.html';

        if (navigator.share) {
            navigator.share({ title: 'MyLuck 今日人品 - ' + score + '分', text: text, url: 'https://myluck.top/rp-test.html' }).catch(function () { });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                alert('结果已复制到剪贴板，快去分享给朋友吧！');
            });
        } else {
            prompt('复制以下结果分享给朋友：', text);
        }
    }

    function init() {
        const input = document.getElementById('rp-name');
        const submitBtn = document.getElementById('rp-submit');
        const shareBtn = document.getElementById('rp-share');
        const retryBtn = document.getElementById('rp-retry');

        if (submitBtn) {
            submitBtn.addEventListener('click', function () {
                showResult(input.value);
            });
        }

        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') showResult(input.value);
            });
        }

        if (shareBtn) shareBtn.addEventListener('click', shareRP);

        if (retryBtn) {
            retryBtn.addEventListener('click', function () {
                input.value = '';
                input.focus();
                document.getElementById('rp-result').style.display = 'none';
            });
        }

        // 加载历史
        try {
            const history = JSON.parse(localStorage.getItem('myluck_rp_history') || '[]');
            renderHistory(history);
        } catch (e) { }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
