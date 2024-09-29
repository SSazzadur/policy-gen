"use client";

import { useState, useEffect, useRef, FC, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "@/lib/constants";
import { toast } from "sonner";
import { createNewConversation } from "@/actions/conversations";

interface QuestionsMessagesProps {
	userEmail: string;
	policy: Policy;
}

const QuestionsMessages: FC<QuestionsMessagesProps> = ({ userEmail, policy }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<AnswerOption[]>([]);
	const [isQuestionsDone, setIsQuestionsDone] = useState<boolean>(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const endOfContentRef = useRef<HTMLDivElement>(null);

	const currentQuestion = QUESTIONS[currentQuestionIndex];

	useEffect(() => {
		if (endOfContentRef.current) {
			endOfContentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [currentQuestionIndex, answers]);

	const handleAnswer = (option: AnswerOption) => {
		setAnswers([...answers, { id: currentQuestion.id, value: option.value }]);
		nextQuestion();
	};

	const handleSkip = () => {
		setAnswers([...answers, { id: currentQuestion.id, value: "Skipped" }]);
		nextQuestion();
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < QUESTIONS.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setIsQuestionsDone(true);
		}
	};

	const onQuestionsDone = useCallback(async () => {
		try {
			// const initialResponses = { questions: QUESTIONS, answers: answers };

			// const body = { initialResponses, user: userEmail, policy: policy.slug };

			// const res = await fetch("http://localhost:3000/api/new-message", {
			// 	body: JSON.stringify(body),
			// 	method: "POST",
			// });
			// const data = await res.json();

			const compiledAnser = `
			 Hello, I want to get the best policies for myself, here are my details please provide a policy according to my need.

			 ${answers
					.filter(ans => ans.value !== "Skipped")
					.map(ans => {
						const question = QUESTIONS.find(q => q.id === ans.id);
						return question ? `${question.title}: ${ans.value}` : "";
					})
					.filter(Boolean)
					.join(". ")}
			`;

			const data = await createNewConversation(userEmail, policy.slug, compiledAnser);

			if (!data) {
				throw new Error("Conversation not created!");
			}

			toast.success("Conversation created!");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Something went wrong!");
			}
		}
	}, [policy.slug, userEmail, answers]);

	useEffect(() => {
		if (isQuestionsDone) {
			onQuestionsDone();
		}
	}, [isQuestionsDone, onQuestionsDone]);

	return (
		<div ref={scrollRef} className="w-full py-4 space-y-6">
			<AnimatePresence>
				{QUESTIONS.slice(0, currentQuestionIndex + 1).map((question, idx) => (
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
					<div className="flex gap-2 items-center flex-wrap">
						{currentQuestion.options.map(option => (
							<motion.button
								key={option.id}
								onClick={() => handleAnswer(option)}
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

					<div className="flex justify-center pt-2">
						<motion.button
							onClick={handleSkip}
							className="text-gray-500 underline hover:text-gray-700"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							Skip
						</motion.button>
					</div>
				</div>
			)}

			<div ref={endOfContentRef} />
		</div>
	);
};

export default QuestionsMessages;
