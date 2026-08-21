"use client";
import {LocalizedShell,artWorks} from "../components";

const copy={
  "ascii-sculpture":{
    ru:"Исследование скульптурной формы через символ, плотность и цифровую глубину. Работа строится слоями и реагирует на движение зрителя.",
    en:"A study of sculptural form through symbols, density and digital depth. The work is built in layers and responds to the viewer's movement.",
  },
  "hazy-form":{
    ru:"Визуальное исследование формы, которая проявляется и растворяется в тумане. Свет и смещение становятся частью композиции.",
    en:"A visual study of a form emerging from and dissolving into haze. Light and displacement become part of the composition.",
  },
  "noise-study":{
    ru:"Работа о границе между шумом и читаемым сигналом. Системная сетка сталкивается с ошибками, разрывами и случайной фактурой.",
    en:"A work about the boundary between noise and a readable signal. A systematic grid meets errors, breaks and accidental texture.",
  },
} as const;

export default function ArtWorkPage({slug}:{slug:keyof typeof copy}){
  const work=artWorks.find(item=>item.slug===slug)!;
  return <LocalizedShell>{ru=><>
    <section className="art-detail-hero"><div className="kicker">04—{ru?"АРТ-ЛАБОРАТОРИЯ":"ART LAB"} / {work.id}</div><h1>{ru?work.titleRu:work.titleEn}</h1><p>{ru?copy[slug].ru:copy[slug].en}</p></section>
    <div className={`art-detail-visual ${work.type}`}>{work.type==="ascii"?<pre>.+########+.{"\n"}###▒░()░▒###{"\n"}##▒ /||||\\ ▒##{"\n"}### /_||||_\\ ###{"\n"}  ########</pre>:work.type==="glitch"?<strong>HAZY</strong>:<strong>▓▒░ / SIGNAL</strong>}</div>
    <section className="art-detail-copy"><span className="kicker">{ru?"О РАБОТЕ":"ABOUT THE WORK"}</span><p>{ru?"Здесь будет полное описание: замысел, процесс, медиум, год создания и серия изображений. Страница уже готова к наполнению конкретными материалами.":"This page is ready for a full description: concept, process, medium, year and an image series."}</p></section>
  </>}</LocalizedShell>;
}
