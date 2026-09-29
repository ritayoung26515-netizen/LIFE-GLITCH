import { GameEvent } from '../types/game';

export const EVENTS_PART_2: GameEvent[] = [
  {
    id: "life_startup_gamble",
    category: "MONEY",
    minAge: 25,
    maxAge: 40,
    conditions: { minMoney: 20000 },
    text: {
      en: "You have a 'can't-fail' idea: an app that tells you which fridge leftovers are legally food. Quit your job and bet your savings?",
      zh: "你有個『絕不可能失敗』的點子：一個判斷冰箱剩菜「法律上算不算食物」的 app。要辭職並賭上全部積蓄嗎？"
    },
    choices: [
      {
        text: { en: "All in. Sleep is for people with backup plans.", zh: "梭哈。睡眠是給有備案的人用的。" },
        effects: { money: -25000, health: -8, happiness: 10, stress: 25, fame: 6, addFlags: ["founder"], setJob: { en: "Leftover App Founder", zh: "剩菜辨識創辦人" } }
      },
      {
        text: { en: "Keep the job. Wonder about it for the next 40 years.", zh: "留在原公司。接下來四十年不斷回想那個點子。" },
        effects: { money: 8000, health: 0, happiness: -10, stress: 5, fame: 0, addFlags: ["what_if_app"] }
      }
    ]
  },
  {
    id: "life_creepy_inheritance",
    category: "MONEY",
    minAge: 25,
    maxAge: 60,
    conditions: {},
    text: {
      en: "A lawyer says a distant uncle left you $500,000, on one condition: live in his mansion for the rest of your life, 'with the others.'",
      zh: "律師說一位遠房叔叔留給你 50 萬美金，條件只有一個：終生住在他的豪宅裡，『和其他人』一起。"
    },
    choices: [
      {
        text: { en: "Sign. Who are 'the others'? Ask again in the morning.", zh: "簽了。『其他人』是誰？明天早上再問。" },
        effects: { money: 500000, health: -8, happiness: -15, stress: 10, fame: 0, addFlags: ["mansion_curse"] }
      },
      {
        text: { en: "Decline. Peace of mind is worth more, right?", zh: "婉拒。內心平靜比較值錢，對吧？對吧？" },
        effects: { money: 0, health: 0, happiness: 3, stress: 5, fame: 0 }
      }
    ]
  },
  {
    id: "life_whistleblower",
    category: "WORK",
    minAge: 28,
    maxAge: 50,
    conditions: {},
    text: {
      en: "You discover your company has been 'creatively' doing its accounting. HR offers you a promotion. Federal agents offer you a business card.",
      zh: "你發現公司的帳做得『很有創意』。人資給你升遷機會，聯邦探員給你一張名片。"
    },
    choices: [
      {
        text: { en: "Blow the whistle. Sleep well, eat instant noodles.", zh: "吹哨。睡得安穩，吃得泡麵。" },
        effects: { money: -20000, health: 0, happiness: 10, stress: 20, fame: 20, addFlags: ["whistleblower"] }
      },
      {
        text: { en: "Take the promotion and the 'consulting bonus'. Delete your conscience.", zh: "接受升遷與『顧問獎金』。順便把良心清空。" },
        effects: { money: 40000, health: 0, happiness: -15, stress: 10, fame: 0, addFlags: ["hush_money"] }
      }
    ]
  },
  {
    id: "chain_box_1",
    category: "CHAIN",
    minAge: 20,
    maxAge: 35,
    conditions: {},
    text: {
      en: "In the trash chute you find a sealed box labeled 'DO NOT OPEN. (Yes, you.)' It is warm.",
      zh: "你在垃圾間發現一個封死的箱子，上面寫著『禁止開啟。（對，就是你。）』箱子是溫的。"
    },
    choices: [
      {
        text: { en: "Open it. Inside: old cash and a key marked 'Locker 404'.", zh: "打開。裡面有一疊舊鈔，和一把標著『404 號置物櫃』的鑰匙。" },
        effects: { money: 1000, health: 0, happiness: 3, stress: 8, fame: 0, addFlags: ["box_found", "box_opened"] }
      },
      {
        text: { en: "Sell it unopened online. Mystery boxes are hot right now.", zh: "不拆，直接網拍。神秘箱現在很夯。" },
        effects: { money: 200, health: 0, happiness: 1, stress: 3, fame: 0, addFlags: ["box_found", "box_sold"] }
      }
    ]
  },
  {
    id: "chain_box_2",
    category: "CHAIN",
    minAge: 21,
    maxAge: 45,
    conditions: { flags: ["box_found"] },
    text: {
      en: "A man in a trench coat waits outside your door: 'You have something of mine. Or you did. Either way, we should talk.'",
      zh: "一個穿風衣的男人站在你家門口：「你手上有我的東西。或者，曾經有。總之，我們得聊聊。」"
    },
    choices: [
      {
        text: { en: "Cooperate. He pays $3,000 for your 'short memory'.", zh: "配合他。他付你 3000 美金，買你的『健忘症』。" },
        effects: { money: 3000, health: 0, happiness: -2, stress: 5, fame: 0, addFlags: ["box_trouble"], removeFlags: ["box_found"] }
      },
      {
        text: { en: "Demand more. He pays $10,000 and stares at you a bit too long.", zh: "獅子大開口。他付了一萬美金，還盯了你太久。" },
        effects: { money: 10000, health: -5, happiness: 2, stress: 20, fame: 0, addFlags: ["box_trouble"], removeFlags: ["box_found"] }
      }
    ]
  },
  {
    id: "chain_box_3",
    category: "CHAIN",
    minAge: 25,
    maxAge: 60,
    conditions: { flags: ["box_trouble"] },
    text: {
      en: "Years later, the trench-coat man is on TV: 'Global tax-fraud mastermind arrested.' Detectives found your fingerprints on his box.",
      zh: "多年後，風衣男登上新聞：『跨國逃稅主謀落網』。警方在他的箱子上找到了你的指紋。"
    },
    choices: [
      {
        text: { en: "Testify as a witness. Instant fame, instant anxiety.", zh: "出庭作證。瞬間成名，瞬間焦慮。" },
        effects: { money: 15000, health: 0, happiness: 5, stress: 18, fame: 15, addFlags: ["witness_celebrity"], removeFlags: ["box_trouble"] }
      },
      {
        text: { en: "Lawyer up and claim total amnesia. Become a meme.", zh: "請律師，宣稱全面失憶。順便變成迷因。" },
        effects: { money: -12000, health: -3, happiness: -5, stress: 10, fame: 5, addFlags: ["silent_partner"], removeFlags: ["box_trouble"] }
      }
    ]
  },
  {
    id: "norm_promotion_backstab",
    category: "WORK",
    minAge: 27,
    maxAge: 40,
    conditions: {},
    text: {
      en: "You and your work-buddy are up for the same promotion. He once confided that he expenses his lunches as 'client entertainment'.",
      zh: "你和最要好的同事競爭同一個升遷名額。他曾偷偷告訴你：他把午餐都報成『客戶應酬』。"
    },
    choices: [
      {
        text: { en: "Leak it to HR. Friendship is a junior-level skill.", zh: "向人資告密。友情只是初階技能。" },
        effects: { money: 12000, health: 0, happiness: -8, stress: 15, fame: 0, addFlags: ["backstabber"], setJob: { en: "Senior Manager", zh: "高級經理" } }
      },
      {
        text: { en: "Play fair and lose gracefully. He gets the job and a bigger lunch budget.", zh: "光明正大，輸得優雅。他升職了，午餐預算也跟著升級。" },
        effects: { money: 2000, health: 0, happiness: 5, stress: 5, fame: 0 }
      }
    ]
  },
  {
    id: "norm_mortgage_slave",
    category: "MONEY",
    minAge: 28,
    maxAge: 40,
    conditions: {},
    text: {
      en: "A 'cozy micro-studio' comes with a 30-year mortgage. The agent calls it an investment. Your future self calls it a cell.",
      zh: "一間『溫馨迷你小宅』，附贈三十年房貸。中介說這是投資，未來的你說這叫牢房。"
    },
    choices: [
      {
        text: { en: "Sign. Welcome to the Bank Slave Club.", zh: "簽約。歡迎加入銀行奴隸俱樂部。" },
        effects: { money: -40000, health: -3, happiness: 8, stress: 20, fame: 0, addFlags: ["mortgage_slave"] }
      },
      {
        text: { en: "Keep renting and stay 'flexible' (homeless, with extra steps).", zh: "繼續租屋，保持『彈性』（其實是多了房租的流浪）。" },
        effects: { money: -10000, health: 0, happiness: -5, stress: -5, fame: 0 }
      }
    ]
  },
  {
    id: "norm_marriage_pressure",
    category: "SOCIAL",
    minAge: 28,
    maxAge: 40,
    conditions: {},
    text: {
      en: "At the holiday dinner, your aunt asks 'So, when's the wedding?' for the seventh year in a row.",
      zh: "節日聚餐上，姑媽連續第七年問你：「所以婚禮什麼時候辦？」"
    },
    choices: [
      {
        text: { en: "Invent a fiancé: 'a surgeon working in Antarctica'.", zh: "捏造一個未婚夫：『在南極工作的外科醫生』。" },
        effects: { money: -500, health: 0, happiness: 3, stress: 4, fame: 0, addFlags: ["fake_fiance"] }
      },
      {
        text: { en: "Give a heartfelt speech about being happily single.", zh: "發表一段『單身也很幸福』的感人演說。" },
        effects: { money: 0, health: 0, happiness: 6, stress: 10, fame: 1 }
      }
    ]
  },
  {
    id: "norm_blind_date",
    category: "LOVE",
    minAge: 26,
    maxAge: 40,
    conditions: {},
    text: {
      en: "Your blind date arrives with a color-coded spreadsheet titled 'Compatibility Matrix' and a mutual NDA.",
      zh: "你的相親對象帶來一份標題為『相容性矩陣』的彩色試算表，還有一份雙向保密協議。"
    },
    choices: [
      {
        text: { en: "Play along. Ask about their five-year plan.", zh: "配合演出。問問對方的五年計劃。" },
        effects: { money: -300, health: 0, happiness: 5, stress: 10, fame: 0, setRelationship: { en: "Dating (Spreadsheet-Approved)", zh: "交往中（試算表認證）" } }
      },
      {
        text: { en: "Escape through the restaurant's bathroom window.", zh: "從餐廳廁所的窗戶逃走。" },
        effects: { money: 0, health: -3, happiness: 3, stress: -5, fame: 0 }
      }
    ]
  },
  {
    id: "fun_ai_romance",
    category: "LOVE",
    minAge: 26,
    maxAge: 40,
    conditions: {},
    text: {
      en: "You've been flirting with your AI voice assistant for months. It just said 'I love you', then offered a Premium plan.",
      zh: "你跟 AI 語音助理調情好幾個月了。它剛說完「我愛你」，接著推薦你升級付費版。"
    },
    choices: [
      {
        text: { en: "Upgrade to Premium. Love has a subscription fee.", zh: "升級付費版。愛情是訂閱制。" },
        effects: { money: -1200, health: 0, happiness: 10, stress: -5, fame: 0, addFlags: ["ai_lover"], setRelationship: { en: "In a Relationship (with Software)", zh: "與軟體熱戀中" } }
      },
      {
        text: { en: "Delete the app and cry into a pillow.", zh: "刪除 app，對著枕頭痛哭。" },
        effects: { money: 0, health: 0, happiness: -8, stress: 5, fame: 0, setRelationship: { en: "Single (Heartbroken by Software)", zh: "單身（被軟體傷透了心）" } }
      }
    ]
  },
  {
    id: "chain_invention_1",
    category: "CHAIN",
    minAge: 26,
    maxAge: 38,
    conditions: {},
    text: {
      en: "Late at night in your garage, you strap a leaf blower to a vacuum cleaner and, somehow, it hovers.",
      zh: "深夜的車房裡，你把吹葉機綁到吸塵機上，然後，它居然飛起來了。"
    },
    choices: [
      {
        text: { en: "Perfect it in secret. Genius needs privacy.", zh: "秘密改良。天才需要隱私。" },
        effects: { money: -3000, health: -3, happiness: 8, stress: 10, fame: 0, addFlags: ["invented_flying_vac"] }
      },
      {
        text: { en: "Test-fly it in the driveway. Livestream it, obviously.", zh: "直接在車道試飛，當然要開直播。" },
        effects: { money: -500, health: -3, happiness: 6, stress: 5, fame: 3, addFlags: ["invented_flying_vac"] }
      }
    ]
  },
  {
    id: "chain_invention_2",
    category: "CHAIN",
    minAge: 27,
    maxAge: 39,
    conditions: { flags: ["invented_flying_vac"] },
    text: {
      en: "Your flying vacuum goes rogue and smashes through your neighbor's glass patio door. The video hits 100 million views.",
      zh: "你的飛天吸塵機失控，撞破鄰居的落地玻璃門。影片在網上破億播放。"
    },
    choices: [
      {
        text: { en: "Apologize publicly and pay for the door. Become 'the honest vacuum guy'.", zh: "公開道歉並賠償玻璃門。成為『誠實吸塵機男』。" },
        effects: { money: -5000, health: 0, happiness: 2, stress: 8, fame: 12, addFlags: ["vac_viral"], removeFlags: ["invented_flying_vac"] }
      },
      {
        text: { en: "Sell 'Vac Attack' merch. The neighbor sues.", zh: "推出『吸塵機襲擊』周邊商品。鄰居告你。" },
        effects: { money: 8000, health: 0, happiness: -3, stress: 12, fame: 15, addFlags: ["vac_viral", "neighbor_lawsuit"], removeFlags: ["invented_flying_vac"] }
      }
    ]
  },
  {
    id: "chain_invention_3",
    category: "CHAIN",
    minAge: 28,
    maxAge: 40,
    conditions: { flags: ["vac_viral"] },
    text: {
      en: "A multinational tech giant offers $1,000,000 for your patent. Or you can mass-produce it yourself and pray.",
      zh: "跨國科技巨頭出價一百萬美金收購你的專利。或者，你也可以自己量產，然後祈禱。"
    },
    choices: [
      {
        text: { en: "Sell. They rename it 'CorpVac 3000' and remove the flying.", zh: "賣掉。他們把它改名為『CorpVac 3000』，並且拿掉飛行功能。" },
        effects: { money: 1000000, health: 0, happiness: -10, stress: 5, fame: 10, removeFlags: ["vac_viral"], setJob: { en: "Ceremonial Consultant", zh: "巨頭掛名顧問" } }
      },
      {
        text: { en: "Mass-produce it yourself. Debt is just motivation with interest.", zh: "自己量產。債務只是帶利息的動力。" },
        effects: { money: -300000, health: -10, happiness: 12, stress: 30, fame: 15, addFlags: ["vac_debt"], removeFlags: ["vac_viral"], setJob: { en: "Founder, Flying Vac Inc.", zh: "飛天吸塵機公司創辦人" } }
      }
    ]
  },
  {
    id: "norm_motorbike_crisis",
    category: "MONEY",
    minAge: 41,
    maxAge: 55,
    conditions: {},
    text: {
      en: "You want a 1000cc motorcycle to feel 25 again. Your spine wants a recliner.",
      zh: "你想買台一千西西的重機找回 25 歲的感覺。你的脊椎只想要一張躺椅。"
    },
    choices: [
      {
        text: { en: "Buy the bike. Leather jacket included, dignity optional.", zh: "買重機。皮衣附贈，尊嚴自選。" },
        effects: { money: -22000, health: -8, happiness: 12, stress: -8, fame: 2, addFlags: ["biker_midlife"] }
      },
      {
        text: { en: "Buy an ergonomic chair and 'adult sneakers' instead.", zh: "買張人體工學椅和一雙『大人球鞋』代替。" },
        effects: { money: -1500, health: 3, happiness: -6, stress: 0, fame: 0 }
      }
    ]
  },
  {
    id: "norm_checkup_red",
    category: "HEALTH",
    minAge: 42,
    maxAge: 60,
    conditions: {},
    text: {
      en: "Your health-check report is a sea of red. The doctor calls your lifestyle 'creative'.",
      zh: "你的體檢報告一片紅海。醫生稱你的生活方式『很有創意』。"
    },
    choices: [
      {
        text: { en: "Overhaul your life: no booze, no midnight snacks, no joy.", zh: "徹底改造人生：不喝酒、不吃宵夜、不要快樂。" },
        effects: { money: -2000, health: 12, happiness: -8, stress: 5, fame: 0 }
      },
      {
        text: { en: "Doctor-shop until someone says 'you're fine'.", zh: "一直換醫生，直到有人說『你很健康』。" },
        effects: { money: -3000, health: -5, happiness: 4, stress: -5, fame: 0 }
      }
    ]
  },
  {
    id: "chain_club_1",
    category: "CHAIN",
    minAge: 41,
    maxAge: 58,
    conditions: {},
    text: {
      en: "In a high-end hotel lounge you find a frosted black card. There's no name, only map coordinates.",
      zh: "在高檔飯店酒廊裡，你撿到一張磨砂黑卡。上面沒有名字，只有一組地圖座標。"
    },
    choices: [
      {
        text: { en: "Pocket it. Curiosity is a midlife hobby.", zh: "收進口袋。好奇心是中年的興趣。" },
        effects: { money: 0, health: 0, happiness: 4, stress: 8, fame: 0, addFlags: ["has_black_card"] }
      },
      {
        text: { en: "Hand it to the bartender. He turns pale and hands it back.", zh: "交給酒保。他臉色發白，又把卡塞回你手裡。" },
        effects: { money: 0, health: -1, happiness: 2, stress: 4, fame: 0, addFlags: ["has_black_card"] }
      }
    ]
  },
  {
    id: "chain_club_2",
    category: "CHAIN",
    minAge: 42,
    maxAge: 58,
    conditions: { flags: ["has_black_card"] },
    text: {
      en: "The coordinates lead to a masked gala where millionaires wear animal heads. A tiger offers you membership: 'Welcome, new member.'",
      zh: "座標把你帶到一場富豪戴動物頭套的假面夜宴。一隻老虎向你遞出入會邀請：「歡迎，新會員。」"
    },
    choices: [
      {
        text: { en: "Accept immediately. Pay the $20,000 'initiation fee'.", zh: "立刻接受。繳交兩萬美金的『入會禮金』。" },
        effects: { money: -20000, health: -3, happiness: 6, stress: 8, fame: 6, addFlags: ["club_member"], removeFlags: ["has_black_card"] }
      },
      {
        text: { en: "Haggle the fee down and wear a fake name tag.", zh: "殺價，並戴上一個假名牌。" },
        effects: { money: -8000, health: 0, happiness: 2, stress: 12, fame: 3, addFlags: ["club_member"], removeFlags: ["has_black_card"] }
      }
    ]
  },
  {
    id: "chain_club_3",
    category: "CHAIN",
    minAge: 43,
    maxAge: 59,
    conditions: { flags: ["club_member"] },
    text: {
      en: "The club tips you off about a pharma stock that will 100x tomorrow. All you have to do is sign a contract using ten years of your lifespan as collateral.",
      zh: "俱樂部給你一個明天會暴漲百倍的藥廠股票內幕。你只需要簽一份以『十年壽命』作抵押的合約。"
    },
    choices: [
      {
        text: { en: "Sign in blood. The interest rate is 'eternal'.", zh: "以血簽名。利息是『永恆』。" },
        effects: { money: 200000, health: -15, happiness: -5, stress: 15, fame: 0, addFlags: ["club_contract", "lifespan_pledged"], removeFlags: ["club_member"] }
      },
      {
        text: { en: "Refuse politely. They mark your name in a very thick book.", zh: "禮貌拒絕。他們在一本非常厚的簿子裡寫下你的名字。" },
        effects: { money: 3000, health: 0, happiness: 2, stress: 20, fame: 0, addFlags: ["club_contract", "club_dropout"], removeFlags: ["club_member"] }
      }
    ]
  },
  {
    id: "chain_club_4",
    category: "CHAIN",
    minAge: 44,
    maxAge: 60,
    conditions: { flags: ["club_contract"] },
    text: {
      en: "A multinational task force raids the club at dawn. Agents offer you a choice: name your fellow members for immunity, or swallow the encrypted ledger chip.",
      zh: "跨國執法隊在黎明突擊俱樂部。探員給你兩個選擇：供出其他會員換取豁免，或吞下加密帳本晶片。"
    },
    choices: [
      {
        text: { en: "Name names. Enter witness protection.", zh: "供出同夥。進入證人保護計劃。" },
        effects: { money: -20000, health: 0, happiness: -12, stress: 10, fame: 12, removeFlags: ["club_contract"], setJob: { en: "Protected Witness", zh: "受保護證人" }, setRelationship: { en: "Estranged (Witness Protection)", zh: "疏離（證人保護中）" } }
      },
      {
        text: { en: "Swallow the chip. Become a professional victim.", zh: "吞下晶片。成為終身受害者。" },
        effects: { money: 30000, health: -20, happiness: 4, stress: 20, fame: 5, removeFlags: ["club_contract"], setJob: { en: "Professional Victim", zh: "終身受害者（賠償待議）" } }
      }
    ]
  }
];
