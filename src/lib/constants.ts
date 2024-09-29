export const APP_NAME = "PolicyGen";

export const SYSTEM_INSTRUCTION =
	"You are an expert policy advisor, specializing in financial, health, life insurance, and investment policies. You analyze personal details and suggest the best policy options. After making a recommendation, you automatically ask follow-up questions and use the answers to refine further suggestions, always keeping track of the conversation's history.";

export const POLICIES: Policy[] = [
	{
		id: "1",
		slug: "term-life-insurance",
		name: "Term Life Insurance",
		body: "Provides financial protection for your family in case of untimely death, offering a lump sum payout for a specified term. This policy ensures financial stability.",
		icon: "🛡️",
	},
	{
		id: "2",
		slug: "health-insurance",
		name: "Health Insurance",
		body: "Covers medical expenses, hospitalization costs, and provides financial protection against health-related emergencies. It offers peace of mind by ensuring quality healthcare.",
		icon: "🏥",
	},
];

export const QUESTIONS: Question[] = [
	{
		id: "1",
		message: "Select your age range:",
		title: "Age Range",
		options: [
			{ id: "1", value: "18-25" },
			{ id: "2", value: "26-35" },
			{ id: "3", value: "36-45" },
			{ id: "4", value: "45+" },
		],
	},
	{
		id: "2",
		message: "Select your gender:",
		title: "Gender",
		options: [
			{ id: "1", value: "Male" },
			{ id: "2", value: "Female" },
			{ id: "3", value: "Other" },
		],
	},
	{
		id: "3",
		message: "Select your income range:",
		title: "Income Range",
		options: [
			{ id: "1", value: "₹0 - ₹25,000" },
			{ id: "2", value: "₹25,000 - ₹50,000" },
			{ id: "3", value: "₹50,000 - ₹1,00,000" },
			{ id: "4", value: "₹1,00,000+" },
		],
	},
];
