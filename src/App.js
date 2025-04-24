import React, { useState, useRef } from 'react';
import { FiUpload, FiPlay, FiPause, FiTrash2, FiLoader } from 'react-icons/fi';
import './NotesConverter.css';

const NotesConverter = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setTextResult('');
      setSummary('');
    }
  };

  const processNotes = async () => {
    if (!image) return;
    
    setIsLoading(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulated results
      setTextResult("This is a simulated result from handwritten text recognition. In a real application, this would be the actual text extracted from your uploaded image using an OCR service. The text would then be converted to audio and summarized automatically.");
      setSummary("Simulated summary: The text explains this is a demonstration of handwritten note conversion. In a real app, you'd see your actual note content summarized here.");
      setProgress(100);
    } catch (error) {
      console.error("Error processing notes:", error);
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAll = () => {
    setImage(null);
    setPreview(null);
    setTextResult('');
    setSummary('');
    setIsLoading(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>InkToVoice</h1>
        <p>Transform your handwritten notes into audio summaries</p>
      </div>

      <div className="main-content">
        <div className="upload-card">
          {preview ? (
            <div className="image-preview-container">
              <div className="image-preview">
                <img src={preview} alt="Uploaded notes" />
                <button className="remove-btn" onClick={resetAll}>
                  <FiTrash2 size={18} />
                </button>
              </div>
              {!textResult && (
                <button 
                  className="process-btn"
                  onClick={processNotes}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="spin" size={18} />
                      <span>Processing {progress}%</span>
                    </>
                  ) : (
                    'Convert to Audio'
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="upload-area">
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">
                  <FiUpload size={48} />
                </div>
                <h3>Upload Handwritten Notes</h3>
                <p>PNG, JPG, or PDF (Max 10MB)</p>
                <input 
                  id="file-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </label>
            </div>
          )}
        </div>

        {(textResult || isLoading) && (
          <div className="results-container">
            <div className="result-card">
              <h3>
                <span className="icon-text">📝</span> Extracted Text
              </h3>
              <div className="text-content">
                {isLoading && !textResult ? (
                  <div className="loading-placeholder">
                    <div className="loading-line"></div>
                    <div className="loading-line"></div>
                    <div className="loading-line"></div>
                  </div>
                ) : (
                  <p>{textResult}</p>
                )}
              </div>
            </div>

            <div className="result-row">
              <div className="result-card audio-card">
                <h3>
                  <span className="icon-text">🔊</span> Audio Version
                </h3>
                <button className="play-btn" onClick={playAudio}>
                  {isPlaying ? (
                    <>
                      <FiPause size={18} /> Pause
                    </>
                  ) : (
                    <>
                      <FiPlay size={18} /> Play Audio
                    </>
                  )}
                </button>
                <div className="audio-wave">
                  {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, i) => (
                    <div 
                      key={i} 
                      className={`wave-bar ${isPlaying ? 'animate' : ''}`}
                      style={{ height: `${height * 6}px`, animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <audio 
                  ref={audioRef} 
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  onEnded={() => setIsPlaying(false)}
                  hidden
                />
              </div>

              <div className="result-card summary-card">
                <h3>
                  <span className="icon-text">📌</span> Key Summary
                </h3>
                <div className="text-content">
                  {isLoading && !summary ? (
                    <div className="loading-placeholder">
                      <div className="loading-line short"></div>
                      <div className="loading-line shorter"></div>
                    </div>
                  ) : (
                    <p>{summary}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <p>InkToVoice - Making your notes accessible and easy to digest</p>
      </div>
    </div>
  );
};

export default NotesConverter;