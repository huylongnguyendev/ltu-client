import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { cn } from "#/lib/utils";
import { useAppStore } from "magos/react";
import { store } from "#/store/store";

const currentPosition = {
  header: "max-sm:hidden",
  navigation: "sm:hidden",
};

function Auth({ postion }: { postion: keyof typeof currentPosition }) {
  const [user] = useAppStore(store.user);

  const isLogged = !!user?.user?.id;

  if (isLogged) return null;

  return (
    <>
        <div
          className={cn("flex items-center gap-1", currentPosition[postion])}
        >
          <Link to="/demo/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/demo/register">
            <Button>Register</Button>
          </Link>
        </div>
    </>
  );
}

export default Auth;
