import React, { useState, useEffect } from "react";
import AddedTags from "../AddedTags/AddedTags";
import TagSuggestions from "../TagSuggestions/TagSuggestions";
import TagInput from "../TagInput/TagInput";
import { StyledAutocomplete, StyledInputContainer } from "./style";

export interface AutocompleteProps {
  items: any[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ items }) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(items);
  const [selected, setSelected] = useState<string | null>(null);

  /**
   * Update suggestions upon input change
   */
  useEffect(() => {
    const escapeRegExp = input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const regex = new RegExp(escapeRegExp, "g");
    setSuggestions(
      items
        .filter(
          (item) => item != null && item !== "" && item.toString().match(regex)
        )
        .map((item) => item.toString())
    );
  }, [input, items]);

  /**
   * Handle keyboard events
   * @param e
   */
  const keyDownHandler = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "ArrowDown":
        setSelected((prev) =>
          prev
            ? suggestions[(suggestions.indexOf(prev) + 1) % suggestions.length]
            : suggestions[0]
        );
        break;

      case "ArrowUp":
        setSelected((prev) => {
          if (prev) {
            let index = suggestions.indexOf(prev);
            let mod = index === 0 ? suggestions.length - 1 : index - 1;
            return suggestions[mod];
          } else return suggestions[suggestions.length - 1];
        });
        break;

      case "Enter":
        if (inputFocus && (selected || input.match(/[^\s]+/g))) {
          setAddedTags((prev) => [...prev, selected ? selected : input]);
          setInput("");
          setSelected(null);
        }

        break;

      case "Escape":
        setSelected(null);
        break;
    }
  };

  /**
   * Callback function for deleting tags from state addedTags by given index
   * @param index
   */
  const deleteAddedTag = (index: number) => {
    setAddedTags((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <StyledAutocomplete
      className="autocomplete-component"
      tabIndex={0}
      onKeyDown={keyDownHandler}
    >
      <AddedTags tags={addedTags} deleteTag={deleteAddedTag} />
      <StyledInputContainer>
        <TagInput
          input={input}
          setInput={setInput}
          setInputFocus={setInputFocus}
        />

        {inputFocus && (
          <TagSuggestions suggestions={suggestions} selected={selected} />
        )}
      </StyledInputContainer>
    </StyledAutocomplete>
  );
};

export default Autocomplete;
