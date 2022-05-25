import { useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
export default function Floor({...props}) {
let ref = useRef(null!)

let textures = useTexture({
    // metalnessMap: "assets//textures/Metal035_2K_Metalness.jpg",
    // map:"/assets/textures/Metal035_2K_Color.jpg",
    // normalMap: "/assets/textures/Metal035_2K_NormalGL.jpg"
})

  return (
    <mesh ref={ref}  {...props}>
        <planeBufferGeometry />
    {/* <meshStandardMaterial {...textures} metalness={.01} roughness={0.2}/> */}
    </mesh>
  )
}
