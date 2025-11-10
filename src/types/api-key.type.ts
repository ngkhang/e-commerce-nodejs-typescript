export type IPermission = '0000' | '1111' | '2222';

export interface IApiKey {
  key: string;
  status: boolean;
  permissions: IPermission[];
}
