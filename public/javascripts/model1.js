(function() {
    var addMesh, animate, camera, clock, container, controls, draw, mesh, renderer, rotate, scene, start;

    scene = void 0;

    camera = void 0;

    renderer = void 0;

    container = void 0;

    controls = void 0;

    clock = void 0;

    mesh = void 0;

    rotate = true;

    start = function() {
        var ASPECT, FAR, NEAR, SCREEN_HEIGHT, SCREEN_WIDTH, VIEW_ANGLE;
        scene = new THREE.Scene;
        VIEW_ANGLE = 45;
        NEAR = 0.1;
        FAR = 10000;
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.position.set(77.82504298529939, 54.02121980722944, -74.02178601347767);
        camera.rotation.set(-2.4020274682629177, 0.6097939469542306, 2.6601321578044113);
        camera.lookAt(scene.position);
        scene.add(camera);
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        container = document.getElementById('threejs');
        container.appendChild(renderer.domElement);
        clock = new THREE.Clock;
    };


    var hemiLight, jsonLoader, light;


    draw = function() {
        light = new THREE.DirectionalLight(0x00ff00, 1);
        light.position.set(50, 0, -500);
        light.castShadow = true;
        scene.add(light);
        jsonLoader = new THREE.ObjectLoader;
        return jsonLoader.load('office-guy-threejs/office-guy.json', addMesh);
    };

    Cloud = function(){
        // Create an empty container that will hold the different parts of the cloud
        this.mesh = new THREE.Object3D();

        // create a cube geometry;
        // this shape will be duplicated to create the cloud
        var geom = new THREE.BoxGeometry(1,2,2);

        // create a material; a simple white material will do the trick
        var mat = new THREE.MeshPhongMaterial({
            color:0xffffff,
        });

        // duplicate the geometry a random number of times
        var nBlocs = 15+Math.floor(Math.random()*3);
        for (var i=0; i<nBlocs; i++ ){

            // create the mesh by cloning the geometry
            var m = new THREE.Mesh(geom, mat);

            // set the position and the rotation of each cube randomly
            m.position.x = i*85;
            m.position.y = Math.random()*1000;
            m.position.z = Math.random()*1000;
            m.rotation.z = Math.random()*Math.PI*2;
            m.rotation.y = Math.random()*Math.PI*2;

            // set the size of the cube randomly
            var s = .1 + Math.random()*.9;
            m.scale.set(s,s,s);

            // allow each cube to cast and to receive shadows
            m.castShadow = true;
            m.receiveShadow = true;

            // add the cube to the container we first created
            this.mesh.add(m);
        }
    };

    Sky = function(){
        // Create an empty container
        this.mesh = new THREE.Object3D();

        // choose a number of clouds to be scattered in the sky
        this.nClouds = 20;

        // To distribute the clouds consistently,
        // we need to place them according to a uniform angle
        var stepAngle = Math.PI*2 / this.nClouds;

        // create the clouds
        for(var i=0; i<this.nClouds; i++){
            var c = new Cloud();

            // set the rotation and the position of each cloud;
            // for that we use a bit of trigonometry
            var a = stepAngle*i; // this is the final angle of the cloud
            var h = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

            // Trigonometry!!! I hope you remember what you've learned in Math :)
            // in case you don't:
            // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
            c.mesh.position.y = Math.sin(a)*h;
            c.mesh.position.x = Math.cos(a)*h;

            // rotate the cloud according to its position
            c.mesh.rotation.z = a + Math.PI/2;

            // for a better result, we position the clouds
            // at random depths inside of the scene
            c.mesh.position.z = -400-Math.random()*400;

            // we also set a random scale for each cloud
            var s = 1+Math.random()*2;
            c.mesh.scale.set(s,s,s);

            // do not forget to add the mesh of each cloud in the scene
            this.mesh.add(c.mesh);
        }
    }

// Now we instantiate the sky and push its center a bit
// towards the bottom of the screen

    var sky;

    function createSky(){
        sky = new Sky();
        sky.mesh.position.y = -600;
        scene.add(sky.mesh);
    }


    var myObj;

    addMesh = function(object) {
    myObj = object;

        var materialObj = new THREE.MeshNormalMaterial({
            vertexColors: THREE.FaceColors,
            overdraw: 0.5
        });
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.geometry.computeVertexNormals;
            }
        });

        object.position.set(0,-115,0);
        object.rotateY(100);
        object.rotateX(-6);
        // then directly add the object
        return scene.add(object);
    };

    animate = function() {
        requestAnimationFrame(animate);
        sky.mesh.rotation.z += .01;




        return renderer.render(scene, camera);
    };





    start();
    var delay = 2000; //milliseconds
    var timeoutId;
    var animationIsFinished = false;
    createSky();
    draw();

    animate();

}).call(this);


