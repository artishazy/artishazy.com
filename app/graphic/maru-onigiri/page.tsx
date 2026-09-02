import type {Metadata} from "next";
import BrandbookPage from "../brandbook-page";
export const metadata:Metadata={title:"Maru — упаковка онигири",description:"Концептуальная айдентика и упаковочная система для онигири, вдохновлённая японским графическим дизайном.",alternates:{canonical:"/graphic/maru-onigiri"},openGraph:{images:["/graphic/brandbooks/maru/page-01.png"]}};
export default function Page(){return <BrandbookPage slug="maru-onigiri"/>}
