"use client";

import {useState} from "react";
import AsciiHero from "./AsciiHero";
import {Footer,Header,PageTitle,ProjectGrid} from "./components";

const graphicItems=[
  {ru:"АЙДЕНТИКА / VOID",en:"IDENTITY / VOID"},
  {ru:"ПОСТЕРЫ / SIGNAL",en:"POSTERS / SIGNAL"},
  {ru:"ШРИФТОВЫЕ ЭТЮДЫ",en:"TYPE STUDIES"},
  {ru:"СОЦСЕТИ / RAW",en:"SOCIAL / RAW"},
  {ru:"ЛОГОТИПЫ / 2026",en:"LOGOS / 2026"},
  {ru:"ПЕЧАТЬ / ОБЪЕКТЫ",en:"PRINT / OBJECTS"},
];

const services=[
  {ruTitle:"ПРОДУКТОВЫЙ ДИЗАЙН",enTitle:"PRODUCT DESIGN",ru:"Исследования, пользовательские сценарии, интерфейсы и масштабируемые дизайн-системы.",en:"Research, user flows, interfaces and scalable design systems.",code:"UX / UI"},
  {ruTitle:"ВЕБ-ОПЫТ",enTitle:"WEB EXPERIENCE",ru:"Лендинги, многостраничные сайты и Telegram Web Apps с адаптивной логикой.",en:"Landing pages, multi-page websites and Telegram Web Apps with responsive logic.",code:"WEB / MOTION"},
  {ruTitle:"АЙДЕНТИКА",enTitle:"IDENTITY",ru:"Визуальные системы — от концепции и логотипа до типографики и носителей.",en:"Visual systems from concept and logo to typography and applications.",code:"BRAND / SYSTEM"},
  {ruTitle:"ЦИФРОВОЙ АРТ",enTitle:"DIGITAL ART",ru:"3D, генеративная графика, ASCII-объекты и исследования цифровой формы.",en:"3D, generative graphics, ASCII objects and digital form studies.",code:"ART / 3D"},
];

function Stage({ru}:{ru:boolean}){
  return <div className="stage" aria-label={ru?"Интерактивный объёмный ASCII-арт на модульной сетке":"Interactive volumetric ASCII artwork on a modular grid"}>
    <div className="stage-grid"/>
    <AsciiHero ru={ru}/>
  </div>;
}

