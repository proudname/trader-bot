import { Injectable } from '@nestjs/common';
import polygonClient from '../clients/polygon.client';
import BaseApi from '../../../../../apps/bot/src/common/base.api';
import { PolygonTickersResponse } from '../../../../../apps/bot/src/types';
import {ErrorGenerator} from "../error-generator";

@Injectable()
class PolygonApi extends BaseApi {
  readonly client = polygonClient;
  private readonly eg = new ErrorGenerator(PolygonApi.name);

  makeLoadTickerListQuery = async (query: Record<string, any>): Promise<PolygonTickersResponse> => {
    const queryString = this.prepareQueryString(query);
    try {
      const data = await this.makeRequest<PolygonTickersResponse>({ url: `/v2/reference/tickers?${queryString}`, data: queryString });
      if (!data || data.status !== 'OK') {
        this.eg.generateError(`При выгрузке тикеров получена ошибка сервиса: ${data.status}`);
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}

export default PolygonApi;
