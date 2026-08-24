import {ArrowIcon,Footer,Header} from "./components";
import Link from "next/link";

export default function NotFound(){return <main id="top"><Header/><section className="not-found"><span>404 / NOT FOUND</span><h1>СТРАНИЦА<br/>РАСТВОРИЛАСЬ<br/>В ТУМАНЕ</h1><Link href="/">ВЕРНУТЬСЯ НА ГЛАВНУЮ <ArrowIcon direction="up-right"/></Link></section><Footer ru/></main>}
