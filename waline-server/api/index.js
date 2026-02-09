const Application = require('@waline/vercel');

module.exports = Application({
  // 数据库通过环境变量自动配置
  // LeanCloud: LEAN_ID, LEAN_KEY, LEAN_MASTER_KEY
  // PostgreSQL: PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD
  // MySQL: MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD
});
