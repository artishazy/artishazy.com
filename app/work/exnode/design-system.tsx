import {AnimatePresence,motion,useInView,useReducedMotion} from "framer-motion";
import {useEffect,useRef,useState} from "react";
import {ArrowIcon,Cursor,PortfolioLiquidLink} from "../../components";

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
  {file:"desktop-open",node:"5674-51079",size:[1440,1024],caption:["Выбор способов оплаты. Поиск и чекбоксы помогают найти и отметить несколько вариантов.", "Payment method selection. Search and checkboxes support choosing multiple options."]},
  {file:"desktop-selected",node:"5674-49765",size:[1440,1024],caption:["После применения выбранные значения видны над таблицей. У каждого есть своё действие для удаления.", "Applied values appear above the table and can be removed individually."]},
  {file:"desktop-tabs",node:"5674-48462",size:[1440,1100],caption:["Вариант шаблона с вкладками. Когда дополнительных условий нет, таблица начинается сразу под вкладками.", "A template variant with tabs. When there are no extra criteria, the table sits directly below the tabs."]},
  {file:"desktop-all",node:"5674-52817",size:[1440,1024],caption:["Все фильтры. Полный набор условий в одной панели.","All filters. The complete set of criteria in one panel."]},
  {file:"desktop-header",node:"5674-44872",size:[1440,1024],caption:["Заголовок таблицы. Состояние при наведении на колонку.","Table header. A column’s hover state."]},
  {file:"ranking-page",node:"5674-45862",size:[1440,1024],caption:["Меню гайдов. Связанные материалы доступны прямо из рейтинга.", "Guides menu. Related articles are available directly from the rankings."]},
];
const filterTypes: Screen[] = [
  {file:"filter-multi",node:"5674-54230",size:[310,376],caption:["Множественный выбор. Можно отметить несколько значений в одном списке.", "Multiple selection. Several values can be checked in the same list."]},
  {file:"filter-range",node:"5674-54035",size:[298,176],caption:["Диапазон. Для числового условия предусмотрены нижняя и верхняя границы.", "Range. Numeric criteria have a lower and upper bound."]},
  {file:"filter-single",node:"5674-54046",size:[310,376],caption:["Один вариант. Подходит для взаимоисключающих условий.","Single selection for mutually exclusive criteria."]},
  {file:"filter-groups",node:"5674-54276",size:[320,376],caption:["Группы. Связанные варианты собраны в одном списке.","Groups. Related options appear in the same list."]},
  {file:"filter-range-default",node:"5674-54398",size:[298,176],caption:["Диапазон значений · базовое состояние","Range · default state"]},
  {file:"filter-single-default",node:"5674-54409",size:[310,376],caption:["Одиночный выбор · базовое состояние","Single selection · default state"]},
  {file:"filter-single-alt",node:"5674-54138",size:[310,376],caption:["Одиночный выбор · вариант списка","Single selection · list variant"]},
  {file:"filter-multi-default",node:"5674-54501",size:[310,376],caption:["Множественный выбор · базовое состояние","Multiple selection · default state"]},
  {file:"filter-groups-default",node:"5674-54547",size:[320,376],caption:["Группы · компактный список","Groups · compact list"]},
  {file:"filter-groups-expanded",node:"5674-54337",size:[320,544],caption:["Группы · развёрнутый список","Groups · expanded list"]},
  {file:"filter-groups-full",node:"5674-54608",size:[320,544],caption:["Группы · расширенный вариант","Groups · extended variant"]},
  {file:"filter-all-panel",node:"5674-54669",size:[600,864],caption:["Все фильтры · отдельная панель","All filters · standalone panel"]},
  {file:"hint-tethering",node:"5674-54996",size:[246,124],caption:["Подсказка к одной метке","Tooltip for a single label"]},
  {file:"hint-cards",node:"5674-54808",size:[246,156],caption:["Подсказка со способами оплаты","Payment methods tooltip"]},
  {file:"hint-payments",node:"5674-54880",size:[270,246],caption:["Список способов оплаты с поиском","Searchable list of payment methods"]},
  {file:"hint-labels",node:"5674-54967",size:[407,292],caption:["Расшифровка группы меток","Details for a group of labels"]},
];
const mobile: Screen[] = [
  {file:"mobile-card",full:"mobile-ranking-full",node:"5674-64842",size:[375,812],caption:["Рейтинг. Строка таблицы становится карточкой с оценкой, условиями и действиями.", "Rankings. A table row becomes a card with a rating, terms and actions."]},
  {file:"mobile-empty",node:"5674-72649",size:[375,812],caption:["Фильтры до выбора. Поиск, диапазон и группы условий собраны в нижней панели.", "Before selection. Search, range and filter groups sit in a bottom sheet."]},
  {file:"mobile-filled",node:"5674-71613",size:[375,812],caption:["Фильтры после выбора. Вверху видны активные условия и их количество.", "After selection. Active criteria and their count appear at the top."]},
  {file:"mobile-hints",node:"5674-67701",size:[375,812],caption:["Подсказка к меткам. Панель раскрывает значение пиктограмм из карточки.", "Label details. The sheet explains the icons used on the card."]},
  {file:"mobile-services",node:"5674-68341",size:[375,812],caption:["Сервисы. Полный список открывается отдельно от карточки.","Services. The full list opens separately from the card."]},
  {file:"mobile-payment",node:"5674-69086",size:[375,812],caption:["Способы оплаты. Список из карточки раскрывается в отдельной панели.","Payment methods. The card’s list expands in a separate sheet."]},
  {file:"mobile-expanded",node:"5674-66396",size:[375,812],caption:["Рейтинг с раскрытым вводным описанием","Ranking with expanded introduction"]},
  {file:"mobile-inline",node:"5674-74898",size:[375,812],caption:["Рейтинг с быстрыми фильтрами под поиском","Ranking with quick filters under search"]},
  {file:"mobile-filter-panel",node:"5674-73664",size:[375,735],caption:["Панель фильтров до выбора условий","Filter panel before selection"]},
  {file:"mobile-filter-panel-filled",full:"mobile-filter-panel-filled",node:"5674-73756",size:[375,1431],caption:["Развёрнутая панель с выбранными условиями","Expanded panel with active filters"]},
  {file:"mobile-filter-list",node:"5674-75937",size:[383,600],caption:["Мобильный список фильтров","Mobile filter list"]},
  {file:"mobile-bonus",node:"5674-69721",size:[375,812],caption:["Бонус с промокодом и действием «Получить»","Bonus with promo code and redeem action"]},
  {file:"mobile-bonus-alt",node:"5674-70352",size:[375,812],caption:["Компактная карточка бонуса","Compact bonus card"]},
  {file:"mobile-hint-alt",node:"5674-70982",size:[375,812],caption:["Вариант бонуса с иллюстрацией","Illustrated bonus variant"]},
];
const finalRanking: Screen = {file:"ranking-full",node:"5674-46851",size:[1440,12930],caption:["Итоговый рейтинг сервисов для оплаты зарубежных покупок и подписок.", "Final ranking of services for international purchases and subscriptions."]};
const figma = "https://www.figma.com/design/TeiQJqa4EVQF5sKnjIWP1h/Portfolio-Ux-Ui";



