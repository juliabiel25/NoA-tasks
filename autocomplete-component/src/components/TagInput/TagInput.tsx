import { StyledInput } from './style';

interface TagInputProps {
  input: string;
  setInput: (input: string) => void;
  setInputFocus: (val: boolean) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  input,
  setInput,
  setInputFocus,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputFocus(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputFocus(false);
  };

  return (
    <StyledInput
      data-testid="tag-input"
      type="text"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={input}
      autoComplete="off"
      spellCheck="false"
      placeholder='Add a tag'
    />
  );
};

export default TagInput;
