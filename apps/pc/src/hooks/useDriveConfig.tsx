import { useOptions } from "multiway";
import service from "@/pages/basicConfiguration/user/services";
const UseDriveConfig = () => {
	const { options } = useOptions(service.DriveList, {
		path: ["data"],
		transform: {
			label: "driveName",
			value: "guid"
		}
	});
	return {
		options
	};
};
export default UseDriveConfig;
