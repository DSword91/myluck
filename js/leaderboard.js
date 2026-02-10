// ========== MyLuck 通用排行榜模块 leaderboard.js ==========
(function () {
    'use strict';

    // 使用共享 Supabase 客户端（从 common.js MyLuck.getSupabase）
    var _sb = null;
    async function getSupabase() {
        if (_sb) return _sb;
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

    // 确定性随机(基于种子)
    function seededRand(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    // ===== 虚拟用户名生成（组合式 + API增强） =====
    var SURNAMES_ZH = ['小','阿','大','老','萌','甜','酷','呆','乖'];
    var GIVENS_ZH = [
        '明','红','白','福','糖','星','月','鱼','熊','花','果','豆','雪','雨',
        '阳','风','虹','云','草','树','蝶','鹿','兔','猫','狗','鸟','龙','凤',
        '乐','喜','吉','祥','安','康','瑞','运','宝','玉','金','银','铜','铁',
        '莉','薇','琳','瑶','静','婷','颖','霞','蕾','梅','兰','竹','菊','荷'
    ];
    var NICKNAMES_ZH = [
        '棉花糖','巧克力','冰淇淋','泡芙','麻薯','年糕','布丁','奶茶',
        '可乐','雪碧','芒果','草莓','西瓜','蓝莓','樱桃','柠檬',
        '开心果','小幸运','好运来','笑哈哈','美滋滋','甜蜜蜜','旺财','如意',
        '彩虹糖','棒棒糖','小饼干','蛋挞','抹茶','豆沙','椰奶','酸奶'
    ];
    var FIRST_EN = [
        'Lucky','Happy','Sunny','Star','Moon','Sky','Storm','River',
        'Cloud','Snow','Rain','Frost','Ember','Blaze','Dawn','Dusk',
        'Coral','Pearl','Ruby','Jade','Sage','Fern','Ivy','Rose',
        'Maple','Cedar','Aspen','Birch','Fox','Wolf','Hawk','Dove'
    ];
    var LAST_EN = [
        'Cat','Star','Dream','Wish','Hope','Joy','Grace','Love',
        'Light','Wind','Wave','Spark','Glow','Shine','Bloom','Song',
        'Heart','Soul','Charm','Bliss','Fairy','Angel','Magic','Pixel',
        'Echo','Zen','Mochi','Latte','Candy','Berry','Cookie','Bubble'
    ];

    // API增强：尝试从 randomuser.me 获取名字并缓存
    var _apiNamesCache = null;
    var _apiNamesCacheKey = 'myluck-api-names-' + new Date().toISOString().slice(0, 10);

    async function fetchAPINames() {
        if (_apiNamesCache) return _apiNamesCache;
        try {
            var cached = sessionStorage.getItem(_apiNamesCacheKey);
            if (cached) { _apiNamesCache = JSON.parse(cached); return _apiNamesCache; }
        } catch (e) {}
        try {
            var today = new Date().toISOString().slice(0, 10);
            var resp = await fetch('https://randomuser.me/api/?results=30&seed=' + today + '&inc=name&nat=us,gb,au,ca&noinfo');
            if (resp.ok) {
                var data = await resp.json();
                var names = (data.results || []).map(function(r) {
                    return r.name.first + ' ' + r.name.last.charAt(0) + '.';
                });
                if (names.length > 0) {
                    _apiNamesCache = names;
                    try { sessionStorage.setItem(_apiNamesCacheKey, JSON.stringify(names)); } catch (e) {}
                    return names;
                }
            }
        } catch (e) { console.warn('[leaderboard] API name fetch failed, using local pool'); }
        return null;
    }

    // 预加载API名字（不阻塞）
    fetchAPINames();

    function getVirtualName(seed, usedNames, forEn) {
        var maxTries = 50;
        var name = '';
        for (var attempt = 0; attempt < maxTries; attempt++) {
            var s = seed + attempt * 31;
            if (forEn) {
                // 先尝试API名字
                if (_apiNamesCache && _apiNamesCache.length > 0) {
                    var apiIdx = Math.floor(seededRand(s) * _apiNamesCache.length);
                    name = _apiNamesCache[apiIdx];
                } else {
                    var fIdx = Math.floor(seededRand(s) * FIRST_EN.length);
                    var lIdx = Math.floor(seededRand(s + 7) * LAST_EN.length);
                    name = FIRST_EN[fIdx] + ' ' + LAST_EN[lIdx];
                }
            } else {
                // 中文：组合式或昵称
                if (seededRand(s + 3) > 0.4) {
                    var sIdx = Math.floor(seededRand(s) * SURNAMES_ZH.length);
                    var gIdx = Math.floor(seededRand(s + 7) * GIVENS_ZH.length);
                    name = SURNAMES_ZH[sIdx] + GIVENS_ZH[gIdx];
                } else {
                    var nIdx = Math.floor(seededRand(s) * NICKNAMES_ZH.length);
                    name = NICKNAMES_ZH[nIdx];
                }
            }
            if (!usedNames.has(name)) {
                usedNames.add(name);
                return name;
            }
        }
        // 兜底：加数字后缀
        return name + Math.floor(seededRand(seed + 999) * 99);
    }

    /**
     * 生成虚拟排行榜条目（去重名字）
     */
    function generateVirtualEntries(testType, count, typeConfig) {
        var today = new Date().toISOString().slice(0, 10);
        var baseSeed = 0;
        for (var c = 0; c < today.length; c++) baseSeed += today.charCodeAt(c);
        baseSeed = baseSeed * 31 + testType.length * 7;

        var result = [];
        var en = isEn();
        var usedNames = new Set();

        for (var i = 0; i < count; i++) {
            var seed = baseSeed + i * 137 + 42;
            var name = getVirtualName(seed, usedNames, en);
            var entry = { name: name, score: 50, character_emoji: '', character_title: '', is_virtual: true };

            if (typeConfig && typeConfig.getEntry) {
                var custom = typeConfig.getEntry(function(s) { return seededRand(seed + (s || 0)); }, i);
                if (custom.name) entry.name = custom.name;
                entry.score = custom.score || 50;
                entry.character_emoji = custom.character_emoji || '';
                entry.character_title = custom.character_title || '';
            } else {
                entry.score = Math.floor(seededRand(seed + 1) * 60 + 20);
            }
            result.push(entry);
        }
        return result;
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
            '.lb-turnstile{display:flex;justify-content:center;margin:10px 0}'
        ].join('\n');
        document.head.appendChild(style);
    }

    var MEDALS = ['🥇', '🥈', '🥉'];

    /**
     * 加载并渲染排行榜（真实 + 虚拟用户混合）
     * @param {string} containerId - DOM容器的id
     * @param {string} testType - 测试类型 'rp'|'fortune'|'mbti' 等
     * @param {object} [opts] - 可选配置 { limit, formatEntry, virtualCount, virtualConfig, mode:'score'|'recent' }
     */
    async function loadBoard(containerId, testType, opts) {
        injectCSS();
        opts = opts || {};
        var limit = opts.limit || 10;
        var formatEntry = opts.formatEntry || null;
        var virtualCount = opts.virtualCount || 0;
        var virtualConfig = opts.virtualConfig || null;
        var mode = opts.mode || 'score'; // 'score'=按分数排名, 'recent'=按时间显示最近
        var container = document.getElementById(containerId);
        if (!container) return;

        try {
            var realData = [];
            var sb = await getSupabase();
            if (sb) {
                var today = new Date().toISOString().slice(0, 10);
                var orderField = mode === 'recent' ? 'created_at' : 'score';
                var query = sb.from('leaderboard').select('*').eq('test_date', today).eq('test_type', testType).eq('visible', true).order(orderField, { ascending: false }).limit(limit);
                var result = await query;
                if (result.data && !result.error) {
                    realData = result.data;
                }
            }

            // 生成虚拟用户
            var virtualData = virtualCount > 0 ? generateVirtualEntries(testType, virtualCount, virtualConfig) : [];

            // 合并
            var allData = realData.map(function(d) { d.is_virtual = false; return d; }).concat(virtualData);
            if (mode === 'recent') {
                // 最近模式：真人优先，虚拟用户填充
                var realItems = allData.filter(function(d) { return !d.is_virtual; });
                var virtualItems = allData.filter(function(d) { return d.is_virtual; });
                allData = realItems.concat(virtualItems);
            } else {
                // 分数模式：按分数降序，同分真人优先
                allData.sort(function(a, b) {
                    if (b.score !== a.score) return b.score - a.score;
                    return a.is_virtual ? 1 : -1;
                });
            }
            allData = allData.slice(0, limit);

            if (allData.length === 0) {
                container.innerHTML = '<p class="lb-empty">' + t('lb.empty', '还没有人上榜，来当第一个！') + '</p>';
                return;
            }

            container.innerHTML = '';
            for (var i = 0; i < allData.length; i++) {
                var entry = allData[i];
                var div = document.createElement('div');
                div.className = 'lb-row';

                var medal;
                if (mode === 'recent') {
                    medal = '<span class="lb-medal" style="opacity:0.4">' + (i + 1) + '</span>';
                } else {
                    medal = i < 3 ? '<span class="lb-medal">' + MEDALS[i] + '</span>' : '<span class="lb-medal" style="opacity:0.3">#' + (i + 1) + '</span>';
                }

                if (formatEntry) {
                    div.innerHTML = formatEntry(entry, i, medal);
                } else {
                    var emoji = entry.character_emoji ? escapeHtml(entry.character_emoji) + ' ' : '';
                    var detail = entry.character_title ? '<span class="lb-detail">' + escapeHtml(entry.character_title) + '</span>' : '';
                    div.innerHTML = '<div class="lb-left">' + medal + '<span class="lb-name">' + emoji + escapeHtml(entry.name || '匿名') + '</span>' + detail + '</div><span class="lb-score" style="color:' + getColor(entry.score) + '">' + entry.score + '</span>';
                }
                container.appendChild(div);
            }
        } catch (e) {
            container.innerHTML = '<p class="lb-empty">' + t('lb.fail', '排行榜加载失败') + '</p>';
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

    /**
     * 创建排行榜HTML结构（含标题、列表容器、Turnstile、提交按钮）
     * @param {object} opts - { boardId, turnstileId, testType, titleZh, titleEn }
     * @returns {string} HTML字符串
     */
    function createBoardHTML(opts) {
        injectCSS();
        var en = isEn();
        return '<div class="lb-board">' +
            '<h3>' + (en ? (opts.titleEn || 'Leaderboard') : (opts.titleZh || '🏆 今日排行榜')) + '</h3>' +
            '<div id="' + opts.boardId + '"><p class="lb-empty">' + (en ? 'Loading...' : '加载中...') + '</p></div>' +
            '</div>';
    }

    // 挂载
    if (!window.MyLuck) window.MyLuck = {};
    window.MyLuck.Leaderboard = {
        load: loadBoard,
        submit: submitScore,
        createHTML: createBoardHTML,
        getSupabase: getSupabase,
        generateVirtual: generateVirtualEntries
    };
})();
