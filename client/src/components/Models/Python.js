/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Clock } from 'three'
import { useFrame } from '@react-three/fiber'

export function Python(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/python.gltf')
  const { actions } = useAnimations(animations, group)
  console.log(actions)
  useEffect(() => {
    console.log(actions);
    actions.anime.play();
  });

  const delta =new Clock
  useFrame((clicked,delta)=>{
    group.current.rotation.y+=delta*0.5
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, 0, -1.49]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Alpha_Joints" geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
          <skinnedMesh name="Alpha_Surface" geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
        </group>
        <mesh name="Curve003" geometry={nodes.Curve003.geometry} material={materials['SVGMat.002']} position={[0, 0, -1.49]} />
        <mesh name="Curve004" geometry={nodes.Curve004.geometry} material={materials['SVGMat.003']} position={[0, 0, -1.49]} />
        <mesh name="Curve" geometry={nodes.Curve.geometry} material={materials.SVGMat} />
        <mesh name="Curve006" geometry={nodes.Curve006.geometry} material={materials['Material.002']} position={[-0.17, 1.51, -1.38]} rotation={[1.57, 0, 0]} scale={2.55}>
          <mesh name="Curve002_1" geometry={nodes.Curve002_1.geometry} material={materials['SVGMat.004']} />
          <mesh name="Curve005" geometry={nodes.Curve005.geometry} material={materials['SVGMat.005']} />
          <mesh name="Curve007" geometry={nodes.Curve007.geometry} material={materials['Material.001']} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/python.gltf')
