import { DownOutlined } from "@ant-design/icons";
import { ButtonAdmin } from "@pages/trade/AdminCommunity/Adminlist/components/AdminComponent";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FilterDrawerWrapper } from "./styled";

const FilterItemWrapper = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: ${(props) => (props.active ? "1px solid #9B5FCC" : "none")};
  padding: 6px 10px;
`;

const FilterGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const TitleText = styled.div`
  font-weight: bold;
  width: 100%;
`;
const FilterGroup = ({
  title = "",
  options = [],
  onChange = () => {},
  groupKey,
  value,
}) => {
  return (
    <FilterGroupWrapper>
      <TitleText>{title}</TitleText>
      {options?.map((item, index) => (
        <FilterItem
          key={index}
          label={item.label}
          active={value == item.value}
          onClick={() => {
            onChange({
              [groupKey]: item.value,
            });
          }}
        />
      ))}
    </FilterGroupWrapper>
  );
};
const FilterItem = ({ active, label, onClick = () => {} }) => {
  return (
    <FilterItemWrapper active={active} onClick={onClick}>
      {active && <DownOutlined style={{ color: "#9B5FCC" }} />}
      {label}
    </FilterItemWrapper>
  );
};
function FilterDrawer({ title = "Filter by", filters = {} }, ref) {
  const mapDraftFilterToStateRef = useRef();

  const [state, _setState] = useState({
    visible: false,
    draftFilter: {},
  });
  const { visible, draftFilter } = state;

  useImperativeHandle(ref, () => ({
    show: ({ mapDraftFilterToState }) => {
      setState({ visible: true });
      mapDraftFilterToStateRef.current = mapDraftFilterToState;
    },
  }));
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const setDraftFilter = (data = {}) => {
    let newDraftFilter = { ...draftFilter, ...data };
    setState({ draftFilter: newDraftFilter });
  };

  const onClose = () => {
    setState({ visible: false });
  };

  const onChange = (data = {}) => {
    setDraftFilter({ ...draftFilter, ...data });
  };

  const resetFilter = () => {
    setState({ draftFilter: {} });
  };

  return (
    <FilterDrawerWrapper
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      footer={
        <div className="d-flex justify-content-space-around gap-10">
          <ButtonAdmin
            border
            type={"special"}
            onClick={() => {
              resetFilter();
            }}
            color="#6E6E6E"
          >
            Reset
          </ButtonAdmin>
          <ButtonAdmin
            type={"high"}
            onClick={() => {
              mapDraftFilterToStateRef.current(draftFilter);
            }}
          >
            Apply{" "}
          </ButtonAdmin>
        </div>
      }
    >
      {Object.keys(filters).map((item, index) => {
        let data = filters[item];
        let title = data.title;
        let key = data.key;
        let options = data.options;
        return (
          <FilterGroup
            value={draftFilter[key] || options[0].value}
            key={index}
            title={title}
            options={options}
            onChange={onChange}
            groupKey={key}
          />
        );
      })}
    </FilterDrawerWrapper>
  );
}

export default forwardRef(FilterDrawer);
