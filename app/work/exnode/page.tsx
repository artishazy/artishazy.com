import {pageMetadata} from "../../seo";
export const metadata=pageMetadata("/work/exnode","A design system for financial service rankings.");
import {CasePage} from "../case-page";
export const dynamic="force-static";
export default function Page(){return <CasePage slug="exnode"/>}
