"use client";

import {LocalizedShell,SocialLinks} from "../components";

type AboutItem={
  period?:string;
  periodRu?:string;
  periodEn?:string;
  title?:string;
  titleRu?:string;
  titleEn?:string;
  descriptionRu:string;
  descriptionEn:string;
};

const experience:AboutItem[]=[
  {
    periodRu:"МАРТ 2026 — СЕЙЧАС",
    periodEn:"MAR 2026 — NOW",
    title:"EXNODE / UX/UI DESIGNER",
    descriptionRu:"Адаптивные веб-интерфейсы, прототипы и дизайн-концепции, исследование конкурентов, развитие дизайн-системы, продуктовые презентации и маркетинговые материалы.",
    descriptionEn:"Responsive web interfaces, prototypes and design concepts, competitor research, design-system development, product presentations and marketing assets.",
  },
  {
    periodRu:"АВГУСТ 2023 — СЕЙЧАС",
    periodEn:"AUG 2023 — NOW",
    titleRu:"НЕЗАВИСИМЫЙ UX/UI-ДИЗАЙНЕР",
    titleEn:"INDEPENDENT UX/UI DESIGNER",
    descriptionRu:"Веб- и мобильные интерфейсы, CJM и user flows, адаптивные макеты, компоненты и токены, сборка на Tilda / Zero Block, фирменный стиль и айдентика.",
    descriptionEn:"Web and mobile interfaces, CJMs and user flows, responsive layouts, components and tokens, Tilda / Zero Block builds, visual identity and branding.",
  },
  {
    periodRu:"ИЮНЬ — ИЮЛЬ 2025",
    periodEn:"JUN — JUL 2025",
    title:"VK EDUCATION PRACTICE",
    descriptionRu:"Исследование цифрового поведения молодёжи, анализ рынка и аудитории, TAM / SAM / SOM, продуктовая концепция VK Блик, модель монетизации и каналы продвижения.",
    descriptionEn:"Youth digital-behavior research, market and audience analysis, TAM / SAM / SOM, the VK Blik product concept, monetization model and acquisition channels.",
  },
  {
    periodRu:"МАЙ 2024",
    periodEn:"MAY 2024",
    titleRu:"БИЗНЕС ФОРУМ / СТАЖЁР-ДИЗАЙНЕР",
    titleEn:"BUSINESS FORUM / DESIGN INTERN",
    descriptionRu:"Веб-баннеры для коммуникаций компании «Самолёт» и редизайн логотипа Foodtech.",
    descriptionEn:"Web banners for Samolet communications and a Foodtech logo redesign.",
  },
  {
    periodRu:"ИЮЛЬ — АВГУСТ 2023",
    periodEn:"JUL — AUG 2023",
    title:"SOVA CREATIVE STUDIO",
    descriptionRu:"Личный кабинет студентов онлайн-школы: пользовательские сценарии, структура, прототипы и UI-макеты; также календари и обложки для социальных сетей.",
    descriptionEn:"An online-school student dashboard: user flows, structure, wireframes and UI layouts, plus calendars and social-media covers.",
  },
];

const education:AboutItem[]=[
  {
    period:"2024 — 2026",
    titleRu:"НИТУ МИСИС / МАГИСТР",
    titleEn:"NUST MISIS / MASTER'S DEGREE",
    descriptionRu:"Цифровой брендинг в креативных индустриях",
    descriptionEn:"Digital Branding in Creative Industries",
  },
  {
    period:"2020 — 2024",
    titleRu:"НИТУ МИСИС / БАКАЛАВР",
    titleEn:"NUST MISIS / BACHELOR'S DEGREE",
    descriptionRu:"Прикладная информатика в дизайне",
    descriptionEn:"Applied Informatics in Design",
  },
  {
    period:"2020",
    titleRu:"ХУДОЖЕСТВЕННАЯ ШКОЛА №1 / ХУДОЖНИК",
    titleEn:"ART SCHOOL NO. 1 / ARTIST",
    descriptionRu:"Живопись, рисунок, композиция, история искусств и пленэр",
    descriptionEn:"Painting, drawing, composition, art history and plein-air practice",
  },
];

