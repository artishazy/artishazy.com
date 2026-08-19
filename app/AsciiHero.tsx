"use client";

import {useEffect,useRef} from "react";
import {ASCII_ROWS} from "./ascii-art";

type Layer=0|1|2;
type Point={x:number;y:number;char:string;weight:number;layer:Layer;alpha:number;shard?:Layer};

const DENSITY="@%#*+=-:.";
const sourceWidth=ASCII_ROWS[0]?.length||72;
const sourceHeight=ASCII_ROWS.length;
const hash=(x:number,y:number)=>(Math.abs(x*37+y*61+x*y*3)%997)/997;

const ORIGINAL:Point[]=ASCII_ROWS.flatMap((row,y)=>[...row].flatMap((char,x)=>{
  const density=DENSITY.indexOf(char);
  if(density<0||density>5)return[];
  const weight=1-density/(DENSITY.length-1);
  const layer:Layer=density<=1?2:density<=3?1:0;
  const px=x-(sourceWidth-1)/2;
  const py=y-(sourceHeight-1)/2;
  const leftFade=px<-26?Math.max(.18,Math.min(1,(px+36)/10)):1;
  const topFade=py<-43?Math.max(.2,Math.min(1,(py+53)/10)):1;
  return[{x:px,y:py,char,weight,layer,alpha:leftFade*topFade}];
}));

const LEFT_WING_EXTENSIONS:Point[]=ORIGINAL.filter(point=>point.x<-22&&point.y<34&&point.weight>.4).flatMap((point,index)=>[1,2].map(step=>({
  ...point,
  x:point.x-step*(2.8+hash(Math.round(point.x*10),Math.round(point.y*10))*3.4),
  y:point.y+(hash(index,step)-.5)*5-step*.25,
  char:step===1?point.char:(point.weight>.72?"*":"+"),
  weight:point.weight*(step===1?.9:.7),
  alpha:point.alpha*(step===1?.5:.22),
})));

const WING_SOURCE=[...ORIGINAL.filter(point=>point.x<-7&&point.y<34&&point.weight>.45),...LEFT_WING_EXTENSIONS];
const SECOND_WING:Point[]=WING_SOURCE.map(point=>({
  ...point,
  x:16-point.x,
  y:point.y+Math.sin(point.x*.18)*1.2,
  weight:point.weight*.9,
  alpha:point.alpha*.76,
}));

const STATUE=[...ORIGINAL,...LEFT_WING_EXTENSIONS,...SECOND_WING];

const BLOB:Point[]=[];
for(let y=-59;y<=59;y+=1){
  for(let x=-61;x<=65;x+=1){
    const nx=(x-3)/61;
    const ny=y/59;
    const wobble=Math.sin(y*.17)*.08+Math.cos(x*.23)*.055+Math.sin((x+y)*.11)*.04;
    if(nx*nx+ny*ny>1+wobble)continue;
    const noise=hash(x,y);
    if(noise>.52)continue;
    const chars=["·",".",":","-","="];
    BLOB.push({x,y,char:chars[Math.min(chars.length-1,Math.floor(noise*chars.length*3.2))],weight:.13+noise*.42,layer:0,alpha:.22+noise*.5,shard:(Math.floor(noise*30)%3) as Layer});
  }
}

