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
        'nav.guestbook': '祝福墙',
        'lang.switch': 'EN',
        'footer.desc': '趣味互动娱乐平台 · 仅供娱乐参考',
        'footer.tests': '趣味测试',
        'footer.legal': '法律信息',
        'footer.privacy': '隐私政策',
        'footer.terms': '使用条款',
        'footer.disclaimer': '免责声明',
        'footer.feedback': '💬 意见反馈',
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
        'card.draw_desc': '百支传统签诗，中英双语解签。虔诚摇签，获取今日运势指引',
        'card.draw_tag': '100支签诗 · 中英解签 · 排行榜',
        'card.rp_title': '今日人设',
        'card.rp_desc': '点击随机生成你的搞笑人设！30种超有梗人设等你解锁',
        'card.rp_tag': '30种人设 · 全球排行榜',
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
        'draw.rank': '🏆 上榜',
        'draw.leaderboard': '🏆 今日求签排行',
        'draw.ranked': '✅ 已上榜！',
        'draw.rank_fail': '上榜失败，请稍后重试',
        // 每日运气排行榜
        'fortune.leaderboard': '🏆 今日全球运气排行榜',
        'fortune.rank': '🏆 上榜',
        'fortune.ranked': '✅ 已上榜！',
        'fortune.rank_fail': '上榜失败，请稍后重试',
        // 人设测试页
        'rp.title': '🧧 今日人设测试',
        'rp.desc': '点击按钮，随机生成你的搞笑人设！也可输入名字 🎭',
        'rp.placeholder': '输入名字（可选）',
        'rp.submit': '随机人设',
        'rp.score_label': '人设匹配度',
        'rp.stat_lucky': '🍀 运气',
        'rp.stat_charm': '💕 魅力',
        'rp.stat_energy': '⚡ 精力',
        'rp.stat_brain': '🧠 智力',
        'rp.share': '📤 分享人设',
        'rp.retry': '🔄 再来一次',
        'rp.rank': '🏆 上榜',
        'rp.leaderboard': '🏆 全球人设排行榜',
        'rp.board_loading': '加载中...',
        'rp.board_empty': '还没有人上榜，来当第一个！',
        'rp.ranked': '✅ 已上榜！',
        'rp.rank_fail': '上榜失败，请稍后重试',
        'rp.history': '📊 今日测试记录',
        // MBTI 排行榜
        'mbti.leaderboard': '🧠 最近谁测了 MBTI',
        'mbti.rank_btn': '🧠 记录结果',
        'mbti.ranked': '✅ 已上榜！',
        'mbti.rank_fail': '上榜失败，请稍后重试',
        // 人生重开排行榜
        'lr.leaderboard': '🔄 人生重开排行榜',
        'lr.rank_btn': '🏆 上榜',
        'lr.ranked': '✅ 已上榜！',
        'lr.rank_fail': '上榜失败，请稍后重试',
        // 通用
        'common.anonymous': '匿名',
        'common.verify_first': '请先完成人机验证',
        'common.too_fast': '操作太频繁，请稍后再试',
        'lb.empty': '还没有人上榜，来当第一个！',
        'lb.fail': '排行榜加载失败',
        'disclaimer.full': '仅供娱乐参考 · 算法随机生成 · 请勿当真',
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
        'nav.guestbook': 'Blessings',
        'lang.switch': '中文',
        'footer.desc': 'Fun & Interactive Entertainment · For Amusement Only',
        'footer.tests': 'Fun Tests',
        'footer.legal': 'Legal',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.disclaimer': 'Disclaimer',
        'footer.feedback': '💬 Feedback',
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
        'card.draw_desc': '100 traditional fortune poems with bilingual interpretation. Shake & get daily guidance',
        'card.draw_tag': '100 Poems · CN/EN Interpret · Leaderboard',
        'card.rp_title': 'Daily Persona',
        'card.rp_desc': 'Get a random funny persona! 30 hilarious types await you',
        'card.rp_tag': '30 Persona Types · Global Leaderboard',
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
        'draw.rank': '🏆 Rank Me!',
        'draw.leaderboard': '🏆 Today\'s Fortune Ranking',
        'draw.ranked': '✅ Ranked!',
        'draw.rank_fail': 'Failed to rank, try again later',
        // Fortune leaderboard
        'fortune.leaderboard': '🏆 Today\'s Global Luck Ranking',
        'fortune.rank': '🏆 Rank Me!',
        'fortune.ranked': '✅ Ranked!',
        'fortune.rank_fail': 'Failed to rank, try again later',
        // Persona test page
        'rp.title': '🧧 Daily Persona Test',
        'rp.desc': 'Click to get a random funny persona! Or enter a name 🎭',
        'rp.placeholder': 'Enter name (optional)',
        'rp.submit': 'Random Persona',
        'rp.score_label': 'Persona Match',
        'rp.stat_lucky': '🍀 Luck',
        'rp.stat_charm': '💕 Charm',
        'rp.stat_energy': '⚡ Energy',
        'rp.stat_brain': '🧠 Brain',
        'rp.share': '📤 Share Persona',
        'rp.retry': '🔄 Try Again',
        'rp.rank': '🏆 Rank Me!',
        'rp.leaderboard': '🏆 Global Persona Leaderboard',
        'rp.board_loading': 'Loading...',
        'rp.board_empty': 'No entries yet. Be the first!',
        'rp.ranked': '✅ Ranked!',
        'rp.rank_fail': 'Failed to rank, try again later',
        'rp.history': '📊 Today\'s Records',
        // MBTI leaderboard
        'mbti.leaderboard': '🧠 Recent MBTI Results',
        'mbti.rank_btn': '🧠 Save Result',
        'mbti.ranked': '✅ Ranked!',
        'mbti.rank_fail': 'Failed to rank, try again later',
        // Life Restart leaderboard
        'lr.leaderboard': '🔄 Life Restart Leaderboard',
        'lr.rank_btn': '🏆 Rank Me!',
        'lr.ranked': '✅ Ranked!',
        'lr.rank_fail': 'Failed to rank, try again later',
        // Common
        'common.anonymous': 'Anonymous',
        'common.verify_first': 'Please complete verification first',
        'common.too_fast': 'Too many requests, please try again later',
        'lb.empty': 'No entries yet. Be the first!',
        'lb.fail': 'Failed to load leaderboard',
        'disclaimer.full': 'For Fun Only · Randomly Generated · Don\'t Take It Seriously',
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
                                    (attr.name === 'href' && /^\s*(javascript|data|vbscript):/i.test(attr.value))) {
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
    // 支持多组件渲染（祝福墙、反馈弹窗等同页面使用）
    const TURNSTILE_SITE_KEY = '0x4AAAAAACZ5cJF8duhs4a2v';
    const Turnstile = {
        loaded: false,
        tokens: {},   // containerId → token
        widgets: {},  // containerId → widgetId
        _lastContainer: null,

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
                if (!container || !window.turnstile) throw new Error('unavailable');
                this._lastContainer = containerId;
                this.widgets[containerId] = window.turnstile.render(container, {
                    sitekey: TURNSTILE_SITE_KEY,
                    theme: 'light',
                    callback: (token) => { this.tokens[containerId] = token; },
                    'expired-callback': () => { this.tokens[containerId] = null; },
                    'error-callback': () => {
                        this.tokens[containerId] = null;
                        // 错误时降级：显示提示并放行
                        const c = document.getElementById(containerId);
                        if (c) c.innerHTML = '<p style="font-size:.8rem;color:#999;text-align:center;">' + (I18n.lang === 'zh' ? '验证服务暂不可用' : 'Verification unavailable') + '</p>';
                        this.tokens[containerId] = 'fallback';
                    }
                });
            } catch (e) {
                // Turnstile 加载失败，降级放行
                const container = document.getElementById(containerId);
                if (container) container.innerHTML = '<p style="font-size:.8rem;color:#999;text-align:center;">' + (I18n.lang === 'zh' ? '验证服务暂不可用' : 'Verification unavailable') + '</p>';
                this.tokens[containerId] = 'fallback';
            }
        },

        // 获取当前 token
        getToken(containerId) {
            if (containerId) return this.tokens[containerId] || null;
            return this.tokens[this._lastContainer] || null;
        },

        // 重置小部件
        reset(containerId) {
            const cid = containerId || this._lastContainer;
            if (cid) this.tokens[cid] = null;
            if (window.turnstile && this.widgets[cid] !== undefined) {
                window.turnstile.reset(this.widgets[cid]);
            }
        },

        // 验证是否已通过（未启用时直接放行）
        isVerified(containerId) {
            if (!this.isEnabled()) return true;
            if (containerId) return !!this.tokens[containerId];
            // 检查是否有任意已验证的 token
            return Object.values(this.tokens).some(t => !!t);
        },

        // 移除组件（弹窗关闭时清理）
        remove(containerId) {
            if (window.turnstile && this.widgets[containerId] !== undefined) {
                try { window.turnstile.remove(this.widgets[containerId]); } catch (e) { }
            }
            delete this.tokens[containerId];
            delete this.widgets[containerId];
        }
    };

    // ========== 共享 Supabase 客户端（避免重复创建） ==========
    const SUPABASE_URL = 'https://qerajxnmtwyjtokhaonq.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlcmFqeG5tdHd5anRva2hhb25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MTA1MjksImV4cCI6MjA4NjE4NjUyOX0.sUMZ_RIu9zLjMOB3nnruJezlQL0i-GrunDIkahWcF5E';
    let _sharedSupabase = null;
    async function getSupabase() {
        if (_sharedSupabase) return _sharedSupabase;
        try {
            var mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
            _sharedSupabase = mod.createClient(SUPABASE_URL, SUPABASE_KEY);
            return _sharedSupabase;
        } catch (e) {
            console.warn('[supabase] Load failed:', e);
            return null;
        }
    }

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
        const isActive = (page) => {
            if (page === 'index.html') return (currentPage === 'index.html' || currentPage === '' || currentPage === '/') ? 'active' : '';
            return currentPage === page ? 'active' : '';
        };

        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="container nav-content">
                <a href="/" class="logo" data-i18n="nav.home">🍀 首页</a>
                <div class="nav-links">
                    <a href="/" class="nav-link ${isActive('index.html')}" data-i18n="nav.fortune">每日运气</a>
                    <a href="fortune-draw.html" class="nav-link ${isActive('fortune-draw.html')}" data-i18n="nav.draw">🎋 求签</a>
                    <a href="rp-test.html" class="nav-link ${isActive('rp-test.html')}" data-i18n="nav.rp">🧧 人设</a>
                    <a href="mbti.html" class="nav-link ${isActive('mbti.html')}" data-i18n="nav.mbti">MBTI测试</a>
                    <a href="liferestart.html" class="nav-link ${isActive('liferestart.html')}" data-i18n="nav.liferestart">人生重开</a>
                    <a href="color.html" class="nav-link ${isActive('color.html')}" data-i18n="nav.color">幸运色彩</a>
                    <a href="personality.html" class="nav-link ${isActive('personality.html')}" data-i18n="nav.personality">趣味性格</a>
                    <a href="guestbook.html" class="nav-link ${isActive('guestbook.html')}" data-i18n="nav.guestbook">祝福墙</a>
                    <button class="lang-btn" id="lang-toggle" data-i18n="lang.switch">EN</button>
                </div>
                <button class="menu-toggle" aria-label="Menu">☰</button>
            </div>`;
        document.body.prepend(nav);

        // 移动端菜单
        const menuToggle = nav.querySelector('.menu-toggle');
        const navLinks = nav.querySelector('.nav-links');
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.textContent = isOpen ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        // 点击外部关闭移动端菜单
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // 语言切换
        nav.querySelector('#lang-toggle').addEventListener('click', () => {
            I18n.setLang(I18n.lang === 'zh' ? 'en' : 'zh');
        });

        // 导航栏滚动效果（RAF 节流）
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    nav.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
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
                        <a href="/" data-i18n="nav.fortune">每日运气</a>
                        <a href="fortune-draw.html" data-i18n="nav.draw">🎋 求签</a>
                        <a href="rp-test.html" data-i18n="nav.rp">🧧 人设</a>
                        <a href="mbti.html" data-i18n="nav.mbti">MBTI测试</a>
                        <a href="liferestart.html" data-i18n="nav.liferestart">人生重开</a>
                        <a href="color.html" data-i18n="nav.color">幸运色彩</a>
                        <a href="personality.html" data-i18n="nav.personality">趣味性格</a>
                        <a href="guestbook.html" data-i18n="nav.guestbook">祝福墙</a>
                    </div>
                    <div class="footer-links">
                        <h4 data-i18n="footer.legal">法律信息</h4>
                        <a href="privacy.html" data-i18n="footer.privacy">隐私政策</a>
                        <a href="terms.html" data-i18n="footer.terms">使用条款</a>
                        <a href="disclaimer.html" data-i18n="footer.disclaimer">免责声明</a>
                    </div>
                </div>
                <div class="footer-feedback" style="text-align:center;padding:12px 0;border-top:1px solid rgba(255,255,255,0.1);">
                    <a href="#" id="footer-feedback-btn" style="color:#fdcb6e;font-size:0.85rem;text-decoration:none;" data-i18n="footer.feedback">💬 意见反馈</a>
                </div>
                <div class="footer-bottom">
                    <p data-i18n="footer.copy">© 2026 MyLuck.top · 所有测试结果均由算法随机生成，仅供娱乐</p>
                </div>
            </div>`;
        document.body.appendChild(footer);

        // 反馈弹窗
        var fbBtn = document.getElementById('footer-feedback-btn');
        if (fbBtn) {
            fbBtn.addEventListener('click', function (e) {
                e.preventDefault();
                showFeedbackDialog();
            });
        }
    }

    // ========== 反馈弹窗 ==========
    function showFeedbackDialog() {
        if (document.getElementById('feedback-overlay')) return;
        var isEn = I18n.lang === 'en';
        var overlay = document.createElement('div');
        overlay.id = 'feedback-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
        overlay.innerHTML = '<div style="background:#fff;border-radius:16px;padding:24px;max-width:400px;width:90%;max-height:80vh;overflow-y:auto;position:relative;">' +
            '<button id="feedback-close" style="position:absolute;top:10px;right:14px;background:none;border:none;font-size:1.3rem;cursor:pointer;color:#aaa;">✕</button>' +
            '<h3 style="margin:0 0 12px;color:#e17055;">' + (isEn ? '💬 Feedback' : '💬 意见反馈') + '</h3>' +
            '<p style="font-size:0.85rem;color:#888;margin-bottom:12px;">' + (isEn ? 'Your feedback helps us improve!' : '你的反馈是我们进步的动力！') + '</p>' +
            '<input type="text" id="feedback-name" placeholder="' + (isEn ? 'Your name (optional)' : '你的名字（选填）') + '" maxlength="20" style="width:100%;padding:8px 12px;border:1px solid #e0d5c3;border-radius:10px;margin-bottom:8px;font-size:0.9rem;box-sizing:border-box;">' +
            '<textarea id="feedback-text" placeholder="' + (isEn ? 'Tell us what you think...' : '告诉我们你的想法...') + '" maxlength="500" rows="4" style="width:100%;padding:8px 12px;border:1px solid #e0d5c3;border-radius:10px;margin-bottom:12px;font-size:0.9rem;resize:vertical;font-family:inherit;box-sizing:border-box;"></textarea>' +
            '<div id="turnstile-feedback" style="display:flex;justify-content:center;margin-bottom:12px;"></div>' +
            '<button id="feedback-submit" style="width:100%;padding:10px;border:none;border-radius:25px;background:#e17055;color:#fff;font-size:0.95rem;font-weight:600;cursor:pointer;">' + (isEn ? 'Submit Feedback' : '提交反馈') + '</button>' +
            '</div>';
        document.body.appendChild(overlay);

        // 渲染 Turnstile 人机验证
        if (Turnstile.isEnabled()) {
            Turnstile.render('turnstile-feedback');
        }

        function closeFeedback() {
            Turnstile.remove('turnstile-feedback');
            overlay.remove();
        }

        document.getElementById('feedback-close').addEventListener('click', closeFeedback);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) closeFeedback(); });
        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') { closeFeedback(); document.removeEventListener('keydown', handler); }
        });

        document.getElementById('feedback-submit').addEventListener('click', async function () {
            var text = (document.getElementById('feedback-text').value || '').trim();
            var name = (document.getElementById('feedback-name').value || '').trim() || I18n.t('common.anonymous');
            if (text.length < 2) { showToast(isEn ? 'Write a bit more' : '至少写几个字吧', 'info'); return; }
            if (Security.containsBadWords(text)) { showToast(isEn ? 'Please keep it friendly' : '请文明发言', 'error'); return; }
            if (!Security.rateLimit('feedback', 2)) { showToast(isEn ? 'Too frequent, try later' : '太频繁了，请稍后再试', 'info'); return; }

            // Turnstile 验证
            if (Turnstile.isEnabled() && !Turnstile.isVerified('turnstile-feedback')) {
                showToast(I18n.t('common.verify_first'), 'info');
                return;
            }

            var btn = document.getElementById('feedback-submit');
            btn.disabled = true; btn.textContent = '...';

            try {
                var sb = await getSupabase();
                if (!sb) throw new Error('Supabase unavailable');
                await sb.from('comments').insert({
                    nickname: name,
                    content: text,
                    page: 'feedback'
                });
                Turnstile.reset('turnstile-feedback');
                showToast(isEn ? '🎉 Thank you for your feedback!' : '🎉 感谢你的反馈！', 'success');
                closeFeedback();
            } catch (e) {
                showToast(isEn ? 'Failed to submit, try later' : '提交失败，请稍后重试', 'error');
                btn.disabled = false; btn.textContent = isEn ? 'Submit Feedback' : '提交反馈';
            }
        });
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

    // 全局 Toast 通知（替代 alert）
    function showToast(msg, type, duration) {
        type = type || 'info';
        duration = duration || 3000;
        var toast = document.createElement('div');
        toast.className = 'achievement-toast';
        var colors = { error: '#e74c3c', success: '#00b894', info: '#fdcb6e' };
        toast.style.borderLeftColor = colors[type] || colors.info;
        var icons = { error: '❌', success: '✅', info: 'ℹ️' };
        toast.innerHTML = '<span class="ach-icon">' + (icons[type] || icons.info) + '</span><div class="ach-text">' + msg + '</div>';
        document.body.appendChild(toast);
        setTimeout(function () { toast.classList.add('fade-out'); }, duration);
        setTimeout(function () { toast.remove(); }, duration + 500);
    }

    // 安全 localStorage 操作
    function safeSetItem(key, val) {
        try { localStorage.setItem(key, val); } catch (e) { /* 静默处理配额溢出 */ }
    }

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
    function injectVisitorCount(container, opts) {
        opts = opts || {};
        var testId = opts.id || 'fortune';
        var labelZh = opts.labelZh || '测过运气';
        var labelEn = opts.labelEn || 'tested their luck';
        var baseKey = 'myluck-visitor-base-' + testId;
        var epochKey = 'myluck-visitor-epoch-' + testId;

        let base = parseInt(localStorage.getItem(baseKey));
        if (!base) {
            base = Math.floor(seededRandom(testId.length * 7 + 99) * 5000 + 12000);
            localStorage.setItem(baseKey, base);
        }
        // 统一：每10分钟增长约5.5人（O(1)计算，避免随时间增长的O(n)循环）
        var GROWTH_START = new Date('2026-02-01T00:00:00Z').getTime();
        var elapsed = Date.now() - GROWTH_START;
        var growth = 0;
        if (elapsed > 0) {
            var intervals = Math.floor(elapsed / 600000);
            // 用 seededRandom 生成确定性波动
            var avgPerInterval = 5.5;
            growth = Math.floor(intervals * avgPerInterval + seededRandom(intervals * 7 + testId.charCodeAt(0)) * intervals * 0.1);
        }
        const total = base + growth;
        const lang = I18n.lang;
        const el = document.createElement('div');
        el.className = 'visitor-count';
        el.innerHTML = lang === 'zh'
            ? `👥 已有 <span class="count-num">${total.toLocaleString()}</span> 位小伙伴${labelZh}`
            : `👥 <span class="count-num">${total.toLocaleString()}</span> people ${labelEn}`;
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

        // 页面淡入动画
        document.body.style.animation = 'fadeIn 0.35s ease-out';

        // 网络状态监测
        window.addEventListener('offline', function () {
            showToast(I18n.lang === 'zh' ? '📡 网络已断开，部分功能可能受限' : '📡 Offline — some features may be limited', 'error', 5000);
        });
        window.addEventListener('online', function () {
            showToast(I18n.lang === 'zh' ? '✅ 网络已恢复' : '✅ Back online', 'success');
        });

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
                'guestbook.html': '祝福墙',
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
                'guestbook.html': 'Blessings',
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

        // 动态设置页面标题
        const pageTitlesAll = {
            'index.html': { zh: 'MyLuck - 每日好运测试', en: 'MyLuck - Daily Luck Test' },
            'mbti.html': { zh: 'MBTI 性格测试 - MyLuck', en: 'MBTI Personality Test - MyLuck' },
            'color.html': { zh: '幸运色彩测试 - MyLuck', en: 'Lucky Color Test - MyLuck' },
            'personality.html': { zh: '趣味性格测试 - MyLuck', en: 'Fun Personality Test - MyLuck' },
            'guestbook.html': { zh: '祝福墙 - MyLuck', en: 'Blessings Wall - MyLuck' },
            'liferestart.html': { zh: '人生重开模拟器 - MyLuck', en: 'Life Restart Simulator - MyLuck' },
            'fortune-draw.html': { zh: '在线求签 - MyLuck', en: 'Fortune Sticks - MyLuck' },
            'rp-test.html': { zh: '今日人设测试 - MyLuck', en: 'Daily Persona Test - MyLuck' },
            'privacy.html': { zh: '隐私政策 - MyLuck', en: 'Privacy Policy - MyLuck' },
            'terms.html': { zh: '使用条款 - MyLuck', en: 'Terms of Use - MyLuck' },
            'disclaimer.html': { zh: '免责声明 - MyLuck', en: 'Disclaimer - MyLuck' }
        };
        if (pageTitlesAll[page]) {
            document.title = isZh ? pageTitlesAll[page].zh : pageTitlesAll[page].en;
        }

        // 语言切换时更新标题
        document.addEventListener('langchange', function() {
            const curLang = I18n.lang;
            if (pageTitlesAll[page]) {
                document.title = curLang === 'zh' ? pageTitlesAll[page].zh : pageTitlesAll[page].en;
            }
        });

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
    window.MyLuck = { I18n, Security, Turnstile, getSupabase, seededRandom, getTodaySeed, getStars, animateCounter, createAdSlot, Streak, injectVisitorCount, showToast, safeSetItem };
})();
