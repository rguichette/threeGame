import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import React, { forwardRef, useEffect, useRef } from 'react'
import * as THREE from 'three';

import animationFiles from '../../fbxAnim'
import { AnimationAction, AnimationClip, AnimationMixer } from 'three';

let actions: THREE.AnimationAction[] = []


// import animations from '/assets/characters/main/animations'

//load fbx  here to prevent copy and allow other files to access this character

let fbx:any;

// new FBXLoader().load("/assets/characters/main/_player.fbx")



let  MainChar =() => {
  fbx = useFBX("/assets/characters/main/_player.fbx")
  // let t = fbx
  // console.log("FBX", t.children );
  
  // let gltf = useGLTF("/assets/characters/main/T-Pose.fbx")
  console.log(fbx.children);
  // fbx.remove(fbx.children[0]);

  //removing built in light
  if(fbx.children[2].name =="Light001"){
   
    fbx.remove(fbx.children[2]);
    
  }
  let posZ = 0;
  let PosX = 0;
  let _ref= useRef<THREE.Mesh>(null!) ; //private
  let meshRef = useRef<THREE.Mesh>(null!)


  actions = loadAnimationFBX(animationFiles,fbx)



playAnimations(actions)
 
  return (
    <>
    <group>

    <mesh 
    ref={meshRef}
    
    position={ [PosX, 0, posZ] }

    scale ={[.018,.018,.018]} 
    >
    <primitive cale ={[.018,.018,.018]}  
    ref={_ref}
    object={fbx} 
    />
    <meshNormalMaterial/>
</mesh>
    </group>
    </>
  )
}





function loadAnimationFBX(animationFiles:{}, fbx:any){
  let actions = [];
  let mixer = new THREE.AnimationMixer(fbx);
  for( const anim in animationFiles ){
    let fbxPath = animationFiles[anim as keyof typeof animationFiles];
    let fbxAnimation = useLoader<THREE.Group, string>(FBXLoader,fbxPath).animations[0]
   
    // console.log(fbxAnimation);
    
    let _action = mixer.clipAction(fbxAnimation)
    actions.push(_action)    
    
  }

  useFrame((state, delta) => {

    mixer.update(delta)
    
  });
  return actions
  
}


function playAnimations(actions:AnimationAction[] ){

//default is Idle --> TODO: state weapons control
let idle_anim = actions[0];
 
let walk_anim = actions[1];
let stop_walking_anim = actions[2];

actions[0].play()

  //--> first being loaded --> once

  document.onkeydown = (e) =>{


    switch (e.key) {
      case "Up": // IE/Edge specific value
      case "ArrowUp": 
      case"w":
      if(idle_anim.isRunning()){
        idle_anim.crossFadeTo(walk_anim,1.5, false)
        idle_anim.stop()
        stop_walking_anim.stop()
        walk_anim.play()

        console.log('IDLE');
        
      }
  
        break;
        
        default:
          break;
        }
      }
      
      document.onkeyup = (e) =>{
        switch (e.key) {

          case "Up": // IE/Edge specific value
          case "ArrowUp": //
          case "w":
            if(walk_anim.isRunning()){
              walk_anim.crossFadeTo(stop_walking_anim, .25,false).setLoop(THREE.LoopOnce,1).play().crossFadeTo(idle_anim,1,false)
              walk_anim.stop()
              idle_anim.play()
            }

        break;
    
      default:
        break;
    }
  }


  type eName = "keydown" | "keyup" 
  let walkingAnimations = (eventName:eName, e:KeyboardEvent) =>{

}

}



console.log('OUTSIDE: ', fbx);

export default MainChar