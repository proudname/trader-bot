export type PolygonTicker = {
    ticker: 'A',
    name: 'Agilent Technologies Inc.',
    market: 'stocks',
    locale: 'us',
    primary_exchange: 'XNYS',
    type: 'CS',
    active: true,
    currency_name: 'usd',
    cik: '0001090872',
    composite_figi: 'BBG000C2V3D6',
    share_class_figi: 'BBG001SCTQY4',
    last_updated_utc: '2023-03-30T00:00:00Z'
}

export type PolygonTickersResponse = {
    "page": number,
    "perPage": number,
    "count": number,
    "status": "OK" | "ERROR",
    "results": PolygonTicker[]
}