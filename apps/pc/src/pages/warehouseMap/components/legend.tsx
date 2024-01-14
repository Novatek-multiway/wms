import { useStore } from "@/store/index";
import { useMemo } from 'react'
import { observer } from "mobx-react-lite";
import { MwTagGroup } from 'multiway'

const Legend = () => {
	const { warehouseMap } = useStore();
	const {
		locationConfig: { locationStatus }, locationFilter
	} = warehouseMap;
	const handleChange = (data: number[]) => {
		warehouseMap.changeLocationFilter(data)
	}
	const options = useMemo(() => {
		return Object.entries(locationStatus).map(([key, value]) => ({
			value: +key, label: <div className="legend-item" key={value.color}>
				<span style={{ background: value.color }}></span>
				<span> - {value.status}</span>
			</div>
		}))
	}, [locationStatus])

	return (
		<div>
			<div className="legend-wrap">
				<MwTagGroup
					options={options}
					multiple
					value={[...locationFilter]}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default observer(Legend);
