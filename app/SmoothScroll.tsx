"use client";

import {useEffect} from "react";
import Lenis from "lenis";

export default function SmoothScroll(){
  useEffect(()=>{
    const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
    if(reducedMotion.matches)return;
    const body=document.body;
    if(!body)return;

    const lenis=new Lenis({
      autoRaf:true,
      smoothWheel:true,
      lerp:.12,
      wheelMultiplier:.9,
      anchors:true,
      allowNestedScroll:true,
      stopInertiaOnNavigate:true,
    });

    const setLocked=(locked:boolean)=>locked?lenis.stop():lenis.start();
    const onScrollLock=(event:Event)=>setLocked((event as CustomEvent<boolean>).detail);
    addEventListener("aih-scroll-lock",onScrollLock);
    setLocked(getComputedStyle(body).overflow==="hidden");

    return()=>{
      removeEventListener("aih-scroll-lock",onScrollLock);
      lenis.destroy();
    };
  },[]);

  return null;
}
