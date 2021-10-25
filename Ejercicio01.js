// Creamos una escena donde vamos a posicionar nuestros objetos respectivos
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado) { //Aquí, tenemos una función cubo donde crearemos los cubos para la escena
    var cubeGeometry = new THREE.BoxGeometry(x, y, z); //Se crea la geometría del cubo
    var cubeMaterial;
    var balde = Math.floor(Math.random() * 16777215).toString(16); //Se intenta agregar un randomizador de color pero no funciona :(
    switch (material) {
        case 'Basic':
            cubeMaterial = new THREE.MeshBasicMaterial({
                color: '0x' + balde,
                wireframe: alambrado
            });
            break;

        case 'Standard':
            cubeMaterial = new THREE.MeshStandardMaterial({
                color: '0x' + balde,
                wireframe: alambrado
            });
            break;

        case 'Physical':
            cubeMaterial = new THREE.MeshPhysicalMaterial({
                color: '0x' + balde,
                wireframe: alambrado
            });
            break;

        case 'Phong':
            cubeMaterial = new THREE.MeshPhongMaterial({
                color: '0x' + balde,
                wireframe: alambrado
            });
            break;

        case 'Lambert':
            cubeMaterial = new THREE.MeshLambertMaterial({
                color: '0x' + balde,
                wireframe: alambrado
            });
            break;
    }

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cube);
    return (cube); //Se retorna el cubo como un objeto para manipular en la escena
}

function init() {

    //Creamos una cámara con la cual se podrán visualizar los objetos renderizados en la escena
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Creamos el render para generar los objetos puestos en escena
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Mostramos los ejes del espacio para poder visualizarlos 
    var axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    dim = 1;//Creamos una variable dim para poder crear nuestro array de cubos :)
    let Cubo = [];//Este es el arreglo de cubos
    for (var i = 0; i < 3; i++) {
        let nuevoCubo = Cubo.push(cubo(dim, dim, dim, 0x69DD70, 'Basic', false));//Acá creamos como tal los cubos haciendo uso de un for y la función cubo, creándolos de dimensión 1x1x1
    }

    //Se trasladan los tres cubos al nuevo origen de coordenadas
    for(i=0; i<3; i++){ 
        Cubo[i].translateX(dim/2);
        Cubo[i].translateY(dim/2);
        Cubo[i].translateZ(dim/2);
    }

    //Transformaciones de escalado y traslación sobre el eje Y
    for(i=0; i<3; i++){ 
        if(i==1||i==2){
            escala = 1/(2*i); //Escalado a la mitad de las dimensiones del cubo anterior
            unidades=(dim/2)+(dim/4)+(((dim/2)+(dim/4))/2)*(i-1); //Genera la posición para que queden los cubos uno encima del otro
             Cubo[i].scale.set(escala, escala, escala); //Función que escala el cubo a las dimensiones nuevas
             Cubo[i].translateY(unidades); //Función que traslada el cubo a su posición determinada en y
        }
    }
   
    //Luz (requerida para el material)
    light = new THREE.PointLight(0xFFFF00); //Luz proveniente de un punto en el espacio, semejante al sol
    light.position.set(-3, 5, 10); //  Localización de la luz en las tres dimensiones
    scene.add(light);

    //Posicionamiento de la cámara en el mundo tridimensional
    camera.position.set(-5, 3, 3);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);//Se hace el render para poder ver en nuestra pantalla el código en ejecución
}