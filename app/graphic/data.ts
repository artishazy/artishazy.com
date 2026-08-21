export type GraphicCategory="all"|"identity"|"posters"|"type"|"digital"|"print";

export const graphicCategories=[
  {id:"all" as const,ru:"ВСЕ",en:"ALL"},
  {id:"identity" as const,ru:"АЙДЕНТИКА",en:"IDENTITY"},
  {id:"posters" as const,ru:"ПОСТЕРЫ",en:"POSTERS"},
  {id:"type" as const,ru:"ТИПОГРАФИКА",en:"TYPOGRAPHY"},
  {id:"digital" as const,ru:"DIGITAL",en:"DIGITAL"},
  {id:"print" as const,ru:"ПЕЧАТЬ",en:"PRINT"},
];

export const graphicWorks=[
  {id:"01",slug:"void-identity",titleRu:"VOID / АЙДЕНТИКА",titleEn:"VOID / IDENTITY",category:"identity" as const,year:"2026",tone:"identity",shape:"tall"},
  {id:"02",slug:"signal-posters",titleRu:"SIGNAL / ПОСТЕРЫ",titleEn:"SIGNAL / POSTERS",category:"posters" as const,year:"2026",tone:"poster",shape:"landscape"},
  {id:"03",slug:"type-studies",titleRu:"ШРИФТОВЫЕ ЭТЮДЫ",titleEn:"TYPE STUDIES",category:"type" as const,year:"2025",tone:"type",shape:"square"},
  {id:"04",slug:"raw-digital",titleRu:"RAW / DIGITAL",titleEn:"RAW / DIGITAL",category:"digital" as const,year:"2025",tone:"digital",shape:"tall"},
  {id:"05",slug:"logos-2026",titleRu:"ЛОГОТИПЫ / 2026",titleEn:"LOGOS / 2026",category:"identity" as const,year:"2026",tone:"logos",shape:"square"},
  {id:"06",slug:"printed-objects",titleRu:"ПЕЧАТЬ / ОБЪЕКТЫ",titleEn:"PRINT / OBJECTS",category:"print" as const,year:"2024—26",tone:"print",shape:"landscape"},
];
