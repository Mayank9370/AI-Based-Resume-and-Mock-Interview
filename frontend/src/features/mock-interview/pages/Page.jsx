import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, FileText, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

/* ----------------------------------------------
  MINIMAL INTERNAL UI COMPONENTS
------------------------------------------------ */

// BUTTON
function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// INPUT
function Input({ className = "", ...props }) {
  return (
    <input
      className={`border rounded-md px-3 py-2 w-full bg-transparent ${className}`}
      {...props}
    />
  );
}

// LABEL
function Label({ className = "", children, ...props }) {
  return (
    <label className={`text-sm font-medium ${className}`} {...props}>
      {children}
    </label>
  );
}

// TEXTAREA
function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border rounded-md px-3 py-2 w-full min-h-[120px] bg-transparent ${className}`}
      {...props}
    />
  );
}

// CARD
function Card({ className = "", children }) {
  return <div className={`border rounded-xl p-6 ${className}`}>{children}</div>;
}

function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold mb-1">{children}</h2>;
}

function CardDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

// SIMPLE TABS
function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div>
      {children.map((child) =>
        child.type.name === "TabsList"
          ? React.cloneElement(child, { active, setActive })
          : null
      )}
      {children.map((child) =>
        child.type.name === "TabsContent" && child.props.value === active
          ? child
          : null
      )}
    </div>
  );
}

function TabsList({ children, active, setActive }) {
  return (
    <div className="grid grid-cols-2 bg-muted rounded-md border mb-3">
      {children.map((child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

function TabsTrigger({ value, active, setActive, children }) {
  const isActive = active === value;
  return (
    <button
      className={`py-2 text-sm font-medium rounded-md transition ${isActive ? "bg-white shadow" : "opacity-60"
        }`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ children }) {
  return <div>{children}</div>;
}

/* ----------------------------------------------
  MAIN COMPONENT — WITH COMING SOON UX
------------------------------------------------ */

export default function Page() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const notifyComingSoon = () => {
    toast.success("✨ Coming Soon — Stay Tuned!");
  };

  const handleFileUpload = () => {
    notifyComingSoon();
  };

  const handleDescriptionSubmit = () => {
    notifyComingSoon();
  };

  const handleStartInterview = () => {
    notifyComingSoon();
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ⭐ COMING SOON HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 text-center flex items-center justify-center gap-2 animate-pulse">
        <Sparkles className="h-5 w-5" />
        <span className="font-medium text-sm">
          🚀 Big Features Coming Soon — Stay Tuned!
        </span>
      </div>

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">New Interview</h1>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Setup Your Interview</CardTitle>
            <CardDescription>
              Upload your resume or describe your experience to generate interview questions.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">

              {/* Job Role */}
              <div>
                <Label htmlFor="jobRole">Job Role *</Label>
                <Input
                  id="jobRole"
                  placeholder="e.g., React Developer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>

              {/* Job Description */}
              <div>
                <Label htmlFor="jobDescription">Job Description (Optional)</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <Label>Resume / Experience</Label>

                <Tabs defaultValue="upload">
                  <TabsList>
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                    <TabsTrigger value="write">Write Description</TabsTrigger>
                  </TabsList>

                  {/* Upload Tab */}
                  <TabsContent value="upload">
                    <div
                      onClick={handleFileUpload}
                      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                    >
                      <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <p>Click to upload your resume</p>
                      <p className="text-sm text-gray-500">Supports TXT, PDF, DOC, DOCX</p>
                    </div>
                  </TabsContent>

                  {/* Write Tab */}
                  <TabsContent value="write">
                    <Textarea
                      placeholder="Describe your work experience..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="min-h-[200px]"
                    />

                    <Button
                      onClick={handleDescriptionSubmit}
                      className="mt-3 w-full"
                    >
                      Submit Description
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Start Button */}
              <Button
                onClick={handleStartInterview}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Questions...
                  </span>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
