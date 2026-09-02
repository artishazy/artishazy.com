import type {Metadata} from "next";
import BrandbookPage from "../brandbook-page";
export const metadata:Metadata={title:"Рыся — айдентика зоопарка",description:"Концептуальная айдентика зоопарка Сибири: иллюстрации, пиктограммы, паттерн и маскот.",alternates:{canonical:"/graphic/rysya-zoo"},openGraph:{images:["/graphic/brandbooks/rysya/page-01.png"]}};
export default function Page(){return <BrandbookPage slug="rysya-zoo"/>}
