// ========== 今日人设测试 rp-test.js (玩梗版) ==========
(function () {
    'use strict';

    // ===== 30种搞笑人设角色 =====
    const CHARACTERS = [
        // 神级 (95-100)
        { id: 'koi', emoji: '🐠', title: '天选锦鲤', titleEn: 'Divine Koi Fish', desc: '你就是传说中走路都能捡到钱的人！空气中弥漫着你的欧气，路过的人都能沾到好运。你可能是老天爷家的亲戚？', descEn: 'You pick up money just walking! Your lucky aura is contagious.', stats: { lucky: 100, charm: 90, energy: 85, brain: 75 }, tags: ['欧气满满', '天生好命', '自带BGM'], tagsEn: ['Ultra Lucky', 'Born Winner', 'Main Character'] },
        { id: 'emperor', emoji: '👑', title: '欧皇本皇', titleEn: 'The Lucky Emperor', desc: '十连抽必出金，红包手气永远最佳，考试蒙的全对。你不是运气好，你就是运气本身！', descEn: 'Gacha king! Best luck forever. You don\'t HAVE luck, you ARE luck!', stats: { lucky: 98, charm: 85, energy: 80, brain: 70 }, tags: ['十连必金', '绝对幸运', '命运宠儿'], tagsEn: ['Gacha King', 'Absolute Luck', 'Destiny\'s Child'] },

        // 大吉 (85-94)
        { id: 'protagonist', emoji: '✨', title: '主角光环体', titleEn: 'Plot Armor Incarnate', desc: '走到哪里都自带主角BGM，关键时刻总有贵人相助，死线前一秒总能完成任务。你是小说主角吧？', descEn: 'BGM plays when you walk in. Clutch every deadline. Are you a novel protagonist?', stats: { lucky: 92, charm: 88, energy: 78, brain: 82 }, tags: ['自带BGM', '关键先生', '绝境翻盘'], tagsEn: ['Plot Armor', 'Clutch King', 'Last Second'] },
        { id: 'magnet', emoji: '🧲', title: '好运磁铁', titleEn: 'Lucky Magnet', desc: '你吸引好运就像磁铁吸铁一样自然。超市排队你永远选到最快的，打车永远秒到。', descEn: 'You attract luck like a magnet. Fastest queue, instant taxi, always.', stats: { lucky: 88, charm: 82, energy: 75, brain: 78 }, tags: ['运气磁场', '秒到司机', '排队最快'], tagsEn: ['Luck Magnet', 'Instant Taxi', 'Fastest Queue'] },
        { id: 'catLord', emoji: '🐱', title: '猫系人格·橘座大人', titleEn: 'Cat Lord Supreme', desc: '慵懒却总能得到最好的，什么都不做就有人投喂。你就是那只永远被宠着的猫主子！', descEn: 'Lazy but spoiled. People just bring you things. You ARE the cat lord.', stats: { lucky: 86, charm: 95, energy: 40, brain: 80 }, tags: ['投喂体质', '躺赢人生', '最强被动'], tagsEn: ['Fed by All', 'Win by Lying Down', 'Best Passive'] },

        // 吉 (70-84)
        { id: 'socialKing', emoji: '🦁', title: '社牛之王', titleEn: 'Social Butterfly King', desc: '你走进电梯都能跟陌生人聊成知己，朋友数量比通讯录上限还多。社交能力突破人类极限。', descEn: 'You befriend strangers in elevators. Your contact list IS a small city.', stats: { lucky: 78, charm: 100, energy: 90, brain: 65 }, tags: ['自来熟', '人脉怪物', '聊天鬼才'], tagsEn: ['Instant Friends', 'Network Monster', 'Chat Genius'] },
        { id: 'dreamChaser', emoji: '🚀', title: '热血追梦人', titleEn: 'Passionate Dream Chaser', desc: '你心中有一团永远不灭的火焰，打不死的小强精神让你越挫越勇。今天依然在燃烧！', descEn: 'An eternal flame burns in your heart. Rise stronger with every setback!', stats: { lucky: 72, charm: 70, energy: 100, brain: 75 }, tags: ['永不言弃', '越挫越勇', '热血沸腾'], tagsEn: ['Never Give Up', 'Stronger Each Time', 'Burning Passion'] },
        { id: 'foodie', emoji: '🍜', title: '干饭之神', titleEn: 'The Eating Champion', desc: '你对美食的热爱超越一切！你的胃是无底洞，人生信条就是"吃了再说"。', descEn: 'Your love for food transcends everything. "Eat first, think later" is your motto.', stats: { lucky: 75, charm: 80, energy: 85, brain: 60 }, tags: ['人形饭桶', '美食雷达', '为食而生'], tagsEn: ['Food Radar', 'Bottomless Stomach', 'Live to Eat'] },
        { id: 'nightOwl', emoji: '🦉', title: '夜行猫头鹰', titleEn: 'Night Owl Supreme', desc: '白天是行尸走肉，凌晨两点才是你真正的巅峰。你的创造力在深夜达到MAX！', descEn: 'Zombie by day, genius by 2 AM. Peak performance starts at midnight.', stats: { lucky: 70, charm: 60, energy: 75, brain: 90 }, tags: ['夜间动物', '深夜灵感', '日出即息'], tagsEn: ['Nocturnal', 'Midnight Inspiration', 'Sleep at Dawn'] },

        // 中吉 (55-69)
        { id: 'buddha', emoji: '🧘', title: '佛系大师', titleEn: 'Zen Master', desc: '随缘随缘一切随缘。别人急得跳脚你还在品茶微笑。你已经超脱了尘世的烦恼。', descEn: 'Everything happens as it should. Others panic while you sip tea and smile.', stats: { lucky: 65, charm: 75, energy: 30, brain: 85 }, tags: ['一切随缘', '佛系青年', '心如止水'], tagsEn: ['Zen Mode', 'Go With Flow', 'Inner Peace'] },
        { id: 'fisherman', emoji: '🐟', title: '摸鱼大师', titleEn: 'Slacking Master', desc: '你把摸鱼升华成了一门艺术。Alt+Tab切换之快已经形成了肌肉记忆。', descEn: 'You elevated slacking to an art form. Alt+Tab is your muscle memory.', stats: { lucky: 60, charm: 55, energy: 45, brain: 80 }, tags: ['Alt+Tab战神', '划水冠军', '带薪拉屎'], tagsEn: ['Alt+Tab Master', 'Slack Champion', 'Paid Breaks Pro'] },
        { id: 'procrastinator', emoji: '🦥', title: '拖延症晚期', titleEn: 'Procrastination Pro', desc: 'Deadline是第一生产力！你总能在最后一小时爆发出惊人的力量。压力越大越强。', descEn: 'Deadline IS productivity! Incredible power in the final hour. More pressure = more power.', stats: { lucky: 58, charm: 50, energy: 35, brain: 88 }, tags: ['DDL战士', '最后一刻', '极限操作'], tagsEn: ['DDL Warrior', 'Last Minute', 'Clutch Mode'] },
        { id: 'memeKing', emoji: '😂', title: '表情包大王', titleEn: 'Meme Lord', desc: '你的表情包库存可以开店了。任何对话都有完美表情包回应。你是聊天界的灵魂画手！', descEn: 'Your meme collection could fill a museum. Perfect meme for every chat situation.', stats: { lucky: 62, charm: 88, energy: 60, brain: 72 }, tags: ['表情包库', '斗图之王', '梗百科'], tagsEn: ['Meme Archive', 'Meme Battle King', 'Meme Encyclopedia'] },
        { id: 'homebody', emoji: '🏠', title: '宅家至尊', titleEn: 'Home Guardian', desc: '出门是不可能出门的。WiFi、空调、外卖，这才是人生真谛。', descEn: 'Going outside? Impossible. WiFi + AC + delivery = the meaning of life.', stats: { lucky: 55, charm: 40, energy: 25, brain: 70 }, tags: ['窝里横', '外卖王者', 'WiFi依赖'], tagsEn: ['Homebody', 'Delivery King', 'WiFi Dependent'] },

        // 中 (40-54)
        { id: 'worker', emoji: '💼', title: '打工人の觉醒', titleEn: 'Wage Worker Awakened', desc: '打工人打工魂！你今天继续搬砖，但内心深处藏着一个改变世界的梦想。', descEn: 'Worker\'s soul! You brick-lay today but dream of changing the world inside.', stats: { lucky: 50, charm: 50, energy: 55, brain: 60 }, tags: ['打工人', '搬砖日常', '工资小偷'], tagsEn: ['Worker', 'Daily Grind', 'Wage Thief'] },
        { id: 'debugger', emoji: '🐛', title: 'Bug终结者', titleEn: 'The Bug Terminator', desc: '你写代码10分钟，debug三小时。但每次修完bug的成就感让你觉得自己是世界上最强程序员。', descEn: '10 min coding, 3 hours debugging. But fixing that bug makes you feel invincible!', stats: { lucky: 45, charm: 40, energy: 50, brain: 95 }, tags: ['404大师', '抓虫专家', '关机重启'], tagsEn: ['404 Master', 'Bug Hunter', 'Have You Tried Restarting'] },
        { id: 'choicePhobia', emoji: '🤔', title: '选择困难户', titleEn: 'Decision Paralysis', desc: '午饭吃什么？这个问题你能纠结半小时。你的人生80%的时间花在了"选哪个"上。', descEn: 'What for lunch? 30 min to decide. 80% of your life is spent just choosing.', stats: { lucky: 48, charm: 55, energy: 40, brain: 65 }, tags: ['纠结症候群', '午饭难题', '都行都行'], tagsEn: ['Indecisive', 'Lunch Crisis', 'Whatever Works'] },
        { id: 'pigSmart', emoji: '🐷', title: '诸葛猪', titleEn: 'Genius Piglet', desc: '外表憨厚内心精明，看起来什么都不在乎其实什么都算计好了。你是猪界的诸葛亮！', descEn: 'Looks chill, calculates everything. You\'re the Zhuge Liang of piggies!', stats: { lucky: 52, charm: 70, energy: 35, brain: 92 }, tags: ['扮猪吃虎', '深藏不露', '装傻充愣'], tagsEn: ['Wolf in Pig', 'Hidden Genius', 'Play Dumb Win Smart'] },
        { id: 'pigFlying', emoji: '🐷', title: '飞天猪', titleEn: 'Flying Pig', desc: '站在风口上猪都能飞！你就是那只抓住了风口的猪。虽然是猪，但是有翅膀的猪！', descEn: 'Pigs fly when the wind is right! You caught the trend - a pig with WINGS!', stats: { lucky: 50, charm: 60, energy: 70, brain: 55 }, tags: ['风口上的猪', '趋势大师', '一飞冲天'], tagsEn: ['Trendy Pig', 'Trend Rider', 'When Pigs Fly'] },

        // 中下 (25-39)
        { id: 'socialAnxiety', emoji: '🫣', title: '社恐本恐', titleEn: 'Social Anxiety Pro', desc: '快递放在楼下也不想去拿，电话能不接就不接。遇事就把头埋起来——你是人类鸵鸟。', descEn: 'Package downstairs? Get it tomorrow. Calls? Voicemail. You\'re a human ostrich.', stats: { lucky: 35, charm: 20, energy: 30, brain: 78 }, tags: ['社交恐惧', '已读不回', '隐形人'], tagsEn: ['Social Anxiety', 'Seen Not Reply', 'Invisible Mode'] },
        { id: 'unluckyEgg', emoji: '🥚', title: '倒霉蛋预备役', titleEn: 'Bad Luck Trainee', desc: '出门踩狗屎，排队排最慢，买东西买完就降价。你是倒霉的预备役，但还没转正。', descEn: 'Step on things, slowest queue, buy then price drops. Almost officially unlucky.', stats: { lucky: 30, charm: 45, energy: 50, brain: 55 }, tags: ['买完降价', '排队最慢', '倒霉预备'], tagsEn: ['Price Drops After Buy', 'Slowest Queue', 'Unlucky Intern'] },
        { id: 'moneyHole', emoji: '🕳️', title: '月光仙子', titleEn: 'Moonlight Spender', desc: '工资到账秒变空气，钱在你手里就像水一样流走。你不是在花钱，你是在给钱自由。', descEn: 'Salary vanishes instantly. Money flows through you like water. Setting money free!', stats: { lucky: 38, charm: 60, energy: 55, brain: 42 }, tags: ['花钱如水', '月光族', '给钱自由'], tagsEn: ['Money Flows', 'Moonlight Clan', 'Setting Money Free'] },
        { id: 'alarmSlave', emoji: '⏰', title: '赖床战士', titleEn: 'Snooze Button Warrior', desc: '闹钟设了8个，每5分钟一个。你和床的关系比任何感情都要深。', descEn: '8 alarms, 5 min apart. Your relationship with bed is deeper than any love story.', stats: { lucky: 32, charm: 40, energy: 15, brain: 50 }, tags: ['起床困难', '8个闹钟', '被窝选手'], tagsEn: ['Can\'t Wake Up', '8 Alarms', 'Bed Champion'] },

        // 下 (10-24)
        { id: 'africanChief', emoji: '💀', title: '非酋酋长', titleEn: 'Unlucky Chieftain', desc: '抽卡全蓝，刮奖从未中过，买的股票必跌。你不是运气差——你是被运气拉黑了。', descEn: 'All blue cards, never won a scratch ticket, stocks crash when you buy. Luck blocked you.', stats: { lucky: 15, charm: 30, energy: 35, brain: 55 }, tags: ['抽卡全蓝', '运气拉黑', '非酋认证'], tagsEn: ['All Blue Cards', 'Blocked by Luck', 'Certified Unlucky'] },
        { id: 'rainMan', emoji: '🌧️', title: '雨神同行', titleEn: 'Rain God\'s Companion', desc: '你出门必下雨，收衣服必下雨，好不容易晴天你回家了。气象局应该雇你当天气预报。', descEn: 'You go out, it rains. You dry clothes, it rains. Weather bureau should hire you.', stats: { lucky: 20, charm: 35, energy: 40, brain: 48 }, tags: ['出门必雨', '人形雨神', '移动低压'], tagsEn: ['Rain Follows You', 'Human Rain God', 'Walking Low Pressure'] },
        { id: 'retrograde', emoji: '🌊', title: '水逆代言人', titleEn: 'Mercury Retrograde MVP', desc: '手机摔了、钥匙丢了、迟到了、踩水了……你的人品可能在充值中，请耐心等待。', descEn: 'Phone cracked, keys lost, late, stepped in puddle. Luck is recharging, please wait.', stats: { lucky: 18, charm: 25, energy: 30, brain: 45 }, tags: ['水逆附体', '运气充值中', '多灾多难'], tagsEn: ['Retrograde Mode', 'Luck Recharging', 'Murphy\'s Law'] },

        // 下下 (0-9)
        { id: 'expired', emoji: '🫠', title: '人品过期了', titleEn: 'Expired Luck', desc: '你的人品可能上个月就过期了，建议检查保质期。不过别担心，明天重新开封一瓶新的。', descEn: 'Your luck expired last month. Don\'t worry, fresh batch tomorrow.', stats: { lucky: 5, charm: 15, energy: 20, brain: 40 }, tags: ['过期人品', '保质期已过', '需要重启'], tagsEn: ['Expired Luck', 'Past Due', 'Need Reboot'] },
        { id: 'offline', emoji: '📵', title: '运气已下线', titleEn: 'Luck Went Offline', desc: '您拨打的运气暂时无法接通，请稍后再试。你的好运可能去隔壁老王家串门了。', descEn: 'The luck you dialed is unavailable. Your luck is visiting the neighbor.', stats: { lucky: 2, charm: 10, energy: 15, brain: 35 }, tags: ['运气离线', '请稍后再试', '查无此运'], tagsEn: ['Luck Offline', 'Try Again Later', 'Luck Not Found'] }
    ];

    function getNameSeed(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash = hash & hash;
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

    function calcCharacter(name) {
        const seed = getNameSeed(name);
        const rng = seededRandom(seed);
        const r1 = rng(), r2 = rng(), r3 = rng();
        let score = Math.round(((r1 + r2 + r3) / 3) * 100);
        score = Math.max(0, Math.min(100, score));

        let candidates;
        if (score >= 95) candidates = CHARACTERS.filter(c => c.stats.lucky >= 95);
        else if (score >= 85) candidates = CHARACTERS.filter(c => c.stats.lucky >= 85 && c.stats.lucky < 95);
        else if (score >= 70) candidates = CHARACTERS.filter(c => c.stats.lucky >= 70 && c.stats.lucky < 85);
        else if (score >= 55) candidates = CHARACTERS.filter(c => c.stats.lucky >= 55 && c.stats.lucky < 70);
        else if (score >= 40) candidates = CHARACTERS.filter(c => c.stats.lucky >= 40 && c.stats.lucky < 55);
        else if (score >= 25) candidates = CHARACTERS.filter(c => c.stats.lucky >= 25 && c.stats.lucky < 40);
        else if (score >= 10) candidates = CHARACTERS.filter(c => c.stats.lucky >= 10 && c.stats.lucky < 25);
        else candidates = CHARACTERS.filter(c => c.stats.lucky < 10);

        if (!candidates.length) candidates = CHARACTERS;
        const charIdx = Math.floor(rng() * candidates.length);
        return { score, character: candidates[charIdx] };
    }

    function animateValue(el, target, duration) {
        let start = 0;
        const step = Math.max(1, Math.ceil(target / (duration / 30)));
        const timer = setInterval(function () {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = start;
        }, 30);
    }

    function getColor(v) {
        if (v >= 80) return '#52c41a';
        if (v >= 60) return '#faad14';
        if (v >= 40) return '#1890ff';
        if (v >= 20) return '#fa8c16';
        return '#f5222d';
    }

    function showResult(name) {
        if (!name.trim()) return;
        name = name.trim();
        const { score, character } = calcCharacter(name);
        const isEn = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');

        const resultDiv = document.getElementById('rp-result');
        resultDiv.style.display = 'block';

        document.getElementById('char-emoji').textContent = character.emoji;
        document.getElementById('char-title').textContent = isEn ? character.titleEn : character.title;
        document.getElementById('char-score').textContent = score;
        document.getElementById('char-score').style.color = getColor(score);
        document.getElementById('char-desc').textContent = isEn ? character.descEn : character.desc;

        // 四维属性条动画
        ['lucky', 'charm', 'energy', 'brain'].forEach(function (key) {
            const bar = document.getElementById('stat-' + key);
            const valEl = document.getElementById('stat-' + key + '-val');
            bar.style.width = '0';
            bar.style.background = getColor(character.stats[key]);
            setTimeout(function () { bar.style.width = character.stats[key] + '%'; }, 100);
            if (valEl) animateValue(valEl, character.stats[key], 800);
        });

        // 标签
        const tagsEl = document.getElementById('char-tags');
        tagsEl.innerHTML = '';
        const tagList = isEn ? (character.tagsEn || character.tags) : character.tags;
        tagList.forEach(function (t) {
            const span = document.createElement('span');
            span.className = 'rp-tag';
            span.textContent = '#' + t;
            tagsEl.appendChild(span);
        });

        saveHistory(name, score, isEn ? character.titleEn : character.title, character.emoji);
        currentResult = { name: name, score: score, character: character };
        // 重置上榜按钮
        var rankBtn = document.getElementById('rp-rank');
        if (rankBtn) { rankBtn.disabled = false; rankBtn.textContent = (window.MyLuck && window.MyLuck.I18n) ? window.MyLuck.I18n.t('rp.rank') : '🏆 上榜'; }
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function saveHistory(name, score, title, emoji) {
        const key = 'myluck_rp_history';
        let history = [];
        try { history = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { }
        const existing = history.findIndex(function (h) { return h.name === name; });
        if (existing >= 0) history.splice(existing, 1);
        history.unshift({ name: name, score: score, title: title, emoji: emoji, time: Date.now() });
        if (history.length > 10) history = history.slice(0, 10);
        localStorage.setItem(key, JSON.stringify(history));
        renderHistory(history);
    }

    function renderHistory(history) {
        var container = document.getElementById('rp-history');
        if (!container || !history.length) return;
        var isEn = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
        container.innerHTML = '';
        history.forEach(function (h) {
            var div = document.createElement('div');
            div.className = 'rp-history-item';
            div.innerHTML = '<span class="rp-history-name">' + h.emoji + ' ' + escapeHtml(h.name) + '</span><span class="rp-history-score" style="color:' + getColor(h.score) + '">' + h.score + (isEn ? '% · ' : '分 · ') + escapeHtml(h.title) + '</span>';
            container.appendChild(div);
        });
    }

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    // ========== Supabase 排行榜 ==========
    const SUPABASE_URL = 'https://qerajxnmtwyjtokhaonq.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlcmFqeG5tdHd5anRva2hhb25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MTA1MjksImV4cCI6MjA4NjE4NjUyOX0.sUMZ_RIu9zLjMOB3nnruJezlQL0i-GrunDIkahWcF5E';
    let supabaseClient = null;

    async function getSupabase() {
        if (supabaseClient) return supabaseClient;
        try {
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
            supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
            return supabaseClient;
        } catch (e) { return null; }
    }

    async function loadLeaderboard() {
        var container = document.getElementById('rp-global-list');
        if (!container) return;
        try {
            var sb = await getSupabase();
            if (!sb) { container.innerHTML = '<p style="text-align:center;color:#bbb;">' + (I18n ? I18n.t('rp.rank_fail') : 'Leaderboard unavailable') + '</p>'; return; }
            var today = new Date().toISOString().slice(0, 10);
            var { data, error } = await sb.from('leaderboard').select('*').eq('test_date', today).eq('visible', true).order('score', { ascending: false }).limit(20);
            if (error || !data) { container.innerHTML = '<p style="text-align:center;color:#bbb;">' + (I18n ? I18n.t('rp.rank_fail') : 'Load failed') + '</p>'; return; }
            if (data.length === 0) {
                var I18n = window.MyLuck && window.MyLuck.I18n;
                container.innerHTML = '<p style="text-align:center;color:#bbb;">' + (I18n ? I18n.t('rp.board_empty') : '还没有人上榜，来当第一个！') + '</p>';
                return;
            }
            container.innerHTML = '';
            var medals = ['🥇', '🥈', '🥉'];
            data.forEach(function (entry, i) {
                var div = document.createElement('div');
                div.className = 'rp-rank-row';
                var medal = i < 3 ? '<span class="rp-rank-medal">' + medals[i] + '</span>' : '<span class="rp-rank-medal" style="opacity:0.3">#' + (i + 1) + '</span>';
                div.innerHTML = '<div class="rp-rank-left">' + medal + '<span class="rp-rank-name">' + escapeHtml(entry.character_emoji || '') + ' ' + escapeHtml(entry.name || '') + '</span><span class="rp-rank-char">' + escapeHtml(entry.character_title || '') + '</span></div><span class="rp-rank-score" style="color:' + getColor(entry.score) + '">' + entry.score + '</span>';
                container.appendChild(div);
            });
        } catch (e) {
            container.innerHTML = '<p style="text-align:center;color:#bbb;">' + (I18n ? I18n.t('rp.rank_fail') : 'Leaderboard unavailable') + '</p>';
        }
    }

    var currentResult = null;

    async function submitToLeaderboard() {
        if (!currentResult) return;
        var I18n = window.MyLuck && window.MyLuck.I18n;
        var Security = window.MyLuck && window.MyLuck.Security;
        var Turnstile = window.MyLuck && window.MyLuck.Turnstile;

        // 反垃圾检查
        if (Security && !Security.rateLimit('leaderboard', 5)) {
            alert(I18n ? I18n.t('gb.toomany') : '操作太频繁，请稍后再试');
            return;
        }
        if (Turnstile && !Turnstile.isVerified()) {
            alert(I18n && I18n.lang === 'en' ? 'Please complete verification' : '请完成人机验证');
            return;
        }

        var rankBtn = document.getElementById('rp-rank');
        if (rankBtn) { rankBtn.disabled = true; rankBtn.textContent = '...'; }

        try {
            var sb = await getSupabase();
            if (!sb) throw new Error('No Supabase');
            var today = new Date().toISOString().slice(0, 10);
            var isEn = I18n && I18n.lang === 'en';
            var { error } = await sb.from('leaderboard').insert({
                name: currentResult.name,
                character_id: currentResult.character.id,
                character_emoji: currentResult.character.emoji,
                character_title: isEn ? currentResult.character.titleEn : currentResult.character.title,
                score: currentResult.score,
                test_type: 'rp',
                test_date: today,
                visible: true
            });
            if (error) throw error;
            if (rankBtn) rankBtn.textContent = I18n ? I18n.t('rp.ranked') : '✅ 已上榜！';
            if (Turnstile) Turnstile.reset();
            await loadLeaderboard();
        } catch (e) {
            alert(I18n ? I18n.t('rp.rank_fail') : '上榜失败，请稍后重试');
            if (rankBtn) { rankBtn.disabled = false; rankBtn.textContent = I18n ? I18n.t('rp.rank') : '🏆 上榜'; }
        }
    }

    function shareRP() {
        var title = document.getElementById('char-title').textContent;
        var score = document.getElementById('char-score').textContent;
        var emoji = document.getElementById('char-emoji').textContent;
        var desc = document.getElementById('char-desc').textContent;
        var isEn = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');

        var text = isEn
            ? 'My Daily Persona on MyLuck: ' + emoji + ' [' + title + '] ' + score + '%\n\n' + desc + '\n\nFind your persona 👉 https://myluck.top/rp-test.html'
            : '我在 MyLuck 测出今日人设：' + emoji + '【' + title + '】' + score + '分\n\n' + desc + '\n\n快来测测你是什么人设 👉 https://myluck.top/rp-test.html';
        var shareTitle = isEn ? 'MyLuck Daily Persona - ' + title : 'MyLuck 今日人设 - ' + title;

        if (navigator.share) {
            navigator.share({ title: shareTitle, text: text, url: 'https://myluck.top/rp-test.html' }).catch(function () { });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                alert(isEn ? 'Result copied! Share it with friends!' : '结果已复制到剪贴板，快去分享给朋友吧！');
            });
        } else {
            prompt(isEn ? 'Copy and share with friends:' : '复制以下结果分享给朋友：', text);
        }
    }

    function init() {
        var input = document.getElementById('rp-name');
        var submitBtn = document.getElementById('rp-submit');
        var shareBtn = document.getElementById('rp-share');
        var retryBtn = document.getElementById('rp-retry');
        var rankBtn = document.getElementById('rp-rank');

        if (submitBtn) submitBtn.addEventListener('click', function () { showResult(input.value); });
        if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') showResult(input.value); });
        if (shareBtn) shareBtn.addEventListener('click', shareRP);
        if (rankBtn) rankBtn.addEventListener('click', submitToLeaderboard);
        if (retryBtn) retryBtn.addEventListener('click', function () {
            input.value = ''; input.focus();
            document.getElementById('rp-result').style.display = 'none';
            currentResult = null;
        });
        try { renderHistory(JSON.parse(localStorage.getItem('myluck_rp_history') || '[]')); } catch (e) { }

        // 加载全球排行榜
        loadLeaderboard();

        // 语言切换时刷新内容
        document.addEventListener('langchange', function () {
            if (currentResult) {
                showResult(currentResult.name);
            }
            try { renderHistory(JSON.parse(localStorage.getItem('myluck_rp_history') || '[]')); } catch (e) { }
            loadLeaderboard();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
