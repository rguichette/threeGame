import {
  PointerLockControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import React, {
  forwardRef,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

import animationFiles from "../fbxAnim";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  BufferGeometry,
  Material,
  Mesh,
} from "three";
import { keyframes } from "@emotion/react";

let actions: THREE.AnimationAction[] = [];

let walkingSpeed = 0.8;
let runningSpeed = 0.8;
let isRunning = false;
let isWalking = false;
let isBacking = false;
let isIdle = true;

//turns
let leftTurn = false;
let rightTurn = false;

//used to help key listener for useFrame
let isKeyPress = false;
/**
 * animates the character and updates its position based on key press
 * @param actions
 *
 *
 * @param fbx the object you want to animate and apply position updates to
 */
let prevAction: THREE.AnimationAction;
let activeAction: THREE.AnimationAction;

export function useControlChar(actions: AnimationAction[], fbx: THREE.Mesh) {
  // console.log("actions", actions);


  useFrame((state, delta) => {
    if (isKeyPress) {
      console.log("Forward:", isWalking, "backing:", isBacking, "left:",leftTurn, "right:", rightTurn )
    }
    playAnimations(actions);
    charMovement(fbx);
  });
}

function switchWalkFB(e: KeyboardEvent) {
  switch (e.key) {
    case "Up":
    case "ArrowUp":
    case "w":
      isWalking = true;
      break;
    case "Down":
    case "ArrowDown":
    case "s":
      isBacking = true;

    default:
      isWalking = false;
  }
}


//, prevAction?:THREE.AnimationAction, activeAction?: THREE.AnimationAction
// //animation handlers
function playAnimations(actions: AnimationAction[]) {
  let idle = actions[0];
  let walk = actions[1];
  let run = actions[4];
  let stopWalk = actions[2];

  
  // prevAction = activeAction;

  if(!activeAction && !prevAction){
    activeAction = idle; 
    activeAction.play();
    console.log("setting");
    
    prevAction = idle;

  }
//////////////////////////////start

if(isWalking){


}else{

}




activeAction.play()









  
///////////////////////////end
}


function charMovement(fbx: THREE.Mesh) {
  if(isRunning){
    fbx.translateZ(runningSpeed)

  }
  if (isWalking) {
    // fbx.position.z += walkingSpeed;
    fbx.translateZ(walkingSpeed)
  }
  if (leftTurn) {
    fbx.rotateY(0.05);
  }
  if (rightTurn) {
    fbx.rotateY(-0.05);
    fbx.updateMatrix()
  }
}

//keeps track of pressed btns
let keys: any = {};

document.onkeydown = (e) => {
  if (!keys[e.key]) {
    keys[e.key] = true;
  }
};

document.onkeyup = (e) => (keys[e.key] = false);

let move = () => {
  if (keys["ArrowUp"] || keys["w"]) {
    //  console.log("walking");
    isWalking = true;
  } else {
    isWalking = false;
  }
  if (keys["Shift"] &&( keys["ArrowUp"] || keys['w'])) {
    isRunning = true;
    isWalking = false;
  } else {
    isRunning = false;
    
  }

  if(( keys["ArrowRight"] || keys['d'])){
rightTurn = true;
  }else{
    rightTurn =false
  }
  if(( keys["ArrowLeft"] || keys['a'])){
    leftTurn = true
  }else{
    leftTurn = false;
  }
};

setInterval(move, 100);

//turns events off when key is up
// document.addEventListener("keyup", (e) => {
//   let key = e.key
//   if(key == 'w' || key =="ArrowUp" || key =="Up"){
//     isWalking = false
//   }

// });
