import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {PolygonTickersResponse} from "@shared/types";

@Injectable()
class PolygonApi {
    readonly baseUrl = 'https://api.polygon.io';

    constructor(
        private httpService: HttpService
    ) {
    }

    makeLoadTickerListQuery = async (query: Record<string, any>): Promise<PolygonTickersResponse> => {
        try {
            const {
                data,
            } = await this.httpService.axiosRef.get<PolygonTickersResponse>(`${this.baseUrl}/v3/reference/tickers`, {
                params: query
            });
            if (!data || data.status !== 'OK') {
                console.error(`Polygon service error: ${data.status}`);
                return null;
            }
            return data;
        } catch (e) {
            console.error(`Polygon service error: ${e.message}`);
            return null;
        }
    }
}

export default PolygonApi;
