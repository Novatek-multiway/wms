import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
interface IExtrudeMesh {
  points: THREE.Vector2[];
  options: Ioptions;
  meshProps?: ThreeElements['mesh'];
}

interface Ioptions {
  depth: number;
  style?: IMaterialStyle;
}

interface IMaterialStyle {
  color: any;
}

function ExtrudeMesh(props: IExtrudeMesh) {
  const { points, options, meshProps = {} } = props;
  const shape = new THREE.Shape();
  points.forEach((point, index) => {
    const { x, y } = point;
    if (!index) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });
  const extrudeSettings = {
    depth: options.depth,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  };
  return (
    <mesh {...meshProps}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshPhongMaterial color={options.style?.color || 0x4488ff} />
    </mesh>
  );
}

export default ExtrudeMesh;
