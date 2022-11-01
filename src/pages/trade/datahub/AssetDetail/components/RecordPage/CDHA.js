import TradeButton from '@components/TradeButton'
import React from 'react'
import { CDHAWrapperStyled } from './styled'

function CDHA({data,dataResult,dataDetail,...props}) {

  return (
   <CDHAWrapperStyled>
      <div >
      {dataResult?.cdha?.map((item,index)=>(
        <div className='cdha-item'>
          <h2>{item?.tenDichVu.trim()}</h2>
          {item?.pacsUrl&&<a href={item?.pacsUrl} target="_blank" >
            <TradeButton
              content={"Xem ảnh"}
              colorText={"#ffffff"}
              className='mb-2'
            />
          </a>}
          <p className='cdha-item-name'>Mô tả</p>
          <ul>
            {item?.ketQua?.formatBenhAn().map((itemm,index)=>(
              <div key={index}>{itemm}</div>
            ))}
          </ul>
          <p className='cdha-item-name'>Kết luận</p>
          <p>{item?.ketLuan?.trim().formatBenhAn().map((itemm,index)=>(
              <div key={index}>{itemm}</div>
            ))}</p>
        </div>
      ))}
      </div>
   </CDHAWrapperStyled>
  )
}

export default CDHA