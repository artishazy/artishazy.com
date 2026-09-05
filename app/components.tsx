"use client";
import { useEffect,useRef,useState } from "react";
import Image from "next/image";
import LiquidCarveButton from "../components/originkit/ui/liquid-carve-button";
import {DotScatter} from "../components/originkit/ui/dot-scatter";
import {artStationWorks} from "./art/data";
export function ArrowIcon({direction="down-right",className=""}:{direction?:"up-right"|"down-right"|"up"|"left"|"right";className?:string}){
  const path=direction==="up"?"M8 13V3M4 7l4-4 4 4":direction==="up-right"?"M4 12 12 4M6 4h6v6":direction==="left"?"M11 3 6 8l5 5":direction==="right"?"m5 3 5 5-5 5":"m4 4 8 8M12 6v6H6";
  return <svg className={`arrow-icon ${className}`.trim()} viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d={path}/></svg>;
}
const socialProfiles=[
  {label:"ARTSTATION",href:"https://www.artstation.com/art_is_hazy",path:"M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"},
  {label:"TELEGRAM",href:"https://t.me/art_is_hazy",path:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"},
  {label:"BEHANCE",href:"https://www.behance.net/art_is_hazy",path:"M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"},
];
export function SocialLinks({ru=false,className=""}:{ru?:boolean;className?:string}={}){return <nav className={`social-links ${className}`.trim()} aria-label={ru?"Социальные сети":"Social profiles"}>{socialProfiles.map(profile=><a href={profile.href} target="_blank" rel="noreferrer" key={profile.label} aria-label={profile.label}><svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d={profile.path}/></svg><span>{profile.label}</span></a>)}</nav>}
function useLiquidTheme(){
  const[dark,setDark]=useState(false);
  useEffect(()=>{
    const root=document.documentElement;
    if(!root)return;
    const sync=()=>setDark(root.dataset.theme==="dark");
    sync();
    addEventListener("aih-theme-change",sync);
    return()=>removeEventListener("aih-theme-change",sync);
  },[]);
  return{foreground:dark?"#f4f4f0":"#10100f",background:dark?"#10100f":"#f4f4f0"};
}
function initialBlobFor(seed:string):{edge:"left"|"right"|"top"|"bottom";offset:number}{
  let hash=2166136261;
  for(const character of seed){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}
  const value=hash>>>0;
  const offsets=[-.78,-.42,0,.42,.78] as const;
  return{edge:value%2?"bottom":"top",offset:offsets[value%offsets.length]};
}
function liquidArrowData(direction:"up-right"|"down-right"|"right",color:string){
  const path=direction==="down-right"?"M4 4 14 14M14 7v7H7":direction==="right"?"M5 3l5 5-5 5":"M4 14 14 4M7 4h7v7";
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none"><path d="${path}" stroke="${color}" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/></svg>`;
  return`data:image/svg+xml,${encodeURIComponent(svg)}`;
}
export function PortfolioLiquidLink({href,label,className="",variant="outline",direction="up-right",full=false}:{href:string;label:string;className?:string;variant?:"solid"|"outline";direction?:"up-right"|"down-right"|"right";full?:boolean}){
  const{foreground,background}=useLiquidTheme();
  const solid=variant==="solid";
  if(!full)return <a className={className} href={href}>{label}<ArrowIcon direction={direction}/></a>;
  const fill=solid?foreground:background;
  const initialBlob=initialBlobFor(`${href}:${label}`);
  return <span className={`origin-liquid-slot origin-liquid-${variant} origin-liquid-full ${className}`.trim()} style={{"--liquid-fill":fill,"--liquid-stroke":foreground} as React.CSSProperties}>
    <LiquidCarveButton
      label={label}
      link={href}
      newTab={false}
      colors={{fill,textColor:solid?background:foreground}}
      font={{fontFamily:"var(--font-sans)",fontWeight:500,fontSize:11,lineHeight:1,letterSpacing:".02em",textAlign:"left",width:"100%",justifyContent:"space-between"}}
      padding="0 20px"
      rounded={0}
      addIcon
      icon={{type:"image",image:liquidArrowData(direction,solid?background:foreground),size:18,padding:0,rounded:0,side:"right"}}
      gap={18}
      blob={{color:solid?background:foreground,size:34,smoothness:32}}
      initialBlob={initialBlob}
      transition={{type:"tween",duration:.45,ease:[.44,0,.56,1]}}
      style={{width:"100%",minHeight:72,border:0,borderRadius:0,background:"transparent"}}
    />
  </span>;
}
export function Cursor(){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!matchMedia("(pointer:fine)").matches)return;
    const el=ref.current;
    if(!el)return;
    const label=el.querySelector("span");
    let visible=false;
    let project=false;
    let control=false;
    const move=(event:PointerEvent)=>{
      el.style.transform=`translate3d(${event.clientX-18}px,${event.clientY-18}px,0)`;
      const target=event.target as Element|null;
      const zone=target?.closest?.("[data-cursor-label]") as HTMLElement|null;
      const nextProject=Boolean(zone);
      const nextControl=!nextProject&&Boolean(target?.closest?.("a,button"));
      if(nextProject!==project){project=nextProject;el.classList.toggle("is-project",project)}
      if(nextControl!==control){control=nextControl;el.classList.toggle("is-control",control)}
      if(zone&&label)label.textContent=zone.dataset.cursorLabel||"ПЕРЕЙТИ";
      if(!visible){visible=true;el.classList.add("is-visible")}
    };
    const down=()=>el.classList.add("is-pressed");
    const up=()=>el.classList.remove("is-pressed");
    addEventListener("pointermove",move,{capture:true,passive:true});
    addEventListener("pointerdown",down,{passive:true});
    addEventListener("pointerup",up,{passive:true});
    return()=>{
      removeEventListener("pointermove",move,true);
      removeEventListener("pointerdown",down);
      removeEventListener("pointerup",up);
    };
  },[]);
  return <div className="soft-cursor" ref={ref} aria-hidden="true"><i/><span>ПЕРЕЙТИ</span></div>;
}
export function useSiteLanguage(){
  const[ru,setRu]=useState(true);
  useEffect(()=>{const frame=requestAnimationFrame(()=>{const stored=localStorage.getItem("aih-language");if(stored)setRu(stored!=="en")});return()=>cancelAnimationFrame(frame)},[]);
  useEffect(()=>{document.documentElement.lang=ru?"ru":"en"},[ru]);
  const toggle=()=>setRu(current=>{const next=!current;localStorage.setItem("aih-language",next?"ru":"en");return next});
  return{ru,toggle};
}

