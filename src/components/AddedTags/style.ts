import styled from "styled-components";

export const StyledTag = styled.div`
  display: flex;
  border-radius: 0.5em;
  box-sizing: border-box;
  min-width: min-content;
  max-width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(231, 231, 242);
  font-size: small;
  padding: 0.4em 0.6em;

  & > span {
    overflow-x: auto;
    overflow-wrap: break-word;
    text-align: left;
  }

  & > button {
    background-color: transparent;
    border: none;
    margin-left: 1em;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
  & > button:hover,
  & > button:active {
    mix-blend-mode: multiply;
    background-color: rgb(231, 231, 242);
    outline: 0;
  }
`;

export const StyledTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 0.5em;
`;
