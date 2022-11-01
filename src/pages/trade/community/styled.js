import styled from "styled-components";

export const CommunityWrapper = styled.div`
  :not(.has-admin) {
    flex-direction: column;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  position: relative;
  
`;
