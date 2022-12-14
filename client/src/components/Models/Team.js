
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useLoader, Canvas, useFrame } from "@react-three/fiber";
import { Clock } from "three";

export default function Model({ ...props }) {
  const group = useRef()
  const delta =new Clock
  useFrame((clicked,delta)=>{
    group.current.rotation.y+=delta*0.1
  })
   
  
  const { nodes, materials } = useGLTF('/teamModels.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.06}>
        <group  rotation={[Math.PI / 2, 0, 0]}>
          <group  position={[20,-30,12]} rotation={[-Math.PI / 2, 0, 0]} scale={6} >
            <mesh geometry={nodes['11_person__0'].geometry} material={materials['273_person__0']} scale={9.27} />
          </group>
          <group position={[-20,-30,36]}  rotation={[-Math.PI / 2, 0, 0]} scale={6}>
            <mesh geometry={nodes['151_person__0'].geometry} material={materials['273_person__0']} scale={8.44} />
          </group>
          <group  position={[-36,-30,20]}  rotation={[-Math.PI / 2, 0, 0]} scale={6}>
            <mesh geometry={nodes['156_person__0'].geometry} material={materials['273_person__0']} scale={8.65} />
          </group>
          <group  position={[0,-30,0]}  rotation={[-Math.PI / 2, 0, 0]} scale={6}>
            <mesh geometry={nodes['16_person__0'].geometry} material={materials['273_person__0']} scale={8} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/teamModels.gltf')