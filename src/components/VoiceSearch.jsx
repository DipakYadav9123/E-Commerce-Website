import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showVoiceToast } from './CustomToast';
import './VoiceSearch.css';

const VoiceSearch = ({ onSearch, placeholder = "Search products..." }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if SpeechRecognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      setupRecognition();
    } else {
      setIsSupported(false);
      setError('Voice search is not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const setupRecognition = () => {
    const recognition = recognitionRef.current;
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setTranscript('');
      showVoiceToast('start');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      switch (event.error) {
        case 'no-speech':
          setError('No speech detected. Please try again.');
          showVoiceToast('noSpeech');
          break;
        case 'audio-capture':
          setError('Audio capture failed. Please check your microphone.');
          showVoiceToast('error');
          break;
        case 'not-allowed':
          setError('Microphone access denied. Please allow microphone access.');
          showVoiceToast('error');
          break;
        case 'network':
          setError('Network error. Please check your connection.');
          showVoiceToast('error');
          break;
        case 'service-not-allowed':
          setError('Speech recognition service not allowed.');
          showVoiceToast('error');
          break;
        default:
          setError('Speech recognition error. Please try again.');
          showVoiceToast('error');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript && !error) {
        handleVoiceSearch(transcript);
        showVoiceToast('success', transcript);
      }
    };
  };

  const startListening = () => {
    if (!isSupported) {
      setError('Voice search is not supported in this browser');
      return;
    }

    try {
      setError('');
      setTranscript('');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleVoiceSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleManualSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setTranscript('');
    setError('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }
  };

  return (
    <div className="voice-search-container" role="search">
      <div className="search-input-group">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={handleManualSearch}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search products"
            aria-describedby="voice-search-status"
          />
          
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="clear-search-btn"
              aria-label="Clear search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {isSupported ? (
          <motion.button
            onClick={isListening ? stopListening : startListening}
            className={`voice-search-btn ${isListening ? 'listening' : ''}`}
            aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
            title={isListening ? 'Stop voice search' : 'Start voice search'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isSupported}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="listening"
                  className="listening-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring delay-1"></div>
                  <div className="pulse-ring delay-2"></div>
                  🎤
                </motion.div>
              ) : (
                <motion.span
                  key="microphone"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  🎤
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ) : (
          <button
            className="voice-search-btn disabled"
            disabled
            aria-label="Voice search not supported"
            title="Voice search not supported"
          >
            🎤
          </button>
        )}
      </div>

      {/* Status Messages */}
      <div id="voice-search-status" className="voice-search-status" aria-live="polite">
        <AnimatePresence>
          {isListening && (
            <motion.div
              className="listening-status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="status-text">Listening...</span>
              {transcript && (
                <span className="transcript-text">"{transcript}"</span>
              )}
            </motion.div>
          )}

          {error && (
            <motion.div
              className="error-status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="error-text">{error}</span>
            </motion.div>
          )}

          {transcript && !isListening && !error && (
            <motion.div
              className="success-status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="success-text">Searching for: "{transcript}"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voice Commands Help */}
      <div className="voice-commands-help">
        <details>
          <summary>Voice Commands Help</summary>
          <div className="commands-list">
            <p>Try saying:</p>
            <ul>
              <li>"Show all products"</li>
              <li>"Find turmeric"</li>
              <li>"Search for neem"</li>
              <li>"Show organic products"</li>
              <li>"Find supplements"</li>
              <li>"Search herbal remedies"</li>
            </ul>
            <p className="note">Note: Voice search works best in quiet environments with clear speech.</p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default VoiceSearch; 