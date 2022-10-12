import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 1.5rem;

  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.8;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 35px 10px 35px;
`;

export const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  padding-right: 5px;

  & :first-child.anticon {
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const Label = styled.span`
  color: #999;
  font-size: 12px;
  /* padding-top: 5px; */
  position: absolute;
  bottom: 10px;
  cursor: pointer;
`;
