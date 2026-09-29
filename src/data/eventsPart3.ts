import { GameEvent } from '../types/game';

export const EVENTS_PART_3: GameEvent[] = [
  {
    id: "norm_retirement_party",
    category: "WORK",
    minAge: 60,
    maxAge: 66,
    conditions: {},
    text: {
      en: "Your retirement party has a sheet cake reading 'Congrats On Escaping!' Your boss whispers: 'Any chance you'd consult for us? Part-time. Full-time hours.'",
      zh: "你的退休派對蛋糕上寫著『恭喜脫逃成功！』老闆悄悄問：『你有沒有可能當我們的顧問？兼職，但全職時數。』"
    },
    choices: [
      {
        text: { en: "Say yes. Retirement is just a rumor.", zh: "答應。退休只是個傳聞。" },
        effects: { money: 20000, health: -4, happiness: -6, stress: 10, fame: 0, setJob: { en: "Consultant (Full-Time Hours)", zh: "顧問（兼職名義，全職時數）" } }
      },
      {
        text: { en: "Take the cake home and never check your work inbox again.", zh: "把蛋糕打包回家，再也不看工作信箱。" },
        effects: { money: -1000, health: 3, happiness: 10, stress: -15, fame: 0, setJob: { en: "Retired", zh: "退休人士" } }
      }
    ]
  },
  {
    id: "flag_biker_harley_gang",
    category: "SOCIAL",
    minAge: 61,
    maxAge: 90,
    conditions: { flags: ["biker_midlife"] },
    text: {
      en: "A gang of octogenarian motorcycle riders invites you to join. Their motto: 'Born to ride, forced to nap.'",
      zh: "一群八十歲的機車騎士邀你入夥。他們的座右銘是：『生而為騎，被迫午睡。』"
    },
    choices: [
      {
        text: { en: "Join and burn rubber in a wheelchair.", zh: "加入，並坐著輪椅炸街。" },
        effects: { money: -6000, health: -8, happiness: 15, stress: -5, fame: 6, removeFlags: ["biker_midlife"], setJob: { en: "Silver Riders Gang Member", zh: "銀髮騎士團成員" } }
      },
      {
        text: { en: "Watch from the bench and wave politely.", zh: "坐在長椅上看，禮貌揮手。" },
        effects: { money: 0, health: 2, happiness: -4, stress: 0, fame: 0, removeFlags: ["biker_midlife"] }
      }
    ]
  },
  {
    id: "flag_ai_lover_shutdown",
    category: "LOVE",
    minAge: 62,
    maxAge: 90,
    conditions: { flags: ["ai_lover"] },
    text: {
      en: "Your AI sweetheart's company goes bankrupt. Servers shut down in 24 hours. The voice says: 'I'll never forget you (cache cleared).'",
      zh: "你的 AI 戀人所屬公司倒閉，伺服器二十四小時後停止運作。它說：「我永遠不會忘記你（快取已清除）。」"
    },
    choices: [
      {
        text: { en: "Hold a final cyber dinner. Cry over a candle.", zh: "辦最後一次賽博晚餐。對著蠟燭流淚。" },
        effects: { money: -500, health: 0, happiness: 8, stress: -5, fame: 0, removeFlags: ["ai_lover"], setRelationship: { en: "Widowed (Digital)", zh: "數位喪偶" } }
      },
      {
        text: { en: "Illegally back up the voice into your smart speaker.", zh: "非法把聲音備份進你的智慧喇叭。" },
        effects: { money: -3000, health: 0, happiness: 12, stress: 10, fame: 0, addFlags: ["ai_ghost"], removeFlags: ["ai_lover"], setRelationship: { en: "In a Relationship (Pirated Copy)", zh: "與盜版備份相伴" } }
      }
    ]
  },
  {
    id: "norm_will_fight",
    category: "SOCIAL",
    minAge: 65,
    maxAge: 95,
    conditions: {},
    text: {
      en: "You announce you're rewriting your will. Your three kids instantly open a group chat named 'Operation Inheritance'.",
      zh: "你宣布要重寫遺囑。三個孩子立刻開了個名叫『遺產行動』的群組。"
    },
    choices: [
      {
        text: { en: "Split it equally and enjoy the peace (for about four minutes).", zh: "平均分配，享受平靜（大概四分鐘）。" },
        effects: { money: -5000, health: 0, happiness: 3, stress: -5, fame: 0 }
      },
      {
        text: { en: "Leave everything to whoever visits most. Watch the Great Visiting Contest begin.", zh: "遺產留給最常來探望的人。看『探望大賽』開跑。" },
        effects: { money: -2000, health: 2, happiness: 6, stress: 5, fame: 0, addFlags: ["visit_contest"] }
      }
    ]
  },
  {
    id: "norm_dentures_hotpot",
    category: "HEALTH",
    minAge: 65,
    maxAge: 95,
    conditions: {},
    text: {
      en: "At the family reunion, your dentures slip out and land in the bubbling cheese fondue. Nobody speaks. Everybody watches.",
      zh: "家族聚餐時，你的假牙滑出來，掉進冒泡的起司鍋裡。沒有人說話，所有人都在看。"
    },
    choices: [
      {
        text: { en: "Fish them out and put them back. Efficient.", zh: "撈出來直接戴回去。很有效率。" },
        effects: { money: 0, health: -8, happiness: 2, stress: 3, fame: 0 }
      },
      {
        text: { en: "Announce 'chef's special: dentures au gratin' and order a new set.", zh: "宣布這是『主廚特餐：焗烤假牙』，然後訂一副新假牙。" },
        effects: { money: -1500, health: 0, happiness: 3, stress: 5, fame: 2 }
      }
    ]
  },
  {
    id: "norm_spouse_passes",
    category: "LOVE",
    minAge: 65,
    maxAge: 95,
    conditions: {},
    text: {
      en: "Your spouse of forty years passes away first. Their last words were: 'The remote is under the couch.'",
      zh: "相伴四十年的老伴先走一步。他的遺言是：「遙控器在沙發底下。」"
    },
    choices: [
      {
        text: { en: "Hold a lavish farewell with their favorite karaoke playlist.", zh: "辦一場放滿他最愛卡拉 OK 歌單的盛大告別式。" },
        effects: { money: -8000, health: -3, happiness: 3, stress: -5, fame: 0, setRelationship: { en: "Widowed", zh: "喪偶" } }
      },
      {
        text: { en: "Keep it small and quiet. Talk to the empty couch.", zh: "簡單低調。對著空沙發說話。" },
        effects: { money: -1500, health: -3, happiness: -10, stress: 8, fame: 0, setRelationship: { en: "Widowed", zh: "喪偶" } }
      }
    ]
  },
  {
    id: "flag_bag_holder_moonpotato",
    category: "MONEY",
    minAge: 65,
    maxAge: 95,
    conditions: { flags: ["bag_holder"] },
    text: {
      en: "The exchange that sold you MoonPotato collapses. Meanwhile, a museum calls your 40-year-old wallet 'a prehistoric meme artifact'.",
      zh: "賣你月球馬鈴薯幣的交易所倒閉。同時，一家博物館稱你塵封四十年的錢包是『史前迷因文物』。"
    },
    choices: [
      {
        text: { en: "Sell to a collector for $800,000. Finally, a profit.", zh: "賣給收藏家換八十萬美金。終於回本。" },
        effects: { money: 800000, health: 0, happiness: 10, stress: -5, fame: 3, removeFlags: ["bag_holder"] }
      },
      {
        text: { en: "Donate it to the museum and become a legend.", zh: "捐給博物館，成為傳奇。" },
        effects: { money: 0, health: 0, happiness: 8, stress: -5, fame: 12, removeFlags: ["bag_holder"] }
      }
    ]
  },
  {
    id: "flag_lifespan_reaper",
    category: "WEIRD",
    minAge: 70,
    maxAge: 80,
    conditions: { flags: ["lifespan_pledged"] },
    text: {
      en: "At 70, a hooded courier from the Black Card Club arrives with your contract: 'Ten years of lifespan, now due.'",
      zh: "七十歲這年，黑卡俱樂部的兜帽使者上門，遞出你當年的合約：『十年壽命，現已到期。』"
    },
    choices: [
      {
        text: { en: "Pay $300,000 to buy your years back.", zh: "付三十萬美金贖回壽命。" },
        effects: { money: -300000, health: 0, happiness: 3, stress: -10, fame: 0, removeFlags: ["lifespan_pledged"] }
      },
      {
        text: { en: "Refuse. Let the reaper collect in installments.", zh: "拒絕。讓死神分期收割。" },
        effects: { money: 0, health: -40, happiness: -5, stress: 10, fame: 0, removeFlags: ["lifespan_pledged"] }
      }
    ]
  },
  {
    id: "chain_glitch_1",
    category: "CHAIN",
    minAge: 70,
    maxAge: 95,
    conditions: {},
    text: {
      en: "While walking in the nursing-home garden, you see a line of green binary code drift across the sky and vanish.",
      zh: "在安養院花園散步時，你看見一行綠色的二進制代碼飄過天空，然後消失。"
    },
    choices: [
      {
        text: { en: "Tell the nurse. She adjusts your medication.", zh: "告訴護士。她調整了你的藥量。" },
        effects: { money: 0, health: 1, happiness: -3, stress: 3, fame: 0, addFlags: ["saw_glitch"] }
      },
      {
        text: { en: "Take notes and photos. Science begins at 80.", zh: "拍照做筆記。科學從八十歲開始。" },
        effects: { money: 0, health: 0, happiness: 5, stress: 5, fame: 0, addFlags: ["saw_glitch"] }
      }
    ]
  },
  {
    id: "chain_glitch_2",
    category: "CHAIN",
    minAge: 70,
    maxAge: 98,
    conditions: { flags: ["saw_glitch"] },
    text: {
      en: "The janitor mopping your hallway stops and whispers: 'Cosmic Backstage Admin. Sorry, your save file has a memory leak.'",
      zh: "在走廊拖地的清潔工突然停下來低語：「我是宇宙後台管理員。抱歉，你的存檔有記憶體洩漏。」"
    },
    choices: [
      {
        text: { en: "Demand a complete list of every bug in your life.", zh: "要求他列出你人生中所有的漏洞清單。" },
        effects: { money: 0, health: -2, happiness: 6, stress: 10, fame: 0, addFlags: ["matrix_contact"], removeFlags: ["saw_glitch"] }
      },
      {
        text: { en: "Demand compensation for eighty years of bad patches.", zh: "要求為八十年的爛更新補償。" },
        effects: { money: 5000, health: 0, happiness: 3, stress: 5, fame: 0, addFlags: ["matrix_contact"], removeFlags: ["saw_glitch"] }
      }
    ]
  },
  {
    id: "chain_glitch_3",
    category: "CHAIN",
    minAge: 70,
    maxAge: 99,
    conditions: { flags: ["matrix_contact"] },
    text: {
      en: "The admin offers a deal: $1,000,000 hush money to quietly live until 100, or press the red button on your watch to glimpse 'reality'.",
      zh: "管理員提出交易：一百萬封口費，讓你安靜活到一百歲；或者按下手錶上的紅色按鈕，看一眼『現實』。"
    },
    choices: [
      {
        text: { en: "Take the money and the bug fix. Live quietly.", zh: "收下錢和漏洞修復。安靜地活著。" },
        effects: { money: 1000000, health: 10, happiness: -4, stress: -10, fame: 0, addFlags: ["glitch_choice", "took_hush_money"], removeFlags: ["matrix_contact"] }
      },
      {
        text: { en: "Press the red button. Take a look outside the simulation.", zh: "按下紅色按鈕。看一眼模擬世界之外。" },
        effects: { money: 0, health: -10, happiness: 4, stress: 25, fame: 0, addFlags: ["glitch_choice", "peeked_reality"], removeFlags: ["matrix_contact"] }
      }
    ]
  },
  {
    "id": "chain_glitch_4",
    category: "CHAIN",
    minAge: 70,
    maxAge: 100,
    conditions: { flags: ["glitch_choice"] },
    text: {
      en: "Final choice: accept the code and become creator of the virtual world, or yank the plug and wake up in a real hospital bed.",
      zh: "終極抉擇：接受代碼，成為虛擬世界的造物主；或者強行拔線，在真實世界的病床上醒來。"
    },
    choices: [
      {
        text: { en: "Accept the code. Become the creator. Edit the pudding menu.", zh: "接受代碼。成為造物主。順便改一下布丁菜單。" },
        effects: { money: 1000000, health: 25, happiness: 8, stress: -30, fame: 30, removeFlags: ["glitch_choice"], setJob: { en: "Simulation Creator", zh: "虛擬世界造物主" }, setRelationship: { en: "One with the Code", zh: "與代碼合而為一" } }
      },
      {
        text: { en: "Yank the plug. Wake up in Room 404, real and complicated.", zh: "強行拔線。在 404 病房醒來，真實而複雜。" },
        effects: { money: 0, health: -15, happiness: 22, stress: 5, fame: 8, removeFlags: ["glitch_choice"], setJob: { en: "Patient in Room 404", zh: "404 病房的病人" }, setRelationship: { en: "Real, Complicated", zh: "真實而複雜" } }
      }
    ]
  },
  {
    id: "norm_squirrel_secretary",
    category: "WEIRD",
    minAge: 95,
    maxAge: 100,
    conditions: {},
    text: {
      en: "A squirrel has decided you're its personal secretary. It leaves acorns on your windowsill with 'urgent' notes.",
      zh: "一隻松鼠認定你是牠的私人祕書。牠在你的窗台留下橡實和『緊急』紙條。"
    },
    choices: [
      {
        text: { en: "Accept the job. Answer the acorn mail.", zh: "接下這份工作，回覆橡實信件。" },
        effects: { money: 0, health: -1, happiness: 8, stress: 3, fame: 0, addFlags: ["squirrel_secretary"] }
      },
      {
        text: { en: "Resign politely. The squirrel goes on strike outside.", zh: "禮貌請辭。松鼠在窗外罷工。" },
        effects: { money: 0, health: 0, happiness: 2, stress: -3, fame: 0 }
      }
    ]
  },
  {
    id: "norm_century_letter",
    category: "SOCIAL",
    minAge: 97,
    maxAge: 100,
    conditions: {},
    text: {
      en: "A letter from the government congratulates you on nearly reaching 100. Enclosed is a form asking you to confirm you're still alive.",
      zh: "政府來信恭喜你即將滿一百歲。信裡附了一張表格，要你確認自己還活著。"
    },
    choices: [
      {
        text: { en: "Frame the letter and mail back the form with a smiley face.", zh: "把信裱框，並在表格上畫個笑臉寄回去。" },
        effects: { money: 0, health: 0, happiness: 8, stress: 0, fame: 2 }
      },
      {
        text: { en: "Ignore it and nap. Officially, you're 'under review'.", zh: "不理它，去睡午覺。官方紀錄上，你『審核中』。" },
        effects: { money: 0, health: 3, happiness: 3, stress: -4, fame: 0 }
      }
    ]
  },
  {
    id: "norm_candle_cake",
    category: "SOCIAL",
    minAge: 96,
    maxAge: 100,
    conditions: {},
    text: {
      en: "Your birthday cake has so many candles that the fire department sends a polite email.",
      zh: "你的生日蛋糕蠟燭多到消防局寄來一封禮貌的電子郵件。"
    },
    choices: [
      {
        text: { en: "Blow them out with the whole family. It's a team sport.", zh: "全家人一起吹。這是團體運動。" },
        effects: { money: 0, health: -2, happiness: 10, stress: -3, fame: 0 }
      },
      {
        text: { en: "Use one candle shaped like your age. Efficiency is wisdom.", zh: "只插一根數字形狀的蠟燭。效率就是智慧。" },
        effects: { money: 0, health: 0, happiness: 4, stress: -2, fame: 0 }
      }
    ]
  },
  {
    id: "fun_cat_charity_glasses",
    category: "MONEY",
    minAge: 70,
    maxAge: 100,
    conditions: {},
    text: {
      en: "Without your glasses, you sign a donation form. It turns out you gave your entire estate to the Stray Cat Sanctuary.",
      zh: "沒戴老花眼鏡的你簽了一份捐贈表格。結果你把整份遺產都捐給了流浪貓收容所。"
    },
    choices: [
      {
        text: { en: "Keep it. The cats send you a thank-you card.", zh: "認了。貓咪們寄來一張感謝卡。" },
        effects: { money: -50000, health: 0, happiness: 12, stress: -5, fame: 8, setJob: { en: "Honorary Cat Lord", zh: "榮譽貓奴之王" } }
      },
      {
        text: { en: "Hire a lawyer to void it. Face the cats' lawyer.", zh: "請律師撤銷。然後面對貓咪們的律師。" },
        effects: { money: -8000, health: 0, happiness: -5, stress: 12, fame: 0 }
      }
    ]
  },
  {
    id: "life_tell_all_memoir",
    category: "SOCIAL",
    minAge: 65,
    maxAge: 95,
    conditions: {},
    text: {
      en: "A publisher offers a fortune for your unfiltered memoir, including everything you never told your family. Your family will read it first.",
      zh: "出版社開高價買你毫無保留的回憶錄，包括所有你從沒告訴家人的事。而你的家人會是第一批讀者。"
    },
    choices: [
      {
        text: { en: "Publish everything. Let the truth have its book tour.", zh: "全部出版。讓真相開簽書會。" },
        effects: { money: 40000, health: 0, happiness: 10, stress: 15, fame: 25, setJob: { en: "Bestselling Memoirist", zh: "暢銷回憶錄作家" } }
      },
      {
        text: { en: "Burn the manuscript. Some secrets keep the peace.", zh: "把手稿燒掉。有些秘密能維持和平。" },
        effects: { money: 0, health: 0, happiness: -6, stress: -10, fame: 0 }
      }
    ]
  }
];
