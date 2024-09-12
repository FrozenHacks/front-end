export type TuseLocalStorage = {
  setItem: (key: string, value: unknown) => void;
  getItem: (key: string) => string | null | undefined;
  clearItem: (key: string) => void;
  clearStorage: () => void;
};
