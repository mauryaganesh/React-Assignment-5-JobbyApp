import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'failure',
  inProgress: 'IN_PROGRESS',
}

class ProfileSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-details-container">
        <img
          className="profile-details-image"
          src={profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-details-name">{name}</h1>
        <p className="profile-details-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  renderAllProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-section">{this.renderAllProfileView()}</div>
  }
}

export default ProfileSection
