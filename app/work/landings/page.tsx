import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"LANDINGS / SELECTED",description:"Selected commercial websites and interface concepts.",alternates:{canonical:"/work/landings"}};
export default function Page(){return <CasePage slug="landings"/>}
