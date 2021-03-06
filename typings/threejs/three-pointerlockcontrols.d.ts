// Type definitions for three.js (PointerLockControls.js)

declare module THREE {

  export class PointerLockControls {
    constructor( object?:Camera, parentOnKeyDown?:any );

    object:Camera;
    enabled:boolean;
    // API
    pitchObject:THREE.Object3D;
    yawObject:THREE.Object3D;
    force:number;
    mass:number;
    res:number;
    velocity:THREE.Vector3;
    moveForwardBtn:boolean;
    moveBackwardBtn:boolean;
    moveLeftBtn:boolean;
    moveRightBtn:boolean;
    moveUpBtn:boolean;
    moveDownBtn:boolean;
    canMoveForward:boolean;
    canMoveBackward:boolean;
    canMoveLeft:boolean;
    canMoveRight:boolean;
    canMoveUp:boolean;
    canMoveDown:boolean;

    onMouseMove():void;

    dispose():void;

    getObject():THREE.Object3D;

    getDirection():THREE.Vector3;

    getMoveDirection():THREE.Vector3;

    setCollisions(collisions:boolean[]):void;

    updateAll(delta:number):boolean;

    canMoveX(vec:THREE.Vector3):boolean;

    canMoveY(vec:THREE.Vector3):boolean;

    canMoveZ(vec:THREE.Vector3):boolean;

    onKeyDown(event:MouseEvent):void;

    onKeyUp(event:MouseEvent):void;

    moveLeft():boolean;

    moveRight():boolean;

    moveForward():boolean;

    moveBackward():boolean;

    moveUp():boolean;

    moveDown():boolean;
  }
}
