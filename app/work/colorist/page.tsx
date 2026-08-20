import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"COLORIST / ACCESSIBILITY",description:"An accessible color tool for creators and colorblind users.",alternates:{canonical:"/work/colorist"}};
export default function Page(){return <CasePage slug="colorist"/>}
