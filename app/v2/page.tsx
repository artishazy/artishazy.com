"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowIcon} from "../components";

const BORZOI=String.raw`                 __
            ____/  \__
       ____/   ◉      \________
  ____/                       _/
 (       ________            /
  \_____/        \__________/
      /  \          /  \
     /    \        /    \
    /_/\___\      /_/\___\ `;

const projects=[
  {index:"01",title:"SIGNAL / FINTECH",tags:"PRODUCT · WEB APP · SYSTEM",kind:"signal"},
  {index:"02",title:"ARCHIVE / CULTURE",tags:"WEBSITE · ART DIRECTION",kind:"archive"},
  {index:"03",title:"NEXUS / AI TOOL",tags:"UX/UI · PROTOTYPE",kind:"nexus"},
  {index:"04",title:"MONO / FASHION",tags:"ECOMMERCE · IDENTITY",kind:"mono"},
];

const services=[
  {number:"01",title:"ПРОДУКТОВЫЙ ДИЗАЙН",text:"Исследования, сценарии, интерфейсы и системы, которые превращают сложное в ясное."},
  {number:"02",title:"САЙТЫ",text:"Выразительные цифровые пространства с сильной типографикой, ритмом и движением."},
  {number:"03",title:"АЙДЕНТИКА",text:"Визуальные языки, логотипы и правила, которые сохраняют характер бренда."},
  {number:"04",title:"DIGITAL ART",text:"3D, генеративная графика и эксперименты на пересечении системы и случайности."},
];

