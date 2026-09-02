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
  {id:"01",slug:"wave-identity",titleRu:"ВОЛНА / БРЕНДБУК",titleEn:"VOLNA / BRAND BOOK",category:"identity" as const,year:"2025",tone:"brandbook",shape:"landscape",cover:"/graphic/brandbooks/wave/page-01.png"},
  {id:"02",slug:"rysya-zoo",titleRu:"РЫСЯ / ЗООПАРК СИБИРИ",titleEn:"RYSYA / SIBERIAN ZOO",category:"identity" as const,year:"2024",tone:"brandbook",shape:"landscape",cover:"/graphic/brandbooks/rysya/page-01.png"},
  {id:"03",slug:"schrott-redesign",titleRu:"ШРОТТ / РЕДИЗАЙН",titleEn:"SCHROTT / REDESIGN",category:"identity" as const,year:"2025",tone:"brandbook",shape:"landscape",cover:"/graphic/brandbooks/schrott/page-01.png"},
  {id:"04",slug:"lava-lighting",titleRu:"LAVA / СВЕТ И DIGITAL",titleEn:"LAVA / LIGHT AND DIGITAL",category:"identity" as const,year:"2025",tone:"brandbook",shape:"landscape",cover:"/graphic/brandbooks/lava/page-01.png"},
  {id:"05",slug:"maru-onigiri",titleRu:"MARU / УПАКОВКА",titleEn:"MARU / PACKAGING",category:"identity" as const,year:"2025",tone:"brandbook",shape:"landscape",cover:"/graphic/brandbooks/maru/page-01.png"},
  {id:"06",slug:"signal-posters",titleRu:"SIGNAL / ПОСТЕРЫ",titleEn:"SIGNAL / POSTERS",category:"posters" as const,year:"2026",tone:"poster",shape:"landscape"},
  {id:"07",slug:"type-studies",titleRu:"ШРИФТОВЫЕ ЭТЮДЫ",titleEn:"TYPE STUDIES",category:"type" as const,year:"2025",tone:"type",shape:"square"},
  {id:"08",slug:"raw-digital",titleRu:"RAW / DIGITAL",titleEn:"RAW / DIGITAL",category:"digital" as const,year:"2025",tone:"digital",shape:"tall"},
  {id:"09",slug:"printed-objects",titleRu:"ПЕЧАТЬ / ОБЪЕКТЫ",titleEn:"PRINT / OBJECTS",category:"print" as const,year:"2024—26",tone:"print",shape:"landscape"},
  {id:"90",slug:"void-identity",titleRu:"VOID / АЙДЕНТИКА",titleEn:"VOID / IDENTITY",category:"identity" as const,year:"2026",tone:"identity",shape:"tall",showInGallery:false},
  {id:"91",slug:"logos-2026",titleRu:"ЛОГОТИПЫ / 2026",titleEn:"LOGOS / 2026",category:"identity" as const,year:"2026",tone:"logos",shape:"square",showInGallery:false},
];

export const publishedGraphicWorks=graphicWorks.filter(work=>!("showInGallery" in work)||work.showInGallery!==false);
