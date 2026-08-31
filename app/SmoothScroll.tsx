"use client";

import {useEffect} from "react";
import Lenis from "lenis";

export default function SmoothScroll(){
  useEffect(()=>{
    const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
    if(reducedMotion.matches)return;

    const lenis=new Lenis({
      autoRaf:true,
      smoothWheel:true,
      lerp:.085,
      wheelMultiplier:.9,
      anchors:true,
      allowNestedScroll:true,
      stopInertiaOnNavigate:true,
    });

    const syncLockedState=()=>{
      if(getComputedStyle(document.body).overflow==="hidden")lenis.stop();
      else lenis.start();
    };
    const bodyObserver=new MutationObserver(syncLockedState);
    bodyObserver.observe(document.body,{attributes:true,attributeFilter:["style"]});
    syncLockedState();

    return()=>{
      bodyObserver.disconnect();
      lenis.destroy();
    };
  },[]);

  return null;
}
