"use client";

import {useState} from "react";
import {ArrowIcon,LocalizedShell} from "../components";

const resumes={
  uxui:{label:"UX/UI",href:"/cv/daniil-cherkashin-uxui.pdf"},
  graphic:{label:"GRAPHIC DESIGN",href:"/cv/daniil-cherkashin-graphic.pdf"},
} as const;

export default function Resume(){
  const[selected,setSelected]=useState<keyof typeof resumes>("uxui");
  const current=resumes[selected];
  return <LocalizedShell>{ru=><>
    <section className="resume-hero">
      <div className="kicker">CV—{ru?"РЕЗЮМЕ":"RÉSUMÉ"}</div>
      <h1>{ru?"РЕЗЮМЕ":"RÉSUMÉ"}</h1>
      <p>{ru?"Выберите профессиональный фокус. Обе версии можно посмотреть прямо на странице или открыть отдельным PDF.":"Choose a professional focus. Both versions can be viewed here or opened as a separate PDF."}</p>
    </section>
    <section className="resume-section">
      <div className="resume-toolbar">
        <div className="resume-switcher" aria-label={ru?"Выбор версии резюме":"Choose résumé version"}>
          {(Object.keys(resumes) as Array<keyof typeof resumes>).map(key=><button key={key} type="button" className={selected===key?"is-active":""} onClick={()=>setSelected(key)} aria-pressed={selected===key}>{resumes[key].label}</button>)}
        </div>
        <a href={current.href} target="_blank" rel="noreferrer">{ru?"ОТКРЫТЬ PDF":"OPEN PDF"}<ArrowIcon direction="up-right"/></a>
      </div>
      <div className="resume-viewer"><iframe key={current.href} src={`${current.href}#view=FitH`} title={`${current.label} résumé`}/><p>{ru?"Если документ не отображается в браузере, откройте PDF по кнопке выше.":"If the document does not appear in your browser, use the Open PDF button above."}</p></div>
    </section>
  </>}</LocalizedShell>;
}
