import React, { useState, useEffect } from "react";
import "./Fandq.css";

export default function App() {
  const [view, setView] = useState("flashcards");
  const [flipped, setFlipped] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const flashData = await Promise.resolve([
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        { question: "React is a ____?", answer: "JavaScript library" },
      ]);
      setFlashcards(flashData);
    };

    const fetchQuizQuestions = async () => {
      const quizData = await Promise.resolve([
        {
          question: "What is the largest planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          answer: "Jupiter",
        },
        {
          question: "What is the boiling point of water?",
          options: ["90°C", "100°C", "110°C", "80°C"],
          answer: "100°C",
        },
      ]);
      setQuizQuestions(quizData);
    };

    fetchFlashcards();
    fetchQuizQuestions();
  }, []);

  const handleFlip = (index) => {
    setFlipped(flipped === index ? null : index);
  };

  const handleAnswer = (option) => {
    setSelected(option);
  };

  const handleSubmit = () => {
    if (selected === quizQuestions[quizIndex].answer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const nextQuestion = () => {
    setQuizIndex(quizIndex + 1);
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="nav-link">Home</a>
        </div>

        <div className="navbar-center">
          <button onClick={() => setView("flashcards")}>Flashcards</button>
          <button onClick={() => setView("quizzes")}>Quizzes</button>
        </div>

        <div className="navbar-right">
          <button className="profile-button">Profile</button>
        </div>
      </nav>

       


      <div
        className="login-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/bg3.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        {view === "flashcards" && (
          <div className="flashcards-container">
            {flashcards.map((card, index) => (
              <div
                key={index}
                className={`card ${flipped === index ? "flipped" : ""}`}
                onClick={() => handleFlip(index)}
              >
                <div className="front">{card.question}</div>
                <div className="back">{card.answer}</div>
              </div>
            ))}
          </div>
        )}

        {view === "quizzes" && (
          <div className="quiz-container">
            {quizIndex < quizQuestions.length ? (
              <div className="quiz-card">
                <h2>{quizQuestions[quizIndex].question}</h2>
                <div className="options">
                  {quizQuestions[quizIndex].options.map((option, i) => (
                    <button
                      key={i}
                      className={`option-button ${
                        selected === option ? "selected" : ""
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {!submitted ? (
                  <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={!selected}
                  >
                    Submit
                  </button>
                ) : (
                  <button className="next-button" onClick={nextQuestion}>
                    Next
                  </button>
                )}
              </div>
            ) : (
              <h2>Your score: {score} / {quizQuestions.length}</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
