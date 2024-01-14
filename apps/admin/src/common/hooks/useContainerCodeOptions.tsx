
import { useOptions } from 'multiway';
import { getPadContainerInventoryGetAllContainerSelectItem } from 'apis';

export default function useContainerCodeOptions(autoload = true) {
    const { options: containerCodeOptions, load } = useOptions(
        getPadContainerInventoryGetAllContainerSelectItem,
        {
          path: ['resultData'],
          keepOrigin: true,
          transform: {
            label: 'itemName',
            value: 'itemValue',
          },
          autoload
        }
    );
    return {
        containerCodeOptions,
        load
    }
}