export default function VariantTwo(){
  const[loaded,setLoaded]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{
    document.documentElement.dataset.theme="light";
    document.body.classList.add("v2-active");
    const root=document.querySelector<HTMLElement>(".chipsa-v2");
    if(!root)return;

    let raf=0;
    const updateScroll=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const y=window.scrollY;
        root.style.setProperty("--v2-scroll",`${y}px`);
        root.style.setProperty("--v2-progress",String(Math.min(y/1100,1)));
        root.classList.toggle("is-scrolled",y>48);
      });
    };
    const updatePointer=(event:PointerEvent)=>{
      root.style.setProperty("--mx",String(event.clientX/window.innerWidth));
      root.style.setProperty("--my",String(event.clientY/window.innerHeight));
    };
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)entry.target.classList.add("is-visible");
    }),{threshold:.12,rootMargin:"0px 0px -8%"});
    document.querySelectorAll("[data-v2-reveal]").forEach(node=>observer.observe(node));
    window.addEventListener("scroll",updateScroll,{passive:true});
    window.addEventListener("pointermove",updatePointer,{passive:true});
    updateScroll();
    const timer=window.setTimeout(()=>setLoaded(true),1500);
    return()=>{
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll",updateScroll);
      window.removeEventListener("pointermove",updatePointer);
      document.body.classList.remove("v2-active");
    };
  },[]);

  const tilt=(event:React.PointerEvent<HTMLElement>)=>{
    const rect=event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--rx",`${((event.clientY-rect.top)/rect.height-.5)*-5}deg`);
    event.currentTarget.style.setProperty("--ry",`${((event.clientX-rect.left)/rect.width-.5)*7}deg`);
  };
  const untilt=(event:React.PointerEvent<HTMLElement>)=>{
    event.currentTarget.style.setProperty("--rx","0deg");
    event.currentTarget.style.setProperty("--ry","0deg");
  };

  return <main className={`chipsa-v2 ${loaded?"is-loaded":""}`}>
    <div className="v2-loader" aria-hidden={loaded}>
      <pre>{BORZOI}</pre>
      <p>ART_IS_HAZY®<br/>DESIGN / IDENTITY / DIGITAL ART</p>
    </div>

    <header className="v2-header">
      <a className="v2-logo" href="#v2-top" aria-label="Наверх"><span>◜</span><span>◝</span></a>
      <nav><a href="#v2-work">КЕЙСЫ</a><a href="#v2-about">ОБО МНЕ</a><a href="#v2-services">УСЛУГИ</a><a href="#v2-contact">КОНТАКТЫ</a></nav>
    </header>

    <button className="v2-menu-button" onClick={()=>setMenuOpen(true)}><i/> МЕНЮ</button>
    <a className="v2-contact-float" href="mailto:hello@artishazy.com"><span>НАПИСАТЬ</span><b>✉</b></a>

    <div className={`v2-menu ${menuOpen?"is-open":""}`} aria-hidden={!menuOpen}>
      <button onClick={()=>setMenuOpen(false)} aria-label="Закрыть меню">ЗАКРЫТЬ ×</button>
      <nav>{[["#v2-work","КЕЙСЫ"],["#v2-about","ОБО МНЕ"],["#v2-services","УСЛУГИ"],["#v2-contact","КОНТАКТЫ"]].map(([href,label],i)=><a href={href} key={href} onClick={()=>setMenuOpen(false)}><small>0{i+1}</small>{label}</a>)}</nav>
      <pre>{BORZOI}</pre>
    </div>

    <section className="v2-hero" id="v2-top">
      <div className="v2-hero-copy">
        <h1><span>ПРОЕКТИРУЮ</span><span>ЯСНЫЕ ЦИФРОВЫЕ</span><span>МИРЫ</span></h1>
        <p>UX/UI, айдентика,<br/>цифровое искусство,<br/>3D и движение</p>
      </div>
      <div className="v2-dog-wrap" aria-label="ASCII-иллюстрация борзой">
        <pre>{BORZOI}</pre>
        <span>MOVE / SCROLL</span>
      </div>
    </section>

    <section className="v2-manifesto" id="v2-about">
      <h2 data-v2-reveal><span>ЦИФРОВЫЕ МИРЫ,</span><span>КОТОРЫЕ ХОЧЕТСЯ</span><span>ИССЛЕДОВАТЬ</span></h2>
      <div className="v2-manifesto-dog"><pre>{BORZOI}</pre></div>
      <p data-v2-reveal>Я превращаю сложные идеи в выразительные интерфейсы и визуальные системы. Структура даёт ясность, а эксперимент — характер и живое ощущение от продукта.</p>
      <a data-v2-reveal href="#v2-work">СМОТРЕТЬ РАБОТЫ ↓</a>
    </section>

    <section className="v2-work" id="v2-work">
      <div className="v2-section-head" data-v2-reveal><small>01 / SELECTED</small><h2>ЛУЧШИЕ РАБОТЫ</h2><span>2022—2026</span></div>
      <div className="v2-case-list">{projects.map(project=><a href={`/work/${project.kind}`} className={`v2-case v2-case-${project.kind}`} key={project.kind} data-v2-reveal onPointerMove={tilt} onPointerLeave={untilt}>
        <div className="v2-case-top"><span>{project.title}</span><b>{project.index}</b></div>
        <div className="v2-case-art"><i/><i/><i/><strong>{project.kind.toUpperCase()}</strong></div>
        <div className="v2-case-meta"><span>{project.tags}</span><b>ОТКРЫТЬ <ArrowIcon direction="up-right"/></b></div>
      </a>)}</div>
    </section>

    <section className="v2-spark" data-v2-reveal>
      <p>НАЧНЁМ С</p>
      <h2>СИЛЬНОЙ<br/>ИДЕИ</h2>
      <span>Сначала — направление и ощущение. Затем структура, система и детали, которые собирают всё в цельный цифровой опыт.</span>
      <a href="#v2-contact">ОБСУДИТЬ ПРОЕКТ <ArrowIcon direction="up-right"/></a>
    </section>

    <section className="v2-services" id="v2-services">
      <div className="v2-section-head" data-v2-reveal><small>02 / PRACTICE</small><h2>ГЛАВНЫЕ НАПРАВЛЕНИЯ</h2><span>WHAT I DO</span></div>
      <div className="v2-service-list">{services.map(service=><article key={service.number} data-v2-reveal>
        <small>{service.number}</small><h3>{service.title}</h3><div className="v2-service-visual"><i/><pre>{service.number==="04"?BORZOI:"░▒▓██▓▒░"}</pre></div><p>{service.text}</p><ArrowIcon direction="up-right"/>
      </article>)}</div>
    </section>

    <section className="v2-stats" data-v2-reveal>
      <div><b>04</b><span>ВЫБРАННЫХ<br/>КЕЙСА</span></div>
      <div><b>05</b><span>ДИЗАЙН<br/>ДИСЦИПЛИН</span></div>
      <div><b>01</b><span>ЦЕЛЬНАЯ<br/>СИСТЕМА</span></div>
    </section>

    <footer className="v2-footer" id="v2-contact">
      <p>ЕСТЬ ЗАДАЧА?</p>
      <a href="mailto:hello@artishazy.com">ДАВАЙТЕ<br/>СДЕЛАЕМ<br/><span>СТРАННО</span></a>
      <div><span>ART_IS_HAZY® / MOSCOW</span><span>© 2026</span><Link href="/">ВЕРСИЯ 01 <ArrowIcon direction="up-right"/></Link></div>
      <pre>{BORZOI}</pre>
    </footer>
  </main>;
}
