import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, FileText } from "lucide-react";
import logo from "../assets/logo3.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const params = new URLSearchParams({
            response_type: "code",
            client_id: "777p4meyjnrqr4",
            redirect_uri: "http://localhost:5000/api/linkedin/callback",
            scope: "openid email profile",
        });

        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "AI Resume Builder", path: "/resume/dashboard" },
        { name: "Resume Enhancer", path: "/resume/dashboard" },
        { name: "Mock Interview", path: "/mockInterview" },
        { name: "Jobs", path: "/jobpage" },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-10 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img src={logo} className="h-10 w-10 rounded-full" alt="Logo" />
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Resumify
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                onClick={() => navigate(link.path)}
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
                            >
                                {link.name}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Login */}
                    <button
                        onClick={handleLogin}
                        className="hidden md:flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 hover:shadow-lg active:scale-95"
                    >
                        Login
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden p-2 text-slate-600 hover:text-slate-900"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-[101] w-full max-w-xs bg-white p-6 shadow-2xl 
                    transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <FileText size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-900">Resumify</span>
                    </div>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="rounded-full p-2 hover:bg-slate-100 text-slate-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            onClick={() => {
                                navigate(link.path);
                                setMenuOpen(false);
                            }}
                            className="text-lg font-medium text-slate-600 hover:text-indigo-600 cursor-pointer transition"
                        >
                            {link.name}
                        </div>
                    ))}

                    <div className="h-px w-full bg-slate-100 my-2"></div>

                    <button
                        onClick={handleLogin}
                        className="w-full rounded-lg bg-indigo-600 py-3 text-center text-white font-medium hover:bg-indigo-700 transition"
                    >
                        Login / Sign Up
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;