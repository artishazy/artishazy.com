import type {Metadata} from "next";
import "./v2.css";

export const metadata:Metadata={
  title:"art_is_hazy — Experimental portfolio",
  description:"Alternative animated portfolio direction for art_is_hazy.",
  robots:{index:false,follow:false},
};

export default function V2Layout({children}:{children:React.ReactNode}){
  return children;
}
