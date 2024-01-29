import {
  memo,
  useCallback,
  useRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { reset, setLocationId, setPosition, setVisible, useDispatch } from 'store';
import { LayerStage } from 'ui';
import useCanvasData from '../../hooks/useCanvasData';
import { last } from 'lodash';

import type { API } from 'apis';
import type { LayerStageProps, LayerStageRef } from 'ui';

interface IPosition {
  left: number;
  top: number;
}

interface IProps {
  canvasData: API.OutputLayerTileDTO;
  size: { width: number; height: number };
  activeStatusList: number[];
  shouldDisplayText: boolean;
  konvaTitle: string;
}

export interface ILayerRef {
  toCenter: () => void;
}

const LayerS: ForwardRefRenderFunction<ILayerRef, IProps> = (
  { konvaTitle, canvasData, size, activeStatusList, shouldDisplayText },
  ref
) => {
  const dispatch = useDispatch();
  const stageRef = useRef<LayerStageRef>(null);

  const props = useCanvasData({
    canvasData,
    size,
    activeStatusList,
    shouldDisplayText,
  });

  const hide = useCallback(() => {
    dispatch(reset());
  }, []);

  const active = ({ id, position }: { id: string; position: IPosition }) => {
    dispatch(setLocationId(id));
    dispatch(setVisible(true));
    dispatch(setPosition(position));
  };

  const calcPosition = (position: IPosition) => {
    const newPosition: IPosition = {
      left: position.left + 20,
      top: position.top - 50,
    };
    const innerHeight = window.innerHeight - 55 - 42;
    const isBottom = innerHeight - newPosition.top - 222 < 0;
    if (isBottom) {
      newPosition.top = newPosition.top - 222;
    }
    return newPosition;
  };

  const onClickLocation: LayerStageProps['onClickLocation'] = (e) => {
    const newLocationId = last(e.target.attrs?.name?.split('location-rect-')) as string;
    const position = calcPosition({ left: e.evt.clientX, top: e.evt.clientY });
    active({ id: newLocationId, position });
  };

  const onTapLocation: LayerStageProps['onTapLocation'] = (e) => {
    const newLocationId = last(e.target.attrs?.name?.split('location-rect-')) as string;
    const position = calcPosition({
      left: e.evt.changedTouches[0].clientX,
      top: e.evt.changedTouches[0].clientY,
    });
    active({ id: newLocationId, position });
  };

  useImperativeHandle(ref, () => ({
    toCenter: () =>
      stageRef?.current?.toCenter(
        { x: props?.stageSize?.offsetX, y: props?.stageSize?.offsetY },
        props?.stageSize?.scaleX
      ),
  }));

  return (
    <LayerStage
      ref={stageRef}
      {...props}
      konvaTitle={konvaTitle}
      onClickOutSide={hide}
      onClickLocation={onClickLocation}
      onTapLocation={onTapLocation}
    />
  );
};

export default memo(forwardRef(LayerS));
