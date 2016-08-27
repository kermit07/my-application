THREE.PointerLockControls = function (camera, parentOnKeyDown) {

  var scope = this;

  camera.rotation.set(0, 0, 0);

  var pitchObject = new THREE.Object3D();
  pitchObject.add(camera);

  var yawObject = new THREE.Object3D();
  yawObject.position.y = 10;
  yawObject.add(pitchObject);

  // właściwości kontrolera:
  var force = 1400;
  var mass = 100;
  var res = 500;

  var velocity = new THREE.Vector3();

  // przyciski
  var moveForwardBtn = false;
  var moveBackwardBtn = false;
  var moveLeftBtn = false;
  var moveRightBtn = false;
  var moveUpBtn = false;
  var moveDownBtn = false;

  var canMoveForward = true;
  var canMoveBackward = true;
  var canMoveLeft = true;
  var canMoveRight = true;
  var canMoveUp = true;
  var canMoveDown = true;


  var PI_2 = Math.PI / 2;

  function onMouseMove(event) {

    if (scope.enabled === false) return;

    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));

  };

  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);

  this.dispose = function () {

    document.removeEventListener('mousemove', onMouseMove, false);

  };

  document.addEventListener('mousemove', onMouseMove, false);

  this.enabled = false;

  this.getObject = function () {

    return yawObject;

  };

  this.getDirection = function () {

    // assumes the camera itself is not rotated

    var direction = new THREE.Vector3(0, 0, -1);
    var rotation = new THREE.Euler(0, 0, 0, "YXZ");

    return function (v) {

      rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
      var v = new THREE.Vector3(0, 0, -1);
      v.copy(direction).applyEuler(rotation);

      return v;

    };

  }();

  this.getMoveDirection = function () {
    var v = scope.getDirection().clone();
    v.projectOnPlane(new THREE.Vector3(0, 1, 0));
    return v;
  }

  this.setCollisions = function (collisions) {

    canMoveLeft = true;
    canMoveBackward = true;
    canMoveRight = true;
    canMoveForward = true;
    canMoveUp = true;
    canMoveDown = true;

    if (collisions[0]) {
      canMoveLeft = false;
    }
    if (collisions[1]) {
      canMoveBackward = false;
    }
    if (collisions[2]) {
      canMoveRight = false;
    }
    if (collisions[3]) {
      canMoveForward = false;
    }
    if (collisions[4]) {
      canMoveUp = false;
    }
    if (collisions[5]) {
      canMoveDown = false;
    }
  }

  // return if animation needs update
  this.updateAll = function (delta) {

    if (scope.enabled === false) return false;

    velocity.x -= res * velocity.x / mass * delta;
    velocity.y -= res * velocity.y / mass * delta;
    velocity.z -= res * velocity.z / mass * delta;

    if (moveForwardBtn) velocity.z -= force / mass * delta;
    if (moveBackwardBtn) velocity.z += force / mass * delta;

    if (moveLeftBtn) velocity.x -= force / mass * delta;
    if (moveRightBtn) velocity.x += force / mass * delta;

    if (moveUpBtn) velocity.y += force / mass * delta;
    if (moveDownBtn) velocity.y -= force / mass * delta;

    if (canMoveX(velocity.x))
      yawObject.translateX(velocity.x * delta);
    if (canMoveY(velocity.y))
      yawObject.translateY(velocity.y * delta);
    if (canMoveZ(velocity.z))
      yawObject.translateZ(velocity.z * delta);

    if (velocity.x > 0.1 || velocity.x < -0.1 || velocity.y > 0.1 || velocity.y < -0.1 || velocity.z > 0.1 || velocity.z < -0.1)
      return true;

    return false;
  };


  function canMoveX(xVelocity) {
    if (xVelocity > 0 && canMoveRight)
      return true;
    if (xVelocity < 0 && canMoveLeft)
      return true;
    return false;
  }


  function canMoveY(yVelocity) {
    if (yVelocity > 0 && canMoveUp)
      return true;
    if (yVelocity < 0 && canMoveDown)
      return true;
    return false;

  }


  function canMoveZ(zVelocity) {
    if (zVelocity > 0 && canMoveBackward)
      return true;
    if (zVelocity < 0 && canMoveForward)
      return true;
    return false;
  }


  function onKeyDown(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForwardBtn = true;
        break;
      case 37: // left
      case 65: // a
        moveLeftBtn = true;
        break;
      case 40: // down
      case 83: // s
        moveBackwardBtn = true;
        break;
      case 39: // right
      case 68: // d
        moveRightBtn = true;
        break;
      case 81: // q
        moveDownBtn = true;
        break;
      case 69: // e
        moveUpBtn = true;
        break;
      default:
        parentOnKeyDown(event);
        break;
    }
  }

  function onKeyUp(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForwardBtn = false;
        break;
      case 37: // left
      case 65: // a
        moveLeftBtn = false;
        break;
      case 40: // down
      case 83: // s
        moveBackwardBtn = false;
        break;
      case 39: // right
      case 68: // d
        moveRightBtn = false;
        break;
      case 81: // q
        moveDownBtn = false;
        break;
      case 69: // e
        moveUpBtn = false;
        break;
    }
  }

  this.moveLeft = function () {
    return moveLeft;
  };

  this.moveRight = function () {
    return moveRight;
  };

  this.moveForward = function () {
    return moveForwardBtn;
  };

  this.moveBackward = function () {
    return moveBackwardBtn;
  };

  this.moveUp = function () {
    return moveUpBtn;
  };

  this.moveDown = function () {
    return moveDownBtn;
  };

};
