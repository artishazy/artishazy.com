import {pageMetadata} from "../../seo";
export const metadata=pageMetadata("/work/colorist","An accessible color tool for creators and colorblind users.");
import {CasePage} from "../case-page";
export const dynamic="force-static";
export default function Page(){return <CasePage slug="colorist"/>}
