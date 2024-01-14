/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VUE_APP_FLAG: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
type RefType = MutableRefObject<unknown> | ((instance: unknown) => void);

type CommonObjectType<T = any> = Record<string, T>;
