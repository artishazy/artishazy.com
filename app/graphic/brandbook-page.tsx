"use client";
import Image from "next/image";
import {ArrowIcon,LocalizedShell,PortfolioLiquidLink} from "../components";
import {brandbooks,findBrandbook} from "./brandbook-data";

const pageNumber=(src:string)=>src.match(/page-(\d+)/)?.[1]??"";

export default function BrandbookPage({slug}:{slug:string}){
  const project=findBrandbook(slug)!;
  const index=brandbooks.findIndex(item=>item.slug===slug);
  const previous=brandbooks[(index-1+brandbooks.length)%brandbooks.length];
  const next=brandbooks[(index+1)%brandbooks.length];

  return <LocalizedShell>{ru=><>
    <section className="brandbook-hero">
      <a className="case-back graphic-back-fixed" href="/graphic"><ArrowIcon direction="left"/>{ru?"ВСЯ ГРАФИКА":"ALL GRAPHIC WORK"}</a>
      <div className="kicker">04—{ru?"АЙДЕНТИКА":"IDENTITY"} / {project.id}</div>
      <h1>{ru?project.titleRu:project.titleEn}</h1>
      <div className="brandbook-hero-bottom">
        <p>{ru?project.summaryRu:project.summaryEn}</p>
        <dl>
          <div><dt>{ru?"СТАТУС":"STATUS"}</dt><dd>{ru?project.statusRu:project.statusEn}</dd></div>
          <div><dt>{ru?"РОЛЬ":"ROLE"}</dt><dd>{ru?project.roleRu:project.roleEn}</dd></div>
          <div><dt>{ru?"ГОД":"YEAR"}</dt><dd>{project.year}</dd></div>
        </dl>
      </div>
    </section>

    <figure className="brandbook-cover">
      <Image src={project.cover} alt={ru?`Обложка брендбука ${project.name}`:`${project.name} brand book cover`} width={1920} height={1080} priority unoptimized/>
    </figure>

    <section className="brandbook-story">
      <div className="kicker">01—{ru?"ИСТОРИЯ ПРОЕКТА":"PROJECT STORY"}</div>
      <h2>{ru?project.storyTitleRu:project.storyTitleEn}</h2>
      <div className="brandbook-story-grid">
        <article><span>01</span><h3>{ru?"КОНТЕКСТ":"CONTEXT"}</h3><p>{ru?project.contextRu:project.contextEn}</p></article>
        <article><span>02</span><h3>{ru?"ИДЕЯ":"IDEA"}</h3><p>{ru?project.ideaRu:project.ideaEn}</p></article>
        <article><span>03</span><h3>{ru?"РЕЗУЛЬТАТ":"OUTCOME"}</h3><p>{ru?project.resultRu:project.resultEn}</p></article>
      </div>
    </section>

    {project.before&&<section className="brandbook-before">
      <div className="brandbook-section-head"><div><span className="kicker">02—{ru?"ДО / ПОСЛЕ":"BEFORE / AFTER"}</span><h2>{ru?"ИСХОДНЫЙ БРЕНДБУК":"THE ORIGINAL GUIDE"}</h2></div><p>{ru?project.beforeRu:project.beforeEn}</p></div>
      <div className="brandbook-before-grid">{project.before.map((src,itemIndex)=><figure key={src}><Image src={src} alt={ru?`Исходный брендбук Шротт, страница ${pageNumber(src)}`:`Original Schrott guide, page ${pageNumber(src)}`} width={1403} height={992} loading="lazy" unoptimized/><figcaption>{ru?"ДО":"BEFORE"} / {String(itemIndex+1).padStart(2,"0")}</figcaption></figure>)}</div>
    </section>}

    <section className="brandbook-pages-section">
      <div className="brandbook-section-head"><div><span className="kicker">{project.before?"03":"02"}—{ru?"СИСТЕМА":"SYSTEM"}</span><h2>{ru?"ВЫБРАННЫЕ СТРАНИЦЫ":"SELECTED PAGES"}</h2></div><a className="brandbook-pdf-link" href={project.pdf} target="_blank" rel="noreferrer">{ru?"ОТКРЫТЬ ВЕСЬ PDF":"OPEN FULL PDF"}<ArrowIcon direction="up-right"/></a></div>
      <div className="brandbook-pages">{project.pages.slice(1).map(src=><figure key={src}><Image src={src} alt={ru?`${project.name}, страница брендбука ${pageNumber(src)}`:`${project.name} brand book page ${pageNumber(src)}`} width={1920} height={1080} loading="lazy" unoptimized/><figcaption>{ru?"СТРАНИЦА":"PAGE"} {pageNumber(src)}</figcaption></figure>)}</div>
    </section>

    <nav className="brandbook-project-switcher" aria-label={ru?"Другие брендбуки":"Other brand books"}>
      <div className="brandbook-project-switcher-secondary">
        <a href={`/graphic/${previous.slug}`}><ArrowIcon direction="left"/><span>{ru?"ПРЕДЫДУЩИЙ":"PREVIOUS"}</span><strong>{previous.name}</strong></a>
        <a href="/graphic"><span>{ru?"ВСЕ ПРОЕКТЫ":"ALL PROJECTS"}</span><ArrowIcon direction="up-right"/></a>
      </div>
      <PortfolioLiquidLink className="brandbook-next-liquid" href={`/graphic/${next.slug}`} label={`${ru?"СЛЕДУЮЩИЙ ПРОЕКТ":"NEXT PROJECT"} — ${next.name}`} variant="solid" direction="right" full/>
    </nav>
  </>}</LocalizedShell>;
}
