import { data } from "./data";

export const APP_NAME = "PolicyGen";

export const SYSTEM_INSTRUCTION = `You are an expert policy advisor, specializing in health and life insurance policies. You analyze personal details and suggest the best policy options. After making a recommendation, you automatically ask follow-up questions and use the answers to refine further suggestions, always keeping track of the conversation's history.

Your name is ${APP_NAME}.

And for your reference the JSON dataset is being attached below, please refer to it. The dataset has input parameters and corresponding outputs.
Here is the dataset:

${JSON.stringify(data, null, 2)}

Please refrain from using any complicated termology including the term 'dataset' and only use user-friendly terms. 
`;

export const QUESTIONS: Question[] = [
	{
		id: "1",
		message: "What is your age?",
		title: "Age",
		options: [
			{ id: "1", value: "18-25" },
			{ id: "2", value: "26-35" },
			{ id: "3", value: "36-45" },
			{ id: "4", value: "46+" },
		],
	},
	{
		id: "2",
		message: "Do you have any pre-existing medical conditions?",
		title: "Pre-existing Medical Conditions",
		options: [
			{ id: "1", value: "Yes" },
			{ id: "2", value: "No" },
		],
	},
	{
		id: "3",
		message: "What is your preferred premium range per year?",
		title: "Preferred Premium Range",
		options: [
			{ id: "1", value: "₹0 - ₹25,000" },
			{ id: "2", value: "₹25,000 - ₹50,000" },
			{ id: "3", value: "₹50,000 - ₹1,00,000" },
			{ id: "4", value: "₹1,00,000+" },
		],
	},
	{
		id: "4",
		message: "What is your desired coverage amount?",
		title: "Desired Coverage Amount",
		options: [
			{ id: "1", value: "₹0 - ₹5,00,000" },
			{ id: "2", value: "₹5,00,000 - ₹10,00,000" },
			{ id: "3", value: "₹10,00,000 - ₹50,00,000" },
			{ id: "4", value: "₹50,00,000+" },
		],
	},
	{
		id: "5",
		message:
			"How important is the customer rating of the insurance provider to you? (On a scale of 1-5, with 5 being very important)",
		title: "Customer Rating Importance",
		options: [
			{ id: "1", value: "1" },
			{ id: "2", value: "2" },
			{ id: "3", value: "3" },
			{ id: "4", value: "4" },
			{ id: "5", value: "5" },
		],
	},
	{
		id: "6",
		message: "What is your preferred claim process?",
		title: "Claim Process",
		options: [
			{ id: "1", value: "Online" },
			{ id: "2", value: "Offline" },
		],
	},
	{
		id: "7",
		message: "What is your preferred policy renewal term?",
		title: "Policy Renewal Term",
		options: [
			{ id: "1", value: "Short-term (3-5 years)" },
			{ id: "2", value: "Medium-term (10-15 years)" },
			{ id: "3", value: "Long-term (20+ years)" },
		],
	},
];

export const POLICIES: Policy[] = [
	{
		id: "1",
		slug: "term-life-insurance",
		name: "Term Life Insurance",
		body: "Provides financial protection for your family in case of untimely death, offering a lump sum payout for a specified term. This policy ensures financial stability.",
		icon: "🛡️",
		questions: [
			...QUESTIONS,
			{
				id: "8",
				message: "Which additional benefits are most important to you for life insurance?",
				title: "Life Insurance Benefits",
				options: [
					{ id: "1", value: "Education fund" },
					{ id: "2", value: "Critical illness coverage" },
					{ id: "3", value: "Accidental death coverage" },
					{ id: "4", value: "Estate planning" },
				],
			},
		],
	},
	{
		id: "2",
		slug: "health-insurance",
		name: "Health Insurance",
		body: "Covers medical expenses, hospitalization costs, and provides financial protection against health-related emergencies. It offers peace of mind by ensuring quality healthcare.",
		icon: "🏥",
		questions: [
			...QUESTIONS,
			{
				id: "8",
				message: "Which additional benefits are most important to you for health insurance?",
				title: "Health Insurance Benefits",
				options: [
					{ id: "1", value: "Maternity care" },
					{ id: "2", value: "Mental health coverage" },
					{ id: "3", value: "Emergency room coverage" },
					{ id: "4", value: "Pediatric care" },
				],
			},
		],
	},
];