export type WorkCategory="all"|"web"|"mobile"|"sites";
export const workCategories:Array<{key:WorkCategory;labelRu:string;labelEn:string}>=[
  {key:"all",labelRu:"ВСЕ КЕЙСЫ",labelEn:"ALL CASES"},
  {key:"web",labelRu:"ВЕБ-СЕРВИСЫ",labelEn:"WEB SERVICES"},
  {key:"mobile",labelRu:"МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ",labelEn:"MOBILE APPS"},
  {key:"sites",labelRu:"САЙТЫ / ЛЕНДИНГИ",labelEn:"WEBSITES / LANDINGS"},
];
const portfolioSections=[
  {href:"/work",labelRu:"ПРОДДИЗАЙН",labelEn:"PRODUCT"},
  {href:"/graphic",labelRu:"ГРАФИКА",labelEn:"GRAPHIC"},
  {href:"/art",labelRu:"АРТ-ЛАБ",labelEn:"ART LAB"},
];

export function Header({landing=false,ru:controlledRu,onToggleLanguage}:{landing?:boolean;ru?:boolean;onToggleLanguage?:()=>void}={}){
  const[dark,setDark]=useState(false);
  const{ru:localRu,toggle:toggleLocalRu}=useSiteLanguage();
  const[menuOpen,setMenuOpen]=useState(false);
  const[caseMenuOpen,setCaseMenuOpen]=useState(false);
  const[chromeHidden,setChromeHidden]=useState(false);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const panelRef=useRef<HTMLDivElement>(null);
  const caseMenuRef=useRef<HTMLDivElement>(null);
  const ru=controlledRu??localRu;
  const toggleLanguage=onToggleLanguage??toggleLocalRu;
  const toggleTheme=()=>setDark(current=>{const next=!current;localStorage.setItem("aih-theme",next?"dark":"light");return next});
  const href=(section:string)=>section==="about"?"/about":landing?`#${section}`:`/#${section}`;
  const menuItems=[
    {label:ru?"ГЛАВНАЯ":"HOME",url:landing?"#top":"/"},
    {label:ru?"ПРОДУКТОВЫЙ ДИЗАЙН":"PRODUCT DESIGN",url:"/work"},
    {label:ru?"ГРАФИКА":"GRAPHIC DESIGN",url:"/graphic"},
    {label:ru?"АРТ-ЛАБОРАТОРИЯ":"ART LAB",url:"/art"},
    {label:ru?"ОБО МНЕ":"ABOUT",url:"/about"},
  ];

  useEffect(()=>{const frame=requestAnimationFrame(()=>{const stored=localStorage.getItem("aih-theme");if(stored)setDark(stored==="dark")});return()=>cancelAnimationFrame(frame)},[]);
  useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light";dispatchEvent(new CustomEvent("aih-theme-change",{detail:dark?"dark":"light"}))},[dark]);
  useEffect(()=>{
    if(!caseMenuOpen)return;
    const close=(event:PointerEvent)=>{if(!caseMenuRef.current?.contains(event.target as Node))setCaseMenuOpen(false)};
    const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==="Escape")setCaseMenuOpen(false)};
    addEventListener("pointerdown",close);
    addEventListener("keydown",closeOnEscape);
    return()=>{removeEventListener("pointerdown",close);removeEventListener("keydown",closeOnEscape)};
  },[caseMenuOpen]);
  useEffect(()=>{
    const media=matchMedia("(max-width: 900px)");
    if(!media.matches){const frame=requestAnimationFrame(()=>setChromeHidden(false));return()=>cancelAnimationFrame(frame)}
    let previous=scrollY;
    const onScroll=()=>{
      const current=scrollY;
      if(menuOpen||current<80)setChromeHidden(false);
      else if(current>previous+6)setChromeHidden(true);
      else if(current<previous-6)setChromeHidden(false);
      previous=current;
    };
    addEventListener("scroll",onScroll,{passive:true});
    return()=>removeEventListener("scroll",onScroll);
  },[menuOpen]);
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
    dispatchEvent(new CustomEvent("aih-scroll-lock",{detail:true}));
    addEventListener("keydown",close);
    return()=>{document.body.style.overflow=previous;dispatchEvent(new CustomEvent("aih-scroll-lock",{detail:false}));removeEventListener("keydown",close)};
  },[menuOpen]);

  return <>
    <header className={`header ${chromeHidden?"is-scroll-hidden":""}`}>
      <a className="wordmark" href={landing?"#top":"/"}>ART_IS_HAZY®</a>
      <nav>
        <div className={`header-cases ${caseMenuOpen?"is-open":""}`} ref={caseMenuRef}>
          <button type="button" onClick={()=>setCaseMenuOpen(open=>!open)} aria-expanded={caseMenuOpen} aria-controls="header-case-menu"><span>{ru?"КЕЙСЫ":"CASES"}</span><i aria-hidden="true"/></button>
          <div className="header-case-menu" id="header-case-menu" aria-hidden={!caseMenuOpen}>
            {portfolioSections.map(section=><a href={section.href} key={section.href} onClick={()=>setCaseMenuOpen(false)}>{ru?section.labelRu:section.labelEn}<ArrowIcon direction="right"/></a>)}
          </div>
        </div>
        <a href={href("about")}>{ru?"ОБО МНЕ":"ABOUT"}</a><a href={href("contact")}>{ru?"КОНТАКТЫ":"CONTACTS"}</a>
      </nav>
      <div className="controls">
        <button onClick={toggleLanguage} aria-label={ru?"Переключить на английский":"Switch to Russian"}>{ru?"RU":"EN"}</button>
        <button onClick={toggleTheme} aria-label={dark?(ru?"Включить светлую тему":"Use light theme"):(ru?"Включить тёмную тему":"Use dark theme")}>{dark?"LIGHT":"DARK"}</button>
      </div>
    </header>
    <button ref={triggerRef} type="button" className={`main-menu-trigger main-menu-floating ${chromeHidden?"is-scroll-hidden":""}`} onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-menu"><i aria-hidden="true"><b/><b/></i><span>{menuOpen?(ru?"ЗАКРЫТЬ":"CLOSE"):(ru?"МЕНЮ":"MENU")}</span></button>
    <div className={`main-menu-overlay ${menuOpen?"is-open":""}`} id="main-menu" aria-hidden={!menuOpen}>
      <button className="main-menu-backdrop" onClick={()=>{setMenuOpen(false);requestAnimationFrame(()=>triggerRef.current?.focus())}} aria-label={ru?"Закрыть меню":"Close menu"} tabIndex={-1}/>
      <div ref={panelRef} className="main-menu-panel" role="dialog" aria-modal="true" aria-label={ru?"Навигация по сайту":"Site navigation"}>
        <div className="main-menu-top">
          <span>ART_IS_HAZY®</span>
          <div className="main-menu-switches">
            <button type="button" onClick={toggleLanguage} aria-label={ru?"Переключить на английский":"Switch to Russian"}><small>{ru?"ЯЗЫК":"LANG"}</small><strong>{ru?"RU":"EN"}</strong></button>
            <button type="button" onClick={toggleTheme} aria-label={dark?(ru?"Включить светлую тему":"Use light theme"):(ru?"Включить тёмную тему":"Use dark theme")}><small>{ru?"ТЕМА":"THEME"}</small><strong>{dark?(ru?"СВЕТ":"LIGHT"):(ru?"ТЬМА":"DARK")}</strong></button>
          </div>
        </div>
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
  <div className="footer-heading"><span className="footer-kicker">06—{ru?"КОНТАКТ":"CONTACT"}</span><h2 className="footer-brand-scatter"><span className="visually-hidden">ART_IS_HAZY</span><DotScatter text="art_is_hazy" cursorRadius={96}/></h2></div>
  <div className="footer-contact"><span>{ru?"НАПИСАТЬ":"EMAIL"}</span><a href="mailto:artishazy14@gmail.com">ARTISHAZY14@GMAIL.COM <ArrowIcon direction="up-right"/></a><p>{ru?"Продуктовый дизайн, графика и цифровое искусство.":"Product design, graphic design and digital art."}</p><SocialLinks ru={ru} className="footer-social-links"/></div>
  <nav className="footer-nav" aria-label={ru?"Навигация в подвале":"Footer navigation"}><a href="/work">{ru?"КЕЙСЫ":"CASES"}</a><a href="/about">{ru?"ОБО МНЕ":"ABOUT"}</a><a href="/graphic">{ru?"ГРАФИКА":"GRAPHIC"}</a><a href="/art">{ru?"АРТ":"ART"}</a><a href="#top">{ru?"НАВЕРХ":"BACK TO TOP"} <ArrowIcon direction="up"/></a></nav>
  <div className="footer-meta"><span>©2026 ДАНИИЛ ЧЕРКАШИН</span><span>{ru?"МОСКВА":"MOSCOW"} / WORLDWIDE</span><span>ART_IS_HAZY®</span></div>
