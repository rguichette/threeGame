import { Ref, RefObject, Suspense, useEffect, useRef, useState } from 'react'

import './App.css'
import * as THREE from 'three'
import {Canvas, useFrame} from '@react-three/fiber'
import {Cloud, Environment, Lightformer, OrbitControls,  PerspectiveCamera, PointerLockControls, Sky, Stars, useAnimations, useFBX, useGLTF } from '@react-three/drei'

import Floor from './WorldComponents/Floor'
import MainChar from './WorldComponents/MainChar'
import World from './WorldComponents/World'
import { BufferGeometry, Fog, Group, Material, Mesh } from 'three'

function App() {

  

  const [count, setCount] = useState(0)
  let width = window.screen.width;
  let height = window.screen.height;

  let floorRef = useRef<THREE.Mesh>(null!)
  let camRef = useRef<THREE.PerspectiveCamera>(null!)
  
  
let controls = useRef() 


  return (
    <div className="App">
     <Canvas className='canvas'


     >

       <Suspense fallback={null}>


          makeDefault fov={45}
           aspect={width/height} 
           near={1}  far={1000} 


<World/>
</Suspense>

<ambientLight />


</Canvas>
    </div>
  )
}

export default App
