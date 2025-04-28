import React from 'react';
import './App.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const userName = "Esha"; // Dynamic name can be set here

  const pieData = {
    labels: ['Quizzes', 'Flashcards', 'To-Do Completed', 'Lecture Hours'],
    datasets: [
      {
        label: 'Performance',
        data: [2, 60, 28, 10],
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
        borderColor: '#0a192f',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="app">
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

      <div className="performance-section" id="performance">
        <h2 className="performance-title">📊 Performance Analysis</h2>

        <h3 style={{ color: '#ffffff', marginBottom: '2rem' }}>
          Hi {userName}, this is your Performance Analysis!
        </h3>

        <div className="performance-container">
          <div className="scores">
            <p>Quiz Score: 90%</p>
            <p>Flashcard Recall: 7%</p>
            <p>To-Do Completion: 93%</p>
            <p>Lecture Watching: 23%</p>
          </div>
          
          <div className="chart">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="swot-analysis">
          <h3>SWOT Analysis</h3>
          <table>
            <thead>
              <tr>
                <th>Strengths</th>
                <th>Weaknesses</th>
                <th>Opportunities</th>
                <th>Threats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strong Time Management</td>
                <td>Difficulty in Retaining Flashcards</td>
                <td>Opportunity to Explore New Learning Tools</td>
                <td>Procrastination</td>
              </tr>
              <tr>
                <td>Effective Lecture Notes</td>
                <td>Need to Improve Consistency in Quizzes</td>
                <td>Leverage Peer Discussions for Improved Learning</td>
                <td>Increased Distractions from Social Media</td>
              </tr>
              <tr>
                <td>High Motivation</td>
                <td>Limited Understanding in Some Topics</td>
                <td>Access to More Online Resources</td>
                <td>Time Management During Peak Study Times</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
