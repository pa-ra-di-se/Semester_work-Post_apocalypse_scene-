import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {gsap} from "gsap";

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Rock Moss material for floor
const rockmossAmbientOcclusionTexture = textureLoader.load('/textures/Rock_Moss/Rock_Moss_001_ambientOcclusion.jpg')
const rockmossColorTexture = textureLoader.load('/textures/Rock_Moss/Rock_Moss_001_basecolor.jpg')
const rockmossHeightTexture = textureLoader.load('/textures/Rock_Moss/Rock_Moss_001_height.jpg')
const rockmossNormalTexture = textureLoader.load('/textures/Rock_Moss/Rock_Moss_001_normal.jpg')
const rockmossRoughnessTexture = textureLoader.load('/textures/Rock_Moss/Rock_Moss_001_roughness.jpg')
rockmossColorTexture.wrapS = THREE.RepeatWrapping
rockmossColorTexture.wrapT = THREE.RepeatWrapping
rockmossAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
rockmossAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
rockmossNormalTexture.wrapS = THREE.RepeatWrapping
rockmossNormalTexture.wrapT = THREE.RepeatWrapping
rockmossRoughnessTexture.wrapS = THREE.RepeatWrapping
rockmossRoughnessTexture.wrapT = THREE.RepeatWrapping
rockmossHeightTexture.wrapS = THREE.RepeatWrapping
rockmossHeightTexture.wrapT = THREE.RepeatWrapping

// Metal Rusted material for Ferris wheel
const metalrustedAmbientOcclusionTexture = textureLoader.load('/textures/Metal_Rusted/Metal_Rusted_010_ambientOcclusion.jpg')
const metalrustedColorTexture = textureLoader.load('/textures/Metal_Rusted/Metal_Rusted_010_basecolor.jpg')
const metalrustedHeightTexture = textureLoader.load('/textures/Metal_Rusted/Metal_Rusted_010_height.jpg')
const metalrustedNormalTexture = textureLoader.load('/textures/Metal_RustedMetal_Rusted_010_normal.jpg')
const metalrustedRoughnessTexture = textureLoader.load('/textures/Metal_Rusted/Metal_Rusted_010_roughness.jpg')
const metalrustedMetalnessTexture = textureLoader.load('/textures/Metal_Rusted/Metal_Rusted_010_metallic.jpg')

// Ground Dirt material for Booth
const grounddirtAmbientOcclusionTexture = textureLoader.load('/textures/Ground_Dirt/Ground_Dirt_007_ambientOcclusion.jpg')
const grounddirtColorTexture = textureLoader.load('/textures/Ground_Dirt/Ground_Dirt_007_basecolor.jpg')
const grounddirtHeightTexture = textureLoader.load('/textures/Ground_Dirt/Ground_Dirt_007_height.jpg')
const grounddirtNormalTexture = textureLoader.load('/textures/Ground_Dirt/Ground_Dirt_007_normal.jpg')
const grounddirtRoughnessTexture = textureLoader.load('/textures/Ground_Dirt/Ground_Dirt_007_roughness.jpg')

// CubeTexture
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.png',
    '/textures/environmentMaps/1/nx.png',
    '/textures/environmentMaps/1/py.png',
    '/textures/environmentMaps/1/ny.png',
    '/textures/environmentMaps/1/pz.png',
    '/textures/environmentMaps/1/nz.png'
])

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('/fonts/Deutsch_Gothic_Regular.json', (font) => {
    const textGeometry = new TextGeometry('Post-apocalypse \n       scene',{
        font: font,
        size: 2,
        height: 2,
        curveSegments: 24,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
    })
    const matcapTexture = textureLoader.load('/textures/matcaps/9.jpg')
    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    const text = new THREE.Mesh(textGeometry, material)
    text.position.set(21.5,22, -19)
    text.rotation.y = - Math.PI * 0.25
    textGeometry.center()
    text.castShadow = true
    text.receiveShadow = true
    scene.add(text)

    // Rotate text
    window.addEventListener('keydown', (logkey)=>{
        if(logkey.code == 'KeyR'){
            gsap.to(text.rotation,{rotation: 360, z: 60, duration: 5})
        }
    })
})

