// ========== MyLuck 统一社交分享模块 V2 ==========
(function () {
    'use strict';

    function isChina() {
        var lang = navigator.language || '';
        var tz = '';
        try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { }
        return lang.startsWith('zh') || tz.includes('Shanghai') || tz.includes('Chongqing') || tz.includes('Asia/Hong_Kong');
    }

    function getI18n() {
        return (window.MyLuck && window.MyLuck.I18n) ? window.MyLuck.I18n : null;
    }
    function t(key, fallback) {
        var i = getI18n();
        return i ? i.t(key, fallback) : fallback;
    }
    function isEn() {
        var i = getI18n();
        return i && i.lang === 'en';
    }

    // 注入分享面板CSS（只注入一次）
    var cssInjected = false;
    function injectCSS() {
        if (cssInjected) return;
        cssInjected = true;
        var style = document.createElement('style');
        style.textContent = [
            '.share-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;animation:shareIn .25s}',
            '@keyframes shareIn{from{opacity:0}to{opacity:1}}',
            '.share-panel{background:#fff;border-radius:16px;padding:24px;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);animation:panelUp .3s ease-out}',
            '@keyframes panelUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}',
            '.share-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}',
            '.share-header h3{margin:0;font-size:1.1rem;color:#333}',
            '.share-close{background:none;border:none;font-size:1.3rem;cursor:pointer;color:#999;padding:4px 8px;border-radius:50%;transition:all .2s}',
            '.share-close:hover{background:#f0f0f0;color:#333}',
            '.share-preview{background:#f8f6f0;border-radius:10px;padding:12px;margin-bottom:16px;font-size:.85rem;color:#666;max-height:120px;overflow-y:auto;word-break:break-all;line-height:1.5;border:1px solid #eee}',
            '.share-buttons{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:10px;margin-bottom:12px}',
            '.share-platform-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 6px;border:1px solid #eee;border-radius:12px;background:#fafafa;cursor:pointer;transition:all .2s;font-size:.75rem;color:#555}',
            '.share-platform-btn:hover{border-color:#e17055;background:#fff5f0;transform:translateY(-2px);box-shadow:0 4px 12px rgba(225,112,85,0.15)}',
            '.share-platform-btn:active{transform:translateY(0)}',
            '.share-icon{font-size:1.6rem}',
            '.share-qr{text-align:center;margin-top:12px;padding-top:12px;border-top:1px solid #eee}',
            '.share-qr p{margin:0 0 8px;font-size:.85rem;color:#888}',
            '.share-qr img{border-radius:8px;border:1px solid #eee}',
            '.share-native-tip{text-align:center;font-size:.8rem;color:#aaa;margin-top:8px}'
        ].join('\n');
        document.head.appendChild(style);
    }

    // 动态加载 html2canvas
    var _html2canvasLoaded = false;
    function loadHtml2Canvas(cb) {
        if (_html2canvasLoaded || window.html2canvas) { _html2canvasLoaded = true; cb(); return; }
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = function() { _html2canvasLoaded = true; cb(); };
        script.onerror = function() {
            var st = window.MyLuck && window.MyLuck.showToast;
            if (st) st(isEn() ? 'Failed to load image library' : '图片库加载失败', 'error');
        };
        document.head.appendChild(script);
    }

    // 截图并下载（带二维码和推广语）
    function captureAndSave(element) {
        if (!element) {
            var st2 = window.MyLuck && window.MyLuck.showToast;
            if (st2) st2(isEn() ? 'No result to capture' : '没有可截图的结果', 'info');
            return;
        }
        var st = window.MyLuck && window.MyLuck.showToast;
        var en = isEn();
        loadHtml2Canvas(function() {
            if (!window.html2canvas) return;
            if (st) st(en ? 'Generating image...' : '正在生成图片...', 'info', 3000);

            // 直接截图原始元素（保留所有样式）
            window.html2canvas(element, {
                backgroundColor: '#fffbf5',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false
            }).then(function(resultCanvas) {
                // 加载QR码图片
                var pageUrl = location.href.split('?')[0].split('#')[0];
                var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&format=png&data=' + encodeURIComponent(pageUrl);
                var qrImg = new Image();
                qrImg.crossOrigin = 'anonymous';
                qrImg.onload = function() {
                    compositeAndDownload(resultCanvas, qrImg, en);
                };
                qrImg.onerror = function() {
                    // QR加载失败，不加QR码直接合成
                    compositeAndDownload(resultCanvas, null, en);
                };
                qrImg.src = qrUrl;
            }).catch(function(err) {
                console.error('[share] html2canvas error:', err);
                if (st) st(en ? 'Image generation failed' : '图片生成失败，请重试', 'error');
            });
        });
    }

    // 合成最终图片：结果截图 + 底部品牌栏（QR + 推广语）
    function compositeAndDownload(resultCanvas, qrImg, en) {
        var scale = 2;
        var padding = 30 * scale;
        var footerH = 100 * scale;
        var gap = 16 * scale;
        var dashedY = resultCanvas.height + padding * 2 + 10 * scale;

        var finalW = resultCanvas.width + padding * 2;
        var finalH = resultCanvas.height + padding * 2 + gap + footerH + padding;

        var canvas = document.createElement('canvas');
        canvas.width = finalW;
        canvas.height = finalH;
        var ctx = canvas.getContext('2d');

        // 背景
        ctx.fillStyle = '#fffbf5';
        ctx.fillRect(0, 0, finalW, finalH);

        // 画结果截图
        ctx.drawImage(resultCanvas, padding, padding);

        // 虚线分隔
        ctx.setLineDash([8 * scale, 6 * scale]);
        ctx.strokeStyle = '#e0d5c3';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(padding, dashedY);
        ctx.lineTo(finalW - padding, dashedY);
        ctx.stroke();
        ctx.setLineDash([]);

        var footerStartY = dashedY + 14 * scale;

        // QR码
        var qrSize = 80 * scale;
        if (qrImg) {
            ctx.drawImage(qrImg, padding, footerStartY, qrSize, qrSize);
        }

        // 推广文字
        var textX = padding + (qrImg ? qrSize + 16 * scale : 0);
        ctx.fillStyle = '#e17055';
        ctx.font = 'bold ' + (16 * scale) + 'px sans-serif';
        ctx.fillText('MyLuck · myluck.top', textX, footerStartY + 24 * scale);

        ctx.fillStyle = '#888888';
        ctx.font = (13 * scale) + 'px sans-serif';
        var line1 = en ? 'Discover your luck today!' : '测测你今天的运气吧！';
        var line2 = en ? 'Scan to try it yourself ✨' : '扫码来试试 ✨';
        ctx.fillText(line1, textX, footerStartY + 50 * scale);
        ctx.fillText(line2, textX, footerStartY + 72 * scale);

        // 强制下载
        canvas.toBlob(function(blob) {
            if (!blob) return;
            downloadBlob(blob);
        }, 'image/png');
    }

    function downloadBlob(blob) {
        var st = window.MyLuck && window.MyLuck.showToast;
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.download = 'myluck-result.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
        if (st) st(isEn() ? 'Image saved!' : '图片已保存！', 'success');
    }

    /**
     * 弹出分享面板
     * @param {string} text 分享文本
     * @param {string} [url] 分享链接（默认当前页）
     * @param {object} [opts] 可选配置 { title }
     */
    function showSharePanel(text, url, opts) {
        injectCSS();
        url = url || location.href;
        opts = opts || {};
        var shareTitle = opts.title || 'MyLuck';
        var captureEl = opts.captureElement || null;

        // 在移动端先尝试原生分享
        if (navigator.share && !captureEl) {
            navigator.share({ title: shareTitle, text: text, url: url }).then(function () {
                // 原生分享成功，不弹窗
            }).catch(function () {
                // 用户取消或不支持，弹出面板
                _showPanel(text, url, shareTitle, captureEl);
            });
            return;
        }
        _showPanel(text, url, shareTitle, captureEl);
    }

    function _showPanel(text, url, shareTitle, captureEl) {
        var encoded = encodeURIComponent(url);
        var encodedText = encodeURIComponent(text);
        var china = isChina();
        var en = isEn();

        var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encoded;

        var platforms = china ? [
            { key: 'wechat', icon: '💬', label: en ? 'WeChat' : '微信', action: 'qr' },
            { key: 'qq', icon: '🐧', label: 'QQ', url: 'https://connect.qq.com/widget/shareqq/index.html?url=' + encoded + '&title=' + encodedText },
            { key: 'weibo', icon: '📢', label: en ? 'Weibo' : '微博', url: 'https://service.weibo.com/share/share.php?url=' + encoded + '&title=' + encodedText },
            { key: 'douyin', icon: '🎵', label: en ? 'TikTok' : '抖音', action: 'copy' },
            { key: 'save_img', icon: '🖼️', label: en ? 'Save Image' : '保存图片', action: 'save_img' },
            { key: 'copy', icon: '📋', label: en ? 'Copy' : '复制', action: 'copy' }
        ] : [
            { key: 'twitter', icon: '𝕏', label: 'X/Twitter', url: 'https://twitter.com/intent/tweet?url=' + encoded + '&text=' + encodedText },
            { key: 'facebook', icon: '📘', label: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' + encoded },
            { key: 'whatsapp', icon: '📱', label: 'WhatsApp', url: 'https://api.whatsapp.com/send?text=' + encodedText + '%20' + encoded },
            { key: 'telegram', icon: '✈️', label: 'Telegram', url: 'https://t.me/share/url?url=' + encoded + '&text=' + encodedText },
            { key: 'save_img', icon: '🖼️', label: en ? 'Save Image' : '保存图片', action: 'save_img' },
            { key: 'copy', icon: '📋', label: en ? 'Copy' : '复制', action: 'copy' }
        ];

        var overlay = document.createElement('div');
        overlay.className = 'share-overlay';

        var buttonsHtml = platforms.map(function (p) {
            return '<button class="share-platform-btn" data-platform="' + p.key + '"' +
                (p.url ? ' data-url="' + p.url.replace(/"/g, '&quot;') + '"' : '') +
                (p.action ? ' data-action="' + p.action + '"' : '') +
                '><span class="share-icon">' + p.icon + '</span><span>' + p.label + '</span></button>';
        }).join('');

        var previewText = text.length > 150 ? text.substring(0, 150) + '...' : text;
        // XSS 防护：先转义 HTML 再替换换行
        var safePreview = (window.MyLuck && window.MyLuck.Security) ? window.MyLuck.Security.escapeHtml(previewText).replace(/\n/g, '<br>') : previewText.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

        overlay.innerHTML = '<div class="share-panel">' +
            '<div class="share-header">' +
            '<h3>' + (en ? '📤 Share Result' : '📤 分享结果') + '</h3>' +
            '<button class="share-close">✕</button>' +
            '</div>' +
            '<div class="share-preview">' + safePreview + '</div>' +
            '<div class="share-buttons">' + buttonsHtml + '</div>' +
            '<div class="share-qr" style="display:none;">' +
            '<p>' + (en ? 'Scan QR code to share via WeChat' : '微信扫码分享') + '</p>' +
            '<img src="' + qrUrl + '" alt="QR Code" width="200" height="200">' +
            '</div>' +
            '</div>';

        // 关闭
        overlay.querySelector('.share-close').addEventListener('click', function () { overlay.remove(); });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });

        // 各平台按钮
        var btns = overlay.querySelectorAll('.share-platform-btn');
        for (var i = 0; i < btns.length; i++) {
            (function (btn) {
                btn.addEventListener('click', function () {
                    var urlAttr = btn.getAttribute('data-url');
                    var action = btn.getAttribute('data-action');

                    if (action === 'qr') {
                        var qrDiv = overlay.querySelector('.share-qr');
                        qrDiv.style.display = qrDiv.style.display === 'none' ? 'block' : 'none';
                    } else if (action === 'save_img') {
                        overlay.remove();
                        captureAndSave(captureEl);
                    } else if (action === 'copy') {
                        var copyText = text + '\n' + url;
                        if (navigator.clipboard) {
                            navigator.clipboard.writeText(copyText).then(function () {
                                var labelSpan = btn.querySelector('span:last-child');
                                labelSpan.textContent = en ? 'Copied!' : '已复制！';
                                btn.style.borderColor = '#00b894';
                                btn.style.background = '#f0fff4';
                                setTimeout(function () {
                                    labelSpan.textContent = en ? 'Copy' : '复制';
                                    btn.style.borderColor = '';
                                    btn.style.background = '';
                                }, 2000);
                            });
                        } else {
                            prompt(en ? 'Copy:' : '复制：', copyText);
                        }
                    } else if (urlAttr) {
                        window.open(urlAttr, '_blank', 'width=600,height=500');
                    }
                });
            })(btns[i]);
        }

        document.body.appendChild(overlay);
    }

    // ESC关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var ov = document.querySelector('.share-overlay');
            if (ov) ov.remove();
        }
    });

    // 挂载
    if (!window.MyLuck) window.MyLuck = {};
    window.MyLuck.Share = { show: showSharePanel, isChina: isChina, saveAsImage: captureAndSave };
})();
