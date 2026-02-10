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
        'disclaimer.tag': '仅供娱乐 · 算法随机生成'
    };

    const sharedEn = {
        'nav.home': '🍀 Home',
        'nav.fortune': 'Daily Luck',
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
        'disclaimer.tag': 'For Fun Only · Randomly Generated'
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
            // 禁用右键菜单 (可选)
            // document.addEventListener('contextmenu', e => e.preventDefault());

            // Anti-bot: 检查基本浏览器特征
            if (navigator.webdriver) {
                document.body.innerHTML = '<p style="text-align:center;padding:50px;">Access denied</p>';
            }
        }
    };

    // ========== CSP + 安全 Meta Tag 注入 ==========
    function injectCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.clarity.ms https://scripts.clarity.ms https://gc.zgo.at https://zz.bdstatic.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://v1.hitokoto.cn https://www.clarity.ms https://*.clarity.ms https://*.goatcounter.com https://*.supabase.co https:; frame-src 'self';";
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
                    <a href="mbti.html" class="nav-link ${isActive('mbti.html')}" data-i18n="nav.mbti">MBTI测试</a>
                    <a href="color.html" class="nav-link ${isActive('color.html')}" data-i18n="nav.color">幸运色彩</a>
                    <a href="personality.html" class="nav-link ${isActive('personality.html')}" data-i18n="nav.personality">趣味性格</a>                    <a href="liferestart.html" class="nav-link ${isActive('liferestart.html')}" data-i18n="nav.liferestart">人生重开</a>                    <a href="guestbook.html" class="nav-link ${isActive('guestbook.html')}" data-i18n="nav.guestbook">留言板</a>
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
                        <a href="mbti.html" data-i18n="nav.mbti">MBTI测试</a>
                        <a href="color.html" data-i18n="nav.color">幸运色彩</a>
                        <a href="personality.html" data-i18n="nav.personality">趣味性格</a>
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
        // JSON-LD 结构化数据
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MyLuck",
            "url": "https://myluck.top",
            "description": I18n.lang === 'zh' ? "MyLuck 趣味互动娱乐平台 - 每日运气测试、MBTI性格测试、幸运色彩测试" : "MyLuck Fun Interactive Entertainment - Daily Luck Test, MBTI Personality Test, Lucky Color Test",
            "inLanguage": ["zh-CN", "en"],
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://myluck.top"
            }
        });
        document.head.appendChild(ld);

        // Canonical URL
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        const page = location.pathname.split('/').pop() || 'index.html';
        canonical.href = 'https://myluck.top/' + (page === 'index.html' ? '' : page);
        document.head.appendChild(canonical);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========== 全局导出 ==========
    window.MyLuck = { I18n, Security, seededRandom, getTodaySeed, getStars, animateCounter, createAdSlot, Streak, injectVisitorCount };
})();
