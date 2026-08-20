import type { Metadata } from "next";
import "./globals.css";
import {Cursor} from "./components";
export const metadata:Metadata={
  metadataBase:new URL("https://artishazy.com"),
  title:{default:"art_is_hazy — Product Designer & Art Director",template:"%s — art_is_hazy"},
  description:"Портфолио Даниила Черкашина: продуктовый UX/UI-дизайн, сайты, графика и цифровое искусство.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",locale:"ru_RU",siteName:"art_is_hazy",title:"art_is_hazy — Product Designer & Art Director",description:"Продуктовый UX/UI-дизайн, сайты, графика и цифровое искусство.",url:"/"},
  icons:{icon:[{url:"/favicon-round.svg",type:"image/svg+xml"}],shortcut:"/favicon-round.svg",other:[{rel:"mask-icon",url:"/safari-pinned-tab.svg",color:"#0b0b0a"}]},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru" data-theme="light"><body><Cursor/>{children}</body></html>}
