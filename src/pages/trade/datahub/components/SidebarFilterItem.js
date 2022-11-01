import React, { useState } from "react";
import { SidebarFilterItemWrapper } from "./styled";
import { Checkbox, Radio, Space } from "antd";
import { SelectDown } from "@assets/svg";
import { useSelector } from "react-redux";

const SidebarFilterItem = ({
  title,
  listOptions,
  filterFunction,
  type,
  AddingChildren,
  keyFilter,
  actived,
  filterNew = [""],
  show,
  // setShowFilter = () => {},
}) => {
  const [showFilter,setShowFilter] = useState(true)
  const filter = useSelector(state=>state?.datasharing?.sidebarFilter)
  const activeTokenList = useSelector(state=>state?.datasharing?.sidebarFilter.tokens)
  const activeCheckbox = useSelector(state => state?.datasharing?.sidebarFilter.listStatus)
  return (
    <SidebarFilterItemWrapper show={show} activedList={activeTokenList} activeCheckbox={activeCheckbox} >
      <div
        onClick={() => {
          setShowFilter(!showFilter)
          // setShowFilter({ [keyFilter]: !show });
        }}
        className="d-flex justify-content-space-between hover-pointer align-items-center mb-3"
      >
        <h1 className="filter-group__title  ">{title}</h1>
        <SelectDown className={`${showFilter === false ? "rotate90" : ""}`} />
      </div>
      {type==="multiFilterCollected" && showFilter && (
        <div>
          {listOptions.map((item,index)=>(
            <div 
            className={`${activeCheckbox.includes(item.value)?"actived" : ""} item-filter mb-2 hover-pointer`}
            onClick={()=>{
              if (activeCheckbox.includes(item?.value)) {
                let vitri = activeCheckbox.findIndex(
                  (val) => val === item.value
                );
                activeCheckbox.splice(vitri, 1);
                filterFunction( [...activeCheckbox] );
              } else
                filterFunction( [...activeCheckbox, item?.value]);
            }}>{item.label}</div>
          ))}
        </div>
      )}
      {type==="oneFilterCollected" && showFilter && (
        <div>
          {listOptions.map((item,index)=>(
            <div 
            className={`${activeTokenList===item.value?"actived" : ""} item-filter mb-2 hover-pointer d-flex align-items-center`}
            onClick={()=>{
              if(activeTokenList === item.value) {
                filterFunction()
              }
              else {
                filterFunction(item.value)
              }
            }}>
              <img className="mr-2" src={item.imgLink} />
              {item.label}</div>
          ))}
        </div>
      )}
      {type === "multiple" && showFilter&& (
        <Checkbox.Group options={listOptions} onChange={filterFunction} className="filter-checkbox" />
      )}
      {type === "one" &&showFilter&& (
        <Radio.Group options={listOptions} onChange={filterFunction} className="filter-radio"  />
      )}
      {showFilter && (
        <div>
          {type === "newOne" && (
            <div className="d-flex-column hover-pointer ">
              {listOptions.map((item, index) => (
                <div
                  className="padding-item"
                  onClick={() => {
                    if (keyFilter === "filterStatus") {
                      if (filterNew.includes(item?.value)) {
                        let vitri = filterNew.findIndex(
                          (val) => val === item.value
                        );
                        filterNew.splice(vitri, 1);
                        filterFunction({ [keyFilter]: [...filterNew] });
                      } else
                        filterFunction({
                          [keyFilter]: [...filterNew, item?.value],
                        });
                    } else {
                      if (actived === index + 1)
                        filterFunction({ [keyFilter]: null });
                      else filterFunction({ [keyFilter]: item?.value });
                    }
                  }}
                >
                  
                  <div
                    className={`padding-top hover-pointer mb-1 ${
                      keyFilter === "filterStatus" &&
                      actived.includes(index + 1)
                        ? "actived"
                        : ""
                    } ${actived - 1 === index ? "actived" : ""} item-filter d-flex align-items-center` }
                    key={index}
                  >
                    <img className="mr-2" src={item.imgLink} />
                    {item?.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {AddingChildren && AddingChildren}
          <hr className="filter-group-divider" />
        </div>
      )}
    </SidebarFilterItemWrapper>
  );
};

export default SidebarFilterItem;
