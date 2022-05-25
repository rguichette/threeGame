import { Suspense, useEffect, useRef, useState } from 'react'

import './App.css'
import * as THREE from 'three'
import {Canvas, useFrame} from '@react-three/fiber'
import {Cloud, Environment, Lightformer, OrbitControls,  PerspectiveCamera, Sky, Stars, useAnimations, useFBX, useGLTF } from '@react-three/drei'

import Floor from './WorldComponents/Floor'
import MainChar from './WorldComponents/MainChar'
import { Group } from 'three'

function App() {
  // let character= useGLTF('/assets/characters/running/run4.gltf')
  // let character= useGLTF('/assets/characters/testRun.gltf')
  // // console.log(character);
  
  // let actions = useAnimations(character.animations, character.scene)

  // // let character = useFBX('/assets/characters/Standard_Run.fbx');

  // console.log(actions);
  

  

  const [count, setCount] = useState(0)
  let width = window.screen.width;
  let height = window.screen.height;

  let floorRef = useRef<THREE.Mesh>(null!)
  let camRef = useRef<THREE.PerspectiveCamera>(null!)
  

  
  return (
    <div className="App">
     <Canvas shadows 
      camera={camRef.current}


     >
       <Suspense fallback={null}>

         <PerspectiveCamera ref={camRef} rotation={[-.15,0,0]} position={[0,1.5,10]} makeDefault fov={45} aspect={width/height} near={1}  far={1000} />


<MainChar/>


<Floor   
position={[0,0,1]} scale={[1000,1000,1000]}
rotation={[ -(Math.PI/2), 0,0]}
/>


<pointLight position={[-5,5, 1]}/>

</Suspense>

<ambientLight/>
<OrbitControls 
//  enableZoom={false} 
 maxPolarAngle={Math.PI}  minPolarAngle={.1}/>
</Canvas>
    </div>
  )
}

export default App
