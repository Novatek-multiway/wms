import useConvertorRequest from "@/hooks/useConvertorRequest";
import { useOptions } from "multiway";
import { getWorkbenchData } from "@/pages/basicConfiguration/material/services/materialFile";
import { getMaterialForm } from "@/pages/basicConfiguration/material/services/materialForm";
import { getQualityStatus } from "@/pages/basicConfiguration/material/services/materialInfo";
import containerServices from "@/pages/basicConfiguration/container/services";

import service from "../../../../services";

export default function useFormOptions() {
    const locationCodeOptions = useConvertorRequest(getWorkbenchData, item => ({
		label: item.workbenchName + item.locationCode,
		value: item.locationCode
	}));
	const materialModelOptions = useConvertorRequest(getMaterialForm, { label: "materialModelName", value: "id" }); //物料型号
	// 容器编号
	const { options: containerCodeOptions } = useOptions(containerServices.getContainerData, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "containerCode",
			value: "containerCode"
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
	const { options: receiptOptions, data: receiptData } = useOptions(service.postReceiptHeaderList, {
		params: { pageIndex: 1, pageSize: 200 },
		keepOrigin: true,
		path: ["resultData", "pageData"],
		transform: (option: { itemName: any; itemId: any }) => {
			return {
				label: option.receiptCode,
				value: option.id
			};
		}
	});
	const { options: supplierOptios } = useOptions(service.getContacts, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "contactName",
			value: "id"
		}
	});
    return {
        locationCodeOptions,
        materialModelOptions,
        containerCodeOptions,
        qualityStatusOptions,
        receiptOptions,
        receiptData,
        supplierOptios
    }
}