function fullImage(screen:Screen){
  return `/work/exnode/${screen.full ?? screen.file}.png`;
}

const ratingDetails = [
  {file:"detail-payment",screen:0,label:["Выбор способа оплаты","Payment method selection"]},
  {file:"detail-search",screen:0,label:["Поиск и быстрые условия","Search and quick filters"]},
  {file:"detail-guides",screen:desktop.length-1,label:["Меню гайдов","Guides menu"]},
  ...filterTypes.map((item,index)=>({file:item.file,screen:desktop.length+index,label:item.caption})),
];

function DesktopShowcase({ru,open}:{ru:boolean;open:(index:number)=>void}){
  const locale=ru ? 0 : 1;
  const rows=[ratingDetails.slice(0,10),ratingDetails.slice(10)];
  const tile=(detail:typeof ratingDetails[number])=><span className="exnode-rating-detail">
    <img src={`/work/exnode/${detail.file}.png`} alt={detail.label[locale]} draggable={false} loading="lazy"/>
  </span>;

  return <div className="exnode-rating-side">
      {rows.map((row,i)=><div className="exnode-rating-row" key={i}>
        <div className="exnode-rating-track">
          <div className="exnode-rating-set">{row.map(detail=><span key={detail.file} className="exnode-rating-float">{tile(detail)}</span>)}</div>
          <div className="exnode-rating-set exnode-rating-repeat" aria-hidden="true">{row.map(detail=><span key={detail.file} className="exnode-rating-float">{tile(detail)}</span>)}</div>
        </div>
      </div>)}
      <button className="case-back exnode-rating-all" type="button" onClick={()=>open(0)}>
        {ru ? "ВСЕ СОСТОЯНИЯ" : "ALL STATES"}<ArrowIcon direction="up-right"/>
      </button>
    </div>;
}