fontLoader.load('/fonts/Deutsch_Gothic_Regular.json', (font) => {
    const textGeometry = new TextGeometry('Spin the text - press R \n' +
        'On/off text highlighting - press L \nToss the ball - press Space',{
        font: font,
        size: 0.5,
        height: 0.5,
        curveSegments: 24,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
    })
    const matcapTexture = textureLoader.load('/textures/matcaps/9.jpg')
    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    const text = new THREE.Mesh(textGeometry, material)
    text.position.set(-33,2, 38)
    textGeometry.center()
    text.castShadow = true
    text.receiveShadow = true
    scene.add(text)
})

/**
 * Ferris wheel
 */
// Material
const materialMR = new THREE.MeshStandardMaterial({
    map: metalrustedColorTexture, transparent: true,
    aoMap: metalrustedAmbientOcclusionTexture,
    displacementMap: metalrustedHeightTexture,
    normalMap: metalrustedNormalTexture,
    metalnessMap: metalrustedMetalnessTexture,
    roughnessMap: metalrustedRoughnessTexture
})

// Ferris wheel container
const ferriswheel = new THREE.Group()
ferriswheel.position.set(30,2, -20)
ferriswheel.rotation.y = - Math.PI * 0.75
ferriswheel.castShadow = true
ferriswheel.receiveShadow = true
scene.add(ferriswheel)

// Support
const support1 = new THREE.Mesh(new THREE.BoxGeometry(1, 25, 1),
    new THREE.MeshStandardMaterial(materialMR))
support1.position.y = 9
support1.rotation.x = Math.cos(Math.PI / 3)
support1.castShadow = true
support1.receiveShadow = true
ferriswheel.add(support1)

const support2 = new THREE.Mesh(new THREE.BoxGeometry(1, 25, 1),
    new THREE.MeshStandardMaterial(materialMR))
support2.position.x = 0.01
support2.position.y = 9
support2.position.z = 12
support2.rotation.x = Math.cos(2 * Math.PI / 3)
support2.castShadow = true
support2.receiveShadow = true
ferriswheel.add(support2)

const support3 = new THREE.Mesh(new THREE.BoxGeometry(1, 25, 1),
    new THREE.MeshStandardMaterial(materialMR))
support3.position.x = 5
support3.position.y = 9
support3.rotation.x = Math.cos(Math.PI / 3)
support3.castShadow = true
support3.receiveShadow = true
ferriswheel.add(support3)

const support4 = new THREE.Mesh(new THREE.BoxGeometry(1, 25, 1),
    new THREE.MeshStandardMaterial(materialMR))
support4.position.x = 5.01
support4.position.y = 9
support4.position.z = 12
support4.rotation.x = Math.cos(2 * Math.PI / 3)
support4.castShadow = true
support4.receiveShadow = true
ferriswheel.add(support4)

const support5 = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1),
    new THREE.MeshStandardMaterial(materialMR))
support5.position.x = 2.5
support5.position.y = 19.75
support5.position.z = 6
support5.rotation.z = Math.PI / 2
support5.castShadow = true
support5.receiveShadow = true
ferriswheel.add(support5)

// Wheel
const wheel1 = new THREE.Mesh(new THREE.TorusGeometry(15, 0.1, 10, 16),
    new THREE.MeshStandardMaterial(materialMR))
wheel1.position.x = 4.7
wheel1.position.y = 20
wheel1.position.z = 6
wheel1.rotation.y = Math.PI / 2
wheel1.castShadow = true
wheel1.receiveShadow = true
ferriswheel.add(wheel1)

const wheel2 = new THREE.Mesh(new THREE.TorusGeometry(15, 0.1, 10, 16),
    new THREE.MeshStandardMaterial(materialMR))
wheel2.position.x = 0.3
wheel2.position.y = 20
wheel2.position.z = 6
wheel2.rotation.y = Math.PI / 2
wheel2.castShadow = true
wheel2.receiveShadow = true
ferriswheel.add(wheel2)

const wheel3 = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.1, 10, 16),
    new THREE.MeshStandardMaterial(materialMR))
wheel3.position.x = 4.7
wheel3.position.y = 20
wheel3.position.z = 6
wheel3.rotation.y = Math.PI / 2
wheel3.castShadow = true
wheel3.receiveShadow = true
ferriswheel.add(wheel3)

const wheel4 = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.1, 10, 16),
    new THREE.MeshStandardMaterial(materialMR))
wheel4.position.x = 0.3
wheel4.position.y = 20
wheel4.position.z = 6
wheel4.rotation.y = Math.PI / 2
wheel4.castShadow = true
wheel4.receiveShadow = true
ferriswheel.add(wheel4)

// Cabine
const cabin1 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 12 ,
    2, false, Math.PI / 2, Math.PI * 1.5), new THREE.MeshStandardMaterial(materialMR))
cabin1.position.x = 2.5
cabin1.position.y = 20
cabin1.position.z = 20
cabin1.rotation.x = Math.PI / 2
cabin1.rotation.y = Math.PI
cabin1.rotation.z = -Math.PI / 2
cabin1.castShadow = true
cabin1.receiveShadow = true
ferriswheel.add(cabin1)

const cabin2 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 12 ,
    2, false, Math.PI / 2, Math.PI * 1.5), new THREE.MeshStandardMaterial(materialMR))
cabin2.position.x = 2.5
cabin2.position.y = 30
cabin2.position.z = 17
cabin2.rotation.x = Math.PI / 2
cabin2.rotation.y = Math.PI
cabin2.rotation.z = -Math.PI / 2
cabin2.castShadow = true
cabin2.receiveShadow = true
ferriswheel.add(cabin2)

const cabin3 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 12 ,
    2, false, Math.PI / 2, Math.PI * 1.5), new THREE.MeshStandardMaterial(materialMR))
cabin3.position.x = 2.5
cabin3.position.y = 2
cabin3.position.z = 5
cabin3.rotation.x = Math.PI / 2
cabin3.rotation.y = Math.PI * 0.05
cabin3.rotation.z = -Math.PI / 2
cabin3.castShadow = true
cabin3.receiveShadow = true
ferriswheel.add(cabin3)

const cabin4 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 12 ,
    2, false, Math.PI / 2, Math.PI * 1.5), new THREE.MeshStandardMaterial(materialMR))
cabin4.position.x = 2.5
cabin4.position.y = 30
cabin4.position.z = -4
cabin4.rotation.x = Math.cos(Math.PI * 0.6)
cabin4.rotation.y = Math.PI
cabin4.rotation.z = -Math.PI / 2
cabin4.castShadow = true
cabin4.receiveShadow = true
ferriswheel.add(cabin4)

const cabin5 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 12 ,
    2, false, Math.PI / 2, Math.PI * 1.5), new THREE.MeshStandardMaterial(materialMR))
cabin5.position.x = 2.5
cabin5.position.y = 20
cabin5.position.z = -9
cabin5.rotation.x = Math.cos(Math.PI * 0.96)
cabin5.rotation.y = Math.PI
cabin5.rotation.z = -Math.PI / 2
cabin5.castShadow = true
cabin5.receiveShadow = true
ferriswheel.add(cabin5)

const cabin6 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 12 ,
    2, false, Math.PI / 2, Math.PI * 1.5), new THREE.MeshStandardMaterial(materialMR))
