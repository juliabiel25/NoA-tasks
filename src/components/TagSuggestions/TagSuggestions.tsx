import { StyledSuggestion } from './style';

interface TagSuggestionsProps {
  suggestions: string[];
  selected: string | null;
}

const TagSuggestions: React.FC<TagSuggestionsProps> = ({
  suggestions,
  selected,
}) => {
  let suggestionsJSX = suggestions.map((tag, i) => (
    <StyledSuggestion data-testid={"tag-suggestion"} key={i} tag={tag} isSelected={tag === selected}>
      {tag}
    </StyledSuggestion>
  ));

  return <div className="suggestions-list">{suggestionsJSX}</div>;
};

export default TagSuggestions;