</footer>}
export function PageTitle({index,label,title,description}:{index:string,label:string,title:string,description:string}){return <section className="page-title"><div className="kicker">{index}—{label}</div><h1>{title}</h1><p>{description}</p></section>}
export const works=[
 {id:"01",slug:"exnode",title:"EXNODE / FINANCE",tagsEn:"PRODUCT · FINTECH · DESIGN SYSTEM",tagsRu:"ПРОДУКТ · ФИНТЕХ · ДИЗАЙН-СИСТЕМА",tone:"grid",category:"web" as WorkCategory},
 {id:"02",slug:"dreamy",title:"DREAMY / SLEEP APP",tagsEn:"MOBILE · UX/UI · RESEARCH",tagsRu:"МОБИЛЬНОЕ · UX/UI · ИССЛЕДОВАНИЕ",tone:"blocks",category:"mobile" as WorkCategory},
 {id:"03",slug:"colorist",title:"COLORIST / ACCESSIBILITY",tagsEn:"COLOR TOOL · UX/UI · PROTOTYPE",tagsRu:"ЦВЕТ · ДОСТУПНОСТЬ · ПРОТОТИП",tone:"rings",category:"web" as WorkCategory},
 {id:"04",slug:"landings",title:"LANDINGS / SELECTED",tagsEn:"WEB · TELEGRAM APPS · FREELANCE",tagsRu:"ВЕБ · TELEGRAM APPS · ФРИЛАНС",tone:"type",category:"sites" as WorkCategory},
];
export function ProjectGrid({compact=false,ru=false}:{compact?:boolean;ru?:boolean}){return <div className={`project-grid work-project-grid ${compact?"compact":""}`}>{works.map((w,i)=><a className="project-card interactive" href={`/work/${w.slug}`} key={w.slug} data-case-card data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}><div className={`project-visual case-overlay-visual ${w.tone}`}><i/><b>{i%2?"▓▓▒░":"░▒▓▓"}</b><div className="case-card-overlay"><h2>{w.title}</h2><p>{ru?w.tagsRu:w.tagsEn}</p></div></div></a>)}</div>}

