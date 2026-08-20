import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"EXNODE / FINANCE",description:"Product design for a financial monitoring platform.",alternates:{canonical:"/work/exnode"}};
export default function Page(){return <CasePage slug="exnode"/>}
