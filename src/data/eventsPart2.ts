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
      "zh": "你在配偶的私密保险箱里发现二十万美元赌债，还有一部存了 47 个“暧昧对象”的第二部手机。"
    },
    "choices": [
      {
        "text": {
          "en": "Forgive and repay it together. 'For better or worse' has terms.",
          "zh": "原谅，并一起还债。“无论好坏”其实带附加条款。"
        },
        "effects": {
          "money": -60000,
          "health": 0,
          "happiness": -5,
          "stress": 15,
          "fame": 0,
          "setRelationship": {
            "en": "Married (Financially Hostage)",
            "zh": "已婚（财务人质）"
          }
        }
      },
      {
        "text": {
          "en": "File for divorce. Keep the toaster.",
          "zh": "提出离婚。保住烤面包机。"
        },
        "effects": {
          "money": -20000,
          "health": 0,
          "happiness": -10,
          "stress": 10,
          "fame": 0,
          "setRelationship": {
            "en": "Divorced",
            "zh": "离婚"
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
      "zh": "你被一封两行字的邮件“优化”了。补偿金两万美元，外加一个装私人物品的纸箱。"
    },
    "choices": [
      {
        "text": {
          "en": "Bet it all on a food truck selling 'Salted Tears Fries'.",
          "zh": "全押在餐车上，卖“眼泪咸味薯条”。"
        },
        "effects": {
          "money": -20000,
          "health": -3,
          "happiness": 8,
          "stress": 15,
          "fame": 4,
          "setJob": {
            "en": "Food Truck Owner",
            "zh": "餐车老板"
          }
        }
      },
      {
        "text": {
          "en": "Accept the first offer: soulless data entry.",
          "zh": "接下第一份工作：毫无灵魂的数据录入。"
        },
        "effects": {
          "money": 2000,
          "health": 0,
          "happiness": -10,
          "stress": 8,
          "fame": 0,
          "setJob": {
            "en": "Contract Data Entry Clerk",
            "zh": "合同制数据录入员"
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
      "zh": "深夜的车库里，你把吹叶机绑到吸尘器上，然后，它居然飞起来了。"
    },
    "choices": [
      {
        "text": {
          "en": "Perfect it in secret. Genius needs privacy.",
          "zh": "秘密改良。天才需要隐私。"
        },
        "effects": {
          "money": -3000,
          "health": -3,
          "happiness": 8,
          "stress": 10,
          "fame": 0,
          "addFlags": [
            "invented_flying_vac"
          ]
        }
      },
      {
        "text": {
          "en": "Test-fly it in the driveway. Livestream it, obviously.",
          "zh": "直接在车道上试飞，当然要开直播。"
        },
        "effects": {
          "money": -500,
          "health": -3,
          "happiness": 6,
          "stress": 5,
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
      "zh": "你的飞天吸尘器失控，撞碎了邻居家的落地玻璃门。视频全网播放量破亿。"
    },
    "choices": [
      {
        "text": {
          "en": "Apologize publicly and pay for the door. Become 'the honest vacuum guy'.",
          "zh": "公开道歉并赔玻璃门。成为“诚实吸尘器发明人”。"
        },
        "effects": {
          "money": -5000,
          "health": 0,
          "happiness": 2,
          "stress": 8,
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
          "zh": "推出“吸尘器袭击”周边。邻居把你告了。"
        },
        "effects": {
          "money": 8000,
          "health": 0,
          "happiness": -3,
          "stress": 12,
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
      "zh": "跨国科技巨头出价一百万美元收购你的专利。或者，你也可以自己量产，然后祈祷。"
    },
    "choices": [
      {
        "text": {
          "en": "Sell. They rename it 'CorpVac 3000' and remove the flying.",
          "zh": "卖。他们把它改名叫“CorpVac 3000”，还把飞行功能删了。"
        },
        "effects": {
          "money": 1000000,
          "health": 0,
          "happiness": -10,
          "stress": 5,
          "fame": 10,
          "removeFlags": [
            "vac_viral"
          ],
          "setJob": {
            "en": "Ceremonial Consultant",
            "zh": "巨头挂名顾问"
          }
        }
      },
      {
        "text": {
          "en": "Mass-produce it yourself. Debt is just motivation with interest.",
          "zh": "自己量产。债务不过是带利息的动力。"
        },
        "effects": {
          "money": -300000,
          "health": -10,
          "happiness": 12,
          "stress": 30,
          "fame": 15,
          "addFlags": [
            "vac_debt"
          ],
          "removeFlags": [
            "vac_viral"
          ],
          "setJob": {
            "en": "Founder, Flying Vac Inc.",
            "zh": "飞天吸尘器公司创始人"
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
      "zh": "你想买辆一千 cc 的重机，找回 25 岁的感觉。你的脊椎只想要一把躺椅。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy the bike. Leather jacket included, dignity optional.",
          "zh": "买重机。皮衣附赠，尊严随缘。"
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
          "zh": "换成一把人体工学椅和一双“大人款球鞋”。"
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
      "zh": "你的体检报告一片红海。医生管你的生活方式叫“很有创意”。"
    },
    "choices": [
      {
        "text": {
          "en": "Overhaul your life: no booze, no midnight snacks, no joy.",
          "zh": "彻底改造人生：不喝酒、不吃夜宵、没有快乐。"
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
          "zh": "一直换医院，直到有人说“你很健康”。"
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
      "zh": "一位 25 岁的下属在董事会上把你的点子当成自己的方案汇报，还把“赋能”说了两遍。"
    },
    "choices": [
      {
        "text": {
          "en": "Expose him in front of everyone. Youth is not bulletproof.",
          "zh": "当众拆穿他。年轻不是防弹衣。"
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
          "zh": "咽下这口气，还笑眯眯地“辅导”他。"
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
      "zh": "孩子考上了一所顶尖私立大学。学费一年六万美元，另加“人脉拓展费”。"
    },
    "choices": [
      {
        "text": {
          "en": "Pay it. Your retirement plan becomes 'working until death'.",
          "zh": "交。你的退休计划改成“干到死”。"
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
          "zh": "说“本地大学也能培养品格”。然后承受冷战。"
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
      "zh": "老花镜落在另一个房间。你整整一周把口气清新糖当成降压药吞。"
    },
    "choices": [
      {
        "text": {
          "en": "Go to the ER and admit the mint incident.",
          "zh": "去急诊，坦白这起薄荷糖事件。"
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
          "en": "Call the pharmacist and buy a pill organizer with giant labels. Your family calls it 'the Mint Incident'.",
          "zh": "打电话给药师，买个大字标签的药盒。家人从此管这叫“薄荷事件”。"
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
      "zh": "今年是分房睡十周年。你们异口同声地强调：“是因为打呼噜，不是因为婚姻。”"
    },
    "choices": [
      {
        "text": {
          "en": "Move back into one room. Prepare for earplugs.",
          "zh": "搬回同一间卧室。备好耳塞。"
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
          "zh": "把家改造成两套主卧。"
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
      "zh": "年迈的父母不能再独居了。你的兄弟姐妹“都很忙”，但“都很有意见”。"
    },
    "choices": [
      {
        "text": {
          "en": "Move them into your home. Learn the true meaning of 'patience'.",
          "zh": "接他们回家住。你将重新领悟“耐心”二字。"
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
          "zh": "出钱送养老院，愧疚感免费赠送。"
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
      "zh": "公司要你训练即将取代你们部门的 AI。奖励是一支还挺好看的钢笔。"
    },
    "choices": [
      {
        "text": {
          "en": "Train it properly. Become its 'human supervisor'.",
          "zh": "认真训练它。成为它的“人类监督员”。"
        },
        "effects": {
          "money": 6000,
          "health": 0,
          "happiness": -8,
          "stress": 8,
          "fame": 0,
          "setJob": {
            "en": "AI Supervisor (Human)",
            "zh": "AI 监督员（真人）"
          }
        }
      },
      {
        "text": {
          "en": "Subtly train it to love spreadsheets from 1998.",
          "zh": "偷偷把它训练成只爱 1998 年的表格。"
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
      "zh": "你的发际线像败军一样节节后退。诊所推出“全面重建方案”，价格相当于一辆二手车。"
    },
    "choices": [
      {
        "text": {
          "en": "Get the transplant. Hope has a price tag.",
          "zh": "植发。希望是明码标价的。"
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
          "zh": "拥抱光头，并称之为“闪亮自信”。"
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
      "zh": "你的养老基金一周蒸发了四成。理财顾问的邮件签名写着：“保持正能量！”"
    },
    "choices": [
      {
        "text": {
          "en": "Cash out and hide the money under your mattress.",
          "zh": "全部取出，塞进床垫底下。"
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
          "zh": "拿最后的积蓄抄底。希望也是一种策略。"
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
      "zh": "你的新老板才 26 岁，只用表情包沟通，还把季度考核叫作“氛围检查”。"
    },
    "choices": [
      {
        "text": {
          "en": "Learn the slang. Say 'no cap' with a straight face.",
          "zh": "学新黑话。一脸严肃地说“no cap”。"
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
          "zh": "说“想当年……”，然后看着 HR 开始做记录。"
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
      "zh": "你的膝盖现在发出的声音像闹鬼的楼梯。外科医生说这是“常规置换手术”。"
    },
    "choices": [
      {
        "text": {
          "en": "Get the surgery. Enjoy six weeks of daytime TV.",
          "zh": "做手术。享受六周的白天电视节目。"
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
          "zh": "买根拐杖，称之为“复古造型”。"
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
      "zh": "你家青春期的孩子想退学当全职主播。他有 14 个粉丝，其中 12 个是机器人。"
    },
    "choices": [
      {
        "text": {
          "en": "Fund his dream. Watch the stream. Suffer quietly.",
          "zh": "资助他的梦想。看他直播。默默受苦。"
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
          "zh": "禁止。享受饭桌上的冷战。"
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
      "zh": "一位年轻同事说你“睿智又神秘”。这已经非常接近撩拨了。"
    },
    "choices": [
      {
        "text": {
          "en": "Enjoy the attention. Just a little.",
          "zh": "享受被关注的感觉。就一点点。"
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
      "zh": "一位老朋友 52 岁走了。追悼会上，每个人都在小声说：“早知道就多聚聚了。”"
    },
    "choices": [
      {
        "text": {
          "en": "Start a real bucket list. Spend money on being alive.",
          "zh": "认真列一张愿望清单。把钱花在“活着”这件事上。"
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
          "zh": "回去上班。追悼会不算工时。"
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
      "zh": "孩子们都搬出去了。你的房子现在又大又静，还会回荡你的后悔。"
    },
    "choices": [
      {
        "text": {
          "en": "Sell up and move into a compact condo.",
          "zh": "卖房，搬进小巧的公寓。"
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
          "zh": "把房间租给陌生人。能出什么事呢？"
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
      "zh": "多年前被你出卖的同事，如今是审批你项目的监管机构负责人。他什么都记得。"
    },
    "choices": [
      {
        "text": {
          "en": "Apologize sincerely and accept his 'public humility' terms.",
          "zh": "诚心道歉，并接受他提出的“公开谦卑”条件。"
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
          "zh": "把项目带去别处，保住自尊。"
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
      "zh": "奶奶九十大寿，全家人坚持要见那位“在南极行医的未婚伴侣”。琳达姑姑还特地准备了见面礼。"
    },
    "choices": [
      {
        "text": {
          "en": "Hire an actor. He's method: he's memorized penguin facts.",
          "zh": "花钱雇个演员。对方很敬业，连企鹅知识都背熟了。"
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
            "zh": "订婚中（演员版）"
          }
        }
      },
      {
        "text": {
          "en": "Confess everything. Absorb the flying dinner rolls.",
          "zh": "全盘招供，并接住飞来的餐包。"
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
            "zh": "单身（被拆穿）"
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
      "zh": "你弟的酸黄瓜店早就倒闭了。两个穿同款外套的男人拿着借条上门：本息共十万美元。"
    },
    "choices": [
      {
        "text": {
          "en": "Pay it off. Family is expensive.",
          "zh": "全额还清。亲人真贵。"
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
          "zh": "跑路、换城市、改名叫“史蒂夫”。"
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
      "zh": "当年凌晨跟你对轰的鼓手邻居，如今是业委会主任。他开的第一张罚单，是针对你“过度张扬的气场”。"
    },
    "choices": [
      {
        "text": {
          "en": "Surrender and bake him an apology cake.",
          "zh": "投降，烤个道歉蛋糕送他。"
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
          "zh": "站出来竞选主任，跟他对决。民主是很吵的。"
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
      "zh": "你的报税单完美得不正常。税务局派出了“超自然调查组”。"
    },
    "choices": [
      {
        "text": {
          "en": "Let the ghosts testify in a séance court.",
          "zh": "让幽灵会计师们在招魂法庭上作证。"
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
          "zh": "请一位同时也是灵媒的律师。两个世界一起计费。"
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
      "zh": "你的飞天吸尘器公司资不抵债。清算组安排了拍卖，同时一位神秘的海外买家表示愿意“接盘”。"
    },
    "choices": [
      {
        "text": {
          "en": "Let it go to auction. Watch strangers bid on your dreams.",
          "zh": "任其拍卖。看着陌生人为你的梦想举牌。"
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
            "zh": "前创始人（已破产）"
          }
        }
      },
      {
        "text": {
          "en": "Sell to the overseas buyer. They promise 'peaceful uses'.",
          "zh": "卖给海外买家。他们保证“只做和平用途”。"
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
            "zh": "神秘买家的顾问"
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
      "zh": "你去山里参加“数字排毒”静修营。第五天，你开始跟锁着手机的盒子谈判。"
    },
    "choices": [
      {
        "text": {
          "en": "Stay the full week. Enlightenment has terrible reception.",
          "zh": "撑满一整周。顿悟的信号真的很差。"
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
          "zh": "偷溜下山，去吃披萨、找个有信号的地方。"
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
      "zh": "你每晚沉迷于 UFO 论坛。版主“Zorg_77”说母舰周二降临。你信了。"
    },
    "choices": [
      {
        "text": {
          "en": "Join the hilltop welcoming party. Bring snacks.",
          "zh": "加入山顶欢迎会。记得带零食。"
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
          "zh": "下线，出门“接地气”。周二是倒垃圾的日子。"
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
      "zh": "你的瑜伽小组和广场舞大妈团，同时看上了公园早上六点的同一块场地。便携音箱已经开始部署。"
    },
    "choices": [
      {
        "text": {
          "en": "Challenge them to a dance-off. Yoga has moves.",
          "zh": "向她们下战书，来场舞蹈对决。瑜伽也有招式。"
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
          "zh": "撤退到停车场。在车缝里寻找内心的平静。"
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
      "zh": "半梦半醒之间，你把一张没裁好、裹着毛巾头巾还敷着面膜的自拍，发到了“四年二班家长群”。"
    },
    "choices": [
      {
        "text": {
          "en": "Claim it's a reproduction of a Renaissance painting.",
          "zh": "声称这是一幅文艺复兴名画的仿作。"
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
          "zh": "退出所有家长群，并给孩子转学。"
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
      "zh": "主播说服你买下一张三千美元的“量子床垫”，随货附赠一张用蜡笔签名的证书。"
    },
    "choices": [
      {
        "text": {
          "en": "Keep it. Your back can feel the quantum.",
          "zh": "留着。你的后背能感受到量子。"
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
          "zh": "退货。忍受 47 分钟的等待音乐。"
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
      "zh": "医生说：“好消息！我们搞错档案了，你没有要死。”可你早就辞了职、卖了车，还把对姻亲的心里话全说完了。"
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
          "zh": "拒绝回头。继续执行愿望清单的混乱人生。"
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
      "zh": "一位素未谋面的姑婆留给你一座灯塔和七只羊驼。遗嘱上写着：“它们彼此需要。”"
    },
    "choices": [
      {
        "text": {
          "en": "Accept everything. You are now a llama lighthouse keeper.",
          "zh": "全盘接收。你现在是羊驼灯塔看守人。"
        },
        "effects": {
          "money": -15000,
          "health": -3,
          "happiness": 12,
          "stress": 8,
          "fame": 5,
          "setJob": {
            "en": "Llama Lighthouse Keeper",
            "zh": "羊驼灯塔看守人"
          }
        }
      },
      {
        "text": {
          "en": "Sell the lot and never speak of the llamas again.",
          "zh": "全部卖掉，永远不再提羊驼。"
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
      "zh": "又是周一，又是表格。你突然幻想自己拿着鱼竿坐在温暖的沙滩上，孤独而自在。"
    },
    "choices": [
      {
        "text": {
          "en": "Quit everything and become a full-time beach angler.",
          "zh": "放下一切，成为全职海滩钓客。"
        },
        "effects": {
          "money": -25000,
          "health": 8,
          "happiness": 20,
          "stress": -25,
          "fame": 0,
          "setJob": {
            "en": "Full-Time Beach Angler",
            "zh": "全职海滩钓客"
          }
        }
      },
      {
        "text": {
          "en": "Stay put. Fishing is just a screensaver.",
          "zh": "留下。钓鱼只是屏保。"
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
      "zh": "一位西装像鲨鱼皮的投资人对你的公司发起恶意收购。第一封邮件写着：“对事不对人。准备好裁员吧。”"
    },
    "choices": [
      {
        "text": {
          "en": "Lead the resistance and swallow a poison pill.",
          "zh": "带头抵抗，并吞下毒丸策略。"
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
          "zh": "卖掉股份，拿钱走人。"
        },
        "effects": {
          "money": 80000,
          "health": 0,
          "happiness": -8,
          "stress": -5,
          "fame": 0,
          "setJob": {
            "en": "Retired Executive (Involuntary)",
            "zh": "被迫提前退休的高管"
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
      "zh": "在高档酒店酒廊里，你捡到一张磨砂黑卡。上面没有名字，只有一组地图坐标。"
    },
    "choices": [
      {
        "text": {
          "en": "Pocket it. Curiosity is a midlife hobby.",
          "zh": "收进口袋。好奇心是中年人的爱好。"
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
          "zh": "交给酒保。他脸色发白，又把卡塞回你手里。"
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
      "zh": "坐标把你带到一场富豪戴动物头套的假面晚宴。一只老虎向你递出入会邀请：“欢迎，新会员。”"
    },
    "choices": [
      {
        "text": {
          "en": "Accept immediately. Pay the $20,000 'initiation fee'.",
          "zh": "立刻接受。交两万美元的“入会礼金”。"
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
          "zh": "砍价，并戴上一个假名牌。"
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
      "zh": "俱乐部给你一个明天暴涨百倍的药企股票内幕。你只需要签一份以“十年寿命”作抵押的合同。"
    },
    "choices": [
      {
        "text": {
          "en": "Sign in blood. The interest rate is 'eternal'.",
          "zh": "以血签名。利息是“永恒”。"
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
          "zh": "礼貌拒绝。他们在一本非常厚的簿子里记下了你的名字。"
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
      "zh": "跨国执法队在黎明突袭俱乐部。探员手里有一份写着你名字的名单，并给你两个选择：供出其他会员换取豁免，或吞下加密账本芯片。"
    },
    "choices": [
      {
        "text": {
          "en": "Name names. Enter witness protection.",
          "zh": "供出同伙。进入证人保护计划。"
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
            "zh": "受保护证人"
          },
          "setRelationship": {
            "en": "Estranged (Witness Protection)",
            "zh": "疏离（证人保护中）"
          }
        }
      },
      {
        "text": {
          "en": "Swallow the chip. Become a professional victim.",
          "zh": "吞下芯片。成为终身受害者。"
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
            "en": "Professional Victim (Compensation Pending)",
            "zh": "终身受害者（赔偿待议）"
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
      "zh": "你宣布要重写遗嘱。三个孩子立刻建了个名叫“遗产行动”的群。"
    },
    "choices": [
      {
        "text": {
          "en": "Split it equally and enjoy the peace (for about four minutes).",
          "zh": "平均分配，享受平静（大概四分钟）。"
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
          "zh": "遗产留给最常来看你的人。看“探望大赛”开跑。"
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
      "zh": "家族聚餐时，你的假牙滑出来，掉进冒泡的芝士火锅里。没有人说话，所有人都在看。"
    },
    "choices": [
      {
        "text": {
          "en": "Fish them out and put them back. Efficient.",
          "zh": "捞出来直接戴回去。很有效率。"
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
          "zh": "宣布这是“主厨特餐：焗烤假牙”，然后订一副新假牙。"
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
      "zh": "相伴四十年的老伴先走了一步。对方的遗言是：“遥控器在沙发底下。”"
    },
    "choices": [
      {
        "text": {
          "en": "Hold a lavish farewell with their favorite karaoke playlist.",
          "zh": "办一场放满对方最爱的 K 歌歌单的盛大告别仪式。"
        },
        "effects": {
          "money": -8000,
          "health": -3,
          "happiness": 3,
          "stress": -5,
          "fame": 0,
          "setRelationship": {
            "en": "Widowed",
            "zh": "丧偶"
          }
        }
      },
      {
        "text": {
          "en": "Keep it small and quiet. Talk to the empty couch.",
          "zh": "简单低调。对着空沙发说话。"
        },
        "effects": {
          "money": -1500,
          "health": -3,
          "happiness": -10,
          "stress": 8,
          "fame": 0,
          "setRelationship": {
            "en": "Widowed",
            "zh": "丧偶"
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
      "zh": "一位自称来自海外军医院的迷人“杰克上校”每天给你发消息。对方需要 3 万美元来“运送黄金”。银行柜员一脸担忧。"
    },
    "choices": [
      {
        "text": {
          "en": "Send the money. Your heart overrules your bank teller.",
          "zh": "汇钱。你的心脏否决了银行柜员。"
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
            "zh": "网恋中（身份未验证）"
          }
        }
      },
      {
        "text": {
          "en": "Report him and tell your family. Being careful isn't being foolish.",
          "zh": "报警，并告诉家人。谨慎不等于愚蠢。"
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
      "zh": "电视购物主持人发誓“长生根精华”治好了一万人。“使用前”的照片和“使用后”看起来一模一样。"
    },
    "choices": [
      {
        "text": {
          "en": "Buy a year's supply. The placebo effect is free; the invoice is not.",
          "zh": "买一整年的量。安慰剂效应是免费的，账单可不是。"
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
          "zh": "关掉电视，出门散个步。"
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
