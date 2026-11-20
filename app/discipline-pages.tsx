"use client";
import Image from "next/image";
import {FilteredProjectGrid,LocalizedShell} from "./components";
import GraphicGallery from "./graphic/GraphicGallery";
import {artStationWorks} from "./art/data";
import "./disciplines.css";

type Kind="product"|"graphic"|"art";
const content={
 product:{label:["UX/UI · ПРОДУКТОВЫЙ ДИЗАЙН","UX/UI · PRODUCT DESIGN"],title:["СЛОЖНОЕ —","COMPLEXITY,"],second:["ПОНЯТНО.","MADE CLEAR."],intro:["Проектирую веб- и мобильные продукты. Превращаю задачи, сценарии и данные в интерфейсы, которыми удобно пользоваться.","I design web and mobile products, turning tasks, flows and data into interfaces that feel clear and intuitive."],tags:[["Веб и мобильные продукты","Web & mobile"],["Пользовательские сценарии","User flows"],["Дизайн-системы","Design systems"]]},
 graphic:{label:["ГРАФИЧЕСКИЙ ДИЗАЙН","GRAPHIC DESIGN"],title:["ХАРАКТЕР","CHARACTER"],second:["В ФОРМЕ.","TAKES FORM."],intro:["Создаю айдентику и графику: от первого визуального образа до системы, которая работает на разных носителях.","I create visual identities and graphics, from the first visual idea to a system that works across formats."],tags:[["Айдентика","Visual identity"],["Типографика","Typography"],["Печатные и цифровые носители","Print & digital"]]},
 art:{label:["ТВОРЧЕСТВО · ЛИЧНЫЕ РАБОТЫ","ART · PERSONAL WORK"],title:["МЕЖДУ","BETWEEN"],second:["СВЕТОМ И ТИШИНОЙ.","LIGHT & STILLNESS."],intro:["Цифровая живопись, наблюдения и визуальные эксперименты. Здесь я исследую настроение, пространство и свет.","Digital paintings, observations and visual experiments. Here I explore atmosphere, space and light."],tags:[["Цифровая живопись","Digital painting"],["Атмосфера","Atmosphere"],["Эксперименты","Experiments"]]}
};
export default function DisciplinePage({kind}:{kind:Kind}){return <LocalizedShell>{ru=>{
 const lang=ru?0:1,c=content[kind];
 return <div className={`discipline discipline-${kind}`}>
  <header className="discipline-intro">
   <p className="discipline-eyebrow">{ru?"ДАНИИЛ ЧЕРКАШИН":"DANIIL CHERKASHIN"}<span>{c.label[lang]}</span></p>
   <h1>{c.title[lang]}<span>{c.second[lang]}</span></h1>
   <div className="discipline-intro-bottom"><p>{c.intro[lang]}</p><a className="discipline-jump" href="#selected">{ru?"СМОТРЕТЬ РАБОТЫ":"EXPLORE WORK"}<span>↓</span></a></div>
  </header>
  {kind==="product"&&<a className="discipline-feature product-feature" href="/work/rankings">
   <div className="discipline-feature-top"><span>FINANCIAL MONITORING</span><span>{ru?"ФИНАНСОВЫЙ МОНИТОРИНГ / UX/UI":"FINANCIAL MONITORING / UX/UI"}</span></div>
   <Image src="/work/rankings/rankings-cover.svg" alt={ru?"Интерфейс рейтингов":"Rankings interface"} width={960} height={600} priority unoptimized/>
   <div className="discipline-feature-caption"><h2>{ru?"Данные становятся системой":"Data becomes a system"}</h2><span>{ru?"ОТКРЫТЬ КЕЙС":"VIEW CASE"}</span></div>
  </a>}
  {kind==="graphic"&&<div className="graphic-showcase">
   {[{slug:"wave-identity",image:"wave",name:"ВОЛНА / VOLNA"},{slug:"rysya-zoo",image:"rysya",name:"РЫСЯ / RYSYA"}].map(w=><a href={`/graphic/${w.slug}`} key={w.slug}><div className="graphic-showcase-image"><Image src={`/graphic/brandbooks/${w.image}/page-01.png`} alt={w.name} width={1920} height={1080} priority unoptimized/></div><span>{w.name}<small>{ru?"АЙДЕНТИКА / ОТКРЫТЬ ПРОЕКТ":"IDENTITY / VIEW PROJECT"}</small></span></a>)}
  </div>}
  {kind==="art"&&<a className="art-feature" href={artStationWorks[6].href} target="_blank" rel="noreferrer"><Image src={artStationWorks[6].image} alt="winter roofs" width={1920} height={1193} priority unoptimized/><span>WINTER ROOFS<small>{ru?"ЦИФРОВАЯ ЖИВОПИСЬ · ARTSTATION":"DIGITAL PAINTING · ARTSTATION"}</small></span></a>}
  <div className="discipline-capabilities">{c.tags.map(t=><span key={t[1]}>{t[lang]}</span>)}</div>
  {kind==="product"&&<section className="discipline-method"><p className="discipline-eyebrow">{ru?"КАК Я РАБОТАЮ":"MY APPROACH"}</p><h2>{ru?"От задачи к целостному продукту.":"From a task to a coherent product."}</h2><div>{(ru?[["Разобраться","Контекст, аудитория и задача. Сначала — понять, что нужно человеку и продукту."],["Выстроить","Структура, пользовательские сценарии и прототип. Проверить логику до деталей."],["Собрать","Адаптивный интерфейс, состояния и компоненты. Связать экраны в систему."]]:[["Understand","Context, audience and goals. Understand what people and the product need."],["Structure","Architecture, user flows and prototypes. Work through the logic before the details."],["Design","Responsive interfaces, states and components. Connect individual screens into a system."]]).map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>}
  <section id="selected" className="discipline-selected"><div className="discipline-section-title"><h2>{ru?(kind==="art"?"ГАЛЕРЕЯ":"ПРОЕКТЫ"):kind==="art"?"GALLERY":"PROJECTS"}</h2><span>{c.label[lang]}</span></div>
   {kind==="product"?<FilteredProjectGrid ru={ru}/>:kind==="graphic"?<GraphicGallery ru={ru} standalone/>:<div className="discipline-art-grid">{artStationWorks.map(w=><a href={w.href} target="_blank" rel="noreferrer" key={w.title}><Image src={w.image} alt={w.title} width={w.width} height={w.height} loading="lazy" unoptimized/><h3>{w.title}</h3></a>)}</div>}
  </section>
  <section className="discipline-contact"><p>{ru?"ЕСТЬ ЗАДАЧА ИЛИ ИДЕЯ?":"HAVE A PROJECT IN MIND?"}</p><h2>{ru?(kind==="art"?"Давайте поговорим об искусстве.":"Давайте создадим что-то вместе."):"Let’s create something together."}</h2><a href="mailto:artishazy14@gmail.com">{ru?"ОБСУДИТЬ ПРОЕКТ":"GET IN TOUCH"}</a></section>
 </div>;
 }}</LocalizedShell>}
