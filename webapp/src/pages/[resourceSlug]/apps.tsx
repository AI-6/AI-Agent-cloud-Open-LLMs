import { PlusIcon } from '@heroicons/react/20/solid';
import AppCard from 'components/AppCard';
import ErrorAlert from 'components/ErrorAlert';
import NewButtonSection from 'components/NewButtonSection';
import PageTitleWithNewButton from 'components/PageTitleWithNewButton';
import Spinner from 'components/Spinner';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as API from '../../api';
import { useAccountContext } from '../../context/account';
import ViewType from 'struct/app';

export default function Apps(props) {
	const [accountContext, refreshAccountContext]: any = useAccountContext();
	const { account, teamName, csrf } = accountContext as any;
	const router = useRouter();
	const { resourceSlug } = router.query;
	const [state, dispatch] = useState(props);
	const [error, setError] = useState();
	const [viewType, setViewType] = useState<ViewType>(ViewType.CARD);
	const { apps } = state;

	async function startSession(appId) {
		await API.addSession({
			_csrf: csrf,
			resourceSlug,
			id: appId,
		}, null, setError, router);
	}

	async function fetchApps() {
		await API.getApps({ resourceSlug }, dispatch, setError, router);
	}

	useEffect(() => {
		fetchApps();
		refreshAccountContext();
	}, [resourceSlug]);

	if (!apps) {
		return <Spinner />;
	}

	return (<>
		<Head>
			<title>{`Apps - ${teamName}`}</title>
		</Head>

		<div className='flex justify-between items-center'>
			<PageTitleWithNewButton list={apps} title='Apps' buttonText='New App' href='/app/add' />
			<button
				onClick={() => setViewType(prev => prev === ViewType.CARD ? ViewType.TABLE : ViewType.CARD)}
				className='p-2 border rounded-lg hover:bg-gray-200'
				aria-label='Switch view'
			>
				<SwitchHorizontalIcon className='h-6 w-6' />
			</button>
		</div>

		{error && <ErrorAlert error={error} />}

		{apps.length === 0 && <NewButtonSection
			link={`/${resourceSlug}/app/add`}
			emptyMessage={'No apps'}
			icon={<PlusIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />}
			buttonMessage={'New App'}
		/>}

		{viewType === ViewType.CARD && (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-2'>
				{apps.map((a, ai) => (<AppCard key={ai} app={a} startSession={startSession} />))}
			</div>
		)}

		{viewType === ViewType.TABLE && (
			<p>TODO: Implement table view</p>
			// The table rendering code goes here
		)}
	</>);
}

export async function getServerSideProps({ req, res, query, resolvedUrl, locale, locales, defaultLocale }) {
	return JSON.parse(JSON.stringify({ props: res?.locals?.data || {} }));
};
