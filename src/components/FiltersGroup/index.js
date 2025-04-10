import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypes,
    salaryRange,
    employmentTypesList,
    salaryRangesList,
    selectEmploymentType,
    selectRangeList,
  } = props

  const renderEmploymentTypesList = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-lists-container">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId} className="filter-list-item">
            <input
              id={eachItem.employmentTypeId}
              type="checkbox"
              value={eachItem.employmentTypeId}
              onChange={selectEmploymentType}
              checked={employmentTypes.includes(eachItem.employmentTypeId)}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.employmentTypeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRangeList = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-lists-container">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId} className="filter-list-item">
            <input
              id={eachItem.salaryRangeId}
              type="radio"
              checked={salaryRange === eachItem.salaryRangeId}
              onChange={selectRangeList}
              value={eachItem.salaryRangeId}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.salaryRangeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group">
      {renderEmploymentTypesList()}
      <hr className="filter-horizontal-line" />
      {renderSalaryRangeList()}
    </div>
  )
}

export default FiltersGroup
