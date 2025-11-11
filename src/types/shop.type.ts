import type { RoleShop } from 'src/models/shop.model';

type IRoleShop = (typeof RoleShop)[keyof typeof RoleShop];
type Status = 'active' | 'inactive';

export interface IShop {
  _id: string;
  name: string;
  email: string;
  password: string;
  status: Status;
  verify: boolean;
  roles: IRoleShop[];
  createdAt: Date;
  updatedAt: Date;
}

export type IShopSignUp = Pick<IShop, 'name' | 'password' | 'email'>;

export type IShopLogin = Pick<IShop, 'email' | 'password'> & { refreshToken: string | null };

export interface IShopSignUpRes {
  shop: Pick<IShop, '_id' | 'name' | 'email'>;
  accessToken: string;
  refreshToken: string;
}

export interface IShopLoginRes {
  shop: Pick<IShop, '_id' | 'name' | 'email'>;
  accessToken: string;
  refreshToken: string;
}
