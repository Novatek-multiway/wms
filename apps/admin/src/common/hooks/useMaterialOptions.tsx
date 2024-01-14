import { useOptions } from 'multiway';
import { postApiMaterialGetPageData } from 'apis';

export default function useMaterialOptions(autoload = true) {
  const { options: materialOptions, load } = useOptions(postApiMaterialGetPageData, {
    path: ['resultData', 'pageData'],
    keepOrigin: true,
    transform: (material: any): any => ({
      ...material,
      value: material.materialCode!,
      label: `${material.materialCode!}(${material.materialName!})`,
    }),
    autoload,
    params: { pageIndex: 1, pageSize: 100 },
  });
  return {
    materialOptions,
    load,
  };
}
