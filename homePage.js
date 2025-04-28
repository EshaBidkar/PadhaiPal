import React from 'react';
import './App.css';

function App() {
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url('image.png')`, // ✅ NO starting slash
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <header className="navbar">
        <div className="navbar-left">
          <h1>PadhaiPal</h1>
        </div>
        <div className="navbar-center">
          <a href="#handwritten" className="nav-link">Handwritten to Audio</a>
          <a href="#quizzes" className="nav-link">Quizzes & Flashcards</a>
          <a href="#performance" className="nav-link">Performance Analysis</a>
          <a href="#todo" className="nav-link">To-Do List</a>
          <a href="#youtube" className="nav-link">YouTube Lectures</a>
        </div>
        <div className="navbar-right">
          <button className="profile-button">Profile</button>
        </div>
      </header>

      <main className="home">
        <h2>Welcome to PadhaiPal</h2>
        <div className="options">
          <button className="option-button">Handwritten to Audio Conversion</button>
          <button className="option-button">Quizzes & Flashcards</button>
          <button className="option-button">Performance Analysis</button>
          <button className="option-button">Personalized To-Do List</button>
          <button className="option-button">YouTube Lecture Sources</button>
        </div>
      </main>
    </div>
  );
}

export default App;
