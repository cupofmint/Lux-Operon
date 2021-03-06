export default {
  positions: [
    new THREE.Vector3( 1720, 3480, 1410 ),
    new THREE.Vector3( 2190, 1930, 910 ),
    new THREE.Vector3( 1110, 1160, 1740 ),
    new THREE.Vector3( 2890, 1330, 1410 ),
    new THREE.Vector3( 2560, 2280, 1110 ),
    new THREE.Euler( 3160, 1670, 1280 ),
    new THREE.Euler( 1150, 2740, 980 ),
    new THREE.Euler( 1450, 2070, 1290 )
  ],
  rotations: [
    new THREE.Euler( 1.4, 0, 0.45 ),
    new THREE.Euler( 2.48, 0, 0.29 ),
    new THREE.Euler( 1.41, 0, 0.19 ),
    new THREE.Euler( 0.82, 0, -0.25 ),
    new THREE.Euler( 1.78, 0, 0.2 ),
    new THREE.Euler( 2,  0, 0.26 ),
    new THREE.Euler( 1.75, 0, 0.6 ),
    new THREE.Euler( 0.98, 0, -0.43 )
  ],
  group: {
    numberSmallPlants: 30,
    numberBigPlants: 10
  },
  mesh: {
    randomPosition: {
      min: -100,
      max: 100
    },
    smallPlants: {
      scale: {
        min: 0.1,
        max: 0.17
      }
    },
    bigPlants: {
      scale: {
        min: 0.17,
        max: 0.3
      }
    }
  },
  material: {
    smallPlants: {
      uniforms: {
        waveBendAmount: {
          type: 'f',
          value: 3.0
        }
      }
    },
    bigPlants: {
      uniforms: {
        waveBendAmount: {
          type: 'f',
          value: 6.0
        }
      }
    }
  }
};