import { get, post, del, put } from "@/http/request";
class BaseConfigApi {
	// api前缀
	private static prefix: string = "";

	// 基础数据模块
	private apiDict = {
		// page -- menuList
		getMenuList: "/Menu/GetMenus", //获取菜单列表
		delMenu: "/Menu/DeleteMenu", // 删除菜单
		addMenu: "/Menu/AddMenu", // 新增菜单
		updateMenu: "/Menu/UpdateMenu", // 更新菜单

		// page -- roleList
		getRoleList: "/Role/GetPageData", // 获取角色分页数据
		delRoleList: "/Role/Delete", // 删除角色
		getPermissionData: "/Permission/GetPageData", // 获取权限数据
		addRole: "/Role/Add", // 添加角色
		updateRole: "/Role/update", // 更新角色

		//page -- userList
		getUserList: "/User/GetPageData", // 获取用户分页数据
		addUser: "/User/Add", // 添加用户
		updateUser: "/User/Update", // 编辑用户
		delUser: "/User/Delete", // 删除用户
		resetDefaultPwd: "/User/ResetDefaultPwd", // 删除用户

		// page -- permissionListd
		getMenus: "/Menu/GetMenus", // 获取菜单功能数据
		getPermissionList: "/Permission/GetPageData", // 获取权限数据
		delPermission: "/Permission/DeletePermissionInfo", // 删除权限
		addPermission: "/Permission/Add", //新增权限
		updatePermission: "/Permission/Update" // 更新权限
	};

	public getMenuList = (params: any = "") => get(this.apiDict.getMenuList, { ...params, systemCode: "wms.webapi" }); // 不含分页
	public delMenu = (params: any = "") => del(`${this.apiDict.delMenu}?id=${params}`);
	public addMenu = (params: any = "") => post(this.apiDict.addMenu, { ...params });
	public updateMenu = (params: any = "") => post(this.apiDict.updateMenu, { ...params });

	// page -- permissionList
	public getPermissionList = (params: any = "") => post(this.apiDict.getPermissionList, params);
	public delPermission = (params: any = "") => del(`${this.apiDict.delPermission}?id=${params}`);
	public addPermission = (params: any = "") => post(this.apiDict.addPermission, { ...params, id: "0" });
	public updatePermission = (params: any = "") => post(this.apiDict.updatePermission, { ...params });
	public getPermissionInfo = (params: any = "") => get(`/Permission/GetPermissionById?id=${params}`);
	public addPermissionItemInfo = (params: any = "") => post(`/Permission/AddPermissionItemInfo`, { ...params });
	// page -- roleList
	public getRoleList = (params: any = "") => post(this.apiDict.getRoleList, { ...params });
	public delRoleList = (params: any = "") => del(`${this.apiDict.delRoleList}?id=${params}`);
	public getPermissionData = (params: any = "") => post(this.apiDict.getPermissionData, { ...params });
	public addRole = (params: any = "") => post(this.apiDict.addRole, { ...params });
	public updateRole = (params: any = "") => post(this.apiDict.updateRole, { ...params });

	// page -- userList
	public getUserList = (params: any = "") => post(this.apiDict.getUserList, { ...params });
	public delUser = (params: any = "") => del(`${this.apiDict.delUser}?id=${params}`);
	public addUser = (params: any = "") => post(this.apiDict.addUser, { ...params });
	public updateUser = (params: any = "") => post(this.apiDict.updateUser, { ...params });
	public resetDefaultPwd = (params: any = "") => get(this.apiDict.resetDefaultPwd, { ...params });
}

export default new BaseConfigApi();
