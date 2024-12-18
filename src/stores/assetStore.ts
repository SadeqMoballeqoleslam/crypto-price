import { create } from 'zustand';
import IAsset from '../types/IAsset';
import * as assetService from '../services/assetService';
import { API_KEY, WS_BASE_URL } from '@/environment';

interface IAssetStore {
	assets: IAsset[];
	listener: WebSocket | null;
	fetchAssets: () => Promise<void>;
	listen: () => void;
	removeListener: () => void;
	init: () => Promise<void>;
}

const useAssetStore = create<IAssetStore>((set, get) => ({
	assets: [],
	listener: null,
	fetchAssets: async () => {
		const assets = await assetService.list();

		return set(() => ({ assets: assets.LIST }));
	},
	listen: () => {
		if (!get().assets.length) return;

		const previousListener = get().listener;

		if (previousListener) previousListener.close();

		const listener = new WebSocket(WS_BASE_URL + `?api_key=${API_KEY}`);

		listener.onopen = () => {
			listener.send(
				JSON.stringify({
					action: 'SUBSCRIBE',
					type: 'index_cc_v1_latest_tick',
					groups: ['VALUE', 'CURRENT_HOUR', 'ID'],
					market: 'cadli',
					instruments: get().assets.map((item) => item.SYMBOL + '-USD'),
				})
			);
		};

		listener.onmessage = (message) => {
			const data = JSON.parse(message.data);

			if (data.TYPE !== '1101') return;

			const symbol = data.INSTRUMENT.replace('-USD', '');

			set(() => ({
				assets: get().assets.map((item) => {
					if (item.SYMBOL !== symbol) return item;

					return {
						...item,
						PRICE_USD: data.VALUE,
						PRICE_CHANGE_FLAG: data.VALUE > item.PRICE_USD ? 'UP' : 'DOWN',
					};
				}),
			}));
		};

		return set(() => ({ listener }));
	},
	removeListener: () => {
		const { listener } = get();

		if (listener) listener.close();

		return set(() => ({ listener: null }));
	},
	init: async () => {
		const { fetchAssets, listen } = get();

		await fetchAssets();

		listen();
	},
}));

export default useAssetStore;
