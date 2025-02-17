import './index.css'

import Header from '../Header'

import AllJobsSection from '../AllJobsSection'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-container">
      <div className="jobs-sections">
        <AllJobsSection />
      </div>
    </div>
  </>
)

export default Jobs
