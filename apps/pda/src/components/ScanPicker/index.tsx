import { Picker, Input, InputProps, PickerProps } from 'react-vant';
import { Arrow } from '@react-vant/icons';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  inputProps: InputProps;
  pickerProps: PickerProps;
}

export default function ScanPicker({ value, onChange, inputProps, pickerProps }: IProps) {
  const { onConfirm, ...otherProps } = pickerProps;
  const onPickerConfirm = (value: string, option: any, index: number) => {
    onChange?.(value);
    onConfirm?.(value, option, index);
  };
  return (
    <Input
      value={value}
      onChange={onChange}
      {...inputProps}
      suffix={
        <Picker value={value} popup {...otherProps} onConfirm={onPickerConfirm}>
          {(__, _, actions) => <Arrow onClick={() => actions?.open?.()} />}
        </Picker>
      }
    />
  );
}
