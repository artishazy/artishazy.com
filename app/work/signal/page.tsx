import type {Metadata} from "next";
import {CasePage,caseDetails} from "../case-page";
const project=caseDetails.signal;
export const dynamic="force-static";
export const metadata:Metadata={title:`${project.title} — art_is_hazy`,description:project.subtitle};
export default function Page(){return <CasePage slug="signal"/>}
