"use client";

import { useState, useEffect, useRef, FC, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createNewConversation } from "@/actions/conversations";
import { Icons } from "@/components/icons";
import { MEDICAL_QUESTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface QuestionsMessagesProps {
	userEmail: string;
	policy: Policy;
}

const QuestionsMessages: FC<QuestionsMessagesProps> = ({ userEmail, policy }) => {
	const [questions, setQuestions] = useState<Question[]>(policy.questions);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<AnswerOption[]>([]);
	const [isQuestionsDone, setIsQuestionsDone] = useState<boolean>(false);
	const [isCreatingConversation, setIsCreatingConversation] = useState<boolean>(false);

	// State to manage selected options for multi-select questions
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const scrollRef = useRef<HTMLDivElement>(null);
	const endOfContentRef = useRef<HTMLDivElement>(null);

	const currentQuestion = questions[currentQuestionIndex];

	useEffect(() => {
		if (endOfContentRef.current) {
			endOfContentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [currentQuestionIndex, answers, questions]);

	const handleSingleSelectAnswer = (option: { id: string; value: string }) => {
		const newAnswer: AnswerOption = { id: currentQuestion.id, value: option.value };
		setAnswers([...answers, newAnswer]);
		handleConditionalQuestions(option.value);
		nextQuestion();
	};

	const handleMultiSelectAnswer = () => {
		if (selectedOptions.length === 0) {
			toast.error("Please select at least one option.");
			return;
		}
		const combinedValue = selectedOptions.join(", ");
		const newAnswer: AnswerOption = { id: currentQuestion.id, value: combinedValue };
		setAnswers([...answers, newAnswer]);
		setSelectedOptions([]);
		nextQuestion();
	};

	const handleConditionalQuestions = (selectedValue: string) => {
		// Check if the current question is "Do you have any pre-existing medical conditions?" (id: "2")
		// and the policy is "health-insurance", and the user selected "Yes"
		if (currentQuestion.id === "2" && selectedValue === "Yes" && policy.slug === "health-insurance") {
			// Check if MEDICAL_QUESTIONS are already inserted to prevent duplication
			const medicalQuestionIds = MEDICAL_QUESTIONS.map(q => q.id);
			const isAlreadyInserted = questions.some(q => medicalQuestionIds.includes(q.id));
			if (!isAlreadyInserted) {
				const newQuestions = [
					...questions.slice(0, currentQuestionIndex + 1),
					...MEDICAL_QUESTIONS,
					...questions.slice(currentQuestionIndex + 1),
				];
				setQuestions(newQuestions);
			}
		}
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setIsQuestionsDone(true);
		}
	};

	const onQuestionsDone = useCallback(async () => {
		setIsCreatingConversation(true);

		try {
			const compiledAnswer = `Based on the following user inputs:
			${answers
				.map(ans => {
					const question = questions.find(q => q.id === ans.id);
					return question ? `${question.title}: ${ans.value}` : "";
				})
				.filter(Boolean)
				.join("; ")};
			`;

			await createNewConversation(userEmail, policy.slug, compiledAnswer.trim());

			toast.success("Conversation created!");
		} catch (error) {
			toast.error("Something went wrong!");
		} finally {
			setIsCreatingConversation(false);
		}
	}, [policy.slug, questions, userEmail, answers]);

	useEffect(() => {
		if (isQuestionsDone) {
			onQuestionsDone();
		}
	}, [isQuestionsDone, onQuestionsDone]);

	const handleCheckboxChange = (optionValue: string) => {
		setSelectedOptions(prev => {
			if (prev.includes(optionValue)) {
				return prev.filter(val => val !== optionValue);
			} else {
				return [...prev, optionValue];
			}
		});
	};

	return (
		<div ref={scrollRef} className="w-full py-4 space-y-6">
			<AnimatePresence>
				{questions.slice(0, currentQuestionIndex + 1).map((question, idx) => (
					<motion.div
						key={question.id}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
						className="space-y-4"
					>
						<div className="flex">
							<div className="bg-accent rounded-3xl rounded-ss-none py-3 px-5 shadow-md max-w-md">
								{question.message}
							</div>
						</div>

						{answers[idx] && (
							<div className="flex justify-end">
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
									className="bg-background ring-1 ring-accent ring-inset rounded-3xl rounded-ee-none py-3 px-5 shadow-md max-w-md"
								>
									{answers[idx].value}
								</motion.div>
							</div>
						)}
					</motion.div>
				))}
			</AnimatePresence>

			{!isQuestionsDone && currentQuestion && (
				<div className="space-y-4">
					{currentQuestion.multiSelect ? (
						<div className="space-y-2">
							<div className="flex flex-col gap-2">
								{currentQuestion.options.map(option => (
									<label key={option.id} className="flex items-center space-x-2">
										<input
											type="checkbox"
											value={option.value}
											checked={selectedOptions.includes(option.value)}
											onChange={() => handleCheckboxChange(option.value)}
											className="h-5 w-5 text-primary bg-primary"
										/>
										<span>{option.value}</span>
									</label>
								))}
							</div>
							<Button onClick={handleMultiSelectAnswer} variant="secondary">
								Submit
							</Button>
						</div>
					) : (
						<div className="flex gap-2 items-center flex-wrap">
							{currentQuestion.options.map(option => (
								<motion.button
									key={option.id}
									onClick={() => handleSingleSelectAnswer(option)}
									className="ring-1 ring-accent rounded-full py-1 px-6 shadow hover:bg-accent transition-colors duration-300"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.2 }}
								>
									{option.value}
								</motion.button>
							))}
						</div>
					)}
				</div>
			)}

			{isCreatingConversation && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="flex items-center justify-center"
				>
					<Icons.LoadingIcon2 className="w-8 h-auto" />
				</motion.div>
			)}

			<div className="h-10" ref={endOfContentRef} />
		</div>
	);
};

export default QuestionsMessages;
