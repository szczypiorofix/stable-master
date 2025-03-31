import { API_VERSION } from './Config.data';
import { ServiceDetails } from '../../@types';

export const apiServiceDetails: ServiceDetails = {
    name: 'API Service',
    path: `/${API_VERSION}/api`,
    version: '0.0.1',
};
