import { GameEvent } from '../types/game';

export const EVENTS_PART_1: GameEvent[] = [
  {
    id: "norm_first_job",
    category: "WORK",
    minAge: 18,
    maxAge: 24,
    conditions: {},
    text: {
      en: "Two job offers: a soul-crushing bank with a pension plan, or a 'family-like' startup paying in equity and free pizza.",
      zh: "兩份 offer：有退休金計劃但會壓碎靈魂的銀行，或是『像家人一樣』、薪水是股票加免費披薩的新創。"
    },
    choices: [
      {
        text: {
          en: "Take the bank. A pension plan is a love language.",
          zh: "去銀行。退休金就是愛的語言。"
        },
        effects: { money: 15000, health: -3, happiness: -8, stress: 12, fame: 0, setJob: { en: "Bank Junior Clerk", zh: "銀行初級行員" } }
      },
      {
        text: {
          en: "Join the startup. Equity will surely be worth something.",
          zh: "加入新創。股票『一定』會值錢的。"
        },
        effects: { money: 3000, health: -5, happiness: 10, stress: 8, fame: 2, addFlags: ["startup_alumni"], setJob: { en: "Startup Evangelist", zh: "新創熱血專員" } }
      }
    ]
  },
  {
    id: "norm_roommate",
    category: "SOCIAL",
    minAge: 18,
    maxAge: 30,
    conditions: {},
    text: {
      en: "A cheap room comes with a roommate who names his sourdough starters and holds funerals for them. The alternative: a $2,400 studio the size of a coffin.",
      zh: "便宜房間附贈室友：他幫每個酸種麵團取名，死掉還會辦告別式。另一個選擇：月租 2,400 美金、大小像棺材的套房。"
    },
    choices: [
      {
        text: { en: "Move in. Bring black clothes.", zh: "搬進去。記得帶黑衣服參加告別式。" },
        effects: { money: 6000, health: 0, happiness: 6, stress: 8, fame: 0 }
      },
      {
        text: { en: "Take the coffin studio. Privacy has a price.", zh: "住棺材套房。隱私是有價格的。" },
        effects: { money: -9000, health: 3, happiness: -4, stress: -10, fame: 0 }
      }
    ]
  },
  {
    id: "norm_gap_year_debate",
    category: "WORK",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "Everyone expects you to go straight to college. You want a gap year 'to find yourself'. Your savings: $412 and a very confident backpack.",
      zh: "所有人都期待你直接上大學。你想休一年『間隔年』找自己。你的存款：412 美金，加上一個信心滿滿的背包。"
    },
    choices: [
      {
        text: { en: "Enroll in college. Find yourself in the cafeteria line.", zh: "去念大學。在餐廳排隊的隊伍裡找自己。" },
        effects: { money: -15000, health: 0, happiness: 4, stress: 8, fame: 1, setJob: { en: "Undergraduate", zh: "大學生" } }
      },
      {
        text: { en: "Take the gap year. Find yourself, hopefully near a beach.", zh: "休間隔年。希望能在海灘附近找到自己。" },
        effects: { money: -2000, health: 0, happiness: 9, stress: 4, fame: 0, setJob: { en: "Gap-Year Wanderer", zh: "間隔年流浪者" } }
      }
    ]
  },
  {
    id: "fun_taxidermy_roommate",
    category: "WEIRD",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "Your assigned dorm roommate collects taxidermy squirrels and has strong opinions about your sleep schedule.",
      zh: "系統分配給你的宿舍室友蒐集松鼠標本，而且對你的作息有強烈意見。"
    },
    choices: [
      {
        text: { en: "Stay. Negotiate a 'no squirrels after 10 p.m.' treaty.", zh: "留下來。談判出一份『晚上十點後不准出現松鼠』的條約。" },
        effects: { money: 0, health: -1, happiness: 6, stress: 8, fame: 1 }
      },
      {
        text: { en: "Pay extra for a single room. Peace has a price tag.", zh: "加錢換單人房。平靜是有標價的。" },
        effects: { money: -3000, health: 2, happiness: -2, stress: -8, fame: 0 }
      }
    ]
  },
  {
    id: "norm_driving_test_fail",
    category: "SOCIAL",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "You fail your driving test for the second time. The examiner writes 'confident, but wrong' on your report.",
      zh: "你的駕照考試第二次不及格。考官在報告上寫著：『很有自信，但是錯的。』"
    },
    choices: [
      {
        text: { en: "Book a third test and take lessons from your grandma.", zh: "報名第三次考試，並向奶奶學開車。" },
        effects: { money: -200, health: 0, happiness: 3, stress: 6, fame: 1 }
      },
      {
        text: { en: "Go carless. Bike everywhere and call it 'sustainable'.", zh: "放棄開車。騎腳踏車到處跑，還美其名為『永續生活』。" },
        effects: { money: 100, health: 4, happiness: -3, stress: 2, fame: 0 }
      }
    ]
  },
  {
    id: "norm_campus_shirt_card",
    category: "MONEY",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "A campus table offers a free T-shirt if you sign up for a credit card. The shirt is remarkably soft.",
      zh: "校園攤位說，辦一張信用卡就送免費 T 恤。那件 T 恤軟得驚人。"
    },
    choices: [
      {
        text: { en: "Sign up. Softness has no price (until the statement arrives).", zh: "辦卡。柔軟無價（直到帳單寄來為止）。" },
        effects: { money: -600, health: 0, happiness: 5, stress: 6, fame: 0 }
      },
      {
        text: { en: "Walk away. Your neck stays in the freezing weather.", zh: "轉身離開。你的脖子繼續暴露在寒風裡。" },
        effects: { money: 0, health: -1, happiness: -3, stress: -2, fame: 0 }
      }
    ]
  },
  {
    id: "norm_summer_job_pick",
    category: "WORK",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "Summer job options: lifeguard at a pool with a suspicious smell, or a giant mascot suit at a burger stand in July.",
      zh: "暑期工作二選一：在氣味可疑的游泳池當救生員，或是在七月穿巨型吉祥物裝在漢堡攤前發傳單。"
    },
    choices: [
      {
        text: { en: "Wear the mascot suit. Sweat is a form of branding.", zh: "穿上吉祥物裝。汗水也是一種品牌經營。" },
        effects: { money: 3000, health: -4, happiness: 3, stress: 8, fame: 3, setJob: { en: "Burger Mascot (Seasonal)", zh: "漢堡吉祥物（季節工）" } }
      },
      {
        text: { en: "Guard the pool. Nobody drowns, everybody sighs.", zh: "守護泳池。沒有人溺水，只有人嘆氣。" },
        effects: { money: 2200, health: 3, happiness: -2, stress: -3, fame: 0, setJob: { en: "Lifeguard (Seasonal)", zh: "救生員（季節工）" } }
      }
    ]
  },
  {
    id: "norm_curfew_at_eighteen",
    category: "SOCIAL",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "Your parents set a midnight curfew for a legal adult. Their leverage: free laundry and pasta.",
      zh: "你的父母替一個法定成年人訂了午夜門禁。他們的籌碼：免費洗衣服，以及義大利麵。"
    },
    choices: [
      {
        text: { en: "Follow it. Enjoy the pasta and fold your dignity neatly.", zh: "乖乖遵守。享用義大利麵，並把尊嚴摺得整整齊齊。" },
        effects: { money: 300, health: 2, happiness: -3, stress: -4, fame: 0 }
      },
      {
        text: { en: "Move into a shared flat above a noisy bakery.", zh: "搬進一間在吵鬧麵包店樓上的合租公寓。" },
        effects: { money: -3500, health: -2, happiness: 8, stress: 8, fame: 0 }
      }
    ]
  },
  {
    id: "fun_regrettable_tattoo",
    category: "WEIRD",
    minAge: 18,
    maxAge: 20,
    conditions: {},
    text: {
      en: "You want a tattoo of your crush's name. You've known them for eleven days.",
      zh: "你想刺一個暗戀對象名字的刺青。你認識對方十一天了。"
    },
    choices: [
      {
        text: { en: "Get it. Commitment looks great on skin.", zh: "刺下去。承諾在皮膚上看起來很棒。" },
        effects: { money: -150, health: -2, happiness: 8, stress: 3, fame: 1, addFlags: ["impulsive_tattoo"] }
      },
      {
        text: { en: "Get a tiny cactus instead. Prickly and low-maintenance.", zh: "改刺一株小仙人掌。帶刺而且好照顧。" },
        effects: { money: -100, health: 0, happiness: 4, stress: -1, fame: 0 }
      }
    ]
  },
  {
    id: "norm_car_loan",
    category: "MONEY",
    minAge: 22,
    maxAge: 40,
    conditions: {},
    text: {
      en: "A brand-new car at 19.9% APR, or a used one that smells like a decision someone regretted.",
      zh: "全新車，年利率 19.9%；或是一台散發著『前車主後悔氣息』的二手車。"
    },
    choices: [
      {
        text: { en: "Sign for the new car. The smell of debt is 'new car smell'.", zh: "簽新車。負債的味道就叫『新車味』。" },
        effects: { money: -14000, health: 0, happiness: 10, stress: 10, fame: 3, addFlags: ["car_debt"] }
      },
      {
        text: { en: "Buy the used one and drive with the windows down. Forever.", zh: "買二手車，然後永遠開著車窗。" },
        effects: { money: -4000, health: -4, happiness: -3, stress: 5, fame: 0, addFlags: ["lemon_car"] }
      }
    ]
  },
  {
    id: "norm_move_in",
    category: "LOVE",
    minAge: 20,
    maxAge: 35,
    conditions: {},
    text: {
      en: "Three months in, your partner says 'let's move in together.' Your freedom whispers 'run.' Your rent whispers 'say yes.'",
      zh: "交往才三個月，對方說「我們同居吧」。你的自由低語：「快跑。」你的房租低語：「答應啦。」"
    },
    choices: [
      {
        text: { en: "Say yes. Split the rent, share the dishes, lose the remote.", zh: "答應。平分房租、共用碗盤、失去遙控器主權。" },
        effects: { money: 3000, health: 0, happiness: 8, stress: 10, fame: 0, addFlags: ["cohabiting"], setRelationship: { en: "Cohabiting", zh: "同居中" } }
      },
      {
        text: { en: "Say 'let's take it slow.' Say it with a very fake smile.", zh: "說「我們慢慢來」。並附上一個非常假的微笑。" },
        effects: { money: -2000, health: 0, happiness: -5, stress: -5, fame: 0, addFlags: ["commitment_issues"] }
      }
    ]
  },
  {
    id: "norm_weekend_overtime",
    category: "WORK",
    minAge: 22,
    maxAge: 45,
    conditions: { minStress: 30 },
    text: {
      en: "Your boss asks you to work this weekend, promising 'great exposure' and a stale bagel.",
      zh: "老闆要你週末加班，並承諾給你『絕佳曝光機會』與一個乾掉的貝果。"
    },
    choices: [
      {
        text: { en: "Work the weekend. Eat the bagel. Feel nothing.", zh: "加班。吃貝果。內心毫無波瀾。" },
        effects: { money: 2000, health: -8, happiness: -8, stress: 15, fame: 0 }
      },
      {
        text: { en: "Politely refuse and enjoy your weekend. The boss will remember this.", zh: "禮貌拒絕，享受週末。老闆會記住的。" },
        effects: { money: 0, health: 0, happiness: 5, stress: -8, fame: 0, addFlags: ["boss_grudge"] }
      }
    ]
  },
  {
    id: "norm_gym",
    category: "HEALTH",
    minAge: 20,
    maxAge: 40,
    conditions: {},
    text: {
      en: "A $1,200 annual gym membership: the price of visiting twice and feeling guilty daily. Or 'working out at home' (the couch counts).",
      zh: "一年 1200 美金的健身房會員：用來去兩次，然後每天愧疚。或是選擇『在家運動』（沙發也算）。"
    },
    choices: [
      {
        text: { en: "Buy the membership. Future You will totally show up.", zh: "辦會員。未來的你『絕對』會出現。" },
        effects: { money: -1200, health: 8, happiness: -2, stress: 3, fame: 0 }
      },
      {
        text: { en: "Home workout: lie down and watch someone else sweat.", zh: "在家運動：躺著看別人流汗。" },
        effects: { money: 0, health: -6, happiness: 6, stress: 0, fame: 0 }
      }
    ]
  },
  {
    id: "norm_dating_app",
    category: "LOVE",
    minAge: 20,
    maxAge: 38,
    conditions: {},
    text: {
      en: "Your date's photos are 8 years out of date, and taken in a very different lighting universe. Awkward dinner, or fake a 'family emergency' and vanish?",
      zh: "約會對象的照片是 8 年前的，而且是在完全不同的光線宇宙拍的。尷尬地吃完晚餐，還是假裝『家裡有急事』然後消失？"
    },
    choices: [
      {
        text: { en: "Stay for dinner. Maybe the personality is unedited too.", zh: "留下吃飯。搞不好個性沒修圖。" },
        effects: { money: -80, health: 0, happiness: 8, stress: 5, fame: 0 }
      },
      {
        text: { en: "Fake a family emergency. Mom is 'suddenly sick'.", zh: "假裝家中急事。老媽『突然』生病。" },
        effects: { money: 0, health: 0, happiness: -3, stress: -5, fame: 0, addFlags: ["ghost_karma"] }
      }
    ]
  },
  {
    id: "norm_rent_hike",
    category: "MONEY",
    minAge: 23,
    maxAge: 40,
    conditions: {},
    text: {
      en: "Your landlord raises rent 30% and calls it 'market alignment.' Pay up, or move out and lose three weekends to boxes.",
      zh: "房東把租金漲了三成，還稱之為『市場對齊』。乖乖付錢，還是搬家然後賠掉三個週末給紙箱？"
    },
    choices: [
      {
        text: { en: "Pay it. You've bonded with the mold.", zh: "付錢。你跟牆角的霉已經有感情了。" },
        effects: { money: -7200, health: -2, happiness: -5, stress: 8, fame: 0 }
      },
      {
        text: { en: "Move out. Fresh start, fresh problems.", zh: "搬家。新的開始，新的問題。" },
        effects: { money: -3000, health: -4, happiness: 4, stress: 12, fame: 0 }
      }
    ]
  },
  {
    id: "norm_mlm_coffee",
    category: "MONEY",
    minAge: 22,
    maxAge: 40,
    conditions: {},
    text: {
      en: "A college friend you haven't heard from in six years invites you to coffee to discuss 'a business ecosystem.'",
      zh: "六年沒聯絡的大學同學突然約你喝咖啡，說要聊聊『一個商業生態系』。"
    },
    "choices": [
      {
        text: { en: "Join the ecosystem. You're now 'Diamond Tier' (of nothing).", zh: "加入生態系。你現在是『鑽石級』（什麼的鑽石不重要）。" },
        effects: { money: -5000, health: 0, happiness: 3, stress: 10, fame: 0, addFlags: ["mlm_boxes"] }
      },
      {
        text: { en: "Decline. Lose a friend, keep your wallet.", zh: "拒絕。失去朋友，保住錢包。" },
        effects: { money: 0, health: 0, happiness: -4, stress: -2, fame: 0 }
      }
    ]
  },
  {
    id: "norm_destination_wedding",
    category: "SOCIAL",
    minAge: 26,
    maxAge: 40,
    conditions: {},
    text: {
      en: "Your friend's destination wedding will cost you $3,000. Skipping it will cost you a friendship.",
      zh: "朋友的海外婚禮要花你 3000 美金。不去的話，友情要付出更大的代價。"
    },
    choices: [
      {
        text: { en: "Go. Wear a suit in tropical heat and cry at the vows.", zh: "去。在熱帶高溫穿西裝，並在誓詞時哭出來。" },
        effects: { money: -3000, health: -3, happiness: 8, stress: 5, fame: 2 }
      },
      {
        text: { en: "Skip and send a gift card with a 'heartfelt' note.", zh: "不去，寄張禮券附上『滿滿心意』的小卡。" },
        effects: { money: 0, health: 0, happiness: -5, stress: 3, fame: 0 }
      }
    ]
  },
  {
    id: "fun_reply_all",
    category: "SOCIAL",
    minAge: 22,
    maxAge: 55,
    conditions: {},
    text: {
      en: "You accidentally reply-all to the entire company with your honest review of the boss's haircut.",
      zh: "你不小心「全部回覆」，把對老闆髮型的真心評語寄給了全公司。"
    },
    choices: [
      {
        text: { en: "Claim your account was hacked. Hackers have great taste.", zh: "宣稱帳號被駭。這個駭客品味真好。" },
        effects: { money: 0, health: 0, happiness: -3, stress: 10, fame: 3, addFlags: ["hacked_lie"] }
      },
      {
        text: { en: "Double down: send a follow-up rating his tie.", zh: "繼續加碼：再寄一封點評他的領帶。" },
        effects: { money: -2000, health: 0, happiness: 8, stress: 10, fame: 10, addFlags: ["office_legend"] }
      }
    ]
  },
  {
    id: "fun_pigeon",
    category: "WEIRD",
    minAge: 18,
    maxAge: 60,
    conditions: {},
    text: {
      en: "A pigeon follows you home and refuses to leave. It stares. It seems to know something.",
      zh: "一隻鴿子一路跟你回家，怎麼趕都不走。牠一直盯著你，好像知道些什麼。"
    },
    choices: [
      {
        text: { en: "Adopt it. Name it 'Gerald'.", zh: "收養牠。取名叫『傑拉德』。" },
        effects: { money: -300, health: -2, happiness: 8, stress: -5, fame: 0, addFlags: ["pigeon_friend"] }
      },
      {
        text: { en: "Shoo it away. Ignore the look of betrayal.", zh: "把牠趕走。無視那個充滿背叛的眼神。" },
        effects: { money: 0, health: 0, happiness: -3, stress: 3, fame: 0, addFlags: ["pigeon_revenge"] }
      }
    ]
  },
  {
    id: "fun_wrong_wedding",
    category: "SOCIAL",
    minAge: 20,
    maxAge: 50,
    conditions: {},
    text: {
      en: "You walk into the wrong wedding and it's too late to leave. The open bar asks no questions.",
      zh: "你走錯場，混進了別人的婚禮，現在退場太尷尬。吧台開放，而且沒人問你是誰。"
    },
    choices: [
      {
        text: { en: "Introduce yourself as the groom's 'long-lost cousin' and give a speech.", zh: "自稱新郎『失散多年的表哥』，還上台致詞。" },
        effects: { money: 0, health: -8, happiness: 10, stress: 12, fame: 5, addFlags: ["wedding_crasher"] }
      },
      {
        text: { en: "Slip out quietly. Your stomach will hold a grudge.", zh: "悄悄溜走。你的胃會記恨這件事。" },
        effects: { money: 0, health: 2, happiness: -3, stress: -5, fame: 0 }
      }
    ]
  },
  {
    id: "fun_cat_filter",
    category: "WORK",
    minAge: 22,
    maxAge: 55,
    conditions: {},
    text: {
      en: "You're stuck on a cat filter during a million-dollar investor call, and you can't turn it off.",
      zh: "你在百萬美金的投資人視訊會議上被貓咪濾鏡卡住，關都關不掉。"
    },
    choices: [
      {
        text: { en: "Pitch with a straight face. You are a cat now.", zh: "面不改色繼續簡報。你現在是一隻貓。" },
        effects: { money: 5000, health: 0, happiness: 5, stress: 15, fame: 8 }
      },
      {
        text: { en: "Apologize profusely and reschedule.", zh: "連聲道歉，改期再約。" },
        effects: { money: -2000, health: 0, happiness: -6, stress: 8, fame: 0 }
      }
    ]
  }
];
