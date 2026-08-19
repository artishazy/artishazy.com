import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"LANDINGS / SELECTED — art_is_hazy",description:"Selected commercial websites and interface concepts."};
export default function Page(){return <CasePage slug="mono"/>}
