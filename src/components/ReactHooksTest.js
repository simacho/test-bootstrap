import React, {useEffect, useState} from 'react';

const
someReusableHook = () => {
	const
	[isShown, setIsShown] = useState(false),
		[data, setData] = useState({loading: true}),

		// Dumb immitation of graphql client
		client = {query: () => null},

		hide = () => setIsShown(false),
		show = () => setIsShown(true);

	useEffect(
		() => {
			console.log('Mounted');
			client.query(response => setData(response.data));

			// This is how one should run a code during unmount,
			// not the most explicit thing in the world
			return () => console.log('Unmounted');
		},

		// Even more implicit — from what I understand this is how
		// one should run a code during mount
		[],
	);

	return {client, data, isShown, hide, show};
};

export const HogeHogeTest = (props) => {
	const
	{data, isShown, hide, show} = someReusableHook();

	useEffect(() => console.log('State changed'), [isShown]);

	return <div>
		<h1>{isShown ? 'Shown' : 'Hidden'}</h1>
		<button onClick={hide}>Hide</button>
		<button onClick={show}>Show</button>
	</div>;
};
