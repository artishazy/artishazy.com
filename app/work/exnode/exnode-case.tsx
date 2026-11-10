import {ArrowIcon} from "../../components";

const figma = "https://www.figma.com/design/TeiQJqa4EVQF5sKnjIWP1h/Portfolio-Ux-Ui";

const copy = {
  ru: {
    label: "КЕЙС / ФИНТЕХ",
    role: ["РОЛЬ", "UX/UI-дизайнер"],
    scope: ["ФОРМАТ", "Коммерческий контракт"],
    context: "Контекст и моя роль",
    intro: "Продукт вырос из мониторинга криптообменников в платформу сравнения финансовых и цифровых сервисов. По контракту я проектировал пользовательские веб-интерфейсы, шаблоны рейтингов, компоненты дизайн-системы и сценарии внутренней админ-панели.",
    process: "Как шла работа",
    workflow: "Обсуждал задачу и требования с аналитиком и командой, разбирался в структуре и ограничениях, проектировал макеты в Figma, согласовывал решения и вносил правки. После согласования передавал макеты в разработку.",
    details: "Посмотреть детали",
    figma: "Открыть макеты в Figma",
    result: "Что получилось",
    steps: [
      {
        title: "Дизайн-система рейтингов",
        summary: "Страницы рейтингов использовали похожие элементы, но общей дизайн-системы ещё не было. Для редизайна я спроектировал шаблон страницы и разработал дизайн-систему для повторяющихся компонентов, блоков и типов данных.",
        details: [
          "В шаблоне предусмотрел таблицу, фильтры и их состояния, варианты ячеек и контентные блоки. Компоненты проектировал с учётом дальнейшей сборки страниц в админ-панели.",
        ],
        caption: "Страница рейтинга сервисов для оплаты за рубежом",
      },
      {
        title: "Внутренний «Конструктор»",
        summary: "Для изменений в контенте и настройках команда обращалась к разработчикам. Я спроектировал админ-панель, в которой редактор может управлять рейтингами, контентом и настройками платформы.",
        details: [
          "Разделил функции по задачам и сгруппировал связанные настройки. Предусмотрел управление индексацией, редиректами и метрикой, настройку форм отзывов, работу с данными, историю изменений и статусы.",
          "Для таблиц разработал систему типов колонок. У каждого типа свой набор параметров, чтобы редактор мог настроить структуру рейтинга без технических знаний.",
        ],
        caption: "«Конструктор» · настройка контентного блока «Шаги»",
      },
    ],
  },
  en: {
    label: "CASE STUDY / FINTECH",
    role: ["ROLE", "UX/UI designer"],
    scope: ["ENGAGEMENT", "Commercial contract"],
    context: "Context and my role",
    intro: "The product grew from a crypto exchange monitor into a comparison platform for financial and digital services. As a contractor, I designed customer-facing web interfaces, ranking templates, design system components and workflows for the internal admin panel.",
    process: "How I worked",
    workflow: "I discussed requirements with the analyst and team, reviewed the structure and constraints, designed in Figma, and revised the mockups based on feedback. Once the designs were agreed, I handed them off to development.",
    details: "View details",
    figma: "Open designs in Figma",
    result: "Design outcome",
    steps: [
      {
        title: "A design system for rankings",
        summary: "Ranking pages shared recurring elements and lacked a common design system. For the redesign, I created a page template and a design system for reusable components, blocks and data types.",
        details: [
          "The template covers the table, filter states, cell variants and content blocks. I designed the components around how pages would be assembled in the admin panel.",
        ],
        caption: "International payment service rankings",
      },
      {
        title: "The internal builder",
        summary: "The team relied on developers to update content and settings. I designed an admin panel for editors to manage rankings, content and platform settings.",
        details: [
          "I organized navigation around editorial tasks and grouped related settings. The designs cover indexing, redirects, analytics, review forms, data management, change history and statuses.",
          "I designed column types with their own settings so editors could configure ranking tables without technical knowledge.",
        ],
        caption: "Internal builder · editing a steps block",
      },
    ],
  },
};

const screens = [
  {node: "5674-41410"},
  {node: "5675-94313"},
];

