"use client";

import AsciiHero from "./AsciiHero";
import {ArrowIcon,ArtCarousel,Footer,Header,PageTitle,ProjectCarousel,useSiteLanguage} from "./components";
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
    <Header landing ru={ru} onToggleLanguage={toggle}/>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{ru?"ПРОДУКТОВЫЙ UX/UI-ДИЗАЙНЕР / АРТ-ДИРЕКТОР — 2026":"PRODUCT UX/UI DESIGNER / ART DIRECTOR — 2026"}</p>
        <h1>{ru?<><span className="hero-line hero-line-outline">ИСКУССТВО —</span><span className="hero-line hero-line-main">ПРОЯВЛЯЕТСЯ</span><span className="hero-line hero-line-last">ИЗ ТУМАНА.</span></>:<><span className="hero-line hero-line-outline">ART —</span><span className="hero-line hero-line-main">EMERGES FROM</span><span className="hero-line hero-line-last">THE HAZE.</span></>}</h1>
      </div>
      <Stage ru={ru}/>
    </section>

    <section className="landing-section main-services" id="services">
      <PageTitle index="01" label={ru?"НАПРАВЛЕНИЯ":"DIRECTIONS"} title={ru?"ГЛАВНЫЕ НАПРАВЛЕНИЯ":"MAIN DIRECTIONS"} description={ru?"Три области, в которых логика, визуальная система и авторский подход работают вместе.":"Three areas where logic, visual systems and an authorial approach work together."}/>
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
      <PageTitle index="02" label={ru?"ПРОЕКТЫ":"WORK"} title={ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"} description={ru?"Проектирую цифровые продукты целиком: исследую контекст, выстраиваю пользовательские сценарии и собираю интерфейс в последовательную систему.":"I design digital products end to end: researching context, shaping user flows and building interfaces into coherent systems."}/>
      <ProjectCarousel ru={ru}/>
      <a className="section-link" href="/work">{ru?"ВСЕ ПРОЕКТЫ":"ALL PROJECTS"} <ArrowIcon direction="up-right"/></a>
    </section>

    <section className="landing-section" id="graphic">
      <PageTitle index="03" label={ru?"ГРАФИЧЕСКИЙ ДИЗАЙН":"GRAPHIC DESIGN"} title={ru?"ГРАФИКА":"GRAPHIC"} description={ru?"Айдентика, логотипы, постеры, печатные материалы и визуальные системы.":"Identity, logos, posters, printed matter and visual systems."}/>
      <GraphicGallery ru={ru}/>
      <a className="section-link" href="/graphic">{ru?"ВСЕ ГРАФИЧЕСКИЕ РАБОТЫ":"ALL GRAPHIC WORK"} <ArrowIcon direction="up-right"/></a>
    </section>

    <section className="landing-section" id="art">
      <PageTitle index="04" label={ru?"ЛИЧНАЯ ЛАБОРАТОРИЯ":"PERSONAL LAB"} title={ru?"АРТ / ЛАБОРАТОРИЯ":"ART / LAB"} description={ru?"Личная визуальная лаборатория: 3D, ASCII, цифровая графика, исследования формы, света и фактуры.":"A personal visual laboratory for 3D, ASCII, digital graphics and studies of form, light and texture."}/>
      <ArtCarousel ru={ru}/>
      <a className="section-link" href="/art">{ru?"ОТКРЫТЬ ЛАБОРАТОРИЮ":"OPEN THE LAB"} <ArrowIcon direction="up-right"/></a>
    </section>

    <section className="landing-section" id="about">
      <div className="about-hero"><div className="kicker">05—{ru?"ОБО МНЕ / ПРОФИЛЬ":"ABOUT / PROFILE"}</div><h1>{ru?<>ДЕЛАЮ<br/>СЛОЖНОЕ <span>ЯСНЫМ.</span></>:<>MAKING<br/>COMPLEXITY <span>CLEAR.</span></>}</h1><p>{ru?"Я — Даниил Черкашин, продуктовый UX/UI-дизайнер с бэкграундом в графике и прикладной информатике. Проектирую веб- и мобильные интерфейсы: от исследования и пользовательских сценариев до адаптивного UI и дизайн-систем.":"I am Daniil Cherkashin, a product UX/UI designer with a background in graphic design and applied informatics. I design web and mobile interfaces from research and user flows to responsive UI and design systems."}</p></div>
      <a className="section-link about-link" href="/about">{ru?"ПОДРОБНЕЕ ОБО МНЕ":"MORE ABOUT ME"} <ArrowIcon direction="up-right"/></a>
    </section>

    <Footer ru={ru}/>
  </main>;
}
