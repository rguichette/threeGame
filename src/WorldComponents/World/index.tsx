import { PerspectiveCamera, Stars, useHelper , PointerLockControls as PLC } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { createRef, Ref, RefObject, useEffect, useRef } from "react";
import THREE, { Mesh, BufferGeometry, Material, CameraHelper } from "three";
import Floor from "../Floor";
import MainChar from "../MainChar";

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
export default function index() {
  let characterRef = useRef<THREE.Mesh>();
  // let characterRef =
  //   createRef<Ref<Mesh<BufferGeometry, Material | Material[]>>>();

  let width = window.screen.width;
  let height = window.screen.height;
  let camRef = useRef<THREE.PerspectiveCamera>();

  let camRotation = 0;
  let canvas =document.getElementsByTagName("canvas")[0]

let controls:PointerLockControls;  













/////////////////////////////////////////////////////////////////////////////////////



  // document.addEventListener("mousemove",(e)=>{
  //   if(controls.isLocked){
  //     console.log("controls",e);
  //     // controls.moveRight(.001)
  //   }
  //   // controls.moveRight(.1)
  // })

  useEffect(() => {
    controls = new PointerLockControls( camRef.current as THREE.Camera, document.body );
    console.log("charRef", characterRef.current?.position);
    if (characterRef.current?.position)
      camRef.current?.lookAt(
        characterRef.current?.position.x,
        0,
        characterRef.current?.position.y
      );

    //rotate cam to behind character
    if (camRef.current) {
      camRef.current.rotation.x = (40 * Math.PI) / 180;
      camRef.current.position.x = 10;
      if (characterRef.current)
        camRef.current.position.x = characterRef.current?.position.x - 2;
    }

    canvas.addEventListener('click',()=>{
      console.log("LOCKED");
      controls.lock()
    })

    document.addEventListener("mousemove",(e)=>{


      if(controls.isLocked){
        console.log("controls",e.movementX);
        //mouse "rotate"
        if(e.movementX >0)
        controls.moveRight(-.035)

        if(e.movementX <0)
        controls.moveRight(.035)

      }
      // controls.moveRight(.1)
    })

  }, []);

  useHelper(camRef, CameraHelper);

  useFrame(() => {
    //update character movements here and along with the camera position: ;
    // console.log(camRotation);
// if(controls){
// controls.moveRight(-5)
// // console.log("cam:", camRef.current);

// }
canvas.addEventListener('click', ()=>{
  if(controls){
    // console.log("controls", controls);
    // controls.lock()
  }
  



})

    

    if (camRef.current) {
      if (characterRef.current?.position) {
        camRef.current?.lookAt(
          characterRef.current?.position.x,
          3,
          characterRef.current?.position.z
        );

        camRef.current.position.z = characterRef.current?.position.z - 7;

        //rotation betawenn -.5 and .5
        // camRef.current.rotation.y = camRotation
      }
    }
  });

  return (
    <>
      <MainChar ref={characterRef} />

      <Floor
        position={[0, 0, 1]}
        scale={[500, 500, 500]}
        rotation={[-(Math.PI / 2), 0, 0]}
      />

      <pointLight position={[-5, 5, 1]} />

      <PerspectiveCamera
        ref={camRef}
        position={[0, 3, 10]}
        makeDefault
        fov={40}
        aspect={width / height}

        // near={1}
        // far={1000}
      />

      <ambientLight />
{/* <PLC/> */}
      <Stars />
    </>
  );
}