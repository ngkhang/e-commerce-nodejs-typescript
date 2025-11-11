import shopModel from 'src/models/shop.model';
// import { pickFields } from 'src/utils';

import type { IShop } from 'src/types/shop.type';

class ShopService {
  public async findByEmail(email: string): Promise<IShop | null> {
    const shop = await shopModel
      .findOne({
        email,
      })
      .lean();

    if (!shop) return null;

    // TODO: Handle with pickFields()
    return shop;
  }
}

const shopService = new ShopService();
export default shopService;
