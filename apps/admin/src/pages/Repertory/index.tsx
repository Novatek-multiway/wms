import { useTranslation } from 'react-i18next';
import { Input, Radio, RadioChangeEvent, Select, Space } from 'antd';
import {
  postPadContainerInventoryGetPageContainerInventory,
  postPadMaterialInventoryGetPageData,
} from 'apis';
import { MwSearchTable, MwSearchTableField, setDefaultDataFilter } from 'multiway';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SCANNER_REPERTORY_TASKCODE } from '@/common/constants';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import ScannerInput from '@/components/ScannerInput';

import type { API } from 'apis';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';

const materialItemDescriptionOptions = [
  {
    value: 1,
    label: '小包',
  },
  {
    value: 2,
    label: '吨包',
  },
];

function Repertory() {
  const { t } = useTranslation();
  setDefaultDataFilter((res: API.OutputTaskInfoDTOPageResultR) => {
    return {
      content: res?.resultData?.pageData ?? 0,
      totalCount: res?.resultData?.totalCount ?? 0,
      ...res,
    };
  });

  useScannerCodeEffect(SCANNER_REPERTORY_TASKCODE, (code) => {
    setTaskCode(code);
    tableRef.current?.refresh();
  });

  const [isMaterial, setIsMaterial] = useState(true);
  const [taskCode, setTaskCode] = useState('');
  const [carryStatus, setCarryStatus] = useState<number[]>([]);

  const tableRef = useRef<any>(null);

  const { options: carryStatusOptions } = useEnumOptions('EnumCarryStatus', 'itemId', false);
  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);

  const materialFields: Array<MwSearchTableField> = [
    {
      title: t('容器编号'),
      key: 'containerCode',
      //  width: '200px',
    },
    {
      title: t('LPN'),
      key: 'lpn',
      //  width: '200px',
    },
    {
      title: t('制品种类'),
      key: 'productType',
      //  width: '200px',
    },
    {
      title: t('制品名称'),
      key: 'productName',
      //  width: '200px',
    },
    {
      title: t('等级'),
      key: 'grade',
      //  width: '200px',
    },
    {
      title: t('尾箱区分'),
      key: 'boxType',
      //  width: '200px',
    },
    {
      title: t('码垛包数'),
      key: 'stackQuantity',
      //  width: '200px',
    },
    {
      title: t('码垛层'),
      key: 'stackLayer',
      //  width: '200px',
    },
    {
      title: t('码垛位'),
      key: 'stackLocation',
      //  width: '200px',
    },
    {
      title: t('国家'),
      key: 'country',
      //  width: '200px',
    },
    {
      title: t('出料日'),
      key: 'outDate',
      //  width: '200px',
    },
    {
      title: t('颜色'),
      key: 'colour',
      //  width: '200px',
    },
    {
      title: t('BAG番号'),
      key: 'bag',
      //  width: '200px',
    },
    {
      title: t('重量'),
      key: 'weight',
      //  width: '200px',
    },
    {
      title: t('供应商CD'),
      key: 'supplierCD',
      //  width: '200px',
    },
    {
      title: '包装方式',
      key: 'materialItemDescription',
      options: materialItemDescriptionOptions,
    },
    {
      title: t('容器位置'),
      key: 'customCode',
      //  width: '200px',
    },
    {
      title: t('物料编码'),
      key: 'materialCode',
      //  width: '200px',
      render: (text: string, record: API.OutputInventoryInfoDTO) =>
        `${text}(${record.materialName})`,
    },
    {
      title: t('规格'),
      key: 'materialSize',
      //  width: 120,
    },
    {
      title: t('质量状态'),
      key: 'qualityStatus',
      //  width: 120,
      options: qualityStatusOptions,
    },
    {
      title: t('物料入库数量'),
      key: 'inQuantity',
      //  width: 120,
    },
    {
      title: t('物料出库数量'),
      key: 'outQuantity',
      //  width: 120,
    },
    {
      title: t('剩余数量'),
      key: 'currentQuantity',
      //  width: 120,
    },
    {
      title: t('批次号'),
      key: 'batchNumber',
      //  width: 120,
    },
    {
      title: t('创建时间'),
      //  width: 180,
      key: 'createTime',
    },
  ];

  const containerFields: Array<MwSearchTableField> = [
    {
      title: t('容器编号'),
      key: 'containerCode',
      //  width: '200px',
    },
    {
      title: t('容器类型'),
      key: 'containerTypeName',
      //  width: '200px',
    },
    {
      title: t('载货状态'),
      key: 'carryStatus',
      //  width: '200px',
      options: carryStatusOptions,
    },
    {
      title: t('库存数量'),
      key: 'containerQuantity',
      //  width: '200px',
    },
    {
      title: t('所处位置'),
      key: 'customCode',
      //  width: '200px',
    },
    {
      title: t('所属区域'),
      key: 'areaCode',
      //  width: '200px',
      render: (text, record: API.ContainerInventoryDTO) => `${text}(${record?.areaName})`,
    },
  ];

  const handleRadioChange = (e: RadioChangeEvent) => {
    setIsMaterial(e.target.value);
    tableRef?.current.refresh();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskCode(e.target.value);
    tableRef?.current.refresh();
  };

  const handleSelectChange = (e: number) => {
    setCarryStatus(e);
    tableRef?.current.refresh();
  };

  const api = (res: any) => {
    const {
      pagination: { current, pageSize },
    } = res;
    if (isMaterial) {
      const data: API.QueryInventoryPageingParameter = {
        pageIndex: current,
        pageSize,
        query: {
          materialCode: taskCode,
        },
      };
      return postPadMaterialInventoryGetPageData(data);
    }
    const data: API.QueryContianerInventoryPageingParameter = {
      pageIndex: current,
      pageSize,
      query: {
        containerCode: taskCode,
        carryStatusList: carryStatus,
      },
    };
    return postPadContainerInventoryGetPageContainerInventory(data);
  };

  return (
    <MwSearchTable
      extraVisible={false}
      ref={tableRef}
      api={api}
      fields={isMaterial ? materialFields : containerFields}
      rowKey="id"
      scrollX={800}
      title={
        <>
          <Radio.Group value={isMaterial} buttonStyle="solid" onChange={handleRadioChange}>
            <Radio.Button value={true}>{t('物料')}</Radio.Button>
            <Radio.Button value={false}>{t('容器')}</Radio.Button>
          </Radio.Group>
          <ScannerInput
            value={taskCode}
            onChange={handleInputChange}
            scannerKey={SCANNER_REPERTORY_TASKCODE}
            placeholder={isMaterial ? t('请输入物料号，可以扫码') : t('请输入容器编号或扫码')}
          />

          {!isMaterial && (
            <Select
              value={carryStatus}
              options={carryStatusOptions}
              mode="multiple"
              placeholder={t('请选择载货状态')}
              className="w-32"
              onChange={handleSelectChange}
            />
          )}
        </>
      }
    ></MwSearchTable>
  );
}

export default Repertory;
