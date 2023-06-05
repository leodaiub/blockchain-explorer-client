import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEventHandler, useState } from "react";

export default function SearchInput({
  onChange,
  clearValue,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  clearValue: () => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <InputGroup my="6">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        value={search}
        onChange={(e) => {
          onChange(e);
          setSearch(e.target.value);
        }}
        type="text"
        placeholder={`Search hash...`}
      />
      <InputRightElement
        role="clearSearch"
        cursor={"pointer"}
        onClick={() => {
          clearValue();
          setSearch("");
        }}
      >
        <CloseIcon
          fontSize={14}
          _hover={{ color: "gray.600" }}
          color="gray.300"
        />
      </InputRightElement>
    </InputGroup>
  );
}
