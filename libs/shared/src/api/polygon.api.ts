import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {PolygonTickersResponse} from "@shared/types";

@Injectable()
class PolygonApi {
    readonly baseUrl = 'https://api.polygon.io/';

    constructor(
        private httpService: HttpService
    ) {
    }

    makeLoadTickerListQuery = async (query: Record<string, any>): Promise<PolygonTickersResponse> => {
        try {
            const {data} = await this.httpService.axiosRef.post<PolygonTickersResponse>(`/v2/reference/tickers`, {
                baseURL: this.baseUrl,
                params: query
            });
            if (!data || data.status !== 'OK') {
                console.error(`Polygon service error: ${data.status}`);
                return null;
            }
        } catch (e) {
            return null;
        }
    }
}

export default PolygonApi;
