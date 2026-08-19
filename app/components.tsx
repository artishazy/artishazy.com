"use client";
import { useEffect,useRef,useState } from "react";
export function Cursor(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{if(!matchMedia('(pointer:fine)').matches)return;const el=ref.current;if(!el)return;const label=el.querySelector("span");let x=-80,y=-80,tx=x,ty=y,raf=0,visible=false,project=false;const tick=()=>{x+=(tx-x)*.24;y+=(ty-y)*.24;el.style.transform=`translate3d(${x-18}px,${y-18}px,0)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.15)raf=requestAnimationFrame(tick);else raf=0};const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY;const zone=(e.target as Element|null)?.closest?.("[data-cursor-label]") as HTMLElement|null;const nextProject=Boolean(zone);if(nextProject!==project){project=nextProject;el.classList.toggle("is-project",project)}if(zone&&label)label.textContent=zone.dataset.cursorLabel||"ПЕРЕЙТИ";if(!visible){x=tx;y=ty;visible=true;el.classList.add('is-visible')}if(!raf)raf=requestAnimationFrame(tick)};const down=()=>el.classList.add('is-pressed');const up=()=>el.classList.remove('is-pressed');addEventListener('pointermove',move,{capture:true,passive:true});addEventListener('pointerdown',down,{passive:true});addEventListener('pointerup',up,{passive:true});return()=>{removeEventListener('pointermove',move,true);removeEventListener('pointerdown',down);removeEventListener('pointerup',up);cancelAnimationFrame(raf)}},[]);return <div className="soft-cursor" ref={ref} aria-hidden="true"><i/><span>ПЕРЕЙТИ</span></div>}
export function Header({landing=false,ru:controlledRu,onToggleLanguage}:{landing?:boolean;ru?:boolean;onToggleLanguage?:()=>void}={}){
  const[dark,setDark]=useState(false);
  const[localRu,setLocalRu]=useState(true);
  const[menuOpen,setMenuOpen]=useState(false);
  const ru=controlledRu??localRu;
  const href=(section:string)=>landing?`#${section}`:`/#${section}`;
  const menuItems=[
    ["01",ru?"НАПРАВЛЕНИЯ":"SERVICES","services"],
    ["02",ru?"ПРОЕКТЫ":"WORK","work"],
    ["03",ru?"ГРАФИКА":"GRAPHIC","graphic"],
    ["04",ru?"АРТ":"ART","art"],
    ["05",ru?"ОБО МНЕ":"ABOUT","about"],
  ];

  useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light"},[dark]);
  useEffect(()=>{
    if(!menuOpen)return;
    const previous=document.body.style.overflow;
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setMenuOpen(false)};
    document.body.style.overflow="hidden";
    addEventListener("keydown",close);
    return()=>{document.body.style.overflow=previous;removeEventListener("keydown",close)};
  },[menuOpen]);

  return <>
    <header className="header">
      <a className="wordmark" href={landing?"#top":"/"}>ART_IS_HAZY®</a>
      <nav><a href={href("services")}>{ru?"НАПРАВЛЕНИЯ":"SERVICES"}</a><a href={href("work")}>{ru?"ПРОЕКТЫ":"WORK"}</a><a href={href("art")}>{ru?"АРТ":"ART"}</a><a href={href("about")}>{ru?"ОБО МНЕ":"ABOUT"}</a></nav>
      <div className="controls">
        <button onClick={onToggleLanguage??(()=>setLocalRu(!localRu))}>{ru?"RU":"EN"}</button>
        <button onClick={()=>setDark(!dark)}>{dark?"LIGHT":"DARK"}</button>
      </div>
    </header>
    <button className="main-menu-trigger main-menu-floating" onClick={()=>setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="main-menu"><span>{ru?"МЕНЮ":"MENU"}</span><i aria-hidden="true"><b/><b/></i></button>
    <div className={`main-menu-overlay ${menuOpen?"is-open":""}`} id="main-menu" aria-hidden={!menuOpen}>
      <div className="main-menu-top"><a href={landing?"#top":"/"} onClick={()=>setMenuOpen(false)}>ART_IS_HAZY®</a><span>{ru?"ИНДЕКС":"INDEX"} / 2026</span><button onClick={()=>setMenuOpen(false)}><span>{ru?"ЗАКРЫТЬ":"CLOSE"}</span><i aria-hidden="true"><b/><b/></i></button></div>
      <nav className="main-menu-nav" aria-label="Основное меню">
        {menuItems.map(([number,label,section])=><a href={href(section)} key={section} onClick={()=>setMenuOpen(false)}><small>{number}</small><strong>{label}</strong><span>↘</span></a>)}
      </nav>
      <div className="main-menu-bottom"><p>{ru?"ПРОДУКТОВЫЙ UX/UI-ДИЗАЙН / АРТ-ДИРЕКШН":"PRODUCT UX/UI DESIGN / ART DIRECTION"}<br/>{ru?"МОСКВА":"MOSCOW"} / WORLDWIDE</p><a href="mailto:chdaniil02@gmail.com">CHDANIIL02@GMAIL.COM ↗</a><a href="https://drive.google.com/file/d/1Bydo8eTewC6tzYC5zZScpvZbGLWZb9Zh/view?usp=sharing" target="_blank" rel="noreferrer">CV ↗</a></div>
    </div>
  </>;
}
export function Footer({ru=false}:{ru?:boolean}={}){return <footer className="site-footer"><div><span>{ru?"ДАВАЙТЕ СОЗДАДИМ":"LET'S MAKE"}</span><strong>{ru?<>ЧТО-ТО<br/>НЕОБЫЧНОЕ.</>:<>SOMETHING<br/>STRANGE.</>}</strong></div><div className="footer-links"><a href="mailto:chdaniil02@gmail.com">{ru?"НАПИСАТЬ":"EMAIL"} ↗</a></div><small>©2026 ДАНИИЛ ЧЕРКАШИН / {ru?"МОСКВА":"MOSCOW"}</small></footer>}
export function PageTitle({index,label,title,description}:{index:string,label:string,title:string,description:string}){return <section className="page-title"><div className="kicker">{index}—{label}</div><h1>{title}</h1><p>{description}</p></section>}
export const works=[
 {id:"01",slug:"signal",title:"EXNODE / FINANCE",tagsEn:"PRODUCT · FINTECH · DESIGN SYSTEM",tagsRu:"ПРОДУКТ · ФИНТЕХ · ДИЗАЙН-СИСТЕМА",tone:"grid"},
 {id:"02",slug:"archive",title:"DREAMY / SLEEP APP",tagsEn:"MOBILE · UX/UI · RESEARCH",tagsRu:"МОБИЛЬНОЕ · UX/UI · ИССЛЕДОВАНИЕ",tone:"blocks"},
 {id:"03",slug:"nexus",title:"COLORIST / ACCESSIBILITY",tagsEn:"COLOR TOOL · UX/UI · PROTOTYPE",tagsRu:"ЦВЕТ · ДОСТУПНОСТЬ · ПРОТОТИП",tone:"rings"},
 {id:"04",slug:"mono",title:"LANDINGS / SELECTED",tagsEn:"WEB · TELEGRAM APPS · FREELANCE",tagsRu:"ВЕБ · TELEGRAM APPS · ФРИЛАНС",tone:"type"},
];
export function ProjectGrid({compact=false,ru=false}:{compact?:boolean;ru?:boolean}){return <div className={`project-grid ${compact?"compact":""}`}>{works.map((w,i)=><a className="project-card interactive" href={`/work/${w.slug}`} key={w.slug}><div className={`project-visual ${w.tone}`} data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}><span>{w.id}</span><i/><b>{i%2?"▓▓▒░":"░▒▓▓"}</b></div><div className="project-meta glass-strip"><h2>{w.title}</h2><p>{ru?w.tagsRu:w.tagsEn}</p><span>{ru?"СМОТРЕТЬ КЕЙС":"VIEW CASE"} ↗</span></div></a>)}</div>}
export function Shell({children}:{children:React.ReactNode}){return <main><Header/>{children}<Footer/></main>}
export function LocalizedShell({children}:{children:(ru:boolean)=>React.ReactNode}){const[ru,setRu]=useState(true);return <main><Header ru={ru} onToggleLanguage={()=>setRu(!ru)}/>{children(ru)}<Footer ru={ru}/></main>}
