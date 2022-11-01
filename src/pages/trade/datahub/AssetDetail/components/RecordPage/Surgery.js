import React from 'react'
import { SurgeryWrapperStyled } from './styled'

function Surgery({data,dataResult,dataDetail}) {
  return (
    <SurgeryWrapperStyled>
      {dataResult?.pttt?.map((item,index)=>(
        <div className='cdha-item'>
          <h2>{item?.tenDichVu}</h2>
          <p>Cách thức phẫu thuật</p>
          <ul>
            <li>{item?.cachThucPttt}</li>
          </ul>
          <p>Chuẩn đoán ban đầu</p>
          <p>{item?.cdBanDau}</p>
          <p>kết luận</p>
          <p>{item?.ketLuan}</p>
        </div>
      ))}
    </SurgeryWrapperStyled>
  )
}

export default Surgery