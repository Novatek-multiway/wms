import { Badge, } from 'antd';
import { useSpring, animated } from 'react-spring';
import { useMemo } from 'react';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

interface IProps {
  label: string;
  left?: number;
  right?: number;
}

export default function ProgressBar({ label, left, right }: IProps) {
  const { t } = useTranslation();
  const radio = useMemo(() => {
    if (isNil(left) && isNil(right)) {
      return '0%';
    }
    const radio = ~~((left! / (left! + right!)) * 100);
    return radio + '%';
  }, [left, right]);

  const radioProps = useSpring({
    width: radio,
  });

  return (
    <div className="ProgressBar flex items-center">
      <div className="mr-1">
        {label}(
        <Badge text={t('empty')} color="#00b96b" /> / <Badge text={t('full')} color="#1677ff" />
        ): {left} / {right}
      </div>
      <div className="h-2 w-24 bg-[#1677ff] rounded-lg">
        <animated.div style={radioProps} className="bg-[#00b96b] h-2 rounded-lg"></animated.div>
      </div>
      <div className="ml-1">{isNil(left) && isNil(right) ? 0 : left! + right!}</div>
    </div>
  );
}