const mobileSlots = [-1,0,1];
const mobileScreens = mobile.slice(1);
const mobileAutoplayDelay = 8000;
const mobileSlidePosition = (offset:number) => {
  const distance=Math.abs(offset);
  return {
    x:`${Math.sign(offset)*(distance===1 ? 62 : 88)}%`,
    scale:distance===0 ? 1 : distance===1 ? .74 : .56,
    opacity:distance===0 ? 1 : distance===1 ? .5 : 0,
  };
};

function MobileShowcase({ru}:{ru:boolean}){
  const reduced=useReducedMotion();
  const states=useRef<HTMLDivElement>(null);
  const inView=useInView(states,{amount:.55});
  const [{active,direction},setSlide]=useState({active:0,direction:1});
  const [suppressHover,setSuppressHover]=useState(false);
  const [manual,setManual]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [focused,setFocused]=useState(false);
  const autoplay=inView && !manual && !hovered && !focused && reduced===false;

  useEffect(()=>{
    if(!autoplay)return;

    let timer:number|undefined;
    const schedule=()=>{
      window.clearTimeout(timer);
      if(document.hidden)return;
      timer=window.setTimeout(()=>{
        setSlide(current=>({active:(current.active+1)%mobileScreens.length,direction:1}));
      },mobileAutoplayDelay);
    };
    schedule();
    document.addEventListener("visibilitychange",schedule);
    window.addEventListener("scroll",schedule,{capture:true,passive:true});
    return ()=>{
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange",schedule);
      window.removeEventListener("scroll",schedule,true);
    };
  },[active,autoplay]);

  const mainScreen=mobile[0];
  const locale=ru ? 0 : 1;
  const move=(offset:number)=>{
    setManual(true);
    setSuppressHover(true);
    setSlide(current=>({active:(current.active+offset+mobileScreens.length)%mobileScreens.length,direction:offset}));
  };
  const transition={type:"tween" as const,duration:reduced ? 0 : .48,ease:[.22,.61,.36,1] as const};

  return <div className="exnode-mobile-showcase"
    onPointerEnter={event=>{if(event.pointerType==="mouse" || event.pointerType==="pen")setHovered(true);}}
    onPointerLeave={()=>setHovered(false)}
    onFocus={()=>setFocused(true)}
    onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <header className="exnode-mobile-copy brandbook-section-head">
      <div><span className="kicker">08</span><h2 id="mobile-version-title">{ru ? "Мобильная версия" : "Mobile version"}</h2></div>
      <p>{ru ? "На мобильном строки таблицы превращаются в карточки. Фильтры и подробности открываются в нижних панелях, чтобы сохранить контекст рейтинга." : "On mobile, table rows become cards. Filters and details open in bottom sheets to preserve the ranking context."}</p>
    </header>
    <figure className="exnode-mobile-main">
      <div className="exnode-phone">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- allow keyboard scrolling inside the preview */}
        <div className="exnode-phone-scroll" data-smooth-preview role="region" tabIndex={0} aria-label={ru ? "Полный рейтинг, прокрутка по вертикали" : "Full ranking, scroll vertically"}>
          <img src={fullImage(mainScreen)} alt={mainScreen.caption[locale]} loading="lazy"/>
        </div>
      </div>
    </figure>
    <div className="exnode-mobile-states" ref={states}>
      <div className="exnode-mobile-track" data-suppress-hover={suppressHover} onPointerMove={()=>setSuppressHover(false)}>
        <AnimatePresence initial={false} custom={direction}>
          {mobileSlots.map(offset=>{
            const screen=mobileScreens[(active+offset+mobileScreens.length)%mobileScreens.length];
            const distance=Math.abs(offset);
            return <motion.div key={screen.file}
              className="exnode-mobile-slide"
              data-depth={distance}
              initial={mobileSlidePosition(direction*2)}
              animate={mobileSlidePosition(offset)}
              exit="exit"
              variants={{exit:(step:number)=>mobileSlidePosition(-step*2)}}
              transition={transition}>
              <button type="button"
                className="exnode-phone"
                aria-disabled={distance===0 || undefined}
                onClick={()=>{if(distance===1)move(offset);}}
                aria-label={screen.caption[locale]}>
                <img src={`/work/exnode/${screen.file}.png`} alt="" loading="lazy"/>
              </button>
            </motion.div>;
          })}
        </AnimatePresence>
      </div>
      <div className="exnode-mobile-footer">
        <p className="exnode-mobile-caption" aria-live={autoplay ? "off" : "polite"}>{mobileScreens[active].caption[locale].split(". ")[0]}</p>
        <div className="exnode-mobile-meta">
          <button type="button" className="exnode-viewer-control" onClick={()=>move(-1)} aria-label={ru ? "Листать назад" : "Previous slide"}><ArrowIcon direction="left"/></button>
          <span className="kicker">{String(active+1).padStart(2,"0")} / {mobileScreens.length}</span>
          <button type="button" className="exnode-viewer-control" onClick={()=>move(1)} aria-label={ru ? "Листать вперёд" : "Next slide"}><ArrowIcon direction="right"/></button>
        </div>
      </div>
    </div>
  </div>;
}