export function ExnodeCase({ru,builder}: {ru:boolean;builder:boolean}) {
  const p = ru ? copy.ru : copy.en;
  const index = builder ? 1 : 0;
  const step = p.steps[index];
  const screen = screens[index];
  const task = builder
    ? (ru ? "Спроектировать админ-панель для управления контентом, рейтингами и настройками." : "Design an internal admin panel for content, rankings and settings.")
    : (ru ? "Обновить страницу рейтинга и создать общую систему для страниц сравнения." : "Redesign the ranking page and create a shared system for comparison pages.");
  const home = ru ? "Главная · редизайн" : "Homepage redesign";

  return <article className="exnode-case">
    <header className="case-hero">
      <a className="case-back" href="/work"><ArrowIcon direction="left"/>{ru ? "ВСЕ КЕЙСЫ" : "ALL CASES"}</a>
      <div className="kicker">{ru ? "ФИНАНСОВЫЙ МОНИТОРИНГ" : "FINANCIAL MONITORING"} / {p.label}</div>
      <h1>{step.title}</h1>
      <p className="case-lead">{task}</p>
      <dl className="exnode-facts">
        {[p.role, p.scope].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
    </header>

    <section className="exnode-section">
      <span className="kicker">01</span>
      <div><h2>{p.context}</h2><p>{p.intro}</p><h3>{p.process}</h3><p>{p.workflow}</p></div>
    </section>

    <section className="exnode-section">
      <span className="kicker">02</span>
      <div>
        <h2>{ru ? "Ключевые решения" : "Key design decisions"}</h2>
        <p>{step.summary}</p>
        {builder ? step.details.map((detail, i) => <section className="exnode-decision" key={detail}>
          <h3>{(ru ? ["Навигация и настройки", "Типы колонок"] : ["Navigation and settings", "Column types"])[i]}</h3>
          <p>{detail}</p>
        </section>) : <p>{step.details[0]}</p>}
        <details>
          <summary>{p.details}</summary>
          <p><a href={`${figma}?node-id=${screen.node}`}>{p.figma} ↗</a></p>
          {builder && <p><a href={`${figma}?node-id=5675-90679`}>{ru ? "Настройки столбцов в Figma" : "Column settings in Figma"} ↗</a></p>}
        </details>
      </div>
    </section>

    <section className="exnode-section">
      <span className="kicker">03</span>
      <div>
        <h2>{ru ? "Финальный дизайн" : "Final design"}</h2>
        {builder ? <>
          <figure className="exnode-screen">
            <img src="/work/exnode/builder-table.png" width="1440" height="812" loading="lazy" alt={ru ? "Редактор таблицы с типами колонок" : "Table editor showing column types"}/>
            <figcaption>{ru ? "Редактор рейтинга. Типы данных видны под названиями колонок." : "Ranking editor. Data types appear beneath column names."}</figcaption>
          </figure>
          <figure className="exnode-screen">
            <img src="/work/exnode/builder-navigation.png" width="1440" height="864" loading="lazy" alt={ru ? "Навигация конструктора и настройки SEO" : "Builder navigation and SEO settings"}/>
            <figcaption>{ru ? "Навигация по разделам страницы и настройки SEO." : "Page sections in the sidebar and SEO settings."}</figcaption>
          </figure>
        </> : <>
          <figure className="exnode-screen">
            <img src="/work/exnode/ranking-page.png" width="1440" height="1024" loading="lazy" alt={step.caption}/>
            <figcaption>{ru ? "Шаблон рейтинга. Заголовок, фильтры и таблица в контексте страницы." : "Ranking template showing the title, filters and table in context."}</figcaption>
          </figure>
          <h3>{home}</h3>
          <p>{ru ? "В редизайне главной применил ту же систему таблиц: общую структуру строк, метки и действия. Содержание колонок адаптировал под выбор обменника." : "The homepage redesign uses the same table system for row structure, labels and actions. I adapted the columns to help users choose an exchanger."}</p>
          <figure className="exnode-screen">
            <img src="/work/exnode/monitoring.png" width="1318" height="1050" loading="lazy" alt={home}/>
            <figcaption>{home}</figcaption>
          </figure>
        </>}
      </div>
    </section>
    <section className="exnode-section">
      <span className="kicker">04</span>
      <div><h2>{p.result}</h2><p>{builder
        ? (ru ? "Подготовил макеты админ-панели с настройками контента и рейтингов. Типы колонок задают редактору параметры для самостоятельной сборки таблицы." : "I prepared admin panel designs for managing content and rankings. Column types give editors the settings they need to build tables.")
        : (ru ? "Подготовил шаблон рейтинга и библиотеку компонентов. Редизайн главной показывает, как система работает на странице с другой задачей." : "I created a ranking template and component library. The homepage redesign shows how the system works for a different task.")}</p></div>
    </section>
  </article>;
}
