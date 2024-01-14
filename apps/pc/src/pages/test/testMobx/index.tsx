import React, { FC } from "react";
import ThreeStore from "./store";
import Text from "./testCom";
import Handles from "./handle";

interface IProps {}

function TestMobx() {
	return (
		<ThreeStore>
			<Text />
			<Handles />
		</ThreeStore>
	);
}

export default TestMobx;
