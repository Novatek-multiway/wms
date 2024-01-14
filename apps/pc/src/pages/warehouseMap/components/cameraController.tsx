import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
	const { camera, gl } = useThree();
	useEffect(() => {
		const controls = new OrbitControls(camera, gl.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.5;
		// 视角最小距离
		controls.minDistance = 0;
		// 视角最远距离
		controls.maxDistance = 2000;
		// 最大角度
		controls.maxPolarAngle = Math.PI / 2.2;
		return () => {
			controls.dispose();
		};
	}, [camera, gl]);
	return null;
};

export default CameraController;
