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

# ===== 1. IndexNow (覆盖 Bing + Yandex + Seznam + Naver + DuckDuckGo) =====
Write-Host "[1/2] 通过 IndexNow 提交到多个搜索引擎..." -ForegroundColor Yellow

$indexNowBody = @{
    host = "myluck.top"
    key = $indexNowKey
    keyLocation = "$domain/$indexNowKey.txt"
    urlList = $urls
} | ConvertTo-Json

$engines = @("api.indexnow.org", "www.bing.com", "yandex.com")
$successCount = 0
foreach ($engine in $engines) {
    try {
        $r = Invoke-WebRequest -Uri "https://$engine/indexnow" -Method POST `
            -ContentType "application/json; charset=utf-8" `
            -Body $indexNowBody -UseBasicParsing -TimeoutSec 10
        if ($r.StatusCode -eq 200 -or $r.StatusCode -eq 202) {
            Write-Host "  OK $engine 已接收 ($($urls.Count) 个URL)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  -- $engine 返回: $($r.StatusCode)" -ForegroundColor DarkYellow
        }
    } catch {
        Write-Host "  XX $engine 失败: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# IndexNow 覆盖的搜索引擎说明
if ($successCount -gt 0) {
    Write-Host ""
    Write-Host "  IndexNow 已覆盖以下搜索引擎:" -ForegroundColor Gray
    Write-Host "    Bing, Yandex, DuckDuckGo, Seznam, Naver" -ForegroundColor White
}

# ===== 2. 百度 =====
Write-Host ""
Write-Host "[2/2] 百度收录..." -ForegroundColor Yellow
Write-Host "  -- 百度需要在搜索资源平台手动提交:" -ForegroundColor DarkYellow
Write-Host "     https://ziyuan.baidu.com/site/index" -ForegroundColor White
Write-Host "  -- 网站已内置百度自动推送JS，每次有人访问会自动提交" -ForegroundColor Gray

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   提交完成！" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "说明:" -ForegroundColor Gray
Write-Host " - IndexNow 是目前最有效的搜索引擎提交方式" -ForegroundColor Gray
Write-Host " - 收录通常需要 1-7 天" -ForegroundColor Gray
Write-Host " - 网站已内置自动提交，每位访客都会触发IndexNow" -ForegroundColor Gray
Write-Host " - Google 需要通过 Search Console 手动提交sitemap" -ForegroundColor Gray
Write-Host ""
Write-Host "手动提交入口:" -ForegroundColor Gray
Write-Host "  Google  -> https://search.google.com/search-console" -ForegroundColor White
Write-Host "  Bing    -> https://www.bing.com/webmasters" -ForegroundColor White
Write-Host "  Baidu   -> https://ziyuan.baidu.com" -ForegroundColor White
Write-Host ""
Read-Host "按回车键退出"
