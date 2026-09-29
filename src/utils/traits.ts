import { Language } from '../types/game';

export type MedalRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Medal {
  id: string;
  icon: string;
  name: { zh: string; en: string };
  desc: { zh: string; en: string };
  rarity: MedalRarity;
}

export const ALL_MEDALS: Medal[] = [
  // Legendary Medals
  {
    id: 'saw_glitch',
    icon: '👁️',
    name: { zh: '代碼覺醒者', en: 'Glitch Witness' },
    desc: { zh: '親眼看見世界現實維度撕裂的程式碼錯誤', en: 'Glimpsed raw source code tear through physical reality' },
    rarity: 'legendary'
  },
  {
    id: 'matrix_contact',
    icon: '🕶️',
    name: { zh: '矩陣聯絡人', en: 'Matrix Contact' },
    desc: { zh: '獲得母體維護者的緊急聯絡暗號', en: 'Received direct hotline access to system admin agents' },
    rarity: 'legendary'
  },
  {
    id: 'peeked_reality',
    icon: '🌀',
    name: { zh: '窺探虛擬', en: 'Reality Peeker' },
    desc: { zh: '觸摸到模擬世界邊界的真實底層', en: 'Touched the underlying architecture of simulation' },
    rarity: 'legendary'
  },
  {
    id: 'ai_ghost',
    icon: '👻',
    name: { zh: '數位幽靈', en: 'Digital Ghost' },
    desc: { zh: '意識數據化殘留在伺服器中永生', en: 'Consciousness uploaded to immortal server threads' },
    rarity: 'legendary'
  },
  {
    id: 'has_black_card',
    icon: '💳',
    name: { zh: '無限黑卡', en: 'Black Card Sovereign' },
    desc: { zh: '刷卡額度等同於一艘航母的頂級財閥', en: 'Possessed unlimited purchasing power of national budgets' },
    rarity: 'legendary'
  },
  {
    id: 'corporate_vp',
    icon: '🏢',
    name: { zh: '權力副總裁', en: 'Corporate VP' },
    desc: { zh: '坐在頂樓落地窗辦公室俯瞰商業棋局的幕後掌權者', en: 'Surveys competitive battlefields from corner penthouse suites' },
    rarity: 'legendary'
  },
  {
    id: 'venture_lead',
    icon: '🪐',
    name: { zh: '創投操盤手', en: 'Venture Architect' },
    desc: { zh: '掌控數十億風投資金，隨手孵化未來的科技巨頭', en: 'Directs billions in venture capital to birth future giants' },
    rarity: 'legendary'
  },
  {
    id: 'founder_ceo',
    icon: '👑',
    name: { zh: '新創獨角獸', en: 'Unicorn Founder' },
    desc: { zh: '將草根點子鍛造成估值億萬的商業帝國', en: 'Forged a grassroots dream into a multi-billion dollar giant' },
    rarity: 'legendary'
  },
  {
    id: 'vac_weaponized',
    icon: '🛡️',
    name: { zh: '國防承包商', en: 'Defense Contractor' },
    desc: { zh: '家庭電器搖身一變成為軍事特戰隊戰術裝備', en: 'Upgraded household appliances to frontline military gear' },
    rarity: 'legendary'
  },
  {
    id: 'lifespan_pledged',
    icon: '⏳',
    name: { zh: '典當壽命', en: 'Mortgaged Years' },
    desc: { zh: '以十年陽壽為代價換取了短暫的逆天橫財', en: 'Pawned ten mortal years for sudden blinding wealth' },
    rarity: 'legendary'
  },
  {
    id: 'club_contract',
    icon: '🩸',
    name: { zh: '永生契約', en: 'Eternal Bloodline' },
    desc: { zh: '簽署了連下三代靈魂都歸其所有的黃金契約', en: 'Pledged subsequent generations to ancient secret councils' },
    rarity: 'legendary'
  },

  // Epic Medals
  {
    id: 'invented_flying_vac',
    icon: '🚀',
    name: { zh: '飛天發明家', en: 'Flying Vacuum' },
    desc: { zh: '成功打造出飛天吸塵器並震撼科技界', en: 'Created the flying vacuum and shook the tech world' },
    rarity: 'epic'
  },
  {
    id: 'ai_lover',
    icon: '🤖',
    name: { zh: '賽博戀人', en: 'Cyber Romance' },
    desc: { zh: '與具備自我意識的 AI 發展出超維度靈魂伴侶關係', en: 'Formed a transcendent bond with a conscious AI' },
    rarity: 'epic'
  },
  {
    id: 'ai_saboteur',
    icon: '⚡',
    name: { zh: 'AI 破壞者', en: 'AI Saboteur' },
    desc: { zh: '單槍匹馬癱瘓了失控的自主演算法', en: 'Single-handedly unplugged rogue algorithmic overlords' },
    rarity: 'epic'
  },
  {
    id: 'whistleblower',
    icon: '📢',
    name: { zh: '正義吹哨人', en: 'Brave Whistleblower' },
    desc: { zh: '冒著被滅口的風險將黑心醜聞公諸於世', en: 'Risked life and career to expose corporate corruption' },
    rarity: 'epic'
  },
  {
    id: 'glitch_choice',
    icon: '💾',
    name: { zh: '漏洞抉擇者', en: 'Glitch Decider' },
    desc: { zh: '勇於執行非官方常規的系統異常決策', en: 'Executed non-standard glitch protocols with zero fear' },
    rarity: 'epic'
  },
  {
    id: 'zen_master',
    icon: '🧘',
    name: { zh: '心態大師', en: 'Zen Master' },
    desc: { zh: '在混亂暴跌的世界中保持絕對內心平和', en: 'Attained transcendent inner serenity amidst total chaos' },
    rarity: 'epic'
  },
  {
    id: 'club_member',
    icon: '🏛️',
    name: { zh: '秘密結社', en: 'Secret Society' },
    desc: { zh: '掌握主宰世界暗流的專屬握手禮節與戒指標記', en: 'Possessed the secret handshake that controls global finance' },
    rarity: 'epic'
  },
  {
    id: 'mob_target',
    icon: '🎯',
    name: { zh: '黑幫懸賞', en: 'Syndicate Mark' },
    desc: { zh: '出門先看車底是否有異樣的水銀炸彈', en: 'Inspects car undercarriages before turning the ignition' },
    rarity: 'epic'
  },
  {
    id: 'buried_gold',
    icon: '🪙',
    name: { zh: '窖藏金條', en: 'Buried Bullion' },
    desc: { zh: '後院挖地三尺藏著足以買下小鎮的純金金塊', en: 'Buried sufficient solid gold bars to purchase an island' },
    rarity: 'epic'
  },
  {
    id: 'ghost_accountants',
    icon: '🧾',
    name: { zh: '幽靈會計師', en: 'Phantom CPAs' },
    desc: { zh: '用六重海外離岸信託讓國稅局查到懷疑人生', en: 'Routed taxable revenue through six layers of phantom trusts' },
    rarity: 'epic'
  },
  {
    id: 'silent_partner',
    icon: '🤫',
    name: { zh: '幕後黑手', en: 'Silent Partner' },
    desc: { zh: '從不出面，卻在暗處收割巨額乾股分紅', en: 'Never shows up on paperwork, collects fat dividend wires' },
    rarity: 'epic'
  },
  {
    id: 'trusted_friend',
    icon: '🤝',
    name: { zh: '生死之交', en: 'Loyal Companion' },
    desc: { zh: '哪怕你在半夜三點需要鏟子，他也絕不過問', en: 'Brings shovels at 3 AM with zero questions asked' },
    rarity: 'epic'
  },
  {
    id: 'raider_enemy',
    icon: '🦅',
    name: { zh: '禿鷹死敵', en: 'Raider Nemesis' },
    desc: { zh: '在毒丸防禦戰中成功擊退華爾街惡意收購狂魔', en: 'Activated poison pills to crush predatory Wall Street raiders' },
    rarity: 'epic'
  },
  {
    id: 'memento_mori',
    icon: '💀',
    name: { zh: '死生參透者', en: 'Memento Mori' },
    desc: { zh: '直面死亡深淵後徹底洞悉了虛無荒誕的宇宙', en: 'Stared into the mortal abyss and discovered absolute freedom' },
    rarity: 'epic'
  },
  {
    id: 'what_if_app',
    icon: '📱',
    name: { zh: '平行時空觀測者', en: 'Multiverse Peeker' },
    desc: { zh: '窺見了無數個不同選擇下繁華又悽慘的自己', en: 'Observed thousand other timelines where choices mattered' },
    rarity: 'epic'
  },
  {
    id: 'frozen_reservation',
    icon: '🧊',
    name: { zh: '人體冷凍艙', en: 'Cryo Sleeper' },
    desc: { zh: '預約了零下196度的液態氮膠囊等待三百年後甦醒', en: 'Reserved liquid nitrogen vaults to wake in the 24th century' },
    rarity: 'epic'
  },
  {
    id: 'witness_celebrity',
    icon: '⭐',
    name: { zh: '名流證人', en: 'Celebrity Witness' },
    desc: { zh: '在證人保護計劃中因過度耀眼被迫再次搬家', en: 'Relocated again because witness protection persona was too famous' },
    rarity: 'epic'
  },
  {
    id: 'independent_consultant',
    icon: '💼',
    name: { zh: '獨立策略顧問', en: 'Master Consultant' },
    desc: { zh: '按小時收費五位數，靠兩頁簡報解決億萬難題', en: 'Billed five figures hourly for two-slide structural pivots' },
    rarity: 'epic'
  },
  {
    id: 'industry_influencer',
    icon: '🎙️',
    name: { zh: '行業意見領袖', en: 'Industry Oracle' },
    desc: { zh: '年會主旨演講座無虛席，言論足以撼動股價走勢', en: 'Keynote speeches routinely moved national sector indices' },
    rarity: 'epic'
  },

  // Rare Medals
  {
    id: 'pigeon_friend',
    icon: '🐦',
    name: { zh: '鴿界盟友', en: 'Pigeon Ally' },
    desc: { zh: '獲得城市鴿群的無條件庇護與信任', en: 'Gained unconditional trust and protection from city pigeons' },
    rarity: 'rare'
  },
  {
    id: 'pigeon_ally',
    icon: '🐦',
    name: { zh: '鴿界盟友', en: 'Pigeon Ally' },
    desc: { zh: '獲得城市鴿群的無條件庇護與信任', en: 'Gained unconditional trust and protection from city pigeons' },
    rarity: 'rare'
  },
  {
    id: 'cat_overlord',
    icon: '🐱',
    name: { zh: '貓奴之王', en: 'Cat Overlord' },
    desc: { zh: '把整份遺產捐給流浪貓收容所，被推舉為最高榮譽鏟屎官', en: 'Elected supreme litterbox custodian by local feline council' },
    rarity: 'rare'
  },
  {
    id: 'pigeon_revenge',
    icon: '🦅',
    name: { zh: '鴿群公敵', en: 'Pigeon Vendetta' },
    desc: { zh: '成為全城鴿子集體空投打擊目標', en: 'Targeted by coordinated airborne pigeon retribution' },
    rarity: 'rare'
  },
  {
    id: 'wedding_crasher',
    icon: '💍',
    name: { zh: '婚禮不速之客', en: 'Wedding Crasher' },
    desc: { zh: '精準蹭入無數陌生人婚禮盛宴並打包好料', en: 'Feasted at strangers weddings with legendary stealth' },
    rarity: 'rare'
  },
  {
    id: 'club_dropout',
    icon: '🚪',
    name: { zh: '脫離神秘俱樂部', en: 'Left Secret Club' },
    desc: { zh: '冒著被追殺的危險洗去紋身退出秘密結社', en: 'Scrubbed ceremonial tattoos and walked out into the sun' },
    rarity: 'rare'
  },
  {
    id: 'hush_money',
    icon: '🤐',
    name: { zh: '封口費封口', en: 'Hush Money' },
    desc: { zh: '收下沉甸甸的皮箱並發誓帶進棺材', en: 'Accepted the heavy briefcase and sealed lips forever' },
    rarity: 'rare'
  },
  {
    id: 'ufo_believer',
    icon: '🛸',
    name: { zh: '外星信徒', en: 'UFO Believer' },
    desc: { zh: '堅信未解之謎並收到來自星際的低頻信號', en: 'Tuned into extraterrestrial subspace frequency broadcasts' },
    rarity: 'rare'
  },
  {
    id: 'founder',
    icon: '💡',
    name: { zh: '初創創辦人', en: 'Startup Pioneer' },
    desc: { zh: '在車庫與泡麵中敲出改變命運的第一行代碼', en: 'Coded destinies from humble garages and instant noodles' },
    rarity: 'rare'
  },
  {
    id: 'startup_alumni',
    icon: '🌟',
    name: { zh: '新創元老', en: 'Startup Alumni' },
    desc: { zh: '見證新創團隊從零到掛牌上市的生死存亡', en: 'Survives grueling pivots, dilutive rounds, and IPO bells' },
    rarity: 'rare'
  },
  {
    id: 'backstabber',
    icon: '🗡️',
    name: { zh: '職場背刺者', en: 'Backstabber' },
    desc: { zh: '用同儕的背影鋪平自己晉升的通天階梯', en: 'Paved promotions with the unsuspecting backs of peers' },
    rarity: 'rare'
  },
  {
    id: 'mansion_curse',
    icon: '🏚️',
    name: { zh: '凶宅詛咒', en: 'Mansion Curse' },
    desc: { zh: '與三位百年前的幽靈住戶和平共用衛浴', en: 'Sharing morning bathroom rotations with Victorian phantoms' },
    rarity: 'rare'
  },
  {
    id: 'cult_alumni',
    icon: '🔮',
    name: { zh: '邪教體驗者', en: 'Cult Alumni' },
    desc: { zh: '穿著紫色長袍成功跳窗逃離洗腦聚會', en: 'Escaped midnight mountain compounds in ceremonial purple robes' },
    rarity: 'rare'
  },
  {
    id: 'hired_actor',
    icon: '🎭',
    name: { zh: '聘用演員', en: 'Hired Actor' },
    desc: { zh: '成功在長輩面前扮演百萬身價完美伴侶', en: 'Acted the perfect wealthy partner with Academy-level finesse' },
    rarity: 'rare'
  },
  {
    id: 'neighbor_lawsuit',
    icon: '⚖️',
    name: { zh: '鄰里訴訟纏身', en: 'Neighbor Lawsuit' },
    desc: { zh: '法院傳票多到可以裝訂成厚厚的三部曲', en: 'Accumulated legal briefs thick enough to publish a trilogy' },
    rarity: 'rare'
  },
  {
    id: 'office_legend',
    icon: '🏆',
    name: { zh: '辦公室傳奇', en: 'Office Legend' },
    desc: { zh: '在不被開除的前提下達成了極致摸魚境界', en: 'Achieved legendary status for doing absolutely nothing profitably' },
    rarity: 'rare'
  },
  {
    id: 'chat_legend',
    icon: '💬',
    name: { zh: '群聊傳奇', en: 'Chat Legend' },
    desc: { zh: '發出的一張貼圖成功瓦解了跨部門高層會議', en: 'Derailed five-hour executive meetings with a single custom sticker' },
    rarity: 'rare'
  },
  {
    id: 'squirrel_secretary',
    icon: '🐿️',
    name: { zh: '松鼠秘書部', en: 'Squirrel Secretary' },
    desc: { zh: '由窗外松鼠替你整理並吃掉所有的催繳帳單', en: 'Entrusted overdue bill disposal to trusted park squirrels' },
    rarity: 'rare'
  },
  {
    id: 'jumped_ship',
    icon: '🚢',
    name: { zh: '及時跳船', en: 'Jumped Ship' },
    desc: { zh: '在鐵達尼號撞冰山前半小時優雅坐上救生艇', en: 'Boarded lifeboats 30 minutes before iceberg impact' },
    rarity: 'rare'
  },
  {
    id: 'van_life',
    icon: '🚐',
    name: { zh: '廂型車浪人', en: 'Van Life Nomad' },
    desc: { zh: '把家安在四個輪子上，日落在哪哪裡就是客廳', en: 'Parked four wheels wherever sunsets were prettiest' },
    rarity: 'rare'
  },
  {
    id: 'biker_midlife',
    icon: '🏍️',
    name: { zh: '重機中年', en: 'Midlife Biker' },
    desc: { zh: '皮衣皮褲轟鳴引擎，向中年危機說再見', en: 'Roared through midlife crises in full leather glory' },
    rarity: 'rare'
  },
  {
    id: 'under_investigation',
    icon: '📂',
    name: { zh: '接受監管調查', en: 'Under Investigation' },
    desc: { zh: '聯邦調查局專門為你保留了三層獨立檔案櫃', en: 'Dedicated full federal storage rooms to your financial records' },
    rarity: 'rare'
  },
  {
    id: 'ghost_karma',
    icon: '🕯️',
    name: { zh: '陰魂業障', en: 'Ghost Karma' },
    desc: { zh: '身後總有幾雙冰冷的手在深夜替你蓋上棉被', en: 'Chilly unseen hands tuck you in during stormy nights' },
    rarity: 'rare'
  },
  {
    id: 'vac_viral',
    icon: '📱',
    name: { zh: '吸塵器爆紅', en: 'Viral Vacuum' },
    desc: { zh: '靠著奇葩影片在短影音平台創下十億次點擊', en: 'Clocked a billion organic views on bizarre household inventions' },
    rarity: 'rare'
  },
  {
    id: 'vac_debt',
    icon: '💸',
    name: { zh: '吸塵器召回債務', en: 'Recall Debt' },
    desc: { zh: '產品把客戶家的天花板吸穿後的巨額賠償債務', en: 'Footed astronomical bills after vacuums sucked off ceilings' },
    rarity: 'rare'
  },
  {
    id: 'bucket_list_mode',
    icon: '📋',
    name: { zh: '遺願清單模式', en: 'Bucket List Mode' },
    desc: { zh: '把每一天都當作世界末日般燃燒生命狂歡', en: 'Lived every waking minute like the apocalypse was scheduled tonight' },
    rarity: 'rare'
  },
  {
    id: 'visit_contest',
    icon: '🏥',
    name: { zh: '探病繼承大賽', en: 'Inheritance Contestant' },
    desc: { zh: '在富有遠親病房前展現出奧斯卡級別的純真孝心', en: 'Executed tearful Oscar-winning vigilances at wealthy bedsides' },
    rarity: 'rare'
  },
  {
    id: 'former_informant',
    icon: '🕶️',
    name: { zh: '前聯邦線人', en: 'Former Informant' },
    desc: { zh: '換了三個假身份依然改不掉隨時看後視鏡的習慣', en: 'Lives under three aliases, always checks rear-view mirrors' },
    rarity: 'rare'
  },
  {
    id: 'wine_enthusiast',
    icon: '🍷',
    name: { zh: '紅酒品味家', en: 'Wine Enthusiast' },
    desc: { zh: '盲品一口就能精確說出葡萄藤當年的降雨毫米數', en: 'Identified harvest rainfall in millimeters from a single sip' },
    rarity: 'rare'
  },
  {
    id: 'ai_art_investor',
    icon: '🎨',
    name: { zh: 'AI 藝術投資者', en: 'AI Art Investor' },
    desc: { zh: '用一千顆以太幣買下一張由隨機噪波生成的算力廢圖', en: 'Spent 1000 ETH on generative algorithmic white noise' },
    rarity: 'rare'
  },
  {
    id: 'frugal_investor',
    icon: '📈',
    name: { zh: '指數基金定投者', en: 'Index Investor' },
    desc: { zh: '靠著長達數十年的指數定投跨越了階級門檻', en: 'Compounded monthly index purchases into generational security' },
    rarity: 'rare'
  },
  {
    id: 'proven_leader',
    icon: '🛡️',
    name: { zh: '關鍵專案領袖', en: 'Proven Leader' },
    desc: { zh: '在專案瀕臨崩盤的至暗時刻力挽狂瀾逆轉勝', en: 'Turned catastrophic project collapse into resounding victory' },
    rarity: 'rare'
  },
  {
    id: 'happily_married',
    icon: '💖',
    name: { zh: '攜手終生伴侶', en: 'Happily Married' },
    desc: { zh: '穿過生活的風暴與瑣碎，依然是彼此眼中的光', en: 'Weathered decades of storm and remain each other light' },
    rarity: 'rare'
  },
  {
    id: 'box_found',
    icon: '📦',
    name: { zh: '發現神秘箱', en: 'Mysterious Box' },
    desc: { zh: '在閣樓角落發現了散發危險微光的古老金屬箱', en: 'Discovered the faintly humming metallic relic in the attic' },
    rarity: 'rare'
  },
  {
    id: 'box_opened',
    icon: '🔓',
    name: { zh: '開箱者', en: 'Box Opener' },
    desc: { zh: '不顧警告揭開了封印，釋放了不可逆轉的命運連鎖', en: 'Defied safety seals and triggered irreversible sequence events' },
    rarity: 'rare'
  },
  {
    id: 'box_sold',
    icon: '💰',
    name: { zh: '轉賣神秘箱', en: 'Box Resold' },
    desc: { zh: '把充滿詛咒與秘密的箱子高價倒手給下一位倒楣鬼', en: 'Flipped cursed extraterrestrial relics for huge cash returns' },
    rarity: 'rare'
  },
  {
    id: 'box_trouble',
    icon: '⚠️',
    name: { zh: '箱中麻煩', en: 'Box Trouble' },
    desc: { zh: '被黑衣人與特勤組徹夜追查神秘箱的下落', en: 'Tracked across continents by federal black-ops recovery units' },
    rarity: 'rare'
  },

  // Common Medals
  {
    id: 'mortgage_slave',
    icon: '📜',
    name: { zh: '終身房奴', en: 'Mortgage Bound' },
    desc: { zh: '將未來三十年的人生精華奉獻給水泥鋼筋與銀行利息', en: 'Pledged the next 30 years to concrete and bank interest' },
    rarity: 'common'
  },
  {
    id: 'modest_roommate',
    icon: '🤝',
    name: { zh: '低調室友', en: 'Modest Roommate' },
    desc: { zh: '在繁華都市中維持低調互助的純粹室友情誼', en: 'Maintained humble and loyal camaraderie in the big city' },
    rarity: 'common'
  },
  {
    id: 'cold_war_home',
    icon: '🧊',
    name: { zh: '家庭冷戰', en: 'Home Cold War' },
    desc: { zh: '客廳溫度低於絕對零度的家庭沉默修羅場', en: 'Mastered sub-zero living room domestic standoffs' },
    rarity: 'common'
  },
  {
    id: 'bag_holder',
    icon: '📉',
    name: { zh: '迷因接盤俠', en: 'Bag Holder' },
    desc: { zh: '在高點接過最後一棒並堅定鑽石手至今', en: 'Held through a 99% drawdown with unwavering diamond hands' },
    rarity: 'common'
  },
  {
    id: 'hacked_lie',
    icon: '💻',
    name: { zh: '被駭謊言', en: 'Hacked Lie' },
    desc: { zh: '精心編造的謊言在聊天記錄洩漏時徹底穿幫', en: 'Carefully woven cover stories unraveled in group chat leaks' },
    rarity: 'common'
  },
  {
    id: 'boss_grudge',
    icon: '💢',
    name: { zh: '老闆記恨', en: 'Boss Grudge' },
    desc: { zh: '在全體大會上不小心當面戳穿了老闆最得意的謊言', en: 'Accidentally shattered the CEO vanity in an all-hands meeting' },
    rarity: 'common'
  },
  {
    id: 'snitch',
    icon: '🐀',
    name: { zh: '職場告密者', en: 'Whistleblower Snitch' },
    desc: { zh: '為了保住飯碗不得不向人事總監提交秘密名單', en: 'Turned in colleague browser history for quarterly bonuses' },
    rarity: 'common'
  },
  {
    id: 'took_hush_money',
    icon: '💼',
    name: { zh: '收受封口費', en: 'Accepted Hush Money' },
    desc: { zh: '在良心與鉅款之間選擇了提早財富自由', en: 'Traded moral outrage for early retirement in the Bahamas' },
    rarity: 'common'
  },
  {
    id: 'lemon_car',
    icon: '🚗',
    name: { zh: '檸檬老爺車', en: 'Lemon Car Owner' },
    desc: { zh: '每天上路都是對命運與零件耐受力的豪賭', en: 'Every daily commute is a death-defying engineering bet' },
    rarity: 'common'
  },
  {
    id: 'car_debt',
    icon: '🔧',
    name: { zh: '修車負債', en: 'Auto Debt' },
    desc: { zh: '修車費用足以買下一棟郊區小別墅', en: 'Spent more on spare gaskets than a suburban apartment' },
    rarity: 'common'
  },
  {
    id: 'mlm_boxes',
    icon: '📦',
    name: { zh: '直銷庫存山', en: 'MLM Stockpile' },
    desc: { zh: '客廳堆滿了連自己都不敢喝的神奇能量水', en: 'Living room barricaded by unsellable wellness miracle tonics' },
    rarity: 'common'
  },
  {
    id: 'cosigned_loan',
    icon: '✍️',
    name: { zh: '連帶保證人', en: 'Co-signed Loan' },
    desc: { zh: '替「過命兄弟」簽字，然後兄弟人間蒸發', en: 'Signed guaranteed loans for sworn brothers who vanished overnight' },
    rarity: 'common'
  },
  {
    id: 'reunion_liar',
    icon: '🥂',
    name: { zh: '同學會吹牛王', en: 'Reunion Fabulist' },
    desc: { zh: '租來超跑與名錶成為全場最風光的虛擬富豪', en: 'Rented supercars and diamond dials to conquer high school reunions' },
    rarity: 'common'
  },
  {
    id: 'neighbor_war',
    icon: '🧱',
    name: { zh: '鄰里交戰者', en: 'Neighbor War' },
    desc: { zh: '與隔壁鄰居展開長達數年的割草機噪音冷戰', en: 'Waged endless turf skirmishes over midnight lawnmower volume' },
    rarity: 'common'
  },
  {
    id: 'office_feud',
    icon: '☕',
    name: { zh: '辦公室世仇', en: 'Office Feud' },
    desc: { zh: '在微波爐魚肉與標籤咖啡之間展開頂級暗戰', en: 'Mastered passive-aggressive microwave retaliation tactics' },
    rarity: 'common'
  },
  {
    id: 'scam_victim',
    icon: '💸',
    name: { zh: '殺豬盤受害者', en: 'Scam Victim' },
    desc: { zh: '被「海外將軍」騙光存款後領悟了人生真諦', en: 'Attained enlightenment after wiring tuition to foreign admirals' },
    rarity: 'common'
  },
  {
    id: 'rental_horror',
    icon: '🔑',
    name: { zh: '凶殘房東租客', en: 'Rental Horror Survivor' },
    desc: { zh: '成功扣留二十任租客的所有押金並全身而退', en: 'Withheld twenty security deposits with surgical precision' },
    rarity: 'common'
  },
  {
    id: 'cohabiting',
    icon: '🏠',
    name: { zh: '同居中', en: 'Cohabiting' },
    desc: { zh: '在洗碗順序與牙膏擠法中學會生存智慧', en: 'Learned survival in toothpaste cap and dirty dish wars' },
    rarity: 'common'
  },
  {
    id: 'commitment_issues',
    icon: '🏃',
    name: { zh: '承諾恐懼症', en: 'Commitment Phobic' },
    desc: { zh: '一旦聽到「我們未來」就觸發百米衝刺反射神經', en: 'Triggered 100m sprint reflexes upon hearing "our future"' },
    rarity: 'common'
  },
  {
    id: 'flirt_risk',
    icon: '🔥',
    name: { zh: '曖昧危險期', en: 'Flirt Risk' },
    desc: { zh: '在翻車與心跳加速的鋼絲繩上跳探戈', en: 'Danced tango along the razor edge of relationship disaster' },
    rarity: 'common'
  },
  {
    id: 'homeowner',
    icon: '🏡',
    name: { zh: '有房一族', en: 'Homeowner' },
    desc: { zh: '在寸土寸金的水泥叢林中釘下了屬於自己的避風港', en: 'Secured permanent soil in the heart of concrete jungles' },
    rarity: 'common'
  },
  {
    id: 'frugal_discipline',
    icon: '🪙',
    name: { zh: '自律儲蓄者', en: 'Frugal Discipline' },
    desc: { zh: '把每一分省下來的錢都轉化為自由的籌碼', en: 'Converted every pinched cent into sovereignty and freedom' },
    rarity: 'common'
  },
  {
    id: 'fake_fiance',
    icon: '🎭',
    name: { zh: '假冒伴侶', en: 'Fake Partner' },
    desc: { zh: '在金錢與謊言中簽下假訂婚合約卻暗生情愫', en: 'Signed fake engagement papers for cash, developed real feelings' },
    rarity: 'common'
  },
  {
    id: 'night_owl',
    icon: '🌙',
    name: { zh: '夜貓子', en: 'Night Owl' },
    desc: { zh: '當全世界沉睡時，你的靈感才剛剛在黑夜綻放', en: 'Blooms into brilliant focus while the rest of humanity sleeps' },
    rarity: 'common'
  },
];

