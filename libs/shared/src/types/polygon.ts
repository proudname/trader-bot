export type PolygonTicker = {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "market": "STOCKS",
    "locale": "US",
    "currency": "USD",
    "active": true,
    "primaryExch": "NGS",
    "type": "cs",
    "codes"?: {
        "cik": "0000320193",
        "figiuid": "EQ0010169500001000",
        "scfigi": "BBG001S5N8V8",
        "cfigi": "BBG000B9XRY4",
        "figi": "BBG000B9Y5X2"
    },
    "attrs"?: {
        "currencyName": "Australian dollar,",
        "currency": "AUD,",
        "baseName": "United Arab Emirates dirham,",
        "base": "AED"
    },
    "updated": "2019-01-15T00:00:00.000Z",
    "url": "https://api.polygon.io/v2/reference/tickers/AAPL"
}

export type PolygonTickersResponse = {
    "page": number,
    "perPage": number,
    "count": number,
    "status": "OK" | "ERROR",
    "tickers": PolygonTicker[]
}