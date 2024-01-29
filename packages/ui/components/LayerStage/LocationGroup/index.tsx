import { Group, Rect, Text } from 'react-konva';
import { ILocationItem } from '../interface';
import React, { memo } from 'react';

interface IProps {
  locationItem: ILocationItem;
}

function LocationGroup({ locationItem }: IProps) {
  console.log(locationItem);

  return (
    <Group {...locationItem.group}>
      <Rect {...locationItem.rect}></Rect>
      {locationItem.rowText && <Text {...locationItem.rowText}></Text>}
      {locationItem.colText && <Text {...locationItem.colText}></Text>}
      {locationItem.locationText && <Text {...locationItem.locationText}></Text>}
    </Group>
  );
}

export default memo(LocationGroup);
