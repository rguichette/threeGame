import {
  PointerLockControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import React, { forwardRef, Ref, RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import animationFiles from "../fbxAnim";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  BufferGeometry,
  Material,
  Mesh,
} from "three";
import { keyframes } from "@emotion/react";

let actions: THREE.AnimationAction[] = [];

let walkingSpeed = 0.4;
let runningSpeed = 0.7;
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

export function useControlChar(actions: AnimationAction[], fbx: THREE.Mesh) {
  // console.log("actions", actions);

  useFrame((state, delta) => {
    if(isKeyPress){
      // console.log("Forward:", isWalking, "backing:", isBacking, "left:",leftTurn, "right:", rightTurn )
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

// //animation handlers
function playAnimations(actions: AnimationAction[]) {
  let idle = actions[0];
  let walk = actions[1];
  let run = actions[4]
  let stopWalk = actions [2]
  

  actions[0].play();
  
  if(isRunning){
    console.log('RUNNING');
    
    // actions[4].play()
  }else if(isWalking){
    console.log("WALKING");
    
  }
  
  
  if (isWalking) {
    actions[0].fadeOut(1).stop();
    actions[1].play();
  } else if(isRunning){

  }else {
    actions[1].fadeOut(1).stop();
  }




  
}

function charMovement(fbx: THREE.Mesh) {
  if (isWalking) {
    // fbx.position.z += walkingSpeed;
    // fbx.translateZ(walkingSpeed)
  }
  if(leftTurn){
    fbx.rotateY(.05)
  }
  if(rightTurn){
    fbx.rotateY(-.05)
  }
}


//keeps track of pressed btns
let keys:any = {};

document.onkeydown = (e) =>{
if(!keys[e.key]){
  keys[e.key] = true
}


}

document.onkeyup = e =>{
return  keys[e.key] = false
//  console.log("deleting key: " ,keys[e.key]);
//  for (var k in keys){
//   if(keys[k] == keys[e.key]){
//     console.log(k);
    
//   }
   
//  }
 
}
  
let move =()=>{


  if(keys["ArrowUp"]){
  //  console.log("walking");
   isWalking = true;
  }else{
    isWalking = false;
  }
  if(keys["Shift"]){
  console.log("running");
  isRunning = true;
  isWalking = false;
  }else{
    isRunning = false;
  }
}

setInterval(move, 100);
 

//turns events off when key is up
// document.addEventListener("keyup", (e) => {
//   let key = e.key
//   if(key == 'w' || key =="ArrowUp" || key =="Up"){
//     isWalking = false
//   }




// });