export default function AsciiHero({ru=true}:{ru?:boolean}){
  const root=useRef<HTMLDivElement>(null);
  const volume=useRef<HTMLDivElement>(null);
  const scatter=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const host=root.current;
    const object=volume.current;
    const cloud=scatter.current;
    if(!host||!object||!cloud)return;
    const canvases=[...host.querySelectorAll<HTMLCanvasElement>("canvas")];
    let resizeFrame=0;
    let motionFrame=0;
    let targetX=0;
    let targetY=0;
    let currentX=0;
    let currentY=0;
    let visible=false;

    const draw=()=>{
      const rect=host.getBoundingClientRect();
      const width=Math.max(1,rect.width);
      const height=Math.max(1,rect.height);
      const ratio=Math.min(devicePixelRatio||1,1.35);
      const ink=getComputedStyle(document.documentElement).getPropertyValue("--fg").trim()||"#11110f";
      const unit=Math.min(width/132,height/122);
      const cx=width*.53;
      const cy=height*.51;

      for(const canvas of canvases){
        const context=canvas.getContext("2d");
        if(!context)continue;
        canvas.width=Math.round(width*ratio);
        canvas.height=Math.round(height*ratio);
        canvas.style.width=width+"px";
        canvas.style.height=height+"px";
        context.setTransform(ratio,0,0,ratio,0,0);
        context.clearRect(0,0,width,height);
        context.textAlign="center";
        context.textBaseline="middle";
        context.fillStyle=ink;

        const kind=canvas.dataset.kind;
        const layer=Number(canvas.dataset.layer) as Layer;
        const points=kind==="cloud"?BLOB.filter(point=>point.shard===layer):STATUE.filter(point=>point.layer===layer);
        for(const point of points){
          const size=Math.max(4.1,unit*(.82+point.weight*.2));
          const baseAlpha=kind==="cloud"?.85:layer===0?.24:layer===1?.56:.9;
          context.globalAlpha=baseAlpha*(.42+point.weight*.7)*point.alpha;
          context.font=(layer===2?"650 ":"520 ")+size+"px ui-monospace, SFMono-Regular, Menlo, monospace";
          context.fillText(point.char,cx+point.x*unit,cy+point.y*unit);
        }
        context.globalAlpha=1;
      }
    };

    const scheduleDraw=()=>{
      cancelAnimationFrame(resizeFrame);
      resizeFrame=requestAnimationFrame(draw);
    };
    const animate=(time:number)=>{
      if(!visible){motionFrame=0;return;}
      currentX+=(targetX-currentX)*.065;
      currentY+=(targetY-currentY)*.065;
      const nx=currentX+Math.sin(time*.00038)*.025;
      const ny=currentY+Math.cos(time*.00031)*.022;
      object.style.setProperty("--volume-ry",9+nx*12+"deg");
      object.style.setProperty("--volume-rx",-4-ny*7+"deg");
      object.style.setProperty("--volume-y",Math.sin(time*.00072)*4+"px");
      object.style.setProperty("--volume-rz",Math.sin(time*.00045)*.28+"deg");
      cloud.style.setProperty("--scatter-a-x",-nx*16+"px");
      cloud.style.setProperty("--scatter-a-y",-ny*11+"px");
      cloud.style.setProperty("--scatter-b-x",nx*12+"px");
      cloud.style.setProperty("--scatter-b-y",-ny*15+"px");
      cloud.style.setProperty("--scatter-c-x",-nx*8+"px");
      cloud.style.setProperty("--scatter-c-y",ny*17+"px");
      motionFrame=requestAnimationFrame(animate);
    };
    const move=(event:PointerEvent)=>{
      targetX=Math.max(-1,Math.min(1,(event.clientX/window.innerWidth-.5)*2));
      targetY=Math.max(-1,Math.min(1,(event.clientY/window.innerHeight-.5)*2));
    };

    const resizeObserver=new ResizeObserver(scheduleDraw);
    const themeObserver=new MutationObserver(scheduleDraw);
    const visibilityObserver=new IntersectionObserver(([entry])=>{
      visible=entry.isIntersecting;
      if(visible&&!motionFrame)motionFrame=requestAnimationFrame(animate);
      if(!visible&&motionFrame){cancelAnimationFrame(motionFrame);motionFrame=0;}
    },{threshold:0});
    resizeObserver.observe(host);
    themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    visibilityObserver.observe(host);
    window.addEventListener("pointermove",move,{capture:true,passive:true});
    draw();

    return()=>{
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(motionFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove",move,{capture:true});
    };
  },[]);

  return <div className="ascii-hero ascii-hero-3d" ref={root} role="img" aria-label={ru?"Объёмная ASCII-статуя с крыльями и рассыпающимся фоном":"Volumetric winged ASCII statue with a scattering background"}>
    <div className="ascii-aura" aria-hidden="true"/>
    <div className="ascii-scatter-field" ref={scatter} aria-hidden="true">
      <canvas className="ascii-scatter scatter-a" data-kind="cloud" data-layer="0"/>
      <canvas className="ascii-scatter scatter-b" data-kind="cloud" data-layer="1"/>
      <canvas className="ascii-scatter scatter-c" data-kind="cloud" data-layer="2"/>
    </div>
    <div className="ascii-volume" ref={volume} aria-hidden="true">
      <canvas className="ascii-depth ascii-depth-back" data-kind="statue" data-layer="0"/>
      <canvas className="ascii-depth ascii-depth-mid" data-kind="statue" data-layer="1"/>
      <canvas className="ascii-depth ascii-depth-front" data-kind="statue" data-layer="2"/>
    </div>
    <span className="ascii-caption">{ru?"ASCII СТАТУЯ / POINTER FIELD":"ASCII STATUE / POINTER FIELD"}</span>
    <span className="ascii-axis axis-x" aria-hidden="true">X</span>
    <span className="ascii-axis axis-y" aria-hidden="true">Y</span>
  </div>;
}
