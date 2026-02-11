// ========== 祝福墙（全球可见 · Supabase） ==========
(function () {
    'use strict';
    var MyLuck = window.MyLuck || {};
    var I18n = MyLuck.I18n;
    var Security = MyLuck.Security;

    // ===== i18n =====
    I18n.add('zh', {
        'gb.title': '🌟 祝福墙',
        'gb.desc': '写下你的祝福，让好运传递给每一个人',
        'gb.counter_pre': '已有',
        'gb.counter_suf': '位小伙伴送出祝福 💕',
        'gb.name_ph': '你的昵称 *',
        'gb.text_ph': '写下你的祝福...',
        'gb.submit': '🍀 送出祝福',
        'gb.loading': '加载中...',
        'gb.empty': '还没有祝福，快来送出第一个吧~',
        'gb.toomany': '太频繁了，休息一下吧~',
        'gb.tooshort': '至少写几个字吧~',
        'gb.bad': '请文明发言哦~',
        'gb.need_name': '请填写昵称',
        'gb.need_verify': '请先完成人机验证',
        'gb.success': '🎉 祝福已送出！',
        'gb.fail': '发送失败，请稍后重试',
    });
    I18n.add('en', {
        'gb.title': '🌟 Blessing Wall',
        'gb.desc': 'Write your blessings, spread good luck to everyone',
        'gb.counter_pre': '',
        'gb.counter_suf': 'blessings sent so far 💕',
        'gb.name_ph': 'Your nickname *',
        'gb.text_ph': 'Write your blessing...',
        'gb.submit': '🍀 Send Blessing',
        'gb.loading': 'Loading...',
        'gb.empty': 'No blessings yet. Be the first!',
        'gb.toomany': 'Too fast! Take a break~',
        'gb.tooshort': 'Write a bit more~',
        'gb.bad': 'Please keep it friendly~',
        'gb.need_name': 'Please enter a nickname',
        'gb.need_verify': 'Please complete verification first',
        'gb.success': '🎉 Blessing sent!',
        'gb.fail': 'Failed to send, try later',
    });
    I18n.apply();

    // ===== Supabase（使用共享客户端） =====
    async function getSupabase() {
        if (window.MyLuck && window.MyLuck.getSupabase) {
            return await window.MyLuck.getSupabase();
        }
        return null;
    }

    // ===== 随机祝福生成（自然增长） =====
    var RANDOM_NAMES_ZH = [
        '小明','小红','大白','阿福','蜜糖','星星','月亮','太阳',
        '小鱼','小熊','花花','果果','糖糖','豆豆','小雪','小雨',
        '阳光','微风','彩虹','云朵','小草','大树','蝴蝶','蜻蜓',
        '翠花','铁蛋','旺财','来福','如意','吉祥','平安','喜乐',
        '小丸子','哆啦','皮卡','奶茶','布丁','芒果','西瓜','草莓',
        '可乐','雪碧','棉花糖','巧克力','冰淇淋','泡芙','麻薯','年糕',
        '开心果','小幸运','好运来','福气满','笑哈哈','乐呵呵','美滋滋','甜蜜蜜'
    ];
    var RANDOM_NAMES_EN = [
        'Lucky Cat','Star','Moon','Sunny','Rainbow','Cloud',
        'Butterfly','Happy','Joy','Hope','Grace','Melody',
        'Blossom','Cookie','Mochi','Bubble','Sparkle','Dream',
        'Angel','Phoenix','Wish','Charm','Clover','Aurora',
        'Berry','Candy','Latte','Maple','Petal','River',
        'Sky','Willow','Zen','Frost','Ember','Luna'
    ];
    var BLESSINGS_ZH = [
        '愿你每天都有好心情 ☀️','祝所有人考试顺利 🎓',
        '愿家人身体健康，万事如意 ❤️','希望世界和平 🕊️',
        '新的一天，新的好运 🍀','愿你的梦想都能实现 ✨',
        '开心每一天！😊','送你一朵好运花 🌸',
        '愿所有的努力都能得到回报 💪','祝大家心想事成 🎊',
        '今天也要加油呀 💫','好运正在路上 🚀',
        '愿你被温柔以待 🌷','希望你能遇到美好的事 🌈',
        '笑口常开，幸福常在 😄','祝你前程似锦 🌟',
        '愿生活处处有惊喜 🎁','好的事情正在发生 🌻',
        '你很棒，继续加油 👏','愿你拥有甜甜的生活 🍰',
        '今天也是幸运的一天 🎋','祝你心情愉快，万事顺遂 🙏',
        '愿好运永远伴随你 🌠','送你满满的正能量 ⚡',
        '愿你的世界充满阳光 🌞','祝所有小伙伴都开心 🎈',
        '每天进步一点点 📈','愿你找到属于自己的幸福 💝',
        '祝一切顺利 🍀','好运连连，喜事多多 🧧',
    ];
    var BLESSINGS_EN = [
        'Wishing everyone great luck today ☀️','Good luck on your exams 🎓',
        'May your family be healthy and happy ❤️','Peace and love to all 🕊️',
        'New day, new blessings 🍀','May your dreams come true ✨',
        'Be happy every day! 😊','Sending you a lucky flower 🌸',
        'Hard work always pays off 💪','May all your wishes come true 🎊',
        'Keep going, you are doing great 💫','Good fortune is on its way 🚀',
        'May kindness follow you everywhere 🌷','Beautiful things are coming 🌈',
        'Smile and the world smiles back 😄','Bright future ahead 🌟',
        'Life is full of wonderful surprises 🎁','Good things are happening 🌻',
        'You are amazing, keep it up 👏','Wishing you a sweet life 🍰',
        'Today is your lucky day 🎋','May everything go smoothly 🙏',
        'Good luck be with you always 🌠','Sending positive vibes ⚡',
    ];

    function seededRand(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    var GROWTH_START = new Date('2026-02-01T00:00:00Z').getTime();
    var GROWTH_BASE = 0;

    function getNaturalGrowth() {
        var elapsed = Date.now() - GROWTH_START;
        if (elapsed < 0) return 0;
        // 每10分钟一个区间，每区间随机+1~10
        var intervals = Math.floor(elapsed / 600000);
        var total = 0;
        for (var i = 0; i < intervals; i++) {
            total += Math.floor(seededRand(i * 17 + 31) * 10) + 1;
        }
        return total;
    }

    function generateVirtualBlessings(count) {
        var result = [];
        var isEn = I18n.lang === 'en';
        var names = isEn ? RANDOM_NAMES_EN : RANDOM_NAMES_ZH;
        var msgs = isEn ? BLESSINGS_EN : BLESSINGS_ZH;
        var now = Date.now();

        for (var i = 0; i < count; i++) {
            var minuteOffset = i * 3 + Math.floor(seededRand(i * 7 + 42) * 5);
            var ts = now - minuteOffset * 60000;
            var nameIdx = Math.floor(seededRand(ts / 60000 + i * 13) * names.length);
            var msgIdx = Math.floor(seededRand(ts / 60000 + i * 31 + 7) * msgs.length);
            result.push({
                nickname: names[nameIdx],
                content: msgs[msgIdx],
                created_at: new Date(ts).toISOString(),
                is_system: true
            });
        }
        return result;
    }

    // ===== 祝福计数器 =====
    var realCount = 0;

    function updateCounter() {
        var el = document.getElementById('bless-count');
        if (!el) return;
        var total = GROWTH_BASE + getNaturalGrowth() + realCount;
        el.textContent = total.toLocaleString();
    }

    setInterval(updateCounter, 30000);

    // ===== 渲染 =====
    function esc(str) {
        if (Security && Security.escapeHtml) return Security.escapeHtml(str);
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function formatTime(iso) {
        var d = new Date(iso);
        var now = new Date();
        var diff = now - d;
        var isEn = I18n.lang === 'en';
        if (diff < 60000) return isEn ? 'just now' : '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + (isEn ? ' min ago' : ' 分钟前');
        if (diff < 86400000) return Math.floor(diff / 3600000) + (isEn ? ' hr ago' : ' 小时前');
        return d.toLocaleDateString(isEn ? 'en-US' : 'zh-CN', { month: 'short', day: 'numeric' });
    }

    function renderBlessings(realData) {
        var wall = document.getElementById('bless-wall');
        if (!wall) return;
        var virtual = generateVirtualBlessings(8);
        var all = (realData || []).concat(virtual);
        // 真人用户靠前，虚拟用户靠后，各自按时间排序
        var realItems = all.filter(function(b) { return !b.is_system; }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
        var virtualItems = all.filter(function(b) { return b.is_system; }).sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });
        all = realItems.concat(virtualItems).slice(0, 50);

        if (all.length === 0) {
            wall.innerHTML = '<p class="bless-empty">' + I18n.t('gb.empty') + '</p>';
            return;
        }

        wall.innerHTML = all.map(function (b) {
            var sysClass = b.is_system ? ' system-card' : '';
            return '<div class="bless-card' + sysClass + '">' +
                '<div class="bless-author">🍀 ' + esc(b.nickname || (window.MyLuck && window.MyLuck.I18n ? window.MyLuck.I18n.t('common.anonymous') : '匿名')) + '</div>' +
                '<div class="bless-text">' + esc(b.content) + '</div>' +
                '<span class="bless-time">' + formatTime(b.created_at) + '</span>' +
                '</div>';
        }).join('');
    }

    // ===== 加载真实祝福 =====
    async function loadBlessings() {
        try {
            var sb = await getSupabase();
            if (!sb) { renderBlessings([]); updateCounter(); return; }

            // 设置超时，避免长时间等待
            var timeout = new Promise(function(_, reject) { setTimeout(function() { reject(new Error('timeout')); }, 8000); });
            var query = sb.from('comments')
                .select('*')
                .eq('page', 'blessings')
                .order('created_at', { ascending: false })
                .limit(50);
            var resp = await Promise.race([query, timeout]);

            var data = (resp && resp.data) || [];
            realCount = data.length;

            try {
                var countResp = await Promise.race([
                    sb.from('comments').select('id', { count: 'exact', head: true }).eq('page', 'blessings'),
                    new Promise(function(_, reject) { setTimeout(function() { reject(new Error('timeout')); }, 5000); })
                ]);
                if (countResp && countResp.count != null) realCount = countResp.count;
            } catch (e2) { /* ignore count error */ }

            renderBlessings(data);
            updateCounter();
        } catch (e) {
            console.warn('[guestbook] Load failed:', e);
            renderBlessings([]);
            updateCounter();
        }
    }

    // ===== 提交祝福 =====
    var loadTime = Date.now();

    async function submitBlessing() {
        var hp = document.getElementById('bless-hp');
        if (hp && hp.value) return;
        if (Date.now() - loadTime < 3000) return;

        var nameEl = document.getElementById('bless-name');
        var textEl = document.getElementById('bless-text');
        var btn = document.getElementById('bless-submit');

        var name = (nameEl.value || '').trim();
        var text = (textEl.value || '').trim();

        if (!name || name.length < 1) { alert(I18n.t('gb.need_name')); nameEl.focus(); return; }
        if (text.length < 2) { alert(I18n.t('gb.tooshort')); textEl.focus(); return; }
        if (Security && Security.containsBadWords && Security.containsBadWords(text)) { alert(I18n.t('gb.bad')); return; }
        if (Security && !Security.rateLimit('bless', 3)) { alert(I18n.t('gb.toomany')); return; }

        var Turnstile = MyLuck.Turnstile;
        if (Turnstile && Turnstile.isEnabled && Turnstile.isEnabled() && !Turnstile.isVerified()) {
            alert(I18n.t('gb.need_verify'));
            return;
        }

        btn.disabled = true;
        btn.textContent = '...';

        try {
            var sb = await getSupabase();
            if (!sb) throw new Error('Supabase unavailable');

            var resp = await sb.from('comments').insert({
                nickname: name,
                content: text,
                page: 'blessings'
            });

            if (resp.error) throw resp.error;

            nameEl.value = '';
            textEl.value = '';
            btn.disabled = false;
            btn.textContent = I18n.t('gb.submit');
            if (Turnstile && Turnstile.reset) Turnstile.reset();

            realCount++;
            updateCounter();
            await loadBlessings();

            var successMsg = document.createElement('div');
            successMsg.style.cssText = 'text-align:center;color:#00b894;font-weight:600;padding:8px;';
            successMsg.textContent = I18n.t('gb.success');
            var wall = document.getElementById('bless-wall');
            if (wall) wall.parentNode.insertBefore(successMsg, wall);
            setTimeout(function () { if (successMsg.parentNode) successMsg.remove(); }, 3000);

        } catch (e) {
            alert(I18n.t('gb.fail'));
            btn.disabled = false;
            btn.textContent = I18n.t('gb.submit');
        }
    }

    // ===== 初始化 =====
    function init() {
        var submitBtn = document.getElementById('bless-submit');
        var textEl = document.getElementById('bless-text');

        if (submitBtn) submitBtn.addEventListener('click', submitBlessing);
        if (textEl) textEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitBlessing(); }
        });

        if (MyLuck.Turnstile && MyLuck.Turnstile.isEnabled()) {
            MyLuck.Turnstile.render('turnstile-bless');
        }

        loadBlessings();

        document.addEventListener('langchange', function () {
            var nameEl = document.getElementById('bless-name');
            var textEl2 = document.getElementById('bless-text');
            var btn = document.getElementById('bless-submit');
            if (nameEl) nameEl.placeholder = I18n.t('gb.name_ph');
            if (textEl2) textEl2.placeholder = I18n.t('gb.text_ph');
            if (btn && !btn.disabled) btn.textContent = I18n.t('gb.submit');
            loadBlessings();
            updateCounter();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
