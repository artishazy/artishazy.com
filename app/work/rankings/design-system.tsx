import {useRef,useState} from "react";
import {ArrowIcon,Cursor,PortfolioLink,SliderControls,useHorizontalTrack} from "../../components";

import "./case-readability.css";

type Caption = [ru: string, en: string];
type Screen = {
  file: string;
  full?: string;
  node: string;
  size: [number, number];
  caption: Caption;
  detail?: Caption;
};

const desktop: Screen[] = [
  {file:"desktop-open",node:"5674-51079",size:[1440,1024],caption:["Открытый фильтр способов оплаты. В списке отмечен МИР, внизу — кнопка «Готово».", "Open payment filter. MIR is checked; the Done button is at the bottom."]},
  {file:"desktop-selected",node:"5674-49765",size:[1440,1024],caption:["Выбранные значения над таблицей. Показаны Steam и ChatGPT, крестики удаления, количество найденных сервисов и «Сбросить».", "Selected values above the table: Steam, ChatGPT, remove icons, result count and Reset."]},
  {file:"desktop-tabs",node:"5674-48462",size:[1440,1100],caption:["Вторая вкладка рейтинга. Под вкладками показана таблица без панели фильтров.", "The second ranking tab shows a table without the filter toolbar."]},
  {file:"desktop-all",node:"5674-52817",size:[1440,1024],caption:["Открытая панель «Все фильтры». Выбранные значения, поиск, комиссия, способы оплаты и дополнительные условия.", "The All filters panel with selected values, search, fees, payment methods and additional criteria."]},
  {file:"desktop-header",node:"5674-44872",size:[1440,1024],caption:["Состояния заголовков таблицы. Стрелки сортировки и подсказка «Сортировать по убыванию».", "Table header states with sorting arrows and a descending-sort hint."]},
  {file:"ranking-page",node:"5674-45862",size:[1440,1024],caption:["Открытое меню «Гайды». Список материалов с названиями и датами.", "Open Guides menu with article titles and dates."]},
];
const filterTypes: Screen[] = [
  {file:"filter-multi",node:"5674-54230",size:[310,376],caption:["Список валют · выбранное значение. EUR отмечен чекбоксом; ниже видны неотмеченные значения.", "Currency list · selected value. EUR is checked; other values are unchecked."]},
  {file:"filter-range",node:"5674-54035",size:[298,176],caption:["Диапазон значений · вариант 1. Поля «от» и «до», кнопки «Очистить» и «Готово».", "Value range · variant 1. From/to fields, Clear and Done buttons."]},
  {file:"filter-single",node:"5674-54046",size:[310,376],caption:["Способы оплаты · один выбранный пункт. МИР отмечен круглым переключателем.", "Payment methods · one selected item. MIR is marked with a radio control."]},
  {file:"filter-groups",node:"5674-54276",size:[320,376],caption:["Список с группами · компактный вариант. Раскрыта группа «Игры», выбран Steam.", "Grouped list · compact variant. Games is expanded and Steam is selected."]},
  {file:"filter-range-default",node:"5674-54398",size:[298,176],caption:["Диапазон значений · вариант 2. Второй макет полей «от» и «до».", "Value range · variant 2. A second version of the from/to fields."]},
  {file:"filter-single-default",node:"5674-54409",size:[310,376],caption:["Способы оплаты · вариант 2. Список с отмеченным МИР и другими вариантами оплаты.", "Payment methods · variant 2. MIR is selected among the listed methods."]},
  {file:"filter-single-alt",node:"5674-54138",size:[310,376],caption:["Способы оплаты · полупрозрачный вариант. Отдельный вариант того же списка в макетах.", "Payment methods · translucent variant. A separate rendition of the same list."]},
  {file:"filter-multi-default",node:"5674-54501",size:[310,376],caption:["Список валют · вариант 2. Выбран EUR, ниже показаны остальные валюты.", "Currency list · variant 2. EUR is selected, with other currencies below."]},
  {file:"filter-groups-default",node:"5674-54547",size:[320,376],caption:["Список с группами · вариант 2. Поиск, раскрытая группа и кнопки внизу.", "Grouped list · variant 2. Search, an expanded group and bottom actions."]},
  {file:"filter-groups-expanded",node:"5674-54337",size:[320,544],caption:["Список с группами · высокий вариант. Под «Играми» видны группы «Музыка» и «Программы».", "Grouped list · tall variant. Music and Programs appear below Games."]},
  {file:"filter-groups-full",node:"5674-54608",size:[320,544],caption:["Список с группами · высокий вариант 2. Steam выбран, остальные пункты не отмечены.", "Grouped list · tall variant 2. Steam is checked and the other items are unchecked."]},
  {file:"filter-all-panel",node:"5674-54669",size:[600,864],caption:["Панель «Все фильтры». Выбранные значения, переключатели, поиск, комиссия и списки в одном окне.", "All filters panel. Selected values, toggles, search, fees and lists in one window."]},
  {file:"hint-tethering",node:"5674-54996",size:[246,124],caption:["Подсказка «Раздача интернета». Текст о работе eSIM в режиме модема.", "Internet sharing tooltip. Text about using an eSIM for tethering."]},
  {file:"hint-cards",node:"5674-54808",size:[246,156],caption:["Компактный список способов оплаты. Метки Mastercard, Visa, СБП и МИР.", "Compact payment-method list. Mastercard, Visa, SBP and MIR labels."]},
  {file:"hint-payments",node:"5674-54880",size:[270,246],caption:["Окно «Способы оплаты». Счётчик, поиск, список меток и кнопка закрытия.", "Payment methods window. A counter, search, labels and a close button."]},
  {file:"hint-labels",node:"5674-54967",size:[407,292],caption:["Окно «Метки». Описания раздачи интернета, звонков и пополнения eSIM.", "Labels window. Descriptions of internet sharing, calls and eSIM top-ups."]},
];
const mobile: Screen[] = [
  {file:"mobile-card",node:"5674-64842",size:[375,812],caption:["Карточка сервиса. Оценка, отзывы, комиссия, метки, сервисы, валюты, способы оплаты и действия.", "Service card with rating, reviews, fees, labels, services, currencies, payment methods and actions."]},
  {file:"mobile-empty",node:"5674-72649",size:[375,812],caption:["Панель «Все фильтры» без выбранных значений. Видны поиск, комиссия, свёрнутые группы и «Применить».", "All filters without selected values. Search, fees, collapsed groups and Apply are visible."]},
  {file:"mobile-filled",node:"5674-71613",size:[375,812],caption:["Панель «Все фильтры» с выбранными значениями. Вверху — шесть меток, ниже — раскрытый список с чекбоксами.", "All filters with selected values. Six chips at the top and an expanded checkbox list below."]},
  {file:"mobile-hints",node:"5674-67701",size:[375,812],caption:["Панель «Метки». Пояснения к раздаче интернета, звонкам и пополнению eSIM.", "Labels sheet explaining internet sharing, calls and eSIM top-ups."]},
  {file:"mobile-services",node:"5674-68341",size:[375,812],caption:["Панель «Сервисы». Поиск и список меток: Spotify, App Store, Steam и другие.", "Services sheet with search and labels for Spotify, App Store, Steam and others."]},
  {file:"mobile-payment",node:"5674-69086",size:[375,812],caption:["Панель «Способы оплаты». МИР, СБП, Visa и Mastercard, внизу — «Назад».", "Payment methods sheet showing MIR, SBP, Visa and Mastercard, with Back below."]},
  {file:"mobile-expanded",node:"5674-66396",size:[375,812],caption:["Раскрытое описание рейтинга. Полный вводный текст и ссылка «Скрыть».", "Expanded ranking description with the full introduction and Hide link."]},
  {file:"mobile-inline",node:"5674-74898",size:[375,812],caption:["Фильтры на странице. Под поиском видны списки игр, сервисов, способов оплаты и валют.", "Inline filters. Games, services, payment methods and currencies appear below search."]},
  {file:"mobile-filter-panel",node:"5674-73664",size:[375,735],caption:["Панель фильтров отдельно от страницы. Свёрнутые группы, переключатели и дополнительные условия.", "Standalone filter sheet with collapsed groups, toggles and additional criteria."]},
  {file:"mobile-filter-panel-filled",full:"mobile-filter-panel-filled",node:"5674-73756",size:[375,1431],caption:["Полная высота панели фильтров. Выбранные метки, длинный список с чекбоксами, одиночный выбор и переключатели.", "Full-height filter sheet with selected chips, checkboxes, radio controls and toggles."]},
  {file:"mobile-filter-list",node:"5674-75937",size:[383,600],caption:["Два состояния списка «Игры». Свёрнутая строка и раскрытый список с поиском и чекбоксами.", "Two Games list states: collapsed and expanded with search and checkboxes."]},
  {file:"mobile-bonus",node:"5674-69721",size:[375,812],caption:["Панель «Бонусы» · промокод. Сумма, срок действия, код с иконкой копирования и кнопка «Получить».", "Bonuses sheet · promo code. Amount, validity, copy icon and Redeem button."]},
  {file:"mobile-bonus-alt",node:"5674-70352",size:[375,812],caption:["Панель «Бонусы» · компактный вариант. Описание скидки и промокод в одной карточке.", "Bonuses sheet · compact variant. Discount description and promo code in one card."]},
  {file:"mobile-hint-alt",node:"5674-70982",size:[375,812],caption:["Панель «Бонусы» · вариант с иллюстрацией. Подарок, сумма скидки, промокод и кнопка «Получить».", "Bonuses sheet · illustrated variant. Gift image, discount amount, promo code and Redeem button."]},
];



