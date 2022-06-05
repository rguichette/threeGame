import { PerspectiveCamera, Stars, useHelper , PointerLockControls as PLC, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { createRef, Ref, RefObject, useEffect, useRef } from "react";
import THREE, { Mesh, BufferGeometry, Material, CameraHelper } from "three";
import Floor from "../Floor";
import MainChar from "../MainChar";

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { useCamControls } from "../../controls/cameraControls";
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



  useHelper(camRef, CameraHelper);

  useCamControls(camRef, characterRef)

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
        // position={[0, 3, 10]}
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
