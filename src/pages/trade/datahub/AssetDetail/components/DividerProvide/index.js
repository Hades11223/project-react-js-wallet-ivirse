import React from 'react'
import { DividerProvideStyled } from './styled'

function DividerProvide({nav , actived}) {

  return (
    <DividerProvideStyled>
         {nav?.map((item,index)=>(
            <div className={`${index === actived ? "actived-nav" : ""} divider `} style={{width : `${item.length}%`}} ></div>
         ))}

    </DividerProvideStyled>
  )
}

export default DividerProvide