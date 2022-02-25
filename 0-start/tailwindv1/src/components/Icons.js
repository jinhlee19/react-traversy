import React from 'react'
import '.icons.svg'

const Icons = (props) => {
    <svg className={`icon icon-${props.name}`}>
    <use xlinkHref={`#icons_${props.name}`} />
  </svg>
}

export default Icons