export function FilteredProjectGrid({ru=false}:{ru?:boolean}){
  const[active,setActive]=useState<WorkCategory>("all");
  useEffect(()=>{
    const sync=()=>{
      const value=new URLSearchParams(location.search).get("category");
      if(workCategories.some(category=>category.key===value))setActive(value as WorkCategory);
      else setActive("all");
    };
    sync();
    addEventListener("popstate",sync);
    return()=>removeEventListener("popstate",sync);
  },[]);
  const select=(category:WorkCategory)=>{
    setActive(category);
    const url=new URL(location.href);
    if(category==="all")url.searchParams.delete("category");
    else url.searchParams.set("category",category);
    history.replaceState(null,"",`${url.pathname}${url.search}${url.hash}`);
  };
  const visible=active==="all"?works:works.filter(work=>work.category===active);
  return <section className="work-catalog">
    <div className="graphic-gallery-head work-gallery-head">
      <div className="graphic-filters" role="group" aria-label={ru?"Фильтр проектов":"Project filter"}>{workCategories.map(category=>{
        const count=category.key==="all"?works.length:works.filter(work=>work.category===category.key).length;
        return <button type="button" className={active===category.key?"is-active":""} aria-pressed={active===category.key} onClick={()=>select(category.key)} key={category.key}>{ru?category.labelRu:category.labelEn}<span>{String(count).padStart(2,"0")}</span></button>;
      })}</div>
    </div>
    <div className="project-grid work-project-grid" aria-live="polite">{visible.map((work,index)=><a className="project-card interactive" href={`/work/${work.slug}`} key={work.slug} data-case-card data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}><div className={`project-visual case-overlay-visual ${work.tone}`}><i/><b>{index%2?"▓▓▒░":"░▒▓▓"}</b><div className="case-card-overlay"><h2>{work.title}</h2><p>{ru?work.tagsRu:work.tagsEn}</p></div></div></a>)}</div>
  </section>;
}

