export const commonOptions = [
  { label: '✔', value: true },
  { label: '✖', value: false },
];

export const SCANNER_DASHBOARD_INSTOCK_LOCATION = 'scanner_dashboard_instock_location';
export const SCANNER_DASHBOARD_EMPTY_LOCATION = 'scanner_dashboard_empty_location';
export const SCANNER_DASHBOARD_COMBINE_EMPTY_LOCATION = 'scanner_dashboard_empty_location';
export const SCANNER_DASHBOARD_MOVE_LOCATION = 'scanner_dashboard_move_location';
export const SCANNER_DASHBOARD_UNBIND_LOCATION = 'scanner_dashboard_unbind_location';
export const SCANNER_DASHBOARD_UNBIND_CONTAINER = 'scanner_dashboard_unbind_container';
export const SCANNER_DASHBOARD_BIND_LOCATION = 'scanner_dashboard_bind_location';
export const SCANNER_DASHBOARD_BIND_CONTAINER = 'scanner_dashboard_bind_container';
export const SCANNER_DASHBOARD_BIND_MATERIAL = 'scanner_dashboard_bind_material';
export const SCANNER_DASHBOARD_BIND_RECEIPT = 'scanner_dashboard_bind_receipt';
export const SCANNER_DASHBOARD_MOVE_CONTAINER = 'scanner_dashboard_move_container';
export const SCANNER_DASHBOARD_INSTOCK_CONTAINER = 'scanner_dashboard_instock_container';
export const SCANNER_RECEIVING_CODE = 'scanner_receiving_code';
export const SCANNER_SHIPMENT_CODE = 'scanner_shipment_code';
export const SCANNER_STORAGE_LOCATIONCODE = 'scanner_storage_locationcode';
export const SCANNER_STORAGE_CONTAINER = 'scanner_storage_container';
export const SCANNER_PICKING_LOCATIONCODE = 'scanner_picking_locationcode';
export const SCANNER_PICKING_RECEIPTCODE = 'scanner_sampling_receiptcode';
export const SCANNER_SAMPLING_LOCATIONCODE = 'scanner_sampling_locationcode';
export const SCANNER_SAMPLING_MATERIAL = 'scanner_sampling_material';
export const SCANNER_INVENTORY_CODE = 'scanner_inventory_code';
export const SCANNER_STOCKTAKE_CODE = 'scanner_stocktake_code';
export const SCANNER_TASK_TASKCODE = 'scanner_task_taskCode';
export const SCANNER_TASK_FROM = 'scanner_task_from';
export const SCANNER_TASK_TO = 'scanner_task_to';
export const SCANNER_REPERTORY_TASKCODE = 'scanner_repertory_taskCode';

export type ScannerKey =
  | typeof SCANNER_DASHBOARD_INSTOCK_LOCATION
  | typeof SCANNER_DASHBOARD_COMBINE_EMPTY_LOCATION
  | typeof SCANNER_DASHBOARD_BIND_MATERIAL
  | typeof SCANNER_DASHBOARD_BIND_LOCATION
  | typeof SCANNER_DASHBOARD_BIND_CONTAINER
  | typeof SCANNER_DASHBOARD_UNBIND_LOCATION
  | typeof SCANNER_DASHBOARD_UNBIND_CONTAINER
  | typeof SCANNER_DASHBOARD_BIND_RECEIPT
  | typeof SCANNER_DASHBOARD_EMPTY_LOCATION
  | typeof SCANNER_DASHBOARD_INSTOCK_CONTAINER
  | typeof SCANNER_DASHBOARD_MOVE_LOCATION
  | typeof SCANNER_DASHBOARD_MOVE_CONTAINER
  | typeof SCANNER_RECEIVING_CODE
  | typeof SCANNER_SHIPMENT_CODE
  | typeof SCANNER_STORAGE_LOCATIONCODE
  | typeof SCANNER_STORAGE_CONTAINER
  | typeof SCANNER_PICKING_LOCATIONCODE
  | typeof SCANNER_PICKING_RECEIPTCODE
  | typeof SCANNER_INVENTORY_CODE
  | typeof SCANNER_STOCKTAKE_CODE
  | typeof SCANNER_SAMPLING_LOCATIONCODE
  | typeof SCANNER_SAMPLING_MATERIAL
  | typeof SCANNER_TASK_TASKCODE
  | typeof SCANNER_TASK_FROM
  | typeof SCANNER_TASK_TO
  | typeof SCANNER_REPERTORY_TASKCODE;
