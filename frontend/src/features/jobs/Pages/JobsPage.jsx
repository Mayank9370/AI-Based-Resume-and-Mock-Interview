import React from 'react';
import { Download, Linkedin, FileText, CheckCircle, Zap } from 'lucide-react';
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import image3 from '../../../assets/image3.png';
import image4 from '../../../assets/image4.png';

const JobsPage = () => {

  const handleDownload = () => {
    window.location.href = "/Job_Automation.zip";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
          <span className="block text-blue-600">LinkedIn Job Automation</span>
          <span className="block">Supercharge Your Job Search</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Automate your job hunt with our powerful desktop tool. Fetch relevant jobs from LinkedIn, filter by your criteria, and get detailed reports delivered instantly.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Download className="w-6 h-6" />
            Download Tool (.exe)
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-400">Windows (x64) • v1.0.0</p>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
              <Linkedin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart LinkedIn Fetching</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatically scrape and aggregate job listings from LinkedIn based on your specific keywords, location, and filters without manual searching.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Excel Reports</h3>
            <p className="text-gray-600 leading-relaxed">
              Get comprehensive reports generated in Excel/CSV format, organizing job titles, companies, links, and descriptions for easy tracking and application.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Efficiency & Speed</h3>
            <p className="text-gray-600 leading-relaxed">
              Save hours of manual scrolling. Run the tool in the background and let it compile the best opportunities for you while you focus on interview prep.
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">See It In Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 aspect-video">
            <img src={image1} alt="Job Automation Interface" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-medium">Interactive Dashboard Interface</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 aspect-video">
            <img src={image2} alt="Search Configuration" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-medium">Advanced Search Filters</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 aspect-video">
            <img src={image3} alt="Report Generation" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-medium">Automated Report Generation</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 aspect-video">
            <img src={image4} alt="Results View" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-medium">Structured Job Results</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
export default JobsPage;