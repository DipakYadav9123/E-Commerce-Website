import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackButtonClick, trackResumeDownload, trackResumeViewOnline, trackResumeContact } from '../utils/analytics';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('experience');

  const handleDownload = () => {
    // Track download event
    trackResumeDownload();
    
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You'll need to add your resume PDF to public folder
    link.download = 'YourName_Resume.pdf';
    link.click();
  };

  const handleViewOnline = () => {
    trackResumeViewOnline();
    window.open('/resume.pdf', '_blank');
  };

  const resumeData = {
    personal: {
      name: "Your Name",
      title: "Full Stack Developer",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "City, State",
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername",
      website: "yourwebsite.com"
    },
    summary: "Passionate Full Stack Developer with 3+ years of experience building modern web applications. Skilled in React, Node.js, Python, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.",
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "Tech Company Inc.",
        period: "2022 - Present",
        description: "Led development of multiple web applications using React, Node.js, and AWS. Improved application performance by 40% and reduced deployment time by 60%.",
        achievements: [
          "Developed and maintained 5+ production applications",
          "Mentored 3 junior developers",
          "Implemented CI/CD pipelines reducing deployment time by 60%"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2021 - 2022",
        description: "Built scalable web applications and APIs. Collaborated with cross-functional teams to deliver high-quality products.",
        achievements: [
          "Built RESTful APIs serving 10,000+ daily requests",
          "Implemented responsive UI components used across 3 applications",
          "Reduced bug reports by 30% through improved testing"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University Name",
        year: "2021",
        gpa: "3.8/4.0"
      }
    ],
    skills: {
      "Frontend": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Sass", "Redux", "Next.js"],
      "Backend": ["Node.js", "Python", "Express.js", "Django", "REST APIs", "GraphQL"],
      "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      "DevOps": ["AWS", "Docker", "Git", "CI/CD", "Linux"],
      "Tools": ["VS Code", "Postman", "Figma", "Jira", "Slack"]
    },
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product management, payment integration, and admin dashboard.",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
        link: "https://github.com/yourusername/ecommerce"
      },
      {
        name: "Task Management App",
        description: "Developed a collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        tech: ["React", "Socket.io", "Express.js", "PostgreSQL"],
        link: "https://github.com/yourusername/taskapp"
      }
    ]
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="resume-modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="resume-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="resume-modal-header">
            <h2>Resume - {resumeData.personal.name}</h2>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="resume-modal-content">
            {/* Personal Info */}
            <div className="resume-section personal-info">
              <h3>{resumeData.personal.name}</h3>
              <p className="title">{resumeData.personal.title}</p>
              <div className="contact-info">
                <p>📧 {resumeData.personal.email}</p>
                <p>📱 {resumeData.personal.phone}</p>
                <p>📍 {resumeData.personal.location}</p>
                <p>💼 <a href={`https://${resumeData.personal.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                <p>🐙 <a href={`https://${resumeData.personal.github}`} target="_blank" rel="noopener noreferrer">GitHub</a></p>
              </div>
            </div>

            {/* Summary */}
            <div className="resume-section">
              <h4>Professional Summary</h4>
              <p>{resumeData.summary}</p>
            </div>

            {/* Navigation Tabs */}
            <div className="resume-tabs">
              <button 
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
              <button 
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button 
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button 
                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'experience' && (
                <div className="resume-section">
                  <h4>Professional Experience</h4>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <div className="exp-header">
                        <h5>{exp.title}</h5>
                        <span className="company">{exp.company}</span>
                        <span className="period">{exp.period}</span>
                      </div>
                      <p>{exp.description}</p>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="resume-section">
                  <h4>Education</h4>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <h5>{edu.degree}</h5>
                      <p>{edu.school} • {edu.year}</p>
                      <p>GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="resume-section">
                  <h4>Technical Skills</h4>
                  {Object.entries(resumeData.skills).map(([category, skills]) => (
                    <div key={category} className="skills-category">
                      <h5>{category}</h5>
                      <div className="skills-list">
                        {skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="resume-section">
                  <h4>Featured Projects</h4>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <h5>{project.name}</h5>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Project →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="resume-modal-actions">
            <button className="btn download-btn" onClick={handleDownload}>
              📥 Download PDF
            </button>
            <button className="btn view-btn" onClick={handleViewOnline}>
              👁️ View Online
            </button>
            <button className="btn contact-btn" onClick={() => {
              trackResumeContact();
              window.location.href = 'mailto:' + resumeData.personal.email;
            }}>
              📧 Contact Me
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal; 