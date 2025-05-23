import { Metadata } from 'next';

interface PageMetadata {
	title: string;
	description?: string;
	url: string;
	icon?: string;
	apple?: string;
}

export function getMetadata({ title, description, url, icon, apple }: PageMetadata): Metadata {
	return {
		title: `${title}`,
		description: description || '',
		openGraph: {
			title: `${title} | Aeroport International Chisinau`,
			description: description || '',
			url: url,
			siteName: 'Aeroport International Chisinau',
			type: 'website'
		},
		icons: {
			icon: icon,
			apple: apple
		}
	};
}
