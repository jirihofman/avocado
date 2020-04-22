import React from 'react'
import PropTypes from 'prop-types'

// import styles from './Timeline.scss'
export default function Timeline ({
  baseLine,
  frameWidth,
  gapMax,
  gapMin,
  maxFrame,
  textLine,
  type,
  xOrigin
}) {
//   let variant = ''
//   if (type === 'light') {
//     variant = styles.variantLight
//   }

  /** Vertical lines on x axis by hours */
  const verticals = []
  /** Labels on x axis */
  const labels = []
  for (let index = 0; index <= maxFrame; index++) {
    let height = 5
    // every 10 hours (20 frames), text with hours value on axis x
    if (index % 20 === 0) {
      height = 10
      labels.push(<text x={index * frameWidth + xOrigin - 10} y={textLine + 15} fill='grey'>{`${index / 2}:00`}</text>)
    }
    // every hour (2 frames)
    if (index % 2 === 0) {
      verticals.push(<line x1={index * frameWidth + xOrigin} x2={index * frameWidth + xOrigin} y1={baseLine} y2={baseLine - height} stroke='blue' />)
    }
  }

  return (
    <span>
      <svg height='800px' width='2500px'>
        <g>
          <line
            x1={xOrigin}
            y1={baseLine}
            x2={maxFrame * frameWidth + xOrigin}
            y2={baseLine}
            // className={styles.line}
            stroke='blue'
          />
          {/* doplň chybějící kód */}
          {verticals}
          {labels}
        </g>
      </svg>
    </span>
  )
}

Timeline.propTypes = {
  baseLine: PropTypes.number.isRequired,
  gapMax: PropTypes.number,
  gapMin: PropTypes.number,
  frameWidth: PropTypes.number.isRequired,
  maxFrame: PropTypes.number.isRequired,
  textLine: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['default', 'light']),
  xOrigin: PropTypes.number
}
Timeline.defaultProps = {
  baseLine: 400,
  frameWidth: 10,
  gapMax: -1,
  gapMin: -1,
  maxFrame: 240,
  textLine: 410,
  type: 'default',
  xOrigin: 50
}
