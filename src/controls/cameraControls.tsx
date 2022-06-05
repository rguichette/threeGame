import { useFrame } from '@react-three/fiber';
import React, { forwardRef, Ref, RefObject, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { Vector3 } from 'three';




export function useCamControls( camera:React.MutableRefObject<THREE.PerspectiveCamera | undefined>, character:React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | undefined>){
    let cameraOffset = new Vector3(0, 2, -5);
    let objPos = new Vector3()
    let newPos = new THREE.Vector3()
    

    //position to char
    ///---
    
    //init cam
    useEffect(()=>{

        //setup Cam
        if(camera.current){
          camera.current.rotateY(Math.PI)
        }
        
        
    }, [])
    
    window.addEventListener("keypress", (e)=>{
        
        
    })
    useFrame(()=>{
        let cPos = character.current?.children[0].position;
        character.current?.children[0].getWorldPosition(objPos)
        // console.log("mesh --> ",objPos );
        // character.current?.getWorldPosition(objPos)
        camera.current?.position.copy(objPos).add(cameraOffset)
        if(camera.current)
        character.current?.rotation.setFromRotationMatrix(camera.current?.matrix)
        // character.current?.rotateY(2)
        // console.log("OBJ: ", ca);
     
    })
}