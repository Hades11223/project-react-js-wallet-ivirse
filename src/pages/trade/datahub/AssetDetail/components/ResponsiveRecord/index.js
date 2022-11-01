import { SelectDown } from "@assets/svg";
import React from "react";
import { useState } from "react";
import { ResponsiveRecordWrapper } from "./styled";

function ResponsiveRecord({ icon, title, content }) {
  const [active, setActive] = useState(false);
  return (
    <ResponsiveRecordWrapper>
      <div className={`${active?"active-header":""} header d-flex align-items-center justify-content-space-between`}>
        <div className={ "d-flex align-items-center"}>
          <span className="mr-2">{icon}</span>
          <span>{title}</span>
        </div>
        <SelectDown className={`${active?"rotate-90":""}`} onClick={()=>{
            setActive(!active)
            if(title === "KQ xét nhiệm") {
                localStorage.setItem("kqxn",!active)
            } 
            if(title === "Thuốc"){
                localStorage.setItem("kqxn",false)
            }
        }} />
      </div>
      {active&&<>
        <div className="devider"></div>
        <div className="content">{content}</div>
      </>}
    </ResponsiveRecordWrapper>
  );
}

export default ResponsiveRecord;
