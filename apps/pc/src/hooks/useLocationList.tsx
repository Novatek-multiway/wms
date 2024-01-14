import { useOptions } from "multiway";
import service from "@/pages/basicConfiguration/user/services";
const UseLocationList = () => {
	const { options } = useOptions(service.locationList, {
		path: ["data"],
		transform: {
			label: "storageName",
			value: "id"
		}
	});
	return {
		options
	};
};
export default UseLocationList;
