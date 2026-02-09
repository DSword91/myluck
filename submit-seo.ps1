# ============================================================
# MyLuck 一键搜索引擎提交脚本
# 运行方式：右键 → 用 PowerShell 运行，或在终端执行
# ============================================================

$domain = "https://myluck.top"
$sitemapUrl = "$domain/sitemap.xml"
$indexNowKey = "e17055fdcb6e00b8"

$urls = @(
    "$domain/",
    "$domain/mbti.html",
    "$domain/color.html",
    "$domain/personality.html",
    "$domain/guestbook.html",
    "$domain/privacy.html",
    "$domain/terms.html",
    "$domain/disclaimer.html"
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   MyLuck 搜索引擎批量提交工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ===== 1. Google Sitemap Ping =====
Write-Host "[1/5] 提交到 Google..." -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://www.google.com/ping?sitemap=$sitemapUrl" -UseBasicParsing -TimeoutSec 10
    if ($r.StatusCode -eq 200) {
        Write-Host "  ✓ Google Sitemap 已提交" -ForegroundColor Green
    } else {
        Write-Host "  △ Google 返回状态码: $($r.StatusCode)" -ForegroundColor DarkYellow
    }
} catch {
    Write-Host "  × Google 提交失败（可能需要翻墙）: $($_.Exception.Message)" -ForegroundColor Red
}

# ===== 2. Bing Sitemap Ping =====
Write-Host "[2/5] 提交到 Bing..." -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://www.bing.com/ping?sitemap=$sitemapUrl" -UseBasicParsing -TimeoutSec 10
    Write-Host "  ✓ Bing Sitemap 已提交" -ForegroundColor Green
} catch {
    Write-Host "  × Bing 提交失败: $($_.Exception.Message)" -ForegroundColor Red
}

# ===== 3. IndexNow (Bing + Yandex + Seznam + Naver) =====
Write-Host "[3/5] 通过 IndexNow 提交到 Bing/Yandex/Seznam/Naver..." -ForegroundColor Yellow

$indexNowBody = @{
    host = "myluck.top"
    key = $indexNowKey
    keyLocation = "$domain/$indexNowKey.txt"
    urlList = $urls
} | ConvertTo-Json

$engines = @("api.indexnow.org", "www.bing.com", "yandex.com")
foreach ($engine in $engines) {
    try {
        $r = Invoke-WebRequest -Uri "https://$engine/indexnow" -Method POST `
            -ContentType "application/json; charset=utf-8" `
            -Body $indexNowBody -UseBasicParsing -TimeoutSec 10
        if ($r.StatusCode -eq 200 -or $r.StatusCode -eq 202) {
            Write-Host "  ✓ $engine 已接收 ($($urls.Count) 个URL)" -ForegroundColor Green
        } else {
            Write-Host "  △ $engine 返回: $($r.StatusCode)" -ForegroundColor DarkYellow
        }
    } catch {
        Write-Host "  × $engine 失败: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# ===== 4. Baidu Sitemap Ping =====
Write-Host "[4/5] 提交到百度..." -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "https://ping.baidu.com/sitemap?site=myluck.top&sitemap=$sitemapUrl" -UseBasicParsing -TimeoutSec 10
    Write-Host "  ✓ 百度 Sitemap 已提交" -ForegroundColor Green
} catch {
    Write-Host "  △ 百度提交需要在搜索资源平台手动操作" -ForegroundColor DarkYellow
    Write-Host "    → https://ziyuan.baidu.com/site/index" -ForegroundColor Gray
}

# ===== 5. 其他搜索引擎 =====
Write-Host "[5/5] 提交到其他搜索引擎..." -ForegroundColor Yellow

# Sogou
try {
    Invoke-WebRequest -Uri "https://fey.sogou.com/api/ping?url=$domain" -UseBasicParsing -TimeoutSec 5 | Out-Null
    Write-Host "  ✓ 搜狗 已提交" -ForegroundColor Green
} catch {
    Write-Host "  △ 搜狗需要手动提交: https://zhanzhang.sogou.com" -ForegroundColor DarkYellow
}

# DuckDuckGo (uses Bing index, already covered by IndexNow)
Write-Host "  ✓ DuckDuckGo 已覆盖（使用 Bing 索引）" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   提交完成！" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "说明：" -ForegroundColor Gray
Write-Host "• 搜索引擎收录通常需要 1-7 天" -ForegroundColor Gray
Write-Host "• 网站每次有人访问时会自动通过 IndexNow 提交" -ForegroundColor Gray
Write-Host "• 建议每周运行一次此脚本加速收录" -ForegroundColor Gray
Write-Host "• 百度收录 GitHub Pages 较慢，建议使用 Cloudflare CDN" -ForegroundColor Gray
Write-Host ""
Write-Host "手动提交入口（需注册）：" -ForegroundColor Gray
Write-Host "  Google  → https://search.google.com/search-console" -ForegroundColor White
Write-Host "  Bing    → https://www.bing.com/webmasters" -ForegroundColor White
Write-Host "  百度    → https://ziyuan.baidu.com" -ForegroundColor White
Write-Host "  搜狗    → https://zhanzhang.sogou.com" -ForegroundColor White
Write-Host "  头条    → https://zhanzhang.toutiao.com" -ForegroundColor White
Write-Host ""
Read-Host "按回车键退出"
