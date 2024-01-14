import { useOptions } from "multiway";
import useDict from "./useDict";

const UseSingleDict = (prop: string) => {
	const dict = useDict("") as any;
	const { options: typeOptions } = useOptions(
		() => {
			return Promise.resolve(dict[prop]);
		},
		{
			transform: (option: any) => ({
				label: option.Label,
				value: option.Value
			})
		}
	);
	return typeOptions;
};
export default UseSingleDict;
