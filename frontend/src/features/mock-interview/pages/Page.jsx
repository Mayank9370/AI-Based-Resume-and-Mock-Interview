import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, FileText, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

/* ----------------------------------------------
  MINIMAL INTERNAL UI COMPONENTS (No external imports)
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

// SIMPLE TABS IMPLEMENTATION
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
  MAIN DASHBOARD PAGE (SELF-CONTAINED)
------------------------------------------------ */

export default function Page() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target.result === "string") {
        setResumeText(event.target.result);
      }
    };
    reader.readAsText(file);
  };

  const handleStartInterview = async () => {
    if (!jobRole) {
      toast.error("Please enter a job role");
      return;
    }

    // Show "Coming Soon" toast notification
    toast.success("🚀 Mock Interview feature coming soon! Stay tuned.", {
      duration: 4000,
      icon: "⏳",
    });

    // Original API call commented out for future implementation
    /*
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole,
          jobDescription,
          resumeText,
          userId: "demo-user",
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/interview/${data.interview._id}`);
      } else {
        alert("Failed to create interview");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating interview");
    }

    setLoading(false);
    */
  };

  return (
    <div className="min-h-screen bg-background">
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

                  <TabsContent value="upload">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                        onChange={handleFileUpload}
                      />

                      <label htmlFor="resume-upload" className="cursor-pointer">
                        {fileName ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="h-8 w-8 text-primary" />
                            <span>{fileName}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                            <p>Click to upload your resume</p>
                            <p className="text-sm text-gray-500">Supports TXT, PDF, DOC, DOCX</p>
                          </>
                        )}
                      </label>
                    </div>
                  </TabsContent>

                  <TabsContent value="write">
                    <Textarea
                      placeholder="Describe your work experience..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Start Button */}
              <Button
                onClick={handleStartInterview}
                disabled={loading || !jobRole}
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
