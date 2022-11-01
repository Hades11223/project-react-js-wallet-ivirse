import styled from "styled-components";

export const PriceRangeWrapper = styled.div`
  input {
    color: black;
    border: solid 1px #6E6E6E;
    outline: none;
    border-radius: 5px;
    padding: 8px;
  }
  input:first-child {
    margin-right: 8px;
  }
  input:last-child {
    margin-left: 8px;
  }
  .error-text{
    color: red;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .price-range-wrapper {
    padding-bottom: 6px;
  }
  .apply-price{
    background: #6E5AC3;
  }
  .apply-price:hover{
    background: #6E5AC3;

  }
  .disable-pointer{
    cursor: not-allowed;
  }
`;
