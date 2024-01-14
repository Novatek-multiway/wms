import { isEqual, uniqWith } from 'lodash';
import React, { memo, useMemo } from 'react';
import { Group, Line, Rect } from 'react-konva';
import { IBarrierProps } from '../interface';

const SPACING = 5;
function BarrierGroup(props: IBarrierProps) {
  const { x, y, width, height } = props;
  const points = useMemo(() => {
    const newPoints = [[x + width - height, y, x + width, y + height]];
    for (let i = 0; i <= (width - height) / SPACING; i++) {
      newPoints.push([x + i * SPACING, y, x + height + SPACING * i, y + height]);
    }
    for (let i = 0; i <= height / SPACING; i++) {
      newPoints.push([x, y + SPACING * i, x + height - SPACING * i, y + height]);
      newPoints.push([x + width - SPACING * i, y, x + width, y + SPACING * i]);
    }
    return uniqWith(newPoints, isEqual);
  }, [x, y, width, height]);
  return (
    <Group>
      <Rect {...props} stroke={'#000'} strokeWidth={1}></Rect>
      {points.map((point) => (
        <Line
          points={point}
          stroke={'#000'}
          strokeWidth={1}
          key={JSON.stringify(point) + props.id}
        ></Line>
      ))}
    </Group>
  );
}

export default memo(BarrierGroup);
