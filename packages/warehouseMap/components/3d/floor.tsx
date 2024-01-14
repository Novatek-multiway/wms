import * as THREE from 'three';
import ExtrudeMesh from './extrudeMesh';

interface IFloor {
  points: THREE.Vector2[];
}

function Floor(props: IFloor) {
  const { points } = props;
  return (
    <ExtrudeMesh
      points={points}
      options={{ depth: 2, style: { color: '#e0e2e8' } }}
      meshProps={{ rotation: [Math.PI / 2, 0, 0] }}
    />
  );
}

export default Floor;
