import {pageMetadata} from "../../seo";
export const metadata=pageMetadata("/work/rankings","A design system for financial service rankings.");
import {CasePage} from "../case-page";
export const dynamic="force-static";
export default function Page(){return <CasePage slug="rankings"/>}
