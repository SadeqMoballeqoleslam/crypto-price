import clsx from 'clsx';
import Header from './Header';
import ILayoutProp from './layout.d';

export default function layout({ children, className }: ILayoutProp) {
	return (
		<div className={clsx(['grid gap-6 w-screen', className])}>
			<Header />
			{children}
		</div>
	);
}
