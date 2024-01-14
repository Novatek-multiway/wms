import * as THREE from "three";
import Line from "./line";
import ShapeText from "./shapeText";

interface ITunnel {
	linePointsList: THREE.Vector3[][];
	tunnelNamePoints: THREE.Vector3;
	tunnelName: string;
}

function Tunnel({ linePointsList, tunnelName, tunnelNamePoints }: ITunnel) {
	return (
		<>
			{linePointsList.map((line, index) => (
				<Line points={line} key={index} lineColor="yellow" linewidth={3} />
			))}
			<ShapeText fontSize={14} text={tunnelName} position={tunnelNamePoints} rotation={[-Math.PI / 2, 0, 0]} />
		</>
	);
}

export default Tunnel;
