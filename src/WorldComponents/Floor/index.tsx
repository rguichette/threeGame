import { useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
export default function Floor({...props}) {
let ref = useRef(null!)

let textures = useTexture({
  aoMap:'/assets/materials/ground/Sci-fi_Floor_003_SD/Sci-fi_Floor_003_ambientOcclusion.jpg',
  map: "/assets/materials/ground/Sci-fi_Floor_003_SD/Sci-fi_Floor_003_basecolor.jpg",
  normalMap:"/assets/materials/ground/Sci-fi_Floor_003_SD/Sci-fi_Floor_003_normal.jpg",
  roughnessMap:"/assets/materials/ground/Sci-fi_Floor_003_SD/Sci-fi_Floor_003_roughness.jpg"
  //   metalnessMap: "assets/materials/ground/Sci-fi_Floor_003_SD/Sci-fi_Floor_003_metallic.jpg",
    // displacementMap: "/assets/materials/ground/2K-rock_1-displacement.jpg",
    // specularMap:"/assets/materials/ground/2K-rock_1-specular.jpg",
})



for(let key in textures)
{
  textures[key as keyof typeof textures].wrapS = textures[key as keyof typeof textures].wrapT = THREE.RepeatWrapping
  textures[key as keyof typeof textures].offset.set(-2,-2)

textures[key as keyof typeof textures].repeat.set(20,20)
}



  return (
    <mesh ref={ref} 
     {...props}
     
     >
        <planeBufferGeometry attach="geometry"/>
    <meshPhongMaterial attach={"material"}
    color="green"
    // displacementScale={10}
     {...textures} 
    />
    </mesh>
  )
}
