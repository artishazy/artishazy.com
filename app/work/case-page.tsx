"use client";

import {ArrowIcon,LocalizedShell} from "../components";

const works=[
  {slug:"exnode",title:"EXNODE / FINANCE"},
  {slug:"dreamy",title:"DREAMY / SLEEP APP"},
  {slug:"colorist",title:"COLORIST / ACCESSIBILITY"},
  {slug:"landings",title:"LANDINGS / SELECTED"},
];

type Copy={title:string;subtitle:string;challenge:string;solution:string;outcome:string};
type Detail={ru:Copy;en:Copy};

export const caseDetails:Record<string,Detail>={
  exnode:{
    ru:{title:"EXNODE / FINANCE",subtitle:"Платформа мониторинга криптообменников и финансовых продуктов.",challenge:"Большой объём рейтингов, показателей и сервисных данных должен оставаться понятным и помогать пользователю принимать решения.",solution:"Исследование поведения, ясная структура данных, последовательные сценарии и поддерживаемая дизайн-система формируют масштабируемый продукт.",outcome:"Сложная финансовая информация складывается в спокойный интерфейс с предсказуемой логикой."},
    en:{title:"EXNODE / FINANCE",subtitle:"A monitoring platform for crypto exchanges and financial products.",challenge:"A large volume of ratings, metrics and service data needs to remain understandable and support decision-making.",solution:"Behavior research, clear data structure, consistent flows and a maintained design system create a scalable product.",outcome:"Complex financial information becomes a calm interface with predictable logic."},
  },
  dreamy:{
    ru:{title:"DREAMY / SLEEP APP",subtitle:"Мобильное приложение для контроля качества сна.",challenge:"Данные о сне должны быть понятны с первого взгляда, не перегружая пользователя медицинской сложностью.",solution:"Сценарии отслеживания, ясная иерархия показателей и мягкая визуальная система превращают наблюдения в ежедневную привычку.",outcome:"Пользователь видит динамику сна и понимает следующие действия без лишнего когнитивного давления."},
    en:{title:"DREAMY / SLEEP APP",subtitle:"A mobile application for tracking sleep quality.",challenge:"Sleep data needs to be clear at a glance without overwhelming the user with medical complexity.",solution:"Tracking flows, a clear metric hierarchy and a calm visual system turn observations into a daily habit.",outcome:"Users can see sleep patterns and understand next steps without unnecessary cognitive load."},
  },
  colorist:{
    ru:{title:"COLORIST / ACCESSIBILITY",subtitle:"Инструмент работы с цветом для авторов и пользователей с нарушением цветовосприятия.",challenge:"Подбор палитры должен одновременно поддерживать творческий процесс и учитывать доступность.",solution:"Сравнение цветов, понятные состояния контраста и интерактивный прототип объединены в одном рабочем сценарии.",outcome:"Цветовые решения становятся быстрее, осознаннее и доступнее для более широкой аудитории."},
    en:{title:"COLORIST / ACCESSIBILITY",subtitle:"A color tool for creators and colorblind users.",challenge:"Palette selection needs to support creative work while accounting for accessibility.",solution:"Color comparison, clear contrast states and an interactive prototype are combined into one working flow.",outcome:"Color decisions become faster, more intentional and accessible to a wider audience."},
  },
  landings:{
    ru:{title:"LANDINGS / SELECTED",subtitle:"Серия коммерческих сайтов для медицины, строительства, стоматологии и систем безопасности.",challenge:"Разные отрасли и аудитории требовали своей структуры, сохраняя понятную коммуникацию и адаптивность.",solution:"Исследование контекста, модульные сетки, прототипы и сборка в Tilda Zero Block позволили быстро адаптировать подход под каждый проект.",outcome:"Каждый сайт получил собственный характер и ясный путь от первого экрана к целевому действию."},
    en:{title:"LANDINGS / SELECTED",subtitle:"Commercial websites for medicine, construction, dentistry and security systems.",challenge:"Different industries and audiences required distinct structures while keeping communication clear and responsive.",solution:"Context research, modular grids, prototypes and Tilda Zero Block development made the approach adaptable to every project.",outcome:"Each website gained its own character and a clear path from the first screen to the target action."},
  },
};

