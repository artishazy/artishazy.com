"use client";
import {useEffect,useRef} from "react";
import * as THREE from "three";

export default function VoxelStatue(){
  const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=mount.current;if(!host)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,.4,10);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
    const group=new THREE.Group();group.rotation.y=-.18;scene.add(group);
    const lightMat=new THREE.MeshStandardMaterial({color:0xe8e8e3,roughness:.62,metalness:.08});
    const darkMat=new THREE.MeshStandardMaterial({color:0x181818,roughness:.8});
    const addBox=(x:number,y:number,z:number,sx:number,sy:number,sz:number,mat=lightMat,rot=0)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat);mesh.position.set(x,y,z);mesh.rotation.z=rot;mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;
    };
    // pedestal
    addBox(0,-3.15,0,4.2,.42,2.1);addBox(0,-2.77,0,3.45,.34,1.7);
    // torso and shoulders
    addBox(0,-1.55,0,2.45,2.35,1.35);addBox(-1.35,-1.55,.02,.72,1.72,1.08,lightMat,-.12);addBox(1.35,-1.55,.02,.72,1.72,1.08,lightMat,.12);
    addBox(0,-.2,0,1.05,.72,.92);
    // head, jaw, nose, ears
    addBox(0,.92,0,1.72,1.85,1.55);addBox(0,.02,.08,1.35,.34,1.2);addBox(0,.83,.9,.34,.58,.38);
    addBox(-.98,.78,0,.25,.62,.58);addBox(.98,.78,0,.25,.62,.58);
    // pixel hair crown
    [[-0.65,1.93,0],[0,2.05,0],[.65,1.93,0],[-.82,1.48,-.05],[.82,1.48,-.05]].forEach(([x,y,z])=>addBox(x,y,z,.64,.45,1.5,darkMat));
    // eyes and mouth
    addBox(-.42,1.14,.91,.28,.16,.12,darkMat);addBox(.42,1.14,.91,.28,.16,.12,darkMat);addBox(0,.35,.78,.58,.13,.12,darkMat);
    // voxel chips create an eroded/glitch silhouette
    for(let i=0;i<22;i++){const side=i%2?1:-1;addBox(side*(1.35+Math.random()*.7),-.8+Math.random()*3.6,-.2+Math.random()*.7,.12+Math.random()*.25,.12+Math.random()*.32,.12+Math.random()*.25,lightMat)}
    const hemi=new THREE.HemisphereLight(0xffffff,0x222222,2.2);scene.add(hemi);
    const key=new THREE.DirectionalLight(0xffffff,3.8);key.position.set(-4,6,7);key.castShadow=true;scene.add(key);
    const rim=new THREE.DirectionalLight(0xffffff,2.2);rim.position.set(5,1,-4);scene.add(rim);
    let tx=-.18,ty=.02,raf=0,time=0;
    const pointer=(e:PointerEvent)=>{const r=host.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*.75;ty=((e.clientY-r.top)/r.height-.5)*.28};
    const leave=()=>{tx=-.18;ty=.02};host.addEventListener("pointermove",pointer);host.addEventListener("pointerleave",leave);
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};const ro=new ResizeObserver(resize);ro.observe(host);resize();
    const theme=new MutationObserver(()=>{const dark=document.documentElement.dataset.theme==="dark";lightMat.color.setHex(dark?0xe8e8e3:0x262626);darkMat.color.setHex(dark?0x161616:0xd9d9d4)});theme.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    const animate=()=>{time+=.008;group.rotation.y+=(tx-group.rotation.y)*.045;group.rotation.x+=(ty-group.rotation.x)*.045;group.position.y=Math.sin(time)*.055;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};animate();
    return()=>{cancelAnimationFrame(raf);ro.disconnect();theme.disconnect();host.removeEventListener("pointermove",pointer);host.removeEventListener("pointerleave",leave);renderer.dispose();scene.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose()});lightMat.dispose();darkMat.dispose();renderer.domElement.remove()};
  },[]);
  return <div ref={mount} className="webgl-statue" role="img" aria-label="Интерактивная пиксельная 3D-статуя"/>;
}
