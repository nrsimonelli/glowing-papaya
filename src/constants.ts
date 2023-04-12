export const UNIT_NAME = {
  ALCRYST: 'Alcryst',
  ALEAR: 'Alear',
  ALFRED: 'Alfred',
  AMBER: 'Amber',
  ANNA: 'Anna',
  BOUCHERON: 'Boucheron',
  BUNET: 'Bunet',
  CELINE: 'Céline',
  CHLOE: 'Chloé',
  CITRINNE: 'Citrinne',
  CLANNE: 'Clanne',
  DIAMANT: 'Diamant',
  ETIE: 'Etie',
  FOGADO: 'Fogado',
  FRAMME: 'Framme',
  GOLDMARY: 'Goldmary',
  GREGORY: 'Gregory',
  HORTENSIA: 'Hortensia',
  IVY: 'Ivy',
  JADE: 'Jade',
  JEAN: 'Jean',
  KAGETSU: 'Kagetsu',
  LAPIS: 'Lapis',
  LINDON: 'Lindon',
  LOUIS: 'Louis',
  MADELINE: 'Madeline',
  MAUVIER: 'Mauvier',
  MERRIN: 'Merrin',
  NEL: 'Nel',
  PANDREO: 'Pandreo',
  PANETTE: 'Panette',
  RAFAL: 'Rafal',
  ROSADO: 'Rosado',
  SAPHIR: 'Saphir',
  SEADALL: 'Seadall',
  TIMERRA: 'Timerra',
  VANDER: 'Vander',
  VEYLE: 'Veyle',
  YUNAKA: 'Yunaka',
  ZELESTIA: 'Zelestia',
  ZELKOV: 'Zelkov',
}

export const JOB_NAME = {
  ARCHER: 'Archer',
  AVENIR: 'Avenir',
  AXE_ARMOR: 'Axe Armor',
  AXE_CAVALIER: 'Axe Cavalier',
  AXE_FIGHTER: 'Axe Fighter',
  AXE_FLIER: 'Axe Flier',
  BERSERKER: 'Berserker',
  BOW_KNIGHT: 'Bow Knight',
  CUPIDO: 'Cupido',
  DANCER: 'Dancer',
  DIVINE_DRAGON: 'Divine Dragon',
  DRAGON_CHILD: 'Dragon Child',
  ENCHANTER: 'Enchanter',
  FELL_CHILD: 'Fell Child',
  FELL_CHILD_NEL: 'Fell Child (Nel)',
  FELL_CHILD_RAFAL: 'Fell Child (Rafal)',
  GENERAL: 'General',
  GREAT_KNIGHT: 'Great Knight',
  GRIFFIN_KNIGHT: 'Griffin Knight',
  HALBERDIER: 'Halberdier',
  HERO: 'Hero',
  HIGH_PRIEST: 'High Priest',
  LANCE_ARMOR: 'Lance Armor',
  LANCE_CAVALIER: 'Lance Cavalier',
  LANCE_FIGHTER: 'Lance Fighter',
  LANCE_FLIER: 'Lance Flier',
  LINDWURM: 'Lindwurm',
  LORD_ALCRYST: 'Lord (Alcryst)',
  LORD_DIAMANT: 'Lord (Diamant)',
  MAGE: 'Mage',
  MAGE_CANNONEER: 'Mage Cannoneer',
  MAGE_KNIGHT: 'Mage Knight',
  MARTIAL_MASTER: 'Martial Master',
  MARTIAL_MONK: 'Martial Monk',
  MELUSINE: 'Melusine',
  NOBLE_ALFRED: 'Noble (Alfred)',
  NOBLE_CELINE: 'Noble (Céline)',
  PALADIN: 'Paladin',
  PICKET: 'Picket',
  ROYAL_KNIGHT: 'Royal Knight',
  SAGE: 'Sage',
  SENTINEL_FOGADO: 'Sentinel (Fogado)',
  SENTINEL_TIMERRA: 'Sentinel (Timerra)',
  SLEIPNIR_RIDER: 'Sleipnir Rider',
  SNIPER: 'Sniper',
  SUCCESSEUR: 'Successeur',
  SWORD_ARMOR: 'Sword Armor',
  SWORD_CAVALIER: 'Sword Cavalier',
  SWORD_FIGHTER: 'Sword Fighter',
  SWORD_FLIER: 'Sword Flier',
  SWORDMASTER: 'Swordmaster',
  THIEF: 'Thief',
  TIREUR_DELITE: 'Tireur d’élite',
  VIDAME: 'Vidame',
  WARRIOR: 'Warrior',
  WING_TAMER_HORTENSIA: 'Wing Tamer (Hortensia)',
  WING_TAMER_IVY: 'Wing Tamer (Ivy)',
  WOLF_KNIGHT: 'Wolf Knight',
  WYVERN_KNIGHT: 'Wyvern Knight',
}

