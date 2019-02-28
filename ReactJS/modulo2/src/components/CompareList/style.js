import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repo = styled.div`
  margin: 0 10px;
  width: 250px;
  background: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }

    small#description {
      margin-top: 10px;
      text-align: center;
      max-height: 50%;
    }
  }

  ul {
    list-style: none;

    li#max {
      font-weight: bold;
      padding: 12px 20px;
      color: #52d89f;

      strong {
        font-size: 20px;
        margin-top: 10px;
      }

      small {
        margin-left: 3px;
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
    }

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        margin-left: 3px;
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }
`;
