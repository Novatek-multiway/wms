import { useOptions } from "multiway";
/**
 * @method useConvertorRequest
 * @param {function} apiRequest
 * @param {Object} option
 */

export interface OptionItem {
	label: string;
	value: any;
	disabled?: boolean;
	children?: OptionItem[];
}
interface OptionFunc {
	(option: Record<string, any>): OptionItem;
}
const useConvertorRequest = (apiRequest: Function, option: OptionItem | OptionFunc, path = ["resultData", "pageData"]) => {
	const { options } = useOptions(apiRequest, {
		params: { pageIndex: 1, pageSize: 100 },
		path,
		transform: (item: Record<string, any>) => {
			if (typeof option !== "function") {
				return {
					label: item[option.label],
					value: item[option.value]
				};
			} else {
				return option(item);
			}
		}
	});
	return options;
};
export default useConvertorRequest;
