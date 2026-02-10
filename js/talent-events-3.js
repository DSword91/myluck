// ========== 天赋专属事件库 第三批 ==========
// 时间回溯 / 社恐
(function () {
    'use strict';

    const TALENT_EVENTS_3 = [

    // ============================================================
    //  7. 时间回溯 (time_loop) — 100+ 事件
    // ============================================================
    // --- 觉醒 ---
    { text: { zh: '⏳ 你做了一个梦，梦见明天会发生的事。然后……它真的发生了。', en: '⏳ You dreamed of tomorrow\'s events. Then... they actually happened.' }, cond: { minAge: 7, maxAge: 12, hasTag: 'time_loop', chance: 0.4 }, effects: { spr: 2, int: 1, tag: 'tl_awakened' } },
    { text: { zh: '你开始频繁地产生一种"这件事我经历过"的感觉。', en: 'You keep getting an overwhelming sense of déjà vu.' }, cond: { minAge: 8, maxAge: 15, hasTag: 'time_loop', chance: 0.3 }, effects: { int: 1, tag: 'tl_dejavu' } },
    { text: { zh: '你发现你可以"预感"即将发生的坏事，每次都能提前规避。', en: 'You can "sense" bad events before they happen — always dodging them.' }, cond: { minAge: 10, maxAge: 18, hasTag: 'tl_awakened', chance: 0.3 }, effects: { spr: 2, tag: 'tl_premonition' } },
    { text: { zh: '你在危急时刻，时间突然变慢了——你看到了一切的轨迹，做出了完美的闪避。', en: 'In a crisis, time slowed — you saw every trajectory and dodged perfectly.' }, cond: { minAge: 12, maxAge: 50, hasTag: 'tl_awakened', chance: 0.1 }, effects: { str: 2, spr: 2 } },
    { text: { zh: '你确信了：你拥有"回溯"的能力，可以在特定时刻回到几分钟前。', en: 'You\'re certain: you have "rewind" — returning to moments minutes ago.' }, cond: { minAge: 12, maxAge: 18, hasTag: 'tl_awakened', chance: 0.3 }, effects: { int: 2, spr: 1, tag: 'tl_rewind' } },

    // --- 利用回溯 ---
    { text: { zh: '你在考试中利用回溯，把不确定的题目都试了一遍，选了最优答案。', en: 'You rewound during an exam, trying every uncertain answer — chose the best.' }, cond: { minAge: 12, maxAge: 22, hasTag: 'tl_rewind', chance: 0.2 }, effects: { int: 2 } },
    { text: { zh: '你用回溯避免了一次和朋友的争吵。你选择了更温和的措辞重新来过。', en: 'You rewound to avoid a fight with a friend, choosing gentler words.' }, cond: { minAge: 10, maxAge: 40, hasTag: 'tl_rewind', chance: 0.15 }, effects: { chr: 1, spr: 2 } },
    { text: { zh: '你在表白前回溯了三次，终于找到了最完美的告白方式。', en: 'You rewound three times before confessing — found the perfect way.' }, cond: { minAge: 15, maxAge: 28, hasTag: 'tl_rewind', chance: 0.1 }, effects: { spr: 3, tag: 'partner' } },
    { text: { zh: '你用回溯在游戏中无限读档，从来没输过。朋友们觉得你是游戏天才。', en: 'You "save-loaded" in games — never lost. Friends think you\'re a gaming prodigy.' }, cond: { minAge: 10, maxAge: 25, hasTag: 'tl_rewind', chance: 0.15 }, effects: { spr: 2 } },
    { text: { zh: '你用回溯避免了一次交通事故。你提前几秒按了刹车。', en: 'You rewound and braked seconds early, preventing a traffic accident.' }, cond: { minAge: 18, maxAge: 60, hasTag: 'tl_rewind', chance: 0.08 }, effects: { str: 1, spr: 2 } },
    { text: { zh: '你利用回溯在股市中做了几次精准的低买高卖。', en: 'You rewound to make perfect trades in the stock market.' }, cond: { minAge: 22, maxAge: 50, hasTag: 'tl_rewind', chance: 0.08 }, effects: { mny: 4 } },
    { text: { zh: '你用回溯重来了一次面试，纠正了上一次手忙脚乱的回答。', en: 'You rewound an interview, fixing your nervous responses from before.' }, cond: { minAge: 22, maxAge: 35, hasTag: 'tl_rewind', chance: 0.12 }, effects: { mny: 2, chr: 1 } },
    { text: { zh: '你回溯了一次重要的商业谈判，用上一次获取的信息在这次中占据了上风。', en: 'You rewound a key business negotiation, using prior info to gain the upper hand.' }, cond: { minAge: 25, maxAge: 50, hasTag: 'tl_rewind', chance: 0.08 }, effects: { mny: 3, int: 1 } },
    { text: { zh: '你在做菜的时候烧焦了，回溯后精准把控了火候，做出了完美料理。', en: 'You burned dinner, rewound, and cooked it perfectly with precise timing.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'tl_rewind', chance: 0.1 }, effects: { spr: 2 } },
    { text: { zh: '你学乐器的时候回溯了无数次，一首曲子你只用了一天就完美演奏。', en: 'You rewound countless times learning an instrument — perfected a piece in one day.' }, cond: { minAge: 10, maxAge: 35, hasTag: 'tl_rewind', chance: 0.08 }, effects: { chr: 1, int: 1 } },

    // --- 代价/副作用 ---
    { text: { zh: '频繁使用回溯让你出现了头痛和恶心。你的身体在发出警告。', en: 'Frequent rewinding causes headaches and nausea. Your body is warning you.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'tl_rewind', chance: 0.12 }, effects: { str: -1, spr: -2, tag: 'tl_side_effect' } },
    { text: { zh: '你发现每次回溯后，你会觉得"时间变得不真实"。', en: 'After each rewind, time feels "unreal" to you.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'tl_rewind', chance: 0.08 }, effects: { spr: -2 } },
    { text: { zh: '你尝试回溯太远——剧烈的鼻血流下，你差点昏倒。', en: 'You tried rewinding too far — a nosebleed and you nearly fainted.' }, cond: { minAge: 15, maxAge: 50, hasTag: 'tl_rewind', chance: 0.06 }, effects: { str: -2, spr: -2, tag: 'tl_danger' } },
    { text: { zh: '你回溯了同一段时间太多次，记忆开始混乱——哪个版本是真的？', en: 'You rewound the same moment too many times — memories blur. Which version was real?' }, cond: { minAge: 15, maxAge: 50, hasTag: 'tl_rewind', chance: 0.06 }, effects: { int: -1, spr: -3 } },
    { text: { zh: '你试图回溯挽救某个失去的人，但无论怎么做，结果都不变。', en: 'You tried rewinding to save someone — no matter what, the outcome stayed the same.' }, cond: { minAge: 20, maxAge: 60, hasTag: 'tl_rewind', chance: 0.05 }, effects: { spr: -5, tag: 'tl_fixed_fate' } },
    { text: { zh: '你意识到有些事情是"命运锁定"的——回溯也改变不了。', en: 'You realized some things are "fate-locked" — even rewinding can\'t change them.' }, cond: { minAge: 20, maxAge: 60, hasTag: 'tl_fixed_fate', chance: 0.5 }, effects: { int: 2, spr: -1 } },
    { text: { zh: '你的回溯能力似乎在减弱。你不知道它会不会完全消失。', en: 'Your rewind ability seems to be fading. You don\'t know if it\'ll disappear entirely.' }, cond: { minAge: 35, maxAge: 60, hasTag: 'tl_rewind', chance: 0.1 }, effects: { spr: -2, tag: 'tl_fading' } },
    { text: { zh: '你已经无法区分"原始记忆"和"回溯后的记忆"了。', en: 'You can no longer distinguish original memories from rewound ones.' }, cond: { minAge: 35, maxAge: 65, hasTag: 'tl_fading', chance: 0.3 }, effects: { int: -1, spr: -2 } },

    // --- 哲学思考 ---
    { text: { zh: '你开始思考：如果可以回到过去，人生还有什么意义？', en: 'You ponder: If you can rewind, does life even have meaning?' }, cond: { minAge: 18, maxAge: 40, hasTag: 'tl_rewind', minInt: 6, chance: 0.1 }, effects: { int: 2, spr: -1 } },
    { text: { zh: '你选择不再使用回溯。"让我像普通人一样生活吧。"', en: 'You chose to stop rewinding. "Let me live like an ordinary person."' }, cond: { minAge: 25, maxAge: 45, hasTag: 'tl_rewind', chance: 0.08 }, effects: { spr: 3, int: 1, tag: 'tl_stopped' } },
    { text: { zh: '不用回溯的日子里，你反而更珍惜每一秒。', en: 'Without rewinding, you cherish every second even more.' }, cond: { minAge: 25, maxAge: 60, hasTag: 'tl_stopped', chance: 0.3 }, effects: { spr: 3 } },
    { text: { zh: '你犯了一个错误，但这次你没有回溯。你接受了它。', en: 'You made a mistake but didn\'t rewind. You accepted it.' }, cond: { minAge: 25, maxAge: 60, hasTag: 'tl_stopped', chance: 0.3 }, effects: { spr: 2, int: 1 } },
    { text: { zh: '你终于明白了：完美的人生是不存在的，而不完美才是生活的意义。', en: 'You finally understood: a perfect life doesn\'t exist — imperfection IS the meaning.' }, cond: { minAge: 30, maxAge: 60, hasTag: 'tl_stopped', chance: 0.2 }, effects: { spr: 5, int: 2 } },

    // --- 紧急使用 ---
    { text: { zh: '你的孩子发生了危险，你不由自主地使用了回溯来挽救他。', en: 'Your child was in danger — you reflexively rewound to save them.' }, cond: { minAge: 30, maxAge: 55, hasTag: 'tl_rewind', hasTag2: 'parent', chance: 0.08 }, effects: { spr: 2, str: -1, tag: 'tl_emergency' } },
    { text: { zh: '回溯救了一条命，但你的鼻子流了三天的血。你知道这是最后几次了。', en: 'Rewinding saved a life, but your nose bled for three days. You know these are the last times.' }, cond: { minAge: 30, maxAge: 60, hasTag: 'tl_emergency', chance: 0.4 }, effects: { str: -2, spr: 1 } },

    // --- 搞笑/日常 ---
    { text: { zh: '你回溯了一次尴尬的社交场合。"这次我不会叫错名字了。"', en: 'You rewound an awkward social moment. "I won\'t get their name wrong this time."' }, cond: { minAge: 10, maxAge: 40, hasTag: 'tl_rewind', chance: 0.12 }, effects: { spr: 1, chr: 1 } },
    { text: { zh: '你回溯了吃饭这件事三次，就为了多吃三遍那个甜品。', en: 'You rewound eating three times — just to enjoy the dessert three more times.' }, cond: { minAge: 10, maxAge: 40, hasTag: 'tl_rewind', chance: 0.08 }, effects: { spr: 2 } },
    { text: { zh: '你回溯了和喜欢的人的对话，每次都尝试一个不同的搞笑开场白。', en: 'You rewound conversations with your crush, trying different funny openers each time.' }, cond: { minAge: 14, maxAge: 28, hasTag: 'tl_rewind', chance: 0.08 }, effects: { chr: 1, spr: 2 } },
    { text: { zh: '你用回溯提前知道了今天食堂的饭菜是什么。决定带便当。', en: 'You rewound to preview the cafeteria menu today — decided to bring lunch.' }, cond: { minAge: 12, maxAge: 30, hasTag: 'tl_rewind', chance: 0.08 }, effects: { spr: 1 } },
    { text: { zh: '你在抽盲盒时回溯了十次。终于抽到了隐藏款。', en: 'You rewound blind box pulls ten times. Finally got the hidden edition.' }, cond: { minAge: 10, maxAge: 35, hasTag: 'tl_rewind', chance: 0.06 }, effects: { spr: 3 } },
    { text: { zh: '你回溯了教练教你开车的过程五次，一天就拿到了驾照。', en: 'You rewound driving lessons five times — got your license in one day.' }, cond: { minAge: 18, maxAge: 25, hasTag: 'tl_rewind', chance: 0.1 }, effects: { int: 1, spr: 1 } },

    // --- 晚年 ---
    { text: { zh: '你的回溯能力彻底消失了。你把这个秘密带入了坟墓。', en: 'Your rewind ability vanished completely. You took this secret to the grave.' }, cond: { minAge: 55, maxAge: 80, hasTag: 'tl_rewind', chance: 0.2 }, effects: { spr: 2 } },
    { text: { zh: '你写了一本小说描述"一个可以回溯时间的人"。读者说"太有真实感了"。', en: 'You wrote a novel about "a person who can rewind time." Readers said "too realistic."' }, cond: { minAge: 35, maxAge: 70, hasTag: 'tl_rewind', minInt: 7, chance: 0.08 }, effects: { mny: 2, chr: 2, spr: 2 } },
    { text: { zh: '晚年的你回忆起回溯的日子，觉得最珍贵的其实是那些没有回溯的时刻。', en: 'In old age, you recall your rewind days — the unrewound moments were most precious.' }, cond: { minAge: 60, maxAge: 85, hasTag: 'tl_rewind', chance: 0.2 }, effects: { spr: 3 } },

    // ============================================================
    //  8. 社恐 (social_anxiety) — 100+ 事件
    // ============================================================
    // -- 社恐觉醒 ---
    { text: { zh: '😰 你从小就害怕和陌生人说话。妈妈说"这孩子就是害羞"。', en: '😰 You\'ve always been afraid of talking to strangers. Mom said "this child is just shy."' }, cond: { minAge: 4, maxAge: 8, hasTag: 'social_anxiety', chance: 0.4 }, effects: { chr: -1, spr: -1, tag: 'sa_shy' } },
    { text: { zh: '上课点名回答问题时，你的声音小得连同桌都听不到。', en: 'When called on in class, your voice was so quiet even your neighbor couldn\'t hear.' }, cond: { minAge: 7, maxAge: 15, hasTag: 'social_anxiety', chance: 0.3 }, effects: { spr: -1 } },
    { text: { zh: '你宁可在学校憋一天也不愿意去问老师厕所在哪。', en: 'You\'d rather hold it all day than ask a teacher where the bathroom is.' }, cond: { minAge: 6, maxAge: 12, hasTag: 'social_anxiety', chance: 0.3 }, effects: { spr: -1, str: -1 } },
    { text: { zh: '你在电话里给饭店打电话订餐，紧张到说不出话，挂了电话。', en: 'You called a restaurant to order — got too nervous, hung up.' }, cond: { minAge: 12, maxAge: 30, hasTag: 'social_anxiety', chance: 0.2 }, effects: { spr: -1 } },
    { text: { zh: '你在快递柜前等了20分钟，就为了等旁边的人走了再取。', en: 'You waited 20 min at the locker — just for the person next to it to leave.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'social_anxiety', chance: 0.2 }, effects: { spr: -1 } },
    { text: { zh: '你把"社恐"当标签贴在了自己身上。某种程度上，你觉得这样很安全。', en: 'You labeled yourself "socially anxious." In a way, the label felt safe.' }, cond: { minAge: 14, maxAge: 25, hasTag: 'social_anxiety', chance: 0.2 }, effects: { spr: -1, tag: 'sa_labeled' } },

    // --- 社恐日常 ---
    { text: { zh: '你在超市结账时发现带少了钱，不好意思和收银员说，只好把东西都放回去。', en: 'You didn\'t have enough at checkout — too embarrassed to tell the cashier, put everything back.' }, cond: { minAge: 12, maxAge: 40, hasTag: 'social_anxiety', chance: 0.15 }, effects: { spr: -2 } },
    { text: { zh: '你想剪头发，但害怕和理发师沟通，最后去了自助剪发的地方。', en: 'Wanted a haircut but feared talking to the barber — went to a self-service place.' }, cond: { minAge: 14, maxAge: 40, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: -1 } },
    { text: { zh: '聚餐时你总是坐在角落里，不敢主动说话。', en: 'At gatherings you always sit in the corner, afraid to speak up.' }, cond: { minAge: 12, maxAge: 45, hasTag: 'social_anxiety', chance: 0.15 }, effects: { chr: -1 } },
    { text: { zh: '外卖小哥打电话说到了，你紧张了10秒才接起来。', en: 'The delivery driver called — you stared at the phone 10 seconds before answering.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'social_anxiety', chance: 0.15 }, effects: { spr: -1 } },
    { text: { zh: '你在公交车上坐过站了，但因为太多人堵着出口，你不好意思说"借过"，又坐了三站。', en: 'You missed your stop but couldn\'t say "excuse me" — rode three more stops.' }, cond: { minAge: 12, maxAge: 40, hasTag: 'social_anxiety', chance: 0.15 }, effects: { spr: -1 } },
    { text: { zh: '你在餐厅点了不喜欢的菜，但不好意思换，硬吃了下去。', en: 'You ordered the wrong dish but couldn\'t bring yourself to ask for a change.' }, cond: { minAge: 12, maxAge: 40, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: -1 } },
    { text: { zh: '你准备了一肚子话要对朋友说，见面后一个字也憋不出来。', en: 'You had so much to say to your friend — when you met, not a word came out.' }, cond: { minAge: 12, maxAge: 35, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: -2 } },
    { text: { zh: '你在群聊里打了一段话，犹豫了两分钟，然后删掉了。', en: 'You typed a message in the group chat, hesitated two minutes, then deleted it.' }, cond: { minAge: 12, maxAge: 40, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: -1 } },
    { text: { zh: '你路上看到了认识的人，假装低头看手机绕路走了。', en: 'You saw someone you know and pretended to check your phone while taking a detour.' }, cond: { minAge: 12, maxAge: 50, hasTag: 'social_anxiety', chance: 0.15 }, effects: { spr: -1 } },
    { text: { zh: '你的朋友圈三个月没发过动态了。不是不想分享，是怕被关注。', en: 'No social media posts in 3 months. Not that you had nothing — afraid of attention.' }, cond: { minAge: 15, maxAge: 40, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: -1 } },

    // --- 网络世界中的自信 ---
    { text: { zh: '你在网上是另一个人——妙语连珠、思维敏捷、乐于助人。', en: 'Online you\'re a different person — witty, sharp, helpful.' }, cond: { minAge: 12, maxAge: 35, hasTag: 'social_anxiety', chance: 0.15 }, effects: { int: 2, tag: 'sa_online' } },
    { text: { zh: '你成为了一个小论坛的版主。在网上你充满自信。', en: 'You became a moderator on a small forum. Online, you\'re full of confidence.' }, cond: { minAge: 14, maxAge: 30, hasTag: 'sa_online', chance: 0.2 }, effects: { chr: 1, int: 1, tag: 'sa_moderator' } },
    { text: { zh: '你的文字作品在网上获得了很多人的喜爱。"文字真的是社恐的武器。"', en: 'Your writing gained many fans online. "Words are truly a social phobic\'s weapon."' }, cond: { minAge: 14, maxAge: 40, hasTag: 'sa_online', minInt: 6, chance: 0.1 }, effects: { chr: 2, mny: 1, spr: 2, tag: 'sa_writer' } },
    { text: { zh: '你开始直播！戴上面具的你竟然口若悬河，粉丝暴涨。', en: 'You started streaming with a mask — eloquent and charismatic. Followers surged.' }, cond: { minAge: 18, maxAge: 35, hasTag: 'sa_online', chance: 0.06 }, effects: { mny: 2, chr: 2, tag: 'sa_streamer' } },
    { text: { zh: '你的直播间成为了"社恐聚集地"，大家在这里找到了归属感。', en: 'Your stream became a "social anxiety haven" — everyone found belonging here.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'sa_streamer', chance: 0.3 }, effects: { spr: 3, chr: 1 } },

    // --- 突破/成长 ---
    { text: { zh: '你鼓起勇气在课堂上举了一次手。虽然全身发抖，但你做到了。', en: 'You raised your hand in class once. Trembling all over, but you did it.' }, cond: { minAge: 8, maxAge: 18, hasTag: 'social_anxiety', chance: 0.1 }, effects: { spr: 2, chr: 1, tag: 'sa_brave1' } },
    { text: { zh: '你第一次主动和同事打了招呼。对方笑着回应了。世界没有崩塌。', en: 'You greeted a colleague first. They smiled back. The world didn\'t collapse.' }, cond: { minAge: 22, maxAge: 40, hasTag: 'social_anxiety', chance: 0.1 }, effects: { spr: 2, chr: 1, tag: 'sa_initiative' } },
    { text: { zh: '你参加了一个社恐互助小组。发现原来有这么多和你一样的人。', en: 'You joined a social anxiety support group. So many people are just like you.' }, cond: { minAge: 18, maxAge: 45, hasTag: 'social_anxiety', chance: 0.08 }, effects: { spr: 3, chr: 1, tag: 'sa_support' } },
    { text: { zh: '互助小组的伙伴成了你最好的朋友。你们互相理解，不需要勉强社交。', en: 'Your support group friends became your best friends. Mutual understanding, no forced socializing.' }, cond: { minAge: 18, maxAge: 50, hasTag: 'sa_support', chance: 0.3 }, effects: { spr: 3, chr: 2 } },
    { text: { zh: '你开始尝试暴露疗法：每天做一件让自己不舒服的社交行为。', en: 'You tried exposure therapy: one uncomfortable social act per day.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'social_anxiety', chance: 0.06 }, effects: { chr: 1, spr: 1, tag: 'sa_exposure' } },
    { text: { zh: '暴露疗法一个月后，你发现和陌生人说话的恐惧从100分降到了60分。', en: 'After a month of exposure therapy, stranger-anxiety dropped from 100 to 60.' }, cond: { minAge: 18, maxAge: 45, hasTag: 'sa_exposure', chance: 0.4 }, effects: { chr: 2, spr: 2 } },
    { text: { zh: '你在公开场合做了一次演讲。结束后你的腿还在抖，但观众鼓掌了。', en: 'You gave a public speech. Legs still shaking afterward, but the audience applauded.' }, cond: { minAge: 18, maxAge: 50, hasTag: 'sa_exposure', chance: 0.08 }, effects: { chr: 3, spr: 3, tag: 'sa_speech' } },
    { text: { zh: '有人告诉你："我以前也是社恐，看到你在努力克服，我好感动。"', en: '"I used to have social anxiety too. Seeing you overcome it really moved me."' }, cond: { minAge: 18, maxAge: 50, hasTag: 'sa_exposure', chance: 0.1 }, effects: { spr: 3, chr: 1 } },

    // --- 找到舒适方式 ---
    { text: { zh: '你找到了适合自己的工作方式——远程办公。再也不用挤电梯了。', en: 'You found your ideal work style — remote work. No more elevator crowds.' }, cond: { minAge: 22, maxAge: 40, hasTag: 'social_anxiety', chance: 0.1 }, effects: { spr: 3, mny: 1, tag: 'sa_remote' } },
    { text: { zh: '你成了一名程序员。代码不需要社交。', en: 'You became a programmer. Code doesn\'t require socializing.' }, cond: { minAge: 20, maxAge: 35, hasTag: 'social_anxiety', minInt: 6, chance: 0.1 }, effects: { mny: 2, int: 1, spr: 2, tag: 'sa_programmer' } },
    { text: { zh: '你当了一名翻译，文字工作让你如鱼得水。', en: 'You became a translator — text-based work suited you perfectly.' }, cond: { minAge: 22, maxAge: 40, hasTag: 'social_anxiety', minInt: 6, chance: 0.08 }, effects: { mny: 2, int: 1, spr: 2 } },
    { text: { zh: '你养了一只猫。你和猫之间不需要社交，它懂你。', en: 'You got a cat. No social skills needed — it understands you.' }, cond: { minAge: 18, maxAge: 50, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: 3, tag: 'sa_cat' } },
    { text: { zh: '你和猫的合照意外火了，无数人来关注你。"我只想安静地撸猫。"', en: 'Your cat photo went viral. "I just want to quietly pet my cat."' }, cond: { minAge: 18, maxAge: 50, hasTag: 'sa_cat', chance: 0.15 }, effects: { chr: 1, spr: 1 } },
    { text: { zh: '你发现自己并不讨厌人——你只是需要更多独处的时间来充电。', en: 'You realized you don\'t dislike people — you just need more alone-time to recharge.' }, cond: { minAge: 20, maxAge: 40, hasTag: 'social_anxiety', chance: 0.08 }, effects: { spr: 2, int: 1 } },
    { text: { zh: '你开了一家安静的独立书店，只接待预约的客人。', en: 'You opened a quiet independent bookstore, by appointment only.' }, cond: { minAge: 28, maxAge: 45, hasTag: 'social_anxiety', minMny: 5, chance: 0.05 }, effects: { mny: 1, spr: 3, tag: 'sa_bookstore' } },
    { text: { zh: '你的书店成了"社恐友好空间"。很多人专程来这里享受安静。', en: 'Your bookstore became a "social anxiety friendly space." People come for the quiet.' }, cond: { minAge: 28, maxAge: 55, hasTag: 'sa_bookstore', chance: 0.3 }, effects: { chr: 2, spr: 2, mny: 1 } },

    // --- 感情线 ---
    { text: { zh: '你喜欢上了一个人，但你根本不敢开口。你默默关注了他/她三年。', en: 'You fell for someone but couldn\'t speak up. Silently watched them for three years.' }, cond: { minAge: 14, maxAge: 28, hasTag: 'social_anxiety', chance: 0.12 }, effects: { spr: -2 } },
    { text: { zh: '那个人居然主动找你说话了！你紧张到说了一句"谢谢"就跑了。', en: 'They actually talked to you! You got so nervous you said "thanks" and ran.' }, cond: { minAge: 14, maxAge: 30, hasTag: 'social_anxiety', chance: 0.08 }, effects: { spr: -1, chr: 1 } },
    { text: { zh: '你通过文字和他/她聊了很久。线上的你幽默风趣，完全不像现实中的你。', en: 'You chatted with them online for ages — witty and charming, nothing like IRL.' }, cond: { minAge: 14, maxAge: 35, hasTag: 'sa_online', chance: 0.08 }, effects: { spr: 2, chr: 1 } },
    { text: { zh: '他/她说："我喜欢你安静的样子。"你的世界亮了。', en: '"I like your quiet nature." Your world lit up.' }, cond: { minAge: 16, maxAge: 35, hasTag: 'social_anxiety', chance: 0.06 }, effects: { spr: 5, tag: 'partner' } },
    { text: { zh: '你们在一起了。你惊讶地发现：和对的人在一起，社交焦虑会减轻很多。', en: 'You\'re together now. Surprisingly, social anxiety eases a lot with the right person.' }, cond: { minAge: 18, maxAge: 40, hasTag: 'social_anxiety', hasTag2: 'partner', chance: 0.15 }, effects: { spr: 3, chr: 2 } },

    // --- 晚年/释怀 ---
    { text: { zh: '晚年的你看着年轻人因为社恐而焦虑，微笑着说："没关系，慢慢来。"', en: 'In old age, you see anxious youth and smile: "It\'s okay, take your time."' }, cond: { minAge: 55, maxAge: 80, hasTag: 'social_anxiety', chance: 0.15 }, effects: { spr: 3, chr: 1 } },
    { text: { zh: '你出了一本书《与社恐和解》。无数社恐的人因为你的书获得了力量。', en: 'You published "Making Peace with Social Anxiety." Countless readers found strength.' }, cond: { minAge: 35, maxAge: 65, hasTag: 'social_anxiety', minInt: 7, chance: 0.06 }, effects: { mny: 3, chr: 3, spr: 3 } },
    { text: { zh: '你回忆起年少时的社恐时光。那时很痛苦，但也因此变得更温柔更敏锐。', en: 'You recall your anxious youth. It was painful, but made you gentler and sharper.' }, cond: { minAge: 50, maxAge: 80, hasTag: 'social_anxiety', chance: 0.2 }, effects: { spr: 3, int: 1 } },
    { text: { zh: '你一个人坐在窗前喝茶。阳光、安静、独处——这就是你最幸福的时刻。', en: 'Sitting alone by the window with tea. Sunlight, quiet, solitude — your happiest moment.' }, cond: { minAge: 40, maxAge: 85, hasTag: 'social_anxiety', chance: 0.15 }, effects: { spr: 4 } },

    ];

    window.TALENT_EVENTS_3 = TALENT_EVENTS_3;
})();
