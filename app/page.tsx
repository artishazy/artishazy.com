"use client";

import AsciiHero from "./AsciiHero";
import {ArrowIcon,ArtCarousel,Footer,Header,PageTitle,PortfolioLiquidLink,ProjectCarousel,useSiteLanguage} from "./components";
import GraphicGallery from "./graphic/GraphicGallery";

const services=[
  {ruTitle:"ПРОДУКТОВЫЙ ДИЗАЙН",enTitle:"PRODUCT DESIGN",code:"UX / UI",href:"/work"},
  {ruTitle:"ГРАФИКА",enTitle:"GRAPHIC DESIGN",code:"BRAND / SYSTEM",href:"#graphic"},
  {ruTitle:"АРТ-ЛАБОРАТОРИЯ",enTitle:"ART LAB",code:"ART / 3D",href:"#art"},
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
    <svg className="text-outline-filter" width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id="hero-text-outline-light" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="expanded"/><feComposite in="expanded" in2="SourceAlpha" operator="out" result="outerStroke"/><feFlood floodColor="#11110f" result="strokeColor"/><feComposite in="strokeColor" in2="outerStroke" operator="in"/></filter><filter id="hero-text-outline-dark" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="expanded"/><feComposite in="expanded" in2="SourceAlpha" operator="out" result="outerStroke"/><feFlood floodColor="#f2f2ee" result="strokeColor"/><feComposite in="strokeColor" in2="outerStroke" operator="in"/></filter></defs></svg>
    <Header landing ru={ru} onToggleLanguage={toggle}/>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{ru?"ДАНИИЛ ЧЕРКАШИН — ПРОДУКТОВЫЙ UX/UI-ДИЗАЙНЕР / ХУДОЖНИК":"DANIIL CHERKASHIN — PRODUCT UX/UI DESIGNER / ARTIST"}</p>
        <h1><span className="hero-line hero-line-outline">UX/UI</span><span className="hero-line hero-line-main">{ru?"ДИЗАЙНЕР":"DESIGNER"}</span></h1>
        <div className="hero-intro">
          <p>{ru?"Проектирую веб- и мобильные продукты: от исследования и пользовательских сценариев до адаптивного интерфейса и дизайн-системы.":"I design web and mobile products from research and user flows to responsive interfaces and design systems."}</p>
          <div className="hero-actions"><PortfolioLiquidLink href="#work" variant="solid" direction="down-right" label={ru?"СМОТРЕТЬ КЕЙСЫ":"VIEW CASES"}/><PortfolioLiquidLink className="hero-about-inline" href="/about" label={ru?"ОБО МНЕ / CV":"ABOUT / CV"}/></div>
        </div>
      </div>
      <Stage ru={ru}/>
      <PortfolioLiquidLink className="hero-about-floating" href="/about" label={ru?"ОБО МНЕ / CV":"ABOUT / CV"}/>
    </section>

    <section className="landing-section" id="work">
      <PageTitle index="01" label={ru?"ИЗБРАННЫЕ ПРОЕКТЫ":"SELECTED WORK"} title={ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"} description={ru?"Показываю не только финальный интерфейс, но и логику работы: контекст, сценарии, структуру и систему.":"I show not only final interfaces, but the thinking behind them: context, flows, structure and systems."}/>
      <ProjectCarousel ru={ru}/>
      <PortfolioLiquidLink href="/work" label={ru?"ВСЕ ПРОЕКТЫ":"ALL PROJECTS"} variant="solid" full/>
    </section>

    <section className="landing-section" id="about">
      <div className="about-hero"><div className="kicker">02—{ru?"ОБО МНЕ / ПРОФИЛЬ":"ABOUT / PROFILE"}</div><h1>{ru?<>ДЕЛАЮ<br/>СЛОЖНОЕ <span>ЯСНЫМ</span></>:<>MAKING<br/>COMPLEXITY <span>CLEAR</span></>}</h1><p>{ru?"Я — Даниил Черкашин, продуктовый UX/UI-дизайнер с бэкграундом в графике и прикладной информатике. Проектирую веб- и мобильные интерфейсы: от исследования и пользовательских сценариев до адаптивного UI и дизайн-систем.":"I am Daniil Cherkashin, a product UX/UI designer with a background in graphic design and applied informatics. I design web and mobile interfaces from research and user flows to responsive UI and design systems."}</p></div>
      <PortfolioLiquidLink className="about-link" href="/about" label={ru?"ПОДРОБНЕЕ ОБО МНЕ":"MORE ABOUT ME"} variant="solid" full/>
    </section>

    <section className="landing-section main-services" id="services">
      <PageTitle index="03" label={ru?"ПРАКТИКА":"PRACTICE"} title={ru?"ЧТО Я ДЕЛАЮ":"WHAT I DO"} description={ru?"Соединяю продуктовую логику, графическую систему и авторский визуальный подход.":"I combine product thinking, graphic systems and an authorial visual approach."}/>
      <div className="main-service-list">
        {services.map((service,index)=><a className="main-service-row" href={service.href} key={service.enTitle}>
          <span className="main-service-number">0{index+1}</span>
          <h2>{ru?service.ruTitle:service.enTitle}</h2>
          <small>{service.code}</small>
          <ArrowIcon className="main-service-arrow"/>
        </a>)}
      </div>
    </section>

    <section className="landing-section" id="graphic">
      <PageTitle index="04" label={ru?"ГРАФИЧЕСКИЙ ДИЗАЙН":"GRAPHIC DESIGN"} title={ru?"ГРАФИКА":"GRAPHIC"} description={ru?"Айдентика, логотипы, постеры, печатные материалы и визуальные системы.":"Identity, logos, posters, printed matter and visual systems."}/>
      <GraphicGallery ru={ru}/>
      <PortfolioLiquidLink href="/graphic" label={ru?"ВСЕ ГРАФИЧЕСКИЕ РАБОТЫ":"ALL GRAPHIC WORK"} variant="solid" full/>
    </section>

    <section className="landing-section" id="art">
      <PageTitle index="05" label={ru?"ЛИЧНАЯ ЛАБОРАТОРИЯ":"PERSONAL LAB"} title={ru?"АРТ / ЛАБОРАТОРИЯ":"ART / LAB"} description={ru?"Личная визуальная лаборатория: 3D, ASCII, цифровая графика, исследования формы, света и фактуры.":"A personal visual laboratory for 3D, ASCII, digital graphics and studies of form, light and texture."}/>
      <ArtCarousel ru={ru}/>
      <PortfolioLiquidLink href="/art" label={ru?"ОТКРЫТЬ ЛАБОРАТОРИЮ":"OPEN THE LAB"} variant="solid" full/>
    </section>

    <Footer ru={ru}/>
  </main>;
}
