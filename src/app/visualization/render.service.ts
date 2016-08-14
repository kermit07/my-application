import {RenderUtils} from "./render.utils";
import WebGLRenderer = THREE.WebGLRenderer;
import Scene = THREE.Scene;
import PointerLockControls = THREE.PointerLockControls;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;
import ColladaLoader = THREE.ColladaLoader;
import Font = THREE.Font;
import FontLoader = THREE.FontLoader;
import Raycaster = THREE.Raycaster;

export class RenderService {
  private utils:RenderUtils;
  private camera:PerspectiveCamera;
  private scene:Scene;
  private renderer:WebGLRenderer;
  private controls:PointerLockControls;
  private raycaster:Raycaster;
  private hemiLight; // TODO
  private dirLight; // TODO
  private prevTime:number;
  private liquidCrystalFont:Font;
  private colladaMeshes = [];
  private transparent = false;
  private sensors = [];

  constructor(private container:HTMLElement, private panel:HTMLElement) {
    this.utils = new RenderUtils();

    // creating camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500000);

    // creating scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xffffff, 1, 5000);
    this.scene.fog.color.setHSL(0.6, 0, 1);

    // adding grid (extra)
    let grid = new THREE.GridHelper(50, 5);
    grid.setColors(0xff0000, 0x00ffff);
    this.scene.add(grid);

    // creating renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    // creating controls
    this.controls = new THREE.PointerLockControls(this.camera);
    this.controls.enabled = false;
    this.controls.getObject().position.x = 0;
    this.controls.getObject().position.y = 2;
    this.controls.getObject().position.z = 10;
    this.scene.add(this.controls.getObject());

    // creating raycaster
    this.raycaster = new THREE.Raycaster(this.controls.getObject().position, this.controls.getMoveDirection(), 0, 1);

    let fontLoader = new THREE.FontLoader();
    fontLoader.load('threejs/assets/js/DS-Digital_Normal.js', this.loadFont);
  };

  loadFont = (font) => {
    this.liquidCrystalFont = font;
    // ładowanie projektu
    let colladaLoader = new THREE.ColladaLoader();
    colladaLoader.options.convertUpAxis = true;
    colladaLoader.load('threejs/assets/obj/allHouse.dae', this.loadColladaModel);
  }

  loadColladaModel = (collada) => {
    let model = collada.scene;
    model.traverse(this.searchMeshes);
    this.scene.add(model);
    this.init();
  }

  searchMeshes = (node) => {
    if (node instanceof THREE.Mesh) {
      this.colladaMeshes.push(node);
      node.castShadow = true;
      node.receiveShadow = true;
    }
  }

  public init() {
    this.prevTime = performance.now()

    this.loadPointerLock();

    this.addGroundAndSky();
    this.drawSensors();
    this.drawLights();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(300, 0, 300);
    this.scene.add(pointLight);

    // start animation
    this.animate();

    window.addEventListener('keydown', _ => this.onKeyDown, false);
    // bind to window resizes
    window.addEventListener('resize', _ => this.onResize, true);
  }

  private addGroundAndSky():void {
    // GROUND
    let groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    let loader = new THREE.TextureLoader();
    let groundTexture = loader.load('threejs/assets/textures/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(2000, 2000);
    groundTexture.anisotropy = 16;
    let groundMat = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, map: groundTexture});
    let ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    //ground.position.y = 0;
    this.scene.add(ground);

