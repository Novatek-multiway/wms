import { MeshProps, useLoader } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';

interface IShapeText extends MeshProps {
  text: string;
  color?: any;
  fontSize?: number;
  position: THREE.Vector3;
}

function ShapeText({ text, color = '#00D1D1', fontSize = 50, position, ...other }: IShapeText) {
  const font = useLoader(FontLoader, '/wms_dashboard/FZLanTingHeiS-UL-GB_Regular.json');
  const shapes = font.generateShapes(text, fontSize);
  const geometry = new THREE.ShapeGeometry(shapes);
  const mat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  geometry.computeBoundingBox();
  const { max, min } = geometry.boundingBox;
  position.setX(position.x - (max.x - min.x) / 2);
  position.setZ(position.z + (max.y - min.y) / 4);
  return <mesh {...other} position={position} geometry={geometry} material={mat}></mesh>;
}

export default ShapeText;
