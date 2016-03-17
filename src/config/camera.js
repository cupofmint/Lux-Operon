export default {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  // far: 10000,
  far: 2500,
  lookSpeed: 0.2,
  movementSpeed: 150,
  position: new THREE.Vector3( 0, 800, 0 ),
  target: new THREE.Vector3( 0, 0, 0 ),
  orbitControls: false,
  firstPersonControls: true
};