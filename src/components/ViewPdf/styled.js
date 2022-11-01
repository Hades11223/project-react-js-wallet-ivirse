import styled from "styled-components";

export const ViewPdfWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: ${(props) => (props.loading == "true" ? "0px" : "10px")};
    height: 8px;
  }
  display: flex;
  .react-pdf__Page__canvas {
    margin: 0 auto;
    width: 100% !important;
    height: 100% !important;
    max-width: 700px !important;
  }
  .react-pdf__Document {
    .react-pdf__Page {
      margin-bottom: 10px;
    }
  }
`;
