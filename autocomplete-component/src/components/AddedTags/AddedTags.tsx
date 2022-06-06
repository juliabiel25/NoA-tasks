import { StyledTagsContainer, StyledTag } from "./style";

interface AddedTagsProps {
  tags: string[];
  deleteTag: (index: number) => void;
}

const AddedTags: React.FC<AddedTagsProps> = ({ tags, deleteTag }) => {
  return (
    <StyledTagsContainer className="added-tags-list">
      {tags.map((tag, i) => (
        <StyledTag data-testid={"added-tag"} className="tag" key={i}>
          <span>{tag.toString()}</span>
          <button onClick={() => deleteTag(i)}>✕</button>
        </StyledTag>
      ))}
    </StyledTagsContainer>
  );
};

export default AddedTags;
