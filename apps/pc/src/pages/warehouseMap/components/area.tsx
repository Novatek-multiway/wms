import * as THREE from "three";
import Line from "./line";
import Text2 from "./text2";
interface IArea {
	points: THREE.Vector3[];
	areaName?: string;
}

function Area({ points, areaName }: IArea) {
	const bottomLeft = points[3];
	const bottomRight = points[2];
	const textX = (bottomLeft.x + bottomRight.x) / 2;
	const textZ = bottomLeft.z - 20;
	return (
		<group>
			<Line points={points} />
			{areaName && <Text2 position={new THREE.Vector3(textX, 100, textZ)} text={areaName} />}
		</group>
	);
}

export default Area;
