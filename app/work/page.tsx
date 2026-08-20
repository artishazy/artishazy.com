"use client";
import {LocalizedShell,PageTitle,ProjectGrid} from "../components";
export default function Work(){return <LocalizedShell>{ru=><><PageTitle index="02" label={ru?"ИЗБРАННЫЕ ПРОЕКТЫ":"SELECTED WORK"} title={ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"} description={ru?"EXNODE, DREAMY, COLORIST и избранные коммерческие сайты — от исследования до адаптивного интерфейса.":"EXNODE, DREAMY, COLORIST and selected commercial websites — from research to responsive interfaces."}/><ProjectGrid ru={ru}/></>}</LocalizedShell>}
