import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductVideo.css';

const ProductVideo = ({ video, onClose, isOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Reset video state when modal opens
      setIsPlaying(false);
      setCurrentTime(0);
      setVolume(1);
      setIsMuted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (showControls && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="video-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-header">
              <h3>{video.title}</h3>
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            
            <div className="video-container">
              <div 
                className="video-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowControls(false)}
              >
                <iframe
                  ref={videoRef}
                  src={`https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&origin=${window.location.origin}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="youtube-iframe"
                />
                
                {/* Custom Video Controls */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div 
                      className="video-controls"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="controls-top">
                        <div className="video-info">
                          <h4>{video.title}</h4>
                          <p>{video.description}</p>
                        </div>
                      </div>
                      
                      <div className="controls-bottom">
                        <div className="progress-bar" onClick={handleSeek}>
                          <div 
                            className="progress-fill"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        
                        <div className="controls-main">
                          <button 
                            className="control-btn play-pause"
                            onClick={handlePlayPause}
                          >
                            {isPlaying ? '⏸️' : '▶️'}
                          </button>
                          
                          <div className="time-display">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                          
                          <div className="volume-control">
                            <button 
                              className="control-btn"
                              onClick={handleMuteToggle}
                            >
                              {isMuted ? '🔇' : '🔊'}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="volume-slider"
                            />
                          </div>
                          
                          <button 
                            className="control-btn"
                            onClick={handleFullscreen}
                          >
                            ⛶
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="video-footer">
              <div className="video-meta">
                <span className="duration">Duration: {video.duration}</span>
                <span className="views">• Educational Content</span>
              </div>
              <div className="video-actions">
                <button className="action-btn">
                  📖 Learn More
                </button>
                <button className="action-btn">
                  💬 Ask Questions
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductVideo; 