    // SKYDOME
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    var uniforms = {
      topColor: {type: "c", value: new THREE.Color(0x0077ff)},
      bottomColor: {type: "c", value: new THREE.Color(0xffffff)},
      offset: {type: "f", value: 33},
      exponent: {type: "f", value: 0.6}
    };
    this.scene.fog.color.copy(uniforms.bottomColor.value);
    var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    var skyMat = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.BackSide
    });
    var sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
  }


  private drawSensors() {
    let sensors = this.utils.getSensorArray();
    for (var i = 0; i < sensors.length; i++) {
      let s = sensors[i];
      this.drawSensor(s.xPos, s.yPos, s.zPos, 1, s.value);
    }
  }


  private drawSensor(xPos, yPos, zPos, isFlat, value) {

    let geometry = new THREE.Geometry();
    for (var i = 0; i < 3000; i++) {
      let vertex1 = new THREE.Vector3();
      vertex1.x = Math.random() * 2 - 1; 	// random z (-1,1)
      vertex1.y = Math.random() * 2 - 1;
      if (isFlat == 0)
        vertex1.z = Math.random() * 2 - 1;
      vertex1.normalize();				// promień 1

      let vertex2 = vertex1.clone();
      vertex2.multiplyScalar(Math.random() * 0.5 + 1);

      geometry.vertices.push(vertex1);
      geometry.vertices.push(vertex2);
    }

    var material = new THREE.LineBasicMaterial({color: this.utils.calcRgbColor(value)});

    var line = new THREE.LineSegments(geometry, material);
    line.scale.x = line.scale.y = line.scale.z = 0.3;
    // TODO line.originalScale = 0.3;
    line.updateMatrix();
    line.position.set(xPos, yPos, zPos);
    line.lookAt(this.controls.getObject().position);
    this.scene.add(line);

    var mesh = this.drawNumber(xPos, yPos, zPos, 0.2, value);
    mesh.lookAt(this.controls.getObject().position);
    this.scene.add(mesh);
    this.sensors.push({aureole: line, digits: mesh, temperature: value});
  }

  public drawNumber(xPos, yPos, zPos, size, value) {
    var geometry = new THREE.TextGeometry(value, {
      font: this.liquidCrystalFont,
      size: size,
      height: 0.02,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0
    });
    geometry.computeBoundingBox();
    geometry.center();
    let material = new THREE.MultiMaterial([
      new THREE.MeshBasicMaterial({color: this.utils.calcRgbColor(value), overdraw: 0.5}),
      new THREE.MeshBasicMaterial({color: 0x000000, overdraw: 0.5})
    ]);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(xPos, yPos, zPos);

    return mesh;
  }


  private updateSensors(delta) {
    let viewPoint = this.controls.getObject();
    for (var i = 0; i < this.sensors.length; i++) {
      var aureole = this.sensors[i].aureole;
      var digits = this.sensors[i].digits;
      var temperature = this.sensors[i].temperature;
      aureole.lookAt(this.controls.getObject().position);
      digits.lookAt(this.controls.getObject().position);
      //var newColor = calcRgbColor(temperature);
      //aureole.material.color = new THREE.Color(newColor);

      //scene.remove(digits);
      //var mesh = drawNumber(aureole.position.x, aureole.position.y, aureole.position.z, new THREE.MeshBasicMaterial( { color: newColor, overdraw: 0.5 } ), 0.2, temperature);

      //scene.add(mesh);
      //sensors[i].digits = mesh;
    }
    ;
  }

  public drawLights() {
    // TODO
  }

  public animate() {
    window.requestAnimationFrame(_ => this.animate());

    let time = performance.now();
    let delta = ( time - this.prevTime ) / 1000;

    if (!this.transparent)
      this.calculateCollision(0.3, 16);
    if (this.controls.updateAll(delta)) {
      this.showPosition(this.controls.getObject().position);
      this.updateSensors(delta);
    }

    this.prevTime = time;
    this.renderer.render(this.scene, this.camera);
  }

  private calculateCollision(radius, parts) {

    var parts4 = parts / 4;
    if (!Number.isInteger(parts4)) {
      console.log("ERROR! " + parts + " niepodzielne przez 4");
      return;
    }
    var actualDirection = this.controls.getMoveDirection().clone();
    var actualIntersection;
    var upDirection = new THREE.Vector3(0, 1, 0);

    var collisions = [false, false, false, false, false, false];

    for (let i = 1; i <= parts; i++) {
      actualDirection.applyAxisAngle(upDirection, 2 * Math.PI / parts);
      this.raycaster.ray.direction.copy(actualDirection);
      actualIntersection = this.raycaster.intersectObjects(this.colladaMeshes, true);
      if (actualIntersection.length > 0 && actualIntersection[0].distance < radius) {

        if (i % parts4 == 0)
          collisions[i / parts4 - 1] = true;
        else if (Math.floor(i / parts4) == 0) {
          collisions[3] = true;	// move formward
          collisions[0] = true;	// move left
        } else if (Math.floor(i / parts4) == 1) {
          collisions[0] = true;	// move left
          collisions[1] = true;	// move backward
        } else if (Math.floor(i / parts4) == 2) {
          collisions[1] = true;	// move backward
          collisions[2] = true;	// move right
        } else if (Math.floor(i / parts4) == 3) {
          collisions[2] = true;	// move right
          collisions[3] = true;	// move formward
        }
      }
    }
    this.raycaster.ray.direction.copy(new THREE.Vector3(0, 1, 0));
    actualIntersection = this.raycaster.intersectObjects(this.colladaMeshes, true);
    if (actualIntersection.length > 0 && actualIntersection[0].distance < radius)
      collisions[4] = true;	// move up

    this.raycaster.ray.direction.copy(new THREE.Vector3(0, -1, 0));
    actualIntersection = this.raycaster.intersectObjects(this.colladaMeshes, true);
    if (actualIntersection.length > 0 && actualIntersection[0].distance < radius)
      collisions[5] = true;	// move down

    this.controls.setCollisions(collisions);
  }

  onKeyDown = (ev:KeyboardEvent) => {
    switch (ev.keyCode) {
      case 84: // T
        //makeTransparent(!transparent);
        break;
      case 78: // N
        //makeNight(!isNight);
        break;
    }
  }

  onResize = () => {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  private showPosition(v) {
    document.getElementById("x-position").innerHTML = v.x.toFixed(2);
    document.getElementById("y-position").innerHTML = v.y.toFixed(2);
    document.getElementById("z-position").innerHTML = v.z.toFixed(2);
  }


  public loadPointerLock() {
    let plc = this.controls;
    var blocker = document.getElementById('blocker');
    var instructions = document.getElementById('instructions');
    // http://www.html5rocks.com/en/tutorials/pointerlock/intro/

    // sprawdzenie czy przeglądarka obsługuje pointerLockElement
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if (havePointerLock) {
      var element = document.getElementById('webGL-container');

      var pointerlockchange = function (event) {
        //if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
        if (document.pointerLockElement === element) {
          plc.enabled = true;
          blocker.style.display = 'none';
          instructions.style.display = 'none';
        } else {
          plc.enabled = false;
          blocker.style.display = 'block';
          instructions.style.display = 'block';
        }
      };
      document.addEventListener('pointerlockchange', pointerlockchange, false);
      document.addEventListener('mozpointerlockchange', pointerlockchange, false);
      document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

      var pointerlockerror = function (event) {
        blocker.style.display = 'block';
        instructions.style.display = 'block';
      };
      document.addEventListener('pointerlockerror', pointerlockerror, false);
      document.addEventListener('mozpointerlockerror', pointerlockerror, false);
      document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

      var instructionClick = function (event) {
        //element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock = element.requestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {

          var fullscreenchange = function (event) {
            // if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
            if (document.fullscreenElement === element) {

              document.removeEventListener('fullscreenchange', fullscreenchange);
              document.removeEventListener('mozfullscreenchange', fullscreenchange);

              element.requestPointerLock();
            }
          };

          document.addEventListener('fullscreenchange', fullscreenchange, false);
          document.addEventListener('mozfullscreenchange', fullscreenchange, false);

          //element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
          element.requestFullscreen = element.requestFullscreen || element.webkitRequestFullscreen;
          element.requestFullscreen();
        } else {
          element.requestPointerLock();
        }
      }
      instructions.addEventListener('click', instructionClick, false);


    } else {
      instructions.innerHTML = 'Twoja przeglądarka nie obsługuje narzędzia Pointer Lock';
    }
  }

  public changeCamera() {
  }

}
