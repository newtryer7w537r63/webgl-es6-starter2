import * as THREE from 'three';

class Camera {
    constructor(width, height){
        
        this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
        // this.camera.position.x = -10;
        // this.camera.position.y = 15;
        this.camera.position.z = 10;
        this.camera.lookAt( scene.position );
        scene.add(this.camera);
    
        console.log('initing camera....');
    }

}
export default Camera;