cabin6.position.x = 2.5
cabin6.position.y = 2
cabin6.position.z = -6
cabin6.rotation.x = -Math.cos(Math.PI * 0.96)
cabin6.rotation.y = Math.PI * 0.45
cabin6.rotation.z = Math.PI / 2 * 0.75
cabin6.castShadow = true
cabin6.receiveShadow = true
ferriswheel.add(cabin6)

// Spoke
const spoke1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke1.position.x = 4.7
spoke1.position.y = 20
spoke1.position.z = 6
spoke1.castShadow = true
spoke1.receiveShadow = true
ferriswheel.add(spoke1)

const spoke2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke2.position.x = 0.3
spoke2.position.y = 20
spoke2.position.z = 6
spoke2.castShadow = true
spoke2.receiveShadow = true
ferriswheel.add(spoke2)

const spoke3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke3.position.x = 4.7
spoke3.position.y = 20
spoke3.position.z = 6
spoke3.rotation.x = Math.PI * 0.12
spoke3.castShadow = true
spoke3.receiveShadow = true
ferriswheel.add(spoke3)

const spoke4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke4.position.x = 0.3
spoke4.position.y = 20
spoke4.position.z = 6
spoke4.rotation.x = Math.PI * 0.12
spoke4.castShadow = true
spoke4.receiveShadow = true
ferriswheel.add(spoke4)

const spoke5 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke5.position.x = 4.7
spoke5.position.y = 20
spoke5.position.z = 6
spoke5.rotation.x = - Math.PI * 0.12
spoke5.castShadow = true
spoke5.receiveShadow = true
ferriswheel.add(spoke5)

const spoke6 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke6.position.x = 0.3
spoke6.position.y = 20
spoke6.position.z = 6
spoke6.rotation.x = - Math.PI * 0.12
spoke6.castShadow = true
spoke6.receiveShadow = true
ferriswheel.add(spoke6)

const spoke7 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke7.position.x = 4.7
spoke7.position.y = 20
spoke7.position.z = 6
spoke7.rotation.x = - Math.PI * 0.5
spoke7.castShadow = true
spoke7.receiveShadow = true
ferriswheel.add(spoke7)

const spoke8 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke8.position.x = 0.3
spoke8.position.y = 20
spoke8.position.z = 6
spoke8.rotation.x = - Math.PI * 0.5
spoke8.castShadow = true
spoke8.receiveShadow = true
ferriswheel.add(spoke8)

const spoke9 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke9.position.x = 4.7
spoke9.position.y = 20
spoke9.position.z = 6
spoke9.rotation.x = - Math.PI * 0.378
spoke9.castShadow = true
spoke9.receiveShadow = true
ferriswheel.add(spoke9)

const spoke10 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 30, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
spoke10.position.x = 0.3
spoke10.position.y = 20
spoke10.position.z = 6
spoke10.rotation.x = - Math.PI * 0.378
spoke10.castShadow = true
spoke10.receiveShadow = true
ferriswheel.add(spoke10)

/**
 * Fence
 */
const fence = new THREE.Group()
fence.castShadow = true
fence.receiveShadow = true
scene.add(fence)

const beamGeometry = new THREE.BoxGeometry(0.2, 4, 0.2)
const beamMaterial = new THREE.MeshStandardMaterial(materialMR)

for (let i = 0; i < 41; i++){
    const beam = new THREE.Mesh(beamGeometry, beamMaterial)
    const z = -40
    beam.position.z = z + i
    beam.position.y = 2
    beam.castShadow = true
    beam.receiveShadow = true
    fence.add(beam)
}

for (let i = 0; i < 31; i++){
    const beam = new THREE.Mesh(beamGeometry, beamMaterial)
    beam.position.x = 10
    beam.position.x += i
    beam.position.y = 2
    beam.castShadow = true
    beam.receiveShadow = true
    fence.add(beam)
}

const longrail1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 30, 0.2),
    new THREE.MeshStandardMaterial(materialMR))
