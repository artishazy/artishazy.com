/* eslint-disable @next/next/no-img-element -- Responsive WebP assets are generated for static hosting. */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- The scrollable image region needs keyboard panning. */
"use client";
import {useRef,useState} from "react";
import PortfolioImage,{optimizedImage} from "../PortfolioImage";
export default function ZoomImage({src,alt,ru,width=1920,height=1080,priority=false}:{src:string;alt:string;ru:boolean;width?:number;height?:number;priority?:boolean}){
  const[opened,setOpened]=useState(false);
  const[zoomed,setZoomed]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const previousOverflow=useRef("");
  const open=()=>{if(!dialog.current)return;setOpened(true);setZoomed(false);previousOverflow.current=document.body.style.overflow;dialog.current.showModal();document.body.style.overflow="hidden";dispatchEvent(new CustomEvent("aih-scroll-lock",{detail:true}))};
  const closed=()=>{document.body.style.overflow=previousOverflow.current;dispatchEvent(new CustomEvent("aih-scroll-lock",{detail:false}));trigger.current?.focus()};
  return <><button ref={trigger} className="image-zoom-trigger" onClick={open} aria-label={`${ru?"Увеличить":"Enlarge"}: ${alt}`}><PortfolioImage src={src} alt={alt} width={width} height={height} priority={priority} sizes="(max-width: 700px) 100vw, 90vw"/><span className="image-zoom-hint" aria-hidden="true">{ru?"УВЕЛИЧИТЬ":"ENLARGE"} ↗</span></button><dialog ref={dialog} className="image-viewer" aria-label={alt} onClose={closed}><div className="image-viewer-bar"><p>{alt}</p><button onClick={()=>setZoomed(value=>!value)} aria-label={zoomed?(ru?"Показать целиком":"Fit image"):(ru?"Увеличить масштаб":"Zoom in")}>{zoomed?"−":"+"}</button><a href={src} target="_blank" rel="noreferrer">{ru?"ОРИГИНАЛ":"ORIGINAL"} ↗</a><button onClick={()=>dialog.current?.close()} aria-label={ru?"Закрыть изображение":"Close image"}>✕</button></div><div className={`image-viewer-scroll ${zoomed?"is-zoomed":""}`} data-lenis-prevent tabIndex={0} role="region" aria-label={ru?"Изображение с прокруткой":"Scrollable image"}>{opened&&<img src={optimizedImage(src)} alt={alt}/>}</div></dialog></>;
}
