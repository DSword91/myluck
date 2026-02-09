// ========== MyLuck 社交分享模块 ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    function isChina() {
        const lang = navigator.language || '';
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        return lang.startsWith('zh') || tz.includes('Shanghai') || tz.includes('Chongqing') || tz.includes('Asia/Hong_Kong');
    }

    function createSharePanel(text, url) {
        url = url || location.href;
        const encoded = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);
        const china = isChina();

        // 生成 QR 码 URL
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;

        const platforms = china ? [
            { key: 'wechat', icon: '💬', action: 'qr' },
            { key: 'qq', icon: '🐧', url: `https://connect.qq.com/widget/shareqq/index.html?url=${encoded}&title=${encodedText}` },
            { key: 'weibo', icon: '📢', url: `https://service.weibo.com/share/share.php?url=${encoded}&title=${encodedText}` },
            { key: 'copy', icon: '📋', action: 'copy' },
        ] : [
            { key: 'twitter', icon: '𝕏', url: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedText}` },
            { key: 'facebook', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
            { key: 'whatsapp', icon: '📱', url: `https://api.whatsapp.com/send?text=${encodedText}%20${encoded}` },
            { key: 'telegram', icon: '✈️', url: `https://t.me/share/url?url=${encoded}&text=${encodedText}` },
            { key: 'copy', icon: '📋', action: 'copy' },
        ];

        // 创建弹窗
        const overlay = document.createElement('div');
        overlay.className = 'share-overlay';
        overlay.innerHTML = `
            <div class="share-panel">
                <div class="share-header">
                    <h3 data-i18n="share.title">${I18n.t('share.title', '分享结果')}</h3>
                    <button class="share-close">✕</button>
                </div>
                <div class="share-buttons">
                    ${platforms.map(p => `
                        <button class="share-platform-btn" data-platform="${p.key}" ${p.url ? `data-url="${p.url}"` : ''} ${p.action ? `data-action="${p.action}"` : ''}>
                            <span class="share-icon">${p.icon}</span>
                            <span>${I18n.t('share.' + p.key, p.key)}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="share-qr" style="display:none;">
                    <p>${I18n.lang === 'zh' ? '微信扫码分享' : 'Scan to share on WeChat'}</p>
                    <img src="${qrUrl}" alt="QR Code" width="200" height="200">
                </div>
            </div>`;

        // 事件绑定
        overlay.querySelector('.share-close').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

        overlay.querySelectorAll('.share-platform-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                const urlAttr = btn.dataset.url;
                const action = btn.dataset.action;

                if (action === 'qr') {
                    const qrDiv = overlay.querySelector('.share-qr');
                    qrDiv.style.display = qrDiv.style.display === 'none' ? 'block' : 'none';
                } else if (action === 'copy') {
                    navigator.clipboard?.writeText(text + '\n' + url).then(() => {
                        btn.querySelector('span:last-child').textContent = I18n.t('share.copied', '已复制！');
                        setTimeout(() => {
                            btn.querySelector('span:last-child').textContent = I18n.t('share.copy', '复制链接');
                        }, 2000);
                    });
                } else if (urlAttr) {
                    window.open(urlAttr, '_blank', 'width=600,height=500');
                }
            });
        });

        document.body.appendChild(overlay);

        // 尝试 Web Share API (移动端)
        if (navigator.share) {
            navigator.share({ title: 'MyLuck', text: text, url: url }).catch(() => { });
        }
    }

    window.MyLuck.Share = { show: createSharePanel, isChina };
})();