export const MEDAL_MAP: Record<string, Medal> = ALL_MEDALS.reduce((acc, m) => {
  acc[m.id] = m;
  return acc;
}, {} as Record<string, Medal>);

export function getMedalById(id: string): Medal {
  if (MEDAL_MAP[id]) {
    return MEDAL_MAP[id];
  }
  // Fallback for custom or generated flags
  const zh = id.replace(/_/g, ' ');
  const en = id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    id,
    icon: '🎖️',
    name: { zh, en },
    desc: { zh: '在人生旅途中獲得的珍稀烙印', en: 'A unique mark acquired during life journey' },
    rarity: 'common'
  };
}

export function getTraitLabel(flag: string, language: Language): string {
  const m = getMedalById(flag);
  return m.name[language];
}

export function getTraitIcon(flag: string): string {
  const m = getMedalById(flag);
  return m.icon;
}

const STORAGE_KEY = 'life_glitch_unlocked_medals';

export function getUnlockedMedalIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveUnlockedMedalIds(newFlags: string[]): string[] {
  if (typeof window === 'undefined') return newFlags;
  try {
    const existing = new Set(getUnlockedMedalIds());
    for (const f of newFlags) {
      if (f) existing.add(f);
    }
    const combined = Array.from(existing);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
    return combined;
  } catch {
    return newFlags;
  }
}
