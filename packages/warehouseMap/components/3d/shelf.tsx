import * as THREE from 'three';
import { useStore } from '../../store/index';

interface IShelf {
  numX: number;
  numY: number;
  numZ: number;
  position: THREE.Vector3;
}

function Shelf(props: IShelf) {
  const { position, numX, numZ, numY } = props;
  const { warehouseMap } = useStore();
  const {
    shelfConfig: {
      binLength,
      binWidth,
      binHeight,
      holderHeight,
      bottomHeight,
      rackLength,
      rackWidth,
      intervalRackNum,
      shelfMatColor,
    },
  } = warehouseMap;

  const binXNum = numX; //库位X轴方向库位数量
  const binZNum = numZ; //库位Z轴方向库位数量
  const binYNum = numY; //库位Y轴库位数量
  // 支架的高=最底层的高度+(库位数-1)*库位的高度
  const rackHeight = bottomHeight + (binYNum - 1) * binHeight;
  // 支架的宽=库位数乘以库位的宽度
  const shelfLength = binXNum * binWidth;
  const rackGeometry = new THREE.BoxGeometry(rackLength, rackHeight, rackWidth); //定义一个支架网格
  const planeGeometry = new THREE.BoxGeometry(shelfLength, holderHeight, 2);
  const colPlaneGeometry = new THREE.BoxGeometry(2, holderHeight, binWidth);
  const shelfMat = new THREE.MeshLambertMaterial({ color: shelfMatColor }); // 定义支架和托盘的材质
  const rackList: THREE.Vector3[] = getRackList();
  const planeList: THREE.Vector3[] = getPlaneList();
  const colPlaneList: THREE.Vector3[] = getColPlaneList();
  function getRackList() {
    const list: THREE.Vector3[] = [];
    for (let j = 0; j < binZNum + 1; j++) {
      const posZ = position.z + binWidth * j;
      for (let i = 0; i < binXNum + 1; i++) {
        const isRack = i % intervalRackNum === 0 || i === binXNum;
        if (isRack) {
          const posX = position.x + binLength * i;
          list.push(new THREE.Vector3(posX, position.y + rackHeight / 2, posZ));
        }
      }
    }
    return list;
  }

  function getPlaneList() {
    const list: THREE.Vector3[] = [];
    const posX = position.x + (binLength * binXNum) / 2;
    for (let j = 0; j < binZNum; j++) {
      const posZ = position.z + binWidth * j;
      for (let i = 0; i < binYNum; i++) {
        const posY = position.y + bottomHeight + binHeight * i - holderHeight / 2;
        list.push(new THREE.Vector3(posX, posY, posZ + 1));
        list.push(new THREE.Vector3(posX, posY, posZ + binWidth - 1));
      }
    }
    return list;
  }

  function getColPlaneList() {
    const list: THREE.Vector3[] = [];
    for (let j = 0; j < binZNum; j++) {
      const posZ = position.z + binWidth * j + binWidth / 2;
      for (let i = 0; i < binYNum; i++) {
        const posY = position.y + bottomHeight + binHeight * i - holderHeight / 2;
        list.push(new THREE.Vector3(position.x, posY, posZ));
        list.push(new THREE.Vector3(position.x + shelfLength, posY, posZ));
      }
    }
    return list;
  }

  return (
    <group>
      {rackList &&
        rackList.map((pos, index) => (
          <mesh key={index} position={pos} geometry={rackGeometry} material={shelfMat} />
        ))}
      {planeList &&
        planeList.map((pos, index) => (
          <mesh key={index} position={pos} geometry={planeGeometry} material={shelfMat} />
        ))}
      {colPlaneList &&
        colPlaneList.map((pos, index) => (
          <mesh key={index} position={pos} geometry={colPlaneGeometry} material={shelfMat} />
        ))}
    </group>
  );
}

export default Shelf;
