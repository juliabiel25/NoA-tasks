/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "./Autocomplete";

describe("Autocomplete", () => {
  
  test("should display a tag input after mounting", () => {
    let autocomplete = render(<Autocomplete items={[]} />);
    const input = autocomplete.queryByTestId("tag-input");
    expect(input).toBeInTheDocument();
  });

  test("should not display any suggestions after mounting", () => {
    let autocomplete = render(<Autocomplete items={[]} />);
    const suggestions = autocomplete.queryByTestId("tag-suggestion");
    expect(suggestions).not.toBeInTheDocument();
  });

  test("should not display any added tags after mounting", () => {
    let autocomplete = render(<Autocomplete items={[]} />);
    const addedTags = autocomplete.queryByTestId("added-tag");
    expect(addedTags).not.toBeInTheDocument();
  });

  test("after the tag input is put in focus => should display all non-null given items of length > 0 as tag suggestions", () => {
    const items = [
      1,
      new Date(2022, 0, 1),
      "OCE",
      null,
      "",
      [50, 70],
      { color: "red", size: 20 },
      undefined,
    ];
    let autocomplete = render(<Autocomplete items={items} />);
    const input = autocomplete.getByTestId("tag-input");
    fireEvent.focus(input);
    const suggestions = autocomplete.queryAllByTestId("tag-suggestion");
    const suggestionValues = suggestions.map(htmlElement => htmlElement.innerHTML);
    const expectedValues = [
        "1",
        "Sat Jan 01 2022 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)",
        "OCE",
        "50,70",
        "[object Object]"
    ];    
    expect(suggestionValues).toEqual(expectedValues);
  });

  test("on input change, suggestions should be filtered", async () => {
    const user = userEvent.setup();
    const items = ['Art', 'Accent', 'Game'];
    let autocomplete = render(<Autocomplete items={items} />);
    const input = autocomplete.getByTestId("tag-input");
    await user.click(input);
    await user.type(input, 'G');
    const suggestions = autocomplete.queryAllByTestId("tag-suggestion");
    const suggestionValues = suggestions.map(
      (htmlElement) => htmlElement.innerHTML
      );
      const expectedValues = ['Game'];
      expect(suggestionValues).toEqual(expectedValues);
  });

  test("if ENTER was pressed but the input is empty & no suggestions are selected => no tag should be added", async () => {
    const user = userEvent.setup();
    let autocomplete = render(<Autocomplete items={[]} />);
    const input = autocomplete.getByTestId("tag-input");
    await user.click(input);
    await user.type(input, "{enter}");
    const addedTags = autocomplete.queryAllByTestId("added-tag");
    expect(addedTags).toEqual([]);
  });

  test("if ENTER was pressed, the input is not empty & no suggestions are selected => a tag equal to input value should be added", async () => {
    const user = userEvent.setup();
    let autocomplete = render(<Autocomplete items={[]} />);
    const input = autocomplete.getByTestId("tag-input");
    await user.click(input);
    await user.type(input, "G{enter}");
    const addedTags = autocomplete
      .queryAllByTestId("added-tag")
      .map((tag) => tag.querySelector("span")?.innerHTML);
    expect(addedTags).toEqual(["G"]);
  });

  test("if ENTER was pressed & a suggestion is selected => a tag equal to the selected suggestion should be added", async () => {
    const user = userEvent.setup();
    let autocomplete = render(<Autocomplete items={['Suggestion']} />);
    const input = autocomplete.getByTestId("tag-input");
    await user.click(input);
    await user.type(input, "{arrowDown}{enter}");
    const addedTags = autocomplete
      .queryAllByTestId("added-tag")
      .map((tag) => tag.querySelector("span")?.innerHTML);
    expect(addedTags).toEqual(["Suggestion"]);
  });

  test("special characters in the tag input should be escaped", async () => {
    const user = userEvent.setup();
    let autocomplete = render(<Autocomplete items={[]} />);
    const input = autocomplete.getByTestId("tag-input");
    await user.click(input);
    await user.type(input, "\\.$*|\\n\\t\\s\\f\"'{enter}");
    const addedTags = autocomplete.queryAllByTestId("added-tag").map(tag => tag.querySelector('span')?.innerHTML);
    expect(addedTags).toEqual(["\\.$*|\\n\\t\\s\\f\"'"]);
  });

  test("an added tag should be deleted when its delete button is clicked", async () => {
    const user = userEvent.setup();
    let autocomplete = render(<Autocomplete items={[]} />);
    const input = autocomplete.getByTestId("tag-input");
    await user.click(input);
    await user.type(input, "a{enter}b{enter}c{enter}");
    const addedTags = autocomplete
      .queryAllByTestId("added-tag");
    const tagADeleteButton = addedTags[0].querySelector('button');

    if (tagADeleteButton)
      await user.click(tagADeleteButton);
    
    const addedTagsAfterDelete = autocomplete
      .queryAllByTestId("added-tag")
      .map((tag) => tag.querySelector("span")?.innerHTML);
    
    expect(addedTagsAfterDelete).toEqual(['b', 'c']);     
  });  
});