longrail1.position.x = 25
longrail1.position.y = 4
longrail1.position.z = 0.0001
longrail1.rotation.z = Math.PI / 2
longrail1.castShadow = true
longrail1.receiveShadow = true
fence.add(longrail1)

const longrail2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 40, 0.2),
    new THREE.MeshStandardMaterial(materialMR))
longrail2.position.x = -0.0001
longrail2.position.y = 4
longrail2.position.z = -20
longrail2.rotation.z = Math.PI / 2
longrail2.rotation.y = Math.PI / 2
longrail2.castShadow = true
longrail2.receiveShadow = true
fence.add(longrail2)

/**
 * Swing
 */
const swing = new THREE.Group()
swing.position.set(35, -0.09, 35)
swing.rotation.y = -Math.PI / 2
swing.castShadow = true
swing.receiveShadow = true
scene.add(swing)

const supportswing1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10,0.4),
    new THREE.MeshStandardMaterial(materialMR))
supportswing1.position.x = -10
supportswing1.position.y = 5
supportswing1.position.z = 0
supportswing1.rotation.x = Math.cos(Math.PI / 3) * 0.5
supportswing1.castShadow = true
supportswing1.receiveShadow = true
swing.add(supportswing1)

const supportswing2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10,0.4),
    new THREE.MeshStandardMaterial(materialMR))
supportswing2.position.x = -10.0001
supportswing2.position.y = 5
supportswing2.position.z = 2.5
supportswing2.rotation.x = -Math.cos(Math.PI / 3) * 0.5
supportswing2.castShadow = true
supportswing2.receiveShadow = true
swing.add(supportswing2)

const supportswing3 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10,0.4),
    new THREE.MeshStandardMaterial(materialMR))
supportswing3.position.x = -20
supportswing3.position.y = 5
supportswing3.position.z = 0
supportswing3.rotation.x = Math.cos(Math.PI / 3) * 0.5
supportswing3.castShadow = true
supportswing3.receiveShadow = true
swing.add(supportswing3)

const supportswing4 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10,0.4),
    new THREE.MeshStandardMaterial(materialMR))
supportswing4.position.x = -20.0001
supportswing4.position.y = 5
supportswing4.position.z = 2.5
supportswing4.rotation.x = -Math.cos(Math.PI / 3) * 0.5
supportswing4.castShadow = true
supportswing4.receiveShadow = true
swing.add(supportswing4)

const supportswing5 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10.25,0.4),
    new THREE.MeshStandardMaterial(materialMR))
supportswing5.position.x = -15
supportswing5.position.y = 10
supportswing5.position.z = 1.25
supportswing5.rotation.z = Math.PI / 2
supportswing5.castShadow = true
supportswing5.receiveShadow = true
swing.add(supportswing5)

const swingcomponents1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 6, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
swingcomponents1.position.x = -18
swingcomponents1.position.y = 7
swingcomponents1.position.z = 1.25
swingcomponents1.castShadow = true
swingcomponents1.receiveShadow = true
swing.add(swingcomponents1)

const swingcomponents2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 6, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
swingcomponents2.position.x = -16
swingcomponents2.position.y = 7
swingcomponents2.position.z = 1.25
swingcomponents2.castShadow = true
swingcomponents2.receiveShadow = true
swing.add(swingcomponents2)

const swingcomponents3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.1, 0.8),
    new THREE.MeshStandardMaterial(materialMR))
swingcomponents3.position.x = -17
swingcomponents3.position.y = 4
swingcomponents3.position.z = 1.25
swingcomponents3.rotation.z = Math.PI / 2
swingcomponents3.castShadow = true
swingcomponents3.receiveShadow = true
swing.add(swingcomponents3)

const swingcomponents4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 6, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
swingcomponents4.position.x = -14
swingcomponents4.position.y = 7
swingcomponents4.position.z = 1.25
swingcomponents4.castShadow = true
swingcomponents4.receiveShadow = true
swing.add(swingcomponents4)

const swingcomponents5 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 6, 0.1),
    new THREE.MeshStandardMaterial(materialMR))
