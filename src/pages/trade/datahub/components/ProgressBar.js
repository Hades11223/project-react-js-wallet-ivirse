import React from 'react'
import { ProgressBarWrapper } from './styled'

function ProgressBar({data,total}) {
  return (
    <ProgressBarWrapper length= {data/total*100}>
        <div className='progress-parent'>
            <div className='progress-children'></div>
        </div>

    </ProgressBarWrapper>
  )
}

export default ProgressBar