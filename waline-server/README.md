# MyLuck Waline 评论系统部署指南

## 🚀 一键部署步骤（约5分钟）

### 第一步：注册 LeanCloud（免费数据库）

1. 打开 https://console.leancloud.app （国际版，无需备案）
2. 注册账号并登录
3. 点击「创建应用」，名称填 `MyLuck-Comments`，选「开发版」（免费）
4. 进入应用 → 左侧「设置」→「应用凭证」
5. 记下这三个值：
   - `AppID`
   - `AppKey`
   - `MasterKey`

### 第二步：部署到 Vercel

1. 打开 https://vercel.com ，用 GitHub 账号登录
2. 点击「Add New...」→「Project」
3. 选择你的 `myluck` 仓库（DSword91/myluck）
4. **重要**：在 `Root Directory` 里填 `waline-server`
5. 展开「Environment Variables」，添加以下三个变量：

   | Name | Value |
   |------|-------|
   | `LEAN_ID` | 你的 AppID |
   | `LEAN_KEY` | 你的 AppKey |
   | `LEAN_MASTER_KEY` | 你的 MasterKey |

6. 点击「Deploy」等待部署完成

### 第三步：绑定自定义域名（可选）

1. 部署完成后，进入 Vercel 项目 → Settings → Domains
2. 添加 `waline.myluck.top`
3. 到你的域名 DNS 设置里添加 CNAME 记录：
   - `waline` → `cname.vercel-dns.com`

### 完成！

评论系统会自动连接到你的网站。如果不绑定自定义域名，
需要把 `js/guestbook.js` 里的 `WALINE_SERVER` 改成 Vercel 给你的域名
（类似 `https://myluck-xxxxx.vercel.app`）。

---

## ❓ 常见问题

**Q: 出现 500 错误？**
A: 检查 Vercel 的 Environment Variables 是否正确填写了 LEAN_ID、LEAN_KEY、LEAN_MASTER_KEY

**Q: LeanCloud 选国际版还是国内版？**
A: 选国际版（leancloud.app），无需备案。国内版（leancloud.cn）需要域名备案。

**Q: 有免费限制吗？**
A: LeanCloud 开发版每天 3 万次 API 调用，个人网站完全够用。Vercel 免费版 100GB 带宽/月。
