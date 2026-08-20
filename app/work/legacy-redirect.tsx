"use client";
import {useEffect} from "react";
import {ArrowIcon} from "../components";

export function LegacyRedirect({to}:{to:string}){
  useEffect(()=>{location.replace(to)},[to]);
  return <main className="legacy-redirect"><p>АДРЕС ПРОЕКТА ИЗМЕНИЛСЯ.</p><a href={to}>ПЕРЕЙТИ К КЕЙСУ <ArrowIcon direction="up-right"/></a></main>;
}
