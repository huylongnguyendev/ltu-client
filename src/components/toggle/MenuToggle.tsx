import { AlignRight } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "magos/react";
import { store } from "#/store/store";

function MenuToggle() {
  const [, setIsOpen] = useAppStore(store.menu);
  const { setOpenMenu } = setIsOpen;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden"
        onClick={setOpenMenu}
      >
        <AlignRight />
      </Button>
    </>
  );
}

export default MenuToggle;
