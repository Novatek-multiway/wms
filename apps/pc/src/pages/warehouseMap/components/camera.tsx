import * as THREE from "three";

function initCamera() {
	// 采用透视相机
	const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
	// 设置相机位置，threejs中的坐标系采用的是右手坐标系
	camera.position.x = 0;
	camera.position.y = 600;
	camera.position.z = 2000;
	//相机的朝向
	camera.lookAt(0, 0, 0);
	return camera;
}

export default initCamera;
