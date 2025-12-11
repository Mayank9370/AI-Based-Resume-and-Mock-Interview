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
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black pb-20">
            <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 bg-indigo-300 blur-[100px] opacity-30"></div>

            {/* Avatars + Stars */}
            <div className="flex items-center mt-24">
                <div className="flex -space-x-3 pr-3">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 rounded-full border-2 border-white object-cover" />
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white object-cover" />
                </div>

                <div>
                    <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                            <svg key={i} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-transparent fill-indigo-600">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679..." />
                            </svg>
                        ))}
                    </div>
                    <p className="text-sm text-gray-700">Used by 10,000+ users</p>
                </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4">
                Your Complete <span className="bg-gradient-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent">Career Development</span> Platform
            </h1>

            <p className="max-w-2xl text-center text-base my-7">
                Build professional resumes with AI enhancement, practice mock interviews, search LinkedIn jobs, and land your dream role — all in one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
                <a href="/resume/dashboard" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-9 h-12 flex items-center">
                    Build Resume
                </a>
                <a href="/mockInterview" className="flex items-center gap-2 border border-slate-400 hover:bg-indigo-50 rounded-full px-7 h-12">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>Practice Interview</span>
                </a>
            </div>
        </div>
    );
};

export default HeroSection;
