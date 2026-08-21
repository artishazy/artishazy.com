"use client";
import {useRef,useState} from "react";
import {ArrowIcon,SliderControls} from "../components";
import {GraphicCategory,graphicCategories,graphicWorks} from "./data";

export function GraphicCard({work,ru}:{work:typeof graphicWorks[number];ru:boolean}){
  const category=graphicCategories.find(item=>item.id===work.category)!;
  return <a data-slide className={`graphic-project-card ${work.shape}`} href={`/graphic/${work.slug}`} data-cursor-label={ru?"ОТКРЫТЬ":"OPEN"}>
    <div className={`graphic-project-visual ${work.tone}`}><span>{work.id}</span><b>{work.tone==="identity"?"V/O":work.tone==="poster"?"SIGNAL":work.tone==="type"?"Aa":work.tone==="digital"?"▓▒░":work.tone==="logos"?"(✦)":"A3"}</b><i/><em/></div>
    <div className="graphic-project-meta"><div><h2>{ru?work.titleRu:work.titleEn}</h2><p>{ru?category.ru:category.en} · {work.year}</p></div><span className="card-open-icon" aria-hidden="true"><ArrowIcon direction="up-right"/></span></div>
  </a>;
}

export default function GraphicGallery({ru}:{ru:boolean}){
  const[active,setActive]=useState<GraphicCategory>("all");
  const[current,setCurrent]=useState(0);
  const track=useRef<HTMLDivElement>(null);
  const visible=active==="all"?graphicWorks:graphicWorks.filter(work=>work.category===active);
  const choose=(category:GraphicCategory)=>{setActive(category);setCurrent(0);track.current?.scrollTo({left:0,behavior:"smooth"})};
  const sync=()=>{const el=track.current;if(!el)return;const card=el.querySelector<HTMLElement>("[data-slide]");const gap=parseFloat(getComputedStyle(el).columnGap||getComputedStyle(el).gap)||0;if(card)setCurrent(Math.min(visible.length-1,Math.round(el.scrollLeft/(card.offsetWidth+gap))))};
  return <section className="graphic-gallery">
    <div className="graphic-gallery-head"><div className="graphic-filters" role="group" aria-label={ru?"Фильтр графических работ":"Filter graphic work"}>{graphicCategories.map(category=><button key={category.id} className={active===category.id?"is-active":""} onClick={()=>choose(category.id)} aria-pressed={active===category.id}>{ru?category.ru:category.en}<span>{String(category.id==="all"?graphicWorks.length:graphicWorks.filter(work=>work.category===category.id).length).padStart(2,"0")}</span></button>)}</div><SliderControls track={track} current={current} total={visible.length} ru={ru} hideCount/></div>
    <div className="graphic-project-grid" ref={track} onScroll={sync}>{visible.map(work=><GraphicCard work={work} ru={ru} key={work.slug}/>)}</div>
    {active!=="all"&&<button className="graphic-show-all" onClick={()=>choose("all")}>{ru?"ПОКАЗАТЬ ВСЕ РАБОТЫ":"SHOW ALL WORK"}<span>{graphicWorks.length}</span></button>}
  </section>;
}
