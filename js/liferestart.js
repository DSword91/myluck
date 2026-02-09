// ========== 人生重开模拟器 (Life Restart Simulator) ==========
(function () {
    'use strict';
    const { I18n } = window.MyLuck;

    // ========== i18n ==========
    const zh = {
        'lr.title': '🔄 人生重开模拟器',
        'lr.desc': '分配属性，选择天赋，体验一段随机人生',
        'lr.start': '开始新人生',
        'lr.restart': '再次重开',
        'lr.attr.title': '属性分配',
        'lr.attr.tip': '你有 {n} 点可分配',
        'lr.attr.chr': '颜值',
        'lr.attr.int': '智力',
        'lr.attr.str': '体质',
        'lr.attr.mny': '家境',
        'lr.attr.spr': '快乐',
        'lr.attr.random': '随机分配',
        'lr.talent.title': '天赋抽取',
        'lr.talent.tip': '从以下天赋中选择 3 个',
        'lr.talent.draw': '抽取天赋',
        'lr.talent.confirm': '确认选择',
        'lr.talent.need3': '请选择 3 个天赋',
        'lr.life.title': '人生轨迹',
        'lr.life.age': '{n}岁',
        'lr.life.speed': '速度',
        'lr.life.skip': '跳到结局',
        'lr.summary.title': '人生总结',
        'lr.summary.final': '享年 {n} 岁',
        'lr.summary.rating': '总评',
        'lr.summary.chr': '颜值',
        'lr.summary.int': '智力',
        'lr.summary.str': '体质',
        'lr.summary.mny': '财富',
        'lr.summary.spr': '快乐',
        'lr.summary.share': '分享人生',
        'lr.grade.0': '地狱',
        'lr.grade.1': '折磨',
        'lr.grade.2': '不幸',
        'lr.grade.3': '普通',
        'lr.grade.4': '幸福',
        'lr.grade.5': '极乐',
        'lr.grade.6': '传说',
    };
    const en = {
        'lr.title': '🔄 Life Restart Simulator',
        'lr.desc': 'Allocate stats, pick talents, live a random life',
        'lr.start': 'Start New Life',
        'lr.restart': 'Restart Life',
        'lr.attr.title': 'Allocate Stats',
        'lr.attr.tip': 'You have {n} points to allocate',
        'lr.attr.chr': 'Charm',
        'lr.attr.int': 'Intelligence',
        'lr.attr.str': 'Constitution',
        'lr.attr.mny': 'Wealth',
        'lr.attr.spr': 'Happiness',
        'lr.attr.random': 'Randomize',
        'lr.talent.title': 'Draw Talents',
        'lr.talent.tip': 'Choose 3 talents from below',
        'lr.talent.draw': 'Draw Talents',
        'lr.talent.confirm': 'Confirm',
        'lr.talent.need3': 'Please select 3 talents',
        'lr.life.title': 'Life Trajectory',
        'lr.life.age': 'Age {n}',
        'lr.life.speed': 'Speed',
        'lr.life.skip': 'Skip to End',
        'lr.summary.title': 'Life Summary',
        'lr.summary.final': 'Lived to age {n}',
        'lr.summary.rating': 'Rating',
        'lr.summary.chr': 'Charm',
        'lr.summary.int': 'Intelligence',
        'lr.summary.str': 'Constitution',
        'lr.summary.mny': 'Wealth',
        'lr.summary.spr': 'Happiness',
        'lr.summary.share': 'Share Life',
        'lr.grade.0': 'Hell',
        'lr.grade.1': 'Miserable',
        'lr.grade.2': 'Unlucky',
        'lr.grade.3': 'Normal',
        'lr.grade.4': 'Happy',
        'lr.grade.5': 'Blissful',
        'lr.grade.6': 'Legendary',
    };
    I18n.add('zh', zh);
    I18n.add('en', en);

    // ========== 天赋数据 (40个) ==========
    const TALENTS = [
        // grade: 0=普通, 1=稀有, 2=史诗, 3=传说
        { id: 1, grade: 0, name: { zh: '平平无奇', en: 'Ordinary' }, desc: { zh: '没什么特别的', en: 'Nothing special' }, effects: {} },
        { id: 2, grade: 0, name: { zh: '健康体质', en: 'Healthy' }, desc: { zh: '体质+2', en: 'STR+2' }, effects: { str: 2 } },
        { id: 3, grade: 0, name: { zh: '书香门第', en: 'Scholarly Family' }, desc: { zh: '智力+1, 家境+1', en: 'INT+1, MNY+1' }, effects: { int: 1, mny: 1 } },
        { id: 4, grade: 0, name: { zh: '乐天派', en: 'Optimist' }, desc: { zh: '快乐+2', en: 'SPR+2' }, effects: { spr: 2 } },
        { id: 5, grade: 0, name: { zh: '小镇做题家', en: 'Small Town Scholar' }, desc: { zh: '智力+2', en: 'INT+2' }, effects: { int: 2 } },
        { id: 6, grade: 0, name: { zh: '运动基因', en: 'Athletic Genes' }, desc: { zh: '体质+1, 快乐+1', en: 'STR+1, SPR+1' }, effects: { str: 1, spr: 1 } },
        { id: 7, grade: 0, name: { zh: '社交达人', en: 'Social Butterfly' }, desc: { zh: '颜值+1, 快乐+1', en: 'CHR+1, SPR+1' }, effects: { chr: 1, spr: 1 } },
        { id: 8, grade: 0, name: { zh: '吃货', en: 'Foodie' }, desc: { zh: '快乐+2, 体质-1', en: 'SPR+2, STR-1' }, effects: { spr: 2, str: -1 } },
        { id: 9, grade: 0, name: { zh: '好奇宝宝', en: 'Curious Mind' }, desc: { zh: '智力+1', en: 'INT+1' }, effects: { int: 1 } },
        { id: 10, grade: 0, name: { zh: '夜猫子', en: 'Night Owl' }, desc: { zh: '智力+1, 体质-1', en: 'INT+1, STR-1' }, effects: { int: 1, str: -1 } },

        { id: 11, grade: 1, name: { zh: '天生丽质', en: 'Natural Beauty' }, desc: { zh: '颜值+3', en: 'CHR+3' }, effects: { chr: 3 } },
        { id: 12, grade: 1, name: { zh: '神童', en: 'Prodigy' }, desc: { zh: '智力+3', en: 'INT+3' }, effects: { int: 3 } },
        { id: 13, grade: 1, name: { zh: '钢铁之躯', en: 'Iron Body' }, desc: { zh: '体质+3', en: 'STR+3' }, effects: { str: 3 } },
        { id: 14, grade: 1, name: { zh: '小康之家', en: 'Well-off Family' }, desc: { zh: '家境+3', en: 'MNY+3' }, effects: { mny: 3 } },
        { id: 15, grade: 1, name: { zh: '万人迷', en: 'Charmer' }, desc: { zh: '颜值+2, 快乐+1', en: 'CHR+2, SPR+1' }, effects: { chr: 2, spr: 1 } },
        { id: 16, grade: 1, name: { zh: '过目不忘', en: 'Photographic Memory' }, desc: { zh: '智力+2, 体质-1', en: 'INT+2, STR-1' }, effects: { int: 2, str: -1 } },
        { id: 17, grade: 1, name: { zh: '人脉广泛', en: 'Well-Connected' }, desc: { zh: '家境+2, 颜值+1', en: 'MNY+2, CHR+1' }, effects: { mny: 2, chr: 1 } },
        { id: 18, grade: 1, name: { zh: '佛系青年', en: 'Zen Youth' }, desc: { zh: '快乐+3, 智力-1', en: 'SPR+3, INT-1' }, effects: { spr: 3, int: -1 } },
        { id: 19, grade: 1, name: { zh: '手艺人', en: 'Artisan' }, desc: { zh: '颜值+1, 智力+1, 快乐+1', en: 'CHR+1,INT+1,SPR+1' }, effects: { chr: 1, int: 1, spr: 1 } },
        { id: 20, grade: 1, name: { zh: '铁饭碗', en: 'Secure Job' }, desc: { zh: '家境+2, 快乐+1', en: 'MNY+2,SPR+1' }, effects: { mny: 2, spr: 1 } },

        { id: 21, grade: 2, name: { zh: '倾国倾城', en: 'Devastating Beauty' }, desc: { zh: '颜值+5', en: 'CHR+5' }, effects: { chr: 5 } },
        { id: 22, grade: 2, name: { zh: '天才', en: 'Genius' }, desc: { zh: '智力+5', en: 'INT+5' }, effects: { int: 5 } },
        { id: 23, grade: 2, name: { zh: '不死之身', en: 'Immortal Body' }, desc: { zh: '体质+5', en: 'STR+5' }, effects: { str: 5 } },
        { id: 24, grade: 2, name: { zh: '豪门子弟', en: 'Old Money' }, desc: { zh: '家境+5', en: 'MNY+5' }, effects: { mny: 5 } },
        { id: 25, grade: 2, name: { zh: '幸运儿', en: 'Lucky One' }, desc: { zh: '全属性+1', en: 'All Stats +1' }, effects: { chr: 1, int: 1, str: 1, mny: 1, spr: 1 } },
        { id: 26, grade: 2, name: { zh: '阳光开朗大男/女孩', en: 'Sunshine' }, desc: { zh: '颜值+2, 快乐+3', en: 'CHR+2, SPR+3' }, effects: { chr: 2, spr: 3 } },
        { id: 27, grade: 2, name: { zh: '财运亨通', en: 'Fortune Favors' }, desc: { zh: '家境+3, 快乐+2', en: 'MNY+3, SPR+2' }, effects: { mny: 3, spr: 2 } },
        { id: 28, grade: 2, name: { zh: '学霸基因', en: 'Top Student DNA' }, desc: { zh: '智力+3, 家境+2', en: 'INT+3, MNY+2' }, effects: { int: 3, mny: 2 } },
        { id: 29, grade: 2, name: { zh: '体育天才', en: 'Sports Genius' }, desc: { zh: '体质+4, 颜值+1', en: 'STR+4, CHR+1' }, effects: { str: 4, chr: 1 } },
        { id: 30, grade: 2, name: { zh: '命中注定', en: 'Destined' }, desc: { zh: '随机两项属性+3', en: 'Random 2 stats +3' }, effects: { _random2: 3 } },

        { id: 31, grade: 3, name: { zh: '龙傲天', en: 'Chosen One' }, desc: { zh: '全属性+2', en: 'All Stats +2' }, effects: { chr: 2, int: 2, str: 2, mny: 2, spr: 2 } },
        { id: 32, grade: 3, name: { zh: '转世重生', en: 'Reincarnated' }, desc: { zh: '智力+5, 快乐+3', en: 'INT+5, SPR+3' }, effects: { int: 5, spr: 3 } },
        { id: 33, grade: 3, name: { zh: '天选之子', en: 'Heaven\'s Child' }, desc: { zh: '体质+4, 家境+4', en: 'STR+4, MNY+4' }, effects: { str: 4, mny: 4 } },
        { id: 34, grade: 3, name: { zh: '绝世容颜', en: 'Peerless Beauty' }, desc: { zh: '颜值+6, 快乐+2', en: 'CHR+6, SPR+2' }, effects: { chr: 6, spr: 2 } },
        { id: 35, grade: 3, name: { zh: '首富之子', en: 'Heir of Fortune' }, desc: { zh: '家境+8', en: 'MNY+8' }, effects: { mny: 8 } },
        { id: 36, grade: 3, name: { zh: '逆天改命', en: 'Defy Destiny' }, desc: { zh: '可再分配5点', en: '+5 allocation pts' }, effects: { _extraPoints: 5 } },
        { id: 37, grade: 3, name: { zh: '主角光环', en: 'Protagonist Halo' }, desc: { zh: '坏事减半，好事加倍', en: 'Bad halved, Good doubled' }, effects: { _protagonist: true } },
        { id: 38, grade: 2, name: { zh: '音乐天赋', en: 'Musical Talent' }, desc: { zh: '颜值+2, 快乐+2', en: 'CHR+2, SPR+2' }, effects: { chr: 2, spr: 2 } },
        { id: 39, grade: 1, name: { zh: '大胃王', en: 'Big Eater' }, desc: { zh: '体质+2, 快乐+1', en: 'STR+2, SPR+1' }, effects: { str: 2, spr: 1 } },
        { id: 40, grade: 1, name: { zh: '早起鸟', en: 'Early Bird' }, desc: { zh: '体质+1, 智力+1', en: 'STR+1, INT+1' }, effects: { str: 1, int: 1 } },
        { id: 41, grade: 0, name: { zh: '路人甲', en: 'Extra' }, desc: { zh: '颜值+1', en: 'CHR+1' }, effects: { chr: 1 } },
        { id: 42, grade: 2, name: { zh: '编程鬼才', en: 'Coding Wizard' }, desc: { zh: '智力+4, 快乐+1', en: 'INT+4, SPR+1' }, effects: { int: 4, spr: 1 } },
        { id: 43, grade: 1, name: { zh: '啃老一族', en: 'NEET' }, desc: { zh: '家境+2, 快乐+2, 体质-2', en: 'MNY+2, SPR+2, STR-2' }, effects: { mny: 2, spr: 2, str: -2 } },
        { id: 44, grade: 0, name: { zh: '玻璃心', en: 'Fragile Heart' }, desc: { zh: '快乐-1', en: 'SPR-1' }, effects: { spr: -1 } },
        { id: 45, grade: 1, name: { zh: '语言天赋', en: 'Linguist' }, desc: { zh: '智力+2, 颜值+1', en: 'INT+2, CHR+1' }, effects: { int: 2, chr: 1 } },
    ];

    // ========== 事件数据 ==========
    // 每个事件: { text:{zh,en}, effects:{}, cond:{} }
    // cond: { minAge, maxAge, minXxx, maxXxx, hasTag, noTag, chance }
    // effects: { chr, int, str, mny, spr, tag: 'xxx', die: true }

    const EVENTS = [
        // ===== 出生 (0岁) =====
        { text: { zh: '你出生了，是个哭声响亮的婴儿。', en: 'You were born, a loud-crying baby.' }, cond: { minAge: 0, maxAge: 0 }, effects: {} },
        { text: { zh: '你出生了，全家人都很高兴。', en: 'You were born, the whole family rejoiced.' }, cond: { minAge: 0, maxAge: 0, minMny: 5 }, effects: { spr: 1 } },
        { text: { zh: '你出生了，家里经济困难，但父母依然爱你。', en: 'Born into a poor family, but your parents love you dearly.' }, cond: { minAge: 0, maxAge: 0, maxMny: 3 }, effects: {} },
        { text: { zh: '你出生了，医生说你特别健康。', en: 'You were born, the doctor said you are very healthy.' }, cond: { minAge: 0, maxAge: 0, minStr: 7 }, effects: { str: 1 } },
        { text: { zh: '你出生了，护士说你长得真好看。', en: 'A nurse said you are a beautiful baby.' }, cond: { minAge: 0, maxAge: 0, minChr: 7 }, effects: {} },

        // ===== 婴儿期 (1-3) =====
        { text: { zh: '你学会了走路，虽然经常摔倒。', en: 'You learned to walk, though you fell a lot.' }, cond: { minAge: 1, maxAge: 1 }, effects: {} },
        { text: { zh: '你说出了第一个词：「妈妈」。', en: 'You said your first word: "Mama".' }, cond: { minAge: 1, maxAge: 2 }, effects: { spr: 1 } },
        { text: { zh: '你开始对一切都充满好奇。', en: 'You became curious about everything.' }, cond: { minAge: 1, maxAge: 2, minInt: 5 }, effects: { int: 1 } },
        { text: { zh: '你被邻居阿姨夸长得可爱。', en: 'The neighbor auntie said you are adorable.' }, cond: { minAge: 1, maxAge: 3, minChr: 5 }, effects: {} },
        { text: { zh: '你把家里的花瓶打碎了。', en: 'You broke a vase at home.' }, cond: { minAge: 2, maxAge: 3 }, effects: {} },
        { text: { zh: '你生了一场病，幸好很快康复了。', en: 'You got sick but recovered quickly.' }, cond: { minAge: 1, maxAge: 3, maxStr: 4 }, effects: { str: -1 } },
        { text: { zh: '你发现了电视遥控器的奥秘，整天换台。', en: 'You discovered the TV remote and kept switching channels.' }, cond: { minAge: 2, maxAge: 3 }, effects: {} },
        { text: { zh: '你被送到奶奶家照顾，奶奶很疼你。', en: 'You were sent to grandma\'s, she spoiled you.' }, cond: { minAge: 1, maxAge: 3 }, effects: { spr: 1 } },
        { text: { zh: '你有了一个弟弟/妹妹。', en: 'You got a baby sibling.' }, cond: { minAge: 2, maxAge: 3, chance: 0.3 }, effects: { tag: 'sibling' } },
        { text: { zh: '你学会了用勺子自己吃饭。', en: 'You learned to eat with a spoon by yourself.' }, cond: { minAge: 2, maxAge: 3 }, effects: {} },

        // ===== 幼儿园 (3-5) =====
        { text: { zh: '你进了幼儿园，第一天哭了一整天。', en: 'First day at kindergarten — you cried all day.' }, cond: { minAge: 3, maxAge: 3 }, effects: {} },
        { text: { zh: '你在幼儿园交到了第一个好朋友。', en: 'You made your first best friend at kindergarten.' }, cond: { minAge: 3, maxAge: 5, minChr: 4 }, effects: { spr: 1, tag: 'early_friend' } },
        { text: { zh: '你在幼儿园学会了画画，老师夸你有天赋。', en: 'You learned to draw, the teacher praised your talent.' }, cond: { minAge: 3, maxAge: 5 }, effects: { tag: 'art' } },
        { text: { zh: '你在幼儿园表演节目，获得了掌声。', en: 'You performed at kindergarten and got applause.' }, cond: { minAge: 4, maxAge: 5, minChr: 5 }, effects: { chr: 1, spr: 1 } },
        { text: { zh: '你在幼儿园被小朋友欺负了。', en: 'You were bullied by other kids at kindergarten.' }, cond: { minAge: 3, maxAge: 5, maxChr: 4, maxStr: 4 }, effects: { spr: -1 } },
        { text: { zh: '你学会了骑小三轮车。', en: 'You learned to ride a tricycle.' }, cond: { minAge: 3, maxAge: 5 }, effects: {} },
        { text: { zh: '你特别喜欢看动画片。', en: 'You became obsessed with cartoons.' }, cond: { minAge: 3, maxAge: 5 }, effects: { spr: 1 } },
        { text: { zh: '你开始认字了，比同龄人快很多。', en: 'You started reading, much faster than peers.' }, cond: { minAge: 4, maxAge: 5, minInt: 6 }, effects: { int: 1 } },
        { text: { zh: '爸妈给你报了兴趣班。', en: 'Your parents signed you up for classes.' }, cond: { minAge: 4, maxAge: 5, minMny: 5 }, effects: { int: 1 } },
        { text: { zh: '你把幼儿园的金鱼带回了家。', en: 'You brought the kindergarten goldfish home.' }, cond: { minAge: 4, maxAge: 5, chance: 0.3 }, effects: {} },

        // ===== 小学 (6-11) =====
        { text: { zh: '你上小学了，背着新书包很开心。', en: 'You started primary school with a brand new backpack.' }, cond: { minAge: 6, maxAge: 6 }, effects: {} },
        { text: { zh: '你的成绩在班上名列前茅。', en: 'Your grades rank top in class.' }, cond: { minAge: 6, maxAge: 11, minInt: 6 }, effects: { int: 1, spr: 1 } },
        { text: { zh: '你数学不太好，经常考不及格。', en: 'Your math is poor, you often fail.' }, cond: { minAge: 6, maxAge: 11, maxInt: 3 }, effects: { spr: -1 } },
        { text: { zh: '你参加了学校运动会，拿了奖。', en: 'You won a prize at the school sports meet.' }, cond: { minAge: 7, maxAge: 11, minStr: 6 }, effects: { str: 1, chr: 1, tag: 'sports_award' } },
        { text: { zh: '你在同学中很受欢迎。', en: 'You are popular among classmates.' }, cond: { minAge: 7, maxAge: 11, minChr: 6 }, effects: { spr: 1 } },
        { text: { zh: '你被选为班长。', en: 'You were elected class monitor.' }, cond: { minAge: 7, maxAge: 11, minInt: 5, minChr: 5 }, effects: { chr: 1, tag: 'class_leader' } },
        { text: { zh: '你开始戴眼镜了。', en: 'You started wearing glasses.' }, cond: { minAge: 8, maxAge: 11, minInt: 6, chance: 0.4 }, effects: { chr: -1, tag: 'glasses' } },
        { text: { zh: '你迷上了电子游戏。', en: 'You got addicted to video games.' }, cond: { minAge: 8, maxAge: 11 }, effects: { spr: 1, int: -1, tag: 'gamer' } },
        { text: { zh: '你发现自己对编程有兴趣。', en: 'You discovered interest in programming.' }, cond: { minAge: 9, maxAge: 11, minInt: 7 }, effects: { int: 2, tag: 'coding' } },
        { text: { zh: '你参加了绘画比赛，获得了三等奖。', en: 'You won 3rd prize in a drawing contest.' }, cond: { minAge: 7, maxAge: 11, hasTag: 'art', chance: 0.5 }, effects: { chr: 1 } },
        { text: { zh: '你养了一只小狗/小猫。', en: 'You got a pet dog/cat.' }, cond: { minAge: 7, maxAge: 11, chance: 0.3 }, effects: { spr: 1, tag: 'pet' } },
        { text: { zh: '你在学校打架，被叫了家长。', en: 'You got into a fight, your parents were called.' }, cond: { minAge: 8, maxAge: 11, maxSpr: 4, chance: 0.3 }, effects: { str: 1, spr: -1 } },
        { text: { zh: '你转学了，来到一个新环境。', en: 'You transferred to a new school.' }, cond: { minAge: 8, maxAge: 11, chance: 0.15 }, effects: { tag: 'transfer' } },
        { text: { zh: '暑假你去旅游了，看到了大海。', en: 'You saw the ocean for the first time during summer.' }, cond: { minAge: 7, maxAge: 11, minMny: 4, chance: 0.3 }, effects: { spr: 1 } },
        { text: { zh: '你学会了游泳。', en: 'You learned to swim.' }, cond: { minAge: 7, maxAge: 11, minStr: 4 }, effects: { str: 1, tag: 'swim' } },
        { text: { zh: '你参加了奥数竞赛。', en: 'You joined a math olympiad.' }, cond: { minAge: 9, maxAge: 11, minInt: 7 }, effects: { int: 1, tag: 'olympiad' } },
        { text: { zh: '你在作文比赛中获奖。', en: 'You won an essay writing contest.' }, cond: { minAge: 8, maxAge: 11, minInt: 6, chance: 0.3 }, effects: { int: 1, chr: 1 } },
        { text: { zh: '你开始学钢琴/小提琴。', en: 'You started learning piano/violin.' }, cond: { minAge: 6, maxAge: 10, minMny: 5, chance: 0.3 }, effects: { chr: 1, spr: -1, tag: 'music' } },
        { text: { zh: '你不小心摔断了手臂。', en: 'You accidentally broke your arm.' }, cond: { minAge: 6, maxAge: 11, chance: 0.1 }, effects: { str: -1, spr: -1 } },
        { text: { zh: '你在学校大扫除时特别积极。', en: 'You were very active during school cleanup.' }, cond: { minAge: 6, maxAge: 11 }, effects: {} },
        { text: { zh: '爸妈吵架了，你偷偷躲在被子里哭。', en: 'Your parents had a big fight, you cried under the blanket.' }, cond: { minAge: 7, maxAge: 11, maxSpr: 5, chance: 0.2 }, effects: { spr: -2, tag: 'family_conflict' } },
        { text: { zh: '你喜欢上了隔壁班的同学。', en: 'You developed a crush on a classmate.' }, cond: { minAge: 10, maxAge: 11, chance: 0.3 }, effects: { tag: 'puppy_love' } },

        // ===== 初中 (12-14) =====
        { text: { zh: '你升入了初中，感觉一切都很新鲜。', en: 'You entered middle school, everything feels new.' }, cond: { minAge: 12, maxAge: 12 }, effects: {} },
        { text: { zh: '你进入了重点班。', en: 'You were placed in the honors class.' }, cond: { minAge: 12, maxAge: 12, minInt: 7 }, effects: { int: 1, tag: 'honors' } },
        { text: { zh: '你的身高突然猛长。', en: 'You had a sudden growth spurt.' }, cond: { minAge: 12, maxAge: 14, minStr: 5 }, effects: { chr: 1, str: 1 } },
        { text: { zh: '你开始叛逆期了，跟父母吵了好几次。', en: 'Rebellious phase — you fought with parents a lot.' }, cond: { minAge: 12, maxAge: 14, chance: 0.4 }, effects: { spr: -1, tag: 'rebel' } },
        { text: { zh: '你考了年级第一名！', en: 'You ranked #1 in your grade!' }, cond: { minAge: 12, maxAge: 14, minInt: 8 }, effects: { int: 2, spr: 1, chr: 1 } },
        { text: { zh: '你开始打篮球，很快成为校队成员。', en: 'You started playing basketball and joined the school team.' }, cond: { minAge: 12, maxAge: 14, minStr: 6, chance: 0.4 }, effects: { str: 1, chr: 1, tag: 'basketball' } },
        { text: { zh: '你沉迷网络小说，成绩下滑。', en: 'You got addicted to online novels, grades dropped.' }, cond: { minAge: 12, maxAge: 14, chance: 0.25 }, effects: { int: -1, spr: 1 } },
        { text: { zh: '你初恋了，每天很开心也很忐忑。', en: 'You had your first love, exciting and nervous.' }, cond: { minAge: 13, maxAge: 14, minChr: 5, chance: 0.35 }, effects: { spr: 2, int: -1, tag: 'first_love' } },
        { text: { zh: '你获得了市级竞赛奖项。', en: 'You won a city-level competition award.' }, cond: { minAge: 12, maxAge: 14, minInt: 8, hasTag: 'olympiad' }, effects: { int: 2, tag: 'city_award' } },
        { text: { zh: '你参加了学校合唱团。', en: 'You joined the school choir.' }, cond: { minAge: 12, maxAge: 14, chance: 0.2 }, effects: { spr: 1, tag: 'choir' } },
        { text: { zh: '你和好朋友闹翻了。', en: 'You had a falling out with your best friend.' }, cond: { minAge: 12, maxAge: 14, chance: 0.2 }, effects: { spr: -2 } },
        { text: { zh: '你开始关注自己的外表。', en: 'You started caring about your appearance.' }, cond: { minAge: 12, maxAge: 14 }, effects: { chr: 1 } },
        { text: { zh: '你在学校的文艺汇演中大放异彩。', en: 'You shone at the school talent show.' }, cond: { minAge: 12, maxAge: 14, minChr: 6, chance: 0.3 }, effects: { chr: 2, spr: 1 } },

        // ===== 高中 (15-17) =====
        { text: { zh: '你考上了重点高中。', en: 'You got into a top high school.' }, cond: { minAge: 15, maxAge: 15, minInt: 7 }, effects: { int: 1, tag: 'top_hs' } },
        { text: { zh: '你进入了普通高中。', en: 'You entered a regular high school.' }, cond: { minAge: 15, maxAge: 15, maxInt: 6 }, effects: {} },
        { text: { zh: '高中的学习压力让你喘不过气。', en: 'High school pressure is overwhelming.' }, cond: { minAge: 15, maxAge: 17 }, effects: { spr: -1 } },
        { text: { zh: '你参加了物理竞赛，获得省级奖项。', en: 'You won a provincial physics competition.' }, cond: { minAge: 15, maxAge: 17, minInt: 9 }, effects: { int: 2, tag: 'province_award' } },
        { text: { zh: '你谈恋爱了，偷偷摸摸的。', en: 'You started dating secretly.' }, cond: { minAge: 15, maxAge: 17, minChr: 5, chance: 0.3, noTag: 'first_love' }, effects: { spr: 1, tag: 'first_love' } },
        { text: { zh: '你被老师表扬了学习态度。', en: 'The teacher praised your study attitude.' }, cond: { minAge: 15, maxAge: 17, minInt: 6 }, effects: { spr: 1 } },
        { text: { zh: '你在运动会上拿了冠军。', en: 'You won the championship at sports day.' }, cond: { minAge: 15, maxAge: 17, minStr: 7 }, effects: { str: 1, chr: 1 } },
        { text: { zh: '高考临近，你拼命复习。', en: 'The college entrance exam is near, you studied hard.' }, cond: { minAge: 17, maxAge: 17 }, effects: { int: 1, str: -1 } },
        { text: { zh: '你高中毕业了，和朋友们合影留念。', en: 'Graduation! You took photos with friends.' }, cond: { minAge: 17, maxAge: 17 }, effects: { spr: 1 } },
        { text: { zh: '你发现了自己对音乐的热爱。', en: 'You discovered your passion for music.' }, cond: { minAge: 15, maxAge: 17, chance: 0.2 }, effects: { spr: 2, tag: 'music_passion' } },
        { text: { zh: '你开始健身，体型变好了。', en: 'You started working out and got in shape.' }, cond: { minAge: 15, maxAge: 17, minStr: 5 }, effects: { str: 1, chr: 1 } },
        { text: { zh: '你参加了学校辩论队。', en: 'You joined the school debate team.' }, cond: { minAge: 15, maxAge: 17, minInt: 6, chance: 0.25 }, effects: { int: 1, chr: 1, tag: 'debate' } },
        { text: { zh: '你考试作弊被抓了。', en: 'You were caught cheating on an exam.' }, cond: { minAge: 15, maxAge: 17, maxInt: 4, chance: 0.15 }, effects: { spr: -2, chr: -1 } },
        { text: { zh: '你暑假去打工赚了第一笔钱。', en: 'You earned your first paycheck from a summer job.' }, cond: { minAge: 16, maxAge: 17, chance: 0.3 }, effects: { mny: 1, tag: 'first_job' } },

        // ===== 大学/青年 (18-22) =====
        { text: { zh: '你考上了985/211大学！', en: 'You got into a top university!' }, cond: { minAge: 18, maxAge: 18, minInt: 8 }, effects: { int: 2, mny: 1, spr: 2, tag: 'top_uni' } },
        { text: { zh: '你考上了一本大学。', en: 'You got into a tier-1 university.' }, cond: { minAge: 18, maxAge: 18, minInt: 6, maxInt: 7 }, effects: { int: 1, tag: 'uni' } },
        { text: { zh: '你考上了普通大学。', en: 'You got into a regular university.' }, cond: { minAge: 18, maxAge: 18, minInt: 4, maxInt: 5 }, effects: { tag: 'uni' } },
        { text: { zh: '你没考上大学，决定去打工。', en: 'You didn\'t get into college, decided to work.' }, cond: { minAge: 18, maxAge: 18, maxInt: 3 }, effects: { mny: -1, tag: 'no_uni' } },
        { text: { zh: '你选择了出国留学。', en: 'You chose to study abroad.' }, cond: { minAge: 18, maxAge: 18, minMny: 8, minInt: 6 }, effects: { int: 2, mny: -2, tag: 'abroad' } },
        { text: { zh: '你加入了大学社团，认识了很多朋友。', en: 'You joined a university club and made many friends.' }, cond: { minAge: 18, maxAge: 20, hasTag: 'uni', chance: 0.5 }, effects: { chr: 1, spr: 1 } },
        { text: { zh: '你在大学里拿了奖学金。', en: 'You won a scholarship in college.' }, cond: { minAge: 19, maxAge: 21, minInt: 7, hasTag: 'uni' }, effects: { mny: 1, int: 1 } },
        { text: { zh: '你在大学里谈了一段甜蜜的恋爱。', en: 'You had a sweet romance in college.' }, cond: { minAge: 18, maxAge: 22, minChr: 5, chance: 0.4 }, effects: { spr: 2, tag: 'college_love' } },
        { text: { zh: '你大学毕业了。', en: 'You graduated from college.' }, cond: { minAge: 22, maxAge: 22, hasTag: 'uni' }, effects: { tag: 'graduated' } },
        { text: { zh: '你开始实习，感受到了社会的残酷。', en: 'You started interning and felt the harshness of reality.' }, cond: { minAge: 20, maxAge: 22 }, effects: { spr: -1, mny: 1 } },
        { text: { zh: '你通过了英语六级。', en: 'You passed the CET-6 English exam.' }, cond: { minAge: 19, maxAge: 22, minInt: 6, hasTag: 'uni', chance: 0.5 }, effects: { int: 1 } },
        { text: { zh: '你在大学创业了！', en: 'You started a business in college!' }, cond: { minAge: 19, maxAge: 22, minInt: 7, minMny: 5, chance: 0.15 }, effects: { mny: 2, tag: 'startup' } },
        { text: { zh: '你整天打游戏，挂了好几科。', en: 'You played games all day and failed several courses.' }, cond: { minAge: 18, maxAge: 22, hasTag: 'gamer', maxInt: 5, chance: 0.3 }, effects: { int: -2, spr: 1 } },
        { text: { zh: '你成为了学生会主席。', en: 'You became student council president.' }, cond: { minAge: 19, maxAge: 21, minChr: 6, minInt: 6, chance: 0.2 }, effects: { chr: 2, tag: 'student_president' } },
        { text: { zh: '你去旅行，背包走了很多地方。', en: 'You backpacked and traveled many places.' }, cond: { minAge: 19, maxAge: 22, minMny: 4, chance: 0.3 }, effects: { spr: 2, tag: 'traveler' } },
        { text: { zh: '你学会了做饭，经常给室友做好吃的。', en: 'You learned to cook and often made food for roommates.' }, cond: { minAge: 18, maxAge: 22, chance: 0.25 }, effects: { spr: 1, chr: 1, tag: 'cooking' } },

        // ===== 初入职场 (23-27) =====
        { text: { zh: '你找到了第一份正式工作。', en: 'You got your first real job.' }, cond: { minAge: 23, maxAge: 23 }, effects: { mny: 1 } },
        { text: { zh: '你进入了大公司，待遇不错。', en: 'You joined a big company with good pay.' }, cond: { minAge: 23, maxAge: 24, minInt: 7, hasTag: 'graduated' }, effects: { mny: 2, tag: 'big_company' } },
        { text: { zh: '你进入了互联网行业。', en: 'You entered the tech industry.' }, cond: { minAge: 23, maxAge: 25, minInt: 6, chance: 0.3 }, effects: { mny: 2, str: -1, tag: 'tech' } },
        { text: { zh: '你的工作很无聊，每天都想辞职。', en: 'Your job is boring, you want to quit every day.' }, cond: { minAge: 23, maxAge: 27, maxSpr: 4 }, effects: { spr: -1 } },
        { text: { zh: '你升职加薪了！', en: 'You got a promotion and raise!' }, cond: { minAge: 24, maxAge: 27, minInt: 6 }, effects: { mny: 2, spr: 1, tag: 'promotion' } },
        { text: { zh: '你跟同事成了好朋友。', en: 'You became good friends with a colleague.' }, cond: { minAge: 23, maxAge: 27, minChr: 5 }, effects: { spr: 1 } },
        { text: { zh: '你被裁员了。', en: 'You were laid off.' }, cond: { minAge: 24, maxAge: 27, chance: 0.15 }, effects: { mny: -2, spr: -2, tag: 'laid_off' } },
        { text: { zh: '你开始996工作，身心俱疲。', en: 'You started working 996, physically and mentally exhausted.' }, cond: { minAge: 23, maxAge: 27, hasTag: 'tech' }, effects: { mny: 2, str: -2, spr: -2, tag: '996' } },
        { text: { zh: '你攒了一些钱，开始理财。', en: 'You saved some money and started investing.' }, cond: { minAge: 24, maxAge: 27, minMny: 5 }, effects: { mny: 1, tag: 'invest' } },
        { text: { zh: '你遇到了人生伴侣。', en: 'You met your life partner.' }, cond: { minAge: 24, maxAge: 27, minChr: 5, chance: 0.35 }, effects: { spr: 3, tag: 'partner' } },
        { text: { zh: '你买了人生第一辆车。', en: 'You bought your first car.' }, cond: { minAge: 24, maxAge: 27, minMny: 6 }, effects: { chr: 1, mny: -1, tag: 'car' } },
        { text: { zh: '你在同学聚会上感慨万千。', en: 'You felt nostalgic at a class reunion.' }, cond: { minAge: 25, maxAge: 27, chance: 0.3 }, effects: { spr: 1 } },
        { text: { zh: '你开始学习新的技能提升自己。', en: 'You started learning new skills to improve yourself.' }, cond: { minAge: 23, maxAge: 27 }, effects: { int: 1 } },
        { text: { zh: '你的宠物去世了，你很伤心。', en: 'Your pet passed away, you were heartbroken.' }, cond: { minAge: 23, maxAge: 27, hasTag: 'pet', chance: 0.4 }, effects: { spr: -2 } },
        { text: { zh: '你在公司内部创新大赛中获奖。', en: 'You won an innovation award at your company.' }, cond: { minAge: 24, maxAge: 27, minInt: 7, chance: 0.2 }, effects: { int: 1, mny: 1 } },

        // ===== 而立之年 (28-35) =====
        { text: { zh: '你结婚了！婚礼很温馨。', en: 'You got married! The wedding was lovely.' }, cond: { minAge: 28, maxAge: 32, hasTag: 'partner', noTag: 'married' }, effects: { spr: 3, mny: -2, tag: 'married' } },
        { text: { zh: '家里催婚压力越来越大。', en: 'Family pressure to get married is mounting.' }, cond: { minAge: 28, maxAge: 33, noTag: 'partner' }, effects: { spr: -2 } },
        { text: { zh: '你有了自己的孩子！', en: 'You had a baby!' }, cond: { minAge: 28, maxAge: 35, hasTag: 'married', noTag: 'parent' }, effects: { spr: 3, mny: -2, str: -1, tag: 'parent' } },
        { text: { zh: '你跳槽到了更好的公司。', en: 'You changed to a better company.' }, cond: { minAge: 28, maxAge: 33, minInt: 6 }, effects: { mny: 2 } },
        { text: { zh: '你买了房子，背上了房贷。', en: 'You bought a house with a mortgage.' }, cond: { minAge: 28, maxAge: 35, minMny: 5, noTag: 'house' }, effects: { mny: -3, spr: 1, tag: 'house' } },
        { text: { zh: '你成为了部门经理。', en: 'You became a department manager.' }, cond: { minAge: 29, maxAge: 35, minInt: 7, minChr: 5 }, effects: { mny: 2, chr: 1, tag: 'manager' } },
        { text: { zh: '你决定创业，辞去了稳定的工作。', en: 'You quit your stable job to start a business.' }, cond: { minAge: 28, maxAge: 35, minInt: 7, chance: 0.15 }, effects: { mny: -2, tag: 'entrepreneur' } },
        { text: { zh: '你的创业成功了！公司开始盈利。', en: 'Your startup succeeded! The company is profitable.' }, cond: { minAge: 29, maxAge: 35, hasTag: 'entrepreneur', minInt: 7, chance: 0.4 }, effects: { mny: 5, spr: 3, tag: 'biz_success' } },
        { text: { zh: '你的创业失败了，损失惨重。', en: 'Your startup failed, heavy losses.' }, cond: { minAge: 29, maxAge: 35, hasTag: 'entrepreneur', noTag: 'biz_success', chance: 0.5 }, effects: { mny: -4, spr: -3 } },
        { text: { zh: '你开始脱发了……', en: 'You started losing hair...' }, cond: { minAge: 28, maxAge: 35, chance: 0.3 }, effects: { chr: -1 } },
        { text: { zh: '你带孩子去了迪士尼，度过了美好的一天。', en: 'You took your kid to Disneyland, a wonderful day.' }, cond: { minAge: 30, maxAge: 35, hasTag: 'parent', minMny: 4 }, effects: { spr: 2 } },
        { text: { zh: '你的体重开始不受控制地增长。', en: 'Your weight started growing out of control.' }, cond: { minAge: 28, maxAge: 35, maxStr: 4, chance: 0.3 }, effects: { chr: -1, str: -1 } },
        { text: { zh: '你和伴侣吵了一次大架。', en: 'You had a big fight with your spouse.' }, cond: { minAge: 28, maxAge: 35, hasTag: 'married', chance: 0.2 }, effects: { spr: -2 } },
        { text: { zh: '你出版了一本书。', en: 'You published a book.' }, cond: { minAge: 28, maxAge: 35, minInt: 8, chance: 0.1 }, effects: { int: 1, chr: 1, mny: 1, tag: 'author' } },
        { text: { zh: '你的投资赚了一笔。', en: 'Your investment paid off nicely.' }, cond: { minAge: 28, maxAge: 35, hasTag: 'invest', minInt: 6, chance: 0.4 }, effects: { mny: 3 } },
        { text: { zh: '你开始关注养生。', en: 'You started focusing on health.' }, cond: { minAge: 30, maxAge: 35 }, effects: { str: 1, tag: 'health_conscious' } },

        // ===== 中年 (36-50) =====
        { text: { zh: '你成为了公司高管。', en: 'You became a company executive.' }, cond: { minAge: 36, maxAge: 45, hasTag: 'manager', minInt: 8 }, effects: { mny: 3, tag: 'executive' } },
        { text: { zh: '你在行业内小有名气。', en: 'You became well-known in your industry.' }, cond: { minAge: 36, maxAge: 45, minInt: 8, minChr: 6 }, effects: { chr: 2, mny: 1, tag: 'famous' } },
        { text: { zh: '你经历了中年危机。', en: 'You went through a midlife crisis.' }, cond: { minAge: 38, maxAge: 45, maxSpr: 5 }, effects: { spr: -3 } },
        { text: { zh: '你的孩子上小学了，成绩还不错。', en: 'Your child started school and is doing well.' }, cond: { minAge: 36, maxAge: 42, hasTag: 'parent' }, effects: { spr: 1 } },
        { text: { zh: '你体检发现了一些小问题，开始注意健康。', en: 'A checkup found some issues, you start watching your health.' }, cond: { minAge: 36, maxAge: 50, chance: 0.3 }, effects: { str: -1, tag: 'health_warning' } },
        { text: { zh: '你升职成了总监。', en: 'You were promoted to director.' }, cond: { minAge: 36, maxAge: 45, hasTag: 'executive', minInt: 8, chance: 0.5 }, effects: { mny: 3 } },
        { text: { zh: '你学会了一项新的爱好：钓鱼。', en: 'You picked up a new hobby: fishing.' }, cond: { minAge: 36, maxAge: 50, chance: 0.2 }, effects: { spr: 2, tag: 'fishing' } },
        { text: { zh: '你的父母年纪大了，你开始照顾他们。', en: 'Your parents are aging, you started caring for them.' }, cond: { minAge: 40, maxAge: 50 }, effects: { spr: -1, mny: -1, tag: 'caring_parents' } },
        { text: { zh: '你换了更大的房子。', en: 'You upgraded to a bigger house.' }, cond: { minAge: 36, maxAge: 45, minMny: 7, hasTag: 'house' }, effects: { mny: -3, spr: 1 } },
        { text: { zh: '你的孩子考上了好大学！', en: 'Your child got into a good university!' }, cond: { minAge: 42, maxAge: 50, hasTag: 'parent' }, effects: { spr: 3, mny: -2, tag: 'child_college' } },
        { text: { zh: '你开始考虑退休的事了。', en: 'You started thinking about retirement.' }, cond: { minAge: 45, maxAge: 50 }, effects: {} },
        { text: { zh: '你和人合伙做了一个项目，赚了不少。', en: 'You partnered on a project and made good money.' }, cond: { minAge: 36, maxAge: 50, minInt: 6, minMny: 5, chance: 0.2 }, effects: { mny: 3 } },
        { text: { zh: '你认识了一群志同道合的朋友。', en: 'You met a group of like-minded friends.' }, cond: { minAge: 36, maxAge: 50, minChr: 5, chance: 0.3 }, effects: { spr: 2 } },
        { text: { zh: '你的婚姻出了问题。', en: 'Your marriage hit a rough patch.' }, cond: { minAge: 36, maxAge: 50, hasTag: 'married', maxSpr: 4, chance: 0.2 }, effects: { spr: -3, tag: 'marriage_trouble' } },
        { text: { zh: '你离婚了。', en: 'You got divorced.' }, cond: { minAge: 38, maxAge: 50, hasTag: 'marriage_trouble', chance: 0.5 }, effects: { spr: -3, mny: -3, tag: 'divorced' } },
        { text: { zh: '你成为了行业专家。', en: 'You became an industry expert.' }, cond: { minAge: 40, maxAge: 50, minInt: 9 }, effects: { int: 2, mny: 2, tag: 'expert' } },
        { text: { zh: '你开始做慈善，捐了一笔钱。', en: 'You started doing charity, donated money.' }, cond: { minAge: 40, maxAge: 50, minMny: 8, chance: 0.2 }, effects: { mny: -2, spr: 2, chr: 1, tag: 'charity' } },
        { text: { zh: '你得了一场大病，但最终战胜了它。', en: 'You got seriously ill but eventually recovered.' }, cond: { minAge: 40, maxAge: 50, chance: 0.1 }, effects: { str: -3, spr: -2, mny: -2, tag: 'serious_illness' } },
        { text: { zh: '你的生意越做越大。', en: 'Your business keeps growing.' }, cond: { minAge: 36, maxAge: 50, hasTag: 'biz_success' }, effects: { mny: 3 } },

        // ===== 知天命 (51-60) =====
        { text: { zh: '你退休了，开始享受生活。', en: 'You retired and started enjoying life.' }, cond: { minAge: 55, maxAge: 60, noTag: 'biz_success' }, effects: { spr: 2, tag: 'retired' } },
        { text: { zh: '你开始学习书法/绘画。', en: 'You started learning calligraphy/painting.' }, cond: { minAge: 51, maxAge: 60, chance: 0.25 }, effects: { spr: 2, tag: 'art_hobby' } },
        { text: { zh: '你开始跳广场舞。', en: 'You started doing square dancing.' }, cond: { minAge: 51, maxAge: 60, chance: 0.3 }, effects: { str: 1, spr: 2 } },
        { text: { zh: '你的孩子结婚了！', en: 'Your child got married!' }, cond: { minAge: 51, maxAge: 60, hasTag: 'parent', noTag: 'child_married' }, effects: { spr: 2, mny: -2, tag: 'child_married' } },
        { text: { zh: '你有了孙子/孙女！', en: 'You became a grandparent!' }, cond: { minAge: 53, maxAge: 60, hasTag: 'child_married', noTag: 'grandparent' }, effects: { spr: 3, tag: 'grandparent' } },
        { text: { zh: '你的身体开始出现各种小毛病。', en: 'Your body started having various minor issues.' }, cond: { minAge: 51, maxAge: 60 }, effects: { str: -2 } },
        { text: { zh: '你去旅游，环游了世界。', en: 'You traveled around the world.' }, cond: { minAge: 51, maxAge: 60, minMny: 7, chance: 0.3 }, effects: { spr: 3, mny: -2, tag: 'world_travel' } },
        { text: { zh: '你的老朋友去世了，你很难过。', en: 'An old friend passed away, you were very sad.' }, cond: { minAge: 55, maxAge: 60, chance: 0.3 }, effects: { spr: -2 } },
        { text: { zh: '你写了回忆录。', en: 'You wrote a memoir.' }, cond: { minAge: 55, maxAge: 60, minInt: 7, chance: 0.15 }, effects: { spr: 1, tag: 'memoir' } },
        { text: { zh: '你每天在公园溜达，生活很惬意。', en: 'You take daily walks in the park, life is pleasant.' }, cond: { minAge: 55, maxAge: 60, minSpr: 5 }, effects: { spr: 1 } },
        { text: { zh: '你学会了用智能手机。', en: 'You learned to use a smartphone.' }, cond: { minAge: 51, maxAge: 60 }, effects: { int: 1, spr: 1 } },
        { text: { zh: '你开始带孙子/孙女，虽然累但很开心。', en: 'You started babysitting grandkids, tiring but joyful.' }, cond: { minAge: 55, maxAge: 60, hasTag: 'grandparent' }, effects: { spr: 2, str: -1 } },
        { text: { zh: '你在社区里很受尊敬。', en: 'You are well respected in your community.' }, cond: { minAge: 55, maxAge: 60, minChr: 6 }, effects: { spr: 1, chr: 1 } },

        // ===== 晚年 (61-80) =====
        { text: { zh: '你过了一个温馨的生日。', en: 'You had a warm birthday celebration.' }, cond: { minAge: 61, maxAge: 80 }, effects: { spr: 1 } },
        { text: { zh: '你的记忆力开始衰退。', en: 'Your memory started to decline.' }, cond: { minAge: 65, maxAge: 75, chance: 0.4 }, effects: { int: -2 } },
        { text: { zh: '你住进了养老院。', en: 'You moved into a nursing home.' }, cond: { minAge: 70, maxAge: 80, maxStr: 3 }, effects: { spr: -1, tag: 'nursing_home' } },
        { text: { zh: '你的伴侣去世了，你很悲伤。', en: 'Your spouse passed away, you were devastated.' }, cond: { minAge: 65, maxAge: 80, hasTag: 'married', noTag: 'spouse_died', chance: 0.3 }, effects: { spr: -5, tag: 'spouse_died' } },
        { text: { zh: '你抱着重孙，笑得合不拢嘴。', en: 'Holding your great-grandchild, smiling ear to ear.' }, cond: { minAge: 70, maxAge: 80, hasTag: 'grandparent', chance: 0.3 }, effects: { spr: 3, tag: 'great_grandparent' } },
        { text: { zh: '子女经常来看你，很孝顺。', en: 'Your children visit often, very filial.' }, cond: { minAge: 65, maxAge: 80, hasTag: 'parent', minSpr: 4 }, effects: { spr: 2 } },
        { text: { zh: '你每天坚持锻炼，身体还不错。', en: 'You exercise daily and stay healthy.' }, cond: { minAge: 65, maxAge: 80, minStr: 5 }, effects: { str: 1 } },
        { text: { zh: '你获得了一个社区终身成就奖。', en: 'You received a community lifetime achievement award.' }, cond: { minAge: 65, maxAge: 80, minChr: 7, chance: 0.2 }, effects: { spr: 2, chr: 1 } },
        { text: { zh: '你开始回忆过去的美好时光。', en: 'You started reminiscing about the good old days.' }, cond: { minAge: 70, maxAge: 80 }, effects: {} },
        { text: { zh: '你的身体越来越虚弱。', en: 'Your body is getting weaker.' }, cond: { minAge: 70, maxAge: 80 }, effects: { str: -2 } },
        { text: { zh: '你平静地看着窗外，觉得这一生够了。', en: 'You gaze out the window peacefully, feeling content with life.' }, cond: { minAge: 75, maxAge: 80, minSpr: 5 }, effects: { spr: 1 } },
        { text: { zh: '你庆祝了金婚纪念日。', en: 'You celebrated your golden wedding anniversary.' }, cond: { minAge: 75, maxAge: 80, hasTag: 'married', noTag: 'divorced', noTag2: 'spouse_died' }, effects: { spr: 3 } },

        // ===== 更多职业/生活事件 (补充丰富度) =====
        { text: { zh: '你成为了一名老师。', en: 'You became a teacher.' }, cond: { minAge: 23, maxAge: 28, minInt: 6, chance: 0.15 }, effects: { mny: 1, spr: 1, tag: 'teacher' } },
        { text: { zh: '你成为了一名医生。', en: 'You became a doctor.' }, cond: { minAge: 25, maxAge: 30, minInt: 8, chance: 0.1 }, effects: { mny: 3, int: 1, tag: 'doctor' } },
        { text: { zh: '你成为了一名律师。', en: 'You became a lawyer.' }, cond: { minAge: 25, maxAge: 30, minInt: 8, chance: 0.1 }, effects: { mny: 3, chr: 1, tag: 'lawyer' } },
        { text: { zh: '你成为了一名程序员。', en: 'You became a programmer.' }, cond: { minAge: 22, maxAge: 28, minInt: 6, hasTag: 'coding', chance: 0.5 }, effects: { mny: 2, tag: 'programmer' } },
        { text: { zh: '你成为了一名设计师。', en: 'You became a designer.' }, cond: { minAge: 22, maxAge: 28, minChr: 5, hasTag: 'art', chance: 0.3 }, effects: { mny: 1, chr: 1, tag: 'designer' } },
        { text: { zh: '你成为了健身教练。', en: 'You became a fitness trainer.' }, cond: { minAge: 22, maxAge: 28, minStr: 7, chance: 0.15 }, effects: { str: 2, chr: 1, tag: 'trainer' } },
        { text: { zh: '你当上了公务员。', en: 'You became a civil servant.' }, cond: { minAge: 23, maxAge: 28, minInt: 6, chance: 0.15 }, effects: { mny: 1, spr: 1, tag: 'civil_servant' } },
        { text: { zh: '你开了一家小餐馆。', en: 'You opened a small restaurant.' }, cond: { minAge: 25, maxAge: 35, hasTag: 'cooking', chance: 0.3 }, effects: { mny: 2, tag: 'restaurant' } },
        { text: { zh: '你的餐馆生意兴隆！', en: 'Your restaurant business is booming!' }, cond: { minAge: 27, maxAge: 40, hasTag: 'restaurant', chance: 0.5 }, effects: { mny: 3, spr: 2 } },
        { text: { zh: '你拿到了驾照。', en: 'You got your driver\'s license.' }, cond: { minAge: 18, maxAge: 25, noTag: 'license' }, effects: { tag: 'license' } },
        { text: { zh: '你成为了网红，粉丝很多。', en: 'You became an internet celebrity with many followers.' }, cond: { minAge: 18, maxAge: 35, minChr: 7, chance: 0.1 }, effects: { mny: 3, chr: 2, tag: 'influencer' } },
        { text: { zh: '你的短视频火了！', en: 'Your short video went viral!' }, cond: { minAge: 18, maxAge: 35, hasTag: 'influencer', chance: 0.4 }, effects: { mny: 2, chr: 1 } },
        { text: { zh: '你出了一次车祸，幸好不严重。', en: 'You had a car accident, luckily not serious.' }, cond: { minAge: 20, maxAge: 60, hasTag: 'license', chance: 0.05 }, effects: { str: -2, mny: -1 } },
        { text: { zh: '你中了彩票小奖。', en: 'You won a small lottery prize.' }, cond: { minAge: 18, maxAge: 70, chance: 0.05 }, effects: { mny: 2, spr: 2 } },
        { text: { zh: '你中了彩票大奖！！！', en: 'You won the LOTTERY JACKPOT!!!' }, cond: { minAge: 18, maxAge: 70, chance: 0.005 }, effects: { mny: 10, spr: 5 } },
        { text: { zh: '你被狗咬了。', en: 'You were bitten by a dog.' }, cond: { minAge: 5, maxAge: 60, chance: 0.05 }, effects: { str: -1, spr: -1 } },
        { text: { zh: '你捡到了一只流浪猫，决定收养它。', en: 'You found a stray cat and adopted it.' }, cond: { minAge: 15, maxAge: 50, chance: 0.08 }, effects: { spr: 1, tag: 'cat_owner' } },
        { text: { zh: '你参加了马拉松比赛。', en: 'You ran a marathon.' }, cond: { minAge: 20, maxAge: 50, minStr: 6, chance: 0.1 }, effects: { str: 1, spr: 1, tag: 'marathon' } },
        { text: { zh: '你完成了马拉松全程！', en: 'You finished the full marathon!' }, cond: { minAge: 20, maxAge: 50, hasTag: 'marathon', minStr: 7, chance: 0.5 }, effects: { str: 2, spr: 2, chr: 1 } },
        { text: { zh: '你的手机掉进了马桶。', en: 'You dropped your phone in the toilet.' }, cond: { minAge: 15, maxAge: 60, chance: 0.05 }, effects: { spr: -1 } },
        { text: { zh: '你在股市亏了一笔。', en: 'You lost money in the stock market.' }, cond: { minAge: 25, maxAge: 60, hasTag: 'invest', chance: 0.3 }, effects: { mny: -2, spr: -1 } },
        { text: { zh: '你学会了弹吉他。', en: 'You learned to play guitar.' }, cond: { minAge: 15, maxAge: 40, chance: 0.1 }, effects: { chr: 1, spr: 1, tag: 'guitar' } },
        { text: { zh: '你参加了一场演唱会。', en: 'You went to a concert.' }, cond: { minAge: 15, maxAge: 50, chance: 0.15 }, effects: { spr: 1 } },
        { text: { zh: '你在网上交到了一个知心好友。', en: 'You made a close friend online.' }, cond: { minAge: 15, maxAge: 40, chance: 0.15 }, effects: { spr: 1, tag: 'online_friend' } },
        { text: { zh: '你搬到了大城市。', en: 'You moved to a big city.' }, cond: { minAge: 18, maxAge: 30, chancce: 0.2 }, effects: { mny: 1, spr: -1, tag: 'big_city' } },
        { text: { zh: '你考了研究生。', en: 'You pursued a master\'s degree.' }, cond: { minAge: 22, maxAge: 26, minInt: 7, hasTag: 'graduated', chance: 0.3 }, effects: { int: 2, mny: -1, tag: 'masters' } },
        { text: { zh: '你读了博士。', en: 'You pursued a PhD.' }, cond: { minAge: 24, maxAge: 30, hasTag: 'masters', minInt: 8, chance: 0.3 }, effects: { int: 3, mny: -2, str: -1, tag: 'phd' } },
        { text: { zh: '你发表了学术论文。', en: 'You published an academic paper.' }, cond: { minAge: 24, maxAge: 40, hasTag: 'phd', minInt: 8, chance: 0.5 }, effects: { int: 2, chr: 1 } },
        { text: { zh: '你成为了大学教授。', en: 'You became a university professor.' }, cond: { minAge: 30, maxAge: 40, hasTag: 'phd', minInt: 9, chance: 0.4 }, effects: { mny: 2, int: 2, tag: 'professor' } },
        { text: { zh: '你做了一个奇怪的梦。', en: 'You had a strange dream.' }, cond: { minAge: 5, maxAge: 70, chance: 0.05 }, effects: {} },
        { text: { zh: '你遭遇了电信诈骗，损失了一些钱。', en: 'You fell victim to a phone scam and lost money.' }, cond: { minAge: 20, maxAge: 70, chance: 0.05 }, effects: { mny: -2, spr: -2 } },
        { text: { zh: '你在路边捡到了钱包并归还了失主。', en: 'You found a wallet and returned it to the owner.' }, cond: { minAge: 10, maxAge: 60, chance: 0.05 }, effects: { spr: 1, chr: 1 } },
        { text: { zh: '你失眠了好几天。', en: 'You had insomnia for several days.' }, cond: { minAge: 20, maxAge: 60, maxSpr: 4, chance: 0.15 }, effects: { str: -1, spr: -1 } },
        { text: { zh: '你养成了跑步的习惯。', en: 'You developed a running habit.' }, cond: { minAge: 15, maxAge: 50, minStr: 5, chance: 0.15 }, effects: { str: 2, spr: 1, tag: 'runner' } },
        { text: { zh: '你染上了烟瘾。', en: 'You picked up smoking.' }, cond: { minAge: 16, maxAge: 30, chance: 0.1 }, effects: { str: -1, spr: 1, tag: 'smoker' } },
        { text: { zh: '你成功戒烟了！', en: 'You successfully quit smoking!' }, cond: { minAge: 25, maxAge: 50, hasTag: 'smoker', chance: 0.3 }, effects: { str: 1, spr: 1 } },
        { text: { zh: '你收养了一只流浪狗。', en: 'You adopted a stray dog.' }, cond: { minAge: 20, maxAge: 50, chance: 0.08 }, effects: { spr: 1, tag: 'dog_owner' } },
        { text: { zh: '你的工资涨了。', en: 'You got a salary increase.' }, cond: { minAge: 25, maxAge: 50, minInt: 5 }, effects: { mny: 1 } },
        { text: { zh: '你找到了生活的意义。', en: 'You found the meaning of life.' }, cond: { minAge: 30, maxAge: 60, minSpr: 7, minInt: 7, chance: 0.1 }, effects: { spr: 3 } },
        { text: { zh: '你搬到了乡下，过上了田园生活。', en: 'You moved to the countryside for rural life.' }, cond: { minAge: 40, maxAge: 60, minMny: 6, chance: 0.1 }, effects: { spr: 2, str: 1, tag: 'rural' } },
        { text: { zh: '你参加了同学会，感慨时光飞逝。', en: 'You attended a reunion, marveling at how time flies.' }, cond: { minAge: 30, maxAge: 50, chance: 0.15 }, effects: { spr: 1 } },
    ];

    // ========== 事件模板（生成更多变体）==========
    const TEMPLATES = [
        {
            template: {
                zh: '你在{subject}考试中获得了{result}。',
                en: 'You got {result_en} in the {subject_en} exam.'
            },
            vars: {
                subject: ['数学', '语文', '英语', '物理', '化学', '生物', '历史', '地理'],
                subject_en: ['Math', 'Chinese', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'],
                result: ['满分', '第一名', '第二名', '前十名', '还不错的成绩', '勉强及格'],
                result_en: ['a perfect score', '1st place', '2nd place', 'top 10', 'a decent result', 'a barely passing grade']
            },
            condBase: { minAge: 12, maxAge: 17 },
            effectMap: { '满分': { int: 2, spr: 1 }, '第一名': { int: 2, spr: 1 }, '第二名': { int: 1, spr: 1 }, '前十名': { int: 1 }, '还不错的成绩': {}, '勉强及格': { spr: -1 } },
            condMap: { '满分': { minInt: 9 }, '第一名': { minInt: 8 }, '第二名': { minInt: 7 }, '前十名': { minInt: 6 }, '还不错的成绩': { minInt: 4 }, '勉强及格': { maxInt: 4 } }
        },
        {
            template: {
                zh: '你学会了{skill}。',
                en: 'You learned {skill_en}.'
            },
            vars: {
                skill: ['做饭', '摄影', '画画', '书法', '下棋', '打乒乓球', '弹钢琴', '写代码', '跳舞', '插花'],
                skill_en: ['cooking', 'photography', 'painting', 'calligraphy', 'chess', 'table tennis', 'piano', 'coding', 'dancing', 'flower arranging']
            },
            condBase: { minAge: 10, maxAge: 50, chance: 0.08 },
            effectAll: { spr: 1 }
        },
        {
            template: {
                zh: '你去了{place}旅游，{feeling}。',
                en: 'You traveled to {place_en}, {feeling_en}.'
            },
            vars: {
                place: ['日本', '泰国', '法国', '美国', '西藏', '云南', '海南', '新疆', '英国', '韩国', '澳大利亚', '冰岛'],
                place_en: ['Japan', 'Thailand', 'France', 'the US', 'Tibet', 'Yunnan', 'Hainan', 'Xinjiang', 'the UK', 'South Korea', 'Australia', 'Iceland'],
                feeling: ['玩得很开心', '感受到了不同的文化', '拍了很多照片', '吃到了美食'],
                feeling_en: ['had a great time', 'experienced different cultures', 'took tons of photos', 'ate amazing food']
            },
            condBase: { minAge: 18, maxAge: 65, minMny: 5, chance: 0.06 },
            effectAll: { spr: 2 }
        },
        {
            template: {
                zh: '你吃了{food}，{reaction}。',
                en: 'You ate {food_en}, {reaction_en}.'
            },
            vars: {
                food: ['路边摊的烤串', '高档餐厅的料理', '妈妈做的家常菜', '自己做的黑暗料理', '超辣火锅'],
                food_en: ['street BBQ', 'fine dining', 'mom\'s cooking', 'your own cooking disaster', 'super spicy hotpot'],
                reaction: ['觉得人间值得', '幸福感爆棚', '肚子疼了一天', '流下了幸福的泪水', '被辣哭了'],
                reaction_en: ['felt life is worth it', 'happiness overload', 'had a stomachache all day', 'shed tears of joy', 'cried from the spice']
            },
            condBase: { minAge: 5, maxAge: 70, chance: 0.04 },
            effectAll: { spr: 1 }
        },
        {
            template: {
                zh: '你读了一本{genre}书，{impact}。',
                en: 'You read a {genre_en} book, {impact_en}.'
            },
            vars: {
                genre: ['科幻', '哲学', '经济学', '心理学', '历史', '文学', '编程', '自传'],
                genre_en: ['sci-fi', 'philosophy', 'economics', 'psychology', 'history', 'literary', 'programming', 'biography'],
                impact: ['获益匪浅', '打开了新世界', '决定改变自己', '只看了几页就睡着了'],
                impact_en: ['gained a lot', 'opened up a new world', 'decided to change yourself', 'fell asleep after a few pages']
            },
            condBase: { minAge: 12, maxAge: 70, chance: 0.06 },
            effectMap: { '获益匪浅': { int: 1 }, '打开了新世界': { int: 1, spr: 1 }, '决定改变自己': { spr: 1 }, '只看了几页就睡着了': {} }
        },
        {
            template: {
                zh: '你在{weather}天里{activity}。',
                en: 'You {activity_en} on a {weather_en} day.'
            },
            vars: {
                weather: ['下雨', '下雪', '阳光明媚', '大风', '雾霾'],
                weather_en: ['rainy', 'snowy', 'sunny', 'windy', 'smoggy'],
                activity: ['窝在家里看剧', '出去散步', '打了一下午游戏', '和朋友聚会', '安静地看书'],
                activity_en: ['stayed home binge-watching', 'went for a walk', 'played games all afternoon', 'hung out with friends', 'read quietly']
            },
            condBase: { minAge: 10, maxAge: 70, chance: 0.04 },
            effectAll: { spr: 1 }
        },
    ];

    // ========== 结局数据 ==========
    const ENDINGS = [
        { id: 'legend', name: { zh: '传奇人生', en: 'Legendary Life' }, desc: { zh: '你的人生堪称传奇，后人将铭记你的故事。', en: 'Your life was legendary, your story will be remembered.' }, cond: sum => sum >= 55 },
        { id: 'brilliant', name: { zh: '辉煌一生', en: 'Brilliant Life' }, desc: { zh: '你度过了辉煌而充实的一生。', en: 'You lived a brilliant and fulfilling life.' }, cond: sum => sum >= 45 },
        { id: 'wonderful', name: { zh: '精彩人生', en: 'Wonderful Life' }, desc: { zh: '你的人生精彩纷呈，没有遗憾。', en: 'Your life was wonderful, no regrets.' }, cond: sum => sum >= 35 },
        { id: 'happy', name: { zh: '幸福生活', en: 'Happy Life' }, desc: { zh: '虽然平凡，但你过得很幸福。', en: 'Ordinary but happy.' }, cond: sum => sum >= 25 },
        { id: 'normal', name: { zh: '平凡一生', en: 'Ordinary Life' }, desc: { zh: '你的人生平平无奇，但也算安稳。', en: 'Your life was ordinary but stable.' }, cond: sum => sum >= 15 },
        { id: 'bitter', name: { zh: '苦涩人生', en: 'Bitter Life' }, desc: { zh: '你的人生充满坎坷，但你坚持了下来。', en: 'Your life was rough, but you persevered.' }, cond: sum => sum >= 5 },
        { id: 'tragic', name: { zh: '悲惨世界', en: 'Tragic Life' }, desc: { zh: '这一生……太难了。', en: 'This life... was too hard.' }, cond: () => true },
    ];

    // ========== 游戏引擎 ==========
    class LifeRestart {
        constructor() {
            this.reset();
        }

        reset() {
            this.stats = { chr: 0, int: 0, str: 0, mny: 0, spr: 0 };
            this.talents = [];
            this.talentEffects = {};
            this.age = -1;
            this.alive = true;
            this.tags = new Set();
            this.history = [];
            this.maxAge = 80;
            this.health = 100;
            this.extraPoints = 0;
            this.hasProtagonist = false;
        }

        // 应用天赋效果
        applyTalents(selectedTalents) {
            this.talents = selectedTalents;
            for (const t of selectedTalents) {
                if (t.effects._extraPoints) {
                    this.extraPoints = t.effects._extraPoints;
                }
                if (t.effects._protagonist) {
                    this.hasProtagonist = true;
                }
                if (t.effects._random2) {
                    const keys = ['chr', 'int', 'str', 'mny', 'spr'];
                    const shuffled = keys.sort(() => Math.random() - 0.5).slice(0, 2);
                    for (const k of shuffled) this.stats[k] += t.effects._random2;
                } else {
                    for (const [k, v] of Object.entries(t.effects)) {
                        if (!k.startsWith('_') && this.stats[k] !== undefined) {
                            this.stats[k] += v;
                        }
                    }
                }
            }
        }

        setStats(stats) {
            for (const k of ['chr', 'int', 'str', 'mny', 'spr']) {
                this.stats[k] += stats[k] || 0;
            }
            this.health = 50 + this.stats.str * 5;
        }

        getTotalPoints() {
            return 20 + this.extraPoints;
        }

        // 检查事件条件
        checkCond(cond) {
            if (cond.minAge !== undefined && this.age < cond.minAge) return false;
            if (cond.maxAge !== undefined && this.age > cond.maxAge) return false;
            if (cond.minChr !== undefined && this.stats.chr < cond.minChr) return false;
            if (cond.maxChr !== undefined && this.stats.chr > cond.maxChr) return false;
            if (cond.minInt !== undefined && this.stats.int < cond.minInt) return false;
            if (cond.maxInt !== undefined && this.stats.int > cond.maxInt) return false;
            if (cond.minStr !== undefined && this.stats.str < cond.minStr) return false;
            if (cond.maxStr !== undefined && this.stats.str > cond.maxStr) return false;
            if (cond.minMny !== undefined && this.stats.mny < cond.minMny) return false;
            if (cond.maxMny !== undefined && this.stats.mny > cond.maxMny) return false;
            if (cond.minSpr !== undefined && this.stats.spr < cond.minSpr) return false;
            if (cond.maxSpr !== undefined && this.stats.spr > cond.maxSpr) return false;
            if (cond.hasTag && !this.tags.has(cond.hasTag)) return false;
            if (cond.noTag && this.tags.has(cond.noTag)) return false;
            if (cond.noTag2 && this.tags.has(cond.noTag2)) return false;
            if (cond.chance !== undefined && Math.random() > cond.chance) return false;
            return true;
        }

        // 应用效果
        applyEffects(effects) {
            if (!effects) return;
            for (const [k, v] of Object.entries(effects)) {
                if (k === 'tag') {
                    this.tags.add(v);
                } else if (k === 'die') {
                    this.alive = false;
                } else if (this.stats[k] !== undefined) {
                    let val = v;
                    if (this.hasProtagonist) {
                        if (val < 0) val = Math.ceil(val / 2);
                        else if (val > 0) val = val * 2;
                    }
                    this.stats[k] += val;
                }
            }
        }

        // 从模板生成事件
        generateTemplateEvents() {
            const generated = [];
            for (const tmpl of TEMPLATES) {
                const mainVarKey = Object.keys(tmpl.vars)[0];
                const mainVals = tmpl.vars[mainVarKey];
                // 取一对关联变量
                const varKeys = Object.keys(tmpl.vars);
                for (let i = 0; i < mainVals.length; i++) {
                    // 对于有 effectMap 的情况
                    if (tmpl.effectMap || tmpl.condMap) {
                        const secondKey = varKeys.find(k => k !== mainVarKey && !k.includes('_en'));
                        if (secondKey) {
                            const secondVals = tmpl.vars[secondKey];
                            const secondEnKey = secondKey + '_en';
                            for (let j = 0; j < secondVals.length; j++) {
                                let textZh = tmpl.template.zh;
                                let textEn = tmpl.template.en;
                                // Replace all vars
                                for (const vk of varKeys) {
                                    const enKey = vk + '_en';
                                    if (vk === mainVarKey) {
                                        textZh = textZh.replace(`{${vk}}`, mainVals[i]);
                                        if (tmpl.vars[mainVarKey + '_en']) {
                                            textEn = textEn.replace(`{${mainVarKey + '_en'}}`, tmpl.vars[mainVarKey + '_en'][i]);
                                        }
                                    } else if (vk === secondKey) {
                                        textZh = textZh.replace(`{${vk}}`, secondVals[j]);
                                        if (tmpl.vars[secondEnKey]) {
                                            textEn = textEn.replace(`{${secondEnKey}}`, tmpl.vars[secondEnKey][j]);
                                        }
                                    }
                                }
                                const cond = { ...tmpl.condBase };
                                if (tmpl.condMap && tmpl.condMap[secondVals[j]]) {
                                    Object.assign(cond, tmpl.condMap[secondVals[j]]);
                                }
                                const effects = tmpl.effectMap ? (tmpl.effectMap[secondVals[j]] || {}) : (tmpl.effectAll || {});
                                generated.push({ text: { zh: textZh, en: textEn }, cond, effects });
                            }
                        }
                    } else {
                        // 简单一维模板
                        let textZh = tmpl.template.zh.replace(`{${mainVarKey}}`, mainVals[i]);
                        let textEn = tmpl.template.en;
                        const enKey = mainVarKey + '_en';
                        if (tmpl.vars[enKey]) {
                            textEn = textEn.replace(`{${enKey}}`, tmpl.vars[enKey][i]);
                        }
                        // Replace other variable pairs (take random one)
                        for (const vk of varKeys) {
                            if (vk === mainVarKey || vk.includes('_en')) continue;
                            const vs = tmpl.vars[vk];
                            const ri = Math.floor(Math.random() * vs.length);
                            textZh = textZh.replace(`{${vk}}`, vs[ri]);
                            const evk = vk + '_en';
                            if (tmpl.vars[evk]) {
                                textEn = textEn.replace(`{${evk}}`, tmpl.vars[evk][ri]);
                            }
                        }
                        generated.push({
                            text: { zh: textZh, en: textEn },
                            cond: { ...tmpl.condBase },
                            effects: tmpl.effectAll || {}
                        });
                    }
                }
            }
            return generated;
        }

        // 获取当前年龄的事件
        getEventsForAge() {
            const allEvents = [...EVENTS, ...this.generateTemplateEvents()];
            const eligible = allEvents.filter(e => this.checkCond(e.cond));

            if (eligible.length === 0) {
                return [{ text: { zh: '平淡地度过了一年。', en: 'An uneventful year.' }, effects: {} }];
            }

            // 选 1-3 个事件
            const count = Math.min(eligible.length, 1 + Math.floor(Math.random() * 2));
            const shuffled = eligible.sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        }

        // 检查是否死亡
        checkDeath() {
            // 基于年龄和体质计算死亡概率
            const age = this.age;
            const str = this.stats.str;

            // 体质很低时生命值降低更快
            if (str <= 0) this.health -= 20;
            else if (str <= 2) this.health -= 8;
            else if (str <= 4) this.health -= 3;
            else this.health -= 1;

            // 年龄越大死亡概率越高
            if (age < 10) return this.health <= 0 || (str <= 0 && Math.random() < 0.01);
            if (age < 30) return this.health <= 0 || Math.random() < 0.002;
            if (age < 50) return this.health <= 0 || Math.random() < 0.005;
            if (age < 60) return this.health <= 0 || Math.random() < 0.02;
            if (age < 70) return this.health <= 0 || Math.random() < 0.05 - str * 0.003;
            if (age < 80) return this.health <= 0 || Math.random() < 0.1 - str * 0.005;
            if (age < 90) return this.health <= 0 || Math.random() < 0.2 - str * 0.008;
            if (age < 100) return this.health <= 0 || Math.random() < 0.4;
            return true; // 100+必死
        }

        // 模拟下一年
        nextYear() {
            this.age++;
            const events = this.getEventsForAge();
            const yearLog = [];
            for (const evt of events) {
                this.applyEffects(evt.effects);
                yearLog.push(evt);
            }
            // Clamp stats
            for (const k of ['chr', 'int', 'str', 'mny', 'spr']) {
                this.stats[k] = Math.max(0, Math.min(20, this.stats[k]));
            }

            if (!this.alive || this.checkDeath()) {
                this.alive = false;
            }

            this.history.push({ age: this.age, events: yearLog, stats: { ...this.stats }, alive: this.alive });
            return { age: this.age, events: yearLog, alive: this.alive };
        }

        // 获取结局
        getEnding() {
            const s = this.stats;
            const sum = Math.floor((s.chr + s.int + s.str + s.mny + s.spr) / 5 * 10 + this.age / 10);
            for (const ending of ENDINGS) {
                if (ending.cond(sum)) return { ...ending, sum };
            }
            return ENDINGS[ENDINGS.length - 1];
        }

        // 获取评级（0-6）
        gradeFor(val) {
            if (val <= 2) return 0;
            if (val <= 4) return 1;
            if (val <= 6) return 2;
            if (val <= 8) return 3;
            if (val <= 10) return 4;
            if (val <= 14) return 5;
            return 6;
        }
    }

    // ========== UI 渲染 ==========
    const game = new LifeRestart();
    const container = document.getElementById('lr-content');
    let autoTimer = null;
    let speed = 600;

    function t(key, vars) {
        let s = I18n.t(key) || key;
        if (vars) {
            for (const [k, v] of Object.entries(vars)) {
                s = s.replace(`{${k}}`, v);
            }
        }
        return s;
    }

    function tObj(obj) {
        return obj[I18n.lang] || obj.zh || '';
    }

    // 天赋颜色
    function gradeColor(grade) {
        const colors = ['#999', '#4a9eff', '#b344e0', '#ff8c00'];
        return colors[grade] || '#999';
    }
    function gradeBg(grade) {
        const bgs = ['#f5f5f5', '#e8f4ff', '#f3e8ff', '#fff3e0'];
        return bgs[grade] || '#f5f5f5';
    }

    // ===== 第一步：天赋抽取 =====
    function showTalentDraw() {
        game.reset();
        const poolSize = 10;
        // 按稀有度权重抽取
        const pool = [];
        const gradeWeights = { 0: 50, 1: 30, 2: 15, 3: 5 };
        const byGrade = {};
        for (const t of TALENTS) {
            if (!byGrade[t.grade]) byGrade[t.grade] = [];
            byGrade[t.grade].push(t);
        }

        while (pool.length < poolSize) {
            let r = Math.random() * 100;
            let g = 0;
            for (const [grade, w] of Object.entries(gradeWeights)) {
                r -= w;
                if (r <= 0) { g = parseInt(grade); break; }
            }
            const candidates = (byGrade[g] || byGrade[0]).filter(t => !pool.includes(t));
            if (candidates.length > 0) {
                pool.push(candidates[Math.floor(Math.random() * candidates.length)]);
            }
        }

        const selected = new Set();

        function render() {
            container.innerHTML = `
                <h3 class="lr-phase-title">${t('lr.talent.title')}</h3>
                <p class="lr-phase-tip">${t('lr.talent.tip')}</p>
                <div class="lr-talent-grid">
                    ${pool.map((tl, i) => `
                        <div class="lr-talent-card ${selected.has(i) ? 'selected' : ''}"
                            data-idx="${i}"
                            style="border-color:${gradeColor(tl.grade)};background:${selected.has(i) ? gradeBg(tl.grade) : '#fff'}">
                            <div class="lr-talent-name" style="color:${gradeColor(tl.grade)}">${tObj(tl.name)}</div>
                            <div class="lr-talent-desc">${tObj(tl.desc)}</div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn primary lr-btn" id="lr-talent-confirm" ${selected.size !== 3 ? 'disabled' : ''}>
                    ${selected.size === 3 ? t('lr.talent.confirm') : t('lr.talent.need3')}
                </button>
            `;

            container.querySelectorAll('.lr-talent-card').forEach(card => {
                card.addEventListener('click', () => {
                    const idx = parseInt(card.dataset.idx);
                    if (selected.has(idx)) {
                        selected.delete(idx);
                    } else if (selected.size < 3) {
                        selected.add(idx);
                    }
                    render();
                });
            });

            const confirmBtn = document.getElementById('lr-talent-confirm');
            if (confirmBtn && selected.size === 3) {
                confirmBtn.addEventListener('click', () => {
                    const chosen = [...selected].map(i => pool[i]);
                    game.applyTalents(chosen);
                    showAttributeAlloc();
                });
            }
        }
        render();
    }

    // ===== 第二步：属性分配 =====
    function showAttributeAlloc() {
        const total = game.getTotalPoints();
        const alloc = { chr: 0, int: 0, str: 0, mny: 0, spr: 0 };
        const keys = ['chr', 'int', 'str', 'mny', 'spr'];
        const labels = { chr: 'lr.attr.chr', int: 'lr.attr.int', str: 'lr.attr.str', mny: 'lr.attr.mny', spr: 'lr.attr.spr' };

        function remaining() {
            return total - keys.reduce((s, k) => s + alloc[k], 0);
        }

        function render() {
            const rem = remaining();
            container.innerHTML = `
                <h3 class="lr-phase-title">${t('lr.attr.title')}</h3>
                <p class="lr-phase-tip">${t('lr.attr.tip', { n: rem })}</p>
                <div class="lr-talent-selected">
                    ${game.talents.map(tl => `<span class="lr-talent-badge" style="border-color:${gradeColor(tl.grade)};color:${gradeColor(tl.grade)}">${tObj(tl.name)}</span>`).join('')}
                </div>
                <div class="lr-attr-grid">
                    ${keys.map(k => `
                        <div class="lr-attr-row">
                            <span class="lr-attr-label">${t(labels[k])}</span>
                            <button class="lr-attr-btn minus" data-key="${k}" data-dir="-1" ${alloc[k] <= 0 ? 'disabled' : ''}>−</button>
                            <div class="lr-attr-bar-wrap">
                                <div class="lr-attr-bar" style="width:${alloc[k] * 10}%"></div>
                                <span class="lr-attr-val">${alloc[k]}</span>
                            </div>
                            <button class="lr-attr-btn plus" data-key="${k}" data-dir="1" ${alloc[k] >= 10 || rem <= 0 ? 'disabled' : ''}>+</button>
                        </div>
                    `).join('')}
                </div>
                <div class="lr-btn-group">
                    <button class="btn secondary lr-btn" id="lr-random">${t('lr.attr.random')}</button>
                    <button class="btn primary lr-btn" id="lr-start" ${rem > 0 ? 'disabled' : ''}>${t('lr.start')}</button>
                </div>
            `;

            container.querySelectorAll('.lr-attr-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const k = btn.dataset.key;
                    const dir = parseInt(btn.dataset.dir);
                    const newVal = alloc[k] + dir;
                    if (newVal < 0 || newVal > 10) return;
                    if (dir > 0 && remaining() <= 0) return;
                    alloc[k] = newVal;
                    render();
                });
            });

            const randomBtn = document.getElementById('lr-random');
            if (randomBtn) {
                randomBtn.addEventListener('click', () => {
                    let left = total;
                    for (const k of keys) alloc[k] = 0;
                    while (left > 0) {
                        const k = keys[Math.floor(Math.random() * keys.length)];
                        const add = Math.min(Math.floor(Math.random() * 3) + 1, 10 - alloc[k], left);
                        alloc[k] += add;
                        left -= add;
                    }
                    render();
                });
            }

            const startBtn = document.getElementById('lr-start');
            if (startBtn && remaining() <= 0) {
                startBtn.addEventListener('click', () => {
                    game.setStats(alloc);
                    showLifeTrajectory();
                });
            }
        }
        render();
    }

    // ===== 第三步：人生轨迹 =====
    function showLifeTrajectory() {
        container.innerHTML = `
            <h3 class="lr-phase-title">${t('lr.life.title')}</h3>
            <div class="lr-speed-control">
                <span>${t('lr.life.speed')}:</span>
                <input type="range" id="lr-speed" min="100" max="1500" value="${speed}" step="100">
                <button class="btn secondary lr-btn-sm" id="lr-skip">${t('lr.life.skip')}</button>
            </div>
            <div class="lr-stats-bar">
                <span>❤️ ${t('lr.attr.chr')}: <b id="lr-s-chr">${game.stats.chr}</b></span>
                <span>🧠 ${t('lr.attr.int')}: <b id="lr-s-int">${game.stats.int}</b></span>
                <span>💪 ${t('lr.attr.str')}: <b id="lr-s-str">${game.stats.str}</b></span>
                <span>💰 ${t('lr.attr.mny')}: <b id="lr-s-mny">${game.stats.mny}</b></span>
                <span>😊 ${t('lr.attr.spr')}: <b id="lr-s-spr">${game.stats.spr}</b></span>
            </div>
            <div class="lr-timeline" id="lr-timeline"></div>
        `;

        const timeline = document.getElementById('lr-timeline');
        const speedSlider = document.getElementById('lr-speed');
        const skipBtn = document.getElementById('lr-skip');

        speedSlider.addEventListener('input', () => {
            speed = parseInt(speedSlider.value);
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = setInterval(tick, speed);
            }
        });

        skipBtn.addEventListener('click', () => {
            if (autoTimer) clearInterval(autoTimer);
            // 快速跑完所有年
            while (game.alive) {
                const result = game.nextYear();
                addYearToTimeline(timeline, result);
            }
            updateStatsBar();
            showSummary();
        });

        function updateStatsBar() {
            const ids = ['chr', 'int', 'str', 'mny', 'spr'];
            for (const k of ids) {
                const el = document.getElementById(`lr-s-${k}`);
                if (el) el.textContent = game.stats[k];
            }
        }

        function tick() {
            if (!game.alive) {
                if (autoTimer) clearInterval(autoTimer);
                autoTimer = null;
                setTimeout(() => showSummary(), 800);
                return;
            }
            const result = game.nextYear();
            addYearToTimeline(timeline, result);
            updateStatsBar();
            // 自动滚动
            timeline.scrollTop = timeline.scrollHeight;
        }

        autoTimer = setInterval(tick, speed);
    }

    function addYearToTimeline(timeline, result) {
        const div = document.createElement('div');
        div.className = 'lr-year-item fade-in';
        const evtTexts = result.events.map(e => tObj(e.text)).join('<br>');
        div.innerHTML = `
            <div class="lr-year-age">${t('lr.life.age', { n: result.age })}</div>
            <div class="lr-year-events">${evtTexts}</div>
        `;
        if (!result.alive) {
            div.classList.add('lr-year-death');
        }
        timeline.appendChild(div);
    }

    // ===== 第四步：人生总结 =====
    function showSummary() {
        const ending = game.getEnding();
        const s = game.stats;
        const gradeKeys = ['chr', 'int', 'str', 'mny', 'spr'];
        const gradeLabels = {
            chr: 'lr.summary.chr',
            int: 'lr.summary.int',
            str: 'lr.summary.str',
            mny: 'lr.summary.mny',
            spr: 'lr.summary.spr'
        };

        container.innerHTML = `
            <h3 class="lr-phase-title">${t('lr.summary.title')}</h3>
            <div class="lr-summary-card">
                <div class="lr-ending-name">${tObj(ending.name)}</div>
                <div class="lr-ending-desc">${tObj(ending.desc)}</div>
                <div class="lr-final-age">${t('lr.summary.final', { n: game.age })}</div>
                <div class="lr-summary-stats">
                    ${gradeKeys.map(k => {
                        const g = game.gradeFor(s[k]);
                        return `
                            <div class="lr-summary-stat">
                                <span class="lr-summary-stat-label">${t(gradeLabels[k])}</span>
                                <div class="lr-summary-bar-wrap">
                                    <div class="lr-summary-bar" style="width:${Math.min(s[k], 20) / 20 * 100}%;background:${gradeColor(Math.min(g, 3))}"></div>
                                </div>
                                <span class="lr-summary-stat-val">${s[k]}</span>
                                <span class="lr-summary-grade" style="color:${gradeColor(Math.min(g, 3))}">${t('lr.grade.' + g)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="lr-summary-total">
                    ${t('lr.summary.rating')}: <strong style="color:${gradeColor(Math.min(Math.floor(ending.sum / 15), 3))}">${tObj(ending.name)}</strong>
                </div>
            </div>
            <div class="lr-btn-group">
                <button class="btn primary lr-btn" id="lr-restart">${t('lr.restart')}</button>
            </div>
        `;

        document.getElementById('lr-restart').addEventListener('click', () => {
            if (autoTimer) clearInterval(autoTimer);
            showTalentDraw();
        });
    }

    // ===== 初始化 =====
    function init() {
        showTalentDraw();
    }

    // 语言切换时重新渲染
    document.addEventListener('langchange', () => {
        // 如果在游戏中，只更新标题
        I18n.apply();
    });

    document.addEventListener('DOMContentLoaded', init);
})();
