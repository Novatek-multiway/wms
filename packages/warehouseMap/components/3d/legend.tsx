import { useStore } from '../../store/index';
import { useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
// import { MwTagGroup } from "multiway";

const Legend = (props: any) => {
  const { isEmpty } = props;
  const { warehouseMap } = useStore();
  const {
    locationConfig: { locationStatus },
    locationFilter,
  } = warehouseMap;

  useEffect(() => {
    console.log('options', Object.entries(locationStatus));
    const isEmptyAry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const notEmptyAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    isEmpty
      ? warehouseMap.changeLocationFilter(notEmptyAry)
      : warehouseMap.changeLocationFilter(isEmptyAry);
  }, [isEmpty]);

  const handleChange = (data: number[]) => {
    warehouseMap.changeLocationFilter(data);
  };
  const options = useMemo(() => {
    return Object.entries(locationStatus).map(([key, value]) => ({
      value: +key,
      label: (
        <div className="legend-item" key={value.color}>
          <span style={{ background: value.color }}></span>
          <span> - {value.status}</span>
        </div>
      ),
    }));
  }, [locationStatus]);

  return (
    <div>
      <div className="legend-wrap">
        {/* <MwTagGroup options={options} multiple value={[...locationFilter]} onChange={handleChange} /> */}
      </div>
    </div>
  );
};

export default observer(Legend);
