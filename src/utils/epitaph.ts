import { GameState, LocalizedString } from '../types/game';

export interface EpitaphResult {
  title: LocalizedString;
  tagline: LocalizedString;
  summary: LocalizedString;
  badge: LocalizedString;
}

export function generateEpitaph(state: GameState): EpitaphResult {
  const { money, stress, happiness, flags, age } = state;

  // 1. Check flavor flags priority
  if (flags.includes('wedding_crasher')) {
    return {
      title: { en: 'The Uninvited Guest', zh: '婚禮不速之客' },
      tagline: { en: 'Drank top-shelf champagne at strangers’ weddings and gave legendary speeches.', zh: '在陌生人的婚禮上暢飲高檔香檳，還上台發表了傳奇演說。' },
      summary: { en: 'You never needed an invitation to be the center of the party.', zh: '你從不需要邀請函就能成為派對的核心。' },
      badge: { en: 'PARTY PHANTOM', zh: '派對幻影' }
    };
  }

  if (flags.includes('ai_ghost') || flags.includes('ai_lover')) {
    return {
      title: { en: 'The Cyber Widower', zh: '與盜版語音助理相伴的賽博遺孀' },
      tagline: { en: 'Illegally pirated your digital soulmate into a kitchen smart speaker.', zh: '非法把數位靈魂伴侶備份進廚房智慧喇叭共度餘生。' },
      summary: { en: 'While humans squabbled, your heart beat in sync with algorithmic love.', zh: '在人類爭執不休時，你的心跳早已與演算法同步。' },
      badge: { en: 'CYBER ROMANTIC', zh: '賽博情人' }
    };
  }

  if (flags.includes('biker_midlife')) {
    return {
      title: { en: 'The Wheelchair Rebel', zh: '坐輪椅炸街的銀髮哈雷騎士' },
      tagline: { en: 'Raced mobility scooters down suburban avenues with zero regrets.', zh: '騎著改裝代步車在郊區大道呼嘯而過，此生毫無遺憾。' },
      summary: { en: 'Born to ride, forced to nap, forever noisy.', zh: '生而為騎，被迫午睡，永遠轟鳴。' },
      badge: { en: 'ROAD REBEL', zh: '公路叛逆者' }
    };
  }

  if (flags.includes('witness_celebrity')) {
    return {
      title: { en: 'The Meme Informant', zh: '登上全球新聞的逃稅案證人' },
      tagline: { en: 'Testified against international syndicates and became an internet GIF.', zh: '在國際洗錢案出庭作證，並光榮化身全網瘋傳的迷因動圖。' },
      summary: { en: 'Your 15 minutes of federal courthouse fame lasted a lifetime.', zh: '你在聯邦法院門口的十五分鐘成名，被網路永遠銘記。' },
      badge: { en: 'GLOBAL MEME', zh: '全球迷因' }
    };
  }

  if (flags.includes('squirrel_secretary')) {
    return {
      title: { en: 'Secretary to the Squirrels', zh: '松鼠帝國兼職祕書' },
      tagline: { en: 'Replied to acorn correspondence and maintained peace in the canopy.', zh: '辛勤回覆橡實公文，守護了整個樹冠王國的和平。' },
      summary: { en: 'Humans never understood your true geopolitical significance among rodents.', zh: '人類從未參透你在松鼠政治舞台上的崇高地位。' },
      badge: { en: 'RODENT DIPLOMAT', zh: '松鼠外交官' }
    };
  }

  if (flags.includes('founder') || flags.includes('founder_ceo')) {
    return {
      title: { en: 'The Delusional Founder', zh: '燃燒積蓄的狂熱創業者' },
      tagline: { en: 'Traded sleep and mental sanity for equity in a dying startup.', zh: '用睡眠與理智換取瀕臨破產新創的無價值股權。' },
      summary: { en: 'You pitched pitch-decks to the grave, confident the next pivot was coming.', zh: '直到入土那一刻，你仍在向天使投資人宣傳下一個顛覆性點子。' },
      badge: { en: 'STARTUP MARTYR', zh: '創業殉道者' }
    };
  }

  if (flags.includes('mansion_curse') || flags.includes('ghost_accountants')) {
    return {
      title: { en: 'The Haunted Landlord', zh: '鬧鬼豪宅的通靈房東' },
      tagline: { en: 'Coexisted with Victorian poltergeists to avoid paying city rent.', zh: '為省下房租，與維多利亞時代的鬼魂室友達成和平協議。' },
      summary: { en: 'The ghosts even helped calculate your deduction margins.', zh: '幽靈甚至還幫忙扣繳了你的年度所得稅。' },
      badge: { en: 'SPECTRAL RESIDENT', zh: '通靈住民' }
    };
  }

  if (flags.includes('vac_weaponized')) {
    return {
      title: { en: 'The Vacuum Warlord', zh: '飛天吸塵器軍火商' },
      tagline: { en: 'Inadvertently equipped small nations with hovering home appliances.', zh: '不小心把客廳吹風吸塵器研發成了推翻政權的浮空兵器。' },
      summary: { en: 'Your patent was peaceful; the military coup was not.', zh: '你的專利純屬和平，但軍事政變可不是。' },
      badge: { en: 'DOMESTIC WARLORD', zh: '家電軍閥' }
    };
  }

  // 2. High age / Century victory
  if (age >= 100) {
    return {
      title: { en: 'The Simulation Glitcher', zh: '活過一個世紀的傳奇' },
      tagline: { en: 'Survived 100 years of chaotic bugs, bad decisions, and system patches.', zh: '在混亂的系統漏洞、離譜決策與日常磨難中頑強活滿了一百年。' },
      summary: { en: 'You broke through the simulation barrier through sheer stubbornness.', zh: '你憑藉超凡的頑固，成功擊穿了整個人生模擬器的底層代碼。' },
      badge: { en: 'CENTURY SURVIVOR', zh: '世紀存活者' }
    };
  }

  // 3. Fame & Reputation Archetypes
  if ((state.fame || 0) >= 60) {
    return {
      title: { en: 'The Viral Icon', zh: '舉世矚目的傳奇巨星' },
      tagline: { en: 'Recognized in every corner of the simulation, your name trended across every feed.', zh: '名字長年登頂全網熱搜頭條，舉手投足都牽動著無數粉絲與媒體的目光。' },
      summary: { en: 'You turned existence into a spectacle and carved your legacy into popular lore.', zh: '你把平凡的人生化為璀璨的聚光燈舞台，成為不可忽視的時代圖騰。' },
      badge: { en: 'GLOBAL ICON', zh: '全球巨星' }
    };
  }

  if ((state.fame || 0) >= 35) {
    return {
      title: { en: 'The Acclaimed Luminary', zh: '名滿江湖的行業翹楚' },
      tagline: { en: 'Held high esteem in public circles with deep professional credibility.', zh: '在業界聲名赫赫，無論出席哪一場峰會論壇，都享有極高聲譽與號召力。' },
      summary: { en: 'Your reputation opened doors that money alone could never unlock.', zh: '你的名望與影響力，為你開啟了金錢難以買到的崇高禮遇。' },
      badge: { en: 'DISTINGUISHED FIGURE', zh: '名流領袖' }
    };
  }

  // 4. Stat-based archetypes
  if (money >= 150000 && stress <= 40) {
    return {
      title: { en: 'The Prudent Tycoon', zh: '從容自得的理財大師' },
      tagline: { en: 'Built lasting wealth through discipline, steady salary, and zero reckless gambles.', zh: '憑藉勤懇工作、豐厚年薪與理智抉擇，在低壓力中累積出令無數人羨慕的從容身家。' },
      summary: { en: 'Proved that winning the simulation does not require burning your mind.', zh: '證明了在充斥代碼漏洞的世界裡，理智、健康與財富完全可以完美兼得。' },
      badge: { en: 'WEALTH MASTER', zh: '富足大師' }
    };
  }

  if (money >= 500000 && stress >= 80) {
    return {
      title: { en: 'The Burnout Millionaire', zh: '燃盡自我的過勞富豪' },
      tagline: { en: 'Died clutching a high net-worth portfolio and severe hypertension.', zh: '手握龐大流動資產，卻在嚴重心血管崩潰中撒手人寰。' },
      summary: { en: 'You won capitalism, but lost the biological warranty.', zh: '你贏得了資本遊戲，卻透支了肉體的保固期。' },
      badge: { en: 'BURNOUT TYCOON', zh: '過勞巨賈' }
    };
  }

  if (money >= 300000 && happiness >= 70) {
    return {
      title: { en: 'The Joyful Aristocrat', zh: '財富自由的享樂宗師' },
      tagline: { en: 'Made heaps of cash and spent it strictly on joy and indulgence.', zh: '賺進大筆鈔票，並毫不猶豫地全數揮霍在純粹的快樂與享受上。' },
      summary: { en: 'You mastered the rare art of being rich and happy at the same time.', zh: '你精通了既腰纏萬貫又能開懷大笑的罕見藝術。' },
      badge: { en: 'HEDONIST MOGUL', zh: '享樂巨亨' }
    };
  }

  if (money < -20000) {
    return {
      title: { en: 'The Subprime Legend', zh: '負債累累的江湖傳奇' },
      tagline: { en: 'Left behind mountain-sized debts that bankers will mourn for decades.', zh: '留下了堆積如山的債務，讓銀行家們為你默哀數十年。' },
      summary: { en: 'If you owe the bank $1,000, it’s your problem. If you owe $50,000, it’s theirs.', zh: '欠銀行一千元是你的問題；欠銀行五萬元是銀行的問題。' },
      badge: { en: 'DEBT OUTLAW', zh: '負債亡命徒' }
    };
  }

  if (stress >= 90) {
    return {
      title: { en: 'The Human Pressure Cooker', zh: '瀕臨引爆的壓力鍋' },
      tagline: { en: 'Fueled entirely by black coffee, panics, and unanswered emails.', zh: '全靠黑咖啡、焦慮驚嚇與未回覆的電子郵件維繫生命體徵。' },
      summary: { en: 'May your afterlife finally come with Do-Not-Disturb mode turned on.', zh: '願你在另一個世界終於能永久開啟「請勿打擾」模式。' },
      badge: { en: 'CRITICAL VOLTAGE', zh: '極限電壓' }
    };
  }

  // Default title
  return {
    title: { en: 'The Glitched Wanderer', zh: '失序宇宙的漫遊者' },
    tagline: { en: 'Made choices, tasted the absurd, and reached the final credits.', zh: '做出了選擇，嚐遍了荒誕，並順利見證了劇終名單。' },
    summary: { en: 'You lived through the glitch on your own terms.', zh: '你以自己的步調，度過了充滿漏洞與意外的一生。' },
    badge: { en: 'SIMULATION ESCAPEE', zh: '模擬倖存者' }
  };
}

export function determineDeathReason(state: GameState): LocalizedString {
  if (state.age >= 100) {
    return {
      en: 'Retired peacefully at age 100 having conquered the simulation.',
      zh: '於 100 歲安詳退休，成功擊敗了人生模擬器的所有挑戰。'
    };
  }
  if (state.health <= 0) {
    return {
      en: 'Physical health dropped to 0%. Your biological hardware suffered a fatal crash.',
      zh: '健康值歸零。你的肉身硬體遭遇無法復原的致命當機。'
    };
  }
  if (state.stress >= 100) {
    return {
      en: 'Suffered acute cardiovascular collapse under severe, continuous stress overload.',
      zh: '在巨大精神打擊與連續極限高壓下，心臟過載當場停機。'
    };
  }
  if (state.happiness <= 0) {
    return {
      en: 'Happiness dropped to 0%. Relinquished all worldly assets and faded quietly into the woods.',
      zh: '快樂值歸零。放棄了所有俗世名利，靜靜走入森林消隱無蹤。'
    };
  }
  return {
    en: 'An unexpected reality glitch abruptly terminated your session.',
    zh: '一場突如其來的現實代碼錯誤終止了你的本次生命進程。'
  };
}
