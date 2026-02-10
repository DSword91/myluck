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
            '.lb-turnstile{display:flex;justify-content:center;margin:10px 0}'
        ].join('\n');
        document.head.appendChild(style);
    }

    var MEDALS = ['🥇', '🥈', '🥉'];

    /**
     * 加载并渲染排行榜
     * @param {string} containerId - DOM容器的id
     * @param {string} testType - 测试类型 'rp'|'fortune'|'mbti' 等
     * @param {object} [opts] - 可选配置 { limit, formatEntry }
     */
    async function loadBoard(containerId, testType, opts) {
        injectCSS();
        opts = opts || {};
        var limit = opts.limit || 20;
        var formatEntry = opts.formatEntry || null;
        var container = document.getElementById(containerId);
        if (!container) return;

        try {
            var sb = await getSupabase();
            if (!sb) {
                container.innerHTML = '<p class="lb-empty">' + t('lb.unavail', '排行榜暂不可用') + '</p>';
                return;
            }
            var today = new Date().toISOString().slice(0, 10);
            var query = sb.from('leaderboard').select('*').eq('test_date', today).eq('test_type', testType).eq('visible', true).order('score', { ascending: false }).limit(limit);
            var result = await query;
            var data = result.data;
            var error = result.error;

            if (error || !data) {
                container.innerHTML = '<p class="lb-empty">' + t('lb.fail', '加载失败') + '</p>';
                return;
            }
            if (data.length === 0) {
                container.innerHTML = '<p class="lb-empty">' + t('lb.empty', '还没有人上榜，来当第一个！') + '</p>';
                return;
            }

            container.innerHTML = '';
            for (var i = 0; i < data.length; i++) {
                var entry = data[i];
                var div = document.createElement('div');
                div.className = 'lb-row';

                var medal = i < 3 ? '<span class="lb-medal">' + MEDALS[i] + '</span>' : '<span class="lb-medal" style="opacity:0.3">#' + (i + 1) + '</span>';

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
        getSupabase: getSupabase
    };
})();
