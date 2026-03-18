import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { cn } from "#/lib/utils";

const currentPosition = {
  header: "max-sm:hidden",
  navigation: "sm:hidden",
};

function Auth({ postion }: { postion: keyof typeof currentPosition }) {
  return (
    <>
      <div className={cn("flex items-center gap-1", currentPosition[postion])}>
        <Link to="/login">
          <Button variant="secondary">Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </>
  );
}

export default Auth;
