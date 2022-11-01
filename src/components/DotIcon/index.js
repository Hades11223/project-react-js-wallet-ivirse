import styled from "styled-components";

const DotIconWrapper = styled.div`
  width: ${(props) => props?.size};
  height: ${(props) => props?.size};
  border-radius: 50%;
  background: ${(props) => props?.color};
  display: inline-block;
  margin-right: 4px;
`;

const DotIcon = ({ size = "10px", color }) => {
  return (
    <DotIconWrapper
      className="dot-icon"
      size={size}
      color={color}
    ></DotIconWrapper>
  );
};

export default DotIcon;
