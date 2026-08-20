import type {Metadata} from "next";
import {LegacyRedirect} from "../legacy-redirect";
export const metadata:Metadata={robots:{index:false,follow:false},alternates:{canonical:"/work/landings"}};
export default function Page(){return <LegacyRedirect to="/work/landings"/>}
