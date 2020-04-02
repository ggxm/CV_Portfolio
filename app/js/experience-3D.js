// Mobile detect
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

// Detect or not canvas
var canvas = false;
if(document.getElementById('canvas')){
    canvas = true;
}

if(canvas){
    var renderer, scene, camera, planet, skelet, saturn, saturnRing, ball;
    var noise = new SimplexNoise();

    window.onload = function() {
        init();
        animate();
    };


    function init() {

        /**************************
         Scene init
         **************************/
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        renderer.setClearColor(0x000000, 0.0);
        document.getElementById('canvas').appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xA6CDFB, 1, 1000);

        camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        camera.position.x = 0;
        camera.position.y = 100;
        scene.add(camera);

        /**************************
         Lights init
         **************************/
        var ambientLight = new THREE.AmbientLight(0xBD9779);
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        /**************************
         Objects init
         **************************/

        /*-----------------------------------
         // Planet + skelet
         -----------------------------------*/
        planet = new THREE.Object3D();
        skelet = new THREE.Object3D();
        scene.add(planet);
        scene.add(skelet);

        planet.position.x = -60;
        planet.position.y = 60;
        skelet.position.x = -60;
        skelet.position.y = 60;
        if(isMobile) {
            planet.position.x = -50;
            skelet.position.x = -50;
        }

        var geom = new THREE.IcosahedronGeometry(4, 1);
        var mat = new THREE.MeshPhongMaterial({
            color: 0xc0392b,
            shading: THREE.FlatShading
        });
        var bones = new THREE.MeshPhongMaterial({
            color: 0x181919,
            wireframe: true,
            side: THREE.DoubleSide
        });

        var mesh1 = new THREE.Mesh(geom, mat);
        mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = 6;
        planet.add(mesh1);

        var mesh2 = new THREE.Mesh(geom, bones);
        mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = 10;
        skelet.add(mesh2);


        /*-----------------------------------
         // Saturn + Saturn Ring
         -----------------------------------*/
        saturn = new THREE.Object3D();
        scene.add(saturn);

        var geometry = new THREE.TorusGeometry( 14, 0.2, 40, 100 );
        saturnRing = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0x181919, shading: THREE.FlatShading}));

        scene.add(saturnRing);

        saturn.position.x = -10;
        saturn.position.y = 115;
        saturn.position.z = 0;

        saturnRing.rotateX(30);
        saturnRing.position.x = -10;
        saturnRing.position.y = 115;
        saturnRing.position.z = 0;

        var geom2 = new THREE.IcosahedronGeometry(10, 5);
        var mat2 = new THREE.MeshPhongMaterial({
            color: 0xc0392b,
            shading: THREE.FlatShading
        });
        var mesh3 = new THREE.Mesh(geom2, mat2);
        mesh3.scale.x = mesh3.scale.y = mesh3.scale.z = 1;
        saturn.add(mesh3);


        /*-----------------------------------
         // Glue Ball
         -----------------------------------*/
        var icosahedronGeometry = new THREE.IcosahedronGeometry(30, 5);
        var lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0xc0392b,
            wireframe: false
        });
        ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        ball.position.x = 60;
        if(isMobile) {
            ball.position.x = 50;
        }
        ball.position.y = 85;
        ball.position.z = 0;
        ball.castShadow = true;
        scene.add(ball);

        function makeRoughBall(mesh) {
            mesh.geometry.vertices.forEach(function (vertex, i) {
                var offset = mesh.geometry.parameters.radius;
                var amp = 4;
                var time = Date.now();
                vertex.normalize();
                var distance = offset + noise.noise3D(vertex.x + time * 0.0002, vertex.y + time * 0.0003, vertex.z + time * 0.0004) * amp;
                vertex.multiplyScalar(distance);
            });
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }


        /*-----------------------------------
         // Render
         -----------------------------------*/
        window.addEventListener('resize', onWindowResize, false);

        render();

        function render() {
            makeRoughBall(ball);
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {

        requestAnimationFrame(animate);

        planet.rotation.z += .006;
        planet.rotation.y = 0;
        planet.rotation.x = 0;
        skelet.rotation.z += .002;
        skelet.rotation.y = 0;
        skelet.rotation.x = 0;
        saturnRing.rotation.y += .008;
        saturnRing.rotation.x += .008;

        renderer.clear();

        renderer.render( scene, camera );
    }
}
