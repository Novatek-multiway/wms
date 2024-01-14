import { useOptions } from 'multiway';
import { useMemo } from 'react';
import containerServices from '@/pages/basicConfiguration/container/services';
import { getQualityStatus } from '@/pages/basicConfiguration/material/services/materialInfo';
import useLocationCodeOptions from '@/pages/shoppingBusiness/picking/hooks/useLocationCodeOptions';
import service from '../../../../services';

export default function useFormOptions() {
	const { locationCodeOptions, load } = useLocationCodeOptions();
	
	// 容器编号
	const { options: containerCodeOptions, load: reloadContainerCodeOptions } = useOptions(containerServices.getContainerList, {
		path: ["resultData"],
		keepOrigin: true,
		transform: {
			label: "itemName",
			value: "itemValue"
		}
	});
	
	const { options: qualityStatusOptions } = useOptions(getQualityStatus, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData"],
		transform: (option: { itemName: any; itemId: any }) => {
			return {
				label: option.itemName,
				value: Number(option.itemId)
			};
		}
	});

	const { options: supplierOptiolist } = useOptions(service.getContacts, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "contactName",
			value: "id"
		}
	});

	const supplierOptios = useMemo(() => supplierOptiolist.filter(option => option.isSupplier), [supplierOptiolist])

    return {
        locationCodeOptions,
        containerCodeOptions,
        qualityStatusOptions,
        supplierOptios,
		reloadContainerCodeOptions,
		refreshLocationOptions: load,
    }
}