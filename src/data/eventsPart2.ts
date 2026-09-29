import { GameEvent } from "../types/game";

export const eventsPart2: GameEvent[] = [
  {
    "id": "life_spouse_secret",
    "category": "LOVE",
    "minAge": 30,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "You find your spouse's hidden safe: $200,000 in gambling debt and a second phone with 47 contacts named 'Kevin'.",
      "zh": "你在配偶的秘密保險箱裡發現二十萬美金賭債，還有一支存了 47 個『阿強』的第二部手機。"
    },
    "choices": [
      {
        "text": {
          "en": "Forgive and repay it together. 'For better or worse' has terms.",
          "zh": "原諒並一起還債。『不論好壞』其實有附加條款。"
        },
        "effects": {
          "money": -60000,
          "health": 0,
          "happiness": -5,
          "stress": 18,
          "fame": 0,
          "setRelationship": {
            "en": "Married (Financially Hostage)",
            "zh": "已婚（財務人質）"
          }
        }
      },
      {
        "text": {
          "en": "File for divorce. Keep the toaster.",
          "zh": "提出離婚。保住烤麵包機。"
        },
        "effects": {
          "money": -20000,
          "health": 0,
          "happiness": -10,
          "stress": -16,
          "fame": 0,
          "setRelationship": {
            "en": "Divorced",
            "zh": "離婚"
          }
        }
      }
    ]
  },
  {
    "id": "life_laid_off_gamble",
    "category": "WORK",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "You get laid off by a two-line email. Severance: $20,000 and a cardboard box for your things.",
      "zh": "你被一封兩行的電郵解僱了。遣散費兩萬美金，外加一個裝私人物品的紙箱。"
    },
    "choices": [
      {
        "text": {
          "en": "Bet it all on a food truck selling 'Salted Tears Fries'.",
          "zh": "全押在餐車上，賣『淚水鹽味薯條』。"
        },
        "effects": {
          "money": -20000,
          "health": -3,
          "happiness": 8,
          "stress": 20,
          "fame": 4,
          "setJob": {
            "en": "Food Truck Owner",
            "zh": "餐車老闆"
          }
        }
      },
      {
        "text": {
          "en": "Accept the first offer: soulless data entry.",
          "zh": "接下第一份工作：毫無靈魂的資料輸入。"
        },
        "effects": {
          "money": 2000,
          "health": 0,
          "happiness": -10,
          "stress": -16,
          "fame": 0,
          "setJob": {
            "en": "Contract Data Entry Clerk",
            "zh": "約聘資料輸入員"
          }
        }
      }
    ]
  },
  {
    "id": "chain_invention_1",
    "category": "CHAIN",
    "minAge": 26,
    "maxAge": 38,
    "conditions": {},
    "text": {
      "en": "Late at night in your garage, you strap a leaf blower to a vacuum cleaner and, somehow, it hovers.",
      "zh": "深夜的車房裡，你把吹葉機綁到吸塵機上，然後，它居然飛起來了。"
    },
    "choices": [
      {
        "text": {
          "en": "Perfect it in secret. Genius needs privacy.",
          "zh": "秘密改良。天才需要隱私。"
        },
        "effects": {
          "money": -3000,
          "health": -3,
          "happiness": 8,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "invented_flying_vac"
          ]
        }
      },
      {
        "text": {
          "en": "Test-fly it in the driveway. Livestream it, obviously.",
          "zh": "直接在車道試飛，當然要開直播。"
        },
        "effects": {
          "money": -500,
          "health": -3,
          "happiness": 6,
          "stress": -15,
          "fame": 3,
          "addFlags": [
            "invented_flying_vac"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_invention_2",
    "category": "CHAIN",
    "minAge": 27,
    "maxAge": 39,
    "conditions": {
      "flags": [
        "invented_flying_vac"
      ]
    },
    "text": {
      "en": "Your flying vacuum goes rogue and smashes through your neighbor's glass patio door. The video hits 100 million views.",
      "zh": "你的飛天吸塵機失控，撞破鄰居的落地玻璃門。影片在網上破億播放。"
    },
    "choices": [
      {
        "text": {
          "en": "Apologize publicly and pay for the door. Become 'the honest vacuum guy'.",
          "zh": "公開道歉並賠償玻璃門。成為『誠實吸塵機男』。"
        },
        "effects": {
          "money": -5000,
          "health": 0,
          "happiness": 2,
          "stress": 6,
          "fame": 12,
          "addFlags": [
            "vac_viral"
          ],
          "removeFlags": [
            "invented_flying_vac"
          ]
        }
      },
      {
        "text": {
          "en": "Sell 'Vac Attack' merch. The neighbor sues.",
          "zh": "推出『吸塵機襲擊』周邊商品。鄰居告你。"
        },
        "effects": {
          "money": 8000,
          "health": 0,
          "happiness": -3,
          "stress": 16,
          "fame": 15,
          "addFlags": [
            "vac_viral",
            "neighbor_lawsuit"
          ],
          "removeFlags": [
            "invented_flying_vac"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_invention_3",
    "category": "CHAIN",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {
      "flags": [
        "vac_viral"
      ]
    },
    "text": {
      "en": "A multinational tech giant offers $1,000,000 for your patent. Or you can mass-produce it yourself and pray.",
      "zh": "跨國科技巨頭出價一百萬美金收購你的專利。或者，你也可以自己量產，然後祈禱。"
    },
    "choices": [
      {
        "text": {
          "en": "Sell. They rename it 'CorpVac 3000' and remove the flying.",
          "zh": "賣掉。他們把它改名為『CorpVac 3000』，並且拿掉飛行功能。"
        },
        "effects": {
          "money": 1000000,
          "health": 0,
          "happiness": -10,
          "stress": -16,
          "fame": 10,
          "removeFlags": [
            "vac_viral"
          ],
          "setJob": {
            "en": "Ceremonial Consultant",
            "zh": "巨頭掛名顧問"
          }
        }
      },
      {
        "text": {
          "en": "Mass-produce it yourself. Debt is just motivation with interest.",
          "zh": "自己量產。債務只是帶利息的動力。"
        },
        "effects": {
          "money": -300000,
          "health": -10,
          "happiness": 12,
          "stress": 22,
          "fame": 15,
          "addFlags": [
            "vac_debt"
          ],
          "removeFlags": [
            "vac_viral"
          ],
          "setJob": {
            "en": "Founder, Flying Vac Inc.",
            "zh": "飛天吸塵機公司創辦人"
          }
        }
      }
    ]
  },
  {
    "id": "norm_motorbike_crisis",
    "category": "MONEY",
    "minAge": 41,
    "maxAge": 55,
    "conditions": {},
    "text": {
      "en": "You want a 1000cc motorcycle to feel 25 again. Your spine wants a recliner.",
      "zh": "你想買台一千西西的重機找回 25 歲的感覺。你的脊椎只想要一張躺椅。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy the bike. Leather jacket included, dignity optional.",
          "zh": "買重機。皮衣附贈，尊嚴自選。"
        },
        "effects": {
          "money": -22000,
          "health": -8,
          "happiness": 12,
          "stress": -8,
          "fame": 2,
          "addFlags": [
            "biker_midlife"
          ]
        }
      },
      {
        "text": {
          "en": "Buy an ergonomic chair and 'adult sneakers' instead.",
          "zh": "買張人體工學椅和一雙『大人球鞋』代替。"
        },
        "effects": {
          "money": -1500,
          "health": 3,
          "happiness": -6,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_checkup_red",
    "category": "HEALTH",
    "minAge": 42,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Your health-check report is a sea of red. The doctor calls your lifestyle 'creative'.",
      "zh": "你的體檢報告一片紅海。醫生稱你的生活方式『很有創意』。"
    },
    "choices": [
      {
        "text": {
          "en": "Overhaul your life: no booze, no midnight snacks, no joy.",
          "zh": "徹底改造人生：不喝酒、不吃宵夜、不要快樂。"
        },
        "effects": {
          "money": -2000,
          "health": 12,
          "happiness": -8,
          "stress": 5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Doctor-shop until someone says 'you're fine'.",
          "zh": "一直換醫生，直到有人說『你很健康』。"
        },
        "effects": {
          "money": -3000,
          "health": -5,
          "happiness": 4,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_junior_backstab",
    "category": "WORK",
    "minAge": 41,
    "maxAge": 58,
    "conditions": {},
    "text": {
      "en": "A 25-year-old subordinate presents your idea to the board as his own. He says 'synergy' twice.",
      "zh": "一位 25 歲的下屬在董事會上把你的點子當成自己的提案，還把『協同效應』說了兩次。"
    },
    "choices": [
      {
        "text": {
          "en": "Expose him in front of everyone. Youth is not bulletproof.",
          "zh": "當眾拆穿他。年輕不是防彈衣。"
        },
        "effects": {
          "money": 2000,
          "health": 0,
          "happiness": 8,
          "stress": 12,
          "fame": 0,
          "addFlags": [
            "office_feud"
          ]
        }
      },
      {
        "text": {
          "en": "Swallow it and 'mentor' him with a fake smile.",
          "zh": "吞下去，並用假笑『指導』他。"
        },
        "effects": {
          "money": 0,
          "health": -2,
          "happiness": -8,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_kid_abroad",
    "category": "MONEY",
    "minAge": 43,
    "maxAge": 58,
    "conditions": {},
    "text": {
      "en": "Your kid got into an elite private university. Tuition: $60,000 a year, plus 'networking opportunities'.",
      "zh": "孩子考上一間頂尖私立大學。學費一年六萬美金，另加『人脈經營費』。"
    },
    "choices": [
      {
        "text": {
          "en": "Pay it. Your retirement plan becomes 'working until death'.",
          "zh": "付錢。你的退休計劃改成『工作到死』。"
        },
        "effects": {
          "money": -60000,
          "health": -3,
          "happiness": 6,
          "stress": 15,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Say 'the local school builds character.' Absorb the silent treatment.",
          "zh": "說『本地大學培養品格』。然後承受冷戰。"
        },
        "effects": {
          "money": -5000,
          "health": 0,
          "happiness": -8,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_wrong_pills",
    "category": "HEALTH",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Your reading glasses were in the other room. You spent a week swallowing breath mints instead of blood pressure pills.",
      "zh": "老花眼鏡放在另一個房間。你整整一週把口氣清新糖當成降血壓藥吞。"
    },
    "choices": [
      {
        "text": {
          "en": "Go to the ER and admit the mint incident.",
          "zh": "去急診，並承認這起薄荷糖事件。"
        },
        "effects": {
          "money": -3000,
          "health": 4,
          "happiness": -3,
          "stress": 10,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Call the pharmacist and buy a pill organizer with giant labels.",
          "zh": "打給藥師，買個超大標籤的藥盒。"
        },
        "effects": {
          "money": -50,
          "health": 3,
          "happiness": -1,
          "stress": 3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_separate_bedrooms",
    "category": "LOVE",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "It's the tenth anniversary of sleeping in separate bedrooms. 'For the snoring, not the marriage,' you both insist.",
      "zh": "今年是分房睡十週年。你們異口同聲地強調：「為了打呼，不是為了婚姻。」"
    },
    "choices": [
      {
        "text": {
          "en": "Move back into one room. Prepare for earplugs.",
          "zh": "搬回同一間房。準備好耳塞。"
        },
        "effects": {
          "money": -100,
          "health": -3,
          "happiness": 8,
          "stress": 3,
          "fame": 0,
          "setRelationship": {
            "en": "Married (Rekindled)",
            "zh": "已婚（重燃火花）"
          }
        }
      },
      {
        "text": {
          "en": "Renovate the house into two master suites.",
          "zh": "把家裝修成兩套主臥。"
        },
        "effects": {
          "money": -15000,
          "health": 2,
          "happiness": 3,
          "stress": -8,
          "fame": 0,
          "setRelationship": {
            "en": "Married (Separate Wings)",
            "zh": "已婚（分翼居住）"
          }
        }
      }
    ]
  },
  {
    "id": "norm_parent_care",
    "category": "SOCIAL",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Your elderly parent can no longer live alone. Your siblings are 'very busy' and 'have opinions'.",
      "zh": "年邁的父母不能再獨居了。你的兄弟姊妹『都很忙』，但『都很有意見』。"
    },
    "choices": [
      {
        "text": {
          "en": "Move them into your home. Learn the true meaning of 'patience'.",
          "zh": "接他們回家住。你將重新學習『耐心』二字。"
        },
        "effects": {
          "money": -8000,
          "health": -5,
          "happiness": -5,
          "stress": 18,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Pay for a nursing home and carry the guilt for free.",
          "zh": "出錢送去安養院，愧疚感免費附贈。"
        },
        "effects": {
          "money": -25000,
          "health": 0,
          "happiness": -8,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_ai_replaces_you",
    "category": "WORK",
    "minAge": 43,
    "maxAge": 58,
    "conditions": {},
    "text": {
      "en": "Management asks you to train the AI that will replace your department. The bonus is a nice pen.",
      "zh": "公司要你訓練即將取代你們部門的 AI。獎勵是一支漂亮的鋼筆。"
    },
    "choices": [
      {
        "text": {
          "en": "Train it properly. Become its 'human supervisor'.",
          "zh": "認真訓練它。成為它的『人類監督員』。"
        },
        "effects": {
          "money": 6000,
          "health": 0,
          "happiness": -8,
          "stress": 8,
          "fame": 0,
          "setJob": {
            "en": "AI Supervisor (Human)",
            "zh": "AI 監督員（真人）"
          }
        }
      },
      {
        "text": {
          "en": "Subtly train it to love spreadsheets from 1998.",
          "zh": "偷偷把它訓練成只愛 1998 年的試算表。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": 8,
          "stress": 12,
          "fame": 0,
          "addFlags": [
            "ai_saboteur"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_hair_transplant",
    "category": "HEALTH",
    "minAge": 41,
    "maxAge": 55,
    "conditions": {},
    "text": {
      "en": "Your hairline has retreated like a defeated army. A clinic offers 'a full restoration' for the price of a used car.",
      "zh": "你的髮際線像戰敗的軍隊般節節後退。診所提供『全面重建方案』，價格等於一台二手車。"
    },
    "choices": [
      {
        "text": {
          "en": "Get the transplant. Hope has a price tag.",
          "zh": "植髮。希望是有標價的。"
        },
        "effects": {
          "money": -9000,
          "health": -2,
          "happiness": 8,
          "stress": 3,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Embrace baldness and call it 'shiny confidence'.",
          "zh": "擁抱光頭，並稱之為『閃亮自信』。"
        },
        "effects": {
          "money": -200,
          "health": 0,
          "happiness": -3,
          "stress": 0,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_pension_crash",
    "category": "MONEY",
    "minAge": 48,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Your pension fund lost 40% in a week. Your advisor's email signature says 'Stay positive!'",
      "zh": "你的退休基金一週蒸發了四成。理財顧問的電郵簽名檔寫著：『保持正能量！』"
    },
    "choices": [
      {
        "text": {
          "en": "Cash out and hide the money under your mattress.",
          "zh": "全部提領，塞進床墊底下。"
        },
        "effects": {
          "money": -6000,
          "health": 0,
          "happiness": -3,
          "stress": -6,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Buy the dip with your last savings. Hope is a strategy.",
          "zh": "用最後的積蓄抄底。希望也是一種策略。"
        },
        "effects": {
          "money": -15000,
          "health": -3,
          "happiness": 6,
          "stress": 12,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_gen_z_boss",
    "category": "WORK",
    "minAge": 41,
    "maxAge": 58,
    "conditions": {},
    "text": {
      "en": "Your new boss is 26, communicates in emojis, and calls quarterly reviews 'vibe checks'.",
      "zh": "你的新老闆才 26 歲，只用表情符號溝通，還把季度考核稱為『氛圍檢查』。"
    },
    "choices": [
      {
        "text": {
          "en": "Learn the slang. Say 'no cap' with a straight face.",
          "zh": "學新潮用語。面不改色地說『真的假的』。"
        },
        "effects": {
          "money": 3000,
          "health": 0,
          "happiness": -2,
          "stress": 6,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Say 'back in my day...' and watch HR take notes.",
          "zh": "說『我們那個年代……』，然後看人資開始做筆記。"
        },
        "effects": {
          "money": -3000,
          "health": 0,
          "happiness": 5,
          "stress": 10,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_knee_surgery",
    "category": "HEALTH",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Your knee now makes noises like a haunted staircase. The surgeon says it's 'a routine replacement'.",
      "zh": "你的膝蓋現在發出像鬧鬼樓梯般的聲音。外科醫生說這是『例行置換手術』。"
    },
    "choices": [
      {
        "text": {
          "en": "Get the surgery. Enjoy six weeks of daytime TV.",
          "zh": "動手術。享受六週的白天電視節目。"
        },
        "effects": {
          "money": -12000,
          "health": 10,
          "happiness": -3,
          "stress": 5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Buy a cane and call it 'vintage style'.",
          "zh": "買根拐杖，稱之為『復古造型』。"
        },
        "effects": {
          "money": -100,
          "health": -8,
          "happiness": 3,
          "stress": 0,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_teen_streamer",
    "category": "SOCIAL",
    "minAge": 42,
    "maxAge": 55,
    "conditions": {},
    "text": {
      "en": "Your teenager wants to drop out of school to become a full-time streamer. He has 14 followers, 12 of whom are bots.",
      "zh": "你的青少年孩子想輟學當全職直播主。他有 14 個粉絲，其中 12 個是機器人。"
    },
    "choices": [
      {
        "text": {
          "en": "Fund his dream. Watch the stream. Suffer quietly.",
          "zh": "資助他的夢想。看他直播。默默受苦。"
        },
        "effects": {
          "money": -6000,
          "health": 0,
          "happiness": 4,
          "stress": 12,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Forbid it. Enjoy the cold war at dinner.",
          "zh": "禁止。享受晚餐桌上的冷戰。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -5,
          "stress": 6,
          "fame": 0,
          "addFlags": [
            "cold_war_home"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_affair_temptation",
    "category": "LOVE",
    "minAge": 42,
    "maxAge": 58,
    "conditions": {},
    "text": {
      "en": "A younger colleague calls you 'wise and mysterious'. This is dangerously close to flirting.",
      "zh": "一位年輕同事說你『睿智又神秘』。這已經非常接近調情了。"
    },
    "choices": [
      {
        "text": {
          "en": "Enjoy the attention. Just a little.",
          "zh": "享受一下被關注的感覺。只是一點點。"
        },
        "effects": {
          "money": -500,
          "health": 0,
          "happiness": 8,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "flirt_risk"
          ]
        }
      },
      {
        "text": {
          "en": "Go home and hug your spouse, awkwardly.",
          "zh": "回家，笨拙地抱抱你的另一半。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -2,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_friend_funeral",
    "category": "SOCIAL",
    "minAge": 46,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "An old friend passes away at 52. At the funeral, everyone whispers, 'We should have hung out more.'",
      "zh": "一位老朋友在 52 歲離世。喪禮上，每個人都在低聲說：「早知道就多聚聚了。」"
    },
    "choices": [
      {
        "text": {
          "en": "Start a real bucket list. Spend money on being alive.",
          "zh": "認真列一張願望清單。花錢在『活著』這件事上。"
        },
        "effects": {
          "money": -5000,
          "health": 2,
          "happiness": 8,
          "stress": -8,
          "fame": 0,
          "addFlags": [
            "memento_mori"
          ]
        }
      },
      {
        "text": {
          "en": "Return to work. Funerals aren't billable.",
          "zh": "回去工作。喪禮不能報帳。"
        },
        "effects": {
          "money": 3000,
          "health": -2,
          "happiness": -6,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_empty_nest_downsizing",
    "category": "MONEY",
    "minAge": 50,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "The kids have moved out. Your house is now large, silent, and echoing your regrets.",
      "zh": "孩子們都搬出去了。你的房子現在又大又靜，還會回響你的後悔。"
    },
    "choices": [
      {
        "text": {
          "en": "Sell up and move into a compact condo.",
          "zh": "賣房，搬進小巧的公寓。"
        },
        "effects": {
          "money": 50000,
          "health": -2,
          "happiness": -4,
          "stress": 10,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Rent the rooms to strangers. What could go wrong?",
          "zh": "把房間出租給陌生人。能出什麼事呢？"
        },
        "effects": {
          "money": 12000,
          "health": 0,
          "happiness": -6,
          "stress": 12,
          "fame": 0,
          "addFlags": [
            "rental_horror"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_backstabber_regulator",
    "category": "WORK",
    "minAge": 43,
    "maxAge": 58,
    "conditions": {
      "flags": [
        "backstabber"
      ]
    },
    "text": {
      "en": "The colleague you sold out years ago now runs the regulatory board that approves your project. He remembers everything.",
      "zh": "多年前被你出賣的同事，如今是審批你項目的監管機構負責人。他什麼都記得。"
    },
    "choices": [
      {
        "text": {
          "en": "Apologize sincerely and accept his 'public humility' terms.",
          "zh": "誠心道歉，並接受他提出的『公開謙卑』條件。"
        },
        "effects": {
          "money": 15000,
          "health": 0,
          "happiness": -8,
          "stress": 12,
          "fame": 0,
          "removeFlags": [
            "backstabber"
          ]
        }
      },
      {
        "text": {
          "en": "Take your project elsewhere and keep your pride.",
          "zh": "把項目帶去別處，保住自尊。"
        },
        "effects": {
          "money": -12000,
          "health": 0,
          "happiness": 6,
          "stress": -3,
          "fame": 0,
          "removeFlags": [
            "backstabber"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_fake_fiance_reunion",
    "category": "SOCIAL",
    "minAge": 41,
    "maxAge": 60,
    "conditions": {
      "flags": [
        "fake_fiance"
      ]
    },
    "text": {
      "en": "At grandma's 90th birthday, the whole family demands to meet 'the surgeon fiancé from Antarctica'. Aunt Linda has brought a gift for him.",
      "zh": "奶奶九十大壽，全家人堅持要見那位『在南極行醫的未婚夫』。琳達姑姑還特地準備了禮物給他。"
    },
    "choices": [
      {
        "text": {
          "en": "Hire an actor. He's method: he's memorized penguin facts.",
          "zh": "花錢請個演員。他很敬業，連企鵝知識都背好了。"
        },
        "effects": {
          "money": -3000,
          "health": 0,
          "happiness": 2,
          "stress": 15,
          "fame": 0,
          "addFlags": [
            "hired_actor"
          ],
          "removeFlags": [
            "fake_fiance"
          ],
          "setRelationship": {
            "en": "Engaged (Actor)",
            "zh": "訂婚中（演員版）"
          }
        }
      },
      {
        "text": {
          "en": "Confess everything. Absorb the flying dinner rolls.",
          "zh": "全盤招供，並承受飛來的餐包。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -6,
          "stress": -12,
          "fame": 0,
          "removeFlags": [
            "fake_fiance"
          ],
          "setRelationship": {
            "en": "Single (Exposed)",
            "zh": "單身（被拆穿）"
          }
        }
      }
    ]
  },
  {
    "id": "flag_cosigned_loan_mob",
    "category": "MONEY",
    "minAge": 41,
    "maxAge": 60,
    "conditions": {
      "flags": [
        "cosigned_loan"
      ]
    },
    "text": {
      "en": "Your brother's pickle shop went bust years ago. Two men in matching jackets show up with an IOU: $100,000 with interest.",
      "zh": "你弟的酸黃瓜店早就倒了。兩個穿著同款外套的男人拿著借據上門：連本帶利十萬美金。"
    },
    "choices": [
      {
        "text": {
          "en": "Pay it off. Family is expensive.",
          "zh": "全額付清。家人真貴。"
        },
        "effects": {
          "money": -100000,
          "health": 0,
          "happiness": -8,
          "stress": -10,
          "fame": 0,
          "removeFlags": [
            "cosigned_loan"
          ]
        }
      },
      {
        "text": {
          "en": "Run and hide. Move cities. Change your name to 'Steve'.",
          "zh": "逃跑、搬城市、改名叫『史蒂夫』。"
        },
        "effects": {
          "money": -5000,
          "health": -8,
          "happiness": -5,
          "stress": 25,
          "fame": 0,
          "addFlags": [
            "mob_target"
          ],
          "removeFlags": [
            "cosigned_loan"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_neighbor_war_chairman",
    "category": "SOCIAL",
    "minAge": 41,
    "maxAge": 60,
    "conditions": {
      "flags": [
        "neighbor_war"
      ]
    },
    "text": {
      "en": "The drummer you fought with at 3 a.m. is now chairman of the homeowners' committee. His first fine is for your 'excessive aura'.",
      "zh": "當年凌晨跟你對轟的鼓手鄰居，如今是業主委員會主席。他開的第一張罰單是針對你『過度張揚的氣場』。"
    },
    "choices": [
      {
        "text": {
          "en": "Surrender and bake him an apology cake.",
          "zh": "投降，烤一個道歉蛋糕給他。"
        },
        "effects": {
          "money": -500,
          "health": 0,
          "happiness": -5,
          "stress": -5,
          "fame": 0,
          "removeFlags": [
            "neighbor_war"
          ]
        }
      },
      {
        "text": {
          "en": "Run for chairman against him. Democracy is loud.",
          "zh": "出來競選主席跟他對決。民主是很吵的。"
        },
        "effects": {
          "money": -3000,
          "health": -3,
          "happiness": 8,
          "stress": 15,
          "fame": 5,
          "removeFlags": [
            "neighbor_war"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_ghost_accountants_audit",
    "category": "MONEY",
    "minAge": 41,
    "maxAge": 64,
    "conditions": {
      "flags": [
        "ghost_accountants"
      ]
    },
    "text": {
      "en": "Your tax returns were too perfect. The tax office has dispatched its Supernatural Investigation Unit.",
      "zh": "你的報稅單完美得不正常。稅務局派出了『超自然調查組』。"
    },
    "choices": [
      {
        "text": {
          "en": "Let the ghosts testify in a séance court.",
          "zh": "讓幽靈會計師們在招魂法庭上作證。"
        },
        "effects": {
          "money": -3000,
          "health": -3,
          "happiness": 3,
          "stress": 12,
          "fame": 8,
          "removeFlags": [
            "ghost_accountants"
          ]
        }
      },
      {
        "text": {
          "en": "Hire a lawyer who is also a medium. Billable hours: both worlds.",
          "zh": "請一位同時是靈媒的律師。兩個世界一起計費。"
        },
        "effects": {
          "money": -12000,
          "health": 0,
          "happiness": 0,
          "stress": -5,
          "fame": 0,
          "removeFlags": [
            "ghost_accountants"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_vac_debt_liquidation",
    "category": "MONEY",
    "minAge": 43,
    "maxAge": 60,
    "conditions": {
      "flags": [
        "vac_debt"
      ]
    },
    "text": {
      "en": "Your flying vacuum company is insolvent. Liquidators schedule an auction, and a mysterious overseas buyer offers to 'rescue' it.",
      "zh": "你的飛天吸塵機公司資不抵債。清盤人安排了拍賣，同時有位神秘的外國買家表示願意『接盤』。"
    },
    "choices": [
      {
        "text": {
          "en": "Let it go to auction. Watch strangers bid on your dreams.",
          "zh": "任其拍賣。看著陌生人為你的夢想喊價。"
        },
        "effects": {
          "money": -50000,
          "health": 0,
          "happiness": -8,
          "stress": -10,
          "fame": 0,
          "removeFlags": [
            "vac_debt"
          ],
          "setJob": {
            "en": "Ex-Founder (Bankrupt)",
            "zh": "前創辦人（已破產）"
          }
        }
      },
      {
        "text": {
          "en": "Sell to the overseas buyer. They promise 'peaceful uses'.",
          "zh": "賣給外國買家。他們保證『只作和平用途』。"
        },
        "effects": {
          "money": 80000,
          "health": 0,
          "happiness": -12,
          "stress": 5,
          "fame": 5,
          "addFlags": [
            "vac_weaponized"
          ],
          "removeFlags": [
            "vac_debt"
          ],
          "setJob": {
            "en": "Consultant to Unknown Buyer",
            "zh": "神秘買家的顧問"
          }
        }
      }
    ]
  },
  {
    "id": "fun_fasting_retreat",
    "category": "WEIRD",
    "minAge": 41,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "You go to a mountain retreat for a 'digital detox'. Day 5: you've started negotiating with the locked box that holds your phone.",
      "zh": "你去山上的靜修營做『數位排毒』。第五天，你開始跟鎖著手機的盒子談判。"
    },
    "choices": [
      {
        "text": {
          "en": "Stay the full week. Enlightenment has terrible reception.",
          "zh": "撐滿整週。頓悟的訊號真的很差。"
        },
        "effects": {
          "money": -2000,
          "health": 3,
          "happiness": 6,
          "stress": -12,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Sneak into town for pizza and a place with signal.",
          "zh": "偷溜下山，去吃披薩、找個有訊號的地方。"
        },
        "effects": {
          "money": -800,
          "health": -1,
          "happiness": 8,
          "stress": 3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_ufo_forum",
    "category": "WEIRD",
    "minAge": 41,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "You spend your nights on a UFO forum. The moderator 'Zorg_77' says the mothership is coming Tuesday. You believe him.",
      "zh": "你每晚沉迷於幽浮論壇。版主『Zorg_77』說母艦週二會降臨。你相信了。"
    },
    "choices": [
      {
        "text": {
          "en": "Join the hilltop welcoming party. Bring snacks.",
          "zh": "加入山頂歡迎會。記得帶零食。"
        },
        "effects": {
          "money": -1500,
          "health": -3,
          "happiness": 8,
          "stress": -5,
          "fame": 2,
          "addFlags": [
            "ufo_believer"
          ]
        }
      },
      {
        "text": {
          "en": "Log off and touch grass. Tuesday is trash day.",
          "zh": "登出，去碰碰草地。週二是倒垃圾日。"
        },
        "effects": {
          "money": 0,
          "health": 2,
          "happiness": -4,
          "stress": 3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_taichi_turf_war",
    "category": "SOCIAL",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Your yoga group and the dance-fitness class both claim the same park spot at 6 a.m. Portable speakers are being deployed.",
      "zh": "你的瑜珈小組和有氧舞蹈班的大媽們，同時看上公園早上六點的同一塊場地。攜帶式喇叭已經開始部署。"
    },
    "choices": [
      {
        "text": {
          "en": "Challenge them to a dance-off. Yoga has moves.",
          "zh": "向她們下戰書辦舞蹈對決。瑜珈也有招式。"
        },
        "effects": {
          "money": 0,
          "health": -5,
          "happiness": 6,
          "stress": 5,
          "fame": 8
        }
      },
      {
        "text": {
          "en": "Retreat to the parking lot. Find inner peace between cars.",
          "zh": "撤退到停車場。在車縫間尋找內心平靜。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -4,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_wrong_group_photo",
    "category": "SOCIAL",
    "minAge": 41,
    "maxAge": 55,
    "conditions": {},
    "text": {
      "en": "Half-asleep, you send a badly-cropped selfie in a towel turban and face mask to the 'Class 4B Parents' group chat.",
      "zh": "半夢半醒間，你把一張沒裁好、裹著毛巾頭巾又敷著面膜的自拍，傳到了『四年乙班家長群組』。"
    },
    "choices": [
      {
        "text": {
          "en": "Claim it's a reproduction of a Renaissance painting.",
          "zh": "宣稱那是一幅文藝復興名畫的仿作。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -5,
          "stress": 15,
          "fame": 5,
          "addFlags": [
            "chat_legend"
          ]
        }
      },
      {
        "text": {
          "en": "Leave every parent group and transfer your kid to another school.",
          "zh": "退出所有家長群組，並幫孩子轉學。"
        },
        "effects": {
          "money": -3000,
          "health": 0,
          "happiness": -6,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_quantum_mattress",
    "category": "WEIRD",
    "minAge": 43,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "A live-stream host convinces you to buy a $3,000 'quantum mattress'. It arrives with a certificate signed in crayon.",
      "zh": "直播主說服你買下一張三千美金的『量子床墊』，隨貨附贈一張用蠟筆簽名的證書。"
    },
    "choices": [
      {
        "text": {
          "en": "Keep it. Your back can feel the quantum.",
          "zh": "留著。你的背可以感受到量子。"
        },
        "effects": {
          "money": -3000,
          "health": -3,
          "happiness": 6,
          "stress": -8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Return it. Endure 47 minutes of hold music.",
          "zh": "退貨。忍受 47 分鐘的等候音樂。"
        },
        "effects": {
          "money": -600,
          "health": 0,
          "happiness": -3,
          "stress": 10,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "life_misdiagnosis_rebirth",
    "category": "HEALTH",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "The doctor says, 'Good news! We mixed up your file. You're not dying.' You have already quit your job, sold your car, and told your in-laws what you really think.",
      "zh": "醫生說：「好消息！我們搞錯檔案了，你沒有要死。」但你早就辭職、賣車，還把對姻親的真心話全說完了。"
    },
    "choices": [
      {
        "text": {
          "en": "Apologize to everyone. Rebuild a normal life.",
          "zh": "向所有人道歉，重建平凡人生。"
        },
        "effects": {
          "money": -10000,
          "health": 15,
          "happiness": 10,
          "stress": -10,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Refuse to go back. Continue the bucket-list chaos.",
          "zh": "拒絕回頭。繼續執行願望清單的混亂人生。"
        },
        "effects": {
          "money": -20000,
          "health": -8,
          "happiness": 15,
          "stress": 5,
          "fame": 5,
          "addFlags": [
            "bucket_list_mode"
          ]
        }
      }
    ]
  },
  {
    "id": "life_weird_inheritance",
    "category": "MONEY",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "A great-aunt you've never met leaves you a lighthouse and seven llamas. The will says: 'They need each other.'",
      "zh": "一位素未謀面的姑婆留給你一座燈塔和七隻羊駝。遺囑寫著：『它們彼此需要。』"
    },
    "choices": [
      {
        "text": {
          "en": "Accept everything. You are now a llama lighthouse keeper.",
          "zh": "全盤接收。你現在是羊駝燈塔看守人。"
        },
        "effects": {
          "money": -15000,
          "health": -3,
          "happiness": 12,
          "stress": 8,
          "fame": 5,
          "setJob": {
            "en": "Llama Lighthouse Keeper",
            "zh": "羊駝燈塔看守人"
          }
        }
      },
      {
        "text": {
          "en": "Sell the lot and never speak of the llamas again.",
          "zh": "全部賣掉，永遠不再提起羊駝。"
        },
        "effects": {
          "money": 30000,
          "health": 0,
          "happiness": -6,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "life_beach_fisherman",
    "category": "WORK",
    "minAge": 48,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "Another Monday. Another spreadsheet. You suddenly imagine yourself holding a fishing rod on a warm beach, alone and unbothered.",
      "zh": "又是週一，又是試算表。你突然幻想自己拿著釣竿坐在溫暖的沙灘上，孤獨而自在。"
    },
    "choices": [
      {
        "text": {
          "en": "Quit everything and become a full-time beach angler.",
          "zh": "放下一切，成為全職海灘釣客。"
        },
        "effects": {
          "money": -25000,
          "health": 8,
          "happiness": 20,
          "stress": -25,
          "fame": 0,
          "setJob": {
            "en": "Full-Time Beach Angler",
            "zh": "全職海灘釣客"
          }
        }
      },
      {
        "text": {
          "en": "Stay put. Fishing is just a screensaver.",
          "zh": "留下。釣魚只是螢幕保護程式。"
        },
        "effects": {
          "money": 15000,
          "health": -5,
          "happiness": -10,
          "stress": 12,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "life_hostile_takeover",
    "category": "WORK",
    "minAge": 45,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "A shark-suited investor launches a hostile takeover of your company. The first email says: 'Nothing personal. Expect layoffs.'",
      "zh": "一位西裝像鯊魚皮的投資人對你的公司發動惡意收購。第一封電郵寫著：『沒有針對個人。準備好裁員吧。』"
    },
    "choices": [
      {
        "text": {
          "en": "Lead the resistance and swallow a poison pill.",
          "zh": "帶頭抵抗，並吞下毒丸策略。"
        },
        "effects": {
          "money": -10000,
          "health": -5,
          "happiness": 5,
          "stress": 25,
          "fame": 10,
          "addFlags": [
            "raider_enemy"
          ]
        }
      },
      {
        "text": {
          "en": "Sell your shares, take the payout, and leave.",
          "zh": "賣掉股份，拿走款項，離場。"
        },
        "effects": {
          "money": 80000,
          "health": 0,
          "happiness": -8,
          "stress": -5,
          "fame": 0,
          "setJob": {
            "en": "Retired Executive",
            "zh": "退休高管"
          }
        }
      }
    ]
  },
  {
    "id": "chain_club_1",
    "category": "CHAIN",
    "minAge": 41,
    "maxAge": 58,
    "conditions": {},
    "text": {
      "en": "In a high-end hotel lounge you find a frosted black card. There's no name, only map coordinates.",
      "zh": "在高檔飯店酒廊裡，你撿到一張磨砂黑卡。上面沒有名字，只有一組地圖座標。"
    },
    "choices": [
      {
        "text": {
          "en": "Pocket it. Curiosity is a midlife hobby.",
          "zh": "收進口袋。好奇心是中年的興趣。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": 8,
          "fame": 0,
          "addFlags": [
            "has_black_card"
          ]
        }
      },
      {
        "text": {
          "en": "Hand it to the bartender. He turns pale and hands it back.",
          "zh": "交給酒保。他臉色發白，又把卡塞回你手裡。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": 2,
          "stress": 4,
          "fame": 0,
          "addFlags": [
            "has_black_card"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_club_2",
    "category": "CHAIN",
    "minAge": 42,
    "maxAge": 58,
    "conditions": {
      "flags": [
        "has_black_card"
      ]
    },
    "text": {
      "en": "The coordinates lead to a masked gala where millionaires wear animal heads. A tiger offers you membership: 'Welcome, new member.'",
      "zh": "座標把你帶到一場富豪戴動物頭套的假面夜宴。一隻老虎向你遞出入會邀請：「歡迎，新會員。」"
    },
    "choices": [
      {
        "text": {
          "en": "Accept immediately. Pay the $20,000 'initiation fee'.",
          "zh": "立刻接受。繳交兩萬美金的『入會禮金』。"
        },
        "effects": {
          "money": -20000,
          "health": -3,
          "happiness": 6,
          "stress": 8,
          "fame": 6,
          "addFlags": [
            "club_member"
          ],
          "removeFlags": [
            "has_black_card"
          ]
        }
      },
      {
        "text": {
          "en": "Haggle the fee down and wear a fake name tag.",
          "zh": "殺價，並戴上一個假名牌。"
        },
        "effects": {
          "money": -8000,
          "health": 0,
          "happiness": 2,
          "stress": 12,
          "fame": 3,
          "addFlags": [
            "club_member"
          ],
          "removeFlags": [
            "has_black_card"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_club_3",
    "category": "CHAIN",
    "minAge": 43,
    "maxAge": 59,
    "conditions": {
      "flags": [
        "club_member"
      ]
    },
    "text": {
      "en": "The club tips you off about a pharma stock that will 100x tomorrow. All you have to do is sign a contract using ten years of your lifespan as collateral.",
      "zh": "俱樂部給你一個明天會暴漲百倍的藥廠股票內幕。你只需要簽一份以『十年壽命』作抵押的合約。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign in blood. The interest rate is 'eternal'.",
          "zh": "以血簽名。利息是『永恆』。"
        },
        "effects": {
          "money": 200000,
          "health": -15,
          "happiness": -5,
          "stress": 15,
          "fame": 0,
          "addFlags": [
            "club_contract",
            "lifespan_pledged"
          ],
          "removeFlags": [
            "club_member"
          ]
        }
      },
      {
        "text": {
          "en": "Refuse politely. They mark your name in a very thick book.",
          "zh": "禮貌拒絕。他們在一本非常厚的簿子裡寫下你的名字。"
        },
        "effects": {
          "money": 3000,
          "health": 0,
          "happiness": 2,
          "stress": 20,
          "fame": 0,
          "addFlags": [
            "club_contract",
            "club_dropout"
          ],
          "removeFlags": [
            "club_member"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_club_4",
    "category": "CHAIN",
    "minAge": 44,
    "maxAge": 60,
    "conditions": {
      "flags": [
        "club_contract"
      ]
    },
    "text": {
      "en": "A multinational task force raids the club at dawn. Agents hold a list with your name and offer you a choice: name your fellow members for immunity, or swallow the encrypted ledger chip.",
      "zh": "跨國執法隊在黎明突擊俱樂部。探員手上有一份寫著你名字的名單，並給你兩個選擇：供出其他會員換取豁免，或吞下加密帳本晶片。"
    },
    "choices": [
      {
        "text": {
          "en": "Name names. Enter witness protection.",
          "zh": "供出同夥。進入證人保護計劃。"
        },
        "effects": {
          "money": -20000,
          "health": 0,
          "happiness": -12,
          "stress": 10,
          "fame": 12,
          "removeFlags": [
            "club_contract"
          ],
          "setJob": {
            "en": "Protected Witness",
            "zh": "受保護證人"
          },
          "setRelationship": {
            "en": "Estranged (Witness Protection)",
            "zh": "疏離（證人保護中）"
          }
        }
      },
      {
        "text": {
          "en": "Swallow the chip. Become a professional victim.",
          "zh": "吞下晶片。成為終身受害者。"
        },
        "effects": {
          "money": 30000,
          "health": -20,
          "happiness": 4,
          "stress": 20,
          "fame": 5,
          "removeFlags": [
            "club_contract"
          ],
          "setJob": {
            "en": "Professional Victim",
            "zh": "終身受害者（賠償待議）"
          }
        }
      }
    ]
  },
  {
    "id": "norm_will_fight",
    "category": "SOCIAL",
    "minAge": 65,
    "maxAge": 95,
    "conditions": {},
    "text": {
      "en": "You announce you're rewriting your will. Your three kids instantly open a group chat named 'Operation Inheritance'.",
      "zh": "你宣布要重寫遺囑。三個孩子立刻開了個名叫『遺產行動』的群組。"
    },
    "choices": [
      {
        "text": {
          "en": "Split it equally and enjoy the peace (for about four minutes).",
          "zh": "平均分配，享受平靜（大概四分鐘）。"
        },
        "effects": {
          "money": -5000,
          "health": 0,
          "happiness": 3,
          "stress": -5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Leave everything to whoever visits most. Watch the Great Visiting Contest begin.",
          "zh": "遺產留給最常來探望的人。看『探望大賽』開跑。"
        },
        "effects": {
          "money": -2000,
          "health": 2,
          "happiness": 6,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "visit_contest"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_dentures_hotpot",
    "category": "HEALTH",
    "minAge": 65,
    "maxAge": 95,
    "conditions": {},
    "text": {
      "en": "At the family reunion, your dentures slip out and land in the bubbling cheese fondue. Nobody speaks. Everybody watches.",
      "zh": "家族聚餐時，你的假牙滑出來，掉進冒泡的起司鍋裡。沒有人說話，所有人都在看。"
    },
    "choices": [
      {
        "text": {
          "en": "Fish them out and put them back. Efficient.",
          "zh": "撈出來直接戴回去。很有效率。"
        },
        "effects": {
          "money": 0,
          "health": -8,
          "happiness": 2,
          "stress": 3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Announce 'chef's special: dentures au gratin' and order a new set.",
          "zh": "宣布這是『主廚特餐：焗烤假牙』，然後訂一副新假牙。"
        },
        "effects": {
          "money": -1500,
          "health": 0,
          "happiness": 3,
          "stress": 5,
          "fame": 2
        }
      }
    ]
  },
  {
    "id": "norm_spouse_passes",
    "category": "LOVE",
    "minAge": 65,
    "maxAge": 95,
    "conditions": {},
    "text": {
      "en": "Your spouse of forty years passes away first. Their last words were: 'The remote is under the couch.'",
      "zh": "相伴四十年的老伴先走一步。他的遺言是：「遙控器在沙發底下。」"
    },
    "choices": [
      {
        "text": {
          "en": "Hold a lavish farewell with their favorite karaoke playlist.",
          "zh": "辦一場放滿他最愛卡拉 OK 歌單的盛大告別式。"
        },
        "effects": {
          "money": -8000,
          "health": -3,
          "happiness": 3,
          "stress": -5,
          "fame": 0,
          "setRelationship": {
            "en": "Widowed",
            "zh": "喪偶"
          }
        }
      },
      {
        "text": {
          "en": "Keep it small and quiet. Talk to the empty couch.",
          "zh": "簡單低調。對著空沙發說話。"
        },
        "effects": {
          "money": -1500,
          "health": -3,
          "happiness": -10,
          "stress": 8,
          "fame": 0,
          "setRelationship": {
            "en": "Widowed",
            "zh": "喪偶"
          }
        }
      }
    ]
  },
  {
    "id": "norm_twilight_scam",
    "category": "LOVE",
    "minAge": 63,
    "maxAge": 90,
    "conditions": {},
    "text": {
      "en": "A charming 'Colonel Jack' from a military hospital abroad messages you daily. He needs $30,000 to 'ship his gold'. Your bank teller looks worried.",
      "zh": "一位自稱來自海外軍醫院的迷人『傑克上校』每天傳訊息給你。他需要 3 萬美金『運送黃金』。銀行櫃員一臉擔心。"
    },
    "choices": [
      {
        "text": {
          "en": "Send the money. Your heart overrules your bank teller.",
          "zh": "匯錢。你的心臟否決了銀行櫃員。"
        },
        "effects": {
          "money": -30000,
          "health": 0,
          "happiness": -6,
          "stress": 15,
          "fame": 0,
          "addFlags": [
            "scam_victim"
          ],
          "setRelationship": {
            "en": "Online Romance (Unverified)",
            "zh": "網戀中（身份未驗證）"
          }
        }
      },
      {
        "text": {
          "en": "Report him and tell your family. Being careful isn't being foolish.",
          "zh": "報警並告訴家人。謹慎不等於愚蠢。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 2,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_tv_miracle_cure",
    "category": "HEALTH",
    "minAge": 65,
    "maxAge": 95,
    "conditions": {},
    "text": {
      "en": "A TV shopping host swears 'Miracle Root Extract' cured 10,000 people. The 'before' photo looks suspiciously like the 'after'.",
      "zh": "電視購物主持人發誓『長生根精華』治好了一萬人。『使用前』的照片跟『使用後』看起來一模一樣。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy a year's supply. The placebo effect is free; the invoice is not.",
          "zh": "買一整年份。安慰劑效應是免費的，帳單可不是。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": 4,
          "stress": -3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Turn off the TV and take a walk instead.",
          "zh": "關掉電視，出門散個步。"
        },
        "effects": {
          "money": 0,
          "health": 4,
          "happiness": -3,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  }
];
