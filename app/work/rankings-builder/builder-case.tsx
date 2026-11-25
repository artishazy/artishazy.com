"use client";
import {useRef} from "react";
import {ArrowIcon,Cursor,SliderControls,useHorizontalTrack} from "../../components";
import "../rankings/case-readability.css";

const blockModals=[
 ["steps","Шаги","Steps"],["stages","Этапы","Stages"],["cards","Карточки","Cards"],
 ["tiles","Плитки","Tiles"],["list","Список","List"],["accordion","Раскрывающийся список","Accordion"],
 ["cta","CTA","CTA"],["note","Заметка","Note"],["quote","Цитата","Quote"],["links","Перелинковка","Related links"]
];

function BlockModalGallery({ru}:{ru:boolean}){
 const track=useRef<HTMLDivElement>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 useHorizontalTrack(track);
 return <section className="story-section" id="block-modals">
  <div className="story-copy"><span className="kicker">{ru?"КОНТЕНТНЫЕ БЛОКИ":"CONTENT BLOCKS"}</span><h2>{ru?"Модалки для каждого типа блока":"Dialogs for each block type"}</h2><p>{ru?"Для разных форматов контента спроектировал отдельные формы редактирования. В каждой собраны поля и настройки, необходимые для выбранного типа блока.":"I designed dedicated editing forms for different content formats, each with fields and settings specific to the selected block type."}</p></div>
  <div className="graphic-gallery filter-library">
   <div className="graphic-gallery-head"><SliderControls track={track} current={0} total={blockModals.length} ru={ru} hideCount/></div>
   <div className="graphic-project-grid filter-library-grid" ref={track}>
    {blockModals.map(item=><button type="button" data-slide data-case-card data-cursor-label={ru?"СМОТРЕТЬ":"VIEW"} className="project-card interactive filter-state-card" key={item[0]} onClick={()=>{dialog.current?.showModal();dialog.current?.focus();}}>
     <div className="project-visual case-overlay-visual monitoring"><img src={`/work/rankings/builder-modal-${item[0]}.png`} alt={item[ru?1:2]} loading="lazy"/><div className="case-card-overlay"><h3>{item[ru?1:2]}</h3></div></div>
    </button>)}
   </div>
  </div>
  <dialog ref={dialog} className="rankings-viewer case-design-board builder-block-board" tabIndex={-1} aria-label={ru?"Макеты контентных блоков":"Content block designs"}>
   <Cursor/>
   <header className="design-board-bar"><h2>{ru?"Модалки контентных блоков":"Content block dialogs"}</h2><button className="case-back" onClick={()=>dialog.current?.close()}>{ru?"ЗАКРЫТЬ":"CLOSE"} ×</button></header>
   <div className="design-board-scroll" data-smooth-preview>
    <section className="design-board-group board-filters"><div className="design-board-grid">
     {blockModals.map((item,index)=><figure key={item[0]}><div className="board-image" data-smooth-preview><img src={`/work/rankings/builder-modal-${item[0]}.png`} alt={item[ru?1:2]} loading="lazy"/></div><figcaption><span>{String(index+1).padStart(2,"0")}</span><p>{item[ru?1:2]}</p></figcaption></figure>)}
    </div></section>
   </div>
  </dialog>
 </section>;
}

