"use client";
import {ArrowIcon,LocalizedShell} from "../components";
import {graphicCategories,graphicWorks} from "./data";

const descriptions={
  "void-identity":{ru:"Айдентика, построенная на контрасте пустоты, модульной сетки и лаконичного знака.",en:"An identity built on the contrast of negative space, a modular grid and a concise mark."},
  "signal-posters":{ru:"Серия постеров о шуме, повторении и попытке сохранить читаемый сигнал.",en:"A poster series about noise, repetition and the attempt to preserve a readable signal."},
  "type-studies":{ru:"Набор типографических композиций, исследующих масштаб, ритм и форму букв.",en:"A set of typographic compositions exploring scale, rhythm and letterform."},
  "raw-digital":{ru:"Цифровая графика на границе интерфейса, изображения и намеренной ошибки.",en:"Digital graphics at the boundary of interface, image and intentional error."},
  "logos-2026":{ru:"Подборка знаков и логотипов: от геометрических систем до пластичных символов.",en:"A selection of marks and logotypes, from geometric systems to fluid symbols."},
  "printed-objects":{ru:"Печатные носители и физические объекты, в которых графическая система становится материальной.",en:"Printed matter and physical objects where a graphic system becomes tangible."},
} as const;

export default function GraphicWorkPage({slug}:{slug:keyof typeof descriptions}){
  const work=graphicWorks.find(item=>item.slug===slug)!;
  const category=graphicCategories.find(item=>item.id===work.category)!;
  return <LocalizedShell>{ru=><>
    <section className="art-detail-hero"><a className="case-back" href="/graphic"><ArrowIcon direction="left"/>{ru?"ВСЯ ГРАФИКА":"ALL GRAPHIC WORK"}</a><div className="kicker">04—{ru?"ГРАФИКА":"GRAPHIC"} / {work.id}</div><h1>{ru?work.titleRu:work.titleEn}</h1><p>{ru?descriptions[slug].ru:descriptions[slug].en}</p></section>
    <div className={`graphic-detail-visual ${work.tone}`}><span>{work.id}</span><strong>{work.tone==="identity"?"V/O":work.tone==="poster"?"SIGNAL":work.tone==="type"?"Aa":work.tone==="digital"?"▓▒░":work.tone==="logos"?"(✦)":"A3"}</strong><i/><em/></div>
    <section className="art-detail-copy"><span className="kicker">{ru?category.ru:category.en} / {work.year}</span><p>{ru?"В проекте собраны ключевой визуальный принцип, система элементов и варианты применения. Композиция остаётся узнаваемой в разных масштабах и на цифровых и печатных носителях.":"The project brings together a core visual principle, a system of elements and application examples. The composition remains recognizable across scales and on both digital and printed media."}</p></section>
  </>}</LocalizedShell>;
}
