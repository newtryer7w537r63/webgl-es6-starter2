import * as THREE from 'three';

class Light {
    constructor(scene){
        this.light = new THREE.DirectionalLight(0xe0e0e0);
        this.light = new THREE.DirectionalLight(0xffffff,10);
        this.light.position.set(100, 100, 0).normalize();
        scene.add(this.light);
    }
    

}
export default Light;