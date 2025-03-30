export interface EnvironmentScheme {
    url: string;
    host: string;
    scheme: string;
    subdomain: string;
    domain: string;
    fullPath?: string;
    port?: string;
    path?: string;
    query?: string;
}

export enum DATA_SOURCE {
    LOCALHOST = 'localhost',
    MOCK = 'mock',
    API = 'api',
}

const environments: Record<DATA_SOURCE, EnvironmentScheme> = {
    [DATA_SOURCE.LOCALHOST]: {
        url: 'http://localhost:3000/api',
        host: 'localhost',
        scheme: 'http://',
        subdomain: '',
        domain: 'localhost',
        port: '3000',
    },
    [DATA_SOURCE.MOCK]: {
        url: '',
        host: '',
        scheme: '',
        subdomain: '',
        domain: '',
        fullPath: '../../mock/data',
    },
    [DATA_SOURCE.API]: {
        url: 'https://stablemaster.wroblewskipiotr.pl/api',
        host: 'stablemaster.wroblewskipiotr.pl',
        scheme: 'https://',
        subdomain: 'stablemaster',
        domain: 'wroblewskipiotr.pl',
    },
};

export function getEnvironmentDetails(
    environment: DATA_SOURCE
): EnvironmentScheme {
    return environments[environment];
}
