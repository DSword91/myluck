// ========== MyLuck Common Framework ==========
(function () {
    'use strict';

    // ========== 刷新时回到顶部 ==========
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // ========== i18n 国际化系统 ==========
    const I18n = {
        lang: 'zh',
        translations: { zh: {}, en: {} },

        detect() {
            const saved = localStorage.getItem('myluck-lang');
            if (saved) return saved;
            const nav = navigator.language || navigator.userLanguage || 'zh';
            if (nav.startsWith('zh')) return 'zh';
            return 'en';
        },

        add(lang, obj) {
            Object.assign(this.translations[lang], obj);
        },

        t(key, fallback) {
            return this.translations[this.lang]?.[key] || this.translations['zh']?.[key] || fallback || null;
        },

        apply() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const val = this.t(key);
                if (val) {
                    if (el.tagName === 'INPUT' && el.type !== 'submit') {
                        el.placeholder = val;
                    } else {
                        el.textContent = val;
                    }
                }
            });
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                const val = this.t(key);
                if (val) el.innerHTML = Security.sanitize(val);
            });
            document.documentElement.lang = this.lang === 'zh' ? 'zh-CN' : 'en';
        },

        setLang(lang) {
            this.lang = lang;
            localStorage.setItem('myluck-lang', lang);
            this.apply();
            document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
        },

        init() {
            this.lang = this.detect();
            this.add('zh', sharedZh);
            this.add('en', sharedEn);
        }
    };

    // ★ 立即检测语言（在其他脚本执行前就设置好）
    I18n.lang = I18n.detect();

    // ========== 共享翻译 ==========
    const sharedZh = {
        'nav.home': '🍀 首页',
        'nav.fortune': '每日运气',
        'nav.draw': '🎋 求签',
        'nav.rp': '🧧 人设',
        'nav.mbti': 'MBTI测试',
        'nav.color': '幸运色彩',
        'nav.personality': '趣味性格',
        'nav.liferestart': '人生重开',
        'nav.guestbook': '许愿墙',
        'lang.switch': 'EN',
        'footer.desc': '趣味互动娱乐平台 · 仅供娱乐参考',
        'footer.tests': '趣味测试',
        'footer.legal': '法律信息',
        'footer.privacy': '隐私政策',
        'footer.terms': '使用条款',
        'footer.disclaimer': '免责声明',
        'footer.copy': '© 2026 MyLuck.top · 所有测试结果均由算法随机生成，仅供娱乐',
        'share.title': '分享结果',
        'share.copy': '复制链接',
        'share.copied': '已复制！',
        'share.wechat': '微信',
        'share.qq': 'QQ',
        'share.weibo': '微博',
        'share.twitter': 'X / Twitter',
        'share.facebook': 'Facebook',
        'share.whatsapp': 'WhatsApp',
        'share.telegram': 'Telegram',
        'disclaimer.tag': '仅供娱乐 · 算法随机生成',
        // 首页卡片
        'card.draw_title': '在线求签',
        'card.draw_desc': '虔诚摇签，获取今日运势指引。观音灵签风格，每日一签',
        'card.draw_tag': '一键摇签 · 秒出签文',
        'card.rp_title': '今日人设',
        'card.rp_desc': '输入名字，测测今天你是什么搞笑人设！每天不同',
        'card.rp_tag': '30种人设 · 秒出结果',
        'card.lr_title': '人生重开模拟器',
        'card.lr_desc': '分配属性，选择天赋，体验数千种随机人生事件',
        'card.lr_tag': '1000+事件 · 无限重开',
        // 求签页
        'draw.title': '🎋 在线求签',
        'draw.desc': '心诚则灵，点击签筒或按钮摇签，获取今日运势指引',
        'draw.label': '灵签',
        'draw.hint': '👆 点击签筒摇签',
        'draw.btn': '🙏 虔诚求签',
        'draw.share': '📤 分享签文',
        'draw.redraw': '🔄 再求一签',
        'draw.career': '💼 事业',
        'draw.love': '💕 感情',
        'draw.wealth': '💰 财运',
        'draw.health': '🏥 健康',
        // 人设测试页
        'rp.title': '🧧 今日人设测试',
        'rp.desc': '输入你的名字，测测今天你是什么搞笑人设！每天结果不同 🎭',
        'rp.placeholder': '输入你的名字或昵称',
        'rp.submit': '测一测',
        'rp.score_label': '人设匹配度',
        'rp.stat_lucky': '🍀 运气',
        'rp.stat_charm': '💕 魅力',
        'rp.stat_energy': '⚡ 精力',
        'rp.stat_brain': '🧠 智力',
        'rp.share': '📤 分享人设',
        'rp.retry': '🔄 换个名字',
        'rp.rank': '🏆 上榜',
        'rp.leaderboard': '🏆 全球人设排行榜',
        'rp.board_loading': '加载中...',
        'rp.board_empty': '还没有人上榜，来当第一个！',
        'rp.ranked': '✅ 已上榜！',
        'rp.rank_fail': '上榜失败，请稍后重试',
        'rp.history': '📊 今日测试记录'
    };

    const sharedEn = {
        'nav.home': '🍀 Home',
        'nav.fortune': 'Daily Luck',
        'nav.draw': '🎋 Fortune',
        'nav.rp': '🧧 Persona',
        'nav.mbti': 'MBTI Test',
        'nav.color': 'Lucky Color',
        'nav.personality': 'Personality',
        'nav.liferestart': 'Life Restart',
        'nav.guestbook': 'Wish Wall',
        'lang.switch': '中文',
        'footer.desc': 'Fun & Interactive Entertainment · For Amusement Only',
        'footer.tests': 'Fun Tests',
        'footer.legal': 'Legal',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.disclaimer': 'Disclaimer',
        'footer.copy': '© 2026 MyLuck.top · All results are randomly generated for entertainment only',
        'share.title': 'Share Result',
        'share.copy': 'Copy Link',
        'share.copied': 'Copied!',
        'share.wechat': 'WeChat',
        'share.qq': 'QQ',
        'share.weibo': 'Weibo',
        'share.twitter': 'X / Twitter',
        'share.facebook': 'Facebook',
        'share.whatsapp': 'WhatsApp',
        'share.telegram': 'Telegram',
        'disclaimer.tag': 'For Fun Only · Randomly Generated',
        // Homepage cards
        'card.draw_title': 'Fortune Sticks',
        'card.draw_desc': 'Shake virtual sticks & get daily fortune guidance, traditional temple style',
        'card.draw_tag': 'One-Click Draw · Instant Result',
        'card.rp_title': 'Daily Persona',
        'card.rp_desc': 'Enter your name and discover your funny persona of the day! Changes daily',
        'card.rp_tag': '30 Persona Types · Instant Result',
        'card.lr_title': 'Life Restart Simulator',
        'card.lr_desc': 'Allocate stats, pick talents, experience thousands of random life events',
        'card.lr_tag': '1000+ Events · Infinite Restart',
        // Fortune draw page
        'draw.title': '🎋 Fortune Sticks',
        'draw.desc': 'Focus your mind, tap the bamboo container or button to draw, get daily guidance',
        'draw.label': 'Fortune',
        'draw.hint': '👆 Tap the container to draw',
        'draw.btn': '🙏 Draw a Stick',
        'draw.share': '📤 Share Fortune',
        'draw.redraw': '🔄 Draw Again',
        'draw.career': '💼 Career',
        'draw.love': '💕 Love',
        'draw.wealth': '💰 Wealth',
        'draw.health': '🏥 Health',
        // Persona test page
        'rp.title': '🧧 Daily Persona Test',
        'rp.desc': 'Enter your name and discover your hilarious persona today! Results change daily 🎭',
        'rp.placeholder': 'Enter your name or nickname',
        'rp.submit': 'Test Me!',
        'rp.score_label': 'Persona Match',
        'rp.stat_lucky': '🍀 Luck',
        'rp.stat_charm': '💕 Charm',
        'rp.stat_energy': '⚡ Energy',
        'rp.stat_brain': '🧠 Brain',
        'rp.share': '📤 Share Persona',
        'rp.retry': '🔄 Try Another',
        'rp.rank': '🏆 Rank Me!',
        'rp.leaderboard': '🏆 Global Persona Leaderboard',
        'rp.board_loading': 'Loading...',
        'rp.board_empty': 'No entries yet. Be the first!',
        'rp.ranked': '✅ Ranked!',
        'rp.rank_fail': 'Failed to rank, try again later',
        'rp.history': '📊 Today\'s Records'
    };

    // ========== 安全模块 ==========
    const Security = {
        // XSS 防护 - 转义 HTML
        escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        // 安全的 innerHTML（只允许安全标签）
        sanitize(html) {
            const allowed = ['b', 'i', 'em', 'strong', 'span', 'br', 'p', 'a'];
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            const walk = (node) => {
                const children = Array.from(node.childNodes);
                children.forEach(child => {
                    if (child.nodeType === 1) {
                        const tag = child.tagName.toLowerCase();
                        if (!allowed.includes(tag)) {
                            child.replaceWith(document.createTextNode(child.textContent));
                        } else {
                            // 移除危险属性
                            Array.from(child.attributes).forEach(attr => {
                                if (attr.name.startsWith('on') || attr.name === 'style' ||
                                    (attr.name === 'href' && attr.value.startsWith('javascript:'))) {
                                    child.removeAttribute(attr.name);
                                }
                            });
                            walk(child);
                        }
                    }
                });
            };
            walk(tmp);
            return tmp.innerHTML;
        },

        // 速率限制
        _limits: {},
        rateLimit(key, maxPerMinute) {
            const now = Date.now();
            if (!this._limits[key]) this._limits[key] = [];
            this._limits[key] = this._limits[key].filter(t => now - t < 60000);
            if (this._limits[key].length >= maxPerMinute) return false;
            this._limits[key].push(now);
            return true;
        },

        // 简单的内容过滤
        containsBadWords(text) {
            const patterns = [
                /fuck|shit|damn|ass(?:hole)?/gi,
                /傻[逼比]|操你|艹|妈的|去死|混蛋|王八蛋|滚蛋|垃圾/g,
                /(?:http|https):\/\/\S+/g // URL spam
            ];
            return patterns.some(p => p.test(text));
        },

        // 防 DevTools 检测（轻量级）
        initProtection() {
            // Anti-bot: 检查基本浏览器特征
            if (navigator.webdriver) {
                document.body.innerHTML = '<p style="text-align:center;padding:50px;">Access denied</p>';
            }
        }
    };

    // ========== Cloudflare Turnstile 反垃圾模块 ==========
    // 使用方法：去 Cloudflare Dashboard → Turnstile → Add Site → 获取 site key
    // 然后把下方 TURNSTILE_SITE_KEY 替换为你的 site key
    const TURNSTILE_SITE_KEY = '0x4AAAAAACZ5cJF8duhs4a2v'; // 留空则禁用 Turnstile，填入 site key 启用
    const Turnstile = {
        loaded: false,
        token: null,
        widgetId: null,

        // 检查是否已配置
        isEnabled() { return !!TURNSTILE_SITE_KEY; },

        // 动态加载 Turnstile 脚本
        async load() {
            if (this.loaded || !this.isEnabled()) return;
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
                s.async = true;
                s.onload = () => { this.loaded = true; resolve(); };
                s.onerror = () => reject(new Error('Turnstile load failed'));
                document.head.appendChild(s);
            });
        },

        // 在指定容器内渲染 Turnstile 小部件
        async render(containerId) {
            if (!this.isEnabled()) return;
            try {
                await this.load();
                const container = document.getElementById(containerId);
                if (!container || !window.turnstile) return;
                this.widgetId = window.turnstile.render(container, {
                    sitekey: TURNSTILE_SITE_KEY,
                    theme: 'light',
                    callback: (token) => { this.token = token; },
                    'expired-callback': () => { this.token = null; },
                    'error-callback': () => { this.token = null; }
                });
            } catch (e) { /* Turnstile unavailable, fail silently */ }
        },

        // 获取当前 token（用于提交验证）
        getToken() { return this.token; },

        // 重置小部件（提交后重新验证）
        reset() {
            this.token = null;
            if (window.turnstile && this.widgetId !== null) {
                window.turnstile.reset(this.widgetId);
            }
        },

        // 验证是否已通过（未启用时直接放行）
        isVerified() {
            return !this.isEnabled() || !!this.token;
        }
    };

    // ========== CSP + 安全 Meta Tag 注入 ==========
    function injectCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.clarity.ms https://scripts.clarity.ms https://gc.zgo.at https://zz.bdstatic.com https://cdn.jsdelivr.net https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://v1.hitokoto.cn https://www.clarity.ms https://*.clarity.ms https://*.goatcounter.com https://*.supabase.co https://challenges.cloudflare.com https:; frame-src 'self' https://challenges.cloudflare.com;";
        document.head.prepend(meta);

        // 资源提示 - 加速第三方脚本连接
        const preconnects = ['https://www.clarity.ms', 'https://gc.zgo.at'];
        const dnsPrefetch = ['https://zz.bdstatic.com', 'https://v1.hitokoto.cn'];
        for (const url of preconnects) {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        }
        for (const url of dnsPrefetch) {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = url;
            document.head.appendChild(link);
        }

        // 防止 referrer 泄露（隐藏来源）
        const ref = document.createElement('meta');
        ref.name = 'referrer';
        ref.content = 'no-referrer';
        document.head.appendChild(ref);
    }

    // ========== 导航栏注入 ==========
    function injectNav() {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        const isActive = (page) => currentPage === page ? 'active' : '';

        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="container nav-content">
                <a href="index.html" class="logo" data-i18n="nav.home">🍀 首页</a>
                <div class="nav-links">
                    <a href="index.html" class="nav-link ${isActive('index.html')}" data-i18n="nav.fortune">每日运气</a>
                    <a href="fortune-draw.html" class="nav-link ${isActive('fortune-draw.html')}" data-i18n="nav.draw">🎋 求签</a>
                    <a href="rp-test.html" class="nav-link ${isActive('rp-test.html')}" data-i18n="nav.rp">🧧 人设</a>
                    <a href="mbti.html" class="nav-link ${isActive('mbti.html')}" data-i18n="nav.mbti">MBTI测试</a>
                    <a href="liferestart.html" class="nav-link ${isActive('liferestart.html')}" data-i18n="nav.liferestart">人生重开</a>                    <a href="guestbook.html" class="nav-link ${isActive('guestbook.html')}" data-i18n="nav.guestbook">留言板</a>
                    <button class="lang-btn" id="lang-toggle" data-i18n="lang.switch">EN</button>
                </div>
                <button class="menu-toggle" aria-label="Menu">☰</button>
            </div>`;
        document.body.prepend(nav);

        // 移动端菜单
        nav.querySelector('.menu-toggle').addEventListener('click', () => {
            nav.querySelector('.nav-links').classList.toggle('active');
        });
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => nav.querySelector('.nav-links').classList.remove('active'));
        });

        // 语言切换
        nav.querySelector('#lang-toggle').addEventListener('click', () => {
            I18n.setLang(I18n.lang === 'zh' ? 'en' : 'zh');
        });

        // 导航栏滚动效果
        window.addEventListener('scroll', () => {
            nav.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
        });
    }

    // ========== 页脚注入 ==========
    function injectFooter() {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <span class="footer-logo">🍀 MyLuck</span>
                        <p class="footer-desc" data-i18n="footer.desc">趣味互动娱乐平台 · 仅供娱乐参考</p>
                    </div>
                    <div class="footer-links">
                        <h4 data-i18n="footer.tests">趣味测试</h4>
                        <a href="index.html" data-i18n="nav.fortune">每日运气</a>
                        <a href="fortune-draw.html" data-i18n="nav.draw">🎋 求签</a>
                        <a href="rp-test.html" data-i18n="nav.rp">🧧 人设</a>
                        <a href="mbti.html" data-i18n="nav.mbti">MBTI测试</a>
                        <a href="liferestart.html" data-i18n="nav.liferestart">人生重开</a>
                    </div>
                    <div class="footer-links">
                        <h4 data-i18n="footer.legal">法律信息</h4>
                        <a href="privacy.html" data-i18n="footer.privacy">隐私政策</a>
                        <a href="terms.html" data-i18n="footer.terms">使用条款</a>
                        <a href="disclaimer.html" data-i18n="footer.disclaimer">免责声明</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p data-i18n="footer.copy">© 2026 MyLuck.top · 所有测试结果均由算法随机生成，仅供娱乐</p>
                </div>
            </div>`;
        document.body.appendChild(footer);
    }

    // ========== 广告位注入 ==========
    function createAdSlot(id) {
        const div = document.createElement('div');
        div.className = 'ad-slot';
        div.id = id;
        div.innerHTML = '<div class="container"><div class="ad-placeholder"><span class="ad-label">AD</span></div></div>';
        return div;
    }

    // ========== 工具函数 ==========
    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    function getTodaySeed() {
        const now = new Date();
        return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    }

    function getStars(count) {
        return '★'.repeat(Math.min(count, 5)) + '☆'.repeat(Math.max(5 - count, 0));
    }

    function animateCounter(el, target, duration) {
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased) + '%';
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    // ========== 滚动动画 (Intersection Observer) ==========
    function initScrollAnimations() {
        const els = document.querySelectorAll('.section, .card, .test-card, .quote-card, .legal-card');
        els.forEach((el, i) => {
            el.classList.add('anim-ready');
            if (i % 4 === 1) el.classList.add('anim-delay-1');
            if (i % 4 === 2) el.classList.add('anim-delay-2');
            if (i % 4 === 3) el.classList.add('anim-delay-3');
        });
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('anim-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
            document.querySelectorAll('.anim-ready').forEach(el => observer.observe(el));
        } else {
            document.querySelectorAll('.anim-ready').forEach(el => el.classList.add('anim-visible'));
        }
    }

    // ========== 免费分析工具（隐私友好）==========
    function injectAnalytics() {
        // Microsoft Clarity — 免费热力图 & 会话回放
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","vegznvelvk");

        // GoatCounter — 免费隐私友好页面统计
        const gc = document.createElement('script');
        gc.async = true;
        gc.dataset.goatcounter = 'https://myluck.goatcounter.com/count';
        gc.src = '//gc.zgo.at/count.js';
        document.head.appendChild(gc);

        // 百度自动推送 — 加速百度收录
        (function(){
            var bp = document.createElement('script');
            var curProtocol = window.location.protocol.split(':')[0];
            if (curProtocol === 'https') {
                bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            } else {
                bp.src = 'http://push.zhanzhang.baidu.com/push.js';
            }
            bp.async = true;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(bp, s);
        })();

        // IndexNow — 自动向搜索引擎提交页面（GET方式避免CORS）
        (function(){
            var INDEXNOW_KEY = 'e17055fdcb6e00b8';
            var cacheKey = 'myluck-indexnow-' + new Date().toISOString().slice(0,10);
            if (localStorage.getItem(cacheKey)) return; // 每天只提交一次
            localStorage.setItem(cacheKey, '1');
            var currentUrl = encodeURIComponent(location.href);
            // 使用GET请求（通过Image beacon避免CORS问题）
            ['api.indexnow.org', 'www.bing.com', 'yandex.com'].forEach(function(engine){
                var img = new Image();
                img.src = 'https://' + engine + '/indexnow?url=' + currentUrl + '&key=' + INDEXNOW_KEY;
            });
        })();
    }

    // ========== 连续签到系统 ==========
    const Streak = {
        KEY: 'myluck-streak',
        get() {
            try {
                return JSON.parse(localStorage.getItem(this.KEY)) || { days: 0, last: '', total: 0 };
            } catch { return { days: 0, last: '', total: 0 }; }
        },
        check() {
            const data = this.get();
            const today = new Date().toISOString().split('T')[0];
            if (data.last === today) return data; // 今天已签
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (data.last === yesterday) {
                data.days += 1;
            } else {
                data.days = 1;
            }
            data.last = today;
            data.total = (data.total || 0) + 1;
            localStorage.setItem(this.KEY, JSON.stringify(data));
            return data;
        },
        renderBar(container) {
            const data = this.check();
            const bar = document.createElement('div');
            bar.className = 'daily-streak-bar';
            const lang = I18n.lang;
            const dots = Array.from({ length: 7 }, (_, i) => {
                const isActive = i < data.days;
                const isToday = i === data.days - 1;
                return `<div class="streak-dot ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}"></div>`;
            }).join('');
            bar.innerHTML = `
                <div class="streak-info">
                    <span class="streak-fire">🔥</span>
                    <span class="streak-text">${lang === 'zh' ? `连续 ${data.days} 天` : `${data.days} day streak`}</span>
                </div>
                <div class="streak-days">${dots}</div>`;
            container.prepend(bar);
            // 成就检查
            this.checkAchievements(data);
        },
        checkAchievements(data) {
            const achieved = JSON.parse(localStorage.getItem('myluck-achievements') || '[]');
            const achList = [
                { id: 'first', days: 1, icon: '🌱', zh: '初来乍到', en: 'First Visit' },
                { id: 'streak3', days: 3, icon: '🔥', zh: '三日打卡', en: '3-Day Streak' },
                { id: 'streak7', days: 7, icon: '🌟', zh: '周冠达人', en: '7-Day Streak' },
                { id: 'total5', total: 5, icon: '🏅', zh: '忠实粉丝', en: 'Loyal Fan' },
                { id: 'total10', total: 10, icon: '👑', zh: '资深玩家', en: 'Veteran' },
            ];
            achList.forEach(a => {
                if (achieved.includes(a.id)) return;
                const qualify = (a.days && data.days >= a.days) || (a.total && data.total >= a.total);
                if (qualify) {
                    achieved.push(a.id);
                    localStorage.setItem('myluck-achievements', JSON.stringify(achieved));
                    this.showAchievement(a);
                }
            });
        },
        showAchievement(ach) {
            const lang = I18n.lang;
            const toast = document.createElement('div');
            toast.className = 'achievement-toast';
            toast.innerHTML = `
                <span class="ach-icon">${ach.icon}</span>
                <div class="ach-text">
                    <span class="ach-title">${lang === 'zh' ? '🎉 成就解锁！' : '🎉 Achievement!'}</span>
                    ${lang === 'zh' ? ach.zh : ach.en}
                </div>`;
            document.body.appendChild(toast);
            setTimeout(() => { toast.classList.add('fade-out'); }, 3000);
            setTimeout(() => { toast.remove(); }, 3500);
        }
    };

    // ========== 虚拟访客计数 ==========
    function injectVisitorCount(container) {
        const key = 'myluck-visitor-base';
        let base = parseInt(localStorage.getItem(key));
        if (!base) {
            base = Math.floor(Math.random() * 5000 + 12000);
            localStorage.setItem(key, base);
        }
        // 每天自然增长 50~150
        const daysSinceEpoch = Math.floor(Date.now() / 86400000);
        const stored = parseInt(localStorage.getItem('myluck-visitor-epoch') || '0');
        if (!stored) localStorage.setItem('myluck-visitor-epoch', daysSinceEpoch);
        const daysPassed = daysSinceEpoch - (stored || daysSinceEpoch);
        const growth = daysPassed * (Math.floor(seededRandom(daysSinceEpoch) * 100) + 50);
        const total = base + growth;
        const lang = I18n.lang;
        const el = document.createElement('div');
        el.className = 'visitor-count';
        el.innerHTML = lang === 'zh'
            ? `👥 已有 <span class="count-num">${total.toLocaleString()}</span> 位小伙伴测过运气`
            : `👥 <span class="count-num">${total.toLocaleString()}</span> people tested their luck`;
        container.appendChild(el);
    }

    // ========== 初始化 ==========
    function init() {
        injectCSP();
        I18n.init();
        injectNav();
        injectFooter();
        Security.initProtection();
        injectSEO();

        // 延迟加载分析脚本，减少渲染阻塞
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(injectAnalytics, { timeout: 3000 });
        } else {
            setTimeout(injectAnalytics, 1500);
        }

        // 延迟应用 i18n（等页面脚本加载翻译）
        requestAnimationFrame(() => {
            I18n.apply();
            // 滚动动画在 i18n 后启动
            setTimeout(initScrollAnimations, 50);
        });

        // 确保刷新回到顶部
        window.scrollTo(0, 0);
    }

    // ========== SEO 结构化数据 ==========
    function injectSEO() {
        const page = location.pathname.split('/').pop() || 'index.html';
        const pageUrl = 'https://myluck.top/' + (page === 'index.html' ? '' : page);
        const isZh = I18n.lang === 'zh';

        // JSON-LD WebSite 结构化数据
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MyLuck",
            "alternateName": "MyLuck 每日好运测试",
            "url": "https://myluck.top",
            "description": isZh
                ? "MyLuck 趣味互动娱乐平台 - 每日运气测试、MBTI性格测试、幸运色彩测试、人生重开模拟器"
                : "MyLuck Fun Interactive Entertainment - Daily Luck Test, MBTI Personality Test, Lucky Color Test, Life Restart Simulator",
            "inLanguage": ["zh-CN", "en"],
            "publisher": {
                "@type": "Organization",
                "name": "MyLuck",
                "url": "https://myluck.top"
            }
        });
        document.head.appendChild(ld);

        // JSON-LD BreadcrumbList（面包屑导航）
        if (page !== 'index.html') {
            const pageTitlesZh = {
                'mbti.html': 'MBTI 性格测试',
                'color.html': '幸运色彩测试',
                'personality.html': '趣味性格测试',
                'guestbook.html': '许愿墙',
                'liferestart.html': '人生重开模拟器',
                'fortune-draw.html': '在线求签',
                'rp-test.html': '今日人设测试',
                'privacy.html': '隐私政策',
                'terms.html': '使用条款',
                'disclaimer.html': '免责声明'
            };
            const pageTitlesEn = {
                'mbti.html': 'MBTI Personality Test',
                'color.html': 'Lucky Color Test',
                'personality.html': 'Fun Personality Test',
                'guestbook.html': 'Wish Wall',
                'liferestart.html': 'Life Restart Simulator',
                'fortune-draw.html': 'Fortune Sticks',
                'rp-test.html': 'Daily Persona Test',
                'privacy.html': 'Privacy Policy',
                'terms.html': 'Terms of Use',
                'disclaimer.html': 'Disclaimer'
            };
            const ptMap = isZh ? pageTitlesZh : pageTitlesEn;
            const bc = document.createElement('script');
            bc.type = 'application/ld+json';
            bc.textContent = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": isZh ? "首页" : "Home", "item": "https://myluck.top/" },
                    { "@type": "ListItem", "position": 2, "name": ptMap[page] || document.title, "item": pageUrl }
                ]
            });
            document.head.appendChild(bc);
        }

        // 如果 HTML 中已经有 canonical，不重复添加
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = pageUrl;
            document.head.appendChild(canonical);
        }

        // hreflang 标签（帮助搜索引擎识别多语言）
        const addHreflang = (lang, href) => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = href;
            document.head.appendChild(link);
        };
        addHreflang('zh-CN', pageUrl);
        addHreflang('en', pageUrl);
        addHreflang('x-default', pageUrl);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========== 全局导出 ==========
    window.MyLuck = { I18n, Security, Turnstile, seededRandom, getTodaySeed, getStars, animateCounter, createAdSlot, Streak, injectVisitorCount };
})();
