"use client";
import {ArtCarousel,LocalizedShell,PageTitle} from "../components";
import {ArtStationGallery} from "./artstation-gallery";
export default function Art(){return <LocalizedShell>{ru=><><PageTitle index="05" label={ru?"ЛИЧНАЯ ЛАБОРАТОРИЯ":"PERSONAL LAB"} title={ru?"АРТ / ЛАБОРАТОРИЯ":"ART / LAB"} description={ru?"Личная визуальная лаборатория: 3D, ASCII, цифровая графика, исследования формы, света и фактуры.":"A personal visual laboratory for 3D, ASCII, digital graphics and studies of form, light and texture."}/><ArtCarousel ru={ru}/><ArtStationGallery ru={ru}/></>}</LocalizedShell>}
