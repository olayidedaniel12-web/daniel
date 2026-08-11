import React, { useState, useEffect } from 'react';
import { TMAAssignment } from '../types';

interface TMAQuizModalProps {
  tma: TMAAssignment;
  onClose: () => void;
  onSubmitQuiz: (tmaId: string, score: number) => void;
}

export const TMAQuizModal: React.FC<TMAQuizModalProps> = ({
  tma,
  onClose,
  onSubmitQuiz,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    if (quizSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmit = () => {
    if (quizSubmitted) return;
    setIsSubmitting(true);

    setTimeout(() => {
      let correct = 0;
      tma.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correct++;
        }
      });

      // NOUN TMAs are graded out of 10 marks
      const calculatedScore = Math.round((correct / tma.questions.length) * 10);
      setFinalScore(calculatedScore);
      setQuizSubmitted(true);
      setIsSubmitting(false);

      onSubmitQuiz(tma.id, calculatedScore);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-primary/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
        {/* Quiz Modal Header */}
        <div className="bg-primary text-on-primary p-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2.5 py-0.5 rounded-full">
                {tma.courseCode}
              </span>
              <span className="text-xs text-primary-fixed-dim font-medium">
                TMA {tma.tmaNumber} Assessment
              </span>
            </div>
            <h2 className="font-headline-lg text-lg font-bold text-white mt-1">
              {tma.courseTitle}
            </h2>
          </div>

          {!quizSubmitted && (
            <div className="bg-primary-container/80 px-3 py-1.5 rounded-xl border border-primary-fixed-dim/30 text-right">
              <span className="text-[10px] text-primary-fixed-dim block uppercase font-bold tracking-wider">Time Left</span>
              <span className={`font-mono text-sm font-bold ${timeLeft < 180 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-surface-bright">
          {!quizSubmitted ? (
            <>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-primary flex items-center justify-between">
                <span>Attempt all questions before submitting. Multiple submissions are disabled once confirmed.</span>
                <span className="font-semibold">{Object.keys(selectedAnswers).length}/{tma.questions.length} Answered</span>
              </div>

              {tma.questions.map((q, qIndex) => (
                <div key={q.id} className="bg-surface rounded-xl p-5 border border-outline-variant shadow-xs">
                  <h4 className="font-title-md text-sm font-semibold text-primary mb-3">
                    Question {qIndex + 1} of {tma.questions.length}:
                  </h4>
                  <p className="font-body-md text-sm text-on-surface mb-4 font-medium leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-2.5">
                    {q.options.map((option, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left border transition-all cursor-pointer text-sm ${
                            isSelected
                              ? 'bg-primary-container text-white border-primary font-medium shadow-sm'
                              : 'bg-surface-container-lowest text-on-surface border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isSelected ? 'bg-secondary-container text-on-secondary-container border-secondary-container' : 'border-outline text-on-surface-variant'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* Quiz Score Result View */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">TMA Submission Completed</span>
                <h3 className="text-2xl font-bold text-primary mt-1">
                  Score: {finalScore} / 10 Marks
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 max-w-md mx-auto">
                  Your answers have been recorded in the NOUN Portal database. Your continuous assessment score has been updated.
                </p>
              </div>

              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Course Code:</span>
                  <span className="font-bold text-primary">{tma.courseCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Assessment:</span>
                  <span className="font-bold text-primary">TMA {tma.tmaNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Status:</span>
                  <span className="font-bold text-green-700">Submitted & Graded</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-surface border-t border-outline-variant p-4 flex items-center justify-between">
          {!quizSubmitted ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-outline text-on-surface text-sm font-semibold hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting || Object.keys(selectedAnswers).length === 0}
                onClick={handleSubmit}
                className={`px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  Object.keys(selectedAnswers).length === 0
                    ? 'bg-gray-400 cursor-not-allowed opacity-60'
                    : 'bg-primary hover:bg-primary-container active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting TMA...</span>
                  </>
                ) : (
                  <>
                    <span>Submit TMA Answers</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-container cursor-pointer"
            >
              Back to Dashboard & TMAs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
