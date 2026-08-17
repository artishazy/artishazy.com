import {PageTitle,Shell} from "../components";
const items=["IDENTITY / VOID","POSTERS / SIGNAL","TYPE STUDIES","SOCIAL / RAW","LOGOS / 2026","PRINT / OBJECTS"];
export default function Graphic(){return <Shell><PageTitle index="02" label="GRAPHIC DESIGN" title="GRAPHIC / ARCHIVE" description="Айдентика, логотипы, постеры, печатные материалы и визуальные системы."/><section className="masonry">{items.map((x,i)=><article className={`graphic-tile t${i}`} key={x}><div><b>{i%3===0?"A—Z":i%3===1?"▓▒░":"( )"}</b><i/></div><span>0{i+1}</span><h2>{x}</h2></article>)}</section></Shell>}
