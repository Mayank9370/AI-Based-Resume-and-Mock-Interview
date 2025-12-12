export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-slate-800 font-sans">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <a href="/" className="flex items-center gap-2 mb-6 text-white text-2xl font-bold tracking-tight">
                            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            FundoCareer
                        </a>
                        <p className="max-w-xs text-slate-400 mb-6 leading-relaxed text-sm">
                            We help job seekers stand out in the highly competitive labor market with AI-powered tools and expert guidance.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Builder</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Templates</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Cover Letter Builder</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Enchancer</a></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Career Advice</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Interview Questions</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Examples</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Job Search</a></li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};