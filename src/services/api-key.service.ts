import apiKeyModel from 'src/models/api-key.model';

import type { IApiKey } from 'src/types/api-key.type';
import type { ApiResult } from 'src/types/api.type';

class ApiKeyService {
  public findById = async (key: string): Promise<ApiResult<IApiKey>> => {
    const objectKey = await apiKeyModel
      .findOne({
        key,
        status: true,
      })
      .lean();

    if (!objectKey) {
      return {
        code: 403,
        status: 'error',
        message: 'Forbidden Error',
        data: null,
      };
    }

    return {
      code: 200,
      status: 'success',
      message: 'Success',
      data: objectKey,
    };
  };
}

const apiKeyService = new ApiKeyService();
export default apiKeyService;
