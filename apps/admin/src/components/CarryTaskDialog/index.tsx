import { useTranslation } from 'react-i18next';
import { OptionItem } from '@/common/hooks/useEnumOptions';
import { message } from 'antd';
import { MwButton, MwCtrl, MwDialogForm, MwDialogFormField } from 'multiway';
import { useState } from 'react';
import { getApiLocationGetAreaLocationList } from 'apis';
import type { API } from 'apis';

interface IProps {
  areaId: number;
  summit: (targetLocation: string) => Promise<any>;
}

export default function CarryTaskDialog({ areaId, summit }: IProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<OptionItem[]>([]);

  const fields: Array<MwDialogFormField> = [
    {
      title: t('目标位置'),
      key: 'targetLocation',
      type: 'select',
      options,
      required: true,
      showSearch: true,
      filterOption: (input: string, option: any) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
    },
  ];

  //  搬运
  const handleCarryTask = (res: { targetLocation: string }) => {
    return summit(res.targetLocation);
  };

  const handleOpen = () => {
    setVisible(true);
    getApiLocationGetAreaLocationList({ areaId }).then((res: API.AreaLocationDTOListR) => {
      const { locationSelectItemList = [] } = res?.resultData?.[0] ?? {};
      if (locationSelectItemList) {
        const newOptions: OptionItem[] = locationSelectItemList.map((opt) => ({
          ...opt,
          value: opt.itemValue!,
          label: opt.itemName!,
        }));
        setOptions(newOptions);
      }
    });
  };

  return (
    <>
      <>
        <MwButton onClick={handleOpen} size="small" type="primary">
          {t('搬运')}
        </MwButton>
      </>
      <MwDialogForm
        title={t('搬运')}
        visible={visible}
        fields={fields}
        centered
        okText={t('确认搬运')}
        addApi={handleCarryTask}
        onClose={() => setVisible(false)}
        onSuccess={() => message.success(t('搬运成功'))}
      />
    </>
  );
}
