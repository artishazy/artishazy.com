"use client";
import { useEffect,useRef,useState } from "react";
import Link from "next/link";
export function ArrowIcon({direction="down-right",className=""}:{direction?:"up-right"|"down-right"|"up";className?:string}){
  const path=direction==="up"?"M8 13V3M4 7l4-4 4 4":direction==="up-right"?"M4 12 12 4M6 4h6v6":"m4 4 8 8M12 6v6H6";
  return <svg className={`arrow-icon ${className}`.trim()} viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d={path}/></svg>;
}
export function Cursor(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{if(!matchMedia('(pointer:fine)').matches)return;const el=ref.current;if(!el)return;const label=el.querySelector("span");let visible=false,project=false;const move=(e:PointerEvent)=>{el.style.transform=`translate3d(${e.clientX-18}px,${e.clientY-18}px,0)`;const zone=(e.target as Element|null)?.closest?.("[data-cursor-label]") as HTMLElement|null;const nextProject=Boolean(zone);if(nextProject!==project){project=nextProject;el.classList.toggle("is-project",project)}if(zone&&label)label.textContent=zone.dataset.cursorLabel||"ПЕРЕЙТИ";if(!visible){visible=true;el.classList.add('is-visible')}};const down=()=>el.classList.add('is-pressed');const up=()=>el.classList.remove('is-pressed');addEventListener('pointermove',move,{capture:true,passive:true});addEventListener('pointerdown',down,{passive:true});addEventListener('pointerup',up,{passive:true});return()=>{removeEventListener('pointermove',move,true);removeEventListener('pointerdown',down);removeEventListener('pointerup',up)}},[]);return <div className="soft-cursor" ref={ref} aria-hidden="true"><i/><span>ПЕРЕЙТИ</span></div>}
export function useSiteLanguage(){
  const[ru,setRu]=useState(true);
  useEffect(()=>{const frame=requestAnimationFrame(()=>{const stored=localStorage.getItem("aih-language");if(stored)setRu(stored!=="en")});return()=>cancelAnimationFrame(frame)},[]);
  useEffect(()=>{document.documentElement.lang=ru?"ru":"en"},[ru]);
  const toggle=()=>setRu(current=>{const next=!current;localStorage.setItem("aih-language",next?"ru":"en");return next});
  return{ru,toggle};
}
export function Header({landing=false,ru:controlledRu,onToggleLanguage}:{landing?:boolean;ru?:boolean;onToggleLanguage?:()=>void}={}){
  const[dark,setDark]=useState(false);
  const{ru:localRu,toggle:toggleLocalRu}=useSiteLanguage();
  const[menuOpen,setMenuOpen]=useState(false);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const panelRef=useRef<HTMLDivElement>(null);
  const ru=controlledRu??localRu;
  const href=(section:string)=>landing?`#${section}`:`/#${section}`;
  const menuItems=[
    {label:ru?"ГЛАВНАЯ":"HOME",url:landing?"#top":"/"},
    {label:ru?"ПРОДУКТОВЫЙ ДИЗАЙН":"PRODUCT DESIGN",url:"/work"},
    {label:ru?"САЙТЫ":"WEBSITES",url:"/work/landings"},
    {label:ru?"ГРАФИКА":"GRAPHIC DESIGN",url:"/graphic"},
    {label:ru?"ЦИФРОВОЙ АРТ":"DIGITAL ART",url:"/art"},
    {label:ru?"РЕЗЮМЕ":"RÉSUMÉ",url:"https://drive.google.com/file/d/1Bydo8eTewC6tzYC5zZScpvZbGLWZb9Zh/view?usp=sharing",external:true},
  ];

  useEffect(()=>{const frame=requestAnimationFrame(()=>{const stored=localStorage.getItem("aih-theme");if(stored)setDark(stored==="dark")});return()=>cancelAnimationFrame(frame)},[]);
  useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light"},[dark]);
  useEffect(()=>{
    if(!menuOpen)return;
    const previous=document.body.style.overflow;
    const close=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){setMenuOpen(false);triggerRef.current?.focus();return}
      if(event.key!=="Tab")return;
      const links=[triggerRef.current,...(panelRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")??[])].filter((element):element is HTMLElement=>Boolean(element)&&element!.tabIndex>=0);
      if(!links.length)return;
      const current=links.indexOf(document.activeElement as HTMLElement);
      const next=event.shiftKey?(current<=0?links.length-1:current-1):(current===links.length-1?0:current+1);
      event.preventDefault();links[next]?.focus();
    };
    document.body.style.overflow="hidden";
    addEventListener("keydown",close);
    return()=>{document.body.style.overflow=previous;removeEventListener("keydown",close)};
  },[menuOpen]);

  return <>
    <header className="header">
      <a className="wordmark" href={landing?"#top":"/"}>ART_IS_HAZY®</a>
      <nav><a href={href("work")}>{ru?"КЕЙСЫ":"CASES"}</a><a href={href("about")}>{ru?"ОБО МНЕ":"ABOUT"}</a><a href={href("contact")}>{ru?"КОНТАКТЫ":"CONTACTS"}</a></nav>
      <div className="controls">
        <button onClick={onToggleLanguage??toggleLocalRu} aria-label={ru?"Переключить на английский":"Switch to Russian"}>{ru?"RU":"EN"}</button>
        <button onClick={()=>setDark(current=>{const next=!current;localStorage.setItem("aih-theme",next?"dark":"light");return next})} aria-label={dark?(ru?"Включить светлую тему":"Use light theme"):(ru?"Включить тёмную тему":"Use dark theme")}>{dark?"LIGHT":"DARK"}</button>
      </div>
    </header>
    <button ref={triggerRef} className="main-menu-trigger main-menu-floating" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-menu"><i aria-hidden="true"><b/><b/></i><span>{menuOpen?(ru?"ЗАКРЫТЬ":"CLOSE"):(ru?"МЕНЮ":"MENU")}</span></button>
    <div className={`main-menu-overlay ${menuOpen?"is-open":""}`} id="main-menu" aria-hidden={!menuOpen}>
      <button className="main-menu-backdrop" onClick={()=>{setMenuOpen(false);requestAnimationFrame(()=>triggerRef.current?.focus())}} aria-label={ru?"Закрыть меню":"Close menu"} tabIndex={-1}/>
      <div ref={panelRef} className="main-menu-panel" role="dialog" aria-modal="true" aria-label={ru?"Навигация по сайту":"Site navigation"}>
        <div className="main-menu-content">
          <nav className="main-menu-nav" aria-label={ru?"Основные страницы":"Main pages"}>
            {menuItems.map((item,index)=><a href={item.url} key={item.label} onClick={()=>setMenuOpen(false)} target={item.external?"_blank":undefined} rel={item.external?"noreferrer":undefined}><small>0{index+1}</small><strong>{item.label}</strong><ArrowIcon/></a>)}
          </nav>
        </div>
        <div className="main-menu-bottom"><p>ART_IS_HAZY® / 2026<br/>{ru?"МОСКВА":"MOSCOW"} / WORLDWIDE</p></div>
      </div>
    </div>
  </>;
}
export function Footer({ru=false}:{ru?:boolean}={}){return <footer className="site-footer" id="contact">
  <div className="footer-heading"><span className="footer-kicker">06—{ru?"КОНТАКТ":"CONTACT"}</span><h2>{ru?<>НА СВЯЗИ ДЛЯ<br/>НОВЫХ ПРОЕКТОВ<br/>И КОЛЛАБОРАЦИЙ.</>:<>AVAILABLE FOR<br/>NEW PROJECTS<br/>AND COLLABORATIONS.</>}</h2></div>
  <div className="footer-contact"><span>{ru?"НАПИСАТЬ":"EMAIL"}</span><a href="mailto:chdaniil02@gmail.com">CHDANIIL02@GMAIL.COM <ArrowIcon direction="up-right"/></a><p>{ru?"Продуктовый дизайн, сайты, графика и цифровое искусство.":"Product design, websites, graphic design and digital art."}</p></div>
  <nav className="footer-nav" aria-label={ru?"Навигация в подвале":"Footer navigation"}><Link href="/#work">{ru?"КЕЙСЫ":"CASES"}</Link><Link href="/#about">{ru?"ОБО МНЕ":"ABOUT"}</Link><Link href="/graphic">{ru?"ГРАФИКА":"GRAPHIC"}</Link><Link href="/art">{ru?"АРТ":"ART"}</Link><a href="https://drive.google.com/file/d/1Bydo8eTewC6tzYC5zZScpvZbGLWZb9Zh/view?usp=sharing" target="_blank" rel="noreferrer">CV <ArrowIcon direction="up-right"/></a><Link href="#top">{ru?"НАВЕРХ":"BACK TO TOP"} <ArrowIcon direction="up"/></Link></nav>
  <div className="footer-meta"><span>©2026 ДАНИИЛ ЧЕРКАШИН</span><span>{ru?"МОСКВА":"MOSCOW"} / WORLDWIDE</span><span>ART_IS_HAZY®</span></div>
</footer>}
export function PageTitle({index,label,title,description}:{index:string,label:string,title:string,description:string}){return <section className="page-title"><div className="kicker">{index}—{label}</div><h1>{title}</h1><p>{description}</p></section>}
export const works=[
 {id:"01",slug:"exnode",title:"EXNODE / FINANCE",tagsEn:"PRODUCT · FINTECH · DESIGN SYSTEM",tagsRu:"ПРОДУКТ · ФИНТЕХ · ДИЗАЙН-СИСТЕМА",tone:"grid"},
 {id:"02",slug:"dreamy",title:"DREAMY / SLEEP APP",tagsEn:"MOBILE · UX/UI · RESEARCH",tagsRu:"МОБИЛЬНОЕ · UX/UI · ИССЛЕДОВАНИЕ",tone:"blocks"},
 {id:"03",slug:"colorist",title:"COLORIST / ACCESSIBILITY",tagsEn:"COLOR TOOL · UX/UI · PROTOTYPE",tagsRu:"ЦВЕТ · ДОСТУПНОСТЬ · ПРОТОТИП",tone:"rings"},
 {id:"04",slug:"landings",title:"LANDINGS / SELECTED",tagsEn:"WEB · TELEGRAM APPS · FREELANCE",tagsRu:"ВЕБ · TELEGRAM APPS · ФРИЛАНС",tone:"type"},
];
export function ProjectGrid({compact=false,ru=false}:{compact?:boolean;ru?:boolean}){return <div className={`project-grid ${compact?"compact":""}`}>{works.map((w,i)=><a className="project-card interactive" href={`/work/${w.slug}`} key={w.slug}><div className={`project-visual ${w.tone}`} data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}><span>{w.id}</span><i/><b>{i%2?"▓▓▒░":"░▒▓▓"}</b></div><div className="project-meta glass-strip"><h2>{w.title}</h2><p>{ru?w.tagsRu:w.tagsEn}</p><span>{ru?"СМОТРЕТЬ КЕЙС":"VIEW CASE"} <ArrowIcon direction="up-right"/></span></div></a>)}</div>}
export function Shell({children}:{children:React.ReactNode}){return <main id="top"><Header/>{children}<Footer/></main>}
export function LocalizedShell({children}:{children:(ru:boolean)=>React.ReactNode}){const{ru,toggle}=useSiteLanguage();return <main id="top"><Header ru={ru} onToggleLanguage={toggle}/>{children(ru)}<Footer ru={ru}/></main>}
