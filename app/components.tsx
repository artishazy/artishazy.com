"use client";
import { useEffect,useState } from "react";
export function Cursor(){useEffect(()=>{if(!matchMedia('(pointer:fine)').matches)return;let x=-80,y=-80,tx=x,ty=y,raf=0;const el=document.querySelector<HTMLElement>('.soft-cursor');const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY};const tick=()=>{x+=(tx-x)*.16;y+=(ty-y)*.16;if(el)el.style.transform=`translate3d(${x-18}px,${y-18}px,0)`;raf=requestAnimationFrame(tick)};addEventListener('pointermove',move);tick();return()=>{removeEventListener('pointermove',move);cancelAnimationFrame(raf)}},[]);return <div className="soft-cursor" aria-hidden="true"/>}
export function Header(){const[dark,setDark]=useState(true);const[ru,setRu]=useState(true);useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light"},[dark]);return <header className="header"><a className="wordmark" href="/">ART_IS_HAZY®</a><nav><a href="/work">WORK</a><a href="/graphic">GRAPHIC</a><a href="/art">ART</a><a href="/about">ABOUT</a></nav><div className="controls"><button onClick={()=>setRu(!ru)}>{ru?"RU":"EN"}</button><button onClick={()=>setDark(!dark)}>{dark?"LIGHT":"DARK"}</button></div></header>}
export function Footer(){return <footer className="site-footer"><div><span>LET'S MAKE</span><strong>SOMETHING<br/>STRANGE.</strong></div><div className="footer-links"><a href="mailto:hello@artishazy.com">EMAIL ↗</a><a href="#">BEHANCE ↗</a><a href="#">TELEGRAM ↗</a></div><small>©2026 ART_IS_HAZY / MOSCOW</small></footer>}
export function PageTitle({index,label,title,description}:{index:string,label:string,title:string,description:string}){return <section className="page-title"><div className="kicker">{index}—{label}</div><h1>{title}</h1><p>{description}</p></section>}
export const works=[
 {id:"01",slug:"signal",title:"SIGNAL / FINTECH",tags:"PRODUCT · WEB APP · SYSTEM",tone:"grid"},
 {id:"02",slug:"archive",title:"ARCHIVE / CULTURE",tags:"WEBSITE · ART DIRECTION",tone:"blocks"},
 {id:"03",slug:"nexus",title:"NEXUS / AI TOOL",tags:"UX/UI · PROTOTYPE",tone:"rings"},
 {id:"04",slug:"mono",title:"MONO / FASHION",tags:"ECOMMERCE · IDENTITY",tone:"type"},
];
export function ProjectGrid({compact=false}:{compact?:boolean}){return <div className={`project-grid ${compact?"compact":""}`}>{works.map((w,i)=><a className="project-card interactive" href={`/work/${w.slug}`} key={w.slug}><div className={`project-visual ${w.tone}`}><span>{w.id}</span><i/><b>{i%2?"▓▓▒░":"░▒▓▓"}</b><em>OPEN<br/>PROJECT</em></div><div className="project-meta glass-strip"><h2>{w.title}</h2><p>{w.tags}</p><span>VIEW CASE ↗</span></div></a>)}</div>}
export function Shell({children}:{children:React.ReactNode}){return <main><Header/>{children}<Footer/></main>}
