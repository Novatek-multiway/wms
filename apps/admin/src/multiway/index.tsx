import { setDefaultDataFilter, setDefaultSearchFilter, setGlobalDialogField } from 'multiway';

/**
 * 表格请求后过滤
 * @param data object 接口请求完成的数据
 */
setDefaultDataFilter((res: any) => {
  // return 的对象需要包含以下两条数据
  return {
    // 表格列表的数据
    content: res.resultData,
    // 数据总共 n 条
    totalCount: res.totalCount,
    ...res,
  };
});

// setGlobalDialogField(() => {
// 	return {
// 		maskClosable: false,
// 		destroyOnClose: true
// 	};
// });

// setDefaultSearchFilter((params: Record<string, any>) => {
// 	const searchData: Record<string, any> = {
// 		pageSize: params.pagination.pageSize,
// 		pageIndex: params.pagination.current
// 	};
// 	const paramsSearch = params.search;
// 	searchData.query = paramsSearch;
// 	return searchData;
// });