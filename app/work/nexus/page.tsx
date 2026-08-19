import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"COLORIST / ACCESSIBILITY — art_is_hazy",description:"An accessible color tool for creators and colorblind users."};
export default function Page(){return <CasePage slug="nexus"/>}
