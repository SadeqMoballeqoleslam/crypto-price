import { intComma } from 'humanize-plus';
import { IAssetsTableRowProps } from './assetsTableRow.d';
import clsx from 'clsx';

export default function AssetsTableRow({ asset }: IAssetsTableRowProps) {
	return (
		<tr>
			<td>{asset.ID}</td>
			<td>
				<div className="flex items-center gap-3">
					<div className="avatar">
						<div className="mask mask-squircle h-12 w-12">
							<img src={asset.LOGO_URL} alt={asset.SYMBOL} />
						</div>
					</div>
					<div>
						<div className="font-bold">{asset.SYMBOL}</div>
						<div className="text-sm opacity-50">{asset.NAME}</div>
					</div>
				</div>
			</td>
			<td>
				<span
					className={clsx([
						'w-36 flex',
						asset.PRICE_CHANGE_FLAG === 'DOWN' && 'text-rose-700',
						asset.PRICE_CHANGE_FLAG === 'UP' && 'text-green-700',
					])}
				>
					${intComma(asset.PRICE_USD, 2)}
				</span>
			</td>
			<td>{intComma(asset.TOTAL_MKT_CAP_CONVERSION, 2)}</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
			</th>
		</tr>
	);
}
