import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398875

export default function App({ images }) {
  const [artworks,setArtworks] = useState([])
  useEffect(() => {
    const getArtworks = async () => {
      const artworksFromServer = await fetchArtworks()
      setArtworks(artworksFromServer)
    }

    getArtworks()
  }, [])

  // Fetch Tasks
  const fetchArtworks = async () => {
    const res = await fetch('http://localhost:5000/artworks')
    const data = await res.json()
    return data
  }

  return (
    <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} artworks={artworks} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
          />
        </mesh>
      </group>
    </Canvas>
  )
}

function Frames({ images, artworks, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025)
    state.camera.quaternion.slerp(q, 0.025)
  })
  const pexel = (filename) => `http://localhost:5000/assets/images/${filename}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
  // if (artworks.length % 2){ // odd
  const desckeys = [ "name",  "nationality",  "title",  "year",  "medium",  "size" ]
  artworks.map( (art,index) => {
    art.desc = desckeys.reduce(function(obj, key) {
      if (art.hasOwnProperty(key)) obj[key] = art[key];
      return obj;
  }, {});     
    art.url=pexel(art.filename)
    switch (true){
      case (index===0):  // center
        art.rotation=[0, 0, 0]
        art.position=[0, 0, 1.5]
        break;
      case (index<=2):  // rear
        art.rotation=[0, 0, 0]
        art.position=((index%2) ? [-0.8, 0, -0.6]:[0.8, 0, -0.6]);
        break;
      default:        
        if (index % 2){ // left
          art.rotation=[0, Math.PI / 2.5, 0]
          const multiplier = (((index+1)/2 % 2) ? 0.0375 : .1);
          // console.log(index-3,multiplier,(index-3)*multiplier)
          art.position=[-1.75+(index-3)*multiplier, 0, 0.25]
        }else{          // right 
          art.rotation=[0, -Math.PI / 2.5, 0]
          const multiplier = (((index)/2 % 2) ? 0.0375 : .1);
          // console.log(index-3,multiplier,(index-3)*multiplier)
          art.position=[1.75+(index-3)*multiplier, 0, 0.25]
        }
        break;
      }
  })
  
  const artprops = artworks.map( (art) => (
    {
        position:art.position,
        rotation:art.rotation,
        url:art.url,
        desc:Object.values(art.desc).join(' ')
      
    }) )
  
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {artprops.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef()
  const frame = useRef()
  const name = getUuid(url)
  const desc = props.desc
  
  // const name = [props.name,props.nationality,props.title,props.year,props.medium,props.size].join(' ')
  useCursor(hovered)
  useFrame((state) => {
    image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
    image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
    frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white').convertSRGBToLinear(), 0.1)
  })
  
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        { desc }
      </Text>
    </group>
  )
}
