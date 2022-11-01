import styled from "styled-components";

export const StyledWrapper = styled.div`
    background-color: #f0f2f5;
    display: flex;
    height: 100vh;
    width: 100%;
    .contract-container{
        margin-top: 160px;
        width: 100%;
        justify-content: center;
        display: flex;
        #contract-window{
            width: 65%;
            height: 50%;
            .ant-card-head{
                
                font-weight: 600;
            }
            .contract-events{
                height: 100%;
            }
        }
    }
`