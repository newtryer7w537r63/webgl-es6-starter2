import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';


// initialize the light and provide all kinds of methods
class Utils{
    
    constructor(scene, width,height){
        // init camera 
        // this.light = new THREE.AmbientLight(0x686868);
        this.camera = new THREE.PerspectiveCamera( 60, width / height, 1, 2000 );
        this.camera.position.z = 10;
        this.camera.lookAt( scene.position );
        this.camera.position.set(350,500,350);
        //control
        let orbitControls = new /*THREE.OrbitControls*/Orbitcontrols(this.camera);
        orbitControls.autoRotate = false;
        // console.log('initing camera....');

        this.light = new THREE.PointLight(0xffffff, 1, 0);
        this.light.position.set(0, 150, 0);

        this.angle = 0;
    }
    updateCamera(){
        console.log("update the camera....");
        
    }
    updateLight(){
        this.angle += 0.02;
        
        this.light.position.z = 200*Math.sin(this.angle);
        this.light.position.x = 200*Math.cos(this.angle);
        this.lightcube.position.z = this.light.position.z;
        this.lightcube.position.x = this.light.position.x;
    }
   
    showLight(){
        var geometry = new THREE.SphereGeometry( 5, 12, 12 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.lightcube = new THREE.Mesh( geometry, material );
        this.lightcube.position.set(this.light.position.x,this.light.position.y,this.light.position.z);
        return this.lightcube;
    }
    showCamera(){
        var geometry = new THREE.BoxGeometry( 10, 10, 10 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.cameracube = new THREE.Mesh( geometry, material );
        this.cameracube.position.set(this.camera.position.x,this.camera.position.y,this.camera.position.z);
        return this.cameracube;
    }
    
}

export default Utils;