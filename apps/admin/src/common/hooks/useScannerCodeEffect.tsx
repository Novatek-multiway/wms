import { shallowEqual, useAppDispatch, useAppSelector } from 'hooks';
import { ScannerKey } from '../constants';
import { useEffect } from 'react';
import { resetScannerValue } from 'store';

export default function useScannerCodeEffect(
  scannerKey: ScannerKey,
  callback: (code: any) => void
) {
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.scanner.scannerMap?.[scannerKey], shallowEqual);
  useEffect(() => {
    if (code) {
      callback(code);
      dispatch(resetScannerValue(scannerKey))
    }
  }, [code]);
}
