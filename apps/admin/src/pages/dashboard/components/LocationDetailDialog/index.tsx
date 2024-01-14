import { useTranslation } from 'react-i18next';
import { Descriptions } from 'antd';
import { GetLocationDetailById } from 'apis';
import { MwButton, MwDialog } from 'multiway';
import React, { memo, useMemo, useState } from 'react';
import useEnumMap from '@/common/hooks/useEnumMap';
import { Divider } from 'antd';
import type { API } from 'apis';
import { useAppDispatch } from 'hooks';
import { reset } from 'store';
interface IProps {
  locationId: string;
}

function LocationDetailDialog({ locationId }: IProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [detatil, setDetatil] = useState<API.OutputLocationDetailDTO>();
  const dispatch = useAppDispatch();

  const onOpen = async () => {
    setVisible(true);
    runPos();
    runLoc();
    runQua();
    // @ts-ignore
    const res = await GetLocationDetailById({ id: locationId });
    setDetatil(res.resultData);
  };

  const { map: positionTypeMap, run: runPos } = useEnumMap('EnumPositionType', 'itemId', true);
  const { map: locationStatusMap, run: runLoc } = useEnumMap('EnumLocationStatus', 'itemId', true);
  const { map: qualityStatusMap, run: runQua } = useEnumMap('EnumQualityStatus', 'itemId', true);

  const desList = useMemo(
    () => [
      {
        label: t('货位编号'),
        value: detatil?.customCode,
      },
      {
        label: t('位置类型'),
        value: positionTypeMap?.[detatil?.positionType ?? 0]?.label,
      },
      {
        label: t('报警状态'),
        value: detatil?.isAlarm ? t('报警') : t('无报警'),
      },
      {
        label: t('货位状态'),
        value: locationStatusMap?.[detatil?.locationStatus ?? 0]?.label,
      },
      {
        label: t('空满状态'),
        value: detatil?.isFull ? t('满') : t('空'),
      },
      {
        label: t('允许入库'),
        value: detatil?.allowStockIn ? '✔' : '✖',
      },
      {
        label: t('允许出库'),
        value: detatil?.allowStockOut ? '✔' : '✖',
      },
      {
        label: t('是否盘点中'),
        value: detatil?.isStocktaking ? '✔' : '✖',
      },
    ],

    [detatil, locationStatusMap, positionTypeMap]
  );

  const inventoryMatrix = useMemo(
    () =>
      (detatil?.inventoryList ?? [])?.map((inventory) => [
        {
          label: t('容器编号'),
          value: inventory?.containerCode,
        },
        {
          label: t('物料编码'),
          value: `${inventory?.materialCode}(${inventory?.materialName})`,
        },
        {
          label: t('物料规格'),
          value: inventory?.materialSize,
        },
        {
          label: t('批次号'),
          value: inventory?.batchNumber,
        },
        {
          label: t('质量状态'),
          value: qualityStatusMap[inventory?.qualityStatus ?? '']?.label,
        },
        {
          label: t('库存数量'),
          value: inventory?.currentQuantity,
        },
        {
          label: t('有效期（天）'),
          value: inventory?.expiresDays,
        },
        {
          label: t('收货日期'),
          value: inventory?.receivingDate,
        },
      ]),

    [detatil, qualityStatusMap]
  );

  return (
    <>
      <div onClick={onOpen}>{t('库位详情')}</div>

      <MwDialog
        centered
        title={t(
          '{{canvasRow}}排{{canvasColumn}}列{{locationLayer}}层  ({{mainXaxis}},{{mainYaxis}})',
          {
            canvasRow: detatil?.canvasRow,
            canvasColumn: detatil?.canvasColumn,
            locationLayer: detatil?.locationLayer,
            mainXaxis: detatil?.mainXaxis,
            mainYaxis: detatil?.mainYaxis,
          }
        )}
        visible={visible}
        onClose={() => {
          setVisible(false);
          dispatch(reset());
        }}
        bodyStyle={{ maxHeight: 250, overflow: 'auto' }}
        confirmVisible={false}
      >
        <Descriptions column={1} size="small">
          {desList.map((des, index) => (
            <Descriptions.Item label={des.label} key={des.label + index}>
              {des.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
        {inventoryMatrix.map((list, idx) => (
          <div key={JSON.stringify(list) + idx + 'wrapper'}>
            <Divider dashed className="border-indigo-600" />
            <Descriptions column={1} size="small" className="mt-2">
              {list.map((des, index) => (
                <Descriptions.Item label={des.label} key={des.label + index}>
                  {des.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        ))}
      </MwDialog>
    </>
  );
}

export default memo(LocationDetailDialog);