export default function Home(){
  const[ru,setRu]=useState(true);

  return <main className="landing">
    <Header landing ru={ru} onToggleLanguage={()=>setRu(!ru)}/>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{ru?"ПРОДУКТОВЫЙ UX/UI-ДИЗАЙНЕР / АРТ-ДИРЕКТОР — 2026":"PRODUCT UX/UI DESIGNER / ART DIRECTOR — 2026"}</p>
        <h1>{ru?<><span>ИСКУССТВО —</span><br/>ПРОЯВЛЯЕТСЯ<br/>ИЗ ТУМАНА.</>:<><span>ART —</span><br/>EMERGES FROM<br/>THE HAZE.</>}</h1>
        <div className="intro"><span>{ru?"01—ВВЕДЕНИЕ":"01—INTRO"}</span><p>{ru?"Цифровые продукты и образы на границе ясной структуры и визуального тумана.":"Digital products and images at the edge of clear structure and visual haze."}</p></div>
      </div>
      <Stage ru={ru}/>
      <a className="hero-scroll" href="#services" aria-label={ru?"Перейти к направлениям":"Go to services"}>{ru?"ЛИСТАТЬ / НАПРАВЛЕНИЯ ↓":"SCROLL / SERVICES ↓"}</a>
    </section>

    <section className="landing-section main-services" id="services">
      <PageTitle index="01" label={ru?"ПРАКТИКА":"PRACTICE"} title={ru?"ГЛАВНЫЕ НАПРАВЛЕНИЯ":"MAIN DIRECTIONS"} description={ru?"Четыре области, в которых исследование и продуктовая логика встречаются с характерным визуальным языком.":"Four areas where research and product logic meet a distinct visual language."}/>
      <div className="main-service-list">
        {services.map((service,index)=><article className="main-service-row" key={service.enTitle}>
          <span className="main-service-number">0{index+1}</span>
          <h2>{ru?service.ruTitle:service.enTitle}</h2>
          <div className={`main-service-object object-${index+1}`} aria-hidden="true"><i/><b>{index===0?"[ + ]":index===1?"↘ ↗":index===2?"A—Z":"░▒▓"}</b></div>
          <p>{ru?service.ru:service.en}</p>
          <small>{service.code}</small>
          <span className="main-service-arrow">↘</span>
        </article>)}
      </div>
    </section>

    <section className="landing-section" id="work">
      <PageTitle index="02" label={ru?"ИЗБРАННЫЕ ПРОЕКТЫ":"SELECTED WORK"} title={ru?"ПРОЕКТЫ / UX·UI":"WORK / UX·UI"} description={ru?"EXNODE, DREAMY, COLORIST и избранные коммерческие сайты: от исследования и структуры до адаптивного интерфейса.":"EXNODE, DREAMY, COLORIST and selected commercial websites — from research and structure to responsive interfaces."}/>
      <div className="filter-row"><span>{ru?"ВСЕ":"ALL"} [04]</span><span>{ru?"ВЕБ":"WEB"} [03]</span><span>{ru?"МОБИЛЬНЫЕ":"MOBILE"} [01]</span><span>{ru?"СИСТЕМЫ":"SYSTEMS"} [02]</span></div>
      <ProjectGrid ru={ru}/>
    </section>

    <section className="landing-section" id="graphic">
      <PageTitle index="03" label={ru?"ГРАФИЧЕСКИЙ ДИЗАЙН":"GRAPHIC DESIGN"} title={ru?"ГРАФИКА / АРХИВ":"GRAPHIC / ARCHIVE"} description={ru?"Айдентика, логотипы, постеры, печатные материалы и визуальные системы.":"Identity, logos, posters, printed matter and visual systems."}/>
      <div className="masonry">{graphicItems.map((item,i)=><article className={`graphic-tile t${i}`} key={item.en}><div><b>{i%3===0?"A—Z":i%3===1?"▓▒░":"( )"}</b><i/></div><span>0{i+1}</span><h2>{ru?item.ru:item.en}</h2></article>)}</div>
    </section>

    <section className="landing-section" id="art">
      <PageTitle index="04" label={ru?"ЛИЧНАЯ ЛАБОРАТОРИЯ":"PERSONAL LAB"} title={ru?"АРТ / ЭКСПЕРИМЕНТЫ":"ART / EXPERIMENTS"} description={ru?"Свободная визуальная зона: цифровое искусство, исследования формы, шум, пиксели и генеративные эксперименты.":"An open visual lab for digital art, form studies, noise, pixels and generative experiments."}/>
      <div className="art-wall"><div className="ascii">{`      .+######+.
   .##▒▒░░▒▒##.
  ##▒░  ()  ░▒##
  ##▒  /||\\  ▒##
   '## /_||_\\ ##'
      ######
   ARTIFACT_001`}</div><div className="orb"><i/><span>{ru?"ИССЛЕДОВАНИЕ_02":"STUDY_02"}</span></div><div className="glitch-word" data-text="HAZY">HAZY</div><div className="noise-panel"><b>████████</b><span>{ru?"ПОТЕРЯ ДАННЫХ / НАЙДЕНА КРАСОТА":"DATA LOSS / BEAUTY FOUND"}</span></div></div>
    </section>

    <section className="landing-section" id="about">
      <div className="about-hero"><div className="kicker">05—{ru?"ОБО МНЕ / ПРОФИЛЬ":"ABOUT / PROFILE"}</div><h1>{ru?<>ДЕЛАЮ<br/>СЛОЖНОЕ <span>ЯСНЫМ.</span></>:<>MAKING<br/>COMPLEXITY <span>CLEAR.</span></>}</h1><p>{ru?"Я — Даниил Черкашин, продуктовый UX/UI-дизайнер и магистрант МИСИС. Исследую поведение пользователей и проектирую понятные системы для сложных цифровых продуктов.":"I am Daniil Cherkashin, a product UX/UI designer and MISIS master's student. I research user behavior and design clear systems for complex digital products."}</p></div>
      <div className="about-grid">
        <div><span>01 / {ru?"ПРОФИЛЬ":"BIO"}</span><p>{ru?"Работаю с финансовыми и криптопродуктами, насыщенными данными интерфейсами, лендингами и Telegram Web Apps. Соединяю исследование, структуру и сильный визуальный язык.":"I work with financial and crypto products, data-heavy interfaces, landing pages and Telegram Web Apps, combining research, structure and a strong visual language."}</p></div>
        <div><span>02 / {ru?"МЕТОДЫ":"METHODS"}</span><ul><li>{ru?"Исследования пользователей":"User research"}</li><li>{ru?"Интервью и опросы":"Interviews & surveys"}</li><li>CJM / User Flows</li><li>{ru?"Информационная архитектура":"Information architecture"}</li><li>{ru?"Анализ конкурентов":"Competitor analysis"}</li><li>{ru?"Юзабилити-тестирование":"Usability testing"}</li></ul></div>
        <div><span>03 / {ru?"ИНСТРУМЕНТЫ":"TOOLS"}</span><ul><li>Figma / FigJam</li><li>Miro / Notion</li><li>Adobe CC</li><li>Tilda / Zero Block</li><li>HTML / CSS</li><li>Blender</li></ul></div>
      </div>
      <div className="experience"><span>{ru?"ОПЫТ":"EXPERIENCE"}</span><div><b>2025—{ru?"СЕЙЧАС":"NOW"}</b><h2>{ru?"EXNODE / ПРОДУКТОВЫЙ ДИЗАЙНЕР":"EXNODE / PRODUCT DESIGNER"}</h2><p>{ru?"Финансовая платформа / сложные данные / дизайн-система":"Financial platform / complex data / design system"}</p></div><div><b>2023—{ru?"СЕЙЧАС":"NOW"}</b><h2>{ru?"НЕЗАВИСИМЫЙ UX/UI-ДИЗАЙНЕР":"INDEPENDENT UX/UI DESIGNER"}</h2><p>{ru?"Сайты / интерфейсы / веб-приложения Telegram":"Websites / interfaces / Telegram Web Apps"}</p></div></div>
      <div className="experience education"><span>{ru?"ОБРАЗОВАНИЕ":"EDUCATION"}</span><div><b>2024—2026</b><h2>{ru?"МИСИС / МАГИСТРАТУРА":"MISIS / MASTER'S"}</h2><p>{ru?"Цифровой брендинг в креативных индустриях":"Digital Branding in Creative Industries"}</p></div><div><b>2020—2024</b><h2>{ru?"МИСИС / БАКАЛАВРИАТ":"MISIS / BACHELOR'S"}</h2><p>{ru?"Прикладная информатика в дизайне":"Applied Informatics in Design"}</p></div></div>
    </section>

    <Footer ru={ru}/>
  </main>;
}
