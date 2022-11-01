import styled from "styled-components";

export const AdminWrapper = styled.div`
  padding: 0 5% 5% 5%;
  @media screen and (max-width: 992px) {
    margin-bottom: 40px;
  }
  .content {
    &__tabs {
      display: flex;
      justify-content: start;
    }
    &__data {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0px 20px 20px 20px;
      padding: 30px 20px;
    }
  }

  /* Responsive */
  @media screen and (max-width: 992px) {
    .content {
      &__tabs {
        display: none;
      }
      &__data {
        width: 100%;
        margin-left: 0px;
        background-color: transparent;
        padding: 0px;
      }
    }
  }
`;

export const TabItem = styled.div`
  border: 1px solid #9b5fcc;
  border-radius: 20px 20px 0px 0px;
  background: transparent;
  padding: 15px 27px;
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.3)" : "transparent"};
`;
