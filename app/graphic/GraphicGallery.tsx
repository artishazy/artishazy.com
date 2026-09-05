"use client";
import {useEffect,useRef,useState} from "react";
import Image from "next/image";
import {SliderControls,useHorizontalTrack} from "../components";
import {GraphicCategory,graphicCategories,graphicWorks,publishedGraphicWorks} from "./data";

export function GraphicCard({work,ru}:{work:typeof graphicWorks[number];ru:boolean}){
  const category=graphicCategories.find(item=>item.id===work.category)!;
  return <a data-slide data-case-card className={`graphic-project-card ${work.shape}`} href={`/graphic/${work.slug}`} data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}>
    <div className={`graphic-project-visual case-overlay-visual ${work.tone}`}>{"cover" in work&&work.cover?<Image src={work.cover} alt="" width={1920} height={1080} priority={work.id==="01"} unoptimized/>:<><b>{work.tone==="identity"?"V/O":work.tone==="poster"?"SIGNAL":work.tone==="type"?"Aa":work.tone==="digital"?"▓▒░":work.tone==="logos"?"(✦)":"A3"}</b><i/><em/></>}<div className="case-card-overlay"><h2>{ru?work.titleRu:work.titleEn}</h2><p>{ru?category.ru:category.en} · {work.year}</p></div></div>
  </a>;
}

export default function GraphicGallery({ru,standalone=false}:{ru:boolean;standalone?:boolean}){
  const[active,setActive]=useState<GraphicCategory>("all");
  const[current,setCurrent]=useState(0);
  const track=useRef<HTMLDivElement>(null);
  const visible=active==="all"?publishedGraphicWorks:publishedGraphicWorks.filter(work=>work.category===active);
  useHorizontalTrack(track,!standalone);
  const choose=(category:GraphicCategory)=>{setActive(category);setCurrent(0)};
  useEffect(()=>{if(track.current)track.current.scrollLeft=0},[active]);
  const sync=()=>{const el=track.current;if(!el)return;const card=el.querySelector<HTMLElement>("[data-slide]");const gap=parseFloat(getComputedStyle(el).columnGap||getComputedStyle(el).gap)||0;if(card)setCurrent(Math.min(visible.length-1,Math.round(el.scrollLeft/(card.offsetWidth+gap))))};
  return <section className={`graphic-gallery ${standalone?"is-grid":""}`}>
    <div className="graphic-gallery-head"><div className="graphic-filters" role="group" aria-label={ru?"Фильтр графических работ":"Filter graphic work"}>{graphicCategories.map(category=><button key={category.id} className={active===category.id?"is-active":""} onClick={()=>choose(category.id)} aria-pressed={active===category.id}>{ru?category.ru:category.en}<span>{String(category.id==="all"?publishedGraphicWorks.length:publishedGraphicWorks.filter(work=>work.category===category.id).length).padStart(2,"0")}</span></button>)}</div>{!standalone&&<SliderControls track={track} current={current} total={visible.length} ru={ru} hideCount/>}</div>
    <div className="graphic-project-grid" ref={track} onScroll={sync}>{visible.map(work=><GraphicCard work={work} ru={ru} key={work.slug}/>)}</div>
    {active!=="all"&&<button className="graphic-show-all" onClick={()=>choose("all")}>{ru?"ПОКАЗАТЬ ВСЕ РАБОТЫ":"SHOW ALL WORK"}<span>{publishedGraphicWorks.length}</span></button>}
  </section>;
}
