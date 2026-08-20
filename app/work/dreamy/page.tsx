import type {Metadata} from "next";
import {CasePage} from "../case-page";
export const dynamic="force-static";
export const metadata:Metadata={title:"DREAMY / SLEEP APP",description:"UX/UI design for a sleep quality mobile application.",alternates:{canonical:"/work/dreamy"}};
export default function Page(){return <CasePage slug="dreamy"/>}
