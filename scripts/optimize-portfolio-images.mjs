import sharp from 'sharp';
import {readdir, mkdir, stat} from 'node:fs/promises';
import path from 'node:path';
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat()}
let original=0,optimized=0;
for(const file of [...await walk('public/graphic/brandbooks'),...await walk('public/artstation')].filter(p=>/\.(png|jpg)$/.test(p))){
 original+=(await stat(file)).size;
 const out=file.replace('public/','public/optimized/').replace(/\.(png|jpg)$/,'');
 await mkdir(path.dirname(out),{recursive:true});
 for(const width of [640,1280,1920]){const dest=`${out}-${width}.webp`;await sharp(file).resize({width}).webp({quality:85,effort:5}).toFile(dest);if(width===1920)optimized+=(await stat(dest)).size;}
}
console.log(JSON.stringify({originalBytes:original,optimized1920Bytes:optimized}));
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#11110f"/><g fill="none" stroke="#33332f"><path d="M60 110H1140M60 520H1140"/></g><g fill="#f4f4f0" font-family="sans-serif"><text x="60" y="75" font-size="24">ART_IS_HAZY®</text><text x="60" y="275" font-size="100">DANIIL</text><text x="60" y="390" font-size="100">CHERKASHIN</text><text x="60" y="485" font-size="28">PRODUCT DESIGN / GRAPHIC DESIGN / ART</text><text x="60" y="575" font-size="24">artishazy.com</text></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/social-preview.png');
