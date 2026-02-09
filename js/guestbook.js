// ========== 留言板 ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    I18n.add('zh', {
        'gb.title': '💬 留言讨论区',
        'gb.desc': '分享你的测试感受，和大家聊聊趣味话题',
        'gb.info': '留言区由 GitHub Discussions 提供支持，需要 GitHub 账号登录后即可留言。\n请文明发言，禁止广告和不友善内容。',
    });
    I18n.add('en', {
        'gb.title': '💬 Guestbook',
        'gb.desc': 'Share your thoughts and join the discussion',
        'gb.info': 'Comments powered by GitHub Discussions. Log in with GitHub to leave a message.\nPlease be respectful. No spam or offensive content.',
    });
    I18n.apply();

    // 根据语言切换 Giscus 主题和语言
    function updateGiscusLang() {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        const lang = I18n.lang === 'zh' ? 'zh-CN' : 'en';
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { lang } } },
            'https://giscus.app'
        );
    }

    document.addEventListener('langchange', updateGiscusLang);
})();
