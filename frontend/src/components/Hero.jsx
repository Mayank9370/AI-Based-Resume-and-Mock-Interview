import React from "react";

const HeroSection = () => {
    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ];

    return (
        <section className="relative px-4 md:px-16 lg:px-24 xl:px-32 py-16 lg:py-24 overflow-hidden">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="z-10 flex flex-col items-start text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        #1 AI Resume Builder
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 tracking-tight mb-6">
                        Craft Your <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Dream Career</span>
                        <span className="block text-slate-900">Today.</span>
                    </h1>

                    <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                        Build ATS-friendly resumes, practice with AI interviews, and track your applications. Join 10,000+ professionals getting hired at top companies.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a href="/resume/dashboard" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg hover:shadow-indigo-200">
                            <span className="mr-2">Build Resume Now</span>
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="/mockInterview" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-medium text-slate-700 transition-all duration-300 hover:border-indigo-200 hover:bg-slate-50 hover:text-indigo-600">
                            Mock Interview
                        </a>
                    </div>

                    <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex -space-x-3">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-50 text-indigo-600 font-bold text-xs">
                                +2k
                            </div>
                        </div>
                        <p>Trusted by professionals from Google, Microsoft, & Amazon.</p>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative z-10 lg:ml-auto w-full max-w-lg lg:max-w-none">
                    {/* Abstract Background Blob */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                    {/* Main Card */}
                    <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
                        {/* Simple Browser Mockup Header */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        {/* Resume Preview Implementation */}
                        <div className="mt-8 bg-slate-50 rounded-xl p-6 min-h-[400px] flex flex-col gap-6">
                            {/* Header */}
                            <div className="flex gap-4 items-center border-b border-slate-200 pb-6">
                                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">👨‍💻</div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-1/3 bg-slate-800 rounded"></div>
                                    <div className="h-3 w-1/4 bg-slate-400 rounded"></div>
                                </div>
                            </div>
                            {/* Content Lines */}
                            <div className="space-y-3">
                                <div className="h-3 w-full bg-slate-200 rounded"></div>
                                <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                                <div className="h-3 w-4/6 bg-slate-200 rounded"></div>
                            </div>
                            <div className="space-y-3 mt-4">
                                <div className="h-3 w-2/3 bg-slate-800 rounded opacity-50"></div>
                                <div className="h-3 w-full bg-slate-200 rounded"></div>
                                <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Success Cards */}
                    {/* Card 1 */}
                    <div className="absolute -left-12 top-20 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Job Offer</p>
                            <p className="text-sm font-bold text-slate-800">Software Engineer</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="absolute -right-8 bottom-32 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-3 animate-bounce-slow animation-delay-1500">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Performance</p>
                            <p className="text-sm font-bold text-slate-800">Top 10% Applicant</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
