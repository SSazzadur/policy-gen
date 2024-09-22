"use client";

import { useState, useEffect, useRef, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "@/lib/constants";

interface QuestionsMessagesProps {}

const QuestionsMessages: FC<QuestionsMessagesProps> = ({}) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<AnswerOption[]>([]);
	const [showResults, setShowResults] = useState(false);
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
			setShowResults(true);
		}
	};

	const compileAnswers = () => {
		return answers
			.filter(ans => ans.value !== "Skipped")
			.map(ans => {
				const question = QUESTIONS.find(q => q.id === ans.id);
				return question ? `${question.message} ${ans.value}` : "";
			})
			.filter(Boolean)
			.join(". ");
	};

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

			{!showResults && currentQuestion && (
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

			{showResults && (
				<motion.div
					className="text-center text-xl font-semibold py-4 rounded-lg shadow-lg text-gray-500"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
				>
					Final Compilation: {compileAnswers() || "No answers provided."}
				</motion.div>
			)}

			<div ref={endOfContentRef} />
		</div>
	);
};

export default QuestionsMessages;