export function ExnodeDesignSystem({ru}:{ru:boolean}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [gallery,setGallery] = useState<Screen[]>(desktop);
  const [index,setIndex] = useState(0);
  const screen = gallery[index];
  const locale = ru ? 0 : 1;
  const caption = screen.caption[locale];
  const description = screen.detail?.[locale] ?? caption;
  const move = (offset:number) => {
    setIndex(current => (current + offset + gallery.length) % gallery.length);
    viewport.current?.scrollTo(0,0);
  };
  const selectGallery = (items:Screen[],i=0) => {
    setGallery(items);
    setIndex(i);
    viewport.current?.scrollTo(0,0);
  };
  const openGallery = (items:Screen[],i=0) => {
    selectGallery(items,i);
    dialog.current?.showModal();
    dialog.current?.focus({preventScroll:true});
    viewport.current?.scrollTo(0,0);
  };
  return <article className="exnode-design-case">
    <header className="about-intro">
      <div className="kicker">01 — {ru ? "ФИНТЕХ" : "FINTECH"}</div>
      <div className="about-intro-grid">
        <h1>{ru ? <>ДИЗАЙН-СИСТЕМА<br/>РЕЙТИНГОВ</> : <>RANKINGS<br/>DESIGN SYSTEM</>}</h1>
        <div className="about-intro-copy">
          <strong>{ru ? "ПРОДУКТОВЫЙ UX/UI-ДИЗАЙН" : "PRODUCT UX/UI DESIGN"}</strong>
          <p>{ru ? "Общий шаблон для страниц сравнения сервисов. От фильтров и таблиц до мобильных карточек." : "A shared template for service comparison pages, from filters and tables to mobile cards."}</p>
          <div className="about-facts"><span>{ru ? "ФИНАНСОВЫЙ МОНИТОРИНГ" : "FINANCIAL MONITORING"}</span><span>UX/UI</span><span>{ru ? "КОММЕРЧЕСКИЙ КОНТРАКТ" : "COMMERCIAL CONTRACT"}</span></div>
        </div>
      </div>
    </header>
    <section className="experience monitoring-overview" aria-label={ru ? "О проекте" : "Project overview"}>
      <span>{ru ? "О ПРОЕКТЕ" : "PROJECT OVERVIEW"}</span>
      <div>
        <b>02</b>
        <h2>{ru ? "Контекст и задача" : "Context and challenge"}</h2>
        <p>{ru ? "Платформа выросла из мониторинга обменников. Когда появились рейтинги финансовых и цифровых сервисов, таблицы и фильтры стали повторяться, но страницы оформлялись по-разному. Нужно было привести их к общей структуре сравнения." : "The platform grew from an exchanger monitor. As rankings expanded to financial and digital services, tables and filters began to recur across differently designed pages. The task was to give them a consistent comparison structure."}</p>
      </div>
      <div>
        <b>03</b>
        <h2>{ru ? "Один шаблон, разные рейтинги" : "One template, different rankings"}</h2>
        <p>{ru ? "Я задал общую структуру страницы: поиск, фильтры, вкладки и таблица. Состав колонок можно менять под данные конкретного рейтинга." : "I defined a shared page structure with search, filters, tabs and a table. Columns can vary according to the data each ranking needs."}</p>
      </div>
      <div>
        <b>04</b>
        <h2>{ru ? "Мобильная адаптация" : "Mobile adaptation"}</h2>
        <p>{ru ? "На узком экране строки таблицы становятся карточками. Фильтры и подробности открываются в нижних панелях." : "On narrow screens, table rows become cards. Filters and details open in bottom sheets."}</p>
      </div>
      <div>
        <b>05</b>
        <h2>{ru ? "Сборка в админ-панели" : "Assembly in the admin panel"}</h2>
        <p>{ru ? "Спроектировал фильтры, колонки и действия как отдельные компоненты, чтобы редактор мог собрать подходящий набор для каждого рейтинга." : "I designed filters, columns and actions as separate components so editors could assemble the set appropriate to each ranking."}</p>
      </div>
    </section>
    <section className="brandbook-pages-section">
      <div className="exnode-final-layout">
        <header className="brandbook-section-head exnode-final-copy">
          <span className="kicker">06 / {ru ? "ДЕСКТОП" : "DESKTOP"}</span>
          <h2>{ru ? "Рейтинг платёжных сервисов" : "Payment service rankings"}</h2>
          <p>{ru ? "Десктопный шаблон на примере сервисов для зарубежных покупок и подписок. В одной таблице можно сравнить комиссии, способы оплаты и отзывы." : "The desktop template applied to services for international purchases and subscriptions. One table compares fees, payment methods and reviews."}</p>
          <div className="hero-actions"><PortfolioLiquidLink href={`${figma}?node-id=${finalRanking.node}`} label={ru ? "ОТКРЫТЬ В FIGMA" : "OPEN IN FIGMA"} variant="solid"/></div>
        </header>
        <figure className="exnode-final-figure">
          <div className="exnode-rating-full">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- allow keyboard scrolling inside the preview */}
            <div className="exnode-phone-scroll" data-smooth-preview role="region" tabIndex={0} aria-label={ru ? "Итоговый рейтинг, прокрутка по вертикали" : "Final ranking, scroll vertically"}>
              <img src={fullImage(finalRanking)} alt={finalRanking.caption[locale]} width={finalRanking.size[0]} height={finalRanking.size[1]} loading="lazy"/>
            </div>
          </div>
        </figure>
      </div>
    </section>
    <section className="brandbook-pages-section">
      <header className="brandbook-section-head">
        <div><span className="kicker">07</span><h2>{ru ? "Состояния рейтинга" : "Ranking states"}</h2></div>
        <p>{ru ? "Для страниц рейтингов я спроектировал общий набор фильтров. В зависимости от того, что сравнивает пользователь, шаблон поддерживает выбор одного или нескольких значений, диапазон и поиск. Активные условия остаются на виду, чтобы их можно было быстро изменить." : "I designed shared filters for the rankings. Depending on what users compare, the template supports single or multiple selection, a range and search. Active criteria stay visible so they are easy to change."}</p>
      </header>
      <DesktopShowcase ru={ru} open={index=>openGallery(desktop,index)}/>
    </section>
    <section className="brandbook-pages-section" aria-labelledby="mobile-version-title">
      <MobileShowcase ru={ru}/>
    </section>
    <section className="brandbook-pages-section">
      <header className="brandbook-section-head">
        <div><span className="kicker">09</span><h2>{ru ? "Результат" : "Outcome"}</h2></div>
        <p>{ru ? "Подготовил десктопные и мобильные макеты, варианты фильтров и состояния таблицы. Для сборки в админ-панели спроектировал компоненты, из которых можно составить страницу под конкретный рейтинг." : "I prepared desktop and mobile designs, filter variants, and table states. I designed components that can be assembled in the admin panel for each ranking."}</p>
      </header>
    </section>
    <dialog ref={dialog} className="exnode-viewer" tabIndex={-1} aria-label={ru ? "Просмотр макетов" : "Design viewer"} onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
      <Cursor/>
      <div className="exnode-viewer-bar">
        <div className="exnode-viewer-groups">
          <div className="graphic-filters" role="group" aria-label={ru ? "Тип макета" : "Design type"}>
            <button type="button" className={gallery===desktop ? "is-active" : ""} aria-pressed={gallery===desktop} onClick={()=>selectGallery(desktop)}>{ru ? "Экраны" : "Screens"}</button>
            <button type="button" className={gallery===filterTypes ? "is-active" : ""} aria-pressed={gallery===filterTypes} onClick={()=>selectGallery(filterTypes)}>{ru ? "Компоненты" : "Components"}</button>
          </div>
          <span className="kicker" aria-live="polite">{index+1} / {gallery.length}</span>
        </div>
        <button type="button" className="exnode-viewer-control" onClick={() => dialog.current?.close()} aria-label={ru ? "Закрыть" : "Close"}>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"/></svg>
        </button>
      </div>
      <button type="button" className="exnode-viewer-control exnode-viewer-previous" onClick={() => move(-1)} aria-label={ru ? "Предыдущий экран" : "Previous screen"}><ArrowIcon direction="left"/></button>
      <button type="button" className="exnode-viewer-control exnode-viewer-next" onClick={() => move(1)} aria-label={ru ? "Следующий экран" : "Next screen"}><ArrowIcon direction="right"/></button>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- allow keyboard scrolling inside the viewer */}
      <div ref={viewport} className="exnode-viewer-scroll" role="region" tabIndex={0} aria-label={ru ? "Макет, прокрутка по вертикали" : "Design preview, scroll vertically"}>
        <figure key={screen.file} className={screen.full ? "exnode-viewer-long" : desktop.includes(screen) ? "exnode-viewer-desktop" : undefined}><img src={fullImage(screen)} alt={screen.caption[locale]}/></figure>
      </div>
      <footer className="exnode-viewer-footer">
        <p className="exnode-viewer-description">{description}</p>
        <div className="hero-actions"><PortfolioLiquidLink href={`${figma}?node-id=${screen.node}`} label={ru ? "ОТКРЫТЬ В FIGMA" : "OPEN IN FIGMA"} variant="solid"/></div>
      </footer>
    </dialog>
  </article>;
}
