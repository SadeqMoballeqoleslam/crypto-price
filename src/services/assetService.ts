import IAsset from '@/types/IAsset';
import network from './network';

export const list = () =>
	network
		.get<IResponse<IPagination<IAsset>>>('/asset/v1/top/list', {
			params: { page_size: 10 },
		})
		.then(({ data }) => data.Data);
