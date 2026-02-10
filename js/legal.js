// ========== 法律页面 i18n ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    // ===== 共享 =====
    I18n.add('zh', { 'legal.back': '← 返回首页' });
    I18n.add('en', { 'legal.back': '← Back to Home' });

    // ===== 隐私政策 =====
    I18n.add('zh', {
        'privacy.h1': '🔒 隐私政策',
        'privacy.friendly': '<strong>简单说：</strong>我们非常重视你的隐私。MyLuck 是一个纯静态网站，所有测试都在你的浏览器里运行，我们不会偷偷收集你的任何个人信息。下面是详细说明，但如果你时间有限，知道"我们不收集你的数据"就够了 😊',
        'privacy.h2_1': '我们收集什么？',
        'privacy.p1': '简短回答：<strong>几乎什么都不收集</strong>。',
        'privacy.li1': '我们不需要你注册或登录',
        'privacy.li2': '我们不收集你的姓名、邮箱、电话等个人信息',
        'privacy.li3': '所有测试（运气测试、MBTI、色彩测试等）完全在你的浏览器本地运行',
        'privacy.li3b': '如果你选择「上榜」，你输入的昵称和测试分数会被提交到我们的排行榜服务器（Supabase），以便所有用户都能看到',
        'privacy.li3c': '留言板发布的内容也会储存在 Supabase 服务器上，公开可见',
        'privacy.li4': '你的语言偏好保存在浏览器的 localStorage 中，只存在你自己的设备上',
        'privacy.h2_2': '第三方服务',
        'privacy.p2': '为了让网站正常运行和持续改进，我们使用了一些第三方服务，它们可能有自己的隐私政策：',
        'privacy.li5': '<strong>GitHub Pages</strong> — 我们的网站托管在这里。GitHub 可能会记录访问者的 IP 地址用于安全目的。<a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank">GitHub 隐私声明</a>',
        'privacy.li6': '<strong>匿名统计</strong> — 我们使用隐私友好的分析工具来了解哪些页面更受欢迎，以便持续改进体验。这些工具不会收集你的个人身份信息，不使用 Cookie 进行跟踪。',
        'privacy.li7': '<strong>广告服务</strong> — 如果我们接入了广告，广告提供商可能使用 Cookie 来展示相关广告。你可以通过浏览器设置管理 Cookie。',
        'privacy.li8': '<strong>Supabase</strong> — 我们使用 Supabase 存储排行榜数据和留言板内容。仅储存你主动提交的昵称、分数和留言内容，不关联任何个人身份信息。<a href="https://supabase.com/privacy" target="_blank">Supabase 隐私政策</a>',
        'privacy.li9': '<strong>Cloudflare Turnstile</strong> — 为防止机器人滥用，排行榜和留言板提交时使用 Cloudflare 人机验证。Cloudflare 可能在验证过程中处理有限的设备信息。<a href="https://www.cloudflare.com/privacypolicy/" target="_blank">Cloudflare 隐私政策</a>',
        'privacy.h2_3': 'Cookie',
        'privacy.p3': 'MyLuck 本身不使用 Cookie。但第三方服务（如广告）可能会使用。你的浏览器设置可以帮你管理这些。',
        'privacy.h2_4': '适合所有年龄',
        'privacy.p4': '我们的内容面向所有年龄段的用户，不包含任何不适合未成年人的内容。我们也不会主动向未成年人收集任何信息。',
        'privacy.h2_5': '有疑问？',
        'privacy.p5': '如果你对隐私有任何疑问或担忧，欢迎通过留言板联系我们，我们会尽快回复。',
        'privacy.update': '最后更新：2026年2月',
    });
    I18n.add('en', {
        'privacy.h1': '🔒 Privacy Policy',
        'privacy.friendly': '<strong>In short:</strong> MyLuck is a static website. All tests run locally in your browser. We don\'t collect personal data. That\'s it! 😊',
        'privacy.h2_1': 'What Do We Collect?',
        'privacy.p1': 'Short answer: <strong>Almost nothing</strong>.',
        'privacy.li1': 'No registration or login required',
        'privacy.li2': 'We don\'t collect names, emails, or personal info',
        'privacy.li3': 'All tests run entirely in your browser',
        'privacy.li3b': 'If you choose to join a leaderboard, your nickname and score are submitted to our database (Supabase) and visible to all',
        'privacy.li3c': 'Wish Wall messages are also stored on Supabase and publicly visible',
        'privacy.li4': 'Language preference is stored in localStorage on your device only',
        'privacy.h2_2': 'Third-Party Services',
        'privacy.p2': 'We use some third-party services to keep things running:',
        'privacy.li5': '<strong>Hosting</strong> — Our hosting provider may log IP addresses for security.',
        'privacy.li6': '<strong>Analytics</strong> — We use privacy-friendly, cookie-free analytics to understand page popularity.',
        'privacy.li7': '<strong>Ads</strong> — If present, ad providers may use cookies. Manage via browser settings.',
        'privacy.li8': '<strong>Supabase</strong> — We use Supabase to store leaderboard data and Wish Wall messages. Only the nickname, score, and message you voluntarily submit are stored — no personal identity info. <a href="https://supabase.com/privacy" target="_blank">Supabase Privacy</a>',
        'privacy.li9': '<strong>Cloudflare Turnstile</strong> — To prevent abuse, leaderboard and Wish Wall submissions use Cloudflare bot detection. Cloudflare may process limited device info during verification. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank">Cloudflare Privacy</a>',
        'privacy.h2_3': 'Cookies',
        'privacy.p3': 'MyLuck doesn\'t use cookies. Third-party services might. Your browser can manage those.',
        'privacy.h2_4': 'All Ages Welcome',
        'privacy.p4': 'Our content is suitable for all ages. We don\'t collect information from minors.',
        'privacy.h2_5': 'Questions?',
        'privacy.p5': 'Reach out via our Wish Wall if you have any concerns.',
        'privacy.update': 'Last updated: February 2026',
    });

    // ===== 使用条款 =====
    I18n.add('zh', {
        'terms.h1': '📜 使用条款',
        'terms.friendly': '<strong>通俗版：</strong>MyLuck 是一个纯粹的娱乐网站。我们提供有趣的小测试，你可以免费使用并分享给朋友。我们只有两个小请求：请友善对待其他用户，也请不要把测试结果太当真哦~',
        'terms.h2_1': '这是什么网站？',
        'terms.p1': 'MyLuck (myluck.top) 是一个趣味互动娱乐网站，提供每日运气测试、MBTI 性格测试、色彩性格测试等趣味内容。所有测试结果都是由计算机算法随机生成的，<strong>仅供娱乐参考</strong>。',
        'terms.h2_2': '关于测试结果',
        'terms.li1': '所有结果由算法随机生成，不具有科学依据或预测功能',
        'terms.li2': '请勿将结果作为任何重要决策的依据',
        'terms.li3': '我们不提供任何形式的占卜、算命或风水服务',
        'terms.li4': '如果你觉得测试好玩，请分享给朋友一起乐呵！如果不喜欢，也完全没关系 ✌️',
        'terms.h2_3': '社区守则',
        'terms.p2': '如果你使用留言板功能，请：',
        'terms.li5': '保持友善和尊重 — 每个人都值得被善待',
        'terms.li6': '不发布广告、垃圾信息或不友善内容',
        'terms.li7': '不发布任何违反法律法规的内容',
        'terms.li8': '不利用网站进行任何形式的欺诈',
        'terms.h2_4': '知识产权',
        'terms.p3': '网站的设计和原创内容归 MyLuck 所有。引用的名人名言归原作者。你可以分享测试结果到社交媒体，我们很高兴你喜欢！',
        'terms.h2_5': '广告',
        'terms.p4': '网站可能包含第三方广告。我们不对广告内容的真实性负责，请在点击广告时自行判断。',
        'terms.h2_6': '适用法律',
        'terms.p5': '本使用条款适用中华人民共和国法律法规。',
        'terms.update': '最后更新：2026年2月',
    });
    I18n.add('en', {
        'terms.h1': '📜 Terms of Use',
        'terms.friendly': '<strong>Simply put:</strong> MyLuck is for entertainment. Free to use, free to share. Just be kind and don\'t take results too seriously~',
        'terms.h2_1': 'About This Site',
        'terms.p1': 'MyLuck is a fun entertainment site with daily luck tests, MBTI quizzes, and more. All results are randomly generated — <strong>for fun only</strong>.',
        'terms.h2_2': 'Test Results',
        'terms.li1': 'Results are random and not scientifically based',
        'terms.li2': 'Don\'t use results for important decisions',
        'terms.li3': 'We don\'t offer fortune-telling or divination services',
        'terms.li4': 'Enjoy and share with friends! ✌️',
        'terms.h2_3': 'Community Rules',
        'terms.p2': 'When using comments or discussion features:',
        'terms.li5': 'Be kind and respectful',
        'terms.li6': 'No spam or unfriendly content',
        'terms.li7': 'No illegal content',
        'terms.li8': 'No fraud',
        'terms.h2_4': 'Intellectual Property',
        'terms.p3': 'Site design belongs to MyLuck. Quotes belong to their authors. Feel free to share results on social media!',
        'terms.h2_5': 'Advertising',
        'terms.p4': 'The site may contain third-party ads. Please use your own judgment.',
        'terms.h2_6': 'Applicable Law',
        'terms.p5': 'These terms are governed by the laws of your jurisdiction.',
        'terms.update': 'Last updated: February 2026',
    });

    // ===== 免责声明 =====
    I18n.add('zh', {
        'disc.h1': '🎪 免责声明',
        'disc.friendly': '<strong>一句话版本：</strong>MyLuck 是一个纯娱乐网站。所有的"好运测试""性格测试"都是电脑随机算出来的，就像抽签一样好玩，但请别把它们太当真哦！',
        'disc.h2_1': '🎯 我们是做什么的',
        'disc.p1': '我们做有趣的互动小测试！包括每日运气测试、MBTI 性格测试、幸运色彩测试、在线求签（100 支传统签诗）、今日人设等。这些测试的目的很单纯——让你开心一下，给无聊的日子加点调料🌶️',
        'disc.h2_2': '⚡ 划重点',
        'disc.li1': '所有测试结果都是<strong>计算机算法随机生成</strong>的，不涉及任何占卜、算命或封建迷信',
        'disc.li2': '测试结果<strong>不具有任何科学依据、预测功能或指导意义</strong>',
        'disc.li3': '请用<strong>娱乐的心态</strong>对待所有结果——开心就好！',
        'disc.li4': '不要基于测试结果做任何重要决定（比如投资、择偶、选专业等）',
        'disc.li4b': '排行榜和分享功能仅供社交娱乐，提交的昵称和分数为公开信息',
        'disc.h2_3': '🤝 我们的承诺',
        'disc.li5': '我们严格遵守中华人民共和国相关法律法规',
        'disc.li6': '我们不会收集你的个人信息',
        'disc.li7': '我们不含任何违规、有害或不良内容',
        'disc.li8': '如果你发现任何问题，请通过留言板告诉我们，我们会尽快处理',
        'disc.h2_4': '📋 法律合规',
        'disc.p2': '本站严格遵守以下法律法规：',
        'disc.li9': '《中华人民共和国网络安全法》',
        'disc.li10': '《互联网信息服务管理办法》',
        'disc.li11': '《中华人民共和国广告法》',
        'disc.li12': '《中华人民共和国个人信息保护法》',
        'disc.h2_5': '💡 最后',
        'disc.p3': '生活已经够严肃了，测试就图个乐呵。希望 MyLuck 能给你的每一天带来一点小小的快乐和好心情 🍀',
        'disc.update': '最后更新：2026年2月',
    });
    I18n.add('en', {
        'disc.h1': '🎪 Disclaimer',
        'disc.friendly': '<strong>TL;DR:</strong> MyLuck = fun quizzes, randomly generated, not real predictions. Enjoy! 🍀',
        'disc.h2_1': '🎯 What We Do',
        'disc.p1': 'Fun interactive quizzes — daily luck, MBTI, color personality, Fortune Sticks (100 traditional poems), Daily Persona, and more. Just for laughs! 🌶️',
        'disc.h2_2': '⚡ Key Points',
        'disc.li1': 'All results are <strong>randomly generated by algorithms</strong>',
        'disc.li2': 'Results have <strong>no scientific or predictive value</strong>',
        'disc.li3': 'Treat everything as <strong>entertainment</strong>',
        'disc.li4': 'Don\'t make real-life decisions based on results',
        'disc.li4b': 'Leaderboards and sharing are for social fun — submitted nicknames and scores are public',
        'disc.h2_3': '🤝 Our Promise',
        'disc.li5': 'We comply with applicable laws',
        'disc.li6': 'We don\'t collect personal data',
        'disc.li7': 'No harmful or inappropriate content',
        'disc.li8': 'Found an issue? Let us know via the Wish Wall',
        'disc.h2_4': '📋 Legal',
        'disc.p2': 'We comply with applicable data protection and consumer protection laws in your region.',
        'disc.li9': 'Data protection regulations (GDPR, CCPA, PIPL, etc.)',
        'disc.li10': 'Internet content regulations',
        'disc.li11': 'Advertising standards',
        'disc.li12': 'Privacy and security laws',
        'disc.h2_5': '💡 Finally',
        'disc.p3': 'Life is serious enough. Have fun with MyLuck! 🍀',
        'disc.update': 'Last updated: February 2026',
    });

    // 应用翻译
    I18n.apply();

    // ===== 国际法律适配通知 =====
    function addInternationalNotice() {
        const lang = I18n.lang;
        if (lang !== 'en') return;

        const legalCard = document.querySelector('.legal-card');
        if (!legalCard || legalCard.querySelector('.intl-notice')) return;

        const notice = document.createElement('div');
        notice.className = 'friendly-note intl-notice';
        notice.style.marginTop = '20px';
        notice.style.borderLeftColor = '#74b9ff';
        notice.innerHTML = '<strong>🌍 International Users:</strong> We respect privacy laws worldwide (GDPR, CCPA, etc.). Questions? Reach out via our Wish Wall.';
        legalCard.appendChild(notice);
    }

    setTimeout(addInternationalNotice, 100);
    document.addEventListener('langchange', () => {
        const existing = document.querySelector('.intl-notice');
        if (existing) existing.remove();
        setTimeout(addInternationalNotice, 50);
    });
})();
