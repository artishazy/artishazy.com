import type {Metadata} from "next";
import BrandbookPage from "../brandbook-page";
export const metadata:Metadata={title:"Волна — брендбук",description:"Айдентика консорциума морской и речной инфраструктуры: знак, паттерн и система носителей.",alternates:{canonical:"/graphic/wave-identity"},openGraph:{images:["/graphic/brandbooks/wave/page-01.png"]}};
export default function Page(){return <BrandbookPage slug="wave-identity"/>}
