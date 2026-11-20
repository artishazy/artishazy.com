import {pageMetadata} from "../../seo";
export const metadata=pageMetadata("/work/rankings-builder","An internal admin panel for managing content, rankings and settings.");
import {CasePage} from "../case-page";
export const dynamic="force-static";
export default function Page(){return <CasePage slug="rankings-builder"/>}
