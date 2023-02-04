import { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'querystring';

abstract class BaseApi {
  protected abstract client: AxiosInstance

  protected prepareQueryString(schema: Record<string, any>) {
    return qs.stringify(schema);
  }

  protected async makeRequest<T = any>(requestConfig: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.request<T>(requestConfig);
    return data;
  }
}

export default BaseApi;
