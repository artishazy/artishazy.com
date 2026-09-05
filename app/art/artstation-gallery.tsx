import {ArrowIcon} from "../components";

const artStationWorks=[
  {id:"01",title:"the stillness of the swamp",image:"/artstation/stillness-of-the-swamp.jpg",href:"https://www.artstation.com/artwork/OvJLaK"},
  {id:"02",title:"abandoned",image:"/artstation/abandoned.jpg",href:"https://www.artstation.com/artwork/a0RN0R"},
  {id:"03",title:"addiction",image:"/artstation/addiction.jpg",href:"https://www.artstation.com/artwork/kN4El0"},
  {id:"04",title:"a room full of art",image:"/artstation/a-room-full-of-art.jpg",href:"https://www.artstation.com/artwork/qJALQ2"},
  {id:"05",title:"waiting for the bus",image:"/artstation/waiting-for-the-bus.jpg",href:"https://www.artstation.com/artwork/Nq5w5g"},
  {id:"06",title:"at night",image:"/artstation/at-night.jpg",href:"https://www.artstation.com/artwork/YGLXoV"},
  {id:"07",title:"winter roofs",image:"/artstation/winter-roofs.jpg",href:"https://www.artstation.com/artwork/XJeqxY"},
  {id:"08",title:"covid 2019",image:"/artstation/covid-2019.jpg",href:"https://www.artstation.com/artwork/mAZxva"},
  {id:"09",title:"flying",image:"/artstation/flying.jpg",href:"https://www.artstation.com/artwork/AZwA5z"},
  {id:"10",title:"hurrying shadows",image:"/artstation/hurrying-shadows.jpg",href:"https://www.artstation.com/artwork/5WnAOP"},
  {id:"11",title:"loneliness",image:"/artstation/loneliness.jpg",href:"https://www.artstation.com/artwork/a0N2dJ"},
  {id:"12",title:"I do not feel cold",image:"/artstation/i-do-not-feel-cold.jpg",href:"https://www.artstation.com/artwork/qJLqER"},
  {id:"13",title:"Charlize Theron",image:"/artstation/charlize-theron.jpg",href:"https://www.artstation.com/artwork/a0N299"},
  {id:"14",title:"Metro 2033",image:"/artstation/metro-2033.jpg",href:"https://www.artstation.com/artwork/mAZrWE"},
  {id:"15",title:'"closed"',image:"/artstation/closed.jpg",href:"https://www.artstation.com/artwork/bgXGam"},
  {id:"16",title:"Dark Souls",image:"/artstation/dark-souls.jpg",href:"https://www.artstation.com/artwork/dyJZYw"},
];

export function ArtStationGallery({ru=false}:{ru?:boolean}){
  return <section className="artstation-section" aria-labelledby="artstation-heading">
    <header className="artstation-heading">
      <div>
        <span className="kicker">06—ARTSTATION</span>
        <h2 id="artstation-heading">{ru?"ДИДЖИТАЛ-АРТ":"DIGITAL ART"}</h2>
      </div>
      <p>{ru?"Цифровая живопись и атмосферные истории о тишине, памяти и свете":"Digital painting and atmospheric stories about stillness, memory and light"}</p>
    </header>
    <div className="artstation-grid">
      {artStationWorks.map(work=><a className="artstation-card interactive" href={work.href} target="_blank" rel="noreferrer" key={work.href} data-case-card data-cursor-label={ru?"ПЕРЕЙТИ":"OPEN"}>
        <div className="artstation-card-visual case-overlay-visual">
          {/* Static export keeps these local ArtStation assets independent from an image proxy. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={work.image} alt={work.title} loading="lazy" decoding="async"/>
          <div className="case-card-overlay"><h3>{work.title}</h3><p>ARTSTATION · DIGITAL ART</p></div>
        </div>
      </a>)}
    </div>
    <a className="section-link" href="https://www.artstation.com/art_is_hazy" target="_blank" rel="noreferrer"><span>{ru?"ОТКРЫТЬ ПРОФИЛЬ ARTSTATION":"OPEN ARTSTATION PROFILE"}</span><ArrowIcon direction="up-right"/></a>
  </section>;
}
