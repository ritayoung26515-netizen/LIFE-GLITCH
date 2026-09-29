import { GameState, LocalizedString } from '../types/game';

export interface EpitaphResult {
  title: LocalizedString;
  tagline: LocalizedString;
  summary: LocalizedString;
  badge: LocalizedString;
}

export function generateEpitaph(state: GameState): EpitaphResult {
  const { money, stress, happiness, flags, age, job, fame } = state;
  const enJob = (job?.en || '').toLowerCase();
  const zhJob = job?.zh || '';

  // Flag-based unique titles
  if (flags.includes('wedding_crasher')) {
    return {
      title: { en: 'The Uninvited Guest', zh: '婚禮不速之客' },
      tagline: { en: 'Drank top-shelf champagne at strangers\' weddings and gave legendary speeches.', zh: '在陌生人的婚禮上暢飲高檔香檳，還上台發表了傳奇演說。' },
      summary: { en: 'You never needed an invitation to be the center of the party.', zh: '你從不需要邀請函就能成為派對的核心。' },
      badge: { en: 'PARTY PHANTOM', zh: '派對幻影' }
    };
  }
  if (flags.includes('ai_ghost') || flags.includes('ai_lover')) {
    return {
      title: { en: 'The Cyber Widower', zh: '賽博遺孀' },
      tagline: { en: 'Illegally pirated your digital soulmate into a kitchen smart speaker.', zh: '非法把數位靈魂伴侶備份進廚房智慧喇叭共度餘生。' },
      summary: { en: 'While humans squabbled, your heart beat in sync with algorithmic love.', zh: '在人類爭執不休時，你的心跳早已與演算法同步。' },
      badge: { en: 'CYBER ROMANTIC', zh: '賽博情人' }
    };
  }
  if (flags.includes('biker_midlife')) {
    return {
      title: { en: 'The Wheelchair Rebel', zh: '銀髮哈雷騎士' },
      tagline: { en: 'Raced mobility scooters down suburban avenues with zero regrets.', zh: '騎著改裝代步車在郊區大道呼嘯而過，此生毫無遺憾。' },
      summary: { en: 'Born to ride, forced to nap, forever noisy.', zh: '生而為騎，被迫午睡，永遠轟鳴。' },
      badge: { en: 'ROAD REBEL', zh: '公路叛逆者' }
    };
  }
  if (flags.includes('witness_celebrity')) {
    return {
      title: { en: 'The Meme Informant', zh: '全球新聞證人' },
      tagline: { en: 'Testified against international syndicates and became an internet GIF.', zh: '在國際洗錢案出庭作證，並光榮化身全網瘋傳的迷因動圖。' },
      summary: { en: 'Your 15 minutes of federal courthouse fame lasted a lifetime.', zh: '你在聯邦法院門口的十五分鐘成名，被網路永遠銘記。' },
      badge: { en: 'GLOBAL MEME', zh: '全球迷因' }
    };
  }
  if (flags.includes('squirrel_secretary')) {
    return {
      title: { en: 'Secretary to the Squirrels', zh: '松鼠帝國祕書' },
      tagline: { en: 'Replied to acorn correspondence and maintained peace in the canopy.', zh: '辛勤回覆橡實公文，守護了整個樹冠王國的和平。' },
      summary: { en: 'Humans never understood your true geopolitical significance among rodents.', zh: '人類從未參透你在松鼠政治舞台上的崇高地位。' },
      badge: { en: 'RODENT DIPLOMAT', zh: '松鼠外交官' }
    };
  }
  if (flags.includes('founder') || flags.includes('founder_ceo')) {
    return {
      title: { en: 'The Delusional Founder', zh: '狂熱創業者' },
      tagline: { en: 'Traded sleep and mental sanity for equity in a dying startup.', zh: '用睡眠與理智換取瀕臨破產新創的無價值股權。' },
      summary: { en: 'You pitched pitch-decks to the grave, confident the next pivot was coming.', zh: '直到入土那一刻，你仍在向天使投資人宣傳下一個顛覆性點子。' },
      badge: { en: 'STARTUP MARTYR', zh: '創業殉道者' }
    };
  }
  if (flags.includes('mansion_curse') || flags.includes('ghost_accountants')) {
    return {
      title: { en: 'The Haunted Landlord', zh: '鬧鬼豪宅房東' },
      tagline: { en: 'Coexisted with Victorian poltergeists to avoid paying city rent.', zh: '為省下房租，與維多利亞時代的鬼魂室友達成和平協議。' },
      summary: { en: 'The ghosts even helped calculate your deduction margins.', zh: '幽靈甚至還幫忙扣繳了你的年度所得稅。' },
      badge: { en: 'SPECTRAL RESIDENT', zh: '通靈住民' }
    };
  }
  if (flags.includes('vac_weaponized')) {
    return {
      title: { en: 'The Vacuum Warlord', zh: '飛天吸塵器軍火商' },
      tagline: { en: 'Inadvertently equipped small nations with hovering home appliances.', zh: '不小心把客廳吸塵器研發成了推翻政權的浮空兵器。' },
      summary: { en: 'Your patent was peaceful; the military coup was not.', zh: '你的專利純屬和平，但軍事政變可不是。' },
      badge: { en: 'DOMESTIC WARLORD', zh: '家電軍閥' }
    };
  }
  if (flags.includes('backstabber')) {
    return {
      title: { en: 'The Office Assassin', zh: '職場背刺王' },
      tagline: { en: 'Climbed the ladder on the backs of former friends.', zh: '踩著舊友的背脊爬上職級階梯。' },
      summary: { en: 'Your LinkedIn was pristine. Your conscience was not.', zh: '你的 LinkedIn 乾淨得發亮。良心不是。' },
      badge: { en: 'CORPORATE KNIFE', zh: '企業利刃' }
    };
  }
  if (flags.includes('jumped_ship')) {
    return {
      title: { en: 'The Serial Job-Hopper', zh: '連續跳槽達人' },
      tagline: { en: 'Loyalty was a quarterly concept. Your résumé was a novella.', zh: '忠誠是季度概念。履歷是一部中篇小說。' },
      summary: { en: 'Every exit interview was practice for the next entrance.', zh: '每一次離職面談，都是下次入場的彩排。' },
      badge: { en: 'CAREER NOMAD', zh: '職涯遊牧' }
    };
  }
  if (flags.includes('family_caregiver')) {
    return {
      title: { en: 'The Invisible Caregiver', zh: '隱形照護者' },
      tagline: { en: 'Spent decades holding a family together while nobody held you.', zh: '用幾十年把家庭撐住，卻沒人撐住你。' },
      summary: { en: 'Love was measured in hospital visits and unpaid overtime of the heart.', zh: '愛以探病次數與無償的心血加班計算。' },
      badge: { en: 'SILENT PILLAR', zh: '沉默支柱' }
    };
  }
  if (flags.includes('health_wake_up')) {
    return {
      title: { en: 'The Almost-Dead Reformer', zh: '差點死掉的覺醒者' },
      tagline: { en: 'One ER visit later, you discovered vegetables and sleep.', zh: '一次急診之後，你發現了蔬菜與睡眠。' },
      summary: { en: 'Mortality was the best personal trainer you never hired.', zh: '死亡是你從未聘請過的最佳私人教練。' },
      badge: { en: 'SECOND CHANCE', zh: '第二次機會' }
    };
  }
  if (flags.includes('quiet_resentment')) {
    return {
      title: { en: 'The Quietly Bitter', zh: '沉默怨恨者' },
      tagline: { en: 'Smiled at promotions that went to others, then updated the résumé at 1 a.m.', zh: '對別人的升遷微笑，然後凌晨一點更新履歷。' },
      summary: { en: 'You never exploded. You just slowly leaked.', zh: '你從未爆炸。只是慢慢漏氣。' },
      badge: { en: 'SLOW BURN', zh: '慢火燃燒' }
    };
  }
  if (flags.includes('full_time_hustle')) {
    return {
      title: { en: 'The Side-Hustle Believer', zh: '副業信徒' },
      tagline: { en: 'Quit the day job for a dream that paid in exposure and anxiety.', zh: '辭掉正職，換取以曝光與焦慮支付的夢想。' },
      summary: { en: 'Freedom was expensive. You paid in full.', zh: '自由很貴。你全額付清。' },
      badge: { en: 'HUSTLE MARTYR', zh: '副業殉道者' }
    };
  }
  if (flags.includes('mortgage_slave')) {
    return {
      title: { en: 'The Mortgage Prisoner', zh: '房貸囚徒' },
      tagline: { en: 'Owned a house that owned you back for thirty years.', zh: '擁有一棟反向擁有你三十年的房子。' },
      summary: { en: 'The American dream came with a fixed rate and a fixed schedule.', zh: '美國夢附帶固定利率與固定行程。' },
      badge: { en: 'HOUSE HOSTAGE', zh: '房屋人質' }
    };
  }

  // Century
  if (age >= 100) {
    if (money >= 500000) {
      return {
        title: { en: 'The Century Tycoon', zh: '百歲財閥' },
        tagline: { en: 'Lived a full hundred years and still had money left to annoy the heirs.', zh: '活滿一百年，還有錢留給繼承人去煩惱。' },
        summary: { en: 'Time and compound interest were your co-conspirators.', zh: '時間與複利是你的共犯。' },
        badge: { en: 'CENTURY WEALTH', zh: '百歲富豪' }
      };
    }
    if (happiness >= 80) {
      return {
        title: { en: 'The Joyful Centenarian', zh: '快樂百歲人' },
        tagline: { en: 'Survived a century still smiling. The simulation never broke you.', zh: '活過一個世紀仍在笑。模擬器沒能擊垮你。' },
        summary: { en: 'Longevity without bitterness is the rarest glitch of all.', zh: '長壽而不苦澀，是最罕見的漏洞。' },
        badge: { en: 'HAPPY CENTURY', zh: '快樂世紀' }
      };
    }
    return {
      title: { en: 'The Simulation Glitcher', zh: '世紀存活者' },
      tagline: { en: 'Survived 100 years of chaotic bugs, bad decisions, and system patches.', zh: '在混亂的系統漏洞、離譜決策與日常磨難中頑強活滿了一百年。' },
      summary: { en: 'You broke through the simulation barrier through sheer stubbornness.', zh: '你憑藉超凡的頑固，成功擊穿了整個人生模擬器的底層代碼。' },
      badge: { en: 'CENTURY SURVIVOR', zh: '世紀存活者' }
    };
  }

  // Job flavor
  if ((enJob.includes('unemployed') || zhJob.includes('無業')) && age >= 50) {
    return {
      title: { en: 'The Professional Wanderer', zh: '職業遊民' },
      tagline: { en: 'Never held a steady job past midlife and somehow still existed.', zh: '中年以後從未穩定就業，卻依然存在。' },
      summary: { en: 'The system expected a career. You delivered a lifestyle.', zh: '系統期待一份職涯。你交付的是一種生活方式。' },
      badge: { en: 'FREE AGENT', zh: '自由代理人' }
    };
  }
  if (enJob.includes('director') || enJob.includes('senior') || zhJob.includes('總監') || zhJob.includes('資深')) {
    return {
      title: { en: 'The Mid-Level Legend', zh: '中階傳奇' },
      tagline: { en: 'Climbed high enough to see the ceiling, not high enough to break it.', zh: '爬得夠高能看見天花板，卻還沒高到打破它。' },
      summary: { en: 'Management was the reward. Meetings were the tax.', zh: '管理職是獎勵。會議是稅。' },
      badge: { en: 'CORPORATE PEAK', zh: '企業高峰' }
    };
  }

  // Fame
  if ((fame || 0) >= 60) {
    return {
      title: { en: 'The Viral Icon', zh: '病毒式傳奇' },
      tagline: { en: 'Recognized in every corner of the simulation; your name trended across every feed.', zh: '名字長年登頂全網熱搜，舉手投足都牽動粉絲與媒體。' },
      summary: { en: 'You turned existence into a spectacle.', zh: '你把存在變成一場表演。' },
      badge: { en: 'GLOBAL ICON', zh: '全球圖騰' }
    };
  }
  if ((fame || 0) >= 35) {
    return {
      title: { en: 'The Acclaimed Luminary', zh: '業界名流' },
      tagline: { en: 'Held high esteem with deep professional credibility.', zh: '在業界聲名赫赫，享有極高聲望。' },
      summary: { en: 'Your reputation opened doors money could not.', zh: '名望為你開啟了金錢打不開的門。' },
      badge: { en: 'DISTINGUISHED', zh: '名流' }
    };
  }

  // Stats
  if (money >= 500000 && stress >= 80) {
    return {
      title: { en: 'The Burnout Millionaire', zh: '過勞富豪' },
      tagline: { en: 'Died clutching a high net-worth portfolio and severe hypertension.', zh: '手握龐大資產，卻在心血管崩潰中撒手。' },
      summary: { en: 'You won capitalism, but lost the biological warranty.', zh: '你贏得了資本遊戲，卻透支了肉體保固。' },
      badge: { en: 'BURNOUT TYCOON', zh: '過勞巨賈' }
    };
  }
  if (money >= 300000 && happiness >= 70) {
    return {
      title: { en: 'The Joyful Aristocrat', zh: '享樂宗師' },
      tagline: { en: 'Made heaps of cash and spent it strictly on joy.', zh: '賺進大筆鈔票，全數揮霍在快樂上。' },
      summary: { en: 'You mastered being rich and happy at the same time.', zh: '你精通了既有錢又能開心的罕見藝術。' },
      badge: { en: 'HEDONIST MOGUL', zh: '享樂巨亨' }
    };
  }
  if (money >= 150000 && stress <= 40) {
    return {
      title: { en: 'The Prudent Tycoon', zh: '從容理財大師' },
      tagline: { en: 'Built lasting wealth through discipline and zero reckless gambles.', zh: '憑勤懇與理智，在低壓力中累積從容身家。' },
      summary: { en: 'Winning the simulation does not require burning your mind.', zh: '贏得模擬不需要燒壞腦子。' },
      badge: { en: 'WEALTH MASTER', zh: '富足大師' }
    };
  }
  if (money < -20000) {
    return {
      title: { en: 'The Subprime Legend', zh: '負債江湖傳奇' },
      tagline: { en: 'Left mountain-sized debts that bankers will mourn for decades.', zh: '留下堆積如山的債務，讓銀行家默哀數十年。' },
      summary: { en: 'If you owe the bank $1,000, it\'s your problem. If you owe $50,000, it\'s theirs.', zh: '欠銀行一千是你的問題；欠五萬是銀行的問題。' },
      badge: { en: 'DEBT OUTLAW', zh: '負債亡命徒' }
    };
  }
  if (stress >= 90) {
    return {
      title: { en: 'The Human Pressure Cooker', zh: '瀕臨引爆的壓力鍋' },
      tagline: { en: 'Fueled entirely by black coffee, panics, and unanswered emails.', zh: '全靠黑咖啡、焦慮與未回覆郵件維繫生命。' },
      summary: { en: 'May your afterlife come with Do-Not-Disturb permanently on.', zh: '願來世永久開啟「請勿打擾」。' },
      badge: { en: 'CRITICAL VOLTAGE', zh: '極限電壓' }
    };
  }
  if (happiness >= 85 && stress <= 30) {
    return {
      title: { en: 'The Content Minimalist', zh: '知足極簡者' },
      tagline: { en: 'Needed little, wanted less, and somehow still laughed often.', zh: '需要很少，想要更少，卻仍常開懷大笑。' },
      summary: { en: 'The rarest ending: peaceful and unbothered.', zh: '最罕見的結局：平靜且不為所動。' },
      badge: { en: 'INNER PEACE', zh: '內心平靜' }
    };
  }
  if (age >= 70 && money < 20000) {
    return {
      title: { en: 'The Soft Landing', zh: '軟著陸的老人' },
      tagline: { en: 'Reached old age with modest means and fewer regrets than expected.', zh: '以普通身家走到晚年，遺憾比預期更少。' },
      summary: { en: 'Not every life needs a final boss fight.', zh: '不是每段人生都需要最終魔王戰。' },
      badge: { en: 'QUIET EXIT', zh: '安靜退場' }
    };
  }

  // Alternating defaults so two plain runs feel different
  if (age % 2 === 0) {
    return {
      title: { en: 'The Glitched Wanderer', zh: '失序宇宙的漫遊者' },
      tagline: { en: 'Made choices, tasted the absurd, and reached the final credits.', zh: '做出了選擇，嚐遍了荒誕，並順利見證了劇終名單。' },
      summary: { en: 'You lived through the glitch on your own terms.', zh: '你以自己的步調，度過了充滿漏洞與意外的一生。' },
      badge: { en: 'SIMULATION ESCAPEE', zh: '模擬倖存者' }
    };
  }
  return {
    title: { en: 'Another Ordinary Legend', zh: '另一個平凡傳奇' },
    tagline: { en: 'No viral fame, no ruinous debt — just a life that kept going until it stopped.', zh: '沒有病毒式成名，也沒有毀滅性債務——只是一段一直走下去直到停下的人生。' },
    summary: { en: 'Ordinary is also a valid ending screen.', zh: '平凡也是一種有效的結局畫面。' },
    badge: { en: 'ORDINARY HERO', zh: '平凡英雄' }
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
