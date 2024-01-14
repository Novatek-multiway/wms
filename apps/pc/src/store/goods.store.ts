import { OptionItem } from "@/hooks/useConvertorRequest";
import { makeAutoObservable } from "mobx";

// 全局配置
class GoodsStore {
	constructor() {
		makeAutoObservable(this);
	}
	editTableRef = null;

	qualityStatusOptions: OptionItem[] = [];
	stocktakeRecordStatusOptions: OptionItem[] = [];
	positionTypeOptions: OptionItem[] = [];

	setTableRef = (val: any) => {
		this.editTableRef = val;
	};

	setQualityStatusOptions = (options: OptionItem[]) => {
		this.qualityStatusOptions = options;
	}

	setStocktakeRecordStatusOptions = (options: OptionItem[]) => {
		this.stocktakeRecordStatusOptions = options;
	}

	setPositionTypeOptions = (options: OptionItem[]) => {
		this.positionTypeOptions = options;
	}
}

export default GoodsStore;
