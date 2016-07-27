import WebGLRenderer = THREE.WebGLRenderer;
import Scene = THREE.Scene;
import PointerLockControls = THREE.PointerLockControls;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;

export class RenderService {
  private camera:PerspectiveCamera;
  private scene:Scene;
  private renderer:WebGLRenderer;
  private controls:PointerLockControls;
  private hemiLight; // TODO
  private dirLight; // TODO
  private sphere:Mesh; // TO DELETE
  private prevTime:number;

  constructor(private container:HTMLElement, private panel:HTMLElement) {

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
    this.renderer.setSize(window.innerWidth, window.innerHeight - 3.6);
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
  };

  public init() {
    this.prevTime = performance.now()

    this.loadPointerLock();


    this.addGroundAndSky();
    // Sphere
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('threejs/assets/earth.jpg', t => {
      let geometry = new THREE.SphereGeometry(5, 50, 50);
      let material = new THREE.MeshLambertMaterial({map: t});
      this.sphere = new THREE.Mesh(geometry, material);

      this.scene.add(this.sphere);
    });

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
    window.addEventListener('resize', _ => this.onResize(this.camera, this.container, this.renderer));
  }
  private addGroundAndSky():void {
    // GROUND
    let groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    let loader = new THREE.TextureLoader();
    let groundTexture = loader.load( 'threejs/assets/textures/grasslight-big.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 2000, 2000 );
    groundTexture.anisotropy = 16;
    let groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );
    let ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.receiveShadow = true;
    //ground.position.y = 0;
    this.scene.add( ground );

    // SKYDOME
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
      topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
      bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
      offset:		 { type: "f", value: 33 },
      exponent:	 { type: "f", value: 0.6 }
    };
    this.scene.fog.color.copy( uniforms.bottomColor.value );
    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
    var sky = new THREE.Mesh( skyGeo, skyMat );
    this.scene.add( sky );
  }

  public animate() {
    window.requestAnimationFrame(_ => this.animate());

    let time = performance.now();
    let delta = ( time - this.prevTime ) / 1000;

    // if (!transparent)
    // calculateCollision(0.3, 16);
    this.controls.updateAll(delta);
    // this.showPosition(this.controls.getObject().position);
    // this.updateSensors(delta);

    this.prevTime = time;
    this.renderer.render(this.scene, this.camera);
  }

  private onKeyDown(ev:KeyboardEvent) {
    switch (ev.keyCode) {
      case 84: // T
        //makeTransparent(!transparent);
        break;
      case 78: // N
        //makeNight(!isNight);
        break;
    }
  }

  public onResize(camera:PerspectiveCamera, container:HTMLElement, renderer:WebGLRenderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
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
