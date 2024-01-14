import * as THREE from 'three';
import { useRef, useLayoutEffect } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Line2 } from 'three/examples/jsm/lines/Line2';

extend({ LineMaterial, LineGeometry, Line2 });
interface ILine {
  points: THREE.Vector3[];
  linewidth?: number;
  lineColor?: any;
}

export default function Line({ linewidth = 1, lineColor = 0x4488ff, points }: ILine) {
  const { size } = useThree();
  const ref = useRef();
  useLayoutEffect(() => {
    const curve = new THREE.CatmullRomCurve3(points, false /*是否闭合*/, 'catmullrom', 0.000000001);
    const linePoints = curve.getPoints(100).reduce((acc, { x, y, z }) => [...acc, x, y, z], [], []);
    ref.current.setPositions(linePoints);
  }, []);
  return (
    <line2>
      <lineGeometry ref={ref} />
      <lineMaterial
        color={lineColor}
        linewidth={linewidth}
        resolution={[size.width, size.height]}
      />
    </line2>
  );
}
