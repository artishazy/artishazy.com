"use client";

import {useEffect} from "react";
import Lenis from "lenis";

const scrollLerp=.12;
const wheelGestureGap=180;
const previewWheelMultiplier=.65;

export default function SmoothScroll(){
  useEffect(()=>{
    const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
    if(reducedMotion.matches)return;
    const body=document.body;
    if(!body)return;

    let lastWheel=-Infinity;
    let gesturePreview:HTMLElement|null=null;
    let previewScroll:{element:HTMLElement;lenis:Lenis}|null=null;
    // The page's wheel handler routes input to the preview, so the preview
    // Lenis instance only animates the scroll positions we give it.
    const previewEvents=document.createElement("div");

    const lenis:Lenis=new Lenis({
      autoRaf:true,
      smoothWheel:true,
      lerp:scrollLerp,
      wheelMultiplier:.9,
      anchors:true,
      allowNestedScroll:true,
      stopInertiaOnNavigate:true,
      virtualScroll:({deltaX,deltaY,event})=>{
        if(event.type!=="wheel" || !event.cancelable || (event as WheelEvent).ctrlKey ||
          Math.abs(deltaY)<=Math.abs(deltaX) || lenis.isStopped || lenis.isLocked)return true;

        const preview=event.composedPath().find(
          (node):node is HTMLElement=>node instanceof HTMLElement && node.hasAttribute("data-smooth-preview"),
        );
        const now=performance.now();
        if(now-lastWheel>=wheelGestureGap || (gesturePreview && !gesturePreview.isConnected)){
          const remaining=preview ? preview.scrollHeight-preview.clientHeight-preview.scrollTop : 0;
          const canScroll=preview && (deltaY>0 ? remaining>1 : preview.scrollTop>1);
          gesturePreview=canScroll ? preview : null;
          if(gesturePreview && lenis.isScrolling==="smooth"){
            lenis.scrollTo(window.scrollY,{immediate:true});
          }
          if(previewScroll && previewScroll.element!==gesturePreview){
            previewScroll.lenis.destroy();
            previewScroll=null;
          }
        }
        lastWheel=now;

        if(!preview && !gesturePreview)return true;
        event.preventDefault();

        if(gesturePreview){
          if(!previewScroll){
            previewScroll={element:gesturePreview,lenis:new Lenis({
              wrapper:gesturePreview,
              eventsTarget:previewEvents,
              autoResize:false,
              naiveDimensions:true,
              autoRaf:true,
              lerp:scrollLerp,
            })};
          }
          const scroller=previewScroll.lenis;
          scroller.scrollTo(scroller.targetScroll+deltaY*previewWheelMultiplier,{programmatic:false,lerp:scrollLerp});
        }else{
          lenis.scrollTo(lenis.targetScroll+deltaY,{programmatic:false,lerp:scrollLerp});
        }
        return false;
      },
    });

    const setLocked=(locked:boolean)=>{
      lastWheel=-Infinity;
      gesturePreview=null;
      previewScroll?.lenis.destroy();
      previewScroll=null;
      if(locked)lenis.stop();
      else lenis.start();
    };
    const onScrollLock=(event:Event)=>setLocked((event as CustomEvent<boolean>).detail);
    addEventListener("aih-scroll-lock",onScrollLock);
    setLocked(getComputedStyle(body).overflow==="hidden");

    return()=>{
      removeEventListener("aih-scroll-lock",onScrollLock);
      previewScroll?.lenis.destroy();
      lenis.destroy();
    };
  },[]);

  return null;
}
