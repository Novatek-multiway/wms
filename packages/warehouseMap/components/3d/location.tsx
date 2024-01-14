import * as THREE from 'three';
import LocationInfo from './locationInfo';
import { notification } from 'antd';
import { EffectComposer, Selection, Select, Outline } from '@react-three/postprocessing';
import { useEffect, useState, useMemo } from 'react';
import { useStore } from '../../store/index';
import { observer } from 'mobx-react-lite';

interface ILocation {
  locationList: ILocationItem[];
}

interface ILocationItem {
  position: THREE.Vector3;
  state: number;
  [props: string]: any;
}

function Location(props: ILocation) {
  useEffect(() => {
    return () => notification.destroy();
  }, []);
  const { locationList } = props;
  const [clickedIndex, setClickedIndex] = useState(-1);
  const { warehouseMap } = useStore();
  const {
    locationConfig: { length, width, height, locationStatus },
    locationFilter,
  } = warehouseMap;

  const materialHash = Object.entries(locationStatus).reduce((acc, [key, value]) => {
    acc[key] = new THREE.MeshLambertMaterial({
      color: value.color,
      transparent: true,
      opacity: 0.7,
    });
    return acc;
  }, {} as Record<string, THREE.MeshLambertMaterial>);
  const showLocationList = useMemo(() => {
    let res = locationList;
    if (locationFilter.length) {
      res = res.filter((item) => locationFilter.includes(item.state));
    }
    return res;
  }, [locationFilter]);

  const locationGeometry = new THREE.BoxGeometry(length, width, height);

  function handleClick(index: number, locationItem: ILocationItem) {
    return;
    console.log('handleClick', index, locationItem, clickedIndex);
    if (index === clickedIndex) return;
    const { canvasRow, canvasColumn, zaxis, xaxis = 0, yaxis = 0 } = locationItem;
    setClickedIndex(index);
    notification.destroy();
    notification.open({
      message: `${canvasRow}排 ${canvasColumn}列 ${zaxis}层 (${xaxis}, ${yaxis})`,
      description: <LocationInfo id={locationItem.id} />,
      duration: 0,
      onClose: () => {
        setClickedIndex(-1);
      },
    });
  }

  return (
    <Selection>
      {/* <EffectComposer enabled={clickedIndex >= 0} autoClear={false}>
        <Outline hiddenEdgeColor="#99c4ac" edgeStrength={3} />
      </EffectComposer> */}
      <group>
        {locationList &&
          showLocationList.map((location, index) => (
            <Select key={index} enabled={clickedIndex === index}>
              <mesh
                onClick={() => handleClick(index, location)}
                position={location.position}
                geometry={locationGeometry}
                material={materialHash[location.state]}
              />
            </Select>
          ))}
      </group>
    </Selection>
  );
}

export default observer(Location);
