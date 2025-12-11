import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

const DashboardOverview = () => {
    const tools = [
        {
            icon: FileText,
            title: 'Resume Builder',
            description: 'Create professional, ATS-optimized resumes with our easy-to-use builder and customizable templates.',
            link: '/resume/dashboard',
            gradient: 'from-blue-500 to-indigo-600',
            bgGradient: 'from-blue-50 to-indigo-50',
            stats: '10+ Templates'
        },
        {
            icon: Sparkles,
            title: 'AI Enhancement',
            description: 'Improve your resume with AI-powered suggestions that make your content more compelling and effective.',
            link: '/resume/dashboard',
            gradient: 'from-purple-500 to-pink-600',
            bgGradient: 'from-purple-50 to-pink-50',
            stats: 'AI-Powered'
        },
        {
            icon: MessageSquare,
            title: 'Mock Interview',
            description: 'Practice interviews with AI feedback to boost your confidence and improve your interview skills.',
            link: '/mockInterview',
            gradient: 'from-green-500 to-teal-600',
            bgGradient: 'from-green-50 to-teal-50',
            stats: 'Practice & Learn'
        },
        {
            icon: Briefcase,
            title: 'LinkedIn Job Search',
            description: 'Automate your job search with smart filters and get detailed reports of relevant opportunities.',
            link: '/jobpage',
            gradient: 'from-orange-500 to-red-600',
            bgGradient: 'from-orange-50 to-red-50',
            stats: 'Smart Automation'
        }
    ];

    return (
        <div className="w-full py-20 px-4 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Start Your Journey
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose a tool to get started on your career development path.
                        Everything you need is right here.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                            <Link
                                key={index}
                                to={tool.link}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden"
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Title & Badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-bold text-slate-900">
                                            {tool.title}
                                        </h3>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${tool.gradient} text-white`}>
                                            {tool.stats}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {tool.description}
                                    </p>

                                    {/* Action Link */}
                                    <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                        <span>Get Started</span>
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                </div>

                                {/* Decorative Element */}
                                <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${tool.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-semibold">All tools are completely free to use</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardOverview;