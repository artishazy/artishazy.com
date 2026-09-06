import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import {Cursor} from "./components";
import SmoothScroll from "./SmoothScroll";
export const metadata:Metadata={
  metadataBase:new URL("https://artishazy.com"),
  applicationName:"art_is_hazy",
  title:{default:"Даниил Черкашин — продуктовый UX/UI-дизайнер и художник",template:"%s — art_is_hazy"},
  description:"Портфолио: цифровые продукты, сайты, графика и цифровое искусство.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",locale:"ru_RU",siteName:"art_is_hazy",title:"Даниил Черкашин — продуктовый UX/UI-дизайнер и художник",description:"Портфолио: цифровые продукты, сайты, графика и цифровое искусство.",url:"/",images:["/social-preview.png"]},
  twitter:{card:"summary_large_image",images:["/social-preview.png"],title:"Даниил Черкашин — продуктовый UX/UI-дизайнер и художник",description:"Портфолио: цифровые продукты, сайты, графика и цифровое искусство."},
  appleWebApp:{capable:true,title:"art_is_hazy",statusBarStyle:"default"},
  manifest:"/site.webmanifest",
  icons:{
    icon:[
      {url:"/favicon-2026.svg",type:"image/svg+xml",sizes:"any"},
      {url:"/favicon-32.png",type:"image/png",sizes:"32x32"},
      {url:"/favicon-16.png",type:"image/png",sizes:"16x16"},
    ],
    shortcut:"/favicon-32.png",
    apple:[{url:"/apple-touch-icon-v2.png",type:"image/png",sizes:"180x180"}],
    other:[{rel:"mask-icon",url:"/safari-pinned-tab.svg",color:"#0b0b0a"}],
  },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{var r=document.documentElement;r.dataset.theme=localStorage.getItem("aih-theme")==="dark"?"dark":"light";if(localStorage.getItem("aih-language")==="en"){r.dataset.languagePending="true";setTimeout(function(){delete r.dataset.languagePending},1500)}}catch(e){}`}}/></head><body><SmoothScroll/><Cursor/>{children}</body></html>}
