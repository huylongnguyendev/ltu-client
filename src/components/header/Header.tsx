import Auth from "../Auth";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import MenuToggle from "../toggle/MenuToggle";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 left-0 w-full h-14 px-4 py-2 bg-background shadow-md dark:shadow-accent z-50 flex items-center">
        <nav className="flex justify-between items-center gap-4 w-full">
          <Logo type="header" />
          <NavBar />
          <SearchBar />
          <Auth postion="header" />
          <MenuToggle />
        </nav>
      </header>
    </>
  );
}
