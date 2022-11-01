import styled from "styled-components";

export const ResponsiveRecordWrapper = styled.div`
    background-color: rgb(36,13,64,0.5);
    padding: 5%;
    border-radius: 10px;
    margin-bottom: 10px;
    @media screen and (max-width: 768px){
        
    }
    .devider{
        
        height: 0.5px;
        margin: 25px 0;
        background-color: #61CA96;
    }
    .rotate-90{
        rotate: 180deg;
    }
    .active-header{
        color: #61CA96;
        svg{
            path{
                fill: #61CA96;
            }
        }
    }
`