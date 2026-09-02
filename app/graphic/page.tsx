"use client";
import {LocalizedShell,PageTitle} from "../components";
import GraphicGallery from "./GraphicGallery";
export default function Graphic(){return <LocalizedShell>{ru=><><PageTitle index="04" label={ru?"ГРАФИЧЕСКИЙ ДИЗАЙН":"GRAPHIC DESIGN"} title={ru?"ГРАФИКА":"GRAPHIC"} description={ru?"Айдентика, постеры, типографика, цифровые и печатные работы. Выберите направление или откройте всю подборку.":"Identity, posters, typography, digital and printed work. Choose a direction or browse the full selection."}/><GraphicGallery ru={ru} standalone/></>}</LocalizedShell>}
