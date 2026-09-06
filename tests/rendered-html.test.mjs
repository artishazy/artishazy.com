import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import test from 'node:test';
const root=new URL('../dist/client/',import.meta.url);
const site='https://artishazy.com';
const sitemap=await readFile(new URL('sitemap.xml',root),'utf8');
const routes=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
const htmlFor=route=>readFile(new URL(route==='/'?'index.html':`${route.slice(1)}.html`,root),'utf8');
function tags(html,tag){return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`,'g'))].map(match=>Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr=>[attr[1],attr[2]])))}
test('published routes have a unique heading, canonical URL and share image',async()=>{
 for(const route of routes){
  const html=await htmlFor(route);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,route);
  const canonical=tags(html,'link').find(tag=>tag.rel==='canonical')?.href;
  assert.equal(new URL(canonical).pathname,route,`canonical: ${route}`);
  const og=tags(html,'meta').find(tag=>tag.property==='og:image')?.content;
  assert.ok(og,`share image: ${route}`);
  await access(new URL(new URL(og).pathname.slice(1),root));
 }
});
test('internal links, PDF downloads and responsive image files exist in the export',async()=>{
 const checked=new Set();
 for(const route of routes){
  const html=await htmlFor(route);
  const refs=[...tags(html,'a').map(tag=>tag.href),...tags(html,'img').map(tag=>tag.src),...tags(html,'source').flatMap(tag=>(tag.srcSet??tag.srcset??'').split(',').map(value=>value.trim().split(' ')[0]))].filter(Boolean);
  for(const ref of refs){
   const url=new URL(ref,site+route);
   if(url.origin!==site||checked.has(url.pathname))continue;
   checked.add(url.pathname);
   const path=url.pathname==='/'?'index.html':url.pathname.slice(1);
   try{await access(new URL(path,root))}catch{await access(new URL(`${path}.html`,root))}
  }
 }
 assert.ok(checked.size>100,'Expected route, PDF and image coverage');
});
test('homepage retains all portfolio items and starts art with existing illustrations',async()=>{
 const html=await htmlFor('/');
 assert.ok(html.indexOf('artwork/OvJLaK')<html.indexOf('href="/art/ascii-sculpture"'));
 for(const path of ['/work/exnode','/work/dreamy','/work/colorist','/work/landings','/graphic/wave-identity'])assert.ok(html.includes(`href="${path}"`),path);
 assert.ok(html.includes('https://t.me/art_is_hazy'));
});
