"use client";

import AsciiHero from "./AsciiHero";
import {ArrowIcon,Footer,Header,PageTitle,ProjectGrid,useSiteLanguage} from "./components";

const graphicItems=[
  {ru:"АЙДЕНТИКА / VOID",en:"IDENTITY / VOID"},
  {ru:"ПОСТЕРЫ / SIGNAL",en:"POSTERS / SIGNAL"},
  {ru:"ШРИФТОВЫЕ ЭТЮДЫ",en:"TYPE STUDIES"},
  {ru:"СОЦСЕТИ / RAW",en:"SOCIAL / RAW"},
  {ru:"ЛОГОТИПЫ / 2026",en:"LOGOS / 2026"},
  {ru:"ПЕЧАТЬ / ОБЪЕКТЫ",en:"PRINT / OBJECTS"},
];

const services=[
  {ruTitle:"ПРОДУКТОВЫЙ ДИЗАЙН",enTitle:"PRODUCT DESIGN",code:"UX / UI",href:"/work"},
  {ruTitle:"САЙТЫ",enTitle:"WEBSITES",code:"WEB / MOTION",href:"/work/landings"},
  {ruTitle:"ГРАФИКА",enTitle:"GRAPHIC DESIGN",code:"BRAND / SYSTEM",href:"#graphic"},
  {ruTitle:"ЦИФРОВОЙ АРТ",enTitle:"DIGITAL ART",code:"ART / 3D",href:"#art"},
];

function Stage({ru}:{ru:boolean}){
  return <div className="stage" aria-label={ru?"Интерактивный объёмный ASCII-арт на модульной сетке":"Interactive volumetric ASCII artwork on a modular grid"}>
    <div className="stage-grid"/>
    <AsciiHero ru={ru}/>
  </div>;
}

export default function Home(){
  const{ru,toggle}=useSiteLanguage();

  return <main className="landing">
    <Header landing ru={ru} onToggleLanguage={toggle}/>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{ru?"ПРОДУКТОВЫЙ UX/UI-ДИЗАЙНЕР / АРТ-ДИРЕКТОР — 2026":"PRODUCT UX/UI DESIGNER / ART DIRECTOR — 2026"}</p>
        <h1>{ru?<><span className="hero-line hero-line-outline">ИСКУССТВО —</span><span className="hero-line hero-line-main">ПРОЯВЛЯЕТСЯ</span><span className="hero-line hero-line-last">ИЗ ТУМАНА.</span></>:<><span className="hero-line hero-line-outline">ART —</span><span className="hero-line hero-line-main">EMERGES FROM</span><span className="hero-line hero-line-last">THE HAZE.</span></>}</h1>
      </div>
      <Stage ru={ru}/>
    </section>

    <section className="landing-section main-services" id="services">
      <PageTitle index="01" label={ru?"НАПРАВЛЕНИЯ":"DIRECTIONS"} title={ru?"ГЛАВНЫЕ НАПРАВЛЕНИЯ":"MAIN DIRECTIONS"} description={ru?"Четыре области, в которых исследование и продуктовая логика встречаются с характерным визуальным языком.":"Four areas where research and product logic meet a distinct visual language."}/>
      <div className="main-service-list">
        {services.map((service,index)=><a className="main-service-row" href={service.href} key={service.enTitle}>
          <span className="main-service-number">0{index+1}</span>
          <h2>{ru?service.ruTitle:service.enTitle}</h2>
          <small>{service.code}</small>
          <ArrowIcon className="main-service-arrow"/>
        </a>)}
      </div>
    </section>

    <section className="landing-section" id="work">
      <PageTitle index="02" label={ru?"ИЗБРАННЫЕ ПРОЕКТЫ":"SELECTED WORK"} title={ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"} description={ru?"EXNODE, DREAMY, COLORIST и избранные коммерческие сайты: от исследования и структуры до адаптивного интерфейса.":"EXNODE, DREAMY, COLORIST and selected commercial websites — from research and structure to responsive interfaces."}/>
      <ProjectGrid ru={ru}/>
    </section>

    <section className="landing-section" id="graphic">
      <PageTitle index="03" label={ru?"ГРАФИЧЕСКИЙ ДИЗАЙН":"GRAPHIC DESIGN"} title={ru?"ГРАФИКА / АРХИВ":"GRAPHIC / ARCHIVE"} description={ru?"Айдентика, логотипы, постеры, печатные материалы и визуальные системы.":"Identity, logos, posters, printed matter and visual systems."}/>
      <div className="masonry">{graphicItems.slice(0,3).map((item,i)=><article className={`graphic-tile t${i}`} key={item.en}><div><b>{i%3===0?"A—Z":i%3===1?"▓▒░":"( )"}</b><i/></div><span>0{i+1}</span><h2>{ru?item.ru:item.en}</h2></article>)}</div>
      <a className="section-link" href="/graphic">{ru?"СМОТРЕТЬ ВЕСЬ АРХИВ":"VIEW FULL ARCHIVE"} <ArrowIcon direction="up-right"/></a>
    </section>

    <section className="landing-section" id="art">
      <PageTitle index="04" label={ru?"ЛИЧНАЯ ЛАБОРАТОРИЯ":"PERSONAL LAB"} title={ru?"АРТ / ЭКСПЕРИМЕНТЫ":"ART / EXPERIMENTS"} description={ru?"Свободная визуальная зона: цифровое искусство, исследования формы, шум, пиксели и генеративные эксперименты.":"An open visual lab for digital art, form studies, noise, pixels and generative experiments."}/>
      <div className="art-wall home-art"><div className="ascii">{`      .+######+.
   .##▒▒░░▒▒##.
  ##▒░  ()  ░▒##
  ##▒  /||\\  ▒##
   '## /_||_\\ ##'
      ######
   ARTIFACT_001`}</div><div className="glitch-word" data-text="HAZY">HAZY</div></div>
      <a className="section-link" href="/art">{ru?"ОТКРЫТЬ ЛАБОРАТОРИЮ":"OPEN THE LAB"} <ArrowIcon direction="up-right"/></a>
    </section>

    <section className="landing-section" id="about">
      <div className="about-hero"><div className="kicker">05—{ru?"ОБО МНЕ / ПРОФИЛЬ":"ABOUT / PROFILE"}</div><h1>{ru?<>ДЕЛАЮ<br/>СЛОЖНОЕ <span>ЯСНЫМ.</span></>:<>MAKING<br/>COMPLEXITY <span>CLEAR.</span></>}</h1><p>{ru?"Я — Даниил Черкашин, продуктовый UX/UI-дизайнер и магистрант МИСИС. Исследую поведение пользователей и проектирую понятные системы для сложных цифровых продуктов.":"I am Daniil Cherkashin, a product UX/UI designer and MISIS master's student. I research user behavior and design clear systems for complex digital products."}</p></div>
      <a className="section-link about-link" href="/about">{ru?"ПОДРОБНЕЕ ОБО МНЕ":"MORE ABOUT ME"} <ArrowIcon direction="up-right"/></a>
    </section>

    <Footer ru={ru}/>
  </main>;
}
