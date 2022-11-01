import { TunningIcon } from "@assets/svg";
import TradePagination from "@components/TradePagination";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import LinearText from "@pages/trade/components/LinearText";
import { TradeTable } from "@pages/trade/components/styled";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import FilterDrawer from "./FilterDrawer";
import SortItem from "./SortItem";
import {
  BaseResponsiveWrapper,
  ColSort,
  Content,
  DeviceCol,
  DeviceRow,
  HeaderSort,
  Title,
} from "./styled";

const BaseResponsive = ({
  title = "",
  childrenTitle = "",
  header,
  columns = [],
  dataSource = [],
  total = 0,
  params = { page: 0, size: 10 },
  rowKey = "id",
  onChangeParams = () => {},
  breakPoint = 992,
  ignoreNumberOrder = true,
  action,
  summary,
  clientSearch = false,
  filters,
  callbackWhenApply = () => {},
  onRow = () => {},
  handleChagePageSize = () => {},
}) => {
  const filterRef = useRef();
  const { width } = useDebounceWindowResize();

  const [state, _setState] = useState({
    clientDataSource: [],
    clientParams: { page: 0, size: 10 },
    draftFilter: {},
  });
  const { clientDataSource, clientParams, draftFilter } = state;

  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const setParams = (newClientParams = {}) => {
    setState({ clientParams: { ...clientParams, ...newClientParams } });
  };

  useEffect(() => {
    setState({
      clientDataSource: dataSource?.slice(
        clientParams.page * clientParams.size,
        clientParams.page * clientParams.size + clientParams.size
      ),
    });
  }, [clientParams]);

  useEffect(() => {
    let container = document.querySelector("#baseResponsiveTable");
    const flag = localStorage.getItem("kqxn")
    if(flag==="true")
      container.scrollIntoView();
  }, [
    clientParams.size,
    clientParams.page,
    clientSearch.page,
    clientSearch.size,
  ]);

  useEffect(() => {
    if (clientSearch) handleChangeParams({ page: 0, size: 10 });
  }, [dataSource]);

  const handleChangeParams = debounce((data = {}) => {
    if (data?.page && data.page == params.page) {
      data.page = 0;
    }
    if (clientSearch) {
      setParams({
        ...data,
      });
    } else {
      onChangeParams({
        ...data,
      });
    }
    window.scrollTo(0, 0);
  }, 300);

  const handleChangeSort = (sort = {}) => {
    handleChangeParams({ sort: { ...params.sort, ...sort } });
  };

  const mapDraftFilterToState = (newFilter = {}) => {
    callbackWhenApply(newFilter);
    handleChangeParams(newFilter);
  };
  let count = 0;

  const contentDevice = (record) => {
    let newColumns = ignoreNumberOrder ? columns.slice(1) : columns;
    return (
      <DeviceRow gutter={[24, 24]}>
        {newColumns.map((item, index) => {
          let title = item.title;
          // debugger
          let content =
            item?.render?.(record[item.dataIndex], record) ||
            record[item.dataIndex];
          let ignoreTitle = item.ignoreTitle || false;
          let titleBold = item.titleBold || false;
          let contentBold = item.contentBold || false;

          let widthLeft = width > 576 ? item.widthLeft?.ipad || 50 : 50;
          let widthRight = 100 - widthLeft;
          if (typeof content === "object" && content?._isBigNumber) {
            content = content?.hexToDecimal();
          }
          return (
            <DeviceCol xs={item.xs || 24} sm={item.sm || 24} key={index}>
              {!ignoreTitle && (
                <Title width={widthLeft} bold={titleBold}>
                  {title}
                </Title>
              )}
              <Content full={ignoreTitle} bold={contentBold} width={widthRight}>
                {content}
              </Content>
            </DeviceCol>
          );
        })}
      </DeviceRow>
    );
  };

  const SortHeaderMapper = columns.filter((item) => !!item.sorter);
  return (
    <BaseResponsiveWrapper id={"baseResponsiveTable"}>
      {width <= breakPoint && (
        <div className="d-flex justify-content-space-between">
          {" "}
          <div>
            {" "}
            <LinearText title={childrenTitle} fontSize={"20px"} />
          </div>
          {filters && (
            <div
              className="hover-pointer"
              onClick={() => {
                filterRef?.current?.show({
                  mapDraftFilterToState,
                });
              }}
            >
              <TunningIcon />
            </div>
          )}
        </div>
      )}
      {action}
      {width > breakPoint && (
        <TradeTable
          onRow={onRow}
          columns={columns}
          dataSource={clientSearch ? clientDataSource : dataSource}
          // scroll={{ x: 1300 }}
          scroll={{ x: 854 }}
          rowKey={rowKey}
          pagination={false}
          scrollToFirstRowOnChange={true}
          onChange={(pagination, filters, sorter, extra) => {
            if (sorter) {
              let objSort = {
                [sorter.field]: sorter.order
                  ? sorter.order == "ascend"
                    ? "asc"
                    : "desc"
                  : null,
              };
              handleChangeSort(objSort);
            }
          }}
          summary={summary}
        />
      )}
      {width <= breakPoint && (
        <>
          <HeaderSort justify="start">
            {SortHeaderMapper.map((item, index) => {
              return (
                <ColSort span={8} key={index}>
                  <SortItem
                    item={item}
                    onChange={(sorter) => {
                      if (sorter) {
                        let objSort = {
                          [sorter.dataIndex]: sorter.order,
                        };
                        handleChangeSort(objSort);
                      }
                    }}
                  />
                </ColSort>
              );
            })}
          </HeaderSort>
          {clientSearch === false &&
            dataSource?.map((record, index) => (
              <React.Fragment key={index}>
                {contentDevice(record)}
              </React.Fragment>
            ))}
          {clientSearch &&
            clientDataSource?.map((record, index) => (
              <React.Fragment key={index}>
                {contentDevice(record)}
              </React.Fragment>
            ))}
        </>
      )}
      <TradePagination
        className="mt-3"
        pageSizeOptions={[3, 5, 10, 15, 20]}
        total={clientSearch ? dataSource.length : total}
        defaultPageSize={10}
        defaultCurrent={1}
        onChange={(page, size) => {
          handleChangeParams({ page: page - 1, size });
        }}
        current={clientSearch ? clientParams.page + 1 : params.page + 1}
        pageSize={clientSearch ? clientParams.size : params.size}
        showSizeChanger={true}
        showLessItems={width < 576 ? true : false}
      />
      <FilterDrawer ref={filterRef} filters={filters} />
    </BaseResponsiveWrapper>
  );
};

export default BaseResponsive;
