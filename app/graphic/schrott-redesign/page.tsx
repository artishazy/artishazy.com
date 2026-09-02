import type {Metadata} from "next";
import BrandbookPage from "../brandbook-page";
export const metadata:Metadata={title:"Шротт — редизайн брендбука",description:"Редизайн существующего брендбука промышленной компании с честным сравнением до и после.",alternates:{canonical:"/graphic/schrott-redesign"},openGraph:{images:["/graphic/brandbooks/schrott/page-01.png"]}};
export default function Page(){return <BrandbookPage slug="schrott-redesign"/>}
