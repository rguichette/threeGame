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
  console.log("actions", actions);

  useFrame((state, delta) => {
    if(isKeyPress){
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

// //animation handlers
function playAnimations(actions: AnimationAction[]) {
  actions[0].play();
  if (isWalking) {
    actions[0].fadeOut(1).stop();
    actions[1].play();
  } else {
    actions[1].fadeOut(1).stop();
  }
}

function charMovement(fbx: THREE.Mesh) {
  if (isWalking) {
    fbx.position.z += walkingSpeed;
  }
}

document.addEventListener("keydown", (e) => {
  isKeyPress = true
  
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
    case "ArrowLeft":
    case "a":
      leftTurn = true;
      break;
    case "ArrowRight":
    case "d":
      rightTurn = true;
      break;

    default:
      break;
  }
 
});
//turns events off when key is up
document.addEventListener("keyup", (e) => {
  isKeyPress = false
  switch (e.key) {
    case "Up":
    case "ArrowUp":
    case "w":
      isWalking = false;

      break;
    case "Down":
    case "ArrowDown":
    case "s":
      isBacking = false;
      break;
    case "ArrowLeft":
    case "a":
      leftTurn = false;
      break;
    case "ArrowRight":
    case "d":
      rightTurn = false;
      break;

    default:
      break;
  }

});