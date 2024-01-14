import Konva from 'konva';
import React, { memo, useEffect, useRef, ForwardRefRenderFunction, useImperativeHandle, forwardRef } from 'react';
import { Group, Layer, Line, Rect, Stage, Text } from 'react-konva';
import BarrierGroup from './BarrierGroup';
import { IAreaProps, IBarrierProps, IshelfMatrix } from './interface';
import LocationGroup from './LocationGroup';
import './hammer-konva';

export interface IProps {
  konvaTitle: string;
  customAreaList: IAreaProps[];
  roadwayList: IAreaProps[];
  barrierList: IBarrierProps[];
  shelfList: IshelfMatrix[];
  stageSize: Omit<Konva.StageConfig, 'container'>;
  scaleX?: number;
  scaleY?: number;
  onClickLocation: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onTapLocation: (e: Konva.KonvaEventObject<any>) => void;
  onClickOutSide: () => void;
}

export interface IRef {
  toCenter: (position: { x: number; y: number; }, scale: number) => void
}

const LayerStage: ForwardRefRenderFunction<IRef, IProps> = ({
  konvaTitle,
  customAreaList,
  roadwayList,
  barrierList,
  shelfList,
  stageSize,
  onClickLocation,
  onClickOutSide,
  onTapLocation,
}, ref) => {
  const stageRef = useRef<Konva.Stage>(null);

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    if ((e.target.attrs?.name ?? '').startsWith('location-rect-')) {
      onClickLocation?.(e);
    } else {
      onClickOutSide?.();
    }
  };

  // pc端滚动事件
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = e.target.getStage()!;
    const oldScale = stage.scaleX()!;

    const pointer = stage.getPointerPosition()!;

    const mousePointTo = {
      x: (pointer.x - stage.x()!) / oldScale,
      y: (pointer.y - stage.y()!) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    stage?.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage?.position(newPos);
    stage?.batchDraw();
  };

  let lastCenter = {
    x: stageSize.width! / 2,
    y: stageSize.height! / 2,
  };

  let lastScale = 1;

  useImperativeHandle(ref, () => ({
    toCenter: (position, scale) => {
      stageRef.current?.offset(position)
      stageRef.current?.position({ x: 0, y: 0 });
      stageRef.current?.scale({
        x: scale,
        y: scale
      })
    }
  }))

  useEffect(() => {
    const hammertime = new Hammer(stageRef.current, { domEvents: true });
    hammertime.get('pinch').set({ enable: true });
    stageRef.current?.on('pinch', (event) => {
      const stage = event.target.getStage()!;
      const scale = event.evt.gesture.scale * lastScale;
      const pointer1 = {
        x: event.evt.gesture.pointers[0].clientX,
        y: event.evt.gesture.pointers[0].clientY,
      };
      const pointer2 = {
        x: event.evt.gesture.pointers[1].clientX,
        y: event.evt.gesture.pointers[1].clientY,
      };
      const newCenter = {
        x: ~~((pointer1.x + pointer2.x) / 2),
        y: ~~((pointer1.y + pointer2.y) / 2),
      };
      const pointTo = {
        x: (newCenter.x - stage.x()!) / stage.scaleX()!,
        y: (newCenter.y - stage.y()!) / stage.scaleX()!,
      };
      const dx = newCenter.x - lastCenter.x;
      const dy = newCenter.y - lastCenter.y;
      const newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };
      stage?.stopDrag();
      stage?.draggable(false);
      stage?.scaleX(scale);
      stage?.scaleY(scale);
      stage?.position(newPos);
      stage?.draggable(true);
      stage?.batchDraw();
      lastCenter = newCenter;
    });

    stageRef.current?.on('pinchend', (event) => {
      lastScale = event.target?.getStage()?.scaleX();
    });

    stageRef.current?.on('tap', (event) => {
      event.cancelBubble = true;

      if ((event.target.attrs?.name ?? '').startsWith('location-rect-')) {
        onTapLocation?.(event);
      } else {
        onClickOutSide?.();
      }
    });
  }, []);

  return (
    <Stage
      {...stageSize}
      ref={stageRef}
      draggable={true}
      onWheel={handleWheel}
      onClick={handleStageClick}
    >
      <Layer name="layer-canvas">
        <Group name="layer-customArea">
          {customAreaList.map((customArea) => (
            <Group {...customArea.group} key={customArea.id}>
              <Rect {...customArea.rect}></Rect>
              <Text {...customArea.text}></Text>
            </Group>
          ))}
        </Group>
        <Group name="layer-roadway">
          {roadwayList.map((roadway) => (
            <Group {...roadway.group} key={roadway.id}>
              <Rect {...roadway.rect}></Rect>
              <Text {...roadway.text}></Text>
            </Group>
          ))}
        </Group>

        <Group name="layer-barrier">
          {barrierList.map((barrier) => (
            <BarrierGroup {...barrier} key={barrier.id} />
          ))}
        </Group>
        <Group name="layer-shelf">
          {shelfList.map((shelf) => (
            <Group key={JSON.stringify(shelf)}>
              {shelf.locationMatrix?.length && (
                <Group key={shelf.id} {...shelf.matrixGroup}>
                  {shelf.locationMatrix.map((locationRow) => (
                    <Group key={JSON.stringify(locationRow)}>
                      {locationRow.map((location) => (
                        <>
                          {location && <LocationGroup locationItem={location} key={location.id} />}
                        </>
                      ))}
                    </Group>
                  ))}
                </Group>
              )}
            </Group>
          ))}
        </Group>
        <Line 
          points={[0, 0, 0, stageSize.height, stageSize.width, stageSize.height, stageSize.width, 0, 0, 0]} 
          stroke={'#000'} 
          strokeWidth={2}
        ></Line>
        <Text width={stageSize.width} text={konvaTitle} x={0} y={-40} align='center' fontSize={32} fill='#000' fontStyle="bold"></Text>
      </Layer>
    </Stage>
  );
}

export default memo(forwardRef(LayerStage));