export function BuilderCase({ru}:{ru:boolean}){
 const text=(r:string,e:string)=>ru?r:e;
 return <article className="rankings-design-case case-story builder-story">
  <a className="case-back story-back" href="/work"><ArrowIcon direction="left"/>{text("ВСЕ ПРОЕКТЫ","ALL PROJECTS")}</a>
  <div className="ranking-opening">
   <header className="story-hero">
    <div className="story-tags"><span>FINTECH</span><span>WEB / ADMIN</span></div>
    <h1>{text("ВНУТРЕННИЙ «КОНСТРУКТОР»","INTERNAL BUILDER")}</h1>
    <p>{text("В команде с аналитиком и разработчиками спроектировал большую часть внутренней админ-панели: редактор рейтингов, контентные блоки и настройки страниц.","Working with an analyst and developers, I designed a substantial part of the internal admin panel, including ranking editing, content blocks and page settings.")}</p>
    <div className="hero-actions"><a href="https://www.figma.com/design/TeiQJqa4EVQF5sKnjIWP1h/Portfolio-Ux-Ui?node-id=6219-36478" target="_blank" rel="noreferrer">{text("КЕЙС В FIGMA","CASE IN FIGMA")}<ArrowIcon direction="up-right"/></a></div>
   </header>
   <figure className="builder-preview"><img src="/work/rankings/builder-table.png" width="1440" height="812" alt={text("Редактор таблицы рейтинга","Ranking table editor")}/></figure>
  </div>
  <section className="story-summary">
   <div className="story-section-label"><span className="kicker">{text("О ПРОЕКТЕ","PROJECT SUMMARY")}</span><h2>{text("Коротко о работе","At a glance")}</h2></div>
   <div className="story-summary-grid">
    <div className="story-goals"><h3>{text("Задачи","Objectives")}</h3><ul>
     <li>{text("Спроектировать управление страницами и контентом продукта.","Design page and content management.")}</li>
     <li>{text("Предусмотреть сборку рейтингов с разными типами данных.","Support ranking tables with different data types.")}</li>
     <li>{text("Сгруппировать настройки по редакторским задачам.","Organize settings around editorial tasks.")}</li>
    </ul></div>
    <dl><div><dt>{text("РОЛЬ","ROLE")}</dt><dd>UX/UI {text("дизайнер","designer")}</dd></div><div><dt>{text("ФОРМАТ","ENGAGEMENT")}</dt><dd>{text("Коммерческий проект","Commercial project")}</dd></div><div><dt>{text("ВЗАИМОДЕЙСТВИЕ","COLLABORATION")}</dt><dd>{text("Аналитик и команда разработки","Analyst and development team")}</dd></div><div><dt>{text("ЗОНА ОТВЕТСТВЕННОСТИ","SCOPE")}</dt><dd>{text("Большая часть админ-панели: сценарии, UI и состояния","Structure, workflows, UI and states")}</dd></div></dl>
   </div>
  </section>
  <section className="story-section">
   <div className="story-copy"><span className="kicker">{text("ЗАДАЧА И ПОДХОД","PROBLEM AND APPROACH")}</span><h2>{text("Передать управление страницами команде","Give the team control over pages")}</h2><p>{text("Команде требовался инструмент, через который можно менять рейтинги и содержимое страниц без постоянного обращения к разработчикам. Я работал над большой частью админ-панели: от структуры разделов до сценариев редактирования таблиц, контентных блоков и баннеров.","The team relied on developers for content and settings changes. I brought ranking, page content and configuration tools into one builder, connected to the public ranking template and design system.")}</p></div>
  </section>
  <section className="story-section builder-feature">
   <div className="story-copy"><span className="kicker">{text("ТАБЛИЦЫ","TABLES")}</span><h2>{text("Один редактор для разных рейтингов","Build rankings from column types")}</h2><p>{text("Рейтинги отличаются составом данных и колонок. Я спроектировал редактор, в котором структуру таблицы можно настроить под конкретную страницу. Тип колонки определяет, какие данные в ней вводятся и как они будут выглядеть в публичном рейтинге. Так конструктор связан с разработанной дизайн-системой.","Different rankings need numbers, names with logos, single and multiple selections, ranges and ratings. I designed column data types and their associated settings. Editors add rows and columns, fill cells and save the table.")}</p></div>
   <figure className="builder-preview"><img src="/work/rankings/builder-table.png" width="1440" height="812" alt={text("Типы данных под заголовками колонок, добавление строк и столбцов","Data types beneath column headings and controls for adding rows and columns")} loading="lazy"/></figure>
  </section>
  <section className="story-section builder-feature">
   <div className="story-copy"><span className="kicker">{text("НАВИГАЦИЯ И НАСТРОЙКИ","NAVIGATION AND SETTINGS")}</span><h2>{text("Управление страницей по разделам","Sections organized around editorial tasks")}</h2><p>{text("В одной админ-панели нужно было объединить работу с данными, контентом и настройками страницы. Сгруппировал связанные инструменты в разделы, чтобы редактор мог перейти к своей задаче и работать с её настройками в одном месте.","Table, SEO, copy, FAQ, articles and banners have dedicated sidebar sections. The SEO screen groups H1, introduction, Title, Description and breadcrumbs, with length counters and template controls beside the corresponding fields.")}</p></div>
   <figure className="builder-preview"><img src="/work/rankings/builder-navigation.png" width="1440" height="864" alt={text("Боковая навигация и форма настройки SEO","Sidebar navigation and SEO configuration form")} loading="lazy"/></figure>
  </section>
  <section className="story-section builder-feature">
   <div className="story-copy"><span className="kicker">{text("ПАРАМЕТРЫ КОЛОНОК","COLUMN SETTINGS")}</span><h2>{text("Проработал сценарии изменения таблицы","Settings follow the data type")}</h2><p>{text("Для таблицы подготовил сценарии добавления и редактирования строк и колонок, скрытия и удаления данных, закрепления и сортировки. Формы настройки зависят от типа данных. Это позволяет менять структуру рейтинга в рамках одного редактора.","I designed column editing forms. The fee column has a name, slug, number type, width and alignment. Row workflows cover adding, editing, hiding and deleting. Columns also support pinning and sorting.")}</p></div>
   <figure className="builder-preview"><img src="/work/rankings/builder-column.png" width="1024" height="578" alt={text("Форма изменения колонки Комиссия","Fee column settings")} loading="lazy"/></figure>
  </section>
  <BlockModalGallery ru={ru}/>
  <section className="story-section builder-feature">
   <div className="story-copy"><span className="kicker">{text("БАННЕРЫ","BANNERS")}</span><h2>{text("Баннеры в системе управления контентом","Separate desktop and mobile configuration")}</h2><p>{text("Проработал управление баннерами и их адаптациями для десктопа и телефона. Редактор позволяет собрать баннер из подготовленных дизайнером слоёв и проверить результат в предпросмотре. Для загрузки и сохранения предусмотрены отдельные состояния.","The banner editor includes a preview, PNG layers for left, center and right zones, and background color or image settings. Desktop and Mobile have separate tabs. An empty banner has a message explaining what to add before saving.")}</p></div>
   <figure className="builder-preview"><img src="/work/rankings/builder-banners.png" width="1024" height="569" alt={text("Редактор баннера с зонами загрузки слоёв","Banner editor with layer upload zones")} loading="lazy"/></figure>
  </section>
  <section className="story-section">
   <div className="story-copy"><span className="kicker">{text("КОМАНДНАЯ РАБОТА","TEAMWORK")}</span><h2>{text("От требований к согласованным макетам","From requirements to agreed designs")}</h2><p>{text("Задачи и требования обсуждал с аналитиком и командой. Разбирался в структуре и ограничениях, проектировал сценарии и экраны в Figma. Показывал макеты команде, согласовывал решения и вносил правки по обратной связи. После согласования передавал макеты в разработку.","I discussed tasks and requirements with the analyst and team, examined structure and constraints, and designed workflows and screens in Figma. I reviewed designs with the team, agreed on solutions and revised them in response to feedback before handoff to development.")}</p></div>
  </section>
  <section className="story-section story-takeaways" id="takeaways">
   <div className="story-copy"><span className="kicker">{text("ИТОГ","OUTCOME")}</span><h2>{text("Что входит в проект","What the project includes")}</h2></div>
   <div className="story-lessons">
    <div><h3>{text("Структура админ-панели","Admin structure")}</h3><p>{text("Структура разделов и сценарии работы с большой частью внутренней админ-панели.","Navigation between page and content management tasks.")}</p></div>
    <div><h3>{text("Редактор рейтингов","Ranking editor")}</h3><p>{text("Редактор таблиц, типы данных и сценарии управления строками и колонками.","Tables with column types, settings and data editing actions.")}</p></div>
    <div><h3>{text("Связь с дизайн-системой","Design system connection")}</h3><p>{text("Инструменты для наполнения страниц по правилам шаблона и дизайн-системы рейтингов.","Table assembly follows the structure and data types defined in the public ranking template.")}</p></div>
   </div>
  </section>
 </article>;
}
