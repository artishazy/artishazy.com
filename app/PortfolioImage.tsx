/* Static responsive assets keep GitHub Pages independent of an image server. */
export function optimizedImage(src:string,width=1920){return `/optimized${src.replace(/\.(png|jpg)$/,"")}-${width}.webp`}
export default function PortfolioImage({src,alt,width=1920,height=1080,priority=false,sizes="(max-width: 700px) 100vw, 50vw"}:{src:string;alt:string;width?:number;height?:number;priority?:boolean;sizes?:string}){
  return <picture><source type="image/webp" srcSet={[640,1280,1920].map(size=>`${optimizedImage(src,size)} ${size}w`).join(", ")} sizes={sizes}/><img src={src} alt={alt} width={width} height={height} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":"auto"} decoding="async"/></picture>;
}
