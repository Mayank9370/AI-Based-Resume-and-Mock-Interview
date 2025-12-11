export default function Features() {
    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }}>

            <h1 className="text-3xl font-semibold text-center mx-auto">Powerful Career Tools</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-2xl mx-auto">Everything you need to succeed in your job search journey — from crafting the perfect resume to landing your dream job.</p>

            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 min-h-[400px] w-full max-w-7xl mt-10 mx-auto">
                {/* Resume Builder */}
                <div className="relative group transition-all duration-500 w-full md:w-auto md:flex-1 md:hover:flex-[3] h-[400px]">
                    <img className="h-full w-full object-cover object-center rounded-2xl"
                        src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="Resume Builder" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                        <h1 className="text-3xl font-bold">Resume Builder</h1>
                        <p className="text-sm mt-2">Create professional, ATS-optimized resumes in minutes with customizable templates and real-time preview.</p>

                    </div>
                </div>

                {/* AI Enhancement */}
                <div className="relative group transition-all duration-500 w-full md:w-auto md:flex-1 md:hover:flex-[3] h-[400px]">
                    <img className="h-full w-full object-cover object-center rounded-2xl"
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="AI Enhancement" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                        <h1 className="text-3xl font-bold">AI Resume Enhancement</h1>
                        <p className="text-sm mt-2">Enhance your resume content with AI-powered suggestions to make it more compelling and ATS-friendly.</p>

                    </div>
                </div>

                {/* Mock Interview */}
                <div className="relative group transition-all duration-500 w-full md:w-auto md:flex-1 md:hover:flex-[3] h-[400px]">
                    <img className="h-full w-full object-cover object-center rounded-2xl"
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="Mock Interview" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                        <h1 className="text-3xl font-bold">Mock Interview</h1>
                        <p className="text-sm mt-2">Practice real interview questions and get instant AI feedback to boost your confidence and performance.</p>

                    </div>
                </div>

                {/* LinkedIn Job Search */}
                <div className="relative group transition-all duration-500 w-full md:w-auto md:flex-1 md:hover:flex-[3] h-[400px]">
                    <img className="h-full w-full object-cover object-center rounded-2xl"
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&h=400&auto=format&fit=crop"
                        alt="LinkedIn Job Search" />
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                        <h1 className="text-3xl font-bold">LinkedIn Job Search</h1>
                        <p className="text-sm mt-2">Automate your job search with smart filters and get detailed reports of relevant opportunities.</p>

                    </div>
                </div>
            </div>
        </div>
    );
};