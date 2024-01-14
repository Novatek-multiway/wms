import { Loading as VantLoading, Overlay } from 'react-vant';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <VantLoading type="ball" />
    </div>
  );
}
