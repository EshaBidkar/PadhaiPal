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
  const [topic, setTopic] = useState("general");

  useEffect(() => {
    fetchFlashcards(topic);
    fetchQuizQuestions(topic);
  }, [topic]);

  const fetchFlashcards = async (selectedTopic) => {
    let flashData = [];
    if (selectedTopic === "general") {
      flashData = await Promise.resolve([
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        { question: "React is a ____?", answer: "JavaScript library" },
      ]);
    } else if (selectedTopic === "software") {
      flashData = await Promise.resolve([
        { question: "What does SDLC stand for?", answer: "Software Development Life Cycle" },
        { question: "Name one Agile framework.", answer: "Scrum" },
        { question: "Who is known as the father of software engineering?", answer: "Watts Humphrey" },
      ]);
    }
    setFlashcards(flashData);
  };

  const fetchQuizQuestions = async (selectedTopic) => {
    let quizData = [];
    if (selectedTopic === "general") {
      quizData = await Promise.resolve([
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
    } else if (selectedTopic === "software") {
      quizData = await Promise.resolve([
        {
          question: "Which model is known as the classic software development model?",
          options: ["Agile", "Waterfall", "V-Model", "Spiral"],
          answer: "Waterfall",
        },
        {
          question: "Which of these is NOT a phase of SDLC?",
          options: ["Requirement Analysis", "Design", "Deployment", "Shopping"],
          answer: "Shopping",
        },
      ]);
    }
    setQuizQuestions(quizData);
  };

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
      {/* Only one Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="brand">PadhaiPal</span>
        </div>

        <div className="navbar-right">
          <a href="/" className="nav-link">Home</a>
          <a href="/todo" className="nav-link">To-Do List</a>
          <a href="/lectures" className="nav-link">Lectures</a>
          <button onClick={() => setView("flashcards")} className="nav-button">Flashcards</button>
          <button onClick={() => setView("quizzes")} className="nav-button">Quizzes</button>
          <button className="profile-button">Profile</button>
        </div>
      </nav>

      {/* Background Section */}
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
        {/* Topic selection box */}
        <div className="topic-container">
          <label htmlFor="topic-select" className="topic-label">Select Topic:</label>
          <select
            id="topic-select"
            onChange={(e) => {
              setTopic(e.target.value);
              setQuizIndex(0);
              setScore(0);
              setFlipped(null);
            }}
            value={topic}
            className="topic-select"
          >
            <option value="general">General Knowledge</option>
            <option value="software">Software Engineering</option>
          </select>
        </div>

        {/* Flashcards View */}
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

        {/* Quizzes View */}
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
