import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"DREAMY / SLEEP APP — art_is_hazy",description:"UX/UI design for a sleep quality mobile application."};
export default function Page(){return <CasePage slug="archive"/>}
