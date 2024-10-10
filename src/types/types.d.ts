declare type StoreContextType = {
	[key: string]: unknown;
};

declare type Policy = {
	id: string;
	slug: string;
	name: string;
	body: string;
	icon: string;
	questions: Question[];
};

declare type AnswerOption = {
	id: string;
	value: string;
};

declare type Question = {
	id: string;
	message: string;
	title: string;
	options: Option[];
	multiSelect?: boolean;
};

declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

declare type PolicyType = "term-life-insurance" | "health-insurance";
