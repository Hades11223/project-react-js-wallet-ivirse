import styled from 'styled-components';

export const OpacityBoxWrapper = styled.div`
    .opacity-box {
        background-color: rgba(0,0,0,0.25);
        border-radius: 20px;
        padding: 8px 16px;
        color: white;
        .unlock-time {
            font-size: 20px;
            font-weight: 500;

        }
        .unlock-value{
            align-items: center;          
        }
        .total{
            align-items: center;
        }
        .title {
            font-size: 16px;
            font-weight: 400;
            width: 130px;
        }
        .value {
            font-size: 20px;
            font-weight: 700;
            text-align: left;
            flex: 1;
            display: flex;
            
            /* justify-content: flex-end; */
        }
    }
`;