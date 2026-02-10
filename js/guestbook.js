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
        '开心果','小幸运','好运来','福气满','笑哈哈','乐呵呵','美滋滋','甜蜜蜜',
        '小确幸','暖羊羊','大橘','咕噜','嘟嘟','团子','汤圆','饺子',
        '拉面','寿司','披萨','薯条','果冻','布丁','苹果','橘子',
        '桃子','葡萄','香蕉','柠檬','椰子','蓝莓','樱桃','荔枝',
        '火龙果','芒果干','话梅','雪梨','甜瓜','蜜桃','杨梅','石榴',
        '大力','小强','富贵','招财','进宝','金刚','小白','小黑',
        '小灰','皮皮','球球','圆圆','蛋蛋','毛毛','丸子','点点',
        '叮当','哈利','波特','星辰','大海','森林','泉水','清风',
        '明月','朝阳','晚霞','彩霞','春风','夏雨','秋月','冬雪',
        '天天','萌萌','豆包','麻花','甜甜','酸奶','蜂蜜','薄荷',
        '玫瑰','茉莉','百合','牡丹','兰花','樱花','梅花','菊花',
        '向日葵','康乃馨','紫罗兰','满天星','勿忘我','蒲公英','银杏','白桦',
        '小松鼠','小兔子','小鹿','小狐','企鹅','考拉','熊猫','猫咪',
        '柴犬','哈士奇','金毛','布偶','暹罗','橘猫','狸花','英短',
        '锦鲤','孔雀','白鸽','青鸟','百灵','夜莺','海豚','鲸鱼',
        '独角兽','凤凰','麒麟','飞龙','精灵','天使','仙女','侠客',
        '大侠','少侠','掌门','盟主','帮主','教主','师父','徒弟',
        '学霸','学渣','学神','课代表','班长','组长','监督员','志愿者'
    ];
    var RANDOM_NAMES_EN = [
        'Lucky Cat','Star','Moon','Sunny','Rainbow','Cloud',
        'Butterfly','Happy','Joy','Hope','Grace','Melody',
        'Blossom','Cookie','Mochi','Bubble','Sparkle','Dream',
        'Angel','Phoenix','Wish','Charm','Clover','Aurora',
        'Berry','Candy','Latte','Maple','Petal','River',
        'Sky','Willow','Zen','Frost','Ember','Luna',
        'Nova','Sage','Pearl','Ivy','Coral','Daisy',
        'Finn','Leo','Max','Zoe','Aria','Jade',
        'Ruby','Theo','Ollie','Milo','Cleo','Gigi',
        'Felix','Oscar','Hugo','Remy','Taro','Kiwi',
        'Cocoa','Mocha','Chai','Breeze','Storm','Dawn',
        'Dusk','Blaze','Echo','Flora','Poppy','Violet',
        'Jasmine','Iris','Hazel','Olive','Cedar','Aspen',
        'Birch','Rowan','Basil','Ginger','Cinnamon','Saffron',
        'Pepper','Nutmeg','Clove','Honey','Sugar','Maple',
        'Rain','Snow','Thunder','Summer','Winter','Autumn',
        'Spring','Ocean','Wave','Tide','Brook','Lake',
        'Forest','Meadow','Prairie','Desert','Valley','Ridge',
        'Peak','Summit','Horizon','Zenith','Cosmos','Nebula',
        'Galaxy','Comet','Orbit','Stellar','Pixel','Byte',
        'Widget','Sprocket','Gadget','Tinker','Doodle','Sketch',
        'Marble','Crystal','Opal','Topaz','Garnet','Amber',
        'Velvet','Satin','Silk','Linen','Cotton','Fleece',
        'Paws','Whiskers','Nuzzle','Cuddles','Snuggles','Dimples',
        'Giggles','Twinkle','Shimmer','Glimmer','Flicker','Dazzle',
        'Breezy','Misty','Frosty','Sunny','Cloudy','Stormy',
        'Pebble','Boulder','Flint','Jasper','Onyx','Slate'
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
        '愿你所愿皆可得 💖','祝你逢考必过 📝',
        '愿你心中有光，脚下有路 🔦','今天也是被好运眷顾的一天 🌈',
        '加油！你是最棒的 💯','祝你有一个美好的一天 🌅',
        '愿所有的等待都不被辜负 ⏳','送你一颗幸运星 ⭐',
        '愿你的笑容永远灿烂 😁','愿你永远年轻，永远热泪盈眶 🥹',
        '祝福每一个善良的人 🤗','愿生活给你甜蜜和温暖 🍯',
        '希望你越来越好 🌱','愿你被这个世界温柔以待 💕',
        '祝你财源滚滚来 💰','愿你三冬暖，愿你春不寒 🌼',
        '祝你所到之处皆为热土 🌍','愿你的生活如诗如画 🎨',
        '祝你身体棒棒，精神满满 💪','你一定会越来越好的 🌿',
        '今天也是元气满满的一天 ☀️','愿好运像风一样跟着你 🍃',
        '祝你事业有成，爱情甜蜜 🏆','送你一束阳光 🌻',
        '祝你笑容多一点，烦恼少一点 😊','愿你有诗有梦有远方 🌌',
        '祝你日子红红火火 🔥','每天都有小确幸等着你 🎀',
        '愿你平安喜乐，万事胜意 🌺','愿你的每一天都闪闪发光 ✨',
        '今天也辛苦了，给你一个拥抱 🤗','祝你和身边的人都幸福 👨‍👩‍👧‍👦',
        '愿你的努力终将被看见 👀','送你所有的幸运与美好 🎊',
        '愿你无忧无虑，自由自在 🦋','祝你做什么都顺顺利利 ✅',
        '愿你每天醒来都是好心情 🌤️','你值得所有美好的事物 💎',
        '今天你笑了吗？笑一个吧 😃','愿世间所有的美好如约而至 🌹',
        '祝你遇到对的人，做对的事 💗','愿你岁月静好，现世安稳 🏡',
        '加油加油再加油 🔥','好运气从这里开始 🚪',
        '祝你新的一天充满能量 ⚡','愿你勇敢追梦不回头 🎯',
        '送你一片四叶草 🍀','希望快乐时光常伴左右 🎶',
        '愿你不负韶华不负己 📖','祝你步步高升，鸿运当头 🏮',
        '愿星辰大海都是你的归宿 🌊','你就是自己的太阳 ☀️',
        '祝你永远充满希望 🌈','每一个明天都比今天好 📅',
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
        'May your world be filled with sunshine 🌞','Happiness to everyone 🎈',
        'A little progress each day 📈','May you find your happiness 💝',
        'Wishing you all the best 🍀','Good luck and great joy 🧧',
        'May you get everything you wish for 💖','Pass every exam with ease 📝',
        'May light always guide your way 🔦','Today you are blessed by luck 🌈',
        'You\'ve got this! You\'re the best 💯','Have a wonderful day ahead 🌅',
        'May all your waiting be worthwhile ⏳','Sending you a lucky star ⭐',
        'May your smile always shine bright 😁','Stay forever young at heart 🥹',
        'Blessings to every kind soul 🤗','May life give you sweetness 🍯',
        'Things will only get better 🌱','May the world be gentle to you 💕',
        'May wealth always find its way to you 💰','Warmth in winter, cool in spring 🌼',
        'May everywhere you go be home 🌍','May your life be like poetry 🎨',
        'Stay healthy and energetic 💪','You will keep getting better 🌿',
        'Another day full of energy ☀️','May good luck follow you like the wind 🍃',
        'Success in career, sweetness in love 🏆','Sending you a beam of sunshine 🌻',
        'More smiles, fewer worries 😊','May you have poetry, dreams and horizons 🌌',
        'May your days be prosperous 🔥','Little joys await you every day 🎀',
        'Peace, joy and everything wonderful 🌺','May every day sparkle 💫',
        'You worked hard today, sending hugs 🤗','Happiness to you and your loved ones 👨‍👩‍👧‍👦',
        'May your efforts be recognized 👀','Sending all the luck and beauty 🎊',
        'May you be carefree and free 🦋','May everything go perfectly 🎯',
        'Wake up happy every morning 🌤️','You deserve all beautiful things 💎',
        'Did you smile today? Here\'s one 😃','May all beauty arrive on time 🌹',
        'Meet the right people, do the right things 💗','May your years be peaceful 🏡',
        'Go go go! 🔥','Good luck starts here 🚪',
        'New day, full of energy ⚡','Chase your dreams bravely 🎯',
        'Sending you a four-leaf clover 🍀','May happy times always surround you 🎶',
        'Live up to your potential 📖','Step by step to the top 🏮',
        'The stars and seas are your destination 🌊','You are your own sunshine ☀️',
        'Always stay hopeful 🌈','Every tomorrow is better than today 📅',
    ];

    function seededRand(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    var GROWTH_START = new Date('2026-02-01T00:00:00Z').getTime();
    var GROWTH_BASE = 1288;

    function getNaturalGrowth() {
        var elapsed = Date.now() - GROWTH_START;
        if (elapsed < 0) return 0;
        return Math.floor(elapsed / 60000);
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
        all.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); });
        all = all.slice(0, 50);

        if (all.length === 0) {
            wall.innerHTML = '<p class="bless-empty">' + I18n.t('gb.empty') + '</p>';
            return;
        }

        wall.innerHTML = all.map(function (b) {
            var sysClass = b.is_system ? ' system-card' : '';
            return '<div class="bless-card' + sysClass + '">' +
                '<div class="bless-author">🍀 ' + esc(b.nickname || '匿名') + '</div>' +
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

            var resp = await sb.from('comments')
                .select('*')
                .eq('page', 'blessings')
                .order('created_at', { ascending: false })
                .limit(50);

            var data = (resp.data || []);
            realCount = data.length;

            var countResp = await sb.from('comments')
                .select('id', { count: 'exact', head: true })
                .eq('page', 'blessings');
            if (countResp.count != null) realCount = countResp.count;

            renderBlessings(data);
            updateCounter();
        } catch (e) {
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
                nickname: esc(name),
                content: esc(text),
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