export const JOB_GROUP = {
  ADVANCED: {
    AVENIR: {
      isExclusive: UNIT_NAME.ALFRED,
    },
    BERSERKER: {
      isExclusive: false,
    },
    BOW_KNIGHT: {
      isExclusive: false,
    },
    CUPIDO: {
      isExclusive: UNIT_NAME.FOGADO,
    },
    DIVINE_DRAGON: {
      isExclusive: UNIT_NAME.ALEAR,
    },
    ENCHANTER: {
      isExclusive: false,
    },
    GENERAL: {
      isExclusive: false,
    },
    GREAT_KNIGHT: {
      isExclusive: false,
    },
    GRIFFIN_KNIGHT: {
      isExclusive: false,
    },
    HALBERDIER: {
      isExclusive: false,
    },
    HERO: {
      isExclusive: false,
    },
    HIGH_PRIEST: {
      isExclusive: false,
    },
    LINDWURM: {
      isExclusive: UNIT_NAME.IVY,
    },
    MAGE_CANNONEER: {
      isExclusive: false,
    },
    MAGE_KNIGHT: {
      isExclusive: false,
    },
    MARTIAL_MASTER: {
      isExclusive: false,
    },
    PALADIN: {
      isExclusive: false,
    },
    PICKET: {
      isExclusive: UNIT_NAME.TIMERRA,
    },
    ROYAL_KNIGHT: {
      isExclusive: false,
    },
    SAGE: {
      isExclusive: false,
    },
    SLEIPNIR_RIDER: {
      isExclusive: UNIT_NAME.HORTENSIA,
    },
    SNIPER: {
      isExclusive: false,
    },
    SUCCESSEUR: {
      isExclusive: UNIT_NAME.DIAMANT,
    },
    SWORDMASTER: {
      isExclusive: false,
    },
    TIREUR_DELITE: {
      isExclusive: UNIT_NAME.ALCRYST,
    },
    VIDAME: {
      isExclusive: UNIT_NAME.CELINE,
    },
    WARRIOR: {
      isExclusive: false,
    },
    WOLF_KNIGHT: {
      isExclusive: false,
    },
    WYVERN_KNIGHT: {
      isExclusive: false,
    },
  },
  BASE: {
    ARCHER: {
      isExclusive: false,
    },
    AXE_ARMOR: {
      isExclusive: false,
    },
    AXE_CAVALIER: {
      isExclusive: false,
    },
    AXE_FIGHTER: {
      isExclusive: false,
    },
    AXE_FLIER: {
      isExclusive: false,
    },
    DRAGON_CHILD: {
      isExclusive: UNIT_NAME.ALEAR,
    },
    LANCE_ARMOR: {
      isExclusive: false,
    },
    LANCE_CAVALIER: {
      isExclusive: false,
    },
    LANCE_FIGHTER: {
      isExclusive: false,
    },
    LANCE_FLIER: {
      isExclusive: false,
    },
    LORD_ALCRYST: {
      isExclusive: UNIT_NAME.ALCRYST,
    },
    LORD_DIAMANT: {
      isExclusive: UNIT_NAME.DIAMANT,
    },
    MAGE: {
      isExclusive: false,
    },
    MARTIAL_MONK: {
      isExclusive: false,
    },
    NOBLE_ALFRED: {
      isExclusive: UNIT_NAME.ALFRED,
    },
    NOBLE_CELINE: {
      isExclusive: UNIT_NAME.CELINE,
    },
    SENTINEL_FOGADO: {
      isExclusive: UNIT_NAME.FOGADO,
    },
    SENTINEL_TIMERRA: {
      isExclusive: UNIT_NAME.TIMERRA,
    },
    SWORD_ARMOR: {
      isExclusive: false,
    },
    SWORD_CAVALIER: {
      isExclusive: false,
    },
    SWORD_FIGHTER: {
      isExclusive: false,
    },
    SWORD_FLIER: {
      isExclusive: false,
    },
    WING_TAMER_HORTENSIA: {
      isExclusive: UNIT_NAME.HORTENSIA,
    },
    WING_TAMER_IVY: {
      isExclusive: UNIT_NAME.IVY,
    },
  },
  SPECIAL: {
    DANCER: {
      isExclusive: UNIT_NAME.SEADALL,
    },
    FELL_CHILD: {
      isExclusive: UNIT_NAME.VEYLE,
    },
    FELL_CHILD_NEL: {
      isExclusive: UNIT_NAME.NEL,
    },
    FELL_CHILD_RAFAL: {
      isExclusive: UNIT_NAME.RAFAL,
    },
    MELUSINE: {
      isExclusive: UNIT_NAME.ZELESTIA,
    },
    THIEF: {
      isExclusive: false,
    },
  },
}
