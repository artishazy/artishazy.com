"use client";
import {FilteredProjectGrid,LocalizedShell} from "../components";
import "./product-portfolio.css";

export default function ProductPortfolio(){return <LocalizedShell>{ru=><div className="ux-profile">
 <header className="about-intro">
  <div className="kicker">{ru?"UX/UI / ПОРТФОЛИО":"UX/UI / PORTFOLIO"}</div>
  <div className="about-intro-grid">
   <h1>UX/UI<br/>{ru?"ДИЗАЙНЕР":"DESIGNER"}</h1>
   <div className="about-intro-copy">
    <strong>{ru?"ДАНИИЛ ЧЕРКАШИН":"DANIIL CHERKASHIN"}</strong>
    <p>{ru?"Проектирую сайты, веб-сервисы и мобильные приложения — от сценариев и прототипов до адаптивного UI.":"I design websites, web products and mobile apps, from user flows and prototypes to responsive UI."}</p>
   </div>
  </div>
 </header>
 <section className="about-grid" aria-label={ru?"Навыки и инструменты":"Skills and tools"}>
  <div><span>{ru?"НАВЫКИ":"SKILLS"}</span><ul><li>{ru?"User Flows, прототипы, адаптивный UI":"User flows, prototypes, responsive UI"}</li><li>{ru?"Компоненты и дизайн-системы":"Components and design systems"}</li></ul></div>
  <div><span>{ru?"ИНСТРУМЕНТЫ":"TOOLS"}</span><ul><li>Figma / FigJam / Tilda</li><li>Illustrator / Photoshop</li></ul></div>
  <div><span>{ru?"В КОМАНДЕ":"COLLABORATION"}</span><ul><li>{ru?"Обсуждение решений и обратной связи":"Design reviews and feedback"}</li><li>{ru?"Передача макетов в разработку":"Design handoff to developers"}</li></ul></div>
 </section>
 <section className="ux-profile-cases" id="cases">
  <header className="ux-profile-cases-heading"><h2>{ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"}</h2></header>
  <FilteredProjectGrid ru={ru}/>
 </section>

 </div>}</LocalizedShell>}
