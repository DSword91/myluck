// ========== 天赋专属事件库 第二批 ==========
// 系统加持 / 反派体质 / 锦鲤附体
(function () {
    'use strict';

    const TALENT_EVENTS_2 = [

    // ============================================================
    //  4. 系统加持 (system_cheat) — 100+ 事件
    // ============================================================
    // --- 系统觉醒 ---
    { text: { zh: '💻 你的眼前突然出现了一个半透明的系统面板！', en: '💻 A translucent system panel suddenly appeared before your eyes!' }, cond: { minAge: 5, maxAge: 8, hasTag: 'system_cheat', chance: 0.5 }, effects: { spr: 2, tag: 'sys_awakened' } },
    { text: { zh: '【系统提示】欢迎绑定人生辅助系统V2.0，请完成新手教程。', en: '[System Alert] Welcome to Life Assist System V2.0. Please complete the tutorial.' }, cond: { minAge: 5, maxAge: 10, hasTag: 'sys_awakened', chance: 0.5 }, effects: { int: 1, tag: 'sys_tutorial' } },
    { text: { zh: '【系统】新手教程完成！奖励：智力+1，系统商城已解锁。', en: '[System] Tutorial complete! Reward: INT+1, System Shop unlocked.' }, cond: { minAge: 5, maxAge: 12, hasTag: 'sys_tutorial', chance: 0.6 }, effects: { int: 1, tag: 'sys_shop' } },
    { text: { zh: '你发现系统会给你发"每日任务"，完成后有奖励。', en: 'The system sends "daily quests" — rewards for completion.' }, cond: { minAge: 6, maxAge: 15, hasTag: 'sys_awakened', chance: 0.4 }, effects: { spr: 1, tag: 'sys_daily' } },
    { text: { zh: '【系统每日任务】今日任务：跑步1公里。奖励：体质+1。你完成了！', en: '[Daily Quest] Run 1km. Reward: STR+1. Completed!' }, cond: { minAge: 6, maxAge: 20, hasTag: 'sys_daily', chance: 0.3 }, effects: { str: 1 } },
    { text: { zh: '【系统每日任务】今日任务：帮助3个人。奖励：颜值+1。你完成了！', en: '[Daily Quest] Help 3 people. Reward: CHR+1. Completed!' }, cond: { minAge: 6, maxAge: 25, hasTag: 'sys_daily', chance: 0.25 }, effects: { chr: 1 } },
    { text: { zh: '【系统每日任务】今日任务：读一本书。奖励：智力+1。你完成了！', en: '[Daily Quest] Read a book. Reward: INT+1. Completed!' }, cond: { minAge: 8, maxAge: 30, hasTag: 'sys_daily', chance: 0.25 }, effects: { int: 1 } },

    // --- 系统升级 ---
    { text: { zh: '【系统】检测到宿主等级提升！系统升级到V3.0，新功能解锁。', en: '[System] Host level up! System upgraded to V3.0. New features unlocked.' }, cond: { minAge: 12, maxAge: 15, hasTag: 'sys_awakened', chance: 0.3 }, effects: { int: 2, tag: 'sys_v3' } },
    { text: { zh: '【系统】V3.0新功能："鉴定之眼"——可以看到他人的属性面板。', en: '[System] V3.0 feature: "Appraiser\'s Eye" — view other people\'s stats.' }, cond: { minAge: 12, maxAge: 18, hasTag: 'sys_v3', chance: 0.4 }, effects: { int: 1, chr: 1, tag: 'sys_appraise' } },
    { text: { zh: '你用"鉴定之眼"发现同桌的"好感度"居然是满的。', en: 'Using "Appraiser\'s Eye," you found your deskmate\'s affection is maxed.' }, cond: { minAge: 13, maxAge: 18, hasTag: 'sys_appraise', chance: 0.2 }, effects: { spr: 2 } },
    { text: { zh: '【系统】检测到宿主面临考试，启动"临时记忆强化"。', en: '[System] Exam detected. Activating "Temporary Memory Enhancement."' }, cond: { minAge: 12, maxAge: 22, hasTag: 'sys_awakened', chance: 0.2 }, effects: { int: 2, spr: 1 } },
    { text: { zh: '【系统】宿主经验值已满，升级！全属性+1。', en: '[System] EXP full. Level up! All stats +1.' }, cond: { minAge: 15, maxAge: 30, hasTag: 'sys_awakened', chance: 0.12 }, effects: { chr: 1, int: 1, str: 1, mny: 1, spr: 1 } },
    { text: { zh: '【系统商城】限时折扣：颜值提升卡。你使用了它！', en: '[System Shop] Limited sale: CHR boost card. You used it!' }, cond: { minAge: 13, maxAge: 25, hasTag: 'sys_shop', chance: 0.15 }, effects: { chr: 2 } },
    { text: { zh: '【系统商城】限时折扣：财运加成卡。你使用了它！', en: '[System Shop] Limited sale: Fortune boost card. You used it!' }, cond: { minAge: 18, maxAge: 40, hasTag: 'sys_shop', chance: 0.12 }, effects: { mny: 3 } },
    { text: { zh: '【系统】检测到宿主情绪低落，启动"情绪稳定模块"。', en: '[System] Low mood detected. Activating "Mood Stabilizer Module."' }, cond: { minAge: 10, maxAge: 50, hasTag: 'sys_awakened', maxSpr: 3, chance: 0.3 }, effects: { spr: 3 } },

    // --- 系统任务/主线 ---
    { text: { zh: '【系统主线任务】考上重点大学。奖励：智力+3，解锁新技能。', en: '[Main Quest] Get into a top university. Reward: INT+3, new skill unlock.' }, cond: { minAge: 15, maxAge: 17, hasTag: 'sys_awakened', chance: 0.3 }, effects: { spr: 1, tag: 'sys_main_uni' } },
    { text: { zh: '【系统】主线任务完成！奖励已发放。技能"高效学习"已解锁。', en: '[System] Main quest complete! Rewards distributed. Skill "Efficient Study" unlocked.' }, cond: { minAge: 18, maxAge: 19, hasTag: 'sys_main_uni', minInt: 7, chance: 0.5 }, effects: { int: 3, tag: 'sys_efficient' } },
    { text: { zh: '【系统主线任务】在30岁前积累100万。奖励：系统V4.0。', en: '[Main Quest] Earn $1M before 30. Reward: System V4.0.' }, cond: { minAge: 22, maxAge: 25, hasTag: 'sys_awakened', chance: 0.25 }, effects: { tag: 'sys_main_rich' } },
    { text: { zh: '【系统】主线任务完成！系统升级到V4.0！终极技能"命运之眼"解锁。', en: '[System] Main quest complete! V4.0 upgrade! Ultimate skill "Eye of Fate" unlocked.' }, cond: { minAge: 25, maxAge: 32, hasTag: 'sys_main_rich', minMny: 8, chance: 0.4 }, effects: { int: 2, chr: 2, tag: 'sys_v4' } },
    { text: { zh: '【系统】隐藏任务触发：帮助100个陌生人。奖励：人生评价大幅提升。', en: '[System] Hidden quest triggered: Help 100 strangers. Reward: Life rating boost.' }, cond: { minAge: 20, maxAge: 40, hasTag: 'sys_awakened', minChr: 6, chance: 0.1 }, effects: { chr: 3, spr: 3, tag: 'sys_hidden' } },
    { text: { zh: '【系统】隐藏成就解锁："好人有好报"。好感度全局+5。', en: '[System] Hidden achievement: "Good Karma." Global affection +5.' }, cond: { minAge: 22, maxAge: 50, hasTag: 'sys_hidden', chance: 0.4 }, effects: { chr: 2, spr: 2 } },

    // --- 系统bug/搞笑 ---
    { text: { zh: '【系统】检测到Bug，正在重启……你的视野一片白光。', en: '[System] Bug detected, rebooting... Your vision goes white.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'sys_awakened', chance: 0.08 }, effects: { spr: -2, tag: 'sys_bug' } },
    { text: { zh: '【系统】已修复。歉意补偿：全属性+2。', en: '[System] Fixed. Apology compensation: All stats +2.' }, cond: { minAge: 10, maxAge: 55, hasTag: 'sys_bug', chance: 0.6 }, effects: { chr: 2, int: 2, str: 2, mny: 2, spr: 2 } },
    { text: { zh: '【系统】弹出广告："您要不要开通VIP？"你无语地关掉了。', en: '[System] Pop-up ad: "Want to upgrade to VIP?" You closed it, unamused.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'sys_awakened', chance: 0.1 }, effects: { spr: -1 } },
    { text: { zh: '【系统】抽奖活动！恭喜你获得了"颜值翻倍卡"（有效期一天）。', en: '[System] Lottery event! You won a "Double CHR Card" (1-day only).' }, cond: { minAge: 15, maxAge: 35, hasTag: 'sys_awakened', chance: 0.1 }, effects: { chr: 1, spr: 2 } },
    { text: { zh: '【系统】你今天收到了99+条系统通知，根本看不完。', en: '[System] 99+ notifications today. You can\'t possibly read them all.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'sys_awakened', chance: 0.1 }, effects: { spr: -1 } },
    { text: { zh: '【系统】计算出你今天踩狗屎的概率是87%。你决定不出门。', en: '[System] 87% chance of stepping in dog poo today. You stayed home.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'sys_awakened', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '【系统】恭喜宿主触发SSR事件："命中注定的邂逅"！', en: '[System] Congratulations! SSR event triggered: "Destined Encounter"!' }, cond: { minAge: 18, maxAge: 30, hasTag: 'sys_awakened', chance: 0.08 }, effects: { spr: 3, chr: 1, tag: 'partner' } },
    { text: { zh: '【系统】宿主的"装逼值"已溢出，请注意低调。', en: '[System] Host\'s "Show-off Meter" has overflowed. Please keep a low profile.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'sys_awakened', minChr: 8, chance: 0.08 }, effects: { spr: 1 } },

    // --- 利用系统 ---
    { text: { zh: '你利用"鉴定之眼"在面试中看穿面试官想听什么，轻松过关。', en: 'Using "Appraiser\'s Eye," you saw what the interviewer wanted — easy pass.' }, cond: { minAge: 22, maxAge: 30, hasTag: 'sys_appraise', chance: 0.3 }, effects: { mny: 2 } },
    { text: { zh: '你用系统预测了股市走势，赚了一波。', en: 'You used the system to predict stock trends — made a killing.' }, cond: { minAge: 22, maxAge: 50, hasTag: 'sys_v3', chance: 0.15 }, effects: { mny: 4, spr: 1 } },
    { text: { zh: '系统帮你计算了最佳创业时机和方向，你照做了。', en: 'The system calculated the best startup timing and direction. You followed it.' }, cond: { minAge: 25, maxAge: 35, hasTag: 'sys_v3', minInt: 6, chance: 0.12 }, effects: { mny: 3, tag: 'sys_startup' } },
    { text: { zh: '系统推荐你学习某个冷门专业，几年后这个领域爆发了。', en: 'System recommended a niche field — it exploded years later.' }, cond: { minAge: 18, maxAge: 25, hasTag: 'sys_awakened', chance: 0.1 }, effects: { int: 2, mny: 3, spr: 2 } },
    { text: { zh: '【系统】检测到附近有危险人物，建议宿主绕道。你照做了，避开了一场车祸。', en: '[System] Dangerous person nearby. Recommended detour. You avoided a car accident.' }, cond: { minAge: 15, maxAge: 60, hasTag: 'sys_awakened', chance: 0.06 }, effects: { str: 1, spr: 2 } },
    { text: { zh: '【系统】今日幸运色：红色。你穿了红色出门，果然运气超好。', en: '[System] Today\'s lucky color: red. You wore red — luck was amazing.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'sys_awakened', chance: 0.12 }, effects: { spr: 2, mny: 1 } },
    { text: { zh: '你用系统的"人际关系分析"功能找到了最合适的合作伙伴。', en: 'You used "Relationship Analysis" to find the perfect business partner.' }, cond: { minAge: 25, maxAge: 45, hasTag: 'sys_v3', minInt: 6, chance: 0.1 }, effects: { mny: 2, chr: 1 } },
    { text: { zh: '【系统】宿主健康预警！建议立即就医。你照做了，早发现了一个隐患。', en: '[System] Health alert! See a doctor now. You did, catching an issue early.' }, cond: { minAge: 30, maxAge: 60, hasTag: 'sys_awakened', chance: 0.08 }, effects: { str: 1, spr: 1 } },

    // --- 系统反思 ---
    { text: { zh: '你有时候会想：没有系统的人，他们是怎么活过来的？', en: 'Sometimes you wonder: How do people without a system get by?' }, cond: { minAge: 20, maxAge: 40, hasTag: 'sys_awakened', chance: 0.1 }, effects: { int: 1 } },
    { text: { zh: '你开始刻意关闭系统提示，尝试自己做决定。', en: 'You started deliberately closing system notifications, trusting your own judgment.' }, cond: { minAge: 25, maxAge: 40, hasTag: 'sys_awakened', minInt: 7, chance: 0.1 }, effects: { int: 1, spr: 2, tag: 'sys_independent' } },
    { text: { zh: '没有系统提示的日子，你也过得很好。原来你早已足够强大。', en: 'Days without system tips went fine. Turns out you\'re strong enough on your own.' }, cond: { minAge: 28, maxAge: 50, hasTag: 'sys_independent', chance: 0.4 }, effects: { spr: 3, int: 1 } },
    { text: { zh: '【系统】宿主，你已经不需要我了。系统即将进入休眠模式。', en: '[System] Host, you no longer need me. System entering hibernation.' }, cond: { minAge: 40, maxAge: 60, hasTag: 'sys_independent', chance: 0.3 }, effects: { spr: 2 } },
    { text: { zh: '【系统】但无论何时，只要你需要，我都在。再见。', en: '[System] But whenever you need me, I\'m here. Goodbye.' }, cond: { minAge: 40, maxAge: 65, hasTag: 'sys_independent', chance: 0.3 }, effects: { spr: 3 } },
    { text: { zh: '你在晚年回忆起系统，像回忆一位老朋友。', en: 'In old age, you reminisce about the system — like an old friend.' }, cond: { minAge: 60, maxAge: 85, hasTag: 'sys_awakened', chance: 0.3 }, effects: { spr: 2 } },

    // --- 更多系统事件 ---
    { text: { zh: '【系统】签到奖励！连续签到30天，奖励"幸运光环"。', en: '[System] Check-in reward! 30-day streak: "Lucky Aura" granted.' }, cond: { minAge: 10, maxAge: 40, hasTag: 'sys_awakened', chance: 0.12 }, effects: { mny: 1, spr: 1 } },
    { text: { zh: '【系统】宿主的魅力值触发了"万人迷"被动技能。', en: '[System] Host\'s charm triggered passive skill "Irresistible."' }, cond: { minAge: 18, maxAge: 35, hasTag: 'sys_awakened', minChr: 8, chance: 0.1 }, effects: { chr: 2, spr: 1 } },
    { text: { zh: '【系统】宿主的智力值触发了"顿悟"技能，学习速度翻倍！', en: '[System] INT triggered "Epiphany" skill — learning speed doubled!' }, cond: { minAge: 15, maxAge: 30, hasTag: 'sys_awakened', minInt: 8, chance: 0.1 }, effects: { int: 3 } },
    { text: { zh: '【系统】检测到宿主在做梦。启动"清醒梦"模式。', en: '[System] Dream detected. Activating "Lucid Dream" mode.' }, cond: { minAge: 10, maxAge: 50, hasTag: 'sys_awakened', chance: 0.08 }, effects: { spr: 2, int: 1 } },
    { text: { zh: '你在梦境中训练了各种技能，醒来后发现真的有用！', en: 'You trained skills in dreams — they actually worked after waking!' }, cond: { minAge: 10, maxAge: 50, hasTag: 'sys_awakened', chance: 0.06 }, effects: { str: 1, int: 1 } },
    { text: { zh: '【系统】春节特别活动！红包雨来临！恭喜获得：家境+2。', en: '[System] New Year Special! Red envelope rain! Reward: MNY+2.' }, cond: { minAge: 5, maxAge: 60, hasTag: 'sys_awakened', chance: 0.08 }, effects: { mny: 2, spr: 2 } },
    { text: { zh: '【系统】宿主的人生数据分析报告已生成。总结：你比97%的人过得好。', en: '[System] Life data report generated. Summary: Better than 97% of people.' }, cond: { minAge: 30, maxAge: 50, hasTag: 'sys_awakened', chance: 0.1 }, effects: { spr: 2 } },
    { text: { zh: '【系统】成就达成！"百万富翁"。奖励：金色边框。', en: '[System] Achievement unlocked! "Millionaire." Reward: Gold border.' }, cond: { minAge: 25, maxAge: 50, hasTag: 'sys_awakened', minMny: 8, chance: 0.2 }, effects: { spr: 2, mny: 1 } },
    { text: { zh: '【系统】成就达成！"知识渊博"。奖励：智慧光环。', en: '[System] Achievement unlocked! "Knowledgeable." Reward: Wisdom Aura.' }, cond: { minAge: 20, maxAge: 50, hasTag: 'sys_awakened', minInt: 9, chance: 0.2 }, effects: { int: 1, chr: 1 } },
    { text: { zh: '【系统】每周挑战：连续7天不迟到。你完成了！奖励：快乐+2。', en: '[System] Weekly challenge: No tardiness for 7 days. Completed! SPR+2.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'sys_awakened', chance: 0.1 }, effects: { spr: 2 } },

    // ============================================================
    //  5. 反派体质 (villain) — 100+ 事件
    // ============================================================
    // --- 童年霉运 ---
    { text: { zh: '🌧️ 你又一次被命运捉弄了——出门就下雨，考试就忘带准考证。', en: '🌧️ Fate played tricks again — rain whenever you go out, forgot exam ID.' }, cond: { minAge: 10, maxAge: 29, hasTag: 'villain', chance: 0.2 }, effects: { spr: -2 } },
    { text: { zh: '😈 别人的好运好像都被你吸走了，你简直是行走的霉运。', en: '😈 Others\' luck seems absorbed by you — you\'re a walking bad omen.' }, cond: { minAge: 15, maxAge: 29, hasTag: 'villain', chance: 0.15 }, effects: { spr: -1, chr: -1 } },
    { text: { zh: '你人生中的每一把伞都会丢，你已经买了第47把了。', en: 'You\'ve lost every umbrella you\'ve ever owned — on #47 now.' }, cond: { minAge: 8, maxAge: 29, hasTag: 'villain', chance: 0.15 }, effects: { spr: -1, mny: -1 } },
    { text: { zh: '你的作业明明写完了，到学校才发现落在家里了。', en: 'You finished homework but left it at home — discovered at school.' }, cond: { minAge: 7, maxAge: 15, hasTag: 'villain', chance: 0.2 }, effects: { spr: -1 } },
    { text: { zh: '你被选中出黑板报，结果画完的当天黑板被人擦了。', en: 'You were chosen for the bulletin board — it got erased the same day.' }, cond: { minAge: 8, maxAge: 14, hasTag: 'villain', chance: 0.15 }, effects: { spr: -2 } },
    { text: { zh: '你参加比赛总是拿第二名。每一次。', en: 'You always get second place. Every. Single. Time.' }, cond: { minAge: 8, maxAge: 20, hasTag: 'villain', chance: 0.2 }, effects: { spr: -1, int: 1 } },
    { text: { zh: '你好不容易鼓起勇气表白，结果对方刚好和别人在一起了。', en: 'You finally confessed — they just started dating someone else.' }, cond: { minAge: 14, maxAge: 22, hasTag: 'villain', chance: 0.15 }, effects: { spr: -3 } },
    { text: { zh: '你精心准备的面试，面试官突然说"今天面试取消了"。', en: 'Your carefully prepared interview was suddenly cancelled.' }, cond: { minAge: 20, maxAge: 28, hasTag: 'villain', chance: 0.15 }, effects: { spr: -2 } },
    { text: { zh: '你的手机屏幕又碎了。这是今年第三次。', en: 'Your phone screen cracked again. Third time this year.' }, cond: { minAge: 12, maxAge: 29, hasTag: 'villain', chance: 0.12 }, effects: { mny: -1, spr: -1 } },
    { text: { zh: '你买什么什么跌，卖什么什么涨。你已经绝望了。', en: 'Everything you buy drops, everything you sell rises. You\'re in despair.' }, cond: { minAge: 20, maxAge: 29, hasTag: 'villain', chance: 0.12 }, effects: { mny: -2, spr: -2 } },
    { text: { zh: '你的好朋友因为误会和你绝交了。你试图解释但没人相信。', en: 'Your best friend cut you off due to a misunderstanding. Nobody believed you.' }, cond: { minAge: 12, maxAge: 25, hasTag: 'villain', chance: 0.1 }, effects: { spr: -3, chr: -1 } },
    { text: { zh: '你踩到了一颗钉子，缝了五针。路人说"你走路也能受伤？"', en: 'You stepped on a nail — 5 stitches. Passerby: "You get hurt just walking?"' }, cond: { minAge: 10, maxAge: 29, hasTag: 'villain', chance: 0.1 }, effects: { str: -1, spr: -1 } },
    { text: { zh: '你刚洗完的衣服被鸟屎砸中了。你开始怀疑人生。', en: 'Your freshly washed clothes got hit by bird poop. You question life.' }, cond: { minAge: 10, maxAge: 29, hasTag: 'villain', chance: 0.1 }, effects: { spr: -1 } },
    { text: { zh: '过年别人抢红包手气最佳，你永远是0.01元。', en: 'During red envelope events, everyone gets the best luck — you always get $0.01.' }, cond: { minAge: 10, maxAge: 29, hasTag: 'villain', chance: 0.1 }, effects: { spr: -1 } },
    { text: { zh: '你煮了一锅泡面，筷子断了，面掉到了地上。', en: 'You cooked instant noodles, your chopsticks broke, noodles fell on the floor.' }, cond: { minAge: 12, maxAge: 29, hasTag: 'villain', chance: 0.1 }, effects: { spr: -1 } },

    // --- 转折（30岁后逆袭）---
    { text: { zh: '🔥 你30岁了！突然间，你感到体内涌起了前所未有的力量！', en: '🔥 You turned 30! Suddenly, an unprecedented power surged within you!' }, cond: { minAge: 30, maxAge: 30, hasTag: 'villain' }, effects: { spr: 5, str: 3, tag: 'villain_reversal' } },
    { text: { zh: '命运之轮开始逆转——你做什么都开始顺了。', en: 'The wheel of fortune reversed — everything starts going your way.' }, cond: { minAge: 30, maxAge: 32, hasTag: 'villain_reversal', chance: 0.5 }, effects: { spr: 3, mny: 2 } },
    { text: { zh: '你被升职了！上司说你这些年的坚持让人佩服。', en: 'You got promoted! Your boss said your persistence is admirable.' }, cond: { minAge: 30, maxAge: 35, hasTag: 'villain_reversal', chance: 0.3 }, effects: { mny: 3, chr: 1, spr: 2 } },
    { text: { zh: '你终于遇到了对的人。之前那些痛苦都不算什么了。', en: 'You finally met the right person. All past suffering seems worthwhile.' }, cond: { minAge: 30, maxAge: 38, hasTag: 'villain_reversal', chance: 0.2 }, effects: { spr: 5, tag: 'partner' } },
    { text: { zh: '你的创业项目成功了！之前失败的经验全派上了用场。', en: 'Your startup succeeded! All past failures proved useful.' }, cond: { minAge: 30, maxAge: 40, hasTag: 'villain_reversal', minInt: 6, chance: 0.15 }, effects: { mny: 5, spr: 3, tag: 'villain_success' } },
    { text: { zh: '你的公司上市了。曾经嘲笑你的人都惊呆了。', en: 'Your company went public. People who mocked you are stunned.' }, cond: { minAge: 33, maxAge: 50, hasTag: 'villain_success', chance: 0.3 }, effects: { mny: 6, chr: 3, spr: 4 } },
    { text: { zh: '你投资的项目暴涨了1000%！这就是反派体质的"报复性运气"。', en: 'Your investment surged 1000%! This is the "revenge luck" of villain fate.' }, cond: { minAge: 30, maxAge: 45, hasTag: 'villain_reversal', chance: 0.1 }, effects: { mny: 5, spr: 3 } },
    { text: { zh: '你中了彩票一等奖！命运终于还了你逆袭的机会。', en: 'You won the lottery jackpot! Fate finally gave you a comeback.' }, cond: { minAge: 30, maxAge: 50, hasTag: 'villain_reversal', chance: 0.05 }, effects: { mny: 8, spr: 5 } },
    { text: { zh: '你出了一本自传《前半生是地狱》，成了畅销书。', en: 'You published an autobiography "My First Half Was Hell" — bestseller.' }, cond: { minAge: 33, maxAge: 50, hasTag: 'villain_reversal', minInt: 6, chance: 0.1 }, effects: { mny: 3, chr: 2, spr: 2 } },
    { text: { zh: '你被邀请上了综艺节目，分享"从倒霉鬼到逆袭王"的故事。', en: 'You were invited on a variety show to share your "underdog to king" story.' }, cond: { minAge: 32, maxAge: 50, hasTag: 'villain_reversal', chance: 0.1 }, effects: { chr: 2, mny: 1, spr: 2 } },
    { text: { zh: '曾经欺负你的人来找你借钱了。你犹豫了一下，还是帮了他。', en: 'Someone who bullied you came asking for money. You hesitated, then helped.' }, cond: { minAge: 32, maxAge: 50, hasTag: 'villain_reversal', minMny: 6, chance: 0.1 }, effects: { chr: 2, spr: 2 } },
    { text: { zh: '你回到母校做了一场演讲："坚持，命运迟早会到来。"', en: 'You spoke at your alma mater: "Persist, and fate will arrive."' }, cond: { minAge: 35, maxAge: 55, hasTag: 'villain_reversal', chance: 0.1 }, effects: { chr: 2, spr: 3 } },

    // --- 反派日常/搞笑 ---
    { text: { zh: '你点外卖永远缺一样东西，不是少了筷子就是少了汤。', en: 'Your delivery always misses something — chopsticks or soup, every time.' }, cond: { minAge: 18, maxAge: 29, hasTag: 'villain', chance: 0.12 }, effects: { spr: -1 } },
    { text: { zh: '你吃瓜子永远只嗑到空壳。', en: 'You always crack open empty sunflower seeds.' }, cond: { minAge: 8, maxAge: 29, hasTag: 'villain', chance: 0.1 }, effects: { spr: -1 } },
    { text: { zh: '你排队的那条总是最慢的。', en: 'Your line is always the slowest.' }, cond: { minAge: 10, maxAge: 29, hasTag: 'villain', chance: 0.12 }, effects: { spr: -1 } },
    { text: { zh: '你遇到了一个超级讨厌你的邻居，天天投诉。', en: 'Your neighbor hates you and complains about you daily.' }, cond: { minAge: 20, maxAge: 29, hasTag: 'villain', chance: 0.1 }, effects: { spr: -2 } },
    { text: { zh: '逆袭之后你送给那个讨厌你的邻居一个大蛋糕。他懵了。', en: 'After your reversal, you sent the annoying neighbor a big cake. He was stunned.' }, cond: { minAge: 30, maxAge: 40, hasTag: 'villain_reversal', chance: 0.15 }, effects: { spr: 2, chr: 1 } },
    { text: { zh: '30岁后你买什么什么涨，朋友们都让你带着买。', en: 'After 30, everything you buy goes up. Friends ask you to invest for them.' }, cond: { minAge: 30, maxAge: 50, hasTag: 'villain_reversal', chance: 0.15 }, effects: { mny: 2, spr: 2 } },

    // --- 反派深层 ---
    { text: { zh: '你开始明白：苦难是化了妆的祝福。', en: 'You started to understand: suffering is a blessing in disguise.' }, cond: { minAge: 35, maxAge: 55, hasTag: 'villain_reversal', chance: 0.15 }, effects: { int: 2, spr: 3 } },
    { text: { zh: '你成立了一个基金会帮助那些运气不好的人，因为你最懂他们。', en: 'You founded a charity for the unlucky — because you understand them best.' }, cond: { minAge: 35, maxAge: 55, hasTag: 'villain_reversal', minMny: 7, chance: 0.08 }, effects: { chr: 3, spr: 3, mny: -2 } },
    { text: { zh: '回顾过去后你释怀了——没有当年的苦，就没有如今的甜。', en: 'Looking back, you found peace — no bitter past, no sweet present.' }, cond: { minAge: 45, maxAge: 70, hasTag: 'villain_reversal', chance: 0.2 }, effects: { spr: 4 } },
    { text: { zh: '你的人生被拍成了电影《反转人生》，票房大卖。', en: 'Your life was made into a movie "Reversed Life" — box office hit.' }, cond: { minAge: 40, maxAge: 60, hasTag: 'villain_reversal', chance: 0.08 }, effects: { mny: 4, chr: 3, spr: 3 } },
    { text: { zh: '你告诫年轻人："被命运打倒不可怕，爬起来就行。"', en: 'You tell young people: "Being knocked down by fate isn\'t scary — just get up."' }, cond: { minAge: 40, maxAge: 70, hasTag: 'villain_reversal', chance: 0.15 }, effects: { spr: 2, chr: 1 } },

    // ============================================================
    //  6. 锦鲤附体 (koi_luck) — 100+ 事件
    // ============================================================
    // --- 日常惊喜 ---
    { text: { zh: '🎏 你走在路边，居然捡到了一百块钱！', en: '🎏 You found $100 on the street!' }, cond: { minAge: 5, maxAge: 70, hasTag: 'koi_luck', chance: 0.12 }, effects: { mny: 1, spr: 2 } },
    { text: { zh: '你抽奖中了头奖！虽然是一箱方便面，但你开心了一天。', en: 'You won the raffle — a box of instant noodles, but you were happy all day.' }, cond: { minAge: 8, maxAge: 50, hasTag: 'koi_luck', chance: 0.1 }, effects: { spr: 2 } },
    { text: { zh: '超市大促销，你正巧路过，买到了一折的好东西。', en: 'Lucky timing — you passed a supermarket having a 90% off sale.' }, cond: { minAge: 10, maxAge: 60, hasTag: 'koi_luck', chance: 0.12 }, effects: { mny: 1, spr: 1 } },
    { text: { zh: '你在自动售货机买饮料，掉了两瓶出来。', en: 'You bought one drink from the vending machine — two fell out.' }, cond: { minAge: 8, maxAge: 50, hasTag: 'koi_luck', chance: 0.12 }, effects: { spr: 2 } },
    { text: { zh: '你随便拍了一张照片，意外获得了摄影比赛大奖。', en: 'A random photo you took unexpectedly won a photography contest.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'koi_luck', chance: 0.06 }, effects: { mny: 2, chr: 1, spr: 2 } },
    { text: { zh: '你迟到了，但老板恰好也迟到了。完美掩护。', en: 'You were late, but the boss was late too. Perfect cover.' }, cond: { minAge: 22, maxAge: 45, hasTag: 'koi_luck', chance: 0.12 }, effects: { spr: 2 } },
    { text: { zh: '你的快递虽然显示"运输中"已经一周了，但今天居然到了，还多了一件赠品。', en: 'Your package showed "in transit" for a week, but arrived today with a free gift.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'koi_luck', chance: 0.1 }, effects: { spr: 2 } },
    { text: { zh: '你考试时蒙的那道题居然对了！', en: 'The answer you guessed on the exam was actually correct!' }, cond: { minAge: 8, maxAge: 22, hasTag: 'koi_luck', chance: 0.15 }, effects: { spr: 1, int: 1 } },
    { text: { zh: '你随手买的彩票中了小奖，不多但够吃一顿好的。', en: 'A scratch ticket you bought on a whim won a small prize — enough for a nice meal.' }, cond: { minAge: 18, maxAge: 60, hasTag: 'koi_luck', chance: 0.12 }, effects: { mny: 2, spr: 2 } },
    { text: { zh: '你在旧书摊上花10块钱买了一本旧书，里面夹着一张老版人民币，价值几千。', en: 'You bought a $1 old book — found a rare bill inside worth thousands.' }, cond: { minAge: 15, maxAge: 60, hasTag: 'koi_luck', chance: 0.05 }, effects: { mny: 3, spr: 3 } },

    // --- 大运/转机 ---
    { text: { zh: '🍀 你毫无准备地参加了面试，居然被录取了。HR说"你有种说不出的气场"。', en: '🍀 You went to an interview unprepared and got hired. HR said "you have an indescribable aura."' }, cond: { minAge: 22, maxAge: 35, hasTag: 'koi_luck', chance: 0.1 }, effects: { mny: 2, spr: 2 } },
    { text: { zh: '你随便投了一份简历，结果收到了你梦想公司的offer。', en: 'You randomly submitted a resume and got an offer from your dream company.' }, cond: { minAge: 22, maxAge: 35, hasTag: 'koi_luck', chance: 0.08 }, effects: { mny: 3, spr: 3, tag: 'koi_dream_job' } },
    { text: { zh: '你买的基金涨了500%！但你其实是手滑买错了。', en: 'Your fund went up 500%! But you bought it by accident.' }, cond: { minAge: 22, maxAge: 50, hasTag: 'koi_luck', chance: 0.05 }, effects: { mny: 5, spr: 3 } },
    { text: { zh: '你随便选的号码中了彩票大奖！！', en: 'Random numbers you chose won the lottery jackpot!!' }, cond: { minAge: 18, maxAge: 60, hasTag: 'koi_luck', chance: 0.03 }, effects: { mny: 8, spr: 5 } },
    { text: { zh: '你在人才市场随便逛逛，结果遇到了改变一生的贵人。', en: 'You casually browsed a job fair and met a life-changing mentor.' }, cond: { minAge: 22, maxAge: 35, hasTag: 'koi_luck', chance: 0.08 }, effects: { chr: 2, mny: 2, tag: 'koi_mentor' } },
    { text: { zh: '贵人推荐你进入了行业核心圈子，从此事业飞速发展。', en: 'Your mentor got you into the industry\'s inner circle — career skyrocketed.' }, cond: { minAge: 25, maxAge: 40, hasTag: 'koi_mentor', chance: 0.4 }, effects: { mny: 4, chr: 2, spr: 2 } },
    { text: { zh: '你在路上帮了一个老人，后来发现他是某公司的退休董事长。', en: 'You helped an old man on the street — turned out he\'s a retired CEO.' }, cond: { minAge: 18, maxAge: 45, hasTag: 'koi_luck', chance: 0.05 }, effects: { mny: 3, chr: 2 } },
    { text: { zh: '你被选中参加一个节目，获得了曝光机会。', en: 'You were randomly selected for a TV show — got exposure.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'koi_luck', chance: 0.06 }, effects: { chr: 2, spr: 2, mny: 1 } },
    { text: { zh: '你的朋友创业缺人，拉你入伙，后来公司上市了。你只是因为幸运。', en: 'Your friend needed a co-founder, pulled you in. Company IPO\'d. You just got lucky.' }, cond: { minAge: 25, maxAge: 40, hasTag: 'koi_luck', chance: 0.04 }, effects: { mny: 7, spr: 4 } },
    { text: { zh: '你在跳蚤市场用50块买的画，竟然是大师真迹！', en: 'A $5 painting from a flea market turned out to be a masterpiece!' }, cond: { minAge: 20, maxAge: 60, hasTag: 'koi_luck', chance: 0.03 }, effects: { mny: 5, spr: 4 } },

    // --- 感情运 ---
    { text: { zh: '你在等公交时遇到了一个特别合拍的人，你们自然而然在一起了。', en: 'You met someone perfectly compatible at the bus stop — dating naturally happened.' }, cond: { minAge: 18, maxAge: 35, hasTag: 'koi_luck', chance: 0.1 }, effects: { spr: 3, tag: 'partner' } },
    { text: { zh: '你们第一次约会就下了一场浪漫的雪，像电影场景。', en: 'Your first date had romantic snowfall — like a movie scene.' }, cond: { minAge: 18, maxAge: 35, hasTag: 'koi_luck', hasTag2: 'partner', chance: 0.15 }, effects: { spr: 3 } },
    { text: { zh: '你的孩子天生健康聪慧，医生说"基因太好了"。', en: 'Your child was born healthy and smart — doctor said "incredible genes."' }, cond: { minAge: 28, maxAge: 38, hasTag: 'koi_luck', hasTag2: 'parent', chance: 0.2 }, effects: { spr: 3, int: 1 } },

    // --- 避祸/化险 ---
    { text: { zh: '你因为忘带东西折返，恰好避开了一场车祸。', en: 'You turned back for something forgotten and narrowly avoided a car crash.' }, cond: { minAge: 15, maxAge: 60, hasTag: 'koi_luck', chance: 0.05 }, effects: { spr: 2 } },
    { text: { zh: '你迟到了没赶上那班飞机。结果那班飞机延误了8小时。', en: 'You missed your flight. It ended up delayed 8 hours.' }, cond: { minAge: 20, maxAge: 55, hasTag: 'koi_luck', chance: 0.06 }, effects: { spr: 2 } },
    { text: { zh: '你身体不舒服去做了个检查，早期发现了一个隐患并及时治愈。', en: 'You went for a checkup, caught a hidden issue early, and it was cured.' }, cond: { minAge: 30, maxAge: 60, hasTag: 'koi_luck', chance: 0.06 }, effects: { str: 1, spr: 2 } },
    { text: { zh: '你出门时下意识换了条路走，结果避开了塌方区域。', en: 'You instinctively took a different route — avoided a landslide area.' }, cond: { minAge: 15, maxAge: 60, hasTag: 'koi_luck', chance: 0.04 }, effects: { spr: 2 } },
    { text: { zh: '你被困在暴风雪中，但恰好有一家温暖的小旅馆出现在路边。', en: 'Caught in a blizzard — a warm little inn appeared just by the roadside.' }, cond: { minAge: 18, maxAge: 55, hasTag: 'koi_luck', chance: 0.04 }, effects: { spr: 3 } },

    // --- 搞笑/荒诞好运 ---
    { text: { zh: '你吃到了双黄蛋，连吃了三个都是双黄。你开始怀疑养鸡场。', en: 'You cracked three eggs in a row — all double yolks. You suspect the farm.' }, cond: { minAge: 5, maxAge: 60, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '你在夹娃娃机上一次就夹到了最大的玩偶。旁边的小朋友崇拜地看着你。', en: 'You won the biggest plush on the first try. A kid stared in awe.' }, cond: { minAge: 8, maxAge: 40, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 2, chr: 1 } },
    { text: { zh: '你打完喷嚏恰好赶上绿灯，一路无阻到了目的地。', en: 'You sneezed and caught every green light straight to your destination.' }, cond: { minAge: 18, maxAge: 60, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '你的WiFi信号永远满格，在电梯里也一样。', en: 'Your WiFi signal is always full — even in the elevator.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '你去结冰棍，抽到了"再来一根"，又抽到了"再来一根"。', en: 'You bought a popsicle and got "free one" — twice in a row.' }, cond: { minAge: 5, maxAge: 30, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 2 } },
    { text: { zh: '你网购从来不需要退货，买什么都完美合适。', en: 'You never need to return online purchases — everything fits perfectly.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '你的外卖从来都比预计时间早到10分钟。', en: 'Your food delivery always arrives 10 minutes early.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'koi_luck', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '你被抽中参加综艺节目，台上莫名其妙地演了个完美表演。', en: 'You were randomly picked for a TV show and somehow gave a perfect performance.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'koi_luck', chance: 0.04 }, effects: { chr: 2, spr: 3 } },

    // --- 晚年好运 ---
    { text: { zh: '你的晚年生活特别平静幸福，身边的人都说你有"福相"。', en: 'Your later years are peaceful and happy — everyone says you have a "blessed face."' }, cond: { minAge: 55, maxAge: 80, hasTag: 'koi_luck', chance: 0.2 }, effects: { spr: 3, chr: 1 } },
    { text: { zh: '你在公园散步时发现了一株四叶草，你把它送给了孙子/孙女。', en: 'While walking in the park, you found a four-leaf clover and gave it to your grandchild.' }, cond: { minAge: 55, maxAge: 80, hasTag: 'koi_luck', chance: 0.1 }, effects: { spr: 3 } },
    { text: { zh: '你的人生像是有人在暗中保护一样，总能逢凶化吉。你心怀感恩。', en: 'Your life seems guarded — always turning misfortune to fortune. You\'re grateful.' }, cond: { minAge: 50, maxAge: 80, hasTag: 'koi_luck', chance: 0.15 }, effects: { spr: 3 } },

    ];

    window.TALENT_EVENTS_2 = TALENT_EVENTS_2;
})();