function fullImage(screen:Screen){
  return `/work/rankings/${screen.full ?? screen.file}.png`;
}

const filterStates=filterTypes.slice(0,12);


const filterFamilies = [
  {label:["Все","All"], indices:filterStates.map((_,index)=>index)},
  {label:["Валюты","Currencies"], indices:[0,7]},
  {label:["Оплата","Payments"], indices:[2,5,6]},
  {label:["Диапазон","Range"], indices:[1,4]},
  {label:["Группы","Groups"], indices:[3,8,9,10]},
  {label:["Общая панель","Filter panel"], indices:[11]}
];

function DesktopShowcase({ru,open}:{ru:boolean;open:()=>void}){
  const [family,setFamily]=useState(0);
  const lang=ru?0:1;
  const track=useRef<HTMLDivElement>(null);
  useHorizontalTrack(track);
  return <div className="graphic-gallery filter-library">
    <div className="graphic-gallery-head"><div className="graphic-filters" role="group" aria-label={ru?"Группа фильтров":"Filter family"}>
      {filterFamilies.map(({label,indices},i)=><button key={label[1]} className={family===i?"is-active":""} aria-pressed={family===i} onClick={()=>{setFamily(i);if(track.current)track.current.scrollLeft=0}}>{label[lang]}<span>{indices.length}</span></button>)}
    </div><SliderControls track={track} current={0} total={filterFamilies[family].indices.length} ru={ru} hideCount/></div>
    <div className="graphic-project-grid filter-library-grid" ref={track} tabIndex={0} aria-label={ru?"Состояния фильтров":"Filter states"}>{filterFamilies[family].indices.map(index=>{
      const item=filterStates[index];
      return <button type="button" className="project-card interactive filter-state-card" data-slide data-case-card data-cursor-label={ru?"СМОТРЕТЬ":"VIEW"} onClick={open} key={item.file}>
        <div className="project-visual case-overlay-visual monitoring"><img src={fullImage(item)} alt="" loading="lazy"/><div className="case-card-overlay"><h3>{item.caption[lang].split(". ")[0]}</h3></div></div>
      </button>;
    })}</div>
    <button className="portfolio-link-full portfolio-link-solid rankings-detail-link" onClick={open}>{ru?"СМОТРЕТЬ ВСЕ МАКЕТЫ":"VIEW ALL DESIGNS"}<ArrowIcon direction="up-right"/></button>
  </div>;
}
function MobileShowcase({ru}:{ru:boolean}){
 const [active,setActive]=useState(0);
 const options=[0,1,2,3,4,5];
 const labels=ru?["Рейтинг","Фильтры","Выбранные условия","Подсказки","Сервисы","Оплата"]:["Rankings","Filters","Active criteria","Hints","Services","Payments"];
 const explanations=ru?[
 "На экране карточка с оценкой и отзывами, комиссией, метками, сервисами, валютами, способами оплаты и кнопками «Подробнее» и «Перейти».",
 "Открыта панель «Все фильтры» без выбранных значений: поиск, поля комиссии, свёрнутые группы, переключатели, дополнительные условия и «Применить».",
 "В панели «Все фильтры» показаны шесть выбранных меток и раскрытая группа с отмеченными и неотмеченными пунктами.",
 "Открыта панель «Метки» с описаниями раздачи интернета, звонков и пополнения. Это пример данных о свойствах eSIM.",
 "В панели «Сервисы» показаны поиск и метки Spotify, App Store, Steam и других сервисов. Внизу расположена кнопка «Назад».",
 "В панели «Способы оплаты» показаны МИР, СБП, Visa и Mastercard. Внизу расположена кнопка «Назад»."
 ]:["The card shows rating, reviews, fees, labels, services, currencies, payments and Details/Open actions.","All filters is open without selected values: search, fee fields, collapsed groups, toggles, extra criteria and Apply.","All filters shows six selected chips and an expanded group with checked and unchecked items.","The Labels sheet describes tethering, calls and top-ups: example eSIM feature data.","Services shows search and labels for Spotify, App Store, Steam and others, with Back below.","Payment methods shows MIR, SBP, Visa and Mastercard, with Back below."];

 return <div className="mobile-study">
  <div className="mobile-study-copy"><span className="kicker">{ru?"АДАПТАЦИЯ":"RESPONSIVE DESIGN"}</span><h2 id="mobile-version-title">{ru?"Мобильная версия":"Mobile version"}</h2><p>{ru?"Адаптировал сравнение сервисов под узкий экран: строки таблицы преобразованы в карточки, а фильтры вынесены в отдельную панель. В карточке сгруппированы параметры одного сервиса и действия по нему.":"I adapted service comparison to narrow screens by turning table rows into cards and moving filters into a separate panel. Each card groups one service’s criteria and actions."}</p>
   <div className="mobile-study-tabs graphic-filters" role="group" aria-label={ru?"Мобильные экраны":"Mobile screens"}>{options.map((n,i)=><button key={n} className={active===n?"is-active":""} aria-pressed={active===n} onClick={()=>setActive(n)}>{labels[i]}</button>)}</div>
   <div className="mobile-study-note" aria-live="polite"><span className="kicker">0{active+1} / 06</span><h3>{labels[active]}</h3><p>{explanations[active]}</p></div>
  </div>
  <div className="mobile-study-stage"><div className="rankings-phone"><div key={active} className="rankings-phone-scroll" role="region" tabIndex={0} data-smooth-preview aria-label={ru?"Мобильный макет, прокрутка":"Mobile design, scrollable"}><img src={active===0?"/work/rankings/mobile-ranking-full.png":fullImage(mobile[active])} alt={mobile[active].caption[ru?0:1]} loading="lazy"/></div></div></div>
 </div>;
}