swingcomponents5.position.x = -12
swingcomponents5.position.y = 7
swingcomponents5.position.z = 1.25
swingcomponents5.castShadow = true
swingcomponents5.receiveShadow = true
swing.add(swingcomponents5)

const swingcomponents6 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.1, 0.8),
    new THREE.MeshStandardMaterial(materialMR))
swingcomponents6.position.x = -13
swingcomponents6.position.y = 4
swingcomponents6.position.z = 1.25
swingcomponents6.rotation.z = Math.PI / 2
swingcomponents6.castShadow = true
swingcomponents6.receiveShadow = true
swing.add(swingcomponents6)

const ball = new THREE.Mesh(new THREE.SphereGeometry(0.9,24,24),
    new THREE.MeshStandardMaterial({
        envMap: environmentMapTexture,
        envMapIntensity : 1.0,
        transparent: true,
        side: THREE.DoubleSide,
        metalness: 0.9,
        roughness: 0.01
    }))
ball.position.x = -8.9
ball.position.y = 0.9
ball.position.z = 4.1
ball.castShadow = true
ball.receiveShadow = true
swing.add(ball)

/**
 * Booth
 */
//Material
const materialGroundDirt = new THREE.MeshStandardMaterial({
    map: grounddirtColorTexture, transparent: true,
    aoMap: grounddirtAmbientOcclusionTexture,
    displacementMap: grounddirtHeightTexture,
    normalMap: grounddirtNormalTexture,
    roughnessMap: grounddirtRoughnessTexture
})

const booth = new THREE.Group()
booth.position.set(-5, 8.7, -1)
booth.rotation.z = Math.PI / 2 * 0.89
booth.castShadow = true
booth.receiveShadow = true
scene.add(booth)

const boothbasis = new THREE.Mesh(new THREE.BoxGeometry(8, 10, 6),
    new THREE.MeshStandardMaterial(materialGroundDirt))
boothbasis.position.x = -5
boothbasis.position.y = 5
boothbasis.position.z = 35
boothbasis.castShadow = true
boothbasis.receiveShadow = true
booth.add(boothbasis)

const boothroof = new THREE.Mesh(new THREE.ConeGeometry(8, 3, 4),
    new THREE.MeshStandardMaterial(materialGroundDirt))
boothroof.position.x = -5
boothroof.position.y = 11.5
boothroof.position.z = 35
boothroof.rotation.y = Math.PI * 0.25
boothroof.castShadow = true
boothroof.receiveShadow = true
booth.add(boothroof)

/**
 * Stones
 */
const stones = new THREE.Group()
stones.position.set(0,0.45,0)
stones.castShadow = true
stones.receiveShadow = true
scene.add(stones)

const stonesGeometry = new THREE.BoxGeometry(1, 1, 1)
const stonesMaterial = new THREE.MeshStandardMaterial(materialGroundDirt)

for (let i = 0; i < 250; i++) {
    const angle = Math.random() * Math.PI * 3.5
    const radius = 15 + Math.random() * 25
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    const stone = new THREE.Mesh(stonesGeometry, stonesMaterial)

    stone.position.set(x, 0.1, z)
    stone.castShadow = true
    stone.receiveShadow = true

    stone.rotation.z = (Math.random() - 0.5) * 0.4
    stone.rotation.y = (Math.random() - 0.5) * 0.4

    stones.add(stone)
}

/**
 * Airplane
 */
const loader = new GLTFLoader()
let airplane = null

