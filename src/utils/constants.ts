import type { NavigationItem, ContactInfo } from '../types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		id: 'docs',
		label: 'Docs',
		href: '#',
		external: false,
	},
	{
		id: 'github',
		label: 'Github',
		href: 'https://github.com/noframe-core',
		external: true,
	},
];

export const CONTACT_INFO: ContactInfo = {
	email: 'info@noframe.io',
	twitter: 'https://twitter.com/noframe_io',
	github: 'https://github.com/noframe-core',
};

export const API_ENDPOINTS = {
	SUBSCRIBE: 'https://hooks.zapier.com/hooks/catch/4187883/3e15k0e/',
};
