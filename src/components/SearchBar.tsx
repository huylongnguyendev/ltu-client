import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

function SearchBar() {
  return (
    <>
      <InputGroup className="w-full sm:w-60 xl:w-70">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}

export default SearchBar