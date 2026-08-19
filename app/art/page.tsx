"use client";
import {LocalizedShell,PageTitle} from "../components";
export default function Art(){return <LocalizedShell>{ru=><><PageTitle index="04" label={ru?"ЛИЧНАЯ ЛАБОРАТОРИЯ":"PERSONAL LAB"} title={ru?"АРТ / ЭКСПЕРИМЕНТЫ":"ART / EXPERIMENTS"} description={ru?"Цифровое искусство, исследования формы, шум, пиксели и генеративные эксперименты.":"Digital art, form studies, noise, pixels and generative experiments."}/><section className="art-wall"><div className="ascii">{`      .+######+.
   .##▒▒░░▒▒##.
  ##▒░  ()  ░▒##
  ##▒  /||\\  ▒##
   '## /_||_\\ ##'
      ######
   ARTIFACT_001`}</div><div className="orb"><i/><span>{ru?"ИССЛЕДОВАНИЕ_02":"STUDY_02"}</span></div><div className="glitch-word" data-text="HAZY">HAZY</div><div className="noise-panel"><b>████████</b><span>{ru?"ПОТЕРЯ ДАННЫХ / НАЙДЕНА КРАСОТА":"DATA LOSS / BEAUTY FOUND"}</span></div></section></>}</LocalizedShell>}
