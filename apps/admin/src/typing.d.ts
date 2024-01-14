import { ElementRef } from 'react';
import { MwSearchTable } from 'multiway';

interface Result<T = any> {
  message: string;
  data: T;
  result: T;
  code: number;
  resultData: T;
  statusCode?: number;
}

interface ITableRef<T> {
  refresh: () => void;
  reset: () => void;
  getSelection: () => T[];
  setSelection: (selections: T[]) => void;
  clearSelection: () => void;
  getTableData: () => T[];
  setTableData: (data: T[]) => void;
}

type ITable<T = any> = ElementRef<typeof MwSearchTable> & ITableRef<T>;
