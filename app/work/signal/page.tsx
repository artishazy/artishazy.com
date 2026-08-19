import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"EXNODE / FINANCE — art_is_hazy",description:"Product design for a financial monitoring platform."};
export default function Page(){return <CasePage slug="signal"/>}
