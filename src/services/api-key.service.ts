import { ForbiddenRequestError } from 'src/core/error.response';
import apiKeyModel from 'src/models/api-key.model';

import type { IApiKey } from 'src/types/api-key.type';

class ApiKeyService {
  public findById = async (key: string): Promise<IApiKey> => {
    const objectKey = await apiKeyModel
      .findOne({
        key,
        status: true,
      })
      .lean();

    if (!objectKey) throw new ForbiddenRequestError('Forbidden Error');

    return objectKey;
  };
}

const apiKeyService = new ApiKeyService();
export default apiKeyService;
