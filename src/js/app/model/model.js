import * as THREE from 'three';

import Material from '../helpers/material';
import MeshHelper from '../helpers/meshHelper';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';
import ObjMtlLoader from 'obj-mtl-loader';

// Loads in a single object from the config file
export default class Model {
  constructor(scene, manager, textures) {
    console.log('init....')
    this.scene = scene;
    this.textures = textures;

    // Manager is passed in to loader to determine when loading done in main
    this.loader = new THREE.ObjectLoader(manager);
    // this.loader = new THREE.OBJLoader(manager);
    this.obj = null;
  }

  load() {
    console.log('load',Config.model.path);
   
    var objMtlLoader = new ObjMtlLoader();
    var self = this;

    objMtlLoader.load(Config.model.path, function(err, result) {
      
      if(err) {
        console.error(err);
      }
      else {
        console.log(result);
  
        var geometry = new THREE.Geometry();
        var vertices = result.vertices;
        var faces = result.faces;
        var normals = result.normals;
        // var facesMaterialsIndex = result.facesMaterialsIndex;
        // var facesMaterialsIndex = result.facesMaterialsIndex;
        // var materials = result.materials;
        
        // console.error(facesMaterialsIndex)
        console.error(result.facesMaterialsIndex)
  
        for(var i = 0; i < vertices.length; ++i) {
          geometry.vertices.push(
            new THREE.Vector3(vertices[i][0], vertices[i][1], vertices[i][2])
          )
        }
  
        
        if(result.facesMaterialsIndex) {
          // for(var k = 0; k < facesMaterialsIndex.length; ++k) {
  
          //   var materialName = facesMaterialsIndex[k].materialName;
          //   var currentMatIndex = 0;
          //   for(var p = 0; p < materials.length; ++p) {
          //     if(materials[p].name === materialName) {
          //       currentMatIndex = p;
          //     }
          //   }
  
          //   var startIndex = facesMaterialsIndex[k].materialStartIndex;
          //   var endIndex = k+1 < facesMaterialsIndex.length? facesMaterialsIndex[k+1].materialStartIndex : faces.length;
  
          //   for(var i = startIndex; i < endIndex; ++i) {
          //     for(var j = 1; j <= faces[i].indices.length-2; ++j) {
  
          //       if(normals.length != 0) {
          //         var n0 = new THREE.Vector3(normals[faces[i].normal[0]-1][0], normals[faces[i].normal[0]-1][1], normals[faces[i].normal[0]-1][2]);
          //         var n1 = new THREE.Vector3(normals[faces[i].normal[1]-1][0], normals[faces[i].normal[1]-1][1], normals[faces[i].normal[1]-1][2]);
          //         var n2 = new THREE.Vector3(normals[faces[i].normal[2]-1][0], normals[faces[i].normal[2]-1][1], normals[faces[i].normal[2]-1][2]);
  
          //         var c0 = new THREE.Color(Math.abs(n0.x), Math.abs(n0.y), Math.abs(n0.z));
          //         var c1 = new THREE.Color(Math.abs(n1.x), Math.abs(n1.y), Math.abs(n1.z));
          //         var c2 = new THREE.Color(Math.abs(n2.x), Math.abs(n2.y), Math.abs(n2.z));
  
          //         var face = new THREE.Face3(faces[i].indices[0]-1, faces[i].indices[j]-1, faces[i].indices[j+1]-1, [n0,n1,n2], [c0,c1,c2], currentMatIndex);
  
          //       }
          //       else {
          //         var face = new THREE.Face3(faces[i].indices[0]-1, faces[i].indices[j]-1, faces[i].indices[j+1]-1, [0,1,0], [0,0,0], currentMatIndex);
  
          //         var fvUV = new THREE.Vector3(faces[i].texture[0]-1, faces[i].texture[j]-1, faces[i].texture[j+1]-1);
          //       }
  
          //       geometry.faces.push(face);
          //       geometry.faceVertexUvs.push(fvUV);
          //     }
          //   }
          // }
        }
        else {
          for(var i = 0; i < faces.length; ++i) {
            for(var j = 1; j <= faces[i].indices.length-2; ++j) {
              var face = new THREE.Face3(faces[i].indices[0]-1, faces[i].indices[j]-1, faces[i].indices[j+1]-1);
              geometry.faces.push(face);
            }
          }
        }
  
  
        // var threeMaterialsArray = [];
        // if(materials) {
        //   for(var i = 0; i < materials.length; ++i) {
        //     var matData = materials[i];
        //     var mat = new THREE.MeshBasicMaterial();
        //     mat.color = new THREE.Color(matData.diffuse[0], matData.diffuse[1], matData.diffuse[2]);
        //     mat.specular = new THREE.Color(matData.specular[0], matData.specular[1], matData.specular[2]);
        //     threeMaterialsArray.push(mat);
        //   }
        // }
  
       
      var material = new THREE.MeshPhongMaterial( {
        color: 'rgb(255,255,0)', 
        color: '#24a8e8',
        // emissive: 0x440000, 
        flatShading: true, 
        shininess: 0 ,
        specular: '#ffffff',
         
        });
        geometry.computeVertexNormals();
        
        var cube = new THREE.Mesh(geometry, material);
        console.log(cube);
        console.log(self.scene);
        // cube.scale.set(10,10,10);
        
        self.scene.add( cube );

      }
    });
    //************************************************************************** */
    // this.loader.load(Config.model.path, obj => {
    //   console.log("obj",obj);
    //   obj.traverse(child => {
        
    //     if(child instanceof THREE.Mesh) {
    //       // Create material for mesh and set its map to texture by name from preloaded textures
    //       const material = new Material(0xffffff).standard;
    //       material.map = this.textures.UV;
    //       child.material = material;

    //       // Set to cast and receive shadow if enabled
    //       if(Config.shadow.enabled) {
    //         child.receiveShadow = true;
    //         child.castShadow = true;
    //       }
    //     }
    //   });

    //   // Add mesh helper if Dev
    //   if(Config.isDev && Config.mesh.enableHelper) {
    //     new MeshHelper(this.scene, obj);
    //   }

    //   // Set prop to obj
    //   this.obj = obj;

    //   obj.scale.multiplyScalar(Config.model.scale);
    //   this.scene.add(obj);
    // }, Helpers.logProgress(), Helpers.logError());

  }
}
