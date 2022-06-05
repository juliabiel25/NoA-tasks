import styled from "styled-components";

interface StyledSuggestionProps {
  tag: string;
  isSelected: boolean;
}

export const StyledSuggestion = styled.div`
  text-align: left;
  padding: 0.5em 1.4em;
  background-color: ${(props: StyledSuggestionProps) =>
    props.isSelected ? "rgb(242, 242, 248)" : ""};
`;
