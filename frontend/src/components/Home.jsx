import About from './About'
import Banner from './Banner'
import CompanyLogos from './CompanyLogos'
import FAQ from './FAQ'
import Features from './Features'
import Footer from './Footer'
import Hero from './Hero'
import Review from './Review'
import { Subcription } from './Subcription'
import DashboardOverview from './DashboardOverview'

const Home = () => {
  return (
    <div>
      <Hero />

      <div className='flex flex-col gap-20'>
        {/* <CompanyLogos /> */}
        <Features />
        <DashboardOverview />
        <FAQ />
        {/* <Review /> */}
        {/* <Subcription /> */}
        {/* <About /> */}
      </div>
    </div>
  )
}
export default Home