import { useTranslation } from 'react-i18next';
import {
  registerTableRender,
  RenderProps,
} from 'multiway';
import { Badge, Cascader } from 'antd';
import { last } from 'lodash';
import { InputNumber } from 'antd';

export interface AnyKeyProps {
  [key: string]: any;
}

/**
 * 根据行获取 rowKey，默认取 id
 * @param record 当前行
 * @param rowKey
 * @returns
 */
export const getRowKey = (
  record: AnyKeyProps,
  rowKey?: ((item: AnyKeyProps) => React.Key) | string
) => {
  try {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    } else if (typeof rowKey === 'string') {
      return rowKey;
    } else {
      return 'id';
    }
  } catch {
    return 'id';
  }
};
const getKey = (record: AnyKeyProps, rowKey?: ((item: AnyKeyProps) => React.Key) | string) => {
  return record[getRowKey(record, rowKey)];
};

interface CascaderOptionType {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascaderOptionType[];
  isLeaf?: boolean;
}

const getLabelsFromValues = (values: string[], options: CascaderOptionType[]): string[] => {
  const labels: string[] = [];
  let currentOptions: CascaderOptionType[] = options;

  for (const value of values) {
    const option = currentOptions.find((opt) => opt.value === value);
    if (option) {
      labels.push(option.label);
      currentOptions = option.children || [];
    } else {
      // 如果找不到对应的选项，则返回空数组
      return [];
    }
  }
  return labels;
};

registerTableRender('editable-cell-cascader', ({ text, record, field }: RenderProps) => {
  const { t } = useTranslation();
  const options = field.options || [];
  //	TODO: 暂时取labels最后一项，后续有需求再改
  const labels = Array.isArray(text) ? getLabelsFromValues(text, options) : '';
  return ({ editing, save, mode }: AnyKeyProps) => {
    return !editing ? (
      last(labels)
    ) : (
      <Cascader
        placeholder={t('请选择')}
        style={{ width: '100%' }}
        {...field.contentProps}
        displayRender={(labels: string[]) => labels[labels.length - 1]}
        options={options}
        onBlur={save}
      />
    );
  };
});

registerTableRender('status', ({ text = 0, record, field }: RenderProps) => {
  const valueEnum = field.valueEnum;
  const badgeProps = valueEnum?.[text] ?? valueEnum?.default;

  return (
    <>
      <Badge {...badgeProps} />
    </>
  );
});

registerTableRender('editable-cell-number', ({ text, field }: RenderProps) => {
  return ({ editing, mode, save }: AnyKeyProps) => {
    return !editing ? text : <InputNumber {...field.contentProps} onBlur={save} />;
  };
});
