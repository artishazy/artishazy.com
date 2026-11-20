"use client";

import KnightParticles from "./KnightParticles";
import {useRef,useState} from "react";
import {ArrowIcon,ArtCarousel,Footer,Header,PortfolioLink,ProjectCarousel,useSiteLanguage} from "./components";
import GraphicGallery from "./graphic/GraphicGallery";

const services=[
  {ruTitle:"ПРОДУКТОВЫЙ ДИЗАЙН",enTitle:"PRODUCT DESIGN",code:"UX / UI",href:"/work"},
  {ruTitle:"ГРАФИКА",enTitle:"GRAPHIC DESIGN",code:"BRAND / SYSTEM",href:"#graphic"},
  {ruTitle:"АРТ-ЛАБОРАТОРИЯ",enTitle:"ART LAB",code:"ART / 3D",href:"#art"},
];

function Stage({ru}:{ru:boolean}){
  const viewer = useRef<HTMLDialogElement>(null);
  const [preview,setPreview] = useState<{light:boolean}|null>(null);
  function openViewer(){
    if (!viewer.current || viewer.current.open) return;
    setPreview({light:document.documentElement.dataset.theme !== "dark"});
    viewer.current.showModal();
  }
  return <>
    <div className="stage" aria-label={ru?"Интерактивный объёмный ASCII-арт на модульной сетке":"Interactive volumetric ASCII artwork on a modular grid"}>
      <div className="stage-grid" style={{ opacity: .28, maskImage: "radial-gradient(ellipse at 55% 51%, black 18%, transparent 74%)" }}/>
      <KnightParticles embedded ru={ru} onOpen={openViewer}/>
    </div>
    <dialog ref={viewer} className="knight-viewer-dialog" aria-label={ru?"Просмотр ASCII-рыцаря":"ASCII knight viewer"} onClose={()=>setPreview(null)}>
      {preview && <KnightParticles ru={ru} initialLight={preview.light} onClose={()=>viewer.current?.close()}/>}
    </dialog>
  </>;
}

export default function Home(){
  const{ru,toggle}=useSiteLanguage();

  return <main className="landing">
    <svg className="text-outline-filter" width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id="hero-text-outline-light" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="expanded"/><feComposite in="expanded" in2="SourceAlpha" operator="out" result="outerStroke"/><feFlood floodColor="#11110f" result="strokeColor"/><feComposite in="strokeColor" in2="outerStroke" operator="in"/></filter><filter id="hero-text-outline-dark" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="expanded"/><feComposite in="expanded" in2="SourceAlpha" operator="out" result="outerStroke"/><feFlood floodColor="#f2f2ee" result="strokeColor"/><feComposite in="strokeColor" in2="outerStroke" operator="in"/></filter></defs></svg>
    <Header landing ru={ru} onToggleLanguage={toggle}/>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{ru?"ДАНИИЛ ЧЕРКАШИН — ДИЗАЙНЕР / ХУДОЖНИК":"DANIIL CHERKASHIN — DESIGNER / ARTIST"}</p>
        <h1><span className="hero-line hero-line-outline">{ru?"ДИЗАЙНЕР":"DESIGNER"}</span><span className="hero-line hero-line-main">{ru?"И ХУДОЖНИК":"& ARTIST"}</span></h1>
        <div className="hero-intro">
          <p>{ru?"Создаю интерфейсы, айдентику и графику. Пишу картины и экспериментирую с визуальными формами.":"I create interfaces, visual identities and graphics. I paint and experiment with visual forms."}</p>
          <div className="hero-actions"><PortfolioLink href="#work" variant="solid" direction="down-right" label={ru?"СМОТРЕТЬ КЕЙСЫ":"VIEW CASES"}/><PortfolioLink className="hero-about-inline" href="/about" label={ru?"ОБО МНЕ":"ABOUT"}/></div>
        </div>
      </div>
      <Stage ru={ru}/>
      <PortfolioLink className="hero-about-floating" href="/about" label={ru?"ОБО МНЕ":"ABOUT"}/>
    </section>

    <section className="landing-section" id="services">
      <header className="services-heading">
        <span className="kicker">{ru?"НАПРАВЛЕНИЯ":"DISCIPLINES"}</span>
        <h2>{ru?"ЧТО Я ДЕЛАЮ":"WHAT I DO"}</h2>
        <p>{ru?"Проектирую интерфейсы, разрабатываю айдентику и создаю цифровые работы.":"I design interfaces, develop visual identities and create digital artwork."}</p>
      </header>
      <div className="main-service-list">
        {services.map((service,index)=><a className="main-service-row" href={service.href} key={service.enTitle}>
          <span className="main-service-number">0{index+1}</span>
          <h3>{ru?service.ruTitle:service.enTitle}</h3>
          <small>{service.code}</small>
          <ArrowIcon className="main-service-arrow"/>
        </a>)}
      </div>
    </section>

    <section className="landing-section" id="work">
      <h2 className="landing-section-title">{ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"}</h2>
      <ProjectCarousel ru={ru}/>
      <PortfolioLink href="/work" label={ru?"ВСЕ ПРОЕКТЫ":"ALL PROJECTS"} variant="solid" direction="down-right" full/>
    </section>

    <section className="landing-section" id="graphic">
      <h2 className="landing-section-title">{ru?"ГРАФИКА":"GRAPHIC"}</h2>
      <GraphicGallery ru={ru}/>
      <PortfolioLink href="/graphic" label={ru?"ВСЕ ГРАФИЧЕСКИЕ РАБОТЫ":"ALL GRAPHIC WORK"} variant="solid" direction="down-right" full/>
    </section>

    <section className="landing-section" id="art">
      <h2 className="landing-section-title">{ru?"АРТ / ЛАБ":"ART / LAB"}</h2>
      <ArtCarousel ru={ru}/>
      <PortfolioLink href="/art" label={ru?"ОТКРЫТЬ ЛАБОРАТОРИЮ":"OPEN THE LAB"} variant="solid" direction="down-right" full/>
    </section>

    <section className="landing-section" id="about">
      <div className="about-hero"><div className="kicker">02—{ru?"ОБО МНЕ / ПРОФИЛЬ":"ABOUT / PROFILE"}</div><h2>{ru?<>ДЕЛАЮ<br/>СЛОЖНОЕ <span>ЯСНЫМ</span></>:<>MAKING<br/>COMPLEXITY <span>CLEAR</span></>}</h2><p>{ru?"Я — Даниил Черкашин, продуктовый UX/UI-дизайнер с бэкграундом в графике и прикладной информатике. Проектирую веб- и мобильные интерфейсы: от исследования и пользовательских сценариев до адаптивного UI и дизайн-систем.":"I am Daniil Cherkashin, a product UX/UI designer with a background in graphic design and applied informatics. I design web and mobile interfaces from research and user flows to responsive UI and design systems."}</p></div>
      <PortfolioLink className="about-link" href="/about" label={ru?"ПОДРОБНЕЕ ОБО МНЕ":"MORE ABOUT ME"} variant="solid" direction="down-right" full/>
    </section>

    <Footer ru={ru}/>
  </main>;
}
