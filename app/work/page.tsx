"use client";
import {FilteredProjectGrid,LocalizedShell,PageTitle} from "../components";
export default function Work(){return <LocalizedShell>{ru=><><PageTitle index="01" label={ru?"ПРОЕКТЫ":"WORK"} title={ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"} description={ru?"Проектирую цифровые продукты целиком: исследую контекст, выстраиваю пользовательские сценарии и собираю интерфейс в последовательную систему.":"I design digital products end to end: researching context, shaping user flows and building interfaces into coherent systems."}/><FilteredProjectGrid ru={ru}/></>}</LocalizedShell>}
