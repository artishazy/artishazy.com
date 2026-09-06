import type {Metadata} from "next";
import {localizedTitles} from "./seo-titles";
export function pageMetadata(path:string,description:string,image="/social-preview.png"):Metadata{
 const title=localizedTitles[path]?.[0]??"art_is_hazy";
 return {title:{absolute:title},description,alternates:{canonical:path},openGraph:{type:"website",siteName:"art_is_hazy",locale:"ru_RU",title,description,url:path,images:[image]},twitter:{card:"summary_large_image",title,description,images:[image]}};
}