export default function About(){return <LocalizedShell>{ru=><>
  <section className="about-intro">
    <div className="kicker">02—{ru?"ОБО МНЕ":"ABOUT"}</div>
    <div className="about-intro-grid">
      <h1>{ru?<>ДАНИИЛ<br/>ЧЕРКАШИН</>:<>DANIIL<br/>CHERKASHIN</>}</h1>
      <div className="about-intro-copy">
        <strong>{ru?"ПРОДУКТОВЫЙ UX/UI-ДИЗАЙНЕР":"PRODUCT UX/UI DESIGNER"}</strong>
        <p>{ru?"Проектирую веб- и мобильные продукты: исследую контекст и аудиторию, выстраиваю пользовательские сценарии, создаю прототипы, адаптивный UI и дизайн-системы. Бэкграунд в графическом дизайне и прикладной информатике помогает мне соединять продуктовую логику с цельным визуальным языком.":"I design web and mobile products: researching context and audiences, shaping user flows, and creating prototypes, responsive UI and design systems. My background in graphic design and applied informatics helps me connect product logic with a coherent visual language."}</p>
        <div className="about-facts"><span>{ru?"МОСКВА":"MOSCOW"}</span><span>{ru?"3+ ГОДА В ДИЗАЙНЕ":"3+ YEARS IN DESIGN"}</span><span>WEB / MOBILE / SYSTEMS</span></div>
      </div>
    </div>
  </section>

  <section className="about-grid">
    <div><span>01 / {ru?"ПОДХОД":"APPROACH"}</span><p>{ru?"Смотрю на интерфейс как на систему: от задачи бизнеса и потребностей человека до структуры, состояний компонентов и финальной визуальной подачи.":"I treat an interface as a system, connecting business goals and user needs with structure, component states and final visual expression."}</p><SocialLinks ru={ru} className="about-social-links"/></div>
    <div><span>02 / {ru?"UX-ПРОЦЕСС":"UX PROCESS"}</span><ul><li>{ru?"Исследования и интервью":"Research and interviews"}</li><li>{ru?"Анализ рынка и аудитории":"Market and audience analysis"}</li><li>CJM / User Flows / Site Maps</li><li>{ru?"Информационная архитектура":"Information architecture"}</li><li>{ru?"Прототипы и тестирование":"Prototyping and testing"}</li></ul></div>
    <div><span>03 / {ru?"UI И СИСТЕМЫ":"UI & SYSTEMS"}</span><ul><li>{ru?"Веб- и мобильные интерфейсы":"Web and mobile interfaces"}</li><li>Desktop / Tablet / Mobile</li><li>{ru?"Компоненты, токены, гайдлайны":"Components, tokens, guidelines"}</li><li>UI Kits / Figma / FigJam</li><li>Tilda / Zero Block</li></ul></div>
    <div><span>04 / {ru?"ВИЗУАЛЬНЫЙ ДИЗАЙН":"VISUAL DESIGN"}</span><ul><li>{ru?"Айдентика и логотипы":"Identity and logos"}</li><li>{ru?"Брендбуки и дизайн-концепции":"Brand books and design concepts"}</li><li>Illustrator / Photoshop</li><li>After Effects / InDesign</li><li>Miro / Notion / Blender</li></ul></div>
  </section>

  <section className="experience"><span>{ru?"ОПЫТ":"EXPERIENCE"}</span>{experience.map((item,index)=><div key={index}><b>{ru?item.periodRu:item.periodEn}</b><h2>{ru?(item.titleRu??item.title):(item.titleEn??item.title)}</h2><p>{ru?item.descriptionRu:item.descriptionEn}</p></div>)}</section>
  <section className="experience education"><span>{ru?"ОБРАЗОВАНИЕ":"EDUCATION"}</span>{education.map(item=><div key={item.period}><b>{item.period}</b><h2>{ru?item.titleRu:item.titleEn}</h2><p>{ru?item.descriptionRu:item.descriptionEn}</p></div>)}</section>
</>}</LocalizedShell>}