export function CasePage({slug}:{slug:string}){
  return <LocalizedShell>{ru=>{
    const detail=caseDetails[slug];
    const p=ru?detail.ru:detail.en;
    const current=Math.max(0,works.findIndex(work=>work.slug===slug));
    const next=works[(current+1)%works.length];
    const process=ru?[
      ["01","ИССЛЕДОВАНИЕ","Интервью, анализ пользователей, рынка и конкурентов, формулировка задачи."],
      ["02","СТРУКТУРА","Информационная архитектура, CJM, пользовательские потоки и каркасные экраны."],
      ["03","СИСТЕМА","Типографика, компоненты, состояния, адаптивные правила и дизайн-система."],
      ["04","ПЕРЕДАЧА","Интерактивный прототип, финальные экраны и подготовка материалов для разработки."],
    ]:[
      ["01","DISCOVERY","Interviews, user, market and competitor analysis, and problem framing."],
      ["02","STRUCTURE","Information architecture, CJM, user flows and wireframes."],
      ["03","SYSTEM","Typography, components, states, responsive rules and design system."],
      ["04","DELIVERY","Interactive prototype, final screens and development handoff."],
    ];
    return <>
      <section className="case-hero"><div className="kicker">{ru?"КЕЙС":"CASE STUDY"} / 2026</div><h1>{p.title.split(" / ")[0]}<br/><span>{p.title.split(" / ")[1]}</span></h1><p className="case-lead">{p.subtitle}</p><div className="case-facts glass-panel"><p><span>{ru?"РОЛЬ":"ROLE"}</span>{ru?"Продуктовый дизайн":"Product design"}<br/>UX/UI</p><p><span>{ru?"ЗАДАЧИ":"SCOPE"}</span>{ru?"Исследование":"Research"}<br/>{ru?"Прототип и система":"Prototype & system"}</p><p><span>{ru?"ГОД / СТАТУС":"YEAR / STATUS"}</span>2026<br/>{ru?"В РАБОТЕ / ЗАВЕРШЕНО":"ONGOING / COMPLETED"}</p></div></section>
      <section className="case-cover"><div className="case-object"><i/><i/><i/></div><span>01 / {ru?"ГЛАВНЫЙ ОБРАЗ":"HERO VISUAL"}</span><b className="segment-mark">M2.</b></section>
      <section className="case-copy"><h2>{ru?<>ОТ СЛОЖНОСТИ<br/>К ЯСНОСТИ.</>:<>FROM COMPLEXITY<br/>TO CLARITY.</>}</h2><div><span>{ru?"ЗАДАЧА":"THE CHALLENGE"}</span><p>{p.challenge}</p><span>{ru?"РЕШЕНИЕ":"THE SOLUTION"}</span><p>{p.solution}</p></div></section>
      <section className="process"><div className="process-head"><span>02—{ru?"ПРОЦЕСС":"PROCESS"}</span><h2>{ru?<>КАК ЭТО<br/>СДЕЛАНО</>:<>HOW IT<br/>WAS MADE</>}</h2></div>{process.map(item=><article className="process-step glass-panel" key={item[0]}><b>{item[0]}</b><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</section>
      <section className="case-panels"><div>{ru?"ИССЛЕДОВАНИЕ":"DISCOVERY"}<br/><b>UX</b></div><div>{ru?"СИСТЕМА":"SYSTEM"}<br/><b>UI</b></div><div>{ru?"ИНТЕРФЕЙС":"INTERFACE"}<br/><b>WEB</b></div></section>
      <section className="outcome"><span>03—{ru?"РЕЗУЛЬТАТ":"OUTCOME"}</span><blockquote>“{p.outcome}”</blockquote><div><b>01</b><small>{ru?"ИССЛЕДОВАНИЕ":"RESEARCH"}</small></div><div><b>01</b><small>{ru?"СИСТЕМА":"SYSTEM"}</small></div><div><b>01</b><small>{ru?"ПРОТОТИП":"PROTOTYPE"}</small></div></section>
      <a className="next-project interactive" href={"/work/"+next.slug}><span>{ru?"СЛЕДУЮЩИЙ ПРОЕКТ":"NEXT PROJECT"}</span><strong>{next.title}</strong><ArrowIcon direction="up-right"/></a>
    </>;
  }}</LocalizedShell>;
}
