declare type StoreContextType = {
	[key: string]: unknown;
};

declare type Policy = {
	id: string;
	name: string;
	body: string;
	icon: string;
};

declare type AnswerOption = {
	id: string;
	value: string;
};

declare type Question = {
	id: string;
	message: string;
	options: Option[];
};

declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};
