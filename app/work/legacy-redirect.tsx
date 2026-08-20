"use client";
import {useEffect} from "react";

export function LegacyRedirect({to}:{to:string}){
  useEffect(()=>{location.replace(to)},[to]);
  return <main className="legacy-redirect"><p>АДРЕС ПРОЕКТА ИЗМЕНИЛСЯ.</p><a href={to}>ПЕРЕЙТИ К КЕЙСУ ↗</a></main>;
}
