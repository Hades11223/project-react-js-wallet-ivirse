import styled from "styled-components";

export const OpacityBoxWrapper = styled.div`
    background-color: rgba(0,0,0,0.25);
    border-radius: 20px;
    width: 100%;
    padding: 16px ;
    color: white;
    font-size: ${(props)=> props.windowSize>576 ? "20px" : "16px" };
    font-weight: 400;
    margin-bottom: 12px;
    p {
        margin-bottom: 4px;
    }
    .opacitybox-right-mobile{
        padding-left: 10%;
    }
`