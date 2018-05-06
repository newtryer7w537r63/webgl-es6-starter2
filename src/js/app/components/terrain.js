import * as THREE from 'three';
// import heightmap from '../assets/france_terrain.png';
// import texturemap from '../assets/france_texture.png';

class Terrain{
    constructor(width, height) {
        console.log("init the terrain....",width,height);
        this.width = width;
        this.height = height;

        // define the height and width of the geometry and segments of height and width;
        this.geometry = new THREE.PlaneGeometry(
            width,
            height,
            width - 1,
            height - 1
        );
        let rotation = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
        this.geometry.applyMatrix(rotation);
       
        // this.geometry.computeTangents();

        this.loadImg();
    }
  

    getHeightData(img, size) {

        console.log('the image size is',img,size);
        var canvas = document.createElement( 'canvas' );
        canvas.width = size;
        canvas.height = size;
        // canvas.width = this.width;
        // canvas.height = this.height;
        var context = canvas.getContext( '2d' );
    
        var area = canvas.width * canvas.height, data = new Float32Array( area );
    

        context.drawImage(img,0,0);
    
        for ( var i = 0; i < area; i ++ ) {
          data[i] = 0;
        }
    
        var imgd = context.getImageData(0, 0, size, size);
        var pix = imgd.data;

        var j=0;
        for (var i = 0, n = pix.length; i < n; i += (4)) {
          var all = pix[i]+pix[i+1]+pix[i+2];
          //   define the height of each peak....
          data[j++] = all/30;
        //   console.log(data[j++]);
        }
    
        return data;
    }

    loadImg(){
        var img = new Image();
        console.log(img,this.width);
        
        var self = this;
        img.onload = function() {
            // default image size width = height;
            var heightData = self.getHeightData( img, self.width );
            self.update(heightData);
        };
        // img.src = heightmap;
        img.src = './assets/img/france_terrain.png';
    }

    // not suggest init the heightmap and update heightmap and re-render
    update(heightData){
        for(var i=0; i<this.geometry.vertices.length;i++){
            this.geometry.vertices[i].y = Math.random();
            this.geometry.vertices[i].y = heightData[i+3];
        }
        this.geometry.verticesNeedUpdate = true;
        // this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
    }

    build() {
        this.geometry.computeBoundingSphere();
        this.material = new THREE.MeshLambertMaterial({
            // wireframe:true,
            color: '#24a8e8',
            emissive: '#333333',
        });
        this.material = new THREE.MeshPhongMaterial({
            // map: THREE.ImageUtils.loadTexture(texturemap)
            map: THREE.ImageUtils.loadTexture('./assets/img/france_texture.png')
        });
        // this.material = new THREE.MeshPhongMaterial({
        //     // light
        //     specular: '#ffffff',
        //     // intermediate
        //     color: '#aaaaaa',
        //     // dark
        //     emissive: '#333333',
        //     shininess: 100 
        //   });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = 0;
        this.mesh.position.z = 0;

        return this.mesh;
    }

}

export default Terrain;