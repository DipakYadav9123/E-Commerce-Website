# Resume Setup Guide

## How to Add Your Resume PDF

1. **Create your resume PDF** using any tool (Word, Google Docs, Canva, etc.)

2. **Save it as `resume.pdf`** and place it in the `public` folder of this project

3. **Update the resume data** in `src/components/ResumeModal.jsx`:
   - Replace "Your Name" with your actual name
   - Update email, phone, location
   - Add your LinkedIn and GitHub profiles
   - Update the professional summary
   - Add your real work experience
   - Update education details
   - Add your actual skills
   - Include your real projects

4. **Customize the download filename** in the `handleDownload` function:
   ```javascript
   link.download = 'YourName_Resume.pdf'; // Change to your name
   ```

## File Structure
```
public/
├── resume.pdf          ← Add your resume here
├── index.html
├── favicon.ico
└── ... (other files)
```

## Features Included
- ✅ Professional modal design
- ✅ Tabbed sections (Experience, Education, Skills, Projects)
- ✅ Download PDF functionality
- ✅ View online option
- ✅ Contact button (opens email)
- ✅ Analytics tracking
- ✅ Responsive design
- ✅ Dark/light theme support

## Analytics Events Tracked
- `resume_download` - When user downloads the PDF
- `resume_view_online` - When user views online
- `resume_contact` - When user clicks contact
- `hire_me_button` - When user opens the modal

The "Hire Me" button is now visible in the footer and will open your resume in a professional modal! 