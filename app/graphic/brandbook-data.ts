export type BrandbookProject={
  id:string;
  slug:string;
  titleRu:string;
  titleEn:string;
  name:string;
  year:string;
  statusRu:string;
  statusEn:string;
  roleRu:string;
  roleEn:string;
  summaryRu:string;
  summaryEn:string;
  storyTitleRu:string;
  storyTitleEn:string;
  contextRu:string;
  contextEn:string;
  ideaRu:string;
  ideaEn:string;
  resultRu:string;
  resultEn:string;
  cover:string;
  pdf:string;
  pages:string[];
  before?:string[];
  beforeRu?:string;
  beforeEn?:string;
};

const root="/graphic/brandbooks";
const page=(slug:string,index:number)=>`${root}/${slug}/page-${String(index).padStart(2,"0")}.png`;

export const brandbooks:BrandbookProject[]=[
  {
    id:"01",slug:"wave-identity",name:"ВОЛНА",year:"2025",
    titleRu:"ВОЛНА / БРЕНДБУК",titleEn:"VOLNA / BRAND BOOK",
    statusRu:"РЕАЛЬНЫЙ ПРОЕКТ",statusEn:"REAL-WORLD PROJECT",
    roleRu:"АЙДЕНТИКА · БРЕНДБУК · НОСИТЕЛИ",roleEn:"IDENTITY · BRAND BOOK · APPLICATIONS",
    summaryRu:"Айдентика консорциума морской и речной инфраструктуры, построенная вокруг движения, инженерной точности и доверия.",
    summaryEn:"An identity for a maritime and river infrastructure consortium, built around movement, engineering precision and trust.",
    storyTitleRu:"ДВИЖЕНИЕ КАК ОСНОВА СИСТЕМЫ",storyTitleEn:"MOVEMENT AS A SYSTEM",
    contextRu:"Бренду требовался спокойный и уверенный визуальный язык для диалога с государственными заказчиками, промышленными партнёрами и специалистами отрасли.",
    contextEn:"The brand needed a calm, confident visual language for government clients, industrial partners and maritime professionals.",
    ideaRu:"Знак соединяет силуэт волны и направление вперёд. Глубокий морской цвет отвечает за надёжность, а пластичный паттерн переносит идею непрерывного движения на деловые и рекламные носители.",
    ideaEn:"The mark combines a wave silhouette with forward direction. Deep marine blue communicates reliability, while a fluid pattern carries continuous motion across corporate and promotional media.",
    resultRu:"Собрана компактная система: версии знака, охранное поле, палитра, типографика, паттерн и примеры применения на контейнере и печатных материалах.",
    resultEn:"The result is a compact system covering logo variants, clear space, palette, typography, pattern and applications on containers and printed matter.",
    cover:page("wave",1),pdf:`${root}/wave/brandbook.pdf`,
    pages:[1,2,4,5,7,8,10,11,12].map(index=>page("wave",index)),
  },
  {
    id:"02",slug:"rysya-zoo",name:"РЫСЯ",year:"2024",
    titleRu:"РЫСЯ / ЗООПАРК СИБИРИ",titleEn:"RYSYA / SIBERIAN ZOO",
    statusRu:"КОНЦЕПТУАЛЬНЫЙ ПРОЕКТ",statusEn:"CONCEPT PROJECT",
    roleRu:"АЙДЕНТИКА · ИЛЛЮСТРАЦИЯ · МАСКОТ",roleEn:"IDENTITY · ILLUSTRATION · MASCOT",
    summaryRu:"Тёплая иллюстративная система для зоопарка, в которой сибирская природа становится понятным языком для семейной аудитории.",
    summaryEn:"A warm illustrated system for a zoo where Siberian nature becomes an accessible language for families.",
    storyTitleRu:"СИБИРСКИЙ ЛЕС КАК ЖИВОЙ МИР",storyTitleEn:"THE SIBERIAN FOREST AS A LIVING WORLD",
    contextRu:"Задача — создать дружелюбный образ природного пространства без ощущения детского аттракциона и сохранить тему заботы о редких видах.",
    contextEn:"The task was to create a friendly nature destination without turning it into a children’s attraction, while preserving the focus on rare species and care.",
    ideaRu:"Рысь стала одновременно знаком и персонажем. Вокруг неё собрана среда из хвойных силуэтов, веток, животных и природной палитры с ярким оранжевым акцентом.",
    ideaEn:"The lynx became both a mark and a character. A world of conifers, branches and Siberian animals grows around it, using a natural palette with a vivid orange accent.",
    resultRu:"Айдентика расширена до набора пиктограмм, бесшовного паттерна и маскота с несколькими позами — система готова работать в навигации, мерче и образовательных материалах.",
    resultEn:"The identity expands into pictograms, a seamless pattern and a mascot with multiple poses, ready for wayfinding, merchandise and educational materials.",
    cover:page("rysya",1),pdf:`${root}/rysya/brandbook.pdf`,
    pages:[1,3,5,6,8,9,12,14,16,17,19,20].map(index=>page("rysya",index)),
  },
  {
    id:"03",slug:"schrott-redesign",name:"ШРОТТ",year:"2025",
    titleRu:"ШРОТТ / РЕДИЗАЙН БРЕНДБУКА",titleEn:"SCHROTT / BRAND BOOK REDESIGN",
    statusRu:"РЕДИЗАЙН РЕАЛЬНОГО БРЕНДА",statusEn:"REAL BRAND REDESIGN",
    roleRu:"АУДИТ · РЕДИЗАЙН ГАЙДЛАЙНА · НОСИТЕЛИ",roleEn:"AUDIT · GUIDELINE REDESIGN · APPLICATIONS",
    summaryRu:"Пересборка существующего брендбука предприятия по переработке металлолома: от плотного корпоративного документа к ясной модульной системе.",
    summaryEn:"A rebuild of an existing scrap metal company brand book, moving from a dense corporate document to a clear modular system.",
    storyTitleRu:"СОХРАНИТЬ ЗНАК, ПЕРЕСОБРАТЬ ЯЗЫК",storyTitleEn:"KEEP THE MARK, REBUILD THE LANGUAGE",
    contextRu:"У компании уже были узнаваемый знак, красно-чёрная палитра и подробный брендбук 2019 года. Проблемой была не узнаваемость, а перегруженная подача и разрозненные правила применения.",
    contextEn:"The company already had a recognizable mark, a red and black palette and a detailed 2019 brand book. The issue was not recognition, but dense presentation and fragmented application rules.",
    ideaRu:"Логотип сохранён как главный актив. Квадратный модуль знака стал основой сетки и паттерна, палитра сокращена до трёх цветов, а правила собраны вокруг контраста, масштаба и промышленной прямоты.",
    ideaEn:"The logo remains the core asset. Its square module becomes a grid and pattern, the palette is reduced to three colors, and the rules focus on contrast, scale and industrial directness.",
    resultRu:"Новый документ быстрее читается и показывает систему в работе: на навигации, контейнерах, форме сотрудников и печатной продукции. Блок «до / после» фиксирует именно редизайн руководства, а не вымышленную разработку бренда с нуля.",
    resultEn:"The new document is faster to scan and demonstrates the system across wayfinding, containers, uniforms and print. The before-and-after section frames this accurately as a guideline redesign rather than a fictional identity built from scratch.",
    cover:page("schrott",1),pdf:`${root}/schrott/brandbook.pdf`,
    pages:[1,2,4,5,6,7,8,10,11,12,13].map(index=>page("schrott",index)),
    before:[1,3,5,8,11,12].map(index=>`${root}/schrott/original/page-${String(index).padStart(2,"0")}.png`),
    beforeRu:"Исходный брендбук 2019 года содержал сильную производственную фактуру и много примеров, но визуально конкурировал с самим брендом. В новой версии сохранена основа и упрощена логика документа.",
    beforeEn:"The original 2019 brand book contained strong industrial material and many applications, but its layout competed with the brand itself. The new edition preserves the foundation while simplifying the document logic.",
  },
  {
    id:"04",slug:"lava-lighting",name:"LAVA",year:"2025",
    titleRu:"LAVA / СВЕТ И DIGITAL",titleEn:"LAVA / LIGHT AND DIGITAL",
    statusRu:"КОНЦЕПТУАЛЬНЫЙ ПРОЕКТ",statusEn:"CONCEPT PROJECT",
    roleRu:"АЙДЕНТИКА · DIGITAL-ГАЙДЛАЙН · UI",roleEn:"IDENTITY · DIGITAL GUIDELINE · UI",
    summaryRu:"Гибкая айдентика интернет-магазина декоративного освещения, соединяющая тепло лавовой лампы и чёткую e-commerce структуру.",
    summaryEn:"A flexible identity for a decorative lighting store, combining the warmth of a lava lamp with a clear e-commerce structure.",
    storyTitleRu:"ЖИДКАЯ ФОРМА В СТРОГОМ ИНТЕРФЕЙСЕ",storyTitleEn:"A FLUID FORM IN A PRECISE INTERFACE",
    contextRu:"Нужно было избежать буквальной ретро-эстетики и построить современный бренд, который одинаково уверенно выглядит на лампе, в соцсетях и в каталоге.",
    contextEn:"The challenge was to avoid literal retro styling and build a contemporary brand that works equally well on a lamp, in social media and in a catalogue.",
    ideaRu:"Пластичный знак отсылает к движению воска, но работает внутри строгой чёрно-белой основы. Красный и фиолетовый создают температурные акценты, а органические маски формируют фотостиль.",
    ideaEn:"A fluid mark references moving wax while sitting inside a strict black-and-white foundation. Red and violet create temperature accents, and organic masks define the photography style.",
    resultRu:"Гайдлайн доведён до цифрового уровня: кроме логотипа и типографики в нём описаны кнопки, фотомаски и макет магазина, поэтому айдентика сразу проверена в интерфейсе.",
    resultEn:"The guideline reaches the digital layer: beyond logo and typography, it defines buttons, image masks and a store layout, testing the identity directly in interface use.",
    cover:page("lava",1),pdf:`${root}/lava/brandbook.pdf`,
    pages:[1,2,3,4,5,6,8,10,11,12].map(index=>page("lava",index)),
  },
  {
    id:"05",slug:"maru-onigiri",name:"MARU",year:"2025",
    titleRu:"MARU / УПАКОВКА ОНИГИРИ",titleEn:"MARU / ONIGIRI PACKAGING",
    statusRu:"КОНЦЕПТУАЛЬНЫЙ ПРОЕКТ",statusEn:"CONCEPT PROJECT",
    roleRu:"АЙДЕНТИКА · УПАКОВКА · 3D-МОКАПЫ",roleEn:"IDENTITY · PACKAGING · 3D MOCKUPS",
    summaryRu:"Упаковочная система для онигири, вдохновлённая японским графическим дизайном 1960–70-х и адаптированная к повседневному продукту.",
    summaryEn:"A packaging system for onigiri inspired by 1960s–70s Japanese graphic design and adapted to an everyday product.",
    storyTitleRu:"ТРАДИЦИЯ В ФОРМАТЕ «ВЗЯТЬ С СОБОЙ»",storyTitleEn:"TRADITION MADE PORTABLE",
    contextRu:"Проекту нужен был характерный образ без клише суши-баров: простой, тёплый и заметный на полке, но связанный с японской визуальной культурой.",
    contextEn:"The project needed a distinctive look without sushi-bar clichés: simple, warm and visible on shelf while still connected to Japanese visual culture.",
    ideaRu:"Геометрический глаз становится знаком внимания и заботы, а треугольник упаковки поддерживает форму онигири. Ритм, насыщенные основные цвета и графические волны отсылают к плакатной школе Кадзумасы Нагаи.",
    ideaEn:"A geometric eye becomes a symbol of attention and care, while the triangular pack follows the onigiri shape. Rhythm, saturated primary colors and graphic waves reference Kazumasa Nagai’s poster language.",
    resultRu:"Система собрана от позиционирования и логотипа до развёртки, обязательной информации и серии ракурсов готовой упаковки.",
    resultEn:"The system runs from positioning and logo through dieline, mandatory product information and a complete set of packaging views.",
    cover:page("maru",1),pdf:`${root}/maru/brandbook.pdf`,
    pages:[1,2,3,4,5,6,7,8,9,10,11,12].map(index=>page("maru",index)),
  },
];

export const findBrandbook=(slug:string)=>brandbooks.find(project=>project.slug===slug);
