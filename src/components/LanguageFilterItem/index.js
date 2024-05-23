// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, onClickItem, isActive} = props
  const {id, language} = languageItem

  const updateLanguage = () => {
    onClickItem(id)
  }

  const className = isActive ? 'active-btn' : 'button'

  return (
    <button type="button" className={className} onClick={updateLanguage}>
      <li className="list-item">{language}</li>
    </button>
  )
}

export default LanguageFilterItem
