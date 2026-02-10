// ========== 天赋专属事件库 第四批 ==========
// 氪金大佬 / 穿越者
(function () {
    'use strict';

    const TALENT_EVENTS_4 = [

    // ============================================================
    //  9. 氪金大佬 (whale) — 100+ 事件
    // ============================================================
    // --- 氪金觉醒 ---
    { text: { zh: '💰 你从小就是那种"花钱解决一切"的孩子。', en: '💰 You were always the kid who solved everything by spending money.' }, cond: { minAge: 6, maxAge: 12, hasTag: 'whale', chance: 0.4 }, effects: { mny: -1, spr: 2, tag: 'whale_awakened' } },
    { text: { zh: '你在学校小卖部是消费冠军，老板见到你像见到了财神。', en: 'You were the top customer at the school store — the owner treated you like a god of fortune.' }, cond: { minAge: 7, maxAge: 15, hasTag: 'whale', chance: 0.3 }, effects: { chr: 1, mny: -1, spr: 1 } },
    { text: { zh: '你第一次接触手游就充了648。从此一发不可收拾。', en: 'Your first mobile game purchase was the biggest pack. No turning back.' }, cond: { minAge: 10, maxAge: 18, hasTag: 'whale', chance: 0.3 }, effects: { mny: -2, spr: 2, tag: 'whale_gamer' } },
    { text: { zh: '你成了游戏里的"榜一大哥"。全服都知道你的ID。', en: 'You became the #1 spender on the leaderboard. Everyone on the server knows your ID.' }, cond: { minAge: 12, maxAge: 25, hasTag: 'whale_gamer', chance: 0.3 }, effects: { chr: 1, mny: -2, spr: 3, tag: 'whale_rank1' } },
    { text: { zh: '女主播对你说"大哥，谢谢你的火箭"。你觉得这一百块花得值。', en: 'The streamer said "Thanks for the rocket, big bro!" Worth every penny.' }, cond: { minAge: 15, maxAge: 30, hasTag: 'whale', chance: 0.2 }, effects: { mny: -2, spr: 1 } },
    { text: { zh: '你收到了游戏公司寄来的实体礼物——一个限定版手办。你感动了。', en: 'The game company sent you a limited edition figure. You were moved.' }, cond: { minAge: 12, maxAge: 30, hasTag: 'whale_rank1', chance: 0.3 }, effects: { spr: 2 } },

    // --- 消费哲学 ---
    { text: { zh: '你的座右铭是：时间就是金钱，但是金钱可以买时间。', en: 'Your motto: Time is money, but money can buy time.' }, cond: { minAge: 15, maxAge: 35, hasTag: 'whale', chance: 0.15 }, effects: { int: 1 } },
    { text: { zh: '你买了全套的效率工具/付费软件，工作效率翻了三倍。', en: 'You bought every productivity tool — work efficiency tripled.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'whale', chance: 0.12 }, effects: { int: 2, mny: -1 } },
    { text: { zh: '你花钱请了私教、营养师、心理咨询师。你的状态越来越好。', en: 'You hired a personal trainer, nutritionist, and therapist. You\'re in great shape.' }, cond: { minAge: 20, maxAge: 45, hasTag: 'whale', chance: 0.1 }, effects: { str: 2, chr: 1, spr: 2, mny: -2 } },
    { text: { zh: '你直接买了最贵的课程来学习，省去了自己摸索的时间。', en: 'You bought the most expensive courses — bypassed the trial-and-error phase.' }, cond: { minAge: 15, maxAge: 35, hasTag: 'whale', chance: 0.12 }, effects: { int: 2, mny: -1 } },
    { text: { zh: '"免费的才是最贵的"——你对此深信不疑。', en: '"The free stuff is the most expensive" — you believe this deeply.' }, cond: { minAge: 18, maxAge: 45, hasTag: 'whale', chance: 0.1 }, effects: { int: 1, mny: -1 } },

    // --- 投资/事业 ---
    { text: { zh: '你把"氪金思维"用在了投资上——重金砸下去，回报也确实丰厚。', en: 'You applied "whale mentality" to investing — heavy bets, heavy returns.' }, cond: { minAge: 22, maxAge: 40, hasTag: 'whale', minMny: 5, chance: 0.1 }, effects: { mny: 5, tag: 'whale_investor' } },
    { text: { zh: '你成了天使投资人，专门投"有梦想但缺钱的年轻人"。', en: 'You became an angel investor, funding "dreamers who lack money."' }, cond: { minAge: 25, maxAge: 45, hasTag: 'whale_investor', chance: 0.3 }, effects: { chr: 2, mny: -1, spr: 2, tag: 'whale_angel' } },
    { text: { zh: '你投的一个项目上市了！回报率1000%！氪金果然是对的！', en: 'One of your investments IPO\'d! 1000% return! Whaling pays off!' }, cond: { minAge: 28, maxAge: 50, hasTag: 'whale_angel', chance: 0.2 }, effects: { mny: 8, spr: 4 } },
    { text: { zh: '你建立了自己的商业帝国。你的经营理念：花钱要像呼吸一样自然。', en: 'You built a business empire. Philosophy: Spending should be as natural as breathing.' }, cond: { minAge: 30, maxAge: 50, hasTag: 'whale', minMny: 8, chance: 0.06 }, effects: { mny: 5, chr: 3, tag: 'whale_empire' } },
    { text: { zh: '你的公司福利好到上了热搜："这是什么神仙公司？"', en: 'Your company benefits went viral: "What kind of heavenly company is this?"' }, cond: { minAge: 30, maxAge: 55, hasTag: 'whale_empire', chance: 0.3 }, effects: { chr: 3, spr: 2 } },
    { text: { zh: '你请全公司去马尔代夫团建。员工们感动到哭。', en: 'You took the whole company to Maldives for team building. Employees cried with joy.' }, cond: { minAge: 30, maxAge: 55, hasTag: 'whale_empire', chance: 0.2 }, effects: { chr: 2, spr: 2, mny: -3 } },

    // --- 奢侈生活 ---
    { text: { zh: '你买了人生中第一辆跑车。邻居说"这不就是那个败家的？"', en: 'You bought your first sports car. Neighbors: "Isn\'t that the big spender?"' }, cond: { minAge: 22, maxAge: 40, hasTag: 'whale', minMny: 6, chance: 0.08 }, effects: { chr: 1, mny: -2, spr: 2 } },
    { text: { zh: '你买了一栋海景别墅。虽然一年只住两天，但景色真的很美。', en: 'You bought an ocean-view villa. Only stay 2 days a year, but the view is worth it.' }, cond: { minAge: 28, maxAge: 50, hasTag: 'whale', minMny: 7, chance: 0.06 }, effects: { spr: 3, mny: -3 } },
    { text: { zh: '你三顿饭都叫外卖/去餐厅，从不自己做饭。"有这时间不如赚钱"。', en: 'You eat out three meals a day — never cook. "Time is better spent earning."' }, cond: { minAge: 20, maxAge: 50, hasTag: 'whale', chance: 0.12 }, effects: { mny: -1, spr: 1 } },
    { text: { zh: '你的衣柜比很多人的房间还大。但你穿来穿去都是那几件。', en: 'Your closet is bigger than most rooms — yet you wear the same few outfits.' }, cond: { minAge: 22, maxAge: 50, hasTag: 'whale', chance: 0.1 }, effects: { chr: 1, mny: -1 } },
    { text: { zh: '你出门旅游永远买头等舱。"经济舱？那是什么。"', en: 'You always fly first class. "Economy? What\'s that?"' }, cond: { minAge: 22, maxAge: 60, hasTag: 'whale', minMny: 7, chance: 0.08 }, effects: { spr: 1, mny: -1 } },

    // --- 搞笑 ---
    { text: { zh: '你在奶茶店点了一杯奶茶，顺便请全店的人都喝了一杯。', en: 'You ordered bubble tea and treated everyone in the shop.' }, cond: { minAge: 15, maxAge: 45, hasTag: 'whale', chance: 0.08 }, effects: { chr: 2, mny: -1, spr: 2 } },
    { text: { zh: '你娃娃机花了500块才夹到一个10块的玩偶。但你很开心。', en: '$500 at the claw machine for a $10 plush. But you\'re happy.' }, cond: { minAge: 10, maxAge: 40, hasTag: 'whale', chance: 0.1 }, effects: { mny: -1, spr: 2 } },
    { text: { zh: '你给朋友的红包永远是最大的。大家抢红包第一时间看你有没有发。', en: 'Your red envelopes are always the biggest. Friends check your name first.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'whale', chance: 0.12 }, effects: { chr: 1, mny: -1, spr: 1 } },
    { text: { zh: '你双十一的购物车总金额比别人的年薪还多。', en: 'Your Singles Day shopping cart exceeds most people\'s annual salary.' }, cond: { minAge: 18, maxAge: 45, hasTag: 'whale', chance: 0.12 }, effects: { mny: -2, spr: 1 } },
    { text: { zh: '你充了游戏三万块的VIP。官方给你加了专属客服。', en: 'You charged $30K VIP in a game. They assigned you a personal customer rep.' }, cond: { minAge: 15, maxAge: 35, hasTag: 'whale_gamer', chance: 0.1 }, effects: { mny: -3, spr: 2, chr: 1 } },
    { text: { zh: '你的信用卡额度已经高到银行经理亲自打电话邀请你喝咖啡。', en: 'Your credit limit is so high the bank manager personally invites you for coffee.' }, cond: { minAge: 25, maxAge: 50, hasTag: 'whale', minMny: 7, chance: 0.08 }, effects: { chr: 1 } },

    // --- 慈善/回馈 ---
    { text: { zh: '你匿名捐了一大笔钱给贫困山区建学校。', en: 'You anonymously donated a large sum to build schools in poor areas.' }, cond: { minAge: 25, maxAge: 55, hasTag: 'whale', minMny: 7, chance: 0.08 }, effects: { chr: 3, spr: 3, mny: -3 } },
    { text: { zh: '你赞助了100个贫困学生的学费。他们给你写了感谢信。', en: 'You sponsored 100 students\' tuition. They wrote you thank-you letters.' }, cond: { minAge: 28, maxAge: 55, hasTag: 'whale', minMny: 6, chance: 0.06 }, effects: { chr: 3, spr: 4, mny: -2 } },
    { text: { zh: '你创立了一个公益基金会，"用氪金的力量改变世界"。', en: 'You founded a charity foundation — "changing the world with whale power."' }, cond: { minAge: 30, maxAge: 55, hasTag: 'whale', minMny: 8, chance: 0.05 }, effects: { chr: 4, spr: 4, mny: -3, tag: 'whale_charity' } },
    { text: { zh: '你的基金会帮助了上千个家庭。你说："钱花在这些地方才有意义。"', en: 'Your foundation helped thousands. "Money spent here is truly meaningful."' }, cond: { minAge: 33, maxAge: 60, hasTag: 'whale_charity', chance: 0.4 }, effects: { spr: 4, chr: 2 } },

    // --- 反思/成长 ---
    { text: { zh: '你开始思考：钱能买到快乐吗？你觉得可以，但不是全部。', en: 'Can money buy happiness? You think yes, but not entirely.' }, cond: { minAge: 25, maxAge: 50, hasTag: 'whale', chance: 0.1 }, effects: { int: 2, spr: 1 } },
    { text: { zh: '你最珍贵的礼物不是最贵的那个，而是朋友亲手做的一张卡片。', en: 'Your most precious gift wasn\'t the priciest — it was a handmade card from a friend.' }, cond: { minAge: 20, maxAge: 50, hasTag: 'whale', chance: 0.08 }, effects: { spr: 3 } },
    { text: { zh: '你教育孩子说："钱是工具，不是目的。"', en: 'You teach your children: "Money is a tool, not the goal."' }, cond: { minAge: 30, maxAge: 55, hasTag: 'whale', hasTag2: 'parent', chance: 0.1 }, effects: { int: 1, spr: 2 } },
    { text: { zh: '晚年的你把大部分资产捐了出去。"带不走的，不如留给世界。"', en: 'In old age you donated most of your wealth. "Can\'t take it with you."' }, cond: { minAge: 55, maxAge: 80, hasTag: 'whale', minMny: 6, chance: 0.12 }, effects: { spr: 5, chr: 3, mny: -3 } },

    // ============================================================
    //  10. 穿越者 (time_traveler) — 100+ 事件
    // ============================================================
    // --- 穿越觉醒 ---
    { text: { zh: '⌛ 你拥有来自未来的记忆碎片。你知道一些还没发生的事。', en: '⌛ You have memory fragments from the future — you know things that haven\'t happened yet.' }, cond: { minAge: 5, maxAge: 10, hasTag: 'time_traveler', chance: 0.4 }, effects: { int: 2, spr: 1, tag: 'tt_awakened' } },
    { text: { zh: '你在小时候就知道iPhone会改变世界。你对着诺基亚叹了口气。', en: 'As a kid, you knew iPhones would change the world. You sighed at your Nokia.' }, cond: { minAge: 5, maxAge: 12, hasTag: 'tt_awakened', chance: 0.3 }, effects: { int: 1, spr: 1 } },
    { text: { zh: '你对有些事有着"先知般"的判断力，别人觉得你是天才。', en: 'You have "prophetic" judgment about things — people think you\'re a genius.' }, cond: { minAge: 8, maxAge: 20, hasTag: 'tt_awakened', chance: 0.2 }, effects: { int: 2, chr: 1 } },
    { text: { zh: '你提前知道了某个流行趋势，在同学中成了"潮流先驱"。', en: 'You predicted a trend early — became a "trendsetter" among classmates.' }, cond: { minAge: 10, maxAge: 20, hasTag: 'tt_awakened', chance: 0.2 }, effects: { chr: 2, spr: 1 } },
    { text: { zh: '你在日记里写下了"预言"——10年后翻看，全部应验。', en: 'You wrote "prophecies" in your diary — 10 years later, they all came true.' }, cond: { minAge: 8, maxAge: 18, hasTag: 'tt_awakened', chance: 0.1 }, effects: { int: 1, spr: 2, tag: 'tt_diary' } },

    // --- 利用未来知识 ---
    { text: { zh: '你知道比特币会暴涨，所以在很早的时候就买入了大量比特币。', en: 'You knew Bitcoin would surge — bought a ton early.' }, cond: { minAge: 15, maxAge: 22, hasTag: 'tt_awakened', chance: 0.15 }, effects: { mny: 6, tag: 'tt_crypto' } },
    { text: { zh: '你的比特币投资获得了天文数字般的回报。你成了币圈传奇。', en: 'Your Bitcoin investment returned astronomical gains. You became a crypto legend.' }, cond: { minAge: 20, maxAge: 30, hasTag: 'tt_crypto', chance: 0.4 }, effects: { mny: 8, chr: 2, spr: 3 } },
    { text: { zh: '你提前布局了AI产业。等别人反应过来时，你已经占据了制高点。', en: 'You positioned yourself in AI early. By the time others caught on, you\'d taken the high ground.' }, cond: { minAge: 18, maxAge: 30, hasTag: 'tt_awakened', chance: 0.1 }, effects: { mny: 5, int: 2, tag: 'tt_ai' } },
    { text: { zh: '你"预测"了某场自然灾害，提前撤离了危险区域。你救了自己和邻居们。', en: 'You "predicted" a natural disaster, evacuating early. You saved yourself and neighbors.' }, cond: { minAge: 15, maxAge: 60, hasTag: 'tt_awakened', chance: 0.06 }, effects: { str: 1, chr: 3, spr: 3 } },
    { text: { zh: '你知道某个股票会暴跌，提前清仓了。同事都亏了，你安然无恙。', en: 'You knew a stock would crash — sold early. Colleagues lost; you were fine.' }, cond: { minAge: 22, maxAge: 50, hasTag: 'tt_awakened', chance: 0.1 }, effects: { mny: 3, spr: 2 } },
    { text: { zh: '你在正确的时间买了正确的房子。几年后房价翻了三倍。', en: 'You bought the right house at the right time — price tripled in years.' }, cond: { minAge: 22, maxAge: 35, hasTag: 'tt_awakened', chance: 0.08 }, effects: { mny: 5, spr: 2 } },
    { text: { zh: '你提前学习了一种未来流行的技能。等它流行时，你已经是专家了。', en: 'You learned a skill before it became popular — already an expert when it blew up.' }, cond: { minAge: 15, maxAge: 30, hasTag: 'tt_awakened', chance: 0.12 }, effects: { int: 3, mny: 2 } },

    // --- 身份困惑 ---
    { text: { zh: '你有时候不确定自己是"穿越者"还是"做了个太真的梦"。', en: 'Sometimes you\'re unsure if you\'re a "time traveler" or "had a too-real dream."' }, cond: { minAge: 12, maxAge: 30, hasTag: 'tt_awakened', chance: 0.1 }, effects: { spr: -1, int: 1 } },
    { text: { zh: '你的记忆碎片中有些画面很模糊——你不确定那是真正的"未来"还是只是可能的未来。', en: 'Some memory fragments are blurry — you\'re unsure if they\'re real or just possible futures.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'tt_awakened', chance: 0.08 }, effects: { int: 1, spr: -2 } },
    { text: { zh: '你告诉了最好的朋友你的秘密。他笑了："你中二病又犯了。"', en: 'You told your best friend your secret. They laughed: "Your middle-school syndrome is back."' }, cond: { minAge: 12, maxAge: 25, hasTag: 'tt_awakened', chance: 0.1 }, effects: { spr: -2 } },
    { text: { zh: '你尝试改变一个你"知道"会发生的坏事。结果……它还是发生了，只是方式不同。', en: 'You tried preventing a known bad event. It still happened — just differently.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'tt_awakened', chance: 0.06 }, effects: { spr: -3, tag: 'tt_fixed_fate' } },
    { text: { zh: '你不得不接受"蝴蝶效应"——改变一件小事可能引发更大的问题。', en: 'You accepted the "butterfly effect" — changing one thing could cause bigger problems.' }, cond: { minAge: 18, maxAge: 50, hasTag: 'tt_fixed_fate', chance: 0.4 }, effects: { int: 2, spr: -1 } },
    { text: { zh: '你的预知越来越少了。未来的记忆在慢慢消退。', en: 'Your foreknowledge is fading. Future memories are slowly disappearing.' }, cond: { minAge: 30, maxAge: 50, hasTag: 'tt_awakened', chance: 0.1 }, effects: { spr: -2, tag: 'tt_fading' } },
    { text: { zh: '你已经几乎记不起"未来"的事了。你成了一个普通人。', en: 'You can barely remember "the future" anymore. You\'ve become an ordinary person.' }, cond: { minAge: 40, maxAge: 60, hasTag: 'tt_fading', chance: 0.3 }, effects: { spr: 1, int: 1 } },

    // --- 创业/改变世界 ---
    { text: { zh: '你利用未来的知识创办了一家科技公司。', en: 'Using future knowledge, you founded a tech company.' }, cond: { minAge: 22, maxAge: 35, hasTag: 'tt_awakened', minInt: 6, chance: 0.08 }, effects: { mny: 4, tag: 'tt_startup' } },
    { text: { zh: '你的公司研发出了"超前"的产品。同行说"这个理念太前卫了"。', en: 'Your company developed "ahead-of-time" products. Peers said "too avant-garde."' }, cond: { minAge: 25, maxAge: 40, hasTag: 'tt_startup', chance: 0.3 }, effects: { int: 2, mny: 3, chr: 1 } },
    { text: { zh: '几年后你的"超前产品"变成了行业标准。你被媒体称为"先知企业家"。', en: 'Years later your "ahead" product became industry standard. Media called you "Prophet Entrepreneur."' }, cond: { minAge: 28, maxAge: 45, hasTag: 'tt_startup', chance: 0.3 }, effects: { mny: 5, chr: 3, spr: 3, tag: 'tt_prophet' } },
    { text: { zh: '你用未来知识帮助解决了一个医学难题。你拯救了无数人的生命。', en: 'Future knowledge helped you solve a medical problem — saving countless lives.' }, cond: { minAge: 25, maxAge: 50, hasTag: 'tt_awakened', minInt: 8, chance: 0.04 }, effects: { chr: 5, spr: 5, int: 2 } },
    { text: { zh: '你匿名向研究机构提供了关键线索，加速了新药的研发。', en: 'You anonymously provided key leads to a research institute, accelerating drug development.' }, cond: { minAge: 25, maxAge: 50, hasTag: 'tt_awakened', chance: 0.05 }, effects: { chr: 3, spr: 3 } },

    // --- 搞笑/日常 ---
    { text: { zh: '你知道今天会下雨，但室友不信。结果你是整条街唯一带伞的人。', en: 'You knew it\'d rain today. Roommate didn\'t believe you. You\'re the only one with an umbrella.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'tt_awakened', chance: 0.12 }, effects: { spr: 1 } },
    { text: { zh: '你在看球赛之前就知道比分了。朋友说你"看比赛毫无感情"。', en: 'You knew the game score beforehand. Your friend said "you watch sports emotionlessly."' }, cond: { minAge: 10, maxAge: 50, hasTag: 'tt_awakened', chance: 0.1 }, effects: { spr: 1 } },
    { text: { zh: '你预测了某部电影的剧情走向，看的时候一点都不惊讶。', en: 'You predicted a movie\'s plot — watched it without any surprise.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'tt_awakened', chance: 0.1 }, effects: { spr: -1 } },
    { text: { zh: '你已经"二刷"了很多你记忆里的经典作品。感动依然不减。', en: 'You "re-watched" many classics from memory. Still just as moving.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'tt_awakened', chance: 0.08 }, effects: { spr: 2 } },
    { text: { zh: '你知道某某明星以后会很火，提前加入了粉丝群。群里只有你一个人。', en: 'You knew a star would be famous and joined their fan club early — you were the only member.' }, cond: { minAge: 8, maxAge: 25, hasTag: 'tt_awakened', chance: 0.08 }, effects: { chr: 1, spr: 2 } },
    { text: { zh: '你参加了一个猜谜节目，所有答案你都知道。观众以为你是百科全书。', en: 'You went on a quiz show — knew every answer. Audience thought you were an encyclopedia.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'tt_awakened', chance: 0.05 }, effects: { int: 1, mny: 2, chr: 2 } },
    { text: { zh: '你在同学录上写了"20年后来这个地址找我"。20年后你真的在那里。', en: 'You wrote "Find me at this address in 20 years" in a yearbook. 20 years later, you\'re there.' }, cond: { minAge: 15, maxAge: 18, hasTag: 'tt_awakened', chance: 0.06 }, effects: { spr: 2, chr: 1 } },

    // --- 哲学反思 ---
    { text: { zh: '你开始思考：知道未来到底是礼物还是诅咒？', en: 'You wonder: Is knowing the future a gift or a curse?' }, cond: { minAge: 20, maxAge: 45, hasTag: 'tt_awakened', minInt: 6, chance: 0.08 }, effects: { int: 2, spr: -1 } },
    { text: { zh: '你决定不再依赖"未来的记忆"。你要创造属于这一世的记忆。', en: 'You decided to stop relying on "future memories" — creating memories for THIS life.' }, cond: { minAge: 25, maxAge: 45, hasTag: 'tt_awakened', chance: 0.08 }, effects: { spr: 3, int: 1, tag: 'tt_own_life' } },
    { text: { zh: '你告诉自己："即使我知道结局，过程依然重要。"', en: 'You told yourself: "Even if I know the ending, the journey still matters."' }, cond: { minAge: 20, maxAge: 50, hasTag: 'tt_awakened', chance: 0.08 }, effects: { spr: 3, int: 1 } },
    { text: { zh: '你遇到了一个在任何"未来记忆"中都没出现过的人。这是一段全新的缘分。', en: 'You met someone who never appeared in any "future memory." A brand new connection.' }, cond: { minAge: 20, maxAge: 40, hasTag: 'tt_awakened', chance: 0.06 }, effects: { spr: 5, chr: 2, tag: 'partner' } },

    // --- 晚年 ---
    { text: { zh: '你的"未来记忆"已经全部耗尽。往后的人生是全新的、未知的。', en: 'All your "future memories" are used up. The rest of life is new and unknown.' }, cond: { minAge: 50, maxAge: 70, hasTag: 'tt_awakened', chance: 0.2 }, effects: { spr: 3 } },
    { text: { zh: '晚年的你在阳台上看着夕阳，觉得这一世活得很值。', en: 'In old age, watching the sunset on your balcony, you feel this life was worth it.' }, cond: { minAge: 60, maxAge: 85, hasTag: 'tt_awakened', chance: 0.2 }, effects: { spr: 4 } },
    { text: { zh: '你在临终前微笑着想："如果还有下一次穿越……我想再来一遍。"', en: 'On your deathbed you smile: "If I could cross over again... I\'d do it all again."' }, cond: { minAge: 65, maxAge: 90, hasTag: 'tt_awakened', chance: 0.15 }, effects: { spr: 5 } },

    ];

    window.TALENT_EVENTS_4 = TALENT_EVENTS_4;
})();
