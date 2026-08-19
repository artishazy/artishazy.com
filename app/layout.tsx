import type { Metadata } from "next";
import { Manrope,Geist_Mono } from "next/font/google";
import "./globals.css";
import {Cursor} from "./components";
const sans=Manrope({variable:"--font-sans",subsets:["latin","cyrillic"],weight:["300","400","500"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata:Metadata={title:"art_is_hazy — Designer & Art Director",description:"Portfolio of art_is_hazy — UX/UI, identity and digital art."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru" data-theme="light"><head><link rel="icon" href="/favicon-round.svg" type="image/svg+xml"/><link rel="shortcut icon" href="/favicon-round.svg" type="image/svg+xml"/><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0b0b0a"/></head><body className={`${sans.variable} ${mono.variable}`}><Cursor/>{children}</body></html>}
