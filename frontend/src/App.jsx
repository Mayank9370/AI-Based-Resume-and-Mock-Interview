import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Login from './features/auth/component/Login';
import Profile from './features/auth/component/Profile';
import ResumeDashboard from './features/resume-builder/pages/ResumeDashboard';
import ResumeBuilder from './features/resume-builder/pages/ResumeBuilder';
import Banner from './components/Banner';
import Navbar from './components/NavBar';
import JobsPage from './features/jobs/Pages/JobsPage';
import About from './components/About';
import Footer from './components/Footer';
import Page from './features/mock-interview/pages/Page';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Toaster position='top-right' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/resume/dashboard' element={<ResumeDashboard />} />
        <Route path='/resumeBuilder/:resumeId' element={<ResumeBuilder />} />
        <Route path="/resumeBuilder" element={<ResumeBuilder />} />
        <Route path='/jobpage' element={<JobsPage />} />
        <Route path='/mockInterview' element={<Page />}  />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;