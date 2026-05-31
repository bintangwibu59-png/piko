import { useState, useCallback } from 'react';
import { HelpCircle, Check, X, ArrowRight, RotateCcw, Trophy, Star } from 'lucide-react';
import { allVocabulary, type VocabWord } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';

type QuizMode = 'meaning' | 'word' | null;
type QuizState = 'setup' | 'playing' | 'finished';

interface Question {
  word: VocabWord;
  options: string[];
  correctIndex: number;
}

const QUESTION_COUNT = 10;

export default function Quiz() {
  const { setStatus } = useProgress();
  const [mode, setMode] = useState<QuizMode>(null);
  const [state, setState] = useState<QuizState>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [shaking, setShaking] = useState(false);

  const generateQuestions = useCallback((quizMode: QuizMode): Question[] => {
    // Shuffle and pick random words
    const shuffled = [...allVocabulary].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, QUESTION_COUNT);

    return selected.map((word) => {
      // Get 3 wrong answers from other words
      const otherWords = allVocabulary.filter(w => w.id !== word.id);
      const wrongOptions = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => quizMode === 'meaning' ? w.meaning : w.word);

      const options = [...wrongOptions];
      const correctAnswer = quizMode === 'meaning' ? word.meaning : word.word;
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, correctAnswer);

      return { word, options, correctIndex };
    });
  }, []);

  const startQuiz = useCallback((quizMode: QuizMode) => {
    const qs = generateQuestions(quizMode);
    setQuestions(qs);
    setMode(quizMode);
    setState('playing');
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
  }, [generateQuestions]);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;

    const question = questions[currentIndex];
    const isCorrect = index === question.correctIndex;

    setSelectedAnswer(index);
    setAnswers(prev => [...prev, isCorrect]);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStatus(question.word.id, 'mastered');
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setStatus(question.word.id, 'learning');
    }
  }, [selectedAnswer, questions, currentIndex, setStatus]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setState('finished');
    }
  }, [currentIndex, questions.length]);

  const currentQuestion = questions[currentIndex];

  const getScoreMessage = () => {
    const pct = (score / QUESTION_COUNT) * 100;
    if (pct === 100) return { msg: 'Sempurna! Kamu seorang Sheriff!', color: 'text-[#C8910A]' };
    if (pct >= 80) return { msg: 'Hebat! Kamu seorang Gunslinger!', color: 'text-[#7D8B6A]' };
    if (pct >= 60) return { msg: 'Bagus! Kamu seorang Cowboy berpengalaman!', color: 'text-western-terracotta' };
    if (pct >= 40) return { msg: 'Lumayan! Teruslah berlatih, Tenderfoot!', color: 'text-[#8B3D2B]' };
    return { msg: 'Jangan menyerah! Coba pelajari lagi!', color: 'text-[#6B5D4E]' };
  };

  return (
    <div className="min-h-screen bg-western-cream">
      {/* Header */}
      <div className="bg-western-brown py-10 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <HelpCircle className="mx-auto mb-3 text-western-terracotta" size={32} />
          <h1 className="font-display text-3xl md:text-4xl text-[#F0EBE0] uppercase tracking-wide">
            Quiz Cowboy
          </h1>
          <p className="font-body text-[#D4C9A8] mt-3 max-w-lg mx-auto">
            Uji pengetahuanmu tentang bahasa cowboy! Pilih mode quiz dan jawab pertanyaannya.
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 py-8">
        {/* Setup */}
        {state === 'setup' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => startQuiz('meaning')}
                className="bg-western-beige border-2 border-[rgba(42,30,18,0.08)] hover:border-western-terracotta rounded-xl p-8 text-center transition-all hover:shadow-md group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-western-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-western-terracotta/20 transition-colors">
                  <HelpCircle size={32} className="text-western-terracotta" />
                </div>
                <h3 className="font-serif-display text-xl text-western-deep mb-2">Tebak Arti</h3>
                <p className="font-body text-sm text-[#6B5D4E]">
                  Lihat kata dalam bahasa Inggris dan tebak artinya dalam bahasa Indonesia.
                </p>
              </button>

              <button
                onClick={() => startQuiz('word')}
                className="bg-western-beige border-2 border-[rgba(42,30,18,0.08)] hover:border-western-terracotta rounded-xl p-8 text-center transition-all hover:shadow-md group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-western-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-western-terracotta/20 transition-colors">
                  <Star size={32} className="text-western-terracotta" />
                </div>
                <h3 className="font-serif-display text-xl text-western-deep mb-2">Tebak Kata</h3>
                <p className="font-body text-sm text-[#6B5D4E]">
                  Lihat arti dalam bahasa Indonesia dan tebak kata aslinya.
                </p>
              </button>
            </div>

            <div className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-5">
              <h3 className="font-body font-semibold text-sm text-western-deep mb-2">Cara Bermain</h3>
              <ul className="font-body text-sm text-[#6B5D4E] space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-western-terracotta mt-0.5">1.</span>
                  Pilih mode quiz yang kamu inginkan.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-western-terracotta mt-0.5">2.</span>
                  Jawab {QUESTION_COUNT} pertanyaan dengan memilih salah satu opsi.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-western-terracotta mt-0.5">3.</span>
                  Jawaban benar akan menandai kata sebagai "Dikuasai".
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-western-terracotta mt-0.5">4.</span>
                  Jawaban salah akan menandai kata sebagai "Belajar".
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Playing */}
        {state === 'playing' && currentQuestion && (
          <div className={`space-y-6 ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
            {/* Progress */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-[#6B5D4E]">
                Pertanyaan {currentIndex + 1} dari {questions.length}
              </span>
              <span className="font-body text-sm text-western-deep font-semibold">
                Skor: {score}
              </span>
            </div>
            <div className="h-2 bg-[rgba(42,30,18,0.08)] rounded-full overflow-hidden">
              <div
                className="h-full bg-western-terracotta rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="bg-western-beige border border-[rgba(42,30,18,0.08)] rounded-xl p-6 md:p-8">
              <p className="font-body text-sm text-[#6B5D4E] mb-3 uppercase tracking-wider">
                {mode === 'meaning' ? 'Apa arti dari kata ini?' : 'Kata apa yang memiliki arti ini?'}
              </p>
              <h2 className="font-serif-display text-2xl md:text-3xl text-western-deep">
                {mode === 'meaning' ? currentQuestion.word.word : currentQuestion.word.meaning}
              </h2>
              {mode === 'word' && (
                <p className="font-body text-sm text-[#6B5D4E] mt-2 italic">
                  Contoh: "{currentQuestion.word.exampleEn}"
                </p>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => {
                let btnClass = 'bg-western-beige border-2 border-[rgba(42,30,18,0.08)] hover:border-western-terracotta/50';

                if (selectedAnswer !== null) {
                  if (index === currentQuestion.correctIndex) {
                    btnClass = 'bg-[#7D8B6A]/15 border-2 border-[#7D8B6A]';
                  } else if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
                    btnClass = 'bg-[#C5503B]/10 border-2 border-[#C5503B]';
                  } else {
                    btnClass = 'bg-western-beige/50 border-2 border-[rgba(42,30,18,0.05)] opacity-60';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`${btnClass} rounded-lg px-5 py-4 text-left transition-all flex items-center gap-3`}
                  >
                    <span className="w-8 h-8 rounded-full bg-western-cream border border-[rgba(42,30,18,0.12)] flex items-center justify-center font-mono-data text-sm font-medium text-western-deep shrink-0">
                      {selectedAnswer !== null && index === currentQuestion.correctIndex ? (
                        <Check size={16} className="text-[#7D8B6A]" />
                      ) : selectedAnswer !== null && index === selectedAnswer && index !== currentQuestion.correctIndex ? (
                        <X size={16} className="text-[#C5503B]" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="font-body text-base text-western-deep">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer feedback */}
            {selectedAnswer !== null && (
              <div className="flex items-center justify-between">
                <div className={`font-body font-semibold text-sm ${selectedAnswer === currentQuestion.correctIndex ? 'text-[#7D8B6A]' : 'text-[#C5503B]'}`}>
                  {selectedAnswer === currentQuestion.correctIndex ? 'Benar!' : 'Salah!'}
                </div>
                <button
                  onClick={nextQuestion}
                  className="bg-western-terracotta hover:bg-[#b34733] text-[#F0EBE0] font-body font-semibold text-sm px-6 py-2.5 rounded-md transition-colors flex items-center gap-2"
                >
                  {currentIndex < questions.length - 1 ? 'Lanjut' : 'Lihat Hasil'}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Finished */}
        {state === 'finished' && (
          <div className="text-center space-y-6">
            <div className="bg-western-beige border border-[rgba(42,30,18,0.08)] rounded-xl p-8">
              <Trophy className={`mx-auto mb-4 ${getScoreMessage().color}`} size={48} />
              <h2 className={`font-display text-2xl ${getScoreMessage().color} mb-2`}>
                {getScoreMessage().msg}
              </h2>
              <p className="font-mono-data text-4xl font-medium text-western-deep mb-1">
                {score} / {QUESTION_COUNT}
              </p>
              <p className="font-body text-sm text-[#6B5D4E]">
                {Math.round((score / QUESTION_COUNT) * 100)}% benar
              </p>

              {/* Answer review */}
              <div className="mt-6 space-y-2">
                {questions.map((q, i) => (
                  <div
                    key={q.word.id}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-left ${
                      answers[i] ? 'bg-[#7D8B6A]/10' : 'bg-[#C5503B]/10'
                    }`}
                  >
                    {answers[i] ? (
                      <Check size={16} className="text-[#7D8B6A] shrink-0" />
                    ) : (
                      <X size={16} className="text-[#C5503B] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="font-body text-sm font-semibold text-western-deep">{q.word.word}</span>
                      <span className="font-body text-sm text-[#6B5D4E]"> — {q.word.meaning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setState('setup')}
              className="bg-western-terracotta hover:bg-[#b34733] text-[#F0EBE0] font-body font-semibold text-sm px-8 py-3 rounded-md transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Main Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
