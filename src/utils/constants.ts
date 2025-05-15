import type { NavigationItem, ContactInfo } from '../types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        id: 'yielder-bot',
        label: 'Yielder Bot',
        href: 'https://t.me/Yielder_bot',
        external: true,
    },
    {
        id: 'pitch-deck',
        label: 'Pitch Deck',
        href: 'https://docsend.com/view/tqkvninuxc2n37b8',
        external: true,
    }
];

export const CONTACT_INFO: ContactInfo = {
    email: 'info@noframe.io',
    twitter: 'https://twitter.com/noframe_io',
    github: 'https://github.com/noframe-core',
};

export const API_ENDPOINTS = {
    SUBSCRIBE: 'https://hooks.zapier.com/hooks/catch/4187883/3e15k0e/',
};
