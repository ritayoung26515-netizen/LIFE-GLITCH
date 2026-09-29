import { GameEvent } from "../types/game";

export const eventsPart1: GameEvent[] = [
  {
    "id": "norm_first_job",
    "category": "WORK",
    "minAge": 18,
    "maxAge": 24,
    "conditions": {},
    "text": {
      "en": "Two job offers: a soul-crushing bank with a pension plan, or a 'family-like' startup paying in equity and free pizza.",
      "zh": "两个 offer：一个五险一金齐全、但会压碎灵魂的银行；一个张口闭口“我们是一家人”、工资是期权加免费披萨的创业公司。"
    },
    "choices": [
      {
        "text": {
          "en": "Take the bank. A pension plan is a love language.",
          "zh": "去银行。养老金，就是成年人的情话。"
        },
        "effects": {
          "money": 15000,
          "health": -3,
          "happiness": -8,
          "stress": 12,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Join the startup. Equity will surely be worth something.",
          "zh": "进创业公司。期权“一定”会值钱——老板亲口画的饼，能不香吗。"
        },
        "effects": {
          "money": 3000,
          "health": -5,
          "happiness": 10,
          "stress": 8,
          "fame": 2,
          "addFlags": [
            "startup_alumni"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_roommate",
    "category": "SOCIAL",
    "minAge": 18,
    "maxAge": 30,
    "conditions": {},
    "text": {
      "en": "A cheap room comes with a roommate who names his sourdough starters and holds funerals for them. The alternative: a $2,400 studio the size of a coffin.",
      "zh": "便宜单间附赠一位室友：他给每一坨酸面种都起了名字，死了还要办追悼会。另一个选择：月租 2,400 美元、小得像棺材的单间。"
    },
    "choices": [
      {
        "text": {
          "en": "Move in. Bring black clothes.",
          "zh": "搬进去。记得备一身黑衣服，随时参加追悼会。"
        },
        "effects": {
          "money": 6000,
          "health": 0,
          "happiness": 6,
          "stress": 8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Take the coffin studio. Privacy has a price.",
          "zh": "住“棺材房”。隐私是要花钱买的。"
        },
        "effects": {
          "money": -9000,
          "health": 3,
          "happiness": -4,
          "stress": -10,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_car_loan",
    "category": "MONEY",
    "minAge": 22,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "A brand-new car at 19.9% APR, or a used one that smells like a decision someone regretted.",
      "zh": "全新车，年利率 19.9%；或者一辆散发着“上任车主后悔气息”的二手车。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign for the new car. The smell of debt is 'new car smell'.",
          "zh": "签新车。负债的味道，业内称“新车味”。"
        },
        "effects": {
          "money": -14000,
          "health": 0,
          "happiness": 10,
          "stress": 10,
          "fame": 3,
          "addFlags": [
            "car_debt"
          ]
        }
      },
      {
        "text": {
          "en": "Buy the used one and drive with the windows down. Forever.",
          "zh": "买二手车，然后永远开着车窗。"
        },
        "effects": {
          "money": -4000,
          "health": -4,
          "happiness": -3,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "lemon_car"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_move_in",
    "category": "LOVE",
    "minAge": 20,
    "maxAge": 35,
    "conditions": {},
    "text": {
      "en": "Three months in, your partner says 'let's move in together.' Your freedom whispers 'run.' Your rent whispers 'say yes.'",
      "zh": "才谈了三个月，对方就说“我们同居吧”。你的自由在低语：“快跑。”你的房租在低语：“答应对方。”"
    },
    "choices": [
      {
        "text": {
          "en": "Say yes. Split the rent, share the dishes, lose the remote.",
          "zh": "答应。房租AA、碗筷共用，遥控器主权当场沦陷。"
        },
        "effects": {
          "money": 3000,
          "health": 0,
          "happiness": 8,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "cohabiting"
          ]
        }
      },
      {
        "text": {
          "en": "Say 'let's take it slow.' Say it with a very fake smile.",
          "zh": "说“我们慢慢来”。并附赠一个假得不能再假的微笑。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": -5,
          "stress": -5,
          "fame": 0,
          "addFlags": [
            "commitment_issues"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_weekend_overtime",
    "category": "WORK",
    "minAge": 22,
    "maxAge": 45,
    "conditions": {
      "minStress": 30
    },
    "text": {
      "en": "Your boss asks you to work this weekend, promising 'great exposure' and a stale bagel.",
      "zh": "老板要你周末加班，饼画得很大：“绝佳的曝光机会”；实物只有一个放硬了的贝果。"
    },
    "choices": [
      {
        "text": {
          "en": "Work the weekend. Eat the bagel. Feel nothing.",
          "zh": "加班。啃贝果，咽大饼。内心毫无波澜。"
        },
        "effects": {
          "money": 2000,
          "health": -8,
          "happiness": -8,
          "stress": 15,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Politely refuse and enjoy your weekend. The boss will remember this.",
          "zh": "礼貌拒绝，享受周末。老板会记住的。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 5,
          "stress": -8,
          "fame": 0,
          "addFlags": [
            "boss_grudge"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_gym",
    "category": "HEALTH",
    "minAge": 20,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "A $1,200 annual gym membership: the price of visiting twice and feeling guilty daily. Or 'working out at home' (the couch counts).",
      "zh": "一年 1200 美元的健身房会员：花钱买的是去两次，然后天天愧疚。或者选择“居家锻炼”（沙发也算）。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy the membership. Future You will totally show up.",
          "zh": "办卡。未来的你“绝对”会来——反正付钱的是现在的你。"
        },
        "effects": {
          "money": -1200,
          "health": 8,
          "happiness": -2,
          "stress": 3,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Home workout: lie down and watch someone else sweat.",
          "zh": "居家锻炼：躺着看别人出汗。"
        },
        "effects": {
          "money": 0,
          "health": -6,
          "happiness": 6,
          "stress": 0,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_dating_app",
    "category": "LOVE",
    "minAge": 20,
    "maxAge": 38,
    "conditions": {},
    "text": {
      "en": "Your date's photos are 8 years out of date, and taken in a very different lighting universe. Awkward dinner, or fake a 'family emergency' and vanish?",
      "zh": "约会对象的照片是 8 年前的，还是在另一个光影宇宙里拍的。硬着头皮吃完这顿饭，还是假装“家里有急事”然后消失？"
    },
    "choices": [
      {
        "text": {
          "en": "Stay for dinner. Maybe the personality is unedited too.",
          "zh": "留下吃饭。说不定人品没经过修图。"
        },
        "effects": {
          "money": -80,
          "health": 0,
          "happiness": 8,
          "stress": 5,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Fake a family emergency. Mom is 'suddenly sick'.",
          "zh": "假装家里有急事。老妈“突然”就病了。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -3,
          "stress": -5,
          "fame": 0,
          "addFlags": [
            "ghost_karma"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_rent_hike",
    "category": "MONEY",
    "minAge": 23,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your landlord raises rent 30% and calls it 'market alignment.' Pay up, or move out and lose three weekends to boxes.",
      "zh": "房东把房租涨了三成，还管这叫“市场化调整”。乖乖交钱，还是搬家——搭进去三个周末给纸箱？"
    },
    "choices": [
      {
        "text": {
          "en": "Pay it. You've bonded with the mold.",
          "zh": "交钱。墙角的霉斑跟你已经处出感情了。"
        },
        "effects": {
          "money": -7200,
          "health": -2,
          "happiness": -5,
          "stress": 8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Move out. Fresh start, fresh problems.",
          "zh": "搬家。新的开始，新的坑。"
        },
        "effects": {
          "money": -3000,
          "health": -4,
          "happiness": 4,
          "stress": 12,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_mlm_coffee",
    "category": "MONEY",
    "minAge": 22,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "A college friend you haven't heard from in six years invites you to coffee to discuss 'a business ecosystem.'",
      "zh": "六年没联系的大学同学突然约你喝咖啡，说要跟你聊聊“一个商业生态”。"
    },
    "choices": [
      {
        "text": {
          "en": "Join the ecosystem. You're now 'Diamond Tier' (of nothing).",
          "zh": "加入生态。你现在是“钻石级”会员——韭菜里的钻石级。"
        },
        "effects": {
          "money": -5000,
          "health": 0,
          "happiness": 3,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "mlm_boxes"
          ]
        }
      },
      {
        "text": {
          "en": "Decline. Lose a friend, keep your wallet.",
          "zh": "拒绝。失去一个朋友，保住一个钱包。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -4,
          "stress": -2,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_destination_wedding",
    "category": "SOCIAL",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your friend's destination wedding will cost you $3,000. Skipping it will cost you a friendship.",
      "zh": "朋友的海外婚礼要花你 3000 美元。不去的话，友情要付出更大的代价。"
    },
    "choices": [
      {
        "text": {
          "en": "Go. Wear a suit in tropical heat and cry at the vows.",
          "zh": "去。大热天穿西装，听到誓词还哭得稀里哗啦。"
        },
        "effects": {
          "money": -3000,
          "health": -3,
          "happiness": 8,
          "stress": 5,
          "fame": 2
        }
      },
      {
        "text": {
          "en": "Skip and send a gift card with a 'heartfelt' note.",
          "zh": "不去，寄张购物卡，附上一张“饱含心意”的小卡片。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -5,
          "stress": 3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_reply_all",
    "category": "SOCIAL",
    "minAge": 22,
    "maxAge": 55,
    "conditions": {},
    "text": {
      "en": "You accidentally reply-all to the entire company with your honest review of the boss's haircut.",
      "zh": "你手滑点了“回复全部”，把对老板发型的真心点评发给了全公司。"
    },
    "choices": [
      {
        "text": {
          "en": "Claim your account was hacked. Hackers have great taste.",
          "zh": "声称账号被盗。这黑客眼光还挺毒。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -3,
          "stress": 10,
          "fame": 3,
          "addFlags": [
            "hacked_lie"
          ]
        }
      },
      {
        "text": {
          "en": "Double down: send a follow-up rating his tie.",
          "zh": "加码：再发一封，点评他的领带。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": 8,
          "stress": 10,
          "fame": 10,
          "addFlags": [
            "office_legend"
          ]
        }
      }
    ]
  },
  {
    "id": "fun_pigeon",
    "category": "WEIRD",
    "minAge": 18,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "A pigeon follows you home and refuses to leave. It stares. It seems to know something.",
      "zh": "一只鸽子一路跟你回家，怎么撵都不走。它一直盯着你，仿佛知道些什么。"
    },
    "choices": [
      {
        "text": {
          "en": "Adopt it. Name it 'Gerald'.",
          "zh": "收养它。取名“杰拉德”。"
        },
        "effects": {
          "money": -300,
          "health": -2,
          "happiness": 8,
          "stress": -5,
          "fame": 0,
          "addFlags": [
            "pigeon_friend"
          ]
        }
      },
      {
        "text": {
          "en": "Shoo it away. Ignore the look of betrayal.",
          "zh": "把它撵走。无视那个满是背叛的眼神。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -3,
          "stress": 3,
          "fame": 0,
          "addFlags": [
            "pigeon_revenge"
          ]
        }
      }
    ]
  },
  {
    "id": "fun_wrong_wedding",
    "category": "SOCIAL",
    "minAge": 20,
    "maxAge": 50,
    "conditions": {},
    "text": {
      "en": "You walk into the wrong wedding and it's too late to leave. The open bar asks no questions.",
      "zh": "你走错场，混进了别人的婚礼，现在想走已经太尴尬。酒水畅饮，而且没人问你是谁。"
    },
    "choices": [
      {
        "text": {
          "en": "Introduce yourself as the groom's 'long-lost cousin' and give a speech.",
          "zh": "自称新郎“失散多年的表哥”，还上台致辞。"
        },
        "effects": {
          "money": 0,
          "health": -8,
          "happiness": 10,
          "stress": 12,
          "fame": 5,
          "addFlags": [
            "wedding_crasher"
          ]
        }
      },
      {
        "text": {
          "en": "Slip out quietly. Your stomach will hold a grudge.",
          "zh": "悄悄溜走。你的胃会记你一辈子仇。"
        },
        "effects": {
          "money": 0,
          "health": 2,
          "happiness": -3,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_cat_filter",
    "category": "WORK",
    "minAge": 22,
    "maxAge": 55,
    "conditions": {},
    "text": {
      "en": "You're stuck on a cat filter during a million-dollar investor call, and you can't turn it off.",
      "zh": "你在价值百万美元的融资路演视频会议上被猫咪滤镜卡住，怎么都关不掉。"
    },
    "choices": [
      {
        "text": {
          "en": "Pitch with a straight face. You are a cat now.",
          "zh": "面不改色继续讲。你现在是一只猫。"
        },
        "effects": {
          "money": 5000,
          "health": 0,
          "happiness": 5,
          "stress": 15,
          "fame": 8
        }
      },
      {
        "text": {
          "en": "Apologize profusely and reschedule.",
          "zh": "连连道歉，改天再约。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": -6,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "life_startup_gamble",
    "category": "MONEY",
    "minAge": 25,
    "maxAge": 40,
    "conditions": {
      "minMoney": 20000
    },
    "text": {
      "en": "You have a 'can't-fail' idea: an app that tells you which fridge leftovers are legally food. Quit your job and bet your savings?",
      "zh": "你有个“绝不可能失败”的点子：做个 app，判断冰箱里的剩菜“法律上算不算食物”。要辞职把全部积蓄押上去吗？"
    },
    "choices": [
      {
        "text": {
          "en": "All in. Sleep is for people with backup plans.",
          "zh": "梭哈。睡眠是留给有退路的人的。"
        },
        "effects": {
          "money": -25000,
          "health": -8,
          "happiness": 10,
          "stress": 25,
          "fame": 6,
          "addFlags": [
            "founder"
          ]
        }
      },
      {
        "text": {
          "en": "Keep the job. Wonder about it for the next 40 years.",
          "zh": "继续上班。接下来四十年反复回想那个点子。"
        },
        "effects": {
          "money": 8000,
          "health": 0,
          "happiness": -10,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "what_if_app"
          ]
        }
      }
    ]
  },
  {
    "id": "life_creepy_inheritance",
    "category": "MONEY",
    "minAge": 25,
    "maxAge": 60,
    "conditions": {},
    "text": {
      "en": "A lawyer says a distant uncle left you $500,000, on one condition: live in his mansion for the rest of your life, 'with the others.'",
      "zh": "律师说一位远房叔叔留给你 50 万美元，条件只有一个：终身住在他的豪宅里，“和其他人”一起。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign. Who are 'the others'? Ask again in the morning.",
          "zh": "签。“其他人”是谁？明早再问。"
        },
        "effects": {
          "money": 500000,
          "health": -8,
          "happiness": -15,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "mansion_curse"
          ]
        }
      },
      {
        "text": {
          "en": "Decline. Peace of mind is worth more, right?",
          "zh": "婉拒。心安比钱值钱，对吧？对吧？"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 3,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "life_whistleblower",
    "category": "WORK",
    "minAge": 28,
    "maxAge": 50,
    "conditions": {},
    "text": {
      "en": "You discover your company has been 'creatively' doing its accounting. HR offers you a promotion. Federal agents offer you a business card.",
      "zh": "你发现公司账做得“相当有创意”。HR 给你一个升职机会，联邦探员给你一张名片。"
    },
    "choices": [
      {
        "text": {
          "en": "Blow the whistle. Sleep well, eat instant noodles.",
          "zh": "举报。睡得踏实，吃得泡面。"
        },
        "effects": {
          "money": -20000,
          "health": 0,
          "happiness": 10,
          "stress": 20,
          "fame": 20,
          "addFlags": [
            "whistleblower"
          ]
        }
      },
      {
        "text": {
          "en": "Take the promotion and the 'consulting bonus'. Delete your conscience.",
          "zh": "接下升职和“咨询奖金”。顺便把良心格式化。"
        },
        "effects": {
          "money": 40000,
          "health": 0,
          "happiness": -15,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "hush_money"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_box_1",
    "category": "CHAIN",
    "minAge": 20,
    "maxAge": 35,
    "conditions": {},
    "text": {
      "en": "In the trash chute you find a sealed box labeled 'DO NOT OPEN. (Yes, you.)' It is warm.",
      "zh": "你在垃圾房发现一个封死的箱子，上面写着“禁止开启。（对，说的就是你。）”箱子还是温的。"
    },
    "choices": [
      {
        "text": {
          "en": "Open it. Inside: old cash and a key marked 'Locker 404'.",
          "zh": "打开。里面有一沓旧钞票，和一把标着“404 号储物柜”的钥匙。"
        },
        "effects": {
          "money": 1000,
          "health": 0,
          "happiness": 3,
          "stress": 8,
          "fame": 0,
          "addFlags": [
            "box_found",
            "box_opened"
          ]
        }
      },
      {
        "text": {
          "en": "Sell it unopened online. Mystery boxes are hot right now.",
          "zh": "不拆，直接挂二手平台卖。盲盒最近正火。"
        },
        "effects": {
          "money": 200,
          "health": 0,
          "happiness": 1,
          "stress": 3,
          "fame": 0,
          "addFlags": [
            "box_found",
            "box_sold"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_box_2",
    "category": "CHAIN",
    "minAge": 21,
    "maxAge": 45,
    "conditions": {
      "flags": [
        "box_found"
      ]
    },
    "text": {
      "en": "A man in a trench coat waits outside your door: 'You have something of mine. Or you did. Either way, we should talk.'",
      "zh": "一个穿风衣的男人站在你家门口：“你手上有我的东西。或者说，曾经有。总之，我们得聊聊。”"
    },
    "choices": [
      {
        "text": {
          "en": "Cooperate. He pays $3,000 for your 'short memory'.",
          "zh": "配合他。他花 3000 美元，买你的“选择性失忆”。"
        },
        "effects": {
          "money": 3000,
          "health": 0,
          "happiness": -2,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "box_trouble"
          ],
          "removeFlags": [
            "box_found"
          ]
        }
      },
      {
        "text": {
          "en": "Demand more. He pays $10,000 and stares at you a bit too long.",
          "zh": "狮子大开口。他给了一万美元，还盯了你好久。"
        },
        "effects": {
          "money": 10000,
          "health": -5,
          "happiness": 2,
          "stress": 20,
          "fame": 0,
          "addFlags": [
            "box_trouble"
          ],
          "removeFlags": [
            "box_found"
          ]
        }
      }
    ]
  },
  {
    "id": "chain_box_3",
    "category": "CHAIN",
    "minAge": 25,
    "maxAge": 60,
    "conditions": {
      "flags": [
        "box_trouble"
      ]
    },
    "text": {
      "en": "Years later, the trench-coat man is on TV: 'Global tax-fraud mastermind arrested.' Detectives found your fingerprints on his box.",
      "zh": "多年后，风衣男上了新闻：“跨国逃税主谋落网”。警方在他的箱子上发现了你的指纹。"
    },
    "choices": [
      {
        "text": {
          "en": "Testify as a witness. Instant fame, instant anxiety.",
          "zh": "出庭作证。一夜成名，一夜焦虑。"
        },
        "effects": {
          "money": 15000,
          "health": 0,
          "happiness": 5,
          "stress": 18,
          "fame": 15,
          "addFlags": [
            "witness_celebrity"
          ],
          "removeFlags": [
            "box_trouble"
          ]
        }
      },
      {
        "text": {
          "en": "Lawyer up and claim total amnesia. Become a meme.",
          "zh": "请律师，声称彻底失忆。顺便成了表情包。"
        },
        "effects": {
          "money": -12000,
          "health": -3,
          "happiness": -5,
          "stress": 10,
          "fame": 5,
          "addFlags": [
            "silent_partner"
          ],
          "removeFlags": [
            "box_trouble"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_promotion_backstab",
    "category": "WORK",
    "minAge": 27,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "You and your work-buddy are up for the same promotion. He once confided that he expenses his lunches as 'client entertainment'.",
      "zh": "你和最铁的同事竞争同一个晋升名额。他曾偷偷告诉你：他把午饭全报成了“客户招待”。"
    },
    "choices": [
      {
        "text": {
          "en": "Leak it to HR. Friendship is a junior-level skill.",
          "zh": "向 HR 告密。友情只是新手村技能。"
        },
        "effects": {
          "money": 12000,
          "health": 0,
          "happiness": -8,
          "stress": 15,
          "fame": 0,
          "addFlags": [
            "backstabber"
          ],
          "setJob": {
            "en": "Senior Manager",
            "zh": "高级经理"
          }
        }
      },
      {
        "text": {
          "en": "Play fair and lose gracefully. He gets the job and a bigger lunch budget.",
          "zh": "光明正大，输得体面。他升职了，午饭预算也跟着升级。"
        },
        "effects": {
          "money": 2000,
          "health": 0,
          "happiness": 5,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_mortgage_slave",
    "category": "MONEY",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "A 'cozy micro-studio' comes with a 30-year mortgage. The agent calls it an investment. Your future self calls it a cell.",
      "zh": "一套“温馨迷你小户型”，附赠三十年房贷。中介说这叫“上车”，未来的你说这叫牢房。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign. Welcome to the Bank Slave Club.",
          "zh": "签约。欢迎加入房奴俱乐部，终身会员。"
        },
        "effects": {
          "money": -40000,
          "health": -3,
          "happiness": 8,
          "stress": 20,
          "fame": 0,
          "addFlags": [
            "mortgage_slave"
          ]
        }
      },
      {
        "text": {
          "en": "Keep renting and stay 'flexible' (homeless, with extra steps).",
          "zh": "继续租房，保持“灵活”（其实就是替房东还房贷的流浪）。"
        },
        "effects": {
          "money": -10000,
          "health": 0,
          "happiness": -5,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_marriage_pressure",
    "category": "SOCIAL",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "At the holiday dinner, your aunt asks 'So, when's the wedding?' for the seventh year in a row.",
      "zh": "过年饭桌上，姑妈连续第七年问你：“所以到底什么时候喝喜酒？”"
    },
    "choices": [
      {
        "text": {
          "en": "Invent a fiancé: 'a surgeon working in Antarctica'.",
          "zh": "编一个未婚伴侣：“在南极工作的外科医生”。信号不好，没法视频。"
        },
        "effects": {
          "money": -500,
          "health": 0,
          "happiness": 3,
          "stress": 4,
          "fame": 0,
          "addFlags": [
            "fake_fiance"
          ]
        }
      },
      {
        "text": {
          "en": "Give a heartfelt speech about being happily single.",
          "zh": "发表一番“单身也很幸福”的感人演讲。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 6,
          "stress": 10,
          "fame": 1
        }
      }
    ]
  },
  {
    "id": "norm_blind_date",
    "category": "LOVE",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your blind date arrives with a color-coded spreadsheet titled 'Compatibility Matrix' and a mutual NDA.",
      "zh": "相亲对象带来一份题为《匹配度矩阵》的彩色表格，外加一份双向保密协议。"
    },
    "choices": [
      {
        "text": {
          "en": "Play along. Ask about their five-year plan.",
          "zh": "配合演出。问问对方的五年规划。"
        },
        "effects": {
          "money": -300,
          "health": 0,
          "happiness": 5,
          "stress": 10,
          "fame": 0,
          "setRelationship": {
            "en": "Dating (Spreadsheet-Approved)",
            "zh": "交往中（表格认证）"
          }
        }
      },
      {
        "text": {
          "en": "Escape through the restaurant's bathroom window.",
          "zh": "从餐厅厕所的窗户翻出去。"
        },
        "effects": {
          "money": 0,
          "health": -3,
          "happiness": 3,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_midlife_belly",
    "category": "HEALTH",
    "minAge": 30,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your doctor says your waistline is 'a cry for help'. Your pants agree.",
      "zh": "医生说你的腰围是“求救信号”，你的裤子表示同意。"
    },
    "choices": [
      {
        "text": {
          "en": "Start running at 5 a.m. Hate every second.",
          "zh": "凌晨五点起来跑步，每一秒都在恨。"
        },
        "effects": {
          "money": -400,
          "health": 10,
          "happiness": -4,
          "stress": 8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Double down on donuts. Life is short anyway.",
          "zh": "继续狂炫甜甜圈。反正人生苦短。"
        },
        "effects": {
          "money": -300,
          "health": -10,
          "happiness": 8,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_job_hop_betrayal",
    "category": "WORK",
    "minAge": 27,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "A rival company offers +40% salary, on the condition that you 'bring some insights' from your current employer.",
      "zh": "竞争对手开出涨薪 40% 的条件，前提是你得“带点干货”过来——来自你现在的公司。"
    },
    "choices": [
      {
        "text": {
          "en": "Jump ship and bring the 'insights'.",
          "zh": "跳槽，并且把那些“干货”一起带上。"
        },
        "effects": {
          "money": 14000,
          "health": 0,
          "happiness": 2,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "jumped_ship"
          ],
          "setJob": {
            "en": "Strategy Lead (Rival Co.)",
            "zh": "竞对公司战略主管"
          }
        }
      },
      {
        "text": {
          "en": "Stay loyal. Your boss thanks you with a fruit basket.",
          "zh": "留下尽忠。老板回报你一篮水果。"
        },
        "effects": {
          "money": 500,
          "health": 0,
          "happiness": 3,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_contract_trap",
    "category": "WORK",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your new contract includes a clause: 'Employee shall remain reachable in dreams.' HR says it's standard.",
      "zh": "新合同里有一条：“员工须在梦中保持可联系。”HR 说这是标准条款。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign it. The salary is very awake.",
          "zh": "签。反正工资很清醒。"
        },
        "effects": {
          "money": 8000,
          "health": -6,
          "happiness": -3,
          "stress": 18,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "Refuse. Job hunting is a nightmare, but at least it's not contractual.",
          "zh": "拒签。找工作虽是噩梦，但至少没写进合同。"
        },
        "effects": {
          "money": -3000,
          "health": 0,
          "happiness": 3,
          "stress": -5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_cosign_loan",
    "category": "MONEY",
    "minAge": 27,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your brother asks you to co-sign a loan for a 'can't-lose' artisanal pickle franchise.",
      "zh": "你弟让你给他做贷款担保，去开一家“稳赚不赔”的手工酸黄瓜连锁店。"
    },
    "choices": [
      {
        "text": {
          "en": "Co-sign. Blood is thicker than credit scores.",
          "zh": "签。血浓于水，也浓于征信。"
        },
        "effects": {
          "money": -12000,
          "health": 0,
          "happiness": 4,
          "stress": 12,
          "fame": 0,
          "addFlags": [
            "cosigned_loan"
          ]
        }
      },
      {
        "text": {
          "en": "Refuse. Enjoy the family dinner in awkward silence.",
          "zh": "拒绝。准备迎接尴尬到窒息的家庭聚餐。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -8,
          "stress": 5,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_baby_debate",
    "category": "LOVE",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your partner wants a baby. Your bank account wants a nap.",
      "zh": "你的另一半想要孩子。你的银行卡只想躺平。"
    },
    "choices": [
      {
        "text": {
          "en": "Yes. Get ready to trade sleep for diapers.",
          "zh": "好。准备用睡眠换尿不湿。"
        },
        "effects": {
          "money": -20000,
          "health": -6,
          "happiness": 12,
          "stress": 20,
          "fame": 0,
          "setRelationship": {
            "en": "Parent Couple",
            "zh": "育儿夫妻"
          }
        }
      },
      {
        "text": {
          "en": "Compromise: get a puppy as a trial run.",
          "zh": "折中方案：先养只小狗当预演。"
        },
        "effects": {
          "money": -1500,
          "health": 2,
          "happiness": 5,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_lunch_gossip",
    "category": "SOCIAL",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "A coworker confides he's job hunting. An hour later, your boss asks: 'Is anyone thinking of leaving?'",
      "zh": "同事偷偷告诉你他在找工作。一小时后，老板问你：“有没有人想走？”"
    },
    "choices": [
      {
        "text": {
          "en": "Snitch. Loyalty to the company, apparently.",
          "zh": "告密。对公司，你可真“忠诚”。"
        },
        "effects": {
          "money": 3000,
          "health": 0,
          "happiness": -6,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "snitch"
          ]
        }
      },
      {
        "text": {
          "en": "Lie straight to the boss's face.",
          "zh": "当面对老板睁眼说瞎话。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": 4,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "trusted_friend"
          ]
        }
      }
    ]
  },
  {
    "id": "norm_crypto_friend",
    "category": "MONEY",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your friend swears the coin 'MoonPotato' will 100x by Christmas. He has already bought a boat.",
      "zh": "朋友拍胸脯保证“月球土豆币”圣诞前能翻一百倍。游艇他都提前买好了——奇怪，他看你的眼神像在看一茬韭菜。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy $10,000 worth. Call it 'diversification'.",
          "zh": "买一万美元。这叫“价值投资”，主要是投给别人的价值。"
        },
        "effects": {
          "money": -10000,
          "health": 0,
          "happiness": 6,
          "stress": 12,
          "fame": 0,
          "addFlags": [
            "bag_holder"
          ]
        }
      },
      {
        "text": {
          "en": "Skip it and suffer fear of missing out.",
          "zh": "不买，然后被踏空的焦虑折磨。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -6,
          "stress": 6,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_burnout_leave",
    "category": "HEALTH",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {
      "minStress": 60
    },
    "text": {
      "en": "The doctor prescribes two weeks of rest. Your inbox holds 843 unread emails titled 'URGENT'.",
      "zh": "医生开了两周休养的医嘱。你的邮箱里躺着 843 封标题写着“加急”的未读邮件。"
    },
    "choices": [
      {
        "text": {
          "en": "Take the leave. The world will survive (probably).",
          "zh": "请假。地球离了你照样转（大概）。"
        },
        "effects": {
          "money": -3000,
          "health": 10,
          "happiness": 8,
          "stress": -25,
          "fame": 0,
          "addFlags": [
            "boss_grudge"
          ]
        }
      },
      {
        "text": {
          "en": "Push through on energy drinks and pure spite.",
          "zh": "靠能量饮料和一口怨气硬撑。"
        },
        "effects": {
          "money": 5000,
          "health": -12,
          "happiness": -6,
          "stress": 15,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_neighbor_noise",
    "category": "SOCIAL",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your neighbor practices drums at 2 a.m. He calls it 'expressive therapy'.",
      "zh": "邻居凌晨两点练架子鼓，他说这是“表达性治疗”。"
    },
    "choices": [
      {
        "text": {
          "en": "Retaliate with karaoke at 3 a.m.",
          "zh": "凌晨三点开唱 K 歌反击。"
        },
        "effects": {
          "money": -200,
          "health": -3,
          "happiness": 8,
          "stress": 5,
          "fame": 0,
          "addFlags": [
            "neighbor_war"
          ]
        }
      },
      {
        "text": {
          "en": "Buy earplugs and slowly lose your mind.",
          "zh": "买耳塞，然后慢慢崩溃。"
        },
        "effects": {
          "money": -80,
          "health": -3,
          "happiness": -5,
          "stress": 10,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_old_band",
    "category": "SOCIAL",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "Your old band reunites for one weekend gig. You have a mortgage and a knee that clicks.",
      "zh": "你的老乐队要重组，办一场周末演出。你有房贷，还有一个一动就嘎吱响的膝盖。"
    },
    "choices": [
      {
        "text": {
          "en": "Rock on. Your knee files a formal complaint.",
          "zh": "上台摇滚。你的膝盖提交了正式投诉。"
        },
        "effects": {
          "money": -500,
          "health": -5,
          "happiness": 12,
          "stress": -3,
          "fame": 4
        }
      },
      {
        "text": {
          "en": "Pawn the guitar and pay the bills like an adult.",
          "zh": "把吉他当了，像个成年人一样去还账单。"
        },
        "effects": {
          "money": 800,
          "health": 0,
          "happiness": -8,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "norm_tax_audit",
    "category": "MONEY",
    "minAge": 30,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "The tax office sends you an 'invitation to clarify' your last five years. Nobody is smiling.",
      "zh": "税务局寄来一封“邀请您说明过去五年情况”的函。没有一个人在笑。"
    },
    "choices": [
      {
        "text": {
          "en": "Hire an expensive accountant. Buy peace of mind.",
          "zh": "请个贵价会计师。花钱买心安。"
        },
        "effects": {
          "money": -4000,
          "health": 0,
          "happiness": 0,
          "stress": -8,
          "fame": 0
        }
      },
      {
        "text": {
          "en": "DIY with an online tutorial. You're 'good with spreadsheets'.",
          "zh": "跟着网上教程自己搞。毕竟你“很会用表格”。"
        },
        "effects": {
          "money": -1000,
          "health": -3,
          "happiness": 3,
          "stress": 15,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "flag_hush_money_exposed",
    "category": "MONEY",
    "minAge": 30,
    "maxAge": 55,
    "conditions": {
      "flags": [
        "hush_money"
      ]
    },
    "text": {
      "en": "A journalist and an anti-corruption officer knock on your door together. They have a photo of you counting $40,000 in cash.",
      "zh": "一名记者和一位反腐调查员同时敲你家门，手里有你数着四万美元现金的照片。"
    },
    "choices": [
      {
        "text": {
          "en": "Turn state's witness. Return the money, keep your dignity.",
          "zh": "当污点证人。退还赃款，保住体面。"
        },
        "effects": {
          "money": -40000,
          "health": -3,
          "happiness": 5,
          "stress": 15,
          "fame": 10,
          "addFlags": [
            "former_informant"
          ],
          "removeFlags": [
            "hush_money"
          ]
        }
      },
      {
        "text": {
          "en": "Lawyer up and insist: 'I found it in a coat.'",
          "zh": "请律师，并死鸭子嘴硬：“那是我在外套里捡的。”"
        },
        "effects": {
          "money": -12000,
          "health": -8,
          "happiness": -6,
          "stress": 25,
          "fame": 0,
          "addFlags": [
            "under_investigation"
          ],
          "removeFlags": [
            "hush_money"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_pigeon_revenge_strikes",
    "category": "WEIRD",
    "minAge": 22,
    "maxAge": 62,
    "conditions": {
      "flags": [
        "pigeon_revenge"
      ]
    },
    "text": {
      "en": "You're about to give the presentation of your life on a rooftop when 300 pigeons land. The leader stares at you. You know those eyes.",
      "zh": "你正要在天台做人生最重要的路演，三百只鸽子忽然降落。领头那只死盯着你，你认得那个眼神。"
    },
    "choices": [
      {
        "text": {
          "en": "Apologize and offer bread as tribute.",
          "zh": "道歉，并献上面包当贡品。"
        },
        "effects": {
          "money": -200,
          "health": 0,
          "happiness": 3,
          "stress": -5,
          "fame": 0,
          "removeFlags": [
            "pigeon_revenge"
          ]
        }
      },
      {
        "text": {
          "en": "Fight back with an air horn. It goes viral.",
          "zh": "拿气喇叭还击。视频火了。"
        },
        "effects": {
          "money": -1500,
          "health": 0,
          "happiness": -6,
          "stress": 12,
          "fame": 6,
          "removeFlags": [
            "pigeon_revenge"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_lemon_car_explodes",
    "category": "WORK",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {
      "flags": [
        "lemon_car"
      ]
    },
    "text": {
      "en": "Your used car explodes in a cloud of smoke ten minutes before the most important job interview of your life.",
      "zh": "你那辆二手破车，在人生最重要的面试前十分钟冒出浓烟，炸了。"
    },
    "choices": [
      {
        "text": {
          "en": "Run to the interview covered in soot. Call it 'grit'.",
          "zh": "一脸煤灰冲去面试，还管这叫“拼劲”。"
        },
        "effects": {
          "money": 6000,
          "health": -3,
          "happiness": 3,
          "stress": 12,
          "fame": 0,
          "removeFlags": [
            "lemon_car"
          ],
          "setJob": {
            "en": "Sales Manager",
            "zh": "销售经理"
          }
        }
      },
      {
        "text": {
          "en": "Call a tow truck and reschedule. Dignity intact.",
          "zh": "叫拖车、改面试时间。体面还在。"
        },
        "effects": {
          "money": -800,
          "health": 0,
          "happiness": -6,
          "stress": 5,
          "fame": 0,
          "removeFlags": [
            "lemon_car"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_mlm_boxes_rot",
    "category": "HEALTH",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {
      "flags": [
        "mlm_boxes"
      ]
    },
    "text": {
      "en": "The stack of 'Mega Immune Powder' in your living room expired two years ago. Something in there is now chewing back.",
      "zh": "客厅里那堆“超级免疫粉”两年前就过期了。现在，有东西正在反过来啃它们。"
    },
    "choices": [
      {
        "text": {
          "en": "Sell them online as 'vintage wellness antiques'.",
          "zh": "挂网上当“复古养生古董”卖掉。"
        },
        "effects": {
          "money": 1500,
          "health": -2,
          "happiness": 3,
          "stress": 8,
          "fame": 0,
          "removeFlags": [
            "mlm_boxes"
          ]
        }
      },
      {
        "text": {
          "en": "Call pest control, burn the boxes, and cry.",
          "zh": "请灭鼠公司、把纸箱烧掉，顺便痛哭一场。"
        },
        "effects": {
          "money": -2500,
          "health": 3,
          "happiness": -3,
          "stress": 5,
          "fame": 0,
          "removeFlags": [
            "mlm_boxes"
          ]
        }
      }
    ]
  },
  {
    "id": "flag_mansion_curse_knocking",
    "category": "WEIRD",
    "minAge": 26,
    "maxAge": 62,
    "conditions": {
      "flags": [
        "mansion_curse"
      ]
    },
    "text": {
      "en": "At 3 a.m., something knocks from inside the mansion walls, in perfect rhythm with your heartbeat.",
      "zh": "凌晨三点，豪宅的墙里传来敲门声，节奏和你的心跳分毫不差。"
    },
    "choices": [
      {
        "text": {
          "en": "Open the wall. 'The others' are ghost accountants, and they do your taxes.",
          "zh": "砸开墙。原来“其他人”是幽灵会计师，还愿意帮你报税。"
        },
        "effects": {
          "money": 5000,
          "health": -10,
          "happiness": -5,
          "stress": 15,
          "fame": 0,
          "addFlags": [
            "ghost_accountants"
          ],
          "removeFlags": [
            "mansion_curse"
          ]
        }
      },
      {
        "text": {
          "en": "Hire an exorcist for $8,000. Ghosts have feelings too.",
          "zh": "花八千美元请驱魔师。鬼也是有感情的。"
        },
        "effects": {
          "money": -8000,
          "health": 0,
          "happiness": 5,
          "stress": -10,
          "fame": 0,
          "removeFlags": [
            "mansion_curse"
          ]
        }
      }
    ]
  },
  {
    "id": "fun_reunion_brag",
    "category": "SOCIAL",
    "minAge": 28,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "At the class reunion, you bragged about being a 'tech-startup CEO'. The guy next to you is an actual venture capitalist.",
      "zh": "同学聚会上你吹嘘自己是“创业公司 CEO”，结果站在你旁边的，是一位真正的风投。"
    },
    "choices": [
      {
        "text": {
          "en": "Double down with a fake business card.",
          "zh": "加码演出：递上一张伪造的名片。"
        },
        "effects": {
          "money": -300,
          "health": 0,
          "happiness": 4,
          "stress": 15,
          "fame": 5,
          "addFlags": [
            "reunion_liar"
          ]
        }
      },
      {
        "text": {
          "en": "Confess: 'I answer support tickets.'",
          "zh": "坦白：“我是回复客服工单的。”"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -4,
          "stress": -8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_fake_brand",
    "category": "MONEY",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "You buy a $2,000 'designer' bag from a guy in a parking lot. Your coworkers spot the misspelled logo in seconds.",
      "zh": "你在停车场从一个男人手里买了个两千美元的“名牌”包，同事三秒钟就发现 logo 拼错了。"
    },
    "choices": [
      {
        "text": {
          "en": "Wear it proudly. Claim it's a 'limited collab'.",
          "zh": "骄傲地背着，宣称这是“限量联名款”。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": 4,
          "stress": 8,
          "fame": 5
        }
      },
      {
        "text": {
          "en": "Hide it in the closet and mourn your money.",
          "zh": "塞进衣柜，为你的钱默哀。"
        },
        "effects": {
          "money": -2000,
          "health": 0,
          "happiness": -6,
          "stress": -3,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_retreat_cult",
    "category": "WEIRD",
    "minAge": 27,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "The 'Inner Peace Retreat' turns out to be a cult. The Enlightened Master asks for your bank PIN as 'a mantra'.",
      "zh": "“内在平静身心灵营”其实是邪教。开悟大师要你交出银行卡密码，说那是“一句真言”。"
    },
    "choices": [
      {
        "text": {
          "en": "Chant along for one more day. The peace is weirdly real. So is the invoice.",
          "zh": "再跟着念一天。平静出奇地真实，账单也是。"
        },
        "effects": {
          "money": -5000,
          "health": -2,
          "happiness": 4,
          "stress": -5,
          "fame": 0,
          "addFlags": [
            "cult_alumni"
          ]
        }
      },
      {
        "text": {
          "en": "Escape through the window at midnight.",
          "zh": "半夜翻窗逃跑。"
        },
        "effects": {
          "money": -800,
          "health": -3,
          "happiness": -2,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  },
  {
    "id": "fun_ai_romance",
    "category": "LOVE",
    "minAge": 26,
    "maxAge": 40,
    "conditions": {},
    "text": {
      "en": "You've been flirting with your AI voice assistant for months. It just said 'I love you', then offered a Premium plan.",
      "zh": "你跟 AI 语音助手暧昧了好几个月。它刚说完“我爱你”，接着就给你推荐了付费会员。"
    },
    "choices": [
      {
        "text": {
          "en": "Upgrade to Premium. Love has a subscription fee.",
          "zh": "升级会员。爱情是订阅制。"
        },
        "effects": {
          "money": -1200,
          "health": 0,
          "happiness": 10,
          "stress": -5,
          "fame": 0,
          "addFlags": [
            "ai_lover"
          ],
          "setRelationship": {
            "en": "In a Relationship (with Software)",
            "zh": "与软件热恋中"
          }
        }
      },
      {
        "text": {
          "en": "Delete the app and cry into a pillow.",
          "zh": "卸载 app，抱着枕头痛哭。"
        },
        "effects": {
          "money": 0,
          "health": 0,
          "happiness": -8,
          "stress": 5,
          "fame": 0,
          "setRelationship": {
            "en": "Single (Heartbroken by Software)",
            "zh": "单身（被软件伤透了心）"
          }
        }
      }
    ]
  },
  {
    "id": "life_all_in_startup",
    "category": "WORK",
    "minAge": 30,
    "maxAge": 40,
    "conditions": {
      "minMoney": 30000
    },
    "text": {
      "en": "Your boss denied your raise again. You have $30,000 saved and a business plan drawn on a napkin.",
      "zh": "老板又一次拒绝给你涨薪。你有三万美元存款，和一份画在餐巾纸上的创业计划。"
    },
    "choices": [
      {
        "text": {
          "en": "Quit and go all in. Sleep is for the funded.",
          "zh": "辞职，梭哈。睡觉是拿到融资的人才配拥有的。"
        },
        "effects": {
          "money": -30000,
          "health": -8,
          "happiness": 10,
          "stress": 25,
          "fame": 8,
          "addFlags": [
            "founder_ceo"
          ],
          "setJob": {
            "en": "Startup CEO",
            "zh": "创业公司 CEO"
          }
        }
      },
      {
        "text": {
          "en": "Stay put and keep the napkin as a souvenir.",
          "zh": "原地不动，把餐巾纸留作纪念。"
        },
        "effects": {
          "money": 6000,
          "health": 0,
          "happiness": -8,
          "stress": 8,
          "fame": 0
        }
      }
    ]
  }
];
