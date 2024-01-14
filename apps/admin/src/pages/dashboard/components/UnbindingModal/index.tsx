import { Modal, message } from 'antd';
import { postPadSetLocationEmpty } from 'apis';
import React, { memo, useState } from 'react';
import type { PropsWithChildren, FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IUnbindingModalProps {
  locationId: string;
  refresh: () => void;
}

const UnbindingModal: FC<PropsWithChildren<IUnbindingModalProps>> = (props) => {
  const { locationId, refresh } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await postPadSetLocationEmpty({ locationId });
    message.success(t('解盘成功！'));
    refresh();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={onOpen}>{t('解盘')}</div>
      <Modal title={t('解盘')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{t('确定执行？')}</p>
      </Modal>
    </>
  );
};

export default memo(UnbindingModal);
