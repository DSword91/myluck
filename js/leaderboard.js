// ========== MyLuck 通用排行榜模块 leaderboard.js ==========
(function () {
    'use strict';

    // 使用共享 Supabase 客户端（从 common.js MyLuck.getSupabase）
    var _sb = null;
    async function getSupabase() {
        if (_sb) return _sb;
        // 优先使用共享客户端
        if (window.MyLuck && window.MyLuck.getSupabase) {
            _sb = await window.MyLuck.getSupabase();
            return _sb;
        }
        return null;
    }

    function escapeHtml(str) {
        if (window.MyLuck && window.MyLuck.Security) return window.MyLuck.Security.escapeHtml(str);
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function isEn() {
        return window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en';
    }

    function t(key, fallback) {
        if (window.MyLuck && window.MyLuck.I18n) return window.MyLuck.I18n.t(key, fallback);
        return fallback;
    }

    function getColor(score) {
        if (score >= 90) return '#e17055';
        if (score >= 70) return '#fdcb6e';
        if (score >= 50) return '#00b894';
        if (score >= 30) return '#74b9ff';
        return '#b2bec3';
    }

    // 注入排行榜样式（只注入一次）
    var cssInjected = false;
    function injectCSS() {
        if (cssInjected) return;
        cssInjected = true;
        var style = document.createElement('style');
        style.textContent = [
            '.lb-board{background:#fff;border-radius:16px;padding:20px;margin:20px auto;max-width:500px;box-shadow:0 2px 12px rgba(0,0,0,0.06)}',
            '.lb-board h3{text-align:center;margin:0 0 16px;font-size:1.1rem;color:#333}',
            '.lb-row{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:10px;margin-bottom:6px;transition:background .2s}',
            '.lb-row:hover{background:#fff5f0}',
            '.lb-row:nth-child(-n+3){background:#fffbf5}',
            '.lb-left{display:flex;align-items:center;gap:8px;min-width:0}',
            '.lb-medal{font-size:1.2rem;min-width:28px;text-align:center}',
            '.lb-name{font-weight:600;font-size:.9rem;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}',
            '.lb-detail{font-size:.75rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100px}',
            '.lb-score{font-weight:700;font-size:1rem;min-width:40px;text-align:right}',
            '.lb-empty{text-align:center;color:#bbb;padding:20px;font-size:.9rem}',
            '.lb-submit-area{text-align:center;margin:12px 0}',
            '.lb-submit-btn{background:linear-gradient(135deg,#e17055,#fdcb6e);color:#fff;border:none;padding:10px 24px;border-radius:25px;font-size:.9rem;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 3px 10px rgba(225,112,85,0.3)}',
            '.lb-submit-btn:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(225,112,85,0.4)}',
            '.lb-submit-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}',
            '.lb-turnstile{display:flex;justify-content:center;margin:10px 0}',
            '.lb-virtual .lb-name{color:#999}',
            '.lb-virtual .lb-score{opacity:0.7}',
            '.lb-count{text-align:center;font-size:.8rem;color:#aaa;margin-top:8px}'
        ].join('\n');
        document.head.appendChild(style);
    }

    var MEDALS = ['🥇', '🥈', '🥉'];

    // ===== 虚拟排行榜数据（自然增长） =====
    var VIRTUAL_NAMES_ZH = [
        '小明','阿花','大白','星辰','小鱼','糖糖','果果','小雪','阳光','微风',
        '彩虹','云朵','蝴蝶','旺财','如意','吉祥','平安','喜乐','奶茶','布丁',
        '芒果','草莓','可乐','棉花糖','开心果','小幸运','好运来','福气满','笑哈哈',
        '乐呵呵','美滋滋','甜蜜蜜','大聪明','铁蛋','翠花','天天','萌萌','豆包',
        '饺子','汤圆','麻薯','年糕','泡芙','冰淇淋','西瓜','樱桃','蓝莓','柠檬',
        '小太阳','月亮','星星','大力','小强','富贵','招财','进宝','金刚','小白',
        '小黑','小灰','皮卡','咕噜','嘟嘟','叮当','花花','点点','球球','团团',
        '圆圆','蛋蛋','毛毛','豆豆','丸子','果冻','薯条','披萨','拉面','寿司'
    ];
    var VIRTUAL_NAMES_EN = [
        'Lucky Cat','Star','Moon','Sunny','Rainbow','Cloud','Butterfly','Happy','Joy','Hope',
        'Grace','Melody','Blossom','Cookie','Mochi','Bubble','Sparkle','Dream','Angel','Phoenix',
        'Wish','Charm','Clover','Aurora','Berry','Candy','Latte','Maple','Petal','River',
        'Sky','Willow','Zen','Frost','Ember','Luna','Nova','Sage','Pearl','Ivy',
        'Coral','Daisy','Finn','Leo','Max','Zoe','Aria','Jade','Ruby','Theo',
        'Ollie','Milo','Cleo','Gigi','Felix','Oscar','Hugo','Remy','Taro','Kiwi',
        'Cocoa','Mocha','Chai','Sunny','Breeze','Storm','Dawn','Dusk','Blaze','Echo'
    ];

    // RP 虚拟角色标题 (中文key，渲染时翻译)
    var VIRTUAL_RP_TITLES = ['天选锦鲤','欧皇本皇','主角光环体','好运磁铁','猫系人格·橘座大人','社牛之王','热血追梦人','干饭之神','夜行猫头鹰','佛系大师','摸鱼大师','拖延症晚期','表情包大王','宅家至尊','打工人の觉醒','Bug终结者','选择困难户','诸葛猪','飞天猪'];
    var VIRTUAL_RP_EMOJIS = ['🐠','👑','✨','🧲','🐱','🦁','🚀','🍜','🦉','🧘','🐟','🦥','😂','🏠','💼','🐛','🤔','🐷','🐷'];
    var VIRTUAL_FORTUNE_LEVELS = ['上上签','上签','中上签','中签','上签','中上签','中签','上上签','中签','上签'];
    var VIRTUAL_FORTUNE_EMOJIS = ['🎊','✨','🌟','📜','✨','🌟','📜','🎊','📜','✨'];
    var VIRTUAL_FORTUNE_SCORES = [100, 85, 72, 55, 85, 72, 55, 100, 55, 85];

    function simpleHash(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    function generateVirtualEntries(testType, count, opts) {
        var result = [];
        var en = isEn();
        var names = en ? VIRTUAL_NAMES_EN : VIRTUAL_NAMES_ZH;
        var todaySeed = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        for (var i = 0; i < count; i++) {
            var seed = parseInt(todaySeed) + i * 17 + 7;
            var nameIdx = Math.floor(simpleHash(seed) * names.length);
            var entry = { name: names[nameIdx], is_virtual: true };

            if (testType === 'rp') {
                var rpIdx = Math.floor(simpleHash(seed + 3) * VIRTUAL_RP_TITLES.length);
                var rpScore = Math.floor(simpleHash(seed + 5) * 60 + 30); // 30-90
                entry.score = rpScore;
                entry.character_emoji = VIRTUAL_RP_EMOJIS[rpIdx];
                entry.character_title = VIRTUAL_RP_TITLES[rpIdx];
            } else if (testType === 'fortune') {
                var fIdx = Math.floor(simpleHash(seed + 3) * VIRTUAL_FORTUNE_LEVELS.length);
                entry.score = VIRTUAL_FORTUNE_SCORES[fIdx];
                entry.character_emoji = VIRTUAL_FORTUNE_EMOJIS[fIdx];
                entry.character_title = VIRTUAL_FORTUNE_LEVELS[fIdx];
            }
            result.push(entry);
        }
        // 按分数降序
        result.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
        return result;
    }

    /**
     * 加载并渲染排行榜
     * @param {string} containerId - DOM容器的id
     * @param {string} testType - 测试类型 'rp'|'fortune'|'mbti' 等
     * @param {object} [opts] - 可选配置 { limit, formatEntry, titleMap }
     */
    async function loadBoard(containerId, testType, opts) {
        injectCSS();
        opts = opts || {};
        var limit = opts.limit || 20;
        var formatEntry = opts.formatEntry || null;
        var container = document.getElementById(containerId);
        if (!container) return;

        var realData = [];
        try {
            var sb = await getSupabase();
            if (sb) {
                var today = new Date().toISOString().slice(0, 10);
                var query = sb.from('leaderboard').select('*').eq('test_date', today).eq('test_type', testType).eq('visible', true).order('score', { ascending: false }).limit(limit);
                var result = await query;
                if (result.data && !result.error) {
                    realData = result.data;
                }
            }
        } catch (e) {
            // Supabase不可用也继续显示虚拟数据
        }

        // 生成虚拟条目（填充到 limit 数量）
        var virtualCount = Math.max(0, Math.min(12, limit - realData.length));
        var virtualData = generateVirtualEntries(testType, virtualCount, opts);

        // 合并：真实用户在前，虚拟在后
        var allData = realData.concat(virtualData);

        if (allData.length === 0) {
            container.innerHTML = '<p class="lb-empty">' + t('lb.empty', '还没有人上榜，来当第一个！') + '</p>';
            return;
        }

        container.innerHTML = '';
        var en = isEn();
        for (var i = 0; i < allData.length; i++) {
            var entry = allData[i];
            var div = document.createElement('div');
            div.className = 'lb-row' + (entry.is_virtual ? ' lb-virtual' : '');

            var medal = i < 3 ? '<span class="lb-medal">' + MEDALS[i] + '</span>' : '<span class="lb-medal" style="opacity:0.3">#' + (i + 1) + '</span>';

            if (formatEntry) {
                div.innerHTML = formatEntry(entry, i, medal);
            } else {
                var emoji = entry.character_emoji ? escapeHtml(entry.character_emoji) + ' ' : '';
                // 翻译 character_title（数据库存中文key，通过 opts.titleMap 翻译）
                var titleRaw = entry.character_title || '';
                var titleDisplay = (en && opts.titleMap) ? (opts.titleMap[titleRaw] || titleRaw) : titleRaw;
                var detail = titleDisplay ? '<span class="lb-detail">' + escapeHtml(titleDisplay) + '</span>' : '';
                div.innerHTML = '<div class="lb-left">' + medal + '<span class="lb-name">' + emoji + escapeHtml(entry.name || (en ? 'Anonymous' : '匿名')) + '</span>' + detail + '</div><span class="lb-score" style="color:' + getColor(entry.score) + '">' + entry.score + '</span>';
            }
            container.appendChild(div);
        }
    }

    /**
     * 提交分数到排行榜
     * @param {string} testType - 测试类型
     * @param {object} data - { name, score, character_id?, character_emoji?, character_title? }
     * @param {object} [opts] - { turnstileContainerId?, onSuccess?, onFail? }
     */
    async function submitScore(testType, data, opts) {
        opts = opts || {};
        var Security = window.MyLuck && window.MyLuck.Security;
        var Turnstile = window.MyLuck && window.MyLuck.Turnstile;

        // 频率限制
        if (Security && !Security.rateLimit('leaderboard_' + testType, 5)) {
            alert(t('gb.toomany', '操作太频繁，请稍后再试'));
            return false;
        }

        // Turnstile验证
        if (Turnstile && Turnstile.isEnabled && Turnstile.isEnabled() && !Turnstile.isVerified()) {
            alert(isEn() ? 'Please complete verification first' : '请先完成人机验证');
            return false;
        }

        try {
            var sb = await getSupabase();
            if (!sb) throw new Error('Supabase not available');
            var today = new Date().toISOString().slice(0, 10);

            var insertData = {
                name: data.name || '匿名',
                score: data.score || 0,
                test_type: testType,
                test_date: today,
                visible: true
            };
            if (data.character_id) insertData.character_id = String(data.character_id);
            if (data.character_emoji) insertData.character_emoji = data.character_emoji;
            if (data.character_title) insertData.character_title = data.character_title;

            var result = await sb.from('leaderboard').insert(insertData);
            if (result.error) throw result.error;

            // 重置Turnstile
            if (Turnstile && Turnstile.reset) Turnstile.reset();

            if (opts.onSuccess) opts.onSuccess();
            return true;
        } catch (e) {
            console.error('[leaderboard] Submit failed:', e);
            if (opts.onFail) opts.onFail(e);
            return false;
        }
    }

    // ===== 自然增长参与人数 =====
    var LB_GROWTH_START = new Date('2026-02-01T00:00:00Z').getTime();
    var LB_GROWTH_BASE = 856;

    function getLBGrowth() {
        var elapsed = Date.now() - LB_GROWTH_START;
        if (elapsed < 0) return 0;
        return Math.floor(elapsed / 120000); // 每2分钟+1
    }

    /**
     * 创建排行榜HTML结构（含标题、列表容器、参与人数）
     * @param {object} opts - { boardId, turnstileId, testType, titleZh, titleEn }
     * @returns {string} HTML字符串
     */
    function createBoardHTML(opts) {
        injectCSS();
        var en = isEn();
        var totalParticipants = LB_GROWTH_BASE + getLBGrowth();
        var countText = en ? totalParticipants.toLocaleString() + ' participants today' : '今日 ' + totalParticipants.toLocaleString() + ' 人参与';
        return '<div class="lb-board">' +
            '<h3>' + (en ? (opts.titleEn || 'Leaderboard') : (opts.titleZh || '🏆 今日排行榜')) + '</h3>' +
            '<div id="' + opts.boardId + '"><p class="lb-empty">' + (en ? 'Loading...' : '加载中...') + '</p></div>' +
            '<p class="lb-count">' + countText + '</p>' +
            '</div>';
    }

    // 挂载
    if (!window.MyLuck) window.MyLuck = {};
    window.MyLuck.Leaderboard = {
        load: loadBoard,
        submit: submitScore,
        createHTML: createBoardHTML,
        getSupabase: getSupabase
    };
})();