loader.load( '/textures/mossy_dirty_crashed_plane/scene.gltf', function (gltf) {
    airplane = gltf.scene;
    airplane.scale.multiplyScalar(1 / 25)
    airplane.position.x = -15
    airplane.position.y = 2
    airplane.position.z = 5
    airplane.rotation.y = Math.PI * 0.25
    airplane.traverse(function(object){
        if(object.isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })
    scene.add(airplane)
})

/**
 * Scene
 */
const axesHelper = new THREE.AxesHelper(40)
axesHelper.visible = false
scene.add(axesHelper)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshStandardMaterial({
        map: rockmossColorTexture,
        aoMap: rockmossAmbientOcclusionTexture,
        displacementMap: rockmossHeightTexture,
        normalMap: rockmossNormalTexture,
        roughnessMap: rockmossRoughnessTexture
    })
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.01)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 1)
moonLight.position.set(2.296, 2.91, -3.359)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

gui.add(moonLight, 'visible').name('moonLight visible')

// Directional light
const sunLight = new THREE.DirectionalLight('#CC5500', 8)
sunLight.position.set(2.296, 2.91, -3.359)
gui.add(sunLight, 'intensity').min(0).max(100).step(0.001)
gui.add(sunLight.position, 'x').min(-5).max(20).step(0.001)
gui.add(sunLight.position, 'y').min(-5).max(20).step(0.001)
gui.add(sunLight.position, 'z').min(-5).max(20).step(0.001)
scene.add(sunLight)

sunLight.visible = false
gui.add(sunLight, 'visible').name('sunLight visible')

// Ferris wheel light
const ferriswheellight = new THREE.PointLight('#A12312', 17, 20)
ferriswheellight.position.set(21.5,22, -19)
ferriswheellight.visible = false
scene.add(ferriswheellight)

moonLight.castShadow = true
moonLight.shadow.mapSize.width = 1024
moonLight.shadow.mapSize.height = 1024
moonLight.shadow.camera.near = -100
moonLight.shadow.camera.far = 100
moonLight.shadow.camera.top = 100
moonLight.shadow.camera.right = 100
moonLight.shadow.camera.bottom = -100
moonLight.shadow.camera.left = -100
sunLight.castShadow = true
sunLight.shadow.mapSize.width = 1024
sunLight.shadow.mapSize.height = 1024
sunLight.shadow.camera.near = -100
sunLight.shadow.camera.far = 100
sunLight.shadow.camera.top = 100
sunLight.shadow.camera.right = 100
sunLight.shadow.camera.bottom = -100
sunLight.shadow.camera.left = -100
ferriswheellight.castShadow = true
ferriswheellight.shadow.mapSize.width = 1024
ferriswheellight.shadow.mapSize.height = 1024
ferriswheellight.shadow.camera.near = -100
ferriswheellight.shadow.camera.far = 100
ferriswheellight.shadow.camera.top = 100
ferriswheellight.shadow.camera.right = 100
ferriswheellight.shadow.camera.bottom = -100
ferriswheellight.shadow.camera.left = -100
ferriswheellight.castShadow = true

//CameraHelper moonLight.shadow.camera
const shadowcamerahelper = new THREE.CameraHelper(moonLight.shadow.camera);
shadowcamerahelper.visible = false
scene.add(shadowcamerahelper)

/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 100)
scene.fog = fog

gui.add(fog, 'far').min(25).max(200).step(0.01)
gui.addColor(fog, 'color').onFinishChange(fog)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', ()=>{

    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullScreenElement){

        if (canvas.requestFullscreen){
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500)
camera.position.set(10,35,45)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Event and Animate
 */
// Jumping ball
window.addEventListener('keydown', (logkey)=>{
    if(logkey.code == 'Space'){
        let tl = gsap.timeline()
        tl.to(ball.position, {y: 5, duration: 2.5})
        tl.to(ball.position, {y: 0, duration: 2.5})
        tl.seek(4);
        tl.reverse();
    }
})

// On / off Ferris Wheel Light
window.addEventListener('keydown', (logkey)=>{
    if(logkey.code == 'KeyL' & ferriswheellight.visible == false){
        ferriswheellight.visible = true
    } else if (logkey.code == 'KeyL' & ferriswheellight.visible == true) {
        ferriswheellight.visible = false
    }
})

/**
 * Tick
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()