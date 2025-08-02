import React, { useState } from "react";
import axios from "axios";

const UploadResume = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, setFileFunc) => {
    const file = e.target.files[0];
    if (file) {
      setFileFunc(file);
    }
  };

  const handleTextChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (endpoint) => {
    const formData = new FormData();
    if (resumeFile) formData.append("resume", resumeFile);
    if (coverLetterFile) formData.append("cover_letter", coverLetterFile);
    formData.append("cover_letter_text", coverLetterText);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/${endpoint}`,
        formData
      );
      setResponseText(response.data.response);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseText("Error during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        🚀 AI-Powered Resume & Cover Letter Optimizer
      </h1>

      <div className="mb-4">
        <label className="block font-medium mb-2">📝 Job Description</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={6}
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => handleTextChange(e, setJobDescription)}
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-2">⬆️ Upload Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, setResumeFile)}
          />
        </div>
        <div>
          <label className="block font-medium mb-2">📄 Upload Cover Letter (PDF/TXT)</label>
          <input
            type="file"
            accept="application/pdf,text/plain"
            onChange={(e) => handleFileChange(e, setCoverLetterFile)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">
          Or paste your Cover Letter here
        </label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Paste cover letter text..."
          value={coverLetterText}
          onChange={(e) => handleTextChange(e, setCoverLetterText)}
        ></textarea>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleSubmit("evaluate-resume")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          🌟 Evaluate Resume
        </button>
        <button
          onClick={() => handleSubmit("match-percentage")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          📊 ATS Match & Keywords
        </button>
        <button
          onClick={() => handleSubmit("formatting-analysis")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          🎨 Formatting Feedback
        </button>
        <button
          onClick={() => handleSubmit("quantify-achievements")}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          📈 Quantifiable Achievements
        </button>
        <button
          onClick={() => handleSubmit("verb-enhancement")}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          💪 Action Verb Enhancer
        </button>
        <button
          onClick={() => handleSubmit("skill-gap-analysis")}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          💡 Skill Gap Analysis
        </button>
        <button
          onClick={() => handleSubmit("cover-letter-analysis")}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          ✉️ Analyze Cover Letter
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-600 mb-4">Processing... ⏳</div>
      )}

      {responseText && (
        <div className="bg-gray-100 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-2">Response</h2>
          <pre className="whitespace-pre-wrap">{responseText}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
