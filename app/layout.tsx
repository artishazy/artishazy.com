import type { Metadata } from "next";
import { Geist,Geist_Mono } from "next/font/google";
import "./globals.css";
import {Cursor} from "./components";
const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata:Metadata={title:"art_is_hazy — Designer & Art Director",description:"Portfolio of art_is_hazy — UX/UI, identity and digital art."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru" data-theme="dark"><body className={`${sans.variable} ${mono.variable}`}><Cursor/>{children}</body></html>}
