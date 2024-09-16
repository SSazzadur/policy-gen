declare type StoreContextType = {
	[key: string]: unknown;
};

declare type Policy = {
	id: string;
	name: string;
	body: string;
	icon: string;
};

declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};
