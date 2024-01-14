import { useEffect, useState } from 'react';
import { PickerColumnOption } from 'react-vant';

export default function useOptions<T>(
  service: () => Promise<T[]>,
  format: (opt: T) => T & PickerColumnOption
) {
  const [options, setOptions] = useState<(PickerColumnOption & T)[]>([]);
  const run = () =>
    service?.().then((res) => {
      const newOptions = res.map(format);
      setOptions(newOptions);
    });
  useEffect(() => {
    run();
  }, []);
  return { options, run };
}
