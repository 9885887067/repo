// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props

  const {name, issuesCount, avatarUrl, forksCount, starsCount} = repoItem

  return (
    <li className="list-item">
      <div className="repo">
        <img src={avatarUrl} alt="avatar" className="avatar" />
        <h1 className="name">{name}</h1>
      </div>

      <div className="count-container">
        <div className="star-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="count-logo"
          />
          <p className="count">`${starsCount} stars`</p>
        </div>

        <div className="forks-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="count-logo"
          />
          <p className="count">`${forksCount} forks`</p>
        </div>

        <div className="issue-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="count-logo"
          />
          <p className="count">`${issuesCount} open issues`</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
