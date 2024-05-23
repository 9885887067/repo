import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repositeryData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getResponse()
  }

  getResponse = async () => {
    const {activeId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.progress,
    })

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?${activeId}`,
    )

    if (response.ok) {
      const data = await response.json()
      const updateData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({
        repositeryData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickItem = id => {
    this.setState({
      activeId: id,
    },this.getResponse)
  }

  renderRepositerView = () => {
    const {repositeryData} = this.state

    return (
      <ul className="repoItem-container">
        {repositeryData.map(repo => (
          <RepositoryItem key={repo.id} repoItem={repo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure">Something Went Wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositeries = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositerView()

      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="app-container">
        <div className="repo-container">
          <h1 className="heading">Popular</h1>
          <ul className="languageItem-container">
            {languageFiltersData.map(language => (
              <LanguageFilterItem
                languageItem={language}
                key={language.id}
                onClickItem={this.onClickItem}
                isActive={activeId === language.id}
              />
            ))}
          </ul>
          {this.renderRepositeries()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
