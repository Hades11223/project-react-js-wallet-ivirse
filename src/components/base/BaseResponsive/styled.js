import { Col, Drawer, Row } from "antd";
import styled, { css } from "styled-components";
const center = (props) => css`
  color: white;
  text-align: start;
  font-weight: ${(props) => (props.bold ? "bold" : "unset")};
  width: ${(props) => (props.full ? "100%" : "50%")};
  width : ${(props) => (`${props.width}%`)}
`;
export const BaseResponsiveWrapper = styled.div``;
export const DeviceRow = styled(Row)`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 30px 20px;
  margin: 0px 0px 20px 0px;
`;

export const DeviceCol = styled(Col)`
  display: flex;
`;

export const Title = styled.div`
  ${center}
`;

export const Content = styled.div`
  ${center}
`;
export const HeaderSort = styled(Row)``;

export const ColSort = styled(Col)`
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  /* identical to box height */

  /* White color */

  color: #ffffff;
`;

export const SortItemWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const FilterDrawerWrapper =styled(Drawer)``