function SelectionPreview({ru}:{ru:boolean}){
 return <div className="story-selection-panel selection-preview">
   <img src="/work/rankings/filter-toolbar.png" width="1312" height="182" alt={ru?"Панель фильтров рейтинга":"Ranking filter toolbar"} loading="lazy"/>
   <div className="story-selection-divider"/>
   <img src="/work/rankings/selected-criteria.png" width="1312" height="36" alt={ru?"Активные фильтры и сброс выбора":"Active filters and reset"} loading="lazy"/>
 </div>;
}

export function ExnodeDesignSystem({ru}:{ru:boolean}) {
 const dialog=useRef<HTMLDialogElement>(null);
 const [category,setCategory]=useState("all");
 const groups=[{id:"desktop",title:ru?"Десктоп":"Desktop",items:desktop},{id:"filters",title:ru?"Компоненты":"Components",items:filterStates},{id:"mobile",title:ru?"Мобильная версия":"Mobile",items:mobile}];
 const openGallery=()=>{setCategory("all");dialog.current?.showModal();dialog.current?.focus({preventScroll:true});};
  return <article className="rankings-design-case case-story">
    <a className="case-back story-back" href="/work"><ArrowIcon direction="left"/>{ru?"ВСЕ ПРОЕКТЫ":"ALL PROJECTS"}</a>
    <div className="ranking-opening"><header className="story-hero">
      <div className="story-tags"><span>FINTECH</span><span>WEB / MOBILE</span><span>{ru?"ДИЗАЙН-СИСТЕМА":"DESIGN SYSTEM"}</span></div>
      <h1>{ru?<>ДИЗАЙН-СИСТЕМА<br/>РЕЙТИНГОВ</>:<>RANKINGS<br/>DESIGN SYSTEM</>}</h1>
      <p>{ru?"Спроектировал единый интерфейс для сравнения финансовых сервисов: таблицы, фильтры и мобильные карточки.":"I designed a shared interface for comparing financial services: tables, filters and mobile cards."}</p>

      <div className="hero-actions"><a href="https://www.figma.com/design/TeiQJqa4EVQF5sKnjIWP1h/Portfolio-Ux-Ui?node-id=5674-41410" target="_blank" rel="noreferrer">{ru?"КЕЙС В FIGMA":"CASE IN FIGMA"}<ArrowIcon direction="up-right"/></a></div>
    </header>
    <div className="story-cover"><div className="story-cover-scroll" role="region" tabIndex={0} data-smooth-preview aria-label={ru?"Рейтинг, прокрутка макета":"Ranking, scrollable design"}><img src="/work/rankings/ranking-full.png" width="1440" height="12930" alt={ru?"Полная страница рейтинга сервисов":"Full service ranking page"} fetchPriority="high"/></div></div></div>
    <section className="story-summary" aria-labelledby="story-summary-title">
      <div className="story-section-label"><span className="kicker">{ru?"О ПРОЕКТЕ":"PROJECT SUMMARY"}</span><h2 id="story-summary-title">{ru?"Коротко о работе":"At a glance"}</h2></div>
      <div className="story-summary-grid">
        <div className="story-goals"><h3>{ru?"Задачи":"Objectives"}</h3><ul><li>{ru?"Сделать редизайн страницы рейтинга.":"Design a ranking page with a service comparison table."}</li><li>{ru?"Разработать шаблон и дизайн-систему.":"Prepare filters, lists and their states."}</li><li>{ru?"Предусмотреть адаптацию и сборку в админ-панели.":"Prepare mobile cards and sheets."}</li></ul></div>
        <dl><div><dt>{ru?"РОЛЬ":"ROLE"}</dt><dd>UX/UI {ru?"дизайнер":"designer"}</dd></div><div><dt>{ru?"ФОРМАТ":"ENGAGEMENT"}</dt><dd>{ru?"Коммерческий проект":"Commercial project"}</dd></div><div><dt>{ru?"ВЗАИМОДЕЙСТВИЕ":"COLLABORATION"}</dt><dd>{ru?"Аналитик и команда разработки":"Analyst and development team"}</dd></div><div><dt>{ru?"ЗОНА ОТВЕТСТВЕННОСТИ":"SCOPE"}</dt><dd>{ru?"Структура, UI, компоненты, адаптация":"Structure, UI, components, responsive design"}</dd></div></dl>
      </div>

    </section>
    <section className="story-section" id="challenge">
      <div className="story-copy"><span className="kicker">{ru?"ЗАДАЧА И ПОДХОД":"PROJECT SCOPE"}</span><h2>{ru?"Повторяющиеся элементы — в общую систему":"Rankings, filters and detail panels"}</h2><p>{ru?"Нужно было обновить страницы рейтингов. В них повторялись одни и те же элементы, но общей дизайн-системы не было. Я спроектировал шаблон со всеми предусмотренными блоками и типами данных, разработал компоненты и их состояния. Сразу учитывал, как страницы будут собираться во внутренней админ-панели.":"The project includes a desktop ranking table and mobile service cards, with separate designs for filters, selected values, sorting, guides, hints and detail panels."}</p></div>
    </section>
    <section className="story-section typography-study" id="typography">
      <div className="story-copy">
        <span className="kicker">{ru?"ТИПОГРАФИКА":"TYPOGRAPHY"}</span>
        <h2>{ru?"Иерархия текста и отступов":"Text and spacing hierarchy"}</h2>
        <p>{ru?"В рейтингах меняются длина заголовков и объём описаний. Для шаблона задал размеры текста, межстрочные интервалы и отступы: заголовок связывается со своим описанием, а соседние разделы отделяются друг от друга. Эти правила дают основу для сборки страниц с разным наполнением в админ-панели.":"Ranking titles and descriptions vary in length. I defined text sizes, line heights and spacing so headings stay connected to their copy and sections remain distinct. These rules support admin-panel assembly with different content."}</p>
      </div>
      <div className="typography-samples">
        <div><span>Onest SemiBold · 44 / 48 px</span><p className="type-heading">{ru?"Рейтинг сервисов":"Service rankings"}</p></div>
        <div><span>Onest Regular · 16 / 24 px</span><p className="type-body">{ru?"Описание рейтинга раскрывает тему и помогает перейти к сравнению сервисов.":"The introduction explains the topic before service comparison."}</p></div>
        <div className="type-sample-pair"><div><span>Medium · 14 / 20 px</span><p className="type-value">{ru?"От 10%":"From 10%"}</p></div><div><span>Medium · 12 / 16 px</span><p className="type-caption">{ru?"Подпись к значению":"Value caption"}</p></div></div>
      </div>
    </section>
    <section className="story-section" id="structure">
      <div className="story-copy"><span className="kicker">{ru?"СТРУКТУРА РЕЙТИНГА":"RANKING STRUCTURE"}</span><h2>{ru?"Структура под разные рейтинги":"Search and filters above the table"}</h2><p>{ru?"В разных рейтингах меняются данные, набор колонок и условия поиска. Поэтому я предусмотрел варианты страницы с фильтрами и только с вкладками. Таблица сохраняет общий принцип сравнения, а нужные блоки и параметры можно подобрать под конкретный рейтинг при сборке в админ-панели.":"This screen places search, filter lists and quick criteria above the table. Selected Steam and ChatGPT values, the result count and Reset appear below. Table columns show fees, services, payments, currencies, ratings and reviews."}</p></div>
      <div className="structure-live-screen" role="region" tabIndex={0} data-smooth-preview aria-label={ru?"Интерфейс рейтинга, прокрутка":"Ranking interface, scrollable"}><img src="/work/rankings/desktop-selected.png" width="1440" height="1024" alt={ru?"Поиск и выбранные условия над таблицей сравнения сервисов":"Search and active criteria above the service comparison table"} loading="lazy"/></div>
    </section>
    <section className="story-section" id="filters">
      <div className="story-copy"><h2>{ru?"Состояния фильтров":"Filter states"}</h2><p>{ru?"Валюта, способ оплаты и группы сервисов в раскрытых списках. В подборке также есть поля диапазона и панель «Все фильтры».":"These designs show currency checkboxes, a single-selection payment list, grouped services and range fields. They include checked and unchecked items, compact and tall list variants, and the All filters panel."}</p></div>
      <DesktopShowcase ru={ru} open={openGallery}/>
    </section>
    <section className="story-section" id="selected-filters">
      <div className="story-copy"><span className="kicker">{ru?"СОСТОЯНИЕ ВЫБОРА":"SELECTION STATE"}</span><h2>{ru?"Активные фильтры в чипсах":"Active filter chips"}</h2><p>{ru?"Проработал заполненное состояние панели фильтров: выбранные значения отображаются чипсами над таблицей. Это позволяет просмотреть текущую комбинацию условий, снять отдельный фильтр или сбросить выбор целиком.":"I designed the populated filter state with active values shown as chips above the table. Users can review the current combination, remove individual criteria or reset the entire selection."}</p></div>
      <figure className="story-selection-detail"><SelectionPreview ru={ru}/></figure>
    </section>
    <section className="story-section" id="mobile" aria-labelledby="mobile-version-title"><MobileShowcase ru={ru}/></section>
    <section className="story-section" id="system">
      <div className="story-copy"><span className="kicker">{ru?"КОНСТРУКТОР":"BUILDER"}</span><h2>{ru?"Сборка рейтингов в админ-панели":"Table configuration in the builder"}</h2><p>{ru?"Блоки шаблона спроектированы с учётом сборки во внутренней админ-панели. Команда может настроить колонки, добавить строки и заполнить таблицу данными для конкретного рейтинга.":"A separate design shows a table editor with Add column, Add row, a scroll toggle, editable cells and save actions. This interface has its own case study."}</p></div>
      <figure className="story-screen"><img src="/work/rankings/builder-table.png" width="1440" height="812" alt={ru?"Конструктор таблицы с настройками колонок":"Table builder with column configuration"} loading="lazy"/></figure>
      <div className="story-builder-link"><PortfolioLink href="/work/rankings-builder" label={ru?"КЕЙС КОНСТРУКТОРА":"BUILDER CASE"} variant="solid" full/></div>
    </section>
    <section className="story-section story-takeaways" id="takeaways">
      <div className="story-copy"><span className="kicker">{ru?"ИТОГИ И ВЫВОДЫ":"DELIVERABLES & REFLECTION"}</span><h2>{ru?"Что входит в проект":"What the project includes"}</h2></div>
      <div className="story-lessons">
        <div><h3>{ru?"Шаблон страницы":"Page template"}</h3><p>{ru?"Спроектированы блоки страницы рейтинга, варианты таблиц и отображение разных типов данных на десктопе и телефоне.":"Ranking page blocks, table variants and formats for different data types across desktop and mobile."}</p></div>
        <div><h3>{ru?"Дизайн-система":"Design system"}</h3><p>{ru?"Разработаны типографика, отступы, компоненты и состояния элементов. Повторяющиеся части рейтингов собраны в общую систему.":"Typography, spacing, components and element states bring recurring ranking elements into a shared system."}</p></div>
        <div><h3>{ru?"Сборка в админ-панели":"Admin assembly"}</h3><p>{ru?"Все блоки подготовлены с учётом дальнейшей сборки страниц во внутренней админ-панели продукта.":"All blocks were designed for subsequent page assembly in the product’s internal admin panel."}</p></div>
      </div>
    </section>
    <dialog ref={dialog} className="rankings-viewer case-design-board" tabIndex={-1} aria-label={ru?"Все макеты":"All designs"}>
     <Cursor/>
     <header className="design-board-bar"><div><h2>{ru?"Макеты и состояния":"Designs and states"}</h2><div className="graphic-filters" role="group" aria-label={ru?"Тип макета":"Design type"}>{[{id:"all",title:ru?"Все":"All"},...groups].map(g=><button key={g.id} className={category===g.id?"is-active":""} aria-pressed={category===g.id} onClick={()=>setCategory(g.id)}>{g.title}</button>)}</div></div><button className="case-back" onClick={()=>dialog.current?.close()} aria-label={ru?"Закрыть":"Close"}>{ru?"ЗАКРЫТЬ":"CLOSE"} ×</button></header>
     <div className="design-board-scroll" data-smooth-preview>{groups.filter(g=>category==="all"||category===g.id).map(g=><section className={`design-board-group board-${g.id}`} key={g.id}><h3>{g.title}<span>{String(g.items.length).padStart(2,"0")}</span></h3><div className="design-board-grid">{g.items.map((item,i)=><figure key={item.file}><div className="board-image"><img src={`/work/rankings/${item.file}.png`} width={item.size[0]} height={item.size[1]} alt={item.caption[ru?0:1]} loading="lazy"/></div><figcaption><span>{String(i+1).padStart(2,"0")}</span><p>{item.caption[ru?0:1]}</p></figcaption></figure>)}</div></section>)}</div>
    </dialog>
  </article>;
}
