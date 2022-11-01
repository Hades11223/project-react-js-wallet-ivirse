import React, { useEffect, useRef, useState } from "react";
import { DataInfoStepWrapper, GeneralStyleWrapper } from "../styled";
import { Row, Col, Select, Divider, Space, Input, Button } from "antd";
import TradeBasicSelect from "@components/TradeBasicSelect";
import { SelectType } from "@components/TradeBasicSelect/styled";
import TextArea from "antd/lib/input/TextArea";
import keywordProvider from "@data-access/keyword-provider";
import { debounce } from "lodash";
import useCustomState from "@hook/useCustomState";
import { PlusOutlined } from "@ant-design/icons";
import snackbarUtils from "@utils/snackbar-utils";

const DataInfoStep = ({ assetCId, setState, state }) => {
  // const listTypeSelect = [
  //   {
  //     title: "Service list",
  //     options: [],
  //     onChange: () => {},
  //   },
  //   {
  //     title: "Examination results",
  //     options: [],
  //     onChange: () => {},
  //   },
  //   {
  //     title: "Function exploration",
  //     options: [],
  //     onChange: () => {},
  //   },
  //   {
  //     title: "Image analysation",
  //     options: [],
  //     onChange: () => {},
  //   },
  //   {
  //     title: "Medicine",
  //     options: [],
  //     onChange: () => {},
  //   },
  // ];
  const [procState, setProcState] = useCustomState({
    listKeywords: [],
    params: {
      page: 0,
      size: 999,
    },
  });
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const handleChangeCategory = (categoryList) => {
    setState({
      categoryList,
    });
  };

  const handleChangeKeywords = (keywordsList) => {
    setState({
      keywordsList,
    });
  };

  const handleChangeMedicalUnit = (medicalUnit) => {
    setState({
      medicalUnit,
    });
  };

  const handleChangeDescription = (e) => {
    setState({
      description: e?.target?.value,
    });
  };

  const handleChangeReason = (e) => {
    setState({
      reason: e?.target?.value,
    });
  };

  const getListKeyword = async () => {
    let { params } = procState;
    keywordProvider
      .search(params)
      .then((res) => {
        if (res?.data?.code === 200) {
          setProcState({
            listKeywords: res?.data?.data?.map((item) => ({
              label: item?.label,
              value: item?.uId,
            })),
          });
        }
        if (res?.data?.code === 400) {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("keyword fetch err", err);
      });
  };

  const onAddingKeywordChange = (event) => {
    // if (event?.target?.value) {
    setName(event.target.value);
    // }
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (name !== "") {
      let newKeyword = { label: name };
      keywordProvider
        .create(newKeyword)
        .then((res) => {
          if (res?.data?.code === 201) {
            getListKeyword();
          }
          if (res?.data?.code === 400) {
            throw new Error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("Create keyword error", err);
          snackbarUtils.error(err?.message);
        });
    }
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  // const dataLocalArr = localStorage.getObj("test")
  // console.log(dataLocalArr,"dada")
  const [test,_setTest] = useState({

  })
  const setTest = (data={})=>{
    _setTest((prev)=>({...prev,...data}))
  }


  useEffect(() => {

    getListKeyword();
  }, []);

  return (
    <GeneralStyleWrapper>
      <DataInfoStepWrapper>
        <p className="asset-name">
          <span className="line-title">Name</span>
          <span className="line-value">{assetCId || ""}</span>
        </p>
        <Row className="category-and-keyword-selection" gutter={[20, 20]}>
          <Col md={12} lg={12} sm={24} xs={24}>
            <label className="line-title">Category</label>
            <div className="mt-3">
              <TradeBasicSelect
                showArrow
                className="category-select w-full"
                type={SelectType.TRANSPARENT_GRAY_ROUND}
                placeholder={"Chose"}
                options={[
                  { label: "EMR", value: 0 },
                  { label: "Internal", value: 1 },
                ]}
                value={state?.categoryList}
                onChange={handleChangeCategory}
              />
            </div>
          </Col>
          <Col md={12} lg={12} sm={24} xs={24}>
            <label className="line-title">Medical Unit</label>
            <div className="mt-3">
              <TradeBasicSelect
                showArrow
                // mode="multiple"
                className="category-select w-full"
                type={SelectType.TRANSPARENT_GRAY_ROUND}
                placeholder={"Chose"}
                options={[{ label: "EMR", value: 0 }]}
                onChange={handleChangeMedicalUnit}
                value={state?.medicalUnit}
              />
            </div>
          </Col>
          <Col md={24} lg={24} sm={24} xs={24}>
            <label className="line-title">Keywords</label>
            <div className="mt-3">
              <TradeBasicSelect
                showArrow
                mode="multiple"
                className="category-select w-full"
                type={SelectType.TRANSPARENT_GRAY_ROUND}
                placeholder={"Chose"}
                options={procState?.listKeywords}
                onChange={handleChangeKeywords}
                value={state?.keywordsList}
                dropdownRender={(menu) => {
                  return (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onAddingKeywordChange}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addKeyword}
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  );
                }}
              />
            </div>
          </Col>
        </Row>
        {/* <div className="type-field">
          <p className="line-title">Type</p>
          <div className="type-select-table">
            <div className="type-select-table__header d-flex">
              <div className="menu-head">Menu</div>
              <div className="summary-head">Summary</div>
            </div>
            <div className="type-select-table__body">
              {listTypeSelect?.map((item, index) => (
                <div className="type-select-item d-flex" key={index}>
                  <div className="type-select-item__title">{item?.title}</div>
                  <div className="type-select-item__select-field">
                    <Select
                      options={item?.options}
                      onChange={item?.onChange}
                      placeholder={"Choose/Type"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {/* <div className="reason-field mt-4">
          <p className="line-title">Reason</p>
          <TextArea
            className="description-input"
            rows={4}
            maxLength={100}
            placeholder="Reason"
            showCount
            onChange={handleChangeReason}
            value={state?.reason}
          />
        </div> */}
        <div className="description-field mt-4">
          <p className="line-title">Description</p>
          <TextArea
            className="description-input"
            rows={4}
            maxLength={1000}
            placeholder="Description your data"
            showCount
            onChange={handleChangeDescription}
            value={state?.description}
          />
        </div>
      </DataInfoStepWrapper>
    </GeneralStyleWrapper>
  );
};

export default DataInfoStep;
