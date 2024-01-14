import { useStore } from "@/store/index";

const useDict = prop => {
	const { configStore } = useStore();
	let dictList = configStore.dictList;
	if (!dictList) return;
	dictList = JSON.parse(dictList);
	return prop ? dictList && dictList[prop] : dictList;
};

export default useDict;
