import type { Metadata } from "next";
import "./globals.css";
import {Cursor} from "./components";
export const metadata:Metadata={
  metadataBase:new URL("https://artishazy.com"),
  title:{default:"art_is_hazy — Product Designer & Art Director",template:"%s — art_is_hazy"},
  description:"Портфолио Даниила Черкашина: продуктовый UX/UI-дизайн, сайты, графика и цифровое искусство.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",locale:"ru_RU",siteName:"art_is_hazy",title:"art_is_hazy — Product Designer & Art Director",description:"Продуктовый UX/UI-дизайн, сайты, графика и цифровое искусство.",url:"/"},
  manifest:"/site.webmanifest",
  icons:{
    icon:[
      {url:"/favicon-2026.svg",type:"image/svg+xml",sizes:"any"},
      {url:"/favicon-32.png",type:"image/png",sizes:"32x32"},
      {url:"/favicon-16.png",type:"image/png",sizes:"16x16"},
    ],
    shortcut:"/favicon-32.png",
    apple:[{url:"/apple-touch-icon.png",type:"image/png",sizes:"180x180"}],
    other:[{rel:"mask-icon",url:"/safari-pinned-tab.svg",color:"#0b0b0a"}],
  },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru" data-theme="light"><body><Cursor/>{children}</body></html>}
