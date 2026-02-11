// ========== 在线求签 fortune-draw.js ==========
(function () {
    'use strict';

    // Toast 通知（复用 MyLuck.showToast 或自备）
    function showToast(msg, type) {
        if (window.MyLuck && window.MyLuck.showToast) { window.MyLuck.showToast(msg, type); return; }
        var t = document.createElement('div');
        t.className = 'achievement-toast';
        t.innerHTML = '<span class="ach-icon">' + (type === 'error' ? '❌' : 'ℹ️') + '</span><div class="ach-text">' + msg + '</div>';
        document.body.appendChild(t);
        setTimeout(function() { t.remove(); }, 3500);
    }

    // 签文等级英文映射
    const LEVEL_EN = { '上上签': 'Supreme Fortune', '上签': 'Great Fortune', '中上签': 'Good Fortune', '中签': 'Average Fortune', '中下签': 'Below Average', '下签': 'Poor Fortune', '下下签': 'Worst Fortune' };

    // 四维方面英文映射 (完整100签覆盖)
    const ASPECT_EN = {
        // ---- 事业 Career ----
        '大展宏图': 'Sky\'s the limit', '步步高升': 'Rapid promotion', '贵人提携': 'Helped by mentor', '逆境翻盘': 'Comeback time', '事业有成': 'Great success',
        '名利双收': 'Fame & fortune', '掌控全局': 'Full control', '四面开花': 'Blooming all around', '机会不断': 'Opportunities ahead', '合作顺利': 'Smooth teamwork',
        '考试通过': 'Exams passed', '稳中有升': 'Steady rise', '贵人相助': 'Noble helper', '团队和睦': 'Great team vibe', '努力有成': 'Hard work pays off',
        '峰回路转': 'Plot twist coming', '口碑极佳': 'Great reputation', '晋升在望': 'Promotion near', '实力取胜': 'Win by strength', '大显身手': 'Show your talent',
        '先难后易': 'Hard then easy', '才华展现': 'Talent revealed', '人脉广通': 'Wide connections', '跨越发展': 'Leap forward',
        '顺其自然': 'Go with the flow', '态度决定': 'Attitude is key', '等待时机': 'Wait for timing', '先苦后甜': 'Sweet after bitter', '淡定从容': 'Stay calm',
        '平稳发展': 'Steady growth', '机会将至': 'Chance coming', '脚踏实地': 'Stay grounded', '默默耕耘': 'Silent efforts', '拓展视野': 'Broaden horizons',
        '远方机会': 'Distant chance', '正能量满满': 'Full positivity', '勤奋有加': 'Extra diligent', '即将转机': 'Turning point soon',
        '维持现状': 'Status quo', '谨慎决策': 'Decide carefully', '换个思路': 'Try new approach', '立即行动': 'Act now', '静待时机': 'Wait patiently',
        '塞翁失马': 'Blessing in disguise', '团队合作': 'Team effort', '安守本分': 'Stay humble', '再进一步': 'One more step', '放眼长远': 'Think long term',
        '安于现状': 'Accept present', '暂时困扰': 'Temporary setback', '扬长避短': 'Play to strengths', '日久见功': 'Time proves worth',
        '寻求合作': 'Seek cooperation', '居安思危': 'Prepare for worst', '坚持正道': 'Stay righteous', '做好准备': 'Be prepared', '换位思考': 'Walk in their shoes',
        '珍惜机会': 'Cherish chances', '从容应对': 'Handle calmly', '考验之中': 'Being tested', '轮到你了': 'Your turn now', '随遇而安': 'Go with flow',
        '打好基础': 'Build foundation', '谦虚学习': 'Learn humbly', '退让有智': 'Wise to yield', '修炼内功': 'Inner training',
        '遇到阻碍': 'Obstacles ahead', '暂停计划': 'Pause plans', '寻求帮助': 'Ask for help', '有变动': 'Changes coming', '小心受骗': 'Beware of scams',
        '低谷期': 'Low period', '放慢脚步': 'Slow down', '跳出局限': 'Break free', '少说多做': 'Less talk more action', '听取建议': 'Take advice',
        '独自承受': 'Bear it alone', '小心维护': 'Guard carefully', '给人面子': 'Save face', '不要冒险': 'Don\'t risk',
        '困难重重': 'Many challenges', '多重挑战': 'Multiple hurdles', '仔细检查': 'Double check', '方向不明': 'Direction unclear', '低调行事': 'Stay low-key',
        '情绪管理': 'Manage emotions', '不要出头': 'Don\'t stand out', '咬牙坚持': 'Grit through', '学习提升': 'Learn & grow', '暂时低估': 'Undervalued now',
        '改正错误': 'Fix mistakes', '吸取教训': 'Learn lessons', '推倒重来': 'Start over', '接受现实': 'Accept reality', '凤凰涅槃': 'Phoenix rebirth',
        '暂时停滞': 'Stagnation', '暂避锋芒': 'Lay low', '万事如意': 'Everything goes well',
        // ---- 感情 Love ----
        '佳缘天成': 'Destined love', '喜结良缘': 'Happy union', '天赐良缘': 'Heaven-sent match', '破镜重圆': 'Reconciliation', '家庭美满': 'Happy family',
        '桃花正旺': 'Romance blooming', '感情升温': 'Love growing', '有情人终成眷属': 'Lovers unite', '和谐甜蜜': 'Sweet harmony', '有人暗恋': 'Secret admirer',
        '缘分将至': 'Fate approaching', '日久生情': 'Love grows slowly', '意外邂逅': 'Surprise encounter', '真心相待': 'True-hearted', '佳偶天成': 'Perfect match',
        '众星捧月': 'Center of attention', '桃花遍地': 'Romance everywhere', '真爱降临': 'True love arrives', '霸道总裁': 'Alpha energy', '万人迷': 'Irresistible charm',
        '人见人爱': 'Universally loved', '贵人牵线': 'Matchmaker help', '苦尽甘来': 'Sweet after bitter', '新的圈子': 'New social circle', '异地缘分': 'Long-distance fate',
        '善良吸引人': 'Kindness attracts', '用心经营': 'Invest in love', '守得云开': 'Wait for sunshine', '不表白也被看到': 'Noticed without words',
        '缘分有时': 'Fate has timing', '心态要好': 'Keep positive', '不急不缓': 'No rush', '考验过后': 'After the test', '随缘随心': 'Follow your heart',
        '细水长流': 'Steady & lasting', '珍惜眼前': 'Cherish the present', '慢慢培养': 'Build slowly',
        '不温不火': 'Neither hot nor cold', '观望为主': 'Wait and see', '放宽心胸': 'Open your heart', '主动出击': 'Take initiative', '不要催促': 'Don\'t rush',
        '因祸得福': 'Fortune from misfortune', '相互体谅': 'Mutual understanding', '差一步表白': 'Almost confessed', '放下执念': 'Let go',
        '平淡是福': 'Simplicity is bliss', '小有波折': 'Minor bumps', '接受不完美': 'Accept imperfect', '日久见真心': 'Time reveals truth',
        '互相理解': 'Mutual understanding', '互相扶持': 'Support each other', '不要大意': 'Don\'t be careless', '以诚相待': 'Be sincere',
        '先了解再行动': 'Understand first', '多理解对方': 'More empathy', '珍惜感情': 'Cherish feelings', '不慌不忙': 'No panic',
        '感情磨练': 'Love trials', '风水轮流': 'Tables will turn', '不执着': 'Don\'t cling', '低调恋爱': 'Low-key romance', '低调相处': 'Keep it low-key', '淡然处之': 'Stay detached',
        '沟通不畅': 'Poor communication', '冷静思考': 'Think calmly', '暂时孤独': 'Temporarily alone', '起伏不定': 'Ups and downs', '看清真心': 'See true feelings',
        '冷淡期': 'Cool period', '给彼此空间': 'Give space', '不要争吵': 'Don\'t argue', '找朋友聊聊': 'Talk to a friend', '思念故人': 'Missing someone',
        '不要炫耀': 'Don\'t show off', '放过对方': 'Let them go', '不要赌气': 'Don\'t be petty',
        '需要磨合': 'Needs adjustment', '误会增多': 'More misunderstandings', '言多必失': 'Less is more', '飘忽不定': 'Unstable', '谦让为上': 'Be humble',
        '考验感情': 'Testing love', '学会沟通': 'Learn to communicate', '不被理解': 'Misunderstood', '修复关系': 'Fix relationship', '放下过去': 'Let go of past',
        '天涯共此时': 'Together in spirit', '烈火重生': 'Reborn from fire', '重新开始': 'Fresh start',
        '冷静反思': 'Calm reflection', '独处反思': 'Solo reflection', '大风大浪': 'Stormy seas',
        // ---- 财运 Wealth ----
        '财源广进': 'Wealth pouring in', '意外之财': 'Surprise fortune', '丰收满仓': 'Full harvest', '否极泰来': 'Fortune after misfortune', '衣食无忧': 'No worries',
        '日进斗金': 'Gold every day', '八方来财': 'Wealth from all sides', '商业嗅觉敏锐': 'Sharp business sense', '投资将回报': 'Investment payoff', '价值释放': 'Value unleashed',
        '和气生财': 'Harmony brings wealth', '一本万利': 'Huge returns', '闷声发财': 'Quietly getting rich', '新领域机会': 'New field chance', '外来投资': 'Outside investment',
        '善因善果': 'Good karma', '一分耕耘一分收': 'Reap what you sow', '绝处逢生': 'Saved at the last moment',
        '收入看涨': 'Income rising', '小有收获': 'Small gains', '投资回报': 'Investment payoff', '知足常乐': 'Content & happy', '意外收入': 'Windfall',
        '劳有所得': 'Work rewarded', '柳暗花明': 'Light after dark', '善有善报': 'Karma returns good', '稳步增长': 'Steady growth', '财来财去终有余': 'Wealth flows & stays',
        '不急不躁': 'No hurry', '储蓄为主': 'Save first', '先投入后回报': 'Invest then gain', '不贪不求': 'No greed', '小富即安': 'Content with enough',
        '适度享受': 'Enjoy moderately', '积少成多': 'Little by little',
        '收支平衡': 'Breaking even', '保守理财': 'Conservative finance', '分散投资': 'Diversify', '该花就花': 'Spend when needed', '长线投资': 'Long-term invest',
        '失之东隅': 'Lost here found there', '合伙经营': 'Partnership', '量入为出': 'Live within means', '快到回本': 'Almost even', '目光远大': 'Big vision',
        '够用就好': 'Enough is enough', '先苦后甜': 'Sweet after bitter', '保持信心': 'Stay confident', '先储蓄后投资': 'Save then invest', '不露富': 'Don\'t flaunt wealth',
        '节俭为本': 'Frugality first', '合资共赢': 'Joint win', '留有余地': 'Leave room', '正当经营': 'Honest business', '调查研究': 'Do research',
        '互利共赢': 'Mutual benefit', '见好就收': 'Quit while ahead', '灵活应变': 'Be flexible', '平衡配置': 'Balanced allocation', '心想事成': 'Wishes come true',
        '开支增大': 'Expenses rising', '减少投资': 'Reduce investments', '勒紧腰带': 'Tighten belt', '有得有失': 'Win some lose some', '警惕陷阱': 'Watch for traps',
        '紧缩期': 'Tight period', '稳健为主': 'Be conservative', '暂时退出': 'Temporary exit', '换个角度': 'Change perspective', '低调处理': 'Handle quietly',
        '请教专家': 'Consult experts', '拮据时期': 'Tight times', '谨防回调': 'Watch for pullback', '不要赶尽杀绝': 'Don\'t go all out',
        '入不敷出': 'Overspending', '意外支出': 'Unexpected costs', '谨防损失': 'Guard against loss', '不稳定': 'Unstable',
        '注意节俭': 'Be frugal', '极度节俭': 'Ultra frugal', '缩减开支': 'Cut spending', '隐藏财富': 'Hide wealth', '不要赌博': 'Don\'t gamble',
        '困难时期': 'Hard times', '学习理财': 'Learn finance', '价值被低估': 'Undervalued', '止损': 'Cut losses', '接受损失': 'Accept loss',
        '从零起步': 'Start from zero', '勿求完美': 'Don\'t seek perfection', '浴火重生': 'Reborn from fire',
        // ---- 健康 Health ----
        '精力充沛': 'Full of energy', '身强体壮': 'Strong & healthy', '心身康泰': 'Mind & body well', '病去体安': 'Recovery coming', '长寿安康': 'Long & healthy life',
        '神采奕奕': 'Radiant', '活力四射': 'Full of vigor', '百毒不侵': 'Immune to all', '虎背熊腰': 'Strong build', '焕然一新': 'Refreshed',
        '笑口常开': 'Always smiling', '蒸蒸日上': 'Getting better daily',
        '身体不错': 'Feeling good', '精神焕发': 'Refreshed spirit', '旧疾渐愈': 'Old illness healing', '平安健康': 'Safe & sound', '无大碍': 'No big deal',
        '心情愉悦': 'Happy mood', '坚持锻炼': 'Keep exercising', '渐入佳境': 'Getting better', '身心通泰': 'Totally well', '活力满满': 'Full of vitality',
        '放松心情': 'Relax', '身心愉悦': 'Mind & body happy', '养精蓄锐': 'Rest & recharge', '锻炼见效': 'Exercise working', '身心自在': 'At ease',
        '安然无恙': 'Safe & unharmed', '天气转好': 'Weather improving', '日积月累': 'Gradual progress', '冬去春来': 'Winter turns spring', '旅行有益': 'Travel helps',
        '阳光心态': 'Sunny mindset', '劳逸结合': 'Balance work & rest', '好转在即': 'Improving soon',
        '注意休息': 'Get more rest', '定期体检': 'Regular checkups', '多做运动': 'Exercise more', '及时就医': 'See doctor promptly', '静养为主': 'Rest primarily',
        '心态要平': 'Stay balanced', '不信偏方': 'No folk remedies', '要注意休息': 'Must rest more', '不要熬夜': 'Don\'t stay up late',
        '全面检查': 'Full checkup', '减少争吵': 'Less arguing', '需要关怀': 'Need care', '高处风大': 'Windy at top', '心存善念': 'Kind thoughts',
        '不要逞强': 'Don\'t overdo', '好好调理': 'Take care', '撑下去': 'Hang in there', '咨询医生': 'Consult doctor', '相信会好': 'Believe in recovery',
        '改变习惯': 'Change habits', '不要自责': 'Don\'t blame yourself', '重建健康': 'Rebuild health', '绝境重生': 'Rise from bottom',
        '阴阳调和': 'Yin-yang balance', '福寿双全': 'Fortune & longevity', '行得正坐得端': 'Walk upright', '对症下药': 'Right treatment',
        '与人为善': 'Be kind', '趁健康多保养': 'Maintain while healthy', '稳定情绪': 'Stabilize emotions', '锻炼意志': 'Build willpower',
        '群体活动': 'Group activities', '防患未然': 'Prevent problems', '戒骄戒躁': 'Stay calm & humble', '心平气和': 'Inner peace', '静心养神': 'Meditate & rest',
        '注意身体': 'Take care', '免疫力低': 'Low immunity', '预防为主': 'Prevention first', '身心疲惫': 'Exhausted', '韬光养晦': 'Lay low & recover',
        '好好休息': 'Rest well', '调养生息': 'Recuperate', '心宽体健': 'Peace of mind', '紧急保护': 'Emergency care',
        '注意保养': 'Take care of yourself', '多加小心': 'Be careful', '情绪低落': 'Feeling down', '规律作息': 'Regular routine',
        '相互关心': 'Care for each other', '坚持治疗': 'Continue treatment', '简单生活': 'Simple living',
        '小病防大': 'Prevent small illness', '开阔心胸': 'Open your mind', '内在调养': 'Inner nourishment'
    };

    // 使用外部数据文件 fortune-sticks-data.js 的100支灵签
    let STICKS = [];

    // 公用种子随机数
    function seededRandom(seed) {
        let s = seed;
        return function () {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    }

    function getTodaySeed() {
        if (window.MyLuck && window.MyLuck.getTodaySeed) return window.MyLuck.getTodaySeed();
        const d = new Date();
        return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    }

    // 初始化签筒中的签棍
    function initSticks() {
        const area = document.getElementById('sticks-area');
        if (!area) return;
        area.innerHTML = '';
        const count = 18;
        for (let i = 0; i < count; i++) {
            const stick = document.createElement('div');
            stick.className = 'stick';
            const h = 100 + Math.random() * 80;
            const x = 10 + (i / count) * 140;
            const rot = -12 + Math.random() * 24;
            stick.style.height = h + 'px';
            stick.style.left = x + 'px';
            stick.style.setProperty('--base-rot', rot + 'deg');
            stick.style.transform = 'rotate(' + rot + 'deg)';
            area.appendChild(stick);
        }
    }

    // 抽签逻辑
    function drawFortune(isDaily) {
        let stick;
        if (isDaily) {
            const rng = seededRandom(getTodaySeed());
            const idx = Math.floor(rng() * STICKS.length);
            stick = STICKS[idx];
        } else {
            const idx = Math.floor(Math.random() * STICKS.length);
            stick = STICKS[idx];
        }
        return stick;
    }

    // 显示签文结果
    function showResult(stick) {
        const slip = document.getElementById('fortune-slip');
        const isEn = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
        document.getElementById('slip-number').textContent = isEn ? 'Stick #' + stick.id : '第 ' + stick.id + ' 签';
        const levelEl = document.getElementById('slip-level');
        levelEl.textContent = isEn ? (LEVEL_EN[stick.level] || stick.level) : stick.level;
        levelEl.className = 'slip-level ' + stick.cls;
        // 诗词始终中文（文化元素）
        document.getElementById('slip-poem').innerHTML = stick.poem.replace(/\n/g, '<br>');
        // 解签：中文 or 英文
        var interpretText = isEn ? (stick.interpretEn || stick.interpret) : stick.interpret;
        document.getElementById('slip-interpret').textContent = (isEn ? '📜 Interpretation: ' : '📜 解签：') + interpretText;
        // 四维方面
        document.getElementById('asp-career').textContent = isEn ? (ASPECT_EN[stick.career] || stick.career) : stick.career;
        document.getElementById('asp-love').textContent = isEn ? (ASPECT_EN[stick.love] || stick.love) : stick.love;
        document.getElementById('asp-wealth').textContent = isEn ? (ASPECT_EN[stick.wealth] || stick.wealth) : stick.wealth;
        document.getElementById('asp-health').textContent = isEn ? (ASPECT_EN[stick.health] || stick.health) : stick.health;
        slip.style.display = 'block';
        // 隐藏签筒区域，结果覆盖显示
        document.getElementById('draw-scene').style.display = 'none';
        document.getElementById('draw-hint').style.display = 'none';
        document.getElementById('draw-btn').style.display = 'none';
        var turnstileEl = document.getElementById('turnstile-fortune');
        if (turnstileEl) turnstileEl.style.display = 'none';
        slip.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 保存当前结果用于分享
        window._currentStick = stick;
    }

    // 摇签动画
    function shakeAndDraw(isDaily) {
        const scene = document.getElementById('draw-scene');
        const btn = document.getElementById('draw-btn');
        const hint = document.getElementById('draw-hint');
        const slip = document.getElementById('fortune-slip');

        btn.disabled = true;
        slip.style.display = 'none';
        // 重新显示签筒
        scene.style.display = '';
        hint.style.display = '';
        btn.style.display = '';
        var turnstileEl2 = document.getElementById('turnstile-fortune');
        if (turnstileEl2) turnstileEl2.style.display = '';
        scene.classList.remove('drawn');
        scene.classList.add('shaking');
        const isEn1 = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
        hint.textContent = isEn1 ? '🙏 Drawing fortune...' : '🙏 虔诚摇签中...';
        hint.style.animation = 'none';

        setTimeout(function () {
            scene.classList.remove('shaking');
            scene.classList.add('drawn');

            var stickEls = document.querySelectorAll('.stick');
            var chosenIdx = Math.floor(Math.random() * stickEls.length);
            stickEls[chosenIdx].classList.add('chosen');

            setTimeout(function () {
                var stick = drawFortune(isDaily);
                showResult(stick);
                btn.disabled = false;
                var isEn2 = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
                hint.textContent = isEn2 ? '✨ Fortune revealed below' : '✨ 签文已出，请查看下方';
                hint.style.animation = '';
                setTimeout(initSticks, 1000);
            }, 600);
        }, 1500);
    }

    // 分享签文（使用统一分享模块）
    function shareSlip() {
        var number = document.getElementById('slip-number').textContent;
        var level = document.getElementById('slip-level').textContent;
        var poem = document.getElementById('slip-poem').textContent;
        var isEn = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');

        var text = isEn
            ? 'I drew ' + number + ' [' + level + '] on MyLuck!\n\n' + poem
            : '我在 MyLuck 求得了' + number + '【' + level + '】\n\n' + poem;
        var title = isEn ? 'MyLuck Fortune - ' + level : 'MyLuck 灵签 - ' + level;

        if (window.MyLuck && window.MyLuck.Share) {
            window.MyLuck.Share.show(text, 'https://myluck.top/fortune-draw.html', { title: title });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text + '\nhttps://myluck.top/fortune-draw.html').then(function () {
                var st = window.MyLuck && window.MyLuck.showToast;
                if (st) st(isEn ? 'Fortune copied!' : '签文已复制！', 'success');
            });
        }
    }

    // 排行榜功能
    function initLeaderboard() {
        var boardSection = document.getElementById('fortune-board-section');
        var LB = window.MyLuck && window.MyLuck.Leaderboard;
        if (!boardSection || !LB) return;

        var en = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
        boardSection.innerHTML = LB.createHTML({
            boardId: 'fortune-board-list',
            titleZh: '🏆 今日灵签排行',
            titleEn: '🏆 Today\'s Fortune Ranking'
        });

        // 自定义渲染签面排行
        LB.load('fortune-board-list', 'fortune_draw', {
            limit: 10,
            virtualCount: 8,
            virtualConfig: {
                getEntry: function(rng, idx) {
                    var levels = ['上上签', '上签', '中上签', '中签', '中下签', '下签', '下下签'];
                    var levelsEn = ['Supreme', 'Great', 'Good', 'Average', 'Below Avg', 'Poor', 'Worst'];
                    var emojis = ['🎊', '✨', '🌟', '📜', '🌧️', '🌫️', '⛈️'];
                    var scores = [100, 85, 72, 55, 38, 22, 8];
                    // 偏向好签的分布
                    var weights = [0.08, 0.18, 0.22, 0.25, 0.15, 0.08, 0.04];
                    var r = rng(1);
                    var cum = 0;
                    var pick = 3;
                    for (var w = 0; w < weights.length; w++) {
                        cum += weights[w];
                        if (r < cum) { pick = w; break; }
                    }
                    var isEnLB = window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en';
                    return {
                        score: scores[pick],
                        character_emoji: emojis[pick],
                        character_title: isEnLB ? levelsEn[pick] : levels[pick]
                    };
                }
            },
            formatEntry: function (entry, i, medal) {
                var emoji = entry.character_emoji ? escapeHtml(entry.character_emoji) + ' ' : '';
                var detail = entry.character_title ? '<span class="lb-detail">' + escapeHtml(entry.character_title) + '</span>' : '';
                return '<div class="lb-left">' + medal + '<span class="lb-name">' + emoji + escapeHtml(entry.name || (window.MyLuck && window.MyLuck.I18n ? window.MyLuck.I18n.t('common.anonymous') : '匿名')) + '</span>' + detail + '</div><span class="lb-score" style="color:' + getColor(entry.score) + '">' + (entry.score || 0) + '</span>';
            }
        });
    }

    function escapeHtml(str) {
        if (window.MyLuck && window.MyLuck.Security) return window.MyLuck.Security.escapeHtml(str);
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function getColor(score) {
        if (score >= 90) return '#e17055';
        if (score >= 70) return '#fdcb6e';
        if (score >= 50) return '#00b894';
        if (score >= 30) return '#74b9ff';
        return '#b2bec3';
    }

    // 签等级对应分数
    function levelScore(level) {
        var scores = { '上上签': 100, '上签': 85, '中上签': 72, '中签': 55, '中下签': 38, '下签': 22, '下下签': 8 };
        return scores[level] || 50;
    }

    async function submitFortuneToLeaderboard() {
        if (!window._currentStick) {
            showToast(isEnNow() ? 'Draw first!' : '请先求签！', 'info');
            return;
        }
        var stick = window._currentStick;
        var LB = window.MyLuck && window.MyLuck.Leaderboard;
        if (!LB) return;

        var I18n = window.MyLuck && window.MyLuck.I18n;
        var t = function(k, fb) { return I18n ? I18n.t(k) : fb; };
        var en = isEnNow();

        // 弹出名字输入 Modal
        var nameOverlay = document.createElement('div');
        nameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
        nameOverlay.innerHTML = '<div style="background:#fff;border-radius:16px;padding:24px;max-width:360px;width:90%;text-align:center;">' +
            '<h3 style="margin:0 0 12px;color:#e17055;">' + (en ? '🏆 Enter Name' : '🏆 输入名字上榜') + '</h3>' +
            '<input type="text" id="fortune-rank-name" maxlength="20" placeholder="' + (en ? 'Your name' : '你的名字') + '" style="width:100%;padding:10px 14px;border:2px solid #e0d5c3;border-radius:10px;font-size:1rem;margin-bottom:12px;box-sizing:border-box;">' +
            '<div style="display:flex;gap:10px;justify-content:center;">' +
            '<button id="fortune-rank-cancel" style="padding:10px 20px;border:1px solid #ddd;border-radius:25px;background:#fff;cursor:pointer;">' + (en ? 'Cancel' : '取消') + '</button>' +
            '<button id="fortune-rank-confirm" style="padding:10px 20px;border:none;border-radius:25px;background:#e17055;color:#fff;font-weight:600;cursor:pointer;">' + (en ? 'Submit' : '提交') + '</button>' +
            '</div></div>';
        document.body.appendChild(nameOverlay);

        document.getElementById('fortune-rank-cancel').addEventListener('click', function() { nameOverlay.remove(); });
        nameOverlay.addEventListener('click', function(e) { if (e.target === nameOverlay) nameOverlay.remove(); });

        document.getElementById('fortune-rank-confirm').addEventListener('click', async function() {
            var nameInput = document.getElementById('fortune-rank-name').value.trim();
            var name = nameInput || (I18n ? I18n.t('common.anonymous') : '匿名');
            name = name.substring(0, 20);
            nameOverlay.remove();

            var rankBtn = document.getElementById('fortune-rank');
            if (rankBtn) { rankBtn.disabled = true; rankBtn.textContent = '...'; }

            var score = levelScore(stick.level);
            var success = await LB.submit('fortune_draw', {
                name: name,
                score: score,
                character_id: String(stick.id),
                character_emoji: stick.level === '上上签' ? '🎊' : stick.level === '上签' ? '✨' : stick.level === '中上签' ? '🌟' : stick.level === '中签' ? '📜' : stick.level === '中下签' ? '🌧️' : stick.level === '下签' ? '🌫️' : '⛈️',
                character_title: en ? (LEVEL_EN[stick.level] || stick.level) : stick.level
            }, {
                onSuccess: function () {
                    if (rankBtn) rankBtn.textContent = t('draw.ranked', '✅ 已上榜！');
                    initLeaderboard();
                },
                onFail: function () {
                    showToast(t('draw.rank_fail', '上榜失败，请稍后重试'), 'error');
                    if (rankBtn) { rankBtn.disabled = false; rankBtn.textContent = t('draw.rank', '🏆 上榜'); }
                }
            });
            if (!success && rankBtn) { rankBtn.disabled = false; rankBtn.textContent = t('draw.rank', '🏆 上榜'); }
        });
    }

    function isEnNow() {
        return window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en';
    }

    // 入口
    function init() {
        // 从外部数据文件加载签数据
        STICKS = window.FORTUNE_STICKS || [];
        if (STICKS.length === 0) {
            console.warn('[fortune-draw] No fortune sticks data found. Check fortune-sticks-data.js');
        }

        initSticks();

        var scene = document.getElementById('draw-scene');
        var btn = document.getElementById('draw-btn');
        var shareBtn = document.getElementById('share-slip');
        var redrawBtn = document.getElementById('redraw-btn');
        var rankBtn = document.getElementById('fortune-rank');
        var dailyInfo = document.getElementById('daily-info');

        var firstDraw = true;

        function updateDailyInfo() {
            if (!dailyInfo) return;
            var d = new Date();
            var isEnInit = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
            if (isEnInit) {
                dailyInfo.textContent = '📅 ' + d.toLocaleDateString('en-US') + ' · First draw is your daily fortune · ' + STICKS.length + ' sticks';
            } else {
                dailyInfo.textContent = '📅 ' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 · 首次为每日专属签 · 共' + STICKS.length + '支签';
            }
        }
        updateDailyInfo();

        function doDraw() {
            // 求签前验证 Turnstile
            var Turnstile = window.MyLuck && window.MyLuck.Turnstile;
            if (Turnstile && Turnstile.isEnabled && Turnstile.isEnabled() && !Turnstile.isVerified()) {
                showToast(window.MyLuck && window.MyLuck.I18n ? window.MyLuck.I18n.t('common.verify_first') : '请先完成人机验证', 'info');
                return;
            }
            shakeAndDraw(firstDraw);
            firstDraw = false;
        }

        if (scene) scene.addEventListener('click', doDraw);
        if (btn) btn.addEventListener('click', doDraw);
        if (shareBtn) shareBtn.addEventListener('click', shareSlip);
        if (redrawBtn) redrawBtn.addEventListener('click', function () { doDraw(); });
        if (rankBtn) rankBtn.addEventListener('click', submitFortuneToLeaderboard);

        // Turnstile 在页面加载时渲染（求签前验证）
        if (window.MyLuck && window.MyLuck.Turnstile && window.MyLuck.Turnstile.isEnabled()) {
            window.MyLuck.Turnstile.render('turnstile-fortune');
        }

        // 排行榜
        initLeaderboard();

        // 语言切换监听
        document.addEventListener('langchange', function () {
            updateDailyInfo();
            if (window._currentStick) {
                showResult(window._currentStick);
                // 更新 hint 文字（签已抽出时）
                var hint = document.getElementById('draw-hint');
                if (hint) {
                    var en = isEnNow();
                    hint.textContent = en ? '✨ Fortune revealed below' : '✨ 签文已出，请查看下方';
                }
            }
            initLeaderboard();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
