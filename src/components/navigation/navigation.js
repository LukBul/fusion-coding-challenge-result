import React from 'react';

import './navigation.css';

const chooseFilterButtons = [
  { name: 'Column graph', label: 'column'},
  { name: 'Line graph', label: 'line'}
]

function Navigation({ onChartChange, activeChart }) {

  const buttons = chooseFilterButtons.map(({name, label}) => {
    const isActive = label === activeChart;
    const classNames = 'btn ' + (isActive ? 'btn-info' : '');

    return (
      <button 
        key={name}
        type="button"
        onClick={() => onChartChange(label)}
        className={classNames}
      >
        {name}
      </button>
    )
  })
  return (
    <div className="navigation">
      { buttons }
    </div>
  )
}

export default Navigation;
