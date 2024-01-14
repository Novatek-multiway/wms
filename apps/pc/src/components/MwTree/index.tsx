import React, { useState, useEffect } from "react";
import { Tree } from "antd";

interface IProps {
	onCheck: Function;
	onSelect: Function;
	treeData: any;
	fieldNames: Object;
	key: any;
	defaultCheckedKeys: any;
	value: any;
}

const MwTree = (props: IProps) => {
	return (
		<>
			<Tree
				checkable
				// checkedKeys={props.value}
				onCheck={props.onChange}
				{...props}
				key={props.defaultCheckedKeys.length}
				defaultCheckedKeys={props.defaultCheckedKeys}
			/>
		</>
	);
};
export default MwTree;