export function SliderControls({track,current,total,ru,hideCount=false}:{track:React.RefObject<HTMLDivElement|null>;current:number;total:number;ru:boolean;hideCount?:boolean}){
  const move=(direction:-1|1)=>{const el=track.current;if(!el)return;const card=el.querySelector<HTMLElement>("[data-slide]");const gap=parseFloat(getComputedStyle(el).columnGap||getComputedStyle(el).gap)||0;const step=(card?.offsetWidth??el.clientWidth)+gap;const index=direction<0?Math.max(0,Math.ceil(el.scrollLeft/step)-1):Math.floor(el.scrollLeft/step)+1;const maxScroll=Math.max(0,el.scrollWidth-el.clientWidth);el.scrollTo({left:Math.min(maxScroll,index*step),behavior:"smooth"})};
  return <div className={`slider-controls ${hideCount?"without-count":""}`}>{!hideCount&&<span>{String(current+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>}<div><button disabled={total<=1} onClick={()=>move(-1)} aria-label={ru?"Предыдущие карточки":"Previous cards"}><ArrowIcon direction="left"/></button><button disabled={total<=1} onClick={()=>move(1)} aria-label={ru?"Следующие карточки":"Next cards"}><ArrowIcon direction="right"/></button></div></div>;
}

export function useHorizontalTrack(track:React.RefObject<HTMLDivElement|null>,enabled=true){
  useEffect(()=>{
    const element=track.current;
    if(!element||!enabled)return;
    const onWheel=(event:WheelEvent)=>{
      if(Math.abs(event.deltaX)<=Math.abs(event.deltaY)||event.deltaX===0)return;
      const max=Math.max(0,element.scrollWidth-element.clientWidth);
      const next=Math.max(0,Math.min(max,element.scrollLeft+event.deltaX));
      if(next===element.scrollLeft)return;
      event.preventDefault();
      event.stopPropagation();
      element.scrollLeft=next;
    };
    element.addEventListener("wheel",onWheel,{passive:false});
    return()=>element.removeEventListener("wheel",onWheel);
  },[track,enabled]);
}

export function ProjectCarousel({ru=false}:{ru?:boolean}){
  const track=useRef<HTMLDivElement>(null);const[current,setCurrent]=useState(0);
  useHorizontalTrack(track);
  const sync=()=>{const el=track.current;if(!el)return;const card=el.querySelector<HTMLElement>("[data-slide]");const gap=parseFloat(getComputedStyle(el).columnGap||getComputedStyle(el).gap)||0;if(card)setCurrent(Math.min(works.length-1,Math.round(el.scrollLeft/(card.offsetWidth+gap))))};
  return <div className="card-slider"><SliderControls track={track} current={current} total={works.length} ru={ru} hideCount/><div className="card-slider-track" ref={track} onScroll={sync}>{works.map((w,i)=><a data-slide data-case-card className="project-card interactive" href={`/work/${w.slug}`} key={w.slug} data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}><div className={`project-visual case-overlay-visual ${w.tone}`}><i/><b>{i%2?"▓▓▒░":"░▒▓▓"}</b><div className="case-card-overlay"><h2>{w.title}</h2><p>{ru?w.tagsRu:w.tagsEn}</p></div></div></a>)}</div></div>;
}

export type ArtCategory="all"|"digital"|"vector"|"3d";
export const artCategories:[ArtCategory,string,string][]=[
  ["all","ВСЕ РАБОТЫ","ALL WORK"],
  ["digital","ДИДЖИТАЛ-АРТ","DIGITAL ART"],
  ["vector","ВЕКТОРНАЯ ИЛЛЮСТРАЦИЯ","VECTOR ILLUSTRATION"],
  ["3d","3D","3D"],
];
export const artWorks=[
 {id:"01",slug:"ascii-sculpture",titleRu:"ASCII / СКУЛЬПТУРА",titleEn:"ASCII / SCULPTURE",type:"ascii",shape:"portrait",category:"3d" as ArtCategory},
 {id:"02",slug:"hazy-form",titleRu:"ФОРМА / ТУМАН",titleEn:"FORM / HAZE",type:"glitch",shape:"landscape",category:"digital" as ArtCategory},
 {id:"03",slug:"noise-study",titleRu:"ШУМ / СИГНАЛ",titleEn:"NOISE / SIGNAL",type:"noise",shape:"square",category:"vector" as ArtCategory},
];
const artGalleryWorks=[
  ...artWorks.map(work=>({...work,source:"local" as const})),
  ...artStationWorks.map(work=>({...work,source:"artstation" as const,category:"digital" as ArtCategory,shape:"landscape"})),
];
export function ArtCarousel({ru=false,standalone=false}:{ru?:boolean;standalone?:boolean}){
  const track=useRef<HTMLDivElement>(null);const[current,setCurrent]=useState(0);const[active,setActive]=useState<ArtCategory>("all");
  const visible=active==="all"?artGalleryWorks:artGalleryWorks.filter(work=>work.category===active);
  useHorizontalTrack(track,!standalone);
  useEffect(()=>{if(track.current)track.current.scrollLeft=0},[active]);
  const choose=(category:ArtCategory)=>{setActive(category);setCurrent(0)};
  const sync=()=>{const el=track.current;if(!el)return;const card=el.querySelector<HTMLElement>("[data-slide]");const gap=parseFloat(getComputedStyle(el).columnGap||getComputedStyle(el).gap)||0;if(card)setCurrent(Math.min(visible.length-1,Math.round(el.scrollLeft/(card.offsetWidth+gap))))};
  const categoryLabel=(category:ArtCategory)=>artCategories.find(item=>item[0]===category)!;
  return <div className={`card-slider art-slider ${standalone?"is-grid":""}`}>
    <div className={`graphic-gallery-head art-gallery-head ${standalone?"is-standalone":""}`}><div className="graphic-filters" role="group" aria-label={ru?"Фильтр арт-работ":"Art work filter"}>{artCategories.map(category=>{const count=category[0]==="all"?artGalleryWorks.length:artGalleryWorks.filter(work=>work.category===category[0]).length;return <button type="button" className={active===category[0]?"is-active":""} aria-pressed={active===category[0]} onClick={()=>choose(category[0])} key={category[0]}>{ru?category[1]:category[2]}<span>{String(count).padStart(2,"0")}</span></button>})}</div>{!standalone&&<SliderControls track={track} current={current} total={visible.length} ru={ru} hideCount/>}</div>
    <div className="card-slider-track" ref={track} onScroll={sync}>{visible.map((work)=>{const category=categoryLabel(work.category);const external=work.source==="artstation";const title=external?work.title:ru?work.titleRu:work.titleEn;return <a data-slide data-case-card className={`art-card interactive ${work.shape}`} href={external?work.href:`/art/${work.slug}`} target={external?"_blank":undefined} rel={external?"noreferrer":undefined} key={external?work.href:work.slug} data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}><div className={`art-card-visual case-overlay-visual ${external?"artstation-image":work.type}`}>{external?<Image src={work.image} alt={work.title} width={1920} height={1080} loading="lazy" unoptimized/>:work.type==="ascii"?<pre>.+######+.{"\n"}##▒░()░▒##{"\n"}#▒ /||\\ ▒#{"\n"}## /_||_\\ ##{"\n"}  ######</pre>:work.type==="glitch"?<b data-text="HAZY">HAZY</b>:<i><span>▓▒░</span></i>}<div className="case-card-overlay"><h2>{title}</h2><p>{external?"ARTSTATION · ":""}{ru?category[1]:category[2]}</p></div></div></a>})}</div>
  </div>;
}
export function Shell({children}:{children:React.ReactNode}){return <main id="top"><Header/>{children}<Footer/></main>}
export function LocalizedShell({children}:{children:(ru:boolean)=>React.ReactNode}){const{ru,toggle}=useSiteLanguage();return <main id="top"><Header ru={ru} onToggleLanguage={toggle}/>{children(ru)}<Footer ru={ru}/></main>}
