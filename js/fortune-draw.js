// ========== 在线求签 fortune-draw.js ==========
(function () {
    'use strict';

    // 49支灵签数据
    const FORTUNE_STICKS = [
        // ===== 上上签 (5支) =====
        { id: 1, level: '上上签', cls: 'great', poem: '春来花开满园香\n贵人相助运道昌\n凡事顺遂心如意\n前程似锦耀辉光', interpret: '此签大吉，万事亨通。如日中天，诸事皆顺，贵人频现，财运亨通。宜积极进取，把握良机。', career: '大展宏图', love: '佳缘天成', wealth: '财源广进', health: '精力充沛' },
        { id: 2, level: '上上签', cls: 'great', poem: '金鳞岂是池中物\n一遇风云便化龙\n乘风破浪会有时\n直挂云帆济沧海', interpret: '此签为龙腾之象，预示突破与飞跃。长期的努力即将获得丰厚回报，大胆行动方能成就非凡。', career: '步步高升', love: '喜结良缘', wealth: '意外之财', health: '身强体壮' },
        { id: 3, level: '上上签', cls: 'great', poem: '紫气东来满庭芳\n吉星高照喜洋洋\n千里姻缘一线牵\n万事如意福满堂', interpret: '紫气东来，福运降临。此签预示全方位的好运，尤其在人际关系和家庭方面，将有喜事临门。', career: '贵人提携', love: '天赐良缘', wealth: '丰收满仓', health: '心身康泰' },
        { id: 4, level: '上上签', cls: 'great', poem: '枯木逢春再发枝\n乌云散尽见晴时\n守得花开终有日\n翻身跃上最高枝', interpret: '此签预示困境即将结束，否极泰来。之前的坚持和等待将获得回报，人生将迎来崭新的篇章。', career: '逆境翻盘', love: '破镜重圆', wealth: '否极泰来', health: '病去体安' },
        { id: 5, level: '上上签', cls: 'great', poem: '三星高照福禄全\n喜事连连乐无边\n风调雨顺年丰稳\n阖家欢乐笑开颜', interpret: '三星拱照，福禄寿三全。此签预示家庭和睦、事业稳固、健康无忧，是难得的全面大吉之签。', career: '事业有成', love: '家庭美满', wealth: '衣食无忧', health: '长寿安康' },

        // ===== 上签 (10支) =====
        { id: 6, level: '上签', cls: 'good', poem: '东风送暖百花开\n万紫千红次第来\n好运连连人欢喜\n心想事成不用猜', interpret: '此签为春风得意之象，运势上扬。机会正在靠近，保持积极心态，好事自然来。', career: '机会不断', love: '桃花正旺', wealth: '收入看涨', health: '身体不错' },
        { id: 7, level: '上签', cls: 'good', poem: '月到中秋分外明\n人逢喜事精神清\n举杯邀月同欢乐\n好运随风送上门', interpret: '如中秋明月般圆满。此签预示近期将有喜事降临，人际关系和谐，适合社交活动。', career: '合作顺利', love: '感情升温', wealth: '小有收获', health: '精神焕发' },
        { id: 8, level: '上签', cls: 'good', poem: '久旱逢甘雨\n他乡遇故知\n金榜题名日\n洞房花烛时', interpret: '人生四大喜事齐聚，此签预示等待已久的好消息即将到来，耐心终将得到回报。', career: '考试通过', love: '有情人终成眷属', wealth: '投资回报', health: '旧疾渐愈' },
        { id: 9, level: '上签', cls: 'good', poem: '竹报平安春意浓\n梅开五福喜相逢\n和风细雨润无声\n处处皆是好光景', interpret: '平稳中见吉祥，此签预示平顺安康的好运。不求大富大贵，但诸事顺心如意。', career: '稳中有升', love: '和谐甜蜜', wealth: '细水长流', health: '平安健康' },
        { id: 10, level: '上签', cls: 'good', poem: '一帆风顺行千里\n半道贵人暗相助\n莫道前路多坎坷\n风雨过后见彩虹', interpret: '此签预示有贵人暗中相助，即便遇到困难也能逢凶化吉。保持乐观心态最为重要。', career: '贵人相助', love: '有人暗恋', wealth: '意外收入', health: '无大碍' },
        { id: 11, level: '上签', cls: 'good', poem: '鹊桥相会喜气浓\n红线牵引有缘逢\n勿问前程多远近\n且行且珍惜当中', interpret: '此签利感情，有缘之人正在靠近。珍惜眼前人和机会，幸福就在身边。', career: '团队和睦', love: '缘分将至', wealth: '知足常乐', health: '心情愉悦' },
        { id: 12, level: '上签', cls: 'good', poem: '春风化雨润万物\n勤耕细作收获丰\n不必忧愁前路事\n付出之后有回丰', interpret: '辛勤的付出即将迎来收获的季节。此签鼓励持续努力，不要急于求成。', career: '努力有成', love: '日久生情', wealth: '劳有所得', health: '坚持锻炼' },
        { id: 13, level: '上签', cls: 'good', poem: '柳暗花明又一村\n山重水复路还存\n莫言此路行不通\n转角遇见满天春', interpret: '此签预示看似困难的事情将出现转机。换个角度思考问题，意想不到的好事正在等你。', career: '峰回路转', love: '意外邂逅', wealth: '柳暗花明', health: '渐入佳境' },
        { id: 14, level: '上签', cls: 'good', poem: '积善之家有余庆\n行好之人天自佑\n但行好事莫问果\n福报自来不须求', interpret: '善行积德之象，此签提示保持善良与正直，好运自然会降临。近期有行善得福的机会。', career: '口碑极佳', love: '真心相待', wealth: '善有善报', health: '身心通泰' },
        { id: 15, level: '上签', cls: 'good', poem: '青云直上九重天\n乘龙快婿美名传\n功名利禄非难事\n但须勤奋在当先', interpret: '此签预示上升的运势，但需要自身的努力配合。机会已经出现，就看你是否能抓住。', career: '晋升在望', love: '佳偶天成', wealth: '稳步增长', health: '活力满满' },

        // ===== 中上签 (8支) =====
        { id: 16, level: '中上签', cls: 'good', poem: '船到桥头自然直\n车到山前必有路\n凡事不必太着急\n水到渠成好运来', interpret: '此签劝诫不必过于焦虑，事情会自然解决。保持平常心，顺其自然反而会有好结果。', career: '顺其自然', love: '缘分有时', wealth: '不急不躁', health: '放松心情' },
        { id: 17, level: '中上签', cls: 'good', poem: '小桥流水有人家\n春暖花开满天涯\n只要心中有阳光\n处处都是好年华', interpret: '此签预示内心的态度决定运势的好坏。保持积极乐观，好运便会不期而至。', career: '态度决定', love: '心态要好', wealth: '知足常乐', health: '身心愉悦' },
        { id: 18, level: '中上签', cls: 'good', poem: '好风凭借力\n送我上青云\n且待时机到\n一举定乾坤', interpret: '此签提示时机很重要，目前正在积蓄力量的阶段。等到合适的时机一举出击，必能成功。', career: '等待时机', love: '不急不缓', wealth: '储蓄为主', health: '养精蓄锐' },
        { id: 19, level: '中上签', cls: 'good', poem: '风吹杨柳暗自舞\n雨打芭蕉声声酥\n不经一番寒彻骨\n怎得梅花扑鼻香', interpret: '此签预示经历考验后将迎来甜美的果实。当前的困难都是为了之后的幸福做铺垫。', career: '先苦后甜', love: '考验过后', wealth: '先投入后回报', health: '锻炼见效' },
        { id: 20, level: '中上签', cls: 'good', poem: '明月当空照九州\n清风拂面百无忧\n但求心中常自在\n何须外物苦追求', interpret: '此签提示幸福来自内心的满足。不要过于追逐外在的东西，内心的平静才是真正的好运。', career: '淡定从容', love: '随缘随心', wealth: '不贪不求', health: '身心自在' },
        { id: 21, level: '中上签', cls: 'good', poem: '青山不改绿水流\n花落花开年复年\n且把浮名换浅唱\n岁月静好乐悠然', interpret: '此签主平安喜乐，虽无大起大落，但生活稳定幸福。享受当下，珍惜平凡的美好。', career: '平稳发展', love: '细水长流', wealth: '小富即安', health: '安然无恙' },
        { id: 22, level: '中上签', cls: 'good', poem: '燕子归来春又到\n花开花落自有时\n人生得意须尽欢\n莫使金樽空对月', interpret: '此签预示好运正在路上，但提醒要及时把握机会享受生活。活在当下，珍惜眼前。', career: '机会将至', love: '珍惜眼前', wealth: '适度享受', health: '天气转好' },
        { id: 23, level: '中上签', cls: 'good', poem: '千里之行始于足下\n万事开头难过后\n只要功夫深似铁\n磨杵也能成绣针', interpret: '此签鼓励脚踏实地。大目标要分解成小步骤，一步步来，最终必能到达理想的彼岸。', career: '脚踏实地', love: '慢慢培养', wealth: '积少成多', health: '日积月累' },

        // ===== 中签 (12支) =====
        { id: 24, level: '中签', cls: 'fair', poem: '浮云蔽日终须散\n流水行舟复又还\n但看眼前风景好\n何必忧愁到明天', interpret: '此签预示运势平平，不好不坏。暂时的困扰终会过去，不必过分担忧，安心做好当下。', career: '维持现状', love: '不温不火', wealth: '收支平衡', health: '注意休息' },
        { id: 25, level: '中签', cls: 'fair', poem: '半山腰上看风景\n不上不下心悠然\n进退之间须谨慎\n三思而后再向前', interpret: '此签提示当前处于关键抉择时期。不要冲动行事，多思考多权衡，稳妥为上。', career: '谨慎决策', love: '观望为主', wealth: '保守理财', health: '定期体检' },
        { id: 26, level: '中签', cls: 'fair', poem: '天涯何处无芳草\n何必单恋一枝花\n放宽心胸看世界\n处处都有好办法', interpret: '此签提示不要执着于单一选择。打开思路，多考虑其他可能性，也许更好的选择正在别处等你。', career: '换个思路', love: '放宽心胸', wealth: '分散投资', health: '多做运动' },
        { id: 27, level: '中签', cls: 'fair', poem: '有花堪折直须折\n莫待无花空折枝\n今日事情今日了\n莫将诸事到明推', interpret: '此签提醒要及时行动，不要拖延。该做的事情不要犹豫，错过时机就难以弥补。', career: '立即行动', love: '主动出击', wealth: '该花就花', health: '及时就医' },
        { id: 28, level: '中签', cls: 'fair', poem: '守得云开见日出\n静待花开终有时\n急躁反而误大事\n耐心等待最相宜', interpret: '此签建议保持耐心和定力。急于求成反而会适得其反，安静等待才是上策。', career: '静待时机', love: '不要催促', wealth: '长线投资', health: '静养为主' },
        { id: 29, level: '中签', cls: 'fair', poem: '塞翁失马焉知非福\n祸福相依莫强求\n看似不顺实有因\n回头方知是好路', interpret: '此签提示表面的不顺可能暗藏好运。不要被眼前的困难吓倒，它可能是通往更好结局的必经之路。', career: '塞翁失马', love: '因祸得福', wealth: '失之东隅', health: '小病防大' },
        { id: 30, level: '中签', cls: 'fair', poem: '风雨同舟共前行\n患难与共见真情\n独行虽快众行远\n合作方能成大器', interpret: '此签强调团队和合作的力量。不要独自承担一切，寻求帮助和支持会让事情事半功倍。', career: '团队合作', love: '相互体谅', wealth: '合伙经营', health: '相互关心' },
        { id: 31, level: '中签', cls: 'fair', poem: '四季轮回有定数\n春去秋来各有时\n勿要强求不属己\n安分守己待佳期', interpret: '此签提示顺应自然规律，不要强求不属于自己的东西。当前最好的策略是安分守己。', career: '安守本分', love: '顺其自然', wealth: '量入为出', health: '规律作息' },
        { id: 32, level: '中签', cls: 'fair', poem: '画龙不须点睛时\n万事俱备等东风\n差的只是一步路\n再进一步便成功', interpret: '此签预示你离成功只差一步。不要半途而废，再坚持一下就能看到曙光。', career: '再进一步', love: '差一步表白', wealth: '快到回本', health: '坚持治疗' },
        { id: 33, level: '中签', cls: 'fair', poem: '人生在世不称意\n明朝散发弄扁舟\n莫道浮云遮望眼\n风物长宜放眼量', interpret: '此签提示要有长远眼光。暂时的不如意只是人生的一小段，从更高的角度看，一切都会好起来。', career: '放眼长远', love: '放下执念', wealth: '目光远大', health: '调整心态' },
        { id: 34, level: '中签', cls: 'fair', poem: '平平淡淡才是真\n简简单单最快乐\n不求大富与大贵\n但求安康伴此生', interpret: '此签提示平淡的生活中有最真实的幸福。不要好高骛远，珍惜现在拥有的一切。', career: '安于现状', love: '平淡是福', wealth: '够用就好', health: '简单生活' },
        { id: 35, level: '中签', cls: 'fair', poem: '问君能有几多愁\n恰似一江春水流\n愁来愁去终须散\n转眼红日上西楼', interpret: '此签提示忧愁只是暂时的。困扰你的事情终究会过去，保持乐观心态最重要。', career: '暂时困扰', love: '小有波折', wealth: '起伏不定', health: '心宽体健' },

        // ===== 中下签 (7支) =====
        { id: 36, level: '中下签', cls: 'poor', poem: '山高路远行路难\n雾锁前程不见天\n虽是一时风雨急\n雨过天晴在明天', interpret: '此签预示近期运势略有波折。虽然前路不太明朗，但只要坚持就能度过难关。', career: '遇到阻碍', love: '沟通不畅', wealth: '开支增大', health: '注意保养' },
        { id: 37, level: '中下签', cls: 'poor', poem: '逆水行舟不进退\n风大浪急要小心\n收帆稳舵待风平\n切莫冒进遭祸殃', interpret: '此签提示当前要谨慎行事，不宜冒进。退一步海阔天空，等待更好的时机再出发。', career: '暂停计划', love: '冷静思考', wealth: '减少投资', health: '多加小心' },
        { id: 38, level: '中下签', cls: 'poor', poem: '独木难支大厦倾\n孤雁难飞万里程\n知己难求心莫急\n静待春风暖自明', interpret: '此签提示不要独自硬撑。遇到困难时要学会求助，但也要保持耐心，不可操之过急。', career: '寻求帮助', love: '暂时孤独', wealth: '勒紧腰带', health: '情绪低落' },
        { id: 39, level: '中下签', cls: 'poor', poem: '花开花落两由之\n世事无常莫叹息\n得之淡然失之坦\n心平气和度光阴', interpret: '此签提示世事无常，得失随缘。不要太执着于结果，保持平和的心态来面对生活中的变化。', career: '有变动', love: '起伏不定', wealth: '有得有失', health: '心态要平' },
        { id: 40, level: '中下签', cls: 'poor', poem: '雾里看花花不真\n水中捞月月难寻\n虚幻之事莫追逐\n脚踏实地才为真', interpret: '此签警示不要被虚幻的东西所迷惑。有人可能在欺骗你，要擦亮眼睛辨别真假。', career: '小心受骗', love: '看清真心', wealth: '警惕陷阱', health: '不信偏方' },
        { id: 41, level: '中下签', cls: 'poor', poem: '寒冬腊月雪纷飞\n百花凋零鸟不归\n但知冬去春必至\n忍耐一时便是春', interpret: '此签预示正处于人生的"寒冬"阶段。虽然艰难，但这只是暂时的，春天一定会来。', career: '低谷期', love: '冷淡期', wealth: '紧缩期', health: '要注意休息' },
        { id: 42, level: '中下签', cls: 'poor', poem: '欲速则不达\n欲益反而损\n退后一步想\n方为上上策', interpret: '此签提示凡事不可急躁冒进。越着急越容易出错，退一步思考反而能找到更好的方法。', career: '放慢脚步', love: '给彼此空间', wealth: '稳健为主', health: '不要熬夜' },

        // ===== 下签 (5支) =====
        { id: 43, level: '下签', cls: 'poor', poem: '暗夜行路须仔细\n处处荆棘要留心\n虽是前路难行走\n黎明之前最黑暗', interpret: '此签预示当前处境较为艰难。但请记住：黎明前的黑暗最深，曙光就在不远处，坚持就是胜利。', career: '困难重重', love: '需要磨合', wealth: '入不敷出', health: '注意身体' },
        { id: 44, level: '下签', cls: 'poor', poem: '屋漏偏逢连夜雨\n船迟又遇打头风\n且将烦恼都放下\n明朝自有明朝风', interpret: '此签预示近期可能遭遇连环不顺。但不要被困难击倒，一切终将过去。', career: '多重挑战', love: '误会增多', wealth: '意外支出', health: '免疫力低' },
        { id: 45, level: '下签', cls: 'poor', poem: '失之毫厘差千里\n一着不慎满盘输\n凡事三思而后行\n小心驶得万年船', interpret: '此签警示要格外小心谨慎。在做重要决定时尤其要深思熟虑，一个小错误可能导致大问题。', career: '仔细检查', love: '言多必失', wealth: '谨防损失', health: '预防为主' },
        { id: 46, level: '下签', cls: 'poor', poem: '浮萍漂泊无定所\n随波逐流任东西\n若要安身立命处\n先须稳住自己心', interpret: '此签提示当前可能感到迷茫和不知所措。最重要的是先安定内心，找到自己的方向。', career: '方向不明', love: '飘忽不定', wealth: '不稳定', health: '身心疲惫' },
        { id: 47, level: '下签', cls: 'poor', poem: '满招损来谦受益\n骄兵必败古今同\n低头做事莫张扬\n韬光养晦待时中', interpret: '此签警示不要骄傲自满。低调做人、老实做事才是当前最好的策略。', career: '低调行事', love: '谦让为上', wealth: '保守理财', health: '韬光养晦' },

        // ===== 下下签 (2支) =====
        { id: 48, level: '下下签', cls: 'poor', poem: '乌云压城城欲摧\n风雨飘摇路难归\n但看四季终轮转\n冬去春来花自开', interpret: '此签虽为下下签，但请记住：最坏的时候也意味着转机即将到来。坚持住，一切都会好起来的。不要灰心！', career: '暂时停滞', love: '冷静反思', wealth: '注意节俭', health: '好好休息' },
        { id: 49, level: '下下签', cls: 'poor', poem: '四面楚歌声声急\n虎落平阳被犬欺\n忍得一时风浪过\n终有拨云见日时', interpret: '此签预示当前处境不佳，但这是人生的必经阶段。熬过去了，前面就是坦途。所谓"吃得苦中苦，方为人上人"。', career: '暂避锋芒', love: '独处反思', wealth: '极度节俭', health: '调养生息' }
    ];

    // 公用种子随机数
    function seededRandom(seed) {
        let s = seed;
        return function () {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    }

    function getTodaySeed() {
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
            // 每日固定签：基于日期种子
            const rng = seededRandom(getTodaySeed());
            const idx = Math.floor(rng() * FORTUNE_STICKS.length);
            stick = FORTUNE_STICKS[idx];
        } else {
            // 随机签
            const idx = Math.floor(Math.random() * FORTUNE_STICKS.length);
            stick = FORTUNE_STICKS[idx];
        }
        return stick;
    }

    // 显示签文结果
    function showResult(stick) {
        const slip = document.getElementById('fortune-slip');
        const isEn = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
        document.getElementById('slip-number').textContent = isEn ? 'Stick #' + stick.id : '第 ' + stick.id + ' 签';
        const levelEl = document.getElementById('slip-level');
        levelEl.textContent = stick.level;
        levelEl.className = 'slip-level ' + stick.cls;
        document.getElementById('slip-poem').innerHTML = stick.poem.replace(/\n/g, '<br>');
        document.getElementById('slip-interpret').textContent = (isEn ? '📜 Interpretation: ' : '📜 解签：') + stick.interpret;
        document.getElementById('asp-career').textContent = stick.career;
        document.getElementById('asp-love').textContent = stick.love;
        document.getElementById('asp-wealth').textContent = stick.wealth;
        document.getElementById('asp-health').textContent = stick.health;
        slip.style.display = 'block';
        slip.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 摇签动画
    function shakeAndDraw(isDaily) {
        const scene = document.getElementById('draw-scene');
        const btn = document.getElementById('draw-btn');
        const hint = document.getElementById('draw-hint');
        const slip = document.getElementById('fortune-slip');

        btn.disabled = true;
        slip.style.display = 'none';
        scene.classList.remove('drawn');
        scene.classList.add('shaking');
        const isEn1 = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
        hint.textContent = isEn1 ? '🙏 Drawing fortune...' : '🙏 虔诚摇签中...';
        hint.style.animation = 'none';

        // 摇签1.5秒
        setTimeout(function () {
            scene.classList.remove('shaking');
            scene.classList.add('drawn');

            // 随机选一根签棍飞出
            const sticks = document.querySelectorAll('.stick');
            const chosenIdx = Math.floor(Math.random() * sticks.length);
            sticks[chosenIdx].classList.add('chosen');

            // 延迟显示结果
            setTimeout(function () {
                const stick = drawFortune(isDaily);
                showResult(stick);
                btn.disabled = false;
                const isEn2 = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
                hint.textContent = isEn2 ? '✨ Fortune revealed below' : '✨ 签文已出，请查看下方';
                hint.style.animation = '';

                // 重新初始化签棍
                setTimeout(initSticks, 1000);
            }, 600);
        }, 1500);
    }

    // 分享签文
    function shareSlip() {
        const number = document.getElementById('slip-number').textContent;
        const level = document.getElementById('slip-level').textContent;
        const poem = document.getElementById('slip-poem').textContent;
        const text = '我在 MyLuck 求得了' + number + '【' + level + '】\n\n' + poem + '\n\n来试试你的运势吧 👉 https://myluck.top/fortune-draw.html';

        if (navigator.share) {
            navigator.share({ title: 'MyLuck 灵签 - ' + level, text: text, url: 'https://myluck.top/fortune-draw.html' }).catch(function () { });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                alert('签文已复制到剪贴板，快去分享给朋友吧！');
            });
        } else {
            prompt('复制以下签文分享给朋友：', text);
        }
    }

    // 入口
    function init() {
        initSticks();

        const scene = document.getElementById('draw-scene');
        const btn = document.getElementById('draw-btn');
        const shareBtn = document.getElementById('share-slip');
        const redrawBtn = document.getElementById('redraw-btn');
        const dailyInfo = document.getElementById('daily-info');

        // 第一次求签为每日签（固定），之后为随机签
        let firstDraw = true;

        if (dailyInfo) {
            const d = new Date();
            const isEnInit = (window.MyLuck && window.MyLuck.I18n && window.MyLuck.I18n.lang === 'en');
            if (isEnInit) {
                dailyInfo.textContent = '📅 ' + d.toLocaleDateString('en-US') + ' · First draw is your daily fortune';
            } else {
                dailyInfo.textContent = '📅 ' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 · 首次为每日专属签';
            }
        }

        function doDraw() {
            shakeAndDraw(firstDraw);
            firstDraw = false;
        }

        if (scene) scene.addEventListener('click', doDraw);
        if (btn) btn.addEventListener('click', doDraw);
        if (shareBtn) shareBtn.addEventListener('click', shareSlip);
        if (redrawBtn) redrawBtn.addEventListener('click', function () {
            doDraw();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
