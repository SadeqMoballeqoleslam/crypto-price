import useAssetStore from '@/stores/assetStore';
import { useEffect } from 'react';
import AssetsTableRow from './assetsTableRow/AssetsTableRow';

export default function AssetsTable() {
	const { init, assets, removeListener } = useAssetStore();

	useEffect(() => {
		init();

		return () => removeListener();
	}, []);

	return (
		<div className="overflow-x-auto rounded-xl mx-4 sm:mx-8">
			<table className="table bg-base-100">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Market Cap</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{assets.map((item) => (
						<AssetsTableRow key={item.ID} asset={item} />
					))}
				</tbody>
				<tfoot>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Market Cap</th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
