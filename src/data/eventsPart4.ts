import { GameEvent } from "../types/game";

export const eventsPart4: GameEvent[] = [
  {
    "id": "norm_early_pension",
    "category": "MONEY",
    "minAge": 60,
    "maxAge": 66,
    "conditions": {},
    "text": {
      "en": "A letter from the benefits office offers two options: claim early for a smaller payment, or wait for a bigger one. It's 14 pages long, and the fine print has its own fine print.",
      "zh": "养老金办公室来信提供两个选项：提前领取但金额较少，或者等着领更多。信有 14 页，小字里还有小字。"
    },
    "choices": [
      {
        "text": {
          "en": "Claim early. Enjoy the money now.",
          "zh": "提前领。现在就享受这笔钱。"
        },
        "effects": {
          "money": 4000,
          "health": 0,
          "happiness": 5,
          "stress": -3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Keep working and claim later for the bigger payment. Future You sends a thank-you note.",
          "zh": "继续工作，晚点再领更多。未来的你会寄来一张感谢卡。"
        },
        "effects": {
          "money": 10000,
          "health": -3,
          "happiness": -2,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_screening_prep",
    "category": "HEALTH",
    "minAge": 60,
    "maxAge": 70,
    "conditions": {},
    "text": {
      "en": "Your doctor recommends a routine screening for people your age. The prep involves a special drink that tastes like regret and an evening spent near the bathroom.",
      "zh": "医生建议你这个年纪该做常规筛查。准备工作包括喝一种尝起来像后悔的特调饮料，以及整晚守在厕所旁边。"
    },
    "choices": [
      {
        "text": {
          "en": "Do it. Drink the regret. Be a grown-up about it.",
          "zh": "去做。喝下那杯后悔。做个成熟的大人。"
        },
        "effects": {
          "money": -300,
          "health": 10,
          "happiness": -2,
          "stress": 5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Postpone it 'until things calm down'. Things never calm down.",
          "zh": "拖到“等忙完这阵再说”。这阵永远忙不完。"
        },
        "effects": {
          "money": 0,
          "health": -6,
          "happiness": 2,
          "stress": 3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_pottery_class",
    "category": "SOCIAL",
    "minAge": 61,
    "maxAge": 70,
    "conditions": {},
    "text": {
      "en": "You join a pottery class. The instructor is 23, calls you 'a natural', and your first bowl looks like a hat.",
      "zh": "你报了陶艺课。老师才 23 岁，夸你“很有天赋”，而你的第一个碗看起来像一顶帽子。"
    },
    "choices": [
      {
        "text": {
          "en": "Keep going. Gift the 'hat bowl' to everyone you know.",
          "zh": "继续上课。把“帽子碗”送给你认识的每一个人。"
        },
        "effects": {
          "money": -600,
          "health": 1,
          "happiness": 10,
          "stress": -8,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Quit after one lesson and blame the clay.",
          "zh": "上完一节课就放弃，怪泥巴。"
        },
        "effects": {
          "money": -100,
          "health": 0,
          "happiness": -3,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_old_flame",
    "category": "LOVE",
    "minAge": 60,
    "maxAge": 68,
    "conditions": {},
    "text": {
      "en": "Your high-school sweetheart finds you online: 'Coffee? I promise to be less dramatic than at seventeen.'",
      "zh": "你的高中初恋在网上找到了你：“喝杯咖啡？我保证比十七岁时低调一点。”"
    },
    "choices": [
      {
        "text": {
          "en": "Meet for coffee. Bring spare reading glasses and your best posture.",
          "zh": "去喝咖啡。带上备用老花镜，挺直腰板。"
        },
        "effects": {
          "money": -60,
          "health": 0,
          "happiness": 9,
          "stress": 5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Send a warm reply and keep the memories in their box.",
          "zh": "回一条温暖的消息，把回忆留在盒子里。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -2,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_smart_home",
    "category": "WEIRD",
    "minAge": 61,
    "maxAge": 70,
    "conditions": {},
    "text": {
      "en": "Your smart home has developed opinions. The thermostat judges you, the fridge locks itself at midnight, and the doorbell keeps saying 'you again?'",
      "zh": "你的智能家居开始有自己的想法。恒温器在评判你，冰箱午夜自动上锁，门铃一直说“又是你？”"
    },
    "choices": [
      {
        "text": {
          "en": "Learn the settings. Become the bossiest person in the house.",
          "zh": "研究设置，成为家里最霸道的人。"
        },
        "effects": {
          "money": -400,
          "health": 0,
          "happiness": 5,
          "stress": 5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Rip it all out and go analog. A light switch never talks back.",
          "zh": "全部拆掉，回归模拟时代。电灯开关绝不会顶嘴。"
        },
        "effects": {
          "money": -1800,
          "health": 0,
          "happiness": 6,
          "stress": -6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_boomerang_kid",
    "category": "SOCIAL",
    "minAge": 60,
    "maxAge": 66,
    "conditions": {},
    "text": {
      "en": "Your 30-something kid moves back home 'temporarily' with a rescue dog, three plants, and a startup idea about subscription toothpicks.",
      "zh": "你三十多岁的孩子“暂时”搬回家，带着一只收容所领养的狗、三盆植物，和一个订阅制牙签的创业点子。"
    },
    "choices": [
      {
        "text": {
          "en": "Let them stay. Post house rules on a laminated card.",
          "zh": "让他们住下。把家规塑封贴在墙上。"
        },
        "effects": {
          "money": -6000,
          "health": -2,
          "happiness": 6,
          "stress": 10,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Set a move-out date. Be the loving landlord nobody asked for.",
          "zh": "定个搬出日期。当个没人要的慈爱房东。"
        },
        "effects": {
          "money": 3000,
          "health": 0,
          "happiness": -3,
          "stress": 6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_half_marathon",
    "category": "HEALTH",
    "minAge": 61,
    "maxAge": 68,
    "conditions": {},
    "text": {
      "en": "A friend dares you to sign up for a half-marathon. Your knees demand to speak to a manager.",
      "zh": "朋友激你报名半程马拉松。你的膝盖要求见经理。"
    },
    "choices": [
      {
        "text": {
          "en": "Train for it. Finish last, wearing your medal like a hero.",
          "zh": "认真训练。最后一名冲线，把奖牌戴得像英雄。"
        },
        "effects": {
          "money": -400,
          "health": 8,
          "happiness": 10,
          "stress": -3,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Volunteer at the water station. Cheering counts as cardio.",
          "zh": "去补给站当志愿者。喊加油也算有氧。"
        },
        "effects": {
          "money": 0,
          "health": 2,
          "happiness": 4,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_language_trip",
    "category": "SOCIAL",
    "minAge": 61,
    "maxAge": 70,
    "conditions": {},
    "text": {
      "en": "You learn a foreign language for a dream trip. After three months, you can order soup and apologize. That's it.",
      "zh": "你为了梦想之旅学一门外语。三个月后，你会点汤，也会道歉。就这样。"
    },
    "choices": [
      {
        "text": {
          "en": "Go anyway. Order soup with confidence and apologize to everyone.",
          "zh": "照样出发。自信地点汤，并向每个人道歉。"
        },
        "effects": {
          "money": -5000,
          "health": 0,
          "happiness": 12,
          "stress": 3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Stay home and cook the soup yourself. The trip lives in your imagination.",
          "zh": "留在家自己煮汤。旅行活在想象里。"
        },
        "effects": {
          "money": -100,
          "health": 0,
          "happiness": -2,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_hearing_check",
    "category": "HEALTH",
    "minAge": 60,
    "maxAge": 70,
    "conditions": {},
    "text": {
      "en": "You've said 'what?' so often that your family made it your nickname. A hearing test suggests a tiny device with big opinions.",
      "zh": "你太常说“啊？”了，家人干脆把它当成你的外号。听力检查建议你戴一个意见很多的小装置。"
    },
    "choices": [
      {
        "text": {
          "en": "Get hearing aids. Discover the family group chat was never that quiet.",
          "zh": "配助听器。发现家族群原来从来没那么安静。"
        },
        "effects": {
          "money": -2500,
          "health": 4,
          "happiness": 6,
          "stress": -2,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Keep nodding and smiling. Accidentally agree to host the next holiday.",
          "zh": "继续点头微笑。结果不小心答应了主办下一次节日聚会。"
        },
        "effects": {
          "money": 0,
          "health": -3,
          "happiness": 2,
          "stress": 4,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_cruise_deal",
    "category": "MONEY",
    "minAge": 60,
    "maxAge": 68,
    "conditions": {},
    "text": {
      "en": "A travel agent offers a 'once-in-a-lifetime' 40-day cruise. The brochure has one photo of a buffet and three of a life jacket.",
      "zh": "旅行社推销“一生一次”的 40 天邮轮。宣传册里有一张自助餐的照片，和三张救生衣的照片。"
    },
    "choices": [
      {
        "text": {
          "en": "Book it. Pack sea-sickness pills and pure optimism.",
          "zh": "订了。带上晕船药和满满的乐观。"
        },
        "effects": {
          "money": -12000,
          "health": -3,
          "happiness": 12,
          "stress": -8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Take a week-long scenic train ride instead. Views without sea legs.",
          "zh": "改坐为期一周的观光火车。有风景，不晕船。"
        },
        "effects": {
          "money": -3000,
          "health": 1,
          "happiness": 6,
          "stress": -6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_book_club_war",
    "category": "SOCIAL",
    "minAge": 60,
    "maxAge": 75,
    "conditions": {},
    "text": {
      "en": "Your book club has split into two factions over whether the last novel's ending was 'brilliant' or 'a crime'. Snacks are being weaponized.",
      "zh": "你的读书会因为上一本小说的结局是“神来之笔”还是“一场犯罪”，分裂成两派。点心正被当成武器。"
    },
    "choices": [
      {
        "text": {
          "en": "Start your own club with better snacks.",
          "zh": "自己另开一个读书会，点心更好。"
        },
        "effects": {
          "money": -200,
          "health": 0,
          "happiness": 8,
          "stress": 3,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Play peacemaker: propose a book nobody has read yet.",
          "zh": "当和事佬：提议读一本没人看过的书。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": 6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_tomato_feud",
    "category": "SOCIAL",
    "minAge": 60,
    "maxAge": 70,
    "conditions": {},
    "text": {
      "en": "Your tomatoes are outperforming your neighbor's. He has started leaving anonymous notes: 'Nice tomatoes. Shame if something happened to them.'",
      "zh": "你的番茄长得比邻居的好。他开始留匿名纸条：“番茄不错。要是出点什么事就可惜了。”"
    },
    "choices": [
      {
        "text": {
          "en": "Escalate: install a tiny fence and a very small security camera.",
          "zh": "升级战局：装一道小围栏，再装一个迷你监控。"
        },
        "effects": {
          "money": -400,
          "health": 0,
          "happiness": 9,
          "stress": 8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Deliver a basket of tomatoes. Defeat him with kindness.",
          "zh": "送一篮番茄过去。用善意打败他。"
        },
        "effects": {
          "money": -30,
          "health": 0,
          "happiness": 5,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_century_letter",
    "category": "SOCIAL",
    "minAge": 97,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "A letter from the government congratulates you on nearly reaching 100. Enclosed is a form asking you to confirm you're still alive.",
      "zh": "政府来信祝贺你即将满一百岁。信里附了一张表格，要你确认自己还活着。"
    },
    "choices": [
      {
        "text": {
          "en": "Frame the letter and mail back the form with a smiley face.",
          "zh": "把信装裱起来，并在表格上画个笑脸寄回去。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 8,
          "stress": 0,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Ignore it and nap. Officially, you're 'under review'.",
          "zh": "不理它，去睡午觉。官方记录上，你“审核中”。"
        },
        "effects": {
          "money": 0,
          "health": 3,
          "happiness": 3,
          "stress": -4,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_candle_cake",
    "category": "SOCIAL",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "Your birthday cake has so many candles that the fire department sends a polite email.",
      "zh": "你的生日蛋糕上蜡烛多到消防队寄来一封礼貌的邮件。"
    },
    "choices": [
      {
        "text": {
          "en": "Blow them out with the whole family. It's a team sport.",
          "zh": "全家人一起吹。这是团体项目。"
        },
        "effects": {
          "money": 0,
          "health": -2,
          "happiness": 10,
          "stress": -3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Use one candle shaped like your age. Efficiency is wisdom.",
          "zh": "只插一根数字形状的蜡烛。效率就是智慧。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_great_grandkid_interview",
    "category": "SOCIAL",
    "minAge": 95,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "Your great-grandchild needs to interview you for a school project: 'What was it like before the internet?'",
      "zh": "你的曾孙要为学校作业采访你：“互联网出现以前是什么样子？”"
    },
    "choices": [
      {
        "text": {
          "en": "Tell the whole story, embellished with a few dinosaurs.",
          "zh": "把整段故事讲完，还加了几只恐龙。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 12,
          "stress": -5,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Hand over a box of old photos and take a nap.",
          "zh": "交出一盒老照片，然后去睡午觉。"
        },
        "effects": {
          "money": 0,
          "health": 2,
          "happiness": 6,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_video_chaos",
    "category": "SOCIAL",
    "minAge": 90,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "Your family sets up a video call with fourteen relatives. Nobody is muted, and someone's parrot is singing.",
      "zh": "家人给你开了一场十四位亲戚的视频通话。没有人静音，还有人家的鹦鹉在唱歌。"
    },
    "choices": [
      {
        "text": {
          "en": "Stay on and become the star of the chaos.",
          "zh": "留在线上，成为这场混乱的主角。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 10,
          "stress": 5,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Say the screen froze and take a nap.",
          "zh": "说屏幕卡住了，然后去睡午觉。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 3,
          "stress": -4,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_secret_recipe",
    "category": "SOCIAL",
    "minAge": 95,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "Your family begs for your legendary recipe. You've kept it secret for seventy years.",
      "zh": "家人苦苦哀求你传授那道传说中的菜谱。你已经保密七十年了。"
    },
    "choices": [
      {
        "text": {
          "en": "Write it down. Change one ingredient to keep them guessing.",
          "zh": "写下来，但偷偷改掉一样材料，让他们继续猜。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 8,
          "stress": 2,
          "fame": 3
        }
      },
      {
        "text": {
          "en": "Keep it secret. The mystery is the seasoning.",
          "zh": "继续保密。神秘感就是最好的调味料。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": -4,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_time_capsule",
    "category": "SOCIAL",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "The town asks you to seal a time capsule to be opened in fifty years. You're the guest of honor. Everyone is politely doing the math.",
      "zh": "小镇请你为一个五十年后才开启的时间胶囊封口。你是贵宾，每个人都在礼貌地心算。"
    },
    "choices": [
      {
        "text": {
          "en": "Add a letter and your favorite hat. Plan to attend the opening.",
          "zh": "放进一封信和你最爱的帽子。打算出席开启仪式。"
        },
        "effects": {
          "money": -200,
          "health": 0,
          "happiness": 10,
          "stress": 2,
          "fame": 4
        }
      },
      {
        "text": {
          "en": "Add one note: 'Buy low, sell high.' Nothing else.",
          "zh": "只放一张字条：“低买高卖。”没别的了。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 5,
          "stress": -3,
          "fame": 2
        }
      }
    ]
  },
  {
    "id": "norm_named_bench",
    "category": "SOCIAL",
    "minAge": 95,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "The park names a bench after you for 'outstanding longevity'. It is deeply uncomfortable.",
      "zh": "公园以“杰出长寿”为由，用你的名字命名了一张长椅。它坐起来非常不舒服。"
    },
    "choices": [
      {
        "text": {
          "en": "Sit on it daily and greet every stranger.",
          "zh": "每天坐在上面，跟每个路人打招呼。"
        },
        "effects": {
          "money": 0,
          "health": 2,
          "happiness": 8,
          "stress": 3,
          "fame": 5
        }
      },
      {
        "text": {
          "en": "Demand a cushion. Longevity should come with back support.",
          "zh": "要求加个坐垫。长寿应该附赠腰部支撑。"
        },
        "effects": {
          "money": -100,
          "health": 0,
          "happiness": 4,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_someday_list",
    "category": "WEIRD",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "You realize you've outlived your entire 'someday' list. You start a new one titled 'Tomorrow, Maybe'.",
      "zh": "你发现自己已经活得比整张“改天再说”清单还久。于是你新开了一张，标题是“明天，也许”。"
    },
    "choices": [
      {
        "text": {
          "en": "Tackle it: ice cream for breakfast, a sunrise, and a handwritten note to an old friend.",
          "zh": "逐项完成：早餐吃冰淇淋、看日出、给老朋友写一封手写信。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": 14,
          "stress": 2,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Nap first. The list has waited this long.",
          "zh": "先睡一觉。清单都等这么久了。"
        },
        "effects": {
          "money": 0,
          "health": 1,
          "happiness": 3,
          "stress": -6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_advice_column",
    "category": "WORK",
    "minAge": 95,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "A local paper asks you to write a weekly advice column. Your first tip: 'Drink water and be kind. Everything else is decoration.'",
      "zh": "本地报社邀你写每周的建议专栏。你的第一条建议：“多喝水，对人好。其他都是装饰。”"
    },
    "choices": [
      {
        "text": {
          "en": "Accept. Become the town oracle.",
          "zh": "接下专栏，成为小镇的先知。"
        },
        "effects": {
          "money": 500,
          "health": 0,
          "happiness": 10,
          "stress": 6,
          "fame": 8
        }
      },
      {
        "text": {
          "en": "Decline politely. Wisdom is free at the kitchen table.",
          "zh": "礼貌婉拒。智慧在厨房饭桌上就是免费的。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 3,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_neighbor_game_night",
    "category": "SOCIAL",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "You've outlived most of your old friends. The neighborhood kids invite you to their game night.",
      "zh": "你的老朋友大多已经先走一步。附近的孩子邀你参加他们的游戏之夜。"
    },
    "choices": [
      {
        "text": {
          "en": "Join. Learn a card game whose rules were invented by a nine-year-old.",
          "zh": "加入。学一种规则由九岁小孩发明的纸牌游戏。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": 12,
          "stress": 3,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Stay in with tea and your old records.",
          "zh": "留在家，泡杯茶听老唱片。"
        },
        "effects": {
          "money": 0,
          "health": 1,
          "happiness": 2,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_garden_slip",
    "category": "HEALTH",
    "minAge": 95,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "You slip in the garden. The paramedic calls you 'the toughest person I've met today'.",
      "zh": "你在花园里滑了一跤。急救员说你是“我今天见过最硬的人”。"
    },
    "choices": [
      {
        "text": {
          "en": "Go to the clinic for a checkup and accept a sturdy cane.",
          "zh": "去诊所做检查，并接受一根结实的手杖。"
        },
        "effects": {
          "money": -300,
          "health": 6,
          "happiness": 2,
          "stress": 0,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Insist on ice cream first, then the checkup.",
          "zh": "坚持先吃冰淇淋，再做检查。"
        },
        "effects": {
          "money": -300,
          "health": 3,
          "happiness": 6,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_birth_year_menu",
    "category": "MONEY",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "Every online form's birth-year menu starts too late for you.",
      "zh": "每一份网上表格的出生年份下拉菜单，起点都晚得没你的份。"
    },
    "choices": [
      {
        "text": {
          "en": "Ask the grandkids to fill it in. Delegation is wisdom.",
          "zh": "让孙子代填。懂得授权就是智慧。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": -3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Write a strongly worded letter to the website. On paper.",
          "zh": "给网站写一封措辞强烈的信。用纸写的。"
        },
        "effects": {
          "money": -5,
          "health": 0,
          "happiness": 6,
          "stress": 2,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_squirrel_secretary",
    "category": "WEIRD",
    "minAge": 95,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "A squirrel has decided you're its personal secretary. It leaves acorns on your windowsill with 'urgent' notes.",
      "zh": "一只松鼠认定你是它的私人秘书。它在你的窗台上留下橡果和“紧急”字条。"
    },
    "choices": [
      {
        "text": {
          "en": "Accept the job. Answer the acorn mail.",
          "zh": "接下这份工作，回复橡果来信。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": 8,
          "stress": 3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Resign politely. The squirrel goes on strike outside.",
          "zh": "礼貌辞职。松鼠在窗外罢工。"
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
    "id": "norm_fancy_recliner",
    "category": "HEALTH",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "Your favorite armchair has been replaced by a modern recliner with fourteen buttons. It talks.",
      "zh": "你最爱的扶手椅被换成了一把有十四个按钮的新款躺椅。它会说话。"
    },
    "choices": [
      {
        "text": {
          "en": "Learn all fourteen buttons. Become master of the chair.",
          "zh": "学会全部十四个按钮，成为椅子的主人。"
        },
        "effects": {
          "money": -900,
          "health": 3,
          "happiness": 8,
          "stress": 0,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Keep the old chair. It remembers your shape.",
          "zh": "留下旧椅子。它记得你的形状。"
        },
        "effects": {
          "money": 0,
          "health": -2,
          "happiness": 5,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_wedding_song",
    "category": "SOCIAL",
    "minAge": 96,
    "maxAge": 100,
    "conditions": {},
    "text": {
      "en": "The care-home band asks what song you'd like. You say: 'the one from my wedding.' Nobody knows it, but everyone hums along.",
      "zh": "养老院的乐队问你想听什么歌。你说：“我婚礼上的那首。”没人听过，但大家都跟着哼。"
    },
    "choices": [
      {
        "text": {
          "en": "Sing it yourself. Every wrong note is a memory.",
          "zh": "自己唱。每一个跑调都是一段回忆。"
        },
        "effects": {
          "money": 0,
          "health": -2,
          "happiness": 12,
          "stress": 2,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Hum along and let the band figure it out.",
          "zh": "跟着哼，让乐队自己摸索。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 6,
          "stress": -4,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_gap_year_debate",
    "category": "WORK",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "Everyone expects you to go straight to college. You want a gap year 'to find yourself'. Your savings: $412 and a very confident backpack.",
      "zh": "所有人都期待你直接上大学。你想休一年“间隔年”找自己。你的存款：412 美元，外加一个信心满满的背包。"
    },
    "choices": [
      {
        "text": {
          "en": "Enroll in college. Find yourself in the cafeteria line.",
          "zh": "去上大学。在食堂排队的队伍里找自己。"
        },
        "effects": {
          "money": -15000,
          "health": 0,
          "happiness": 4,
          "stress": 8,
          "fame": 1,
          "setJob": {
            "en": "Undergraduate",
            "zh": "大学生"
          }
        }
      },
      {
        "text": {
          "en": "Take the gap year. Find yourself, hopefully near a beach.",
          "zh": "休间隔年。希望能在海滩附近找到自己。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": 9,
          "stress": 4,
          "fame": 0,
          "setJob": {
            "en": "Gap-Year Wanderer",
            "zh": "间隔年流浪者"
          }
        }
      }
    ]
  },
  {
    "id": "fun_taxidermy_roommate",
    "category": "WEIRD",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "Your assigned dorm roommate collects taxidermy squirrels and has strong opinions about your sleep schedule.",
      "zh": "系统分配给你的宿舍室友收集松鼠标本，而且对你的作息有强烈意见。"
    },
    "choices": [
      {
        "text": {
          "en": "Stay. Negotiate a 'no squirrels after 10 p.m.' treaty.",
          "zh": "留下来。谈判出一份“晚上十点后不准出现松鼠”的条约。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": 6,
          "stress": 8,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Pay extra for a single room. Peace has a price tag.",
          "zh": "加钱换单人间。平静是有标价的。"
        },
        "effects": {
          "money": -3000,
          "health": 2,
          "happiness": -2,
          "stress": -8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_driving_test_fail",
    "category": "SOCIAL",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "You fail your driving test for the second time. The examiner writes 'confident, but wrong' on your report.",
      "zh": "你的驾照考试第二次没过。考官在报告上写着：“很有自信，但是错的。”"
    },
    "choices": [
      {
        "text": {
          "en": "Book a third test and take lessons from your grandma.",
          "zh": "报名第三次考试，并跟奶奶学开车。"
        },
        "effects": {
          "money": -200,
          "health": 0,
          "happiness": 3,
          "stress": 6,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Go carless. Bike everywhere and call it 'sustainable'.",
          "zh": "放弃开车。骑自行车到处跑，还美其名曰“可持续生活”。"
        },
        "effects": {
          "money": 100,
          "health": 4,
          "happiness": -3,
          "stress": 2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_campus_shirt_card",
    "category": "MONEY",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "A campus table offers a free T-shirt if you sign up for a credit card. The shirt is remarkably soft.",
      "zh": "校园摊位说，办一张信用卡就送免费 T 恤。那件 T 恤软得惊人。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign up. Softness has no price (until the statement arrives).",
          "zh": "办卡。柔软无价（直到账单寄来为止）。"
        },
        "effects": {
          "money": -600,
          "health": 0,
          "happiness": 5,
          "stress": 6,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Walk away. Your neck stays in the freezing weather.",
          "zh": "转身离开。你的脖子继续暴露在寒风里。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": -3,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_summer_job_pick",
    "category": "WORK",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "Summer job options: lifeguard at a pool with a suspicious smell, or a giant mascot suit at a burger stand in July.",
      "zh": "暑期工二选一：在气味可疑的游泳池当救生员，或者七月穿巨型吉祥物玩偶服在汉堡摊前发传单。"
    },
    "choices": [
      {
        "text": {
          "en": "Wear the mascot suit. Sweat is a form of branding.",
          "zh": "穿上玩偶服。汗水也是一种品牌经营。"
        },
        "effects": {
          "money": 3000,
          "health": -4,
          "happiness": 3,
          "stress": 8,
          "fame": 3,
          "setJob": {
            "en": "Burger Mascot (Seasonal)",
            "zh": "汉堡吉祥物（季节工）"
          }
        }
      },
      {
        "text": {
          "en": "Guard the pool. Nobody drowns, everybody sighs.",
          "zh": "守护泳池。没有人溺水，只有人叹气。"
        },
        "effects": {
          "money": 2200,
          "health": 3,
          "happiness": -2,
          "stress": -3,
          "fame": 0,
          "setJob": {
            "en": "Lifeguard (Seasonal)",
            "zh": "救生员（季节工）"
          }
        }
      }
    ]
  },
  {
    "id": "norm_curfew_at_eighteen",
    "category": "SOCIAL",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "Your parents set a midnight curfew for a legal adult. Their leverage: free laundry and pasta.",
      "zh": "你的父母给一个法定成年人定了午夜门禁。他们的筹码：免费洗衣服，以及意面。"
    },
    "choices": [
      {
        "text": {
          "en": "Follow it. Enjoy the pasta and fold your dignity neatly.",
          "zh": "乖乖遵守。享用意面，并把尊严叠得整整齐齐。"
        },
        "effects": {
          "money": 300,
          "health": 2,
          "happiness": -3,
          "stress": -4,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Move into a shared flat above a noisy bakery.",
          "zh": "搬进一间在吵闹面包店楼上的合租公寓。"
        },
        "effects": {
          "money": -3500,
          "health": -2,
          "happiness": 8,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_first_ballot",
    "category": "SOCIAL",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "Your first election: the ballot has 43 items, and you've read none of them. A stranger offers a 'cheat sheet'.",
      "zh": "你的第一次投票：选票上有 43 个项目，你一个都没读过。一个陌生人递来“小抄”。"
    },
    "choices": [
      {
        "text": {
          "en": "Read every item. Arrive late, but informed.",
          "zh": "把每个项目都读完。迟到，但很有见识。"
        },
        "effects": {
          "money": 0,
          "health": -1,
          "happiness": 3,
          "stress": 6,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Decide the first three and skip the rest. Democracy is a marathon.",
          "zh": "只决定前三项，其余跳过。民主是场马拉松。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -1,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_regrettable_tattoo",
    "category": "WEIRD",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "You want a tattoo of your crush's name. You've known them for eleven days.",
      "zh": "你想纹一个暗恋对象名字的纹身。你认识对方十一天了。"
    },
    "choices": [
      {
        "text": {
          "en": "Get it. Commitment looks great on skin.",
          "zh": "纹。承诺在皮肤上看起来很棒。"
        },
        "effects": {
          "money": -150,
          "health": -2,
          "happiness": 8,
          "stress": 3,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Get a tiny cactus instead. Prickly and low-maintenance.",
          "zh": "改纹一株小仙人掌。带刺而且好养活。"
        },
        "effects": {
          "money": -100,
          "health": 0,
          "happiness": 4,
          "stress": -1,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_graduation_speech",
    "category": "SOCIAL",
    "minAge": 18,
    "maxAge": 20,
    "conditions": {},
    "text": {
      "en": "The valedictorian loses their voice. You're asked to give the graduation speech: five minutes, three index cards.",
      "zh": "毕业生代表突然失声，你被临时拉去致辞：五分钟、三张小卡片。"
    },
    "choices": [
      {
        "text": {
          "en": "Wing it with jokes about the cafeteria.",
          "zh": "即兴发挥，全是关于学校食堂的笑话。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 8,
          "stress": 10,
          "fame": 6
        }
      },
      {
        "text": {
          "en": "Read the cards. They are somehow in the wrong order.",
          "zh": "照着卡片念。卡片不知为何顺序全乱了。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 2,
          "stress": 3,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_textbook_price",
    "category": "MONEY",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "The required textbook costs $280. It's a 'new edition' with two changed commas.",
      "zh": "指定教材要价 280 美元。所谓“新版”只改了两个逗号。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy it new. Enjoy the smell of overpriced paper.",
          "zh": "买全新的。闻着昂贵纸张的味道。"
        },
        "effects": {
          "money": -280,
          "health": 0,
          "happiness": 1,
          "stress": -3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Share one copy with three strangers via a 'study group'.",
          "zh": "跟三个陌生人组成“学习小组”，共用一本。"
        },
        "effects": {
          "money": -70,
          "health": 0,
          "happiness": 4,
          "stress": 6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_all_nighter",
    "category": "HEALTH",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "Your final essay is due at 9 a.m. It's 1 a.m. You have a title and a mug.",
      "zh": "期末论文早上九点截止。现在凌晨一点。你只有一个标题和一个马克杯。"
    },
    "choices": [
      {
        "text": {
          "en": "Pull an all-nighter. Coffee is a food group.",
          "zh": "通宵赶工。咖啡也算一种食物类别。"
        },
        "effects": {
          "money": -20,
          "health": -6,
          "happiness": 2,
          "stress": 8,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Email the professor for an extension. Include three apologies.",
          "zh": "写邮件向教授申请延期。附上三次道歉。"
        },
        "effects": {
          "money": 0,
          "health": 2,
          "happiness": -3,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_club_fair",
    "category": "SOCIAL",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "The club fair has 200 booths. One promises free snacks; another promises 'life-changing networking'.",
      "zh": "社团招新有两百个摊位。有一个保证提供免费零食，另一个则保证“改变人生的人脉”。"
    },
    "choices": [
      {
        "text": {
          "en": "Join the snack club. Learn about competitive origami.",
          "zh": "加入零食社。顺便学会竞技折纸。"
        },
        "effects": {
          "money": -40,
          "health": 0,
          "happiness": 8,
          "stress": -2,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Join the networking club. Get a lanyard and a nervous handshake.",
          "zh": "加入人脉社。领到一条挂绳和一次紧张的握手。"
        },
        "effects": {
          "money": 500,
          "health": 0,
          "happiness": -1,
          "stress": 6,
          "fame": 2
        }
      }
    ]
  },
  {
    "id": "life_study_abroad",
    "category": "MONEY",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "A study-abroad program offers six months in a beautiful city. You speak the language at 'polite hello' level. The flights cost a small fortune.",
      "zh": "交换项目提供半年的美丽城市生活。你的当地语言只有“礼貌打招呼”的水平。机票贵得像一笔小财富。"
    },
    "choices": [
      {
        "text": {
          "en": "Go. Order food by pointing.",
          "zh": "出发。靠比划点餐。"
        },
        "effects": {
          "money": -9000,
          "health": 0,
          "happiness": 12,
          "stress": 6,
          "fame": 1
        }
      },
      {
        "text": {
          "en": "Stay home. Watch travel videos with subtitles.",
          "zh": "留在家。看带字幕的旅游视频。"
        },
        "effects": {
          "money": 0,
          "health": 1,
          "happiness": -3,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_food_budget",
    "category": "MONEY",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "Your food budget is $40 a week. Your stomach has filed a formal complaint.",
      "zh": "你每周的伙食预算是 40 美元。你的胃已经提出了正式申诉。"
    },
    "choices": [
      {
        "text": {
          "en": "Meal-prep rice and beans for seven days. Become a spreadsheet.",
          "zh": "一周七天都吃备餐的米饭和豆子。人生变成一张表格。"
        },
        "effects": {
          "money": 150,
          "health": 2,
          "happiness": -4,
          "stress": 3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Order takeout twice. Live a little.",
          "zh": "点两次外卖。偶尔也要活一下。"
        },
        "effects": {
          "money": -80,
          "health": -2,
          "happiness": 6,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_situationship",
    "category": "LOVE",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "You've been 'talking' to someone for three months. Nobody has said 'together'. Your friends run a group chat about it.",
      "zh": "你跟某人“聊”了三个月，没有人说过“在一起”这三个字。你的朋友们还为此建了个群。"
    },
    "choices": [
      {
        "text": {
          "en": "Ask directly. Brace for impact.",
          "zh": "直接问清楚。做好承受冲击的准备。"
        },
        "effects": {
          "money": -30,
          "health": 0,
          "happiness": 6,
          "stress": 8,
          "fame": 0,
          "setRelationship": {
            "en": "Dating (It's Official)",
            "zh": "交往中（正式官宣）"
          }
        }
      },
      {
        "text": {
          "en": "Keep it vague and let the group chat speculate.",
          "zh": "保持暧昧，让群里自行推测。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -2,
          "stress": 2,
          "fame": 1,
          "setRelationship": {
            "en": "It's Complicated",
            "zh": "关系复杂"
          }
        }
      }
    ]
  },
  {
    "id": "norm_fire_alarm_popcorn",
    "category": "SOCIAL",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "The dorm fire alarm goes off at 3 a.m. because someone burned popcorn. Again.",
      "zh": "宿舍消防警报在凌晨三点响起，原因又是有人烧焦了爆米花。"
    },
    "choices": [
      {
        "text": {
          "en": "Evacuate in pajamas and become a campus meme.",
          "zh": "穿着睡衣疏散，顺便成为校园表情包。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": 4,
          "fame": 3
        }
      },
      {
        "text": {
          "en": "Volunteer as dorm safety rep. Get a stipend and a whistle.",
          "zh": "自愿当宿舍安全员。领到津贴和一个哨子。"
        },
        "effects": {
          "money": 150,
          "health": 0,
          "happiness": 3,
          "stress": 5,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_library_night_shift",
    "category": "WORK",
    "minAge": 19,
    "maxAge": 21,
    "conditions": {},
    "text": {
      "en": "A campus job opens: night shift at the library desk. Duties include shushing people and guarding the good chairs.",
      "zh": "校园兼职缺人：图书馆夜班前台。工作内容是让人小声点，以及守护好座位。"
    },
    "choices": [
      {
        "text": {
          "en": "Take it. Become a legend of the quiet.",
          "zh": "接下。成为安静界的传奇。"
        },
        "effects": {
          "money": 2800,
          "health": -3,
          "happiness": 2,
          "stress": 4,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Decline. Sell your class notes online instead.",
          "zh": "婉拒。改把上课笔记放到网上卖。"
        },
        "effects": {
          "money": 900,
          "health": -1,
          "happiness": 3,
          "stress": -2,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_unpaid_intern",
    "category": "WORK",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "Your unpaid internship's main task: making coffee for twelve people, none of whom know your name.",
      "zh": "你的无薪实习主要工作：给十二个人泡咖啡，其中没有一个人知道你叫什么。"
    },
    "choices": [
      {
        "text": {
          "en": "Stay. Learn every coffee order and every secret.",
          "zh": "留下。记住每个人的咖啡口味和每一个秘密。"
        },
        "effects": {
          "money": -500,
          "health": 0,
          "happiness": -2,
          "stress": 6,
          "fame": 2,
          "setJob": {
            "en": "Intern (Unpaid, Very Caffeinated)",
            "zh": "实习生（无薪，咖啡因超标）"
          }
        }
      },
      {
        "text": {
          "en": "Quit and freelance designing logos for friends.",
          "zh": "辞职，改替朋友接单设计 logo。"
        },
        "effects": {
          "money": 300,
          "health": 0,
          "happiness": 4,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_credit_history",
    "category": "MONEY",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "You discover your credit score is 'not enough data'. The bank suggests you 'build history'.",
      "zh": "你发现自己的信用评分是“数据不足”。银行建议你“积累记录”。"
    },
    "choices": [
      {
        "text": {
          "en": "Open a starter card and pay it on time like a monk.",
          "zh": "办张入门信用卡，并像僧侣一样准时还款。"
        },
        "effects": {
          "money": 300,
          "health": 0,
          "happiness": -1,
          "stress": 4,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Ignore it. Cash is king (and lonely).",
          "zh": "不理它。现金为王（而且孤单）。"
        },
        "effects": {
          "money": -50,
          "health": 0,
          "happiness": 2,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_nap_thesis",
    "category": "WEIRD",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "Your thesis topic: 'The Sociology of Naps'. Your advisor sighs like a broken accordion.",
      "zh": "你的论文题目：《午睡社会学》。指导教授叹气的声音像一台坏掉的手风琴。"
    },
    "choices": [
      {
        "text": {
          "en": "Commit. Nap-based fieldwork begins.",
          "zh": "坚持到底。以午睡为主的田野调查正式开始。"
        },
        "effects": {
          "money": 0,
          "health": 3,
          "happiness": 8,
          "stress": 6,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Switch to a safe topic about supply chains.",
          "zh": "改成一个安全的供应链题目。"
        },
        "effects": {
          "money": 500,
          "health": 0,
          "happiness": -4,
          "stress": -4,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_curb_furniture",
    "category": "MONEY",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "You furnish your first apartment from the curb: a couch with a mysterious stain and a lamp with an attitude.",
      "zh": "你的第一间公寓全靠路边捡来的家具布置：一张有神秘污渍的沙发，和一盏很有个性的台灯。"
    },
    "choices": [
      {
        "text": {
          "en": "Take everything. Cover the stain with a blanket 'for style'.",
          "zh": "全部搬回家。用毯子盖住污渍，美其名曰“风格”。"
        },
        "effects": {
          "money": -20,
          "health": -3,
          "happiness": 5,
          "stress": 2,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Buy flat-pack furniture and lose two weekends to a diagram.",
          "zh": "买组装家具，两个周末都输给了一张说明图。"
        },
        "effects": {
          "money": -450,
          "health": 1,
          "happiness": 3,
          "stress": 3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_hackathon_weekend",
    "category": "WORK",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "A weekend hackathon offers $500 for the best idea. Yours: an app that reminds you to drink water by insulting you.",
      "zh": "周末黑客松为最佳点子提供 500 美元奖金。你的点子：一个用羞辱来提醒你喝水的 app。"
    },
    "choices": [
      {
        "text": {
          "en": "Pitch it. Bring a mascot.",
          "zh": "上台路演。还带了一个吉祥物。"
        },
        "effects": {
          "money": 300,
          "health": -3,
          "happiness": 6,
          "stress": 6,
          "fame": 3
        }
      },
      {
        "text": {
          "en": "Skip it and sleep for fourteen hours.",
          "zh": "跳过，睡上十四个小时。"
        },
        "effects": {
          "money": 0,
          "health": 4,
          "happiness": -2,
          "stress": -6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_holiday_table_plan",
    "category": "SOCIAL",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "At the holiday table, a relative asks, 'So what's your plan?' Your plan is 'lunch'.",
      "zh": "过年饭桌上，亲戚问：“所以你接下来什么打算？”你的打算是“午饭”。"
    },
    "choices": [
      {
        "text": {
          "en": "Say 'entrepreneur' and change the subject to pie.",
          "zh": "回答“创业者”，然后把话题转到派上。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 2,
          "stress": 5,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Be honest: 'lunch, then figure it out.' Receive an hour of advice and some cash.",
          "zh": "老实说：“先吃午饭，再慢慢想。”换来一小时的建议和一些零花钱。"
        },
        "effects": {
          "money": 200,
          "health": -1,
          "happiness": 4,
          "stress": 2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_plant_custody",
    "category": "LOVE",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "You break up with someone you share a lease with. The houseplant is in both names.",
      "zh": "你和同居的伴侣分手了。那盆绿植上写着你们两个人的名字。"
    },
    "choices": [
      {
        "text": {
          "en": "Share custody of the plant. Send weekly growth updates.",
          "zh": "共同监护那盆植物。每周发送生长报告。"
        },
        "effects": {
          "money": -100,
          "health": 0,
          "happiness": 3,
          "stress": 6,
          "fame": 0,
          "setRelationship": {
            "en": "Single (Co-Parenting a Plant)",
            "zh": "单身（与前任共同养植物）"
          }
        }
      },
      {
        "text": {
          "en": "Give them the plant. Keep the good pan.",
          "zh": "把植物给对方，自己留下好用的平底锅。"
        },
        "effects": {
          "money": 40,
          "health": 0,
          "happiness": -2,
          "stress": -3,
          "fame": 0,
          "setRelationship": {
            "en": "Single (Owner of the Good Pan)",
            "zh": "单身（好锅拥有者）"
          }
        }
      }
    ]
  },
  {
    "id": "norm_loan_letter",
    "category": "MONEY",
    "minAge": 20,
    "maxAge": 22,
    "conditions": {},
    "text": {
      "en": "A student loan letter arrives with 'Congratulations!' in the header. It is not congratulations.",
      "zh": "助学贷款通知信寄到，标题写着“恭喜！”这并不是恭喜。"
    },
    "choices": [
      {
        "text": {
          "en": "Set up a payment plan and a spreadsheet named 'Doom'.",
          "zh": "设定还款计划，并建一份叫“末日”的表格。"
        },
        "effects": {
          "money": -1200,
          "health": 0,
          "happiness": -3,
          "stress": -2,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Deliver groceries on the side to pay it off faster.",
          "zh": "兼职送生鲜外卖，想更快还清。"
        },
        "effects": {
          "money": 1500,
          "health": -3,
          "happiness": -2,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  }
];
