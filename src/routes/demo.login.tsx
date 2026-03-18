import { loginSchema, type LoginType } from "#/@types/login.type";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Spinner } from "#/components/ui/spinner";
import { usePasswordHook } from "#/hooks/usePassword";
import { store } from "#/store/store";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon, EyeClosedIcon, EyeIcon, RotateCw } from "lucide-react";
import { useAppStore } from "magos/react";
import { toast } from "sonner";

export const Route = createFileRoute("/demo/login")({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <div className="px-4 py-2 flex flex-col justify-center items-center gap-8 h-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">
            Oop! Something went wrong!
          </h2>
          <p className="text-destructive-foreground">
            {error instanceof Error
              ? error.message
              : "We encountered an unexpected error while loading the exams."}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => window.location.reload()}>
            <RotateCw /> Try Again
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeftIcon /> Go back
          </Button>
        </div>
      </div>
    );
  },
});

function RouteComponent() {
  const router = useRouter();
  const [, actions] = useAppStore(store.user);
  const { setUser, setLoading } = actions;

  const form = useForm({
    defaultValues: {
      identicator: "",
      password: "",
      isRemember: false,
    } as LoginType,
    validators: { onChange: loginSchema, onBlur: loginSchema },
    onSubmit: async ({ value }) => {
      setLoading("loading");
      toast.info("Logging in...");
      try {
        const { identicator, password, isRemember } = value;
        console.log(import.meta.env.VITE_API_URL);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identicator, password, isRemember }),
          credentials: "include",
        });

        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          const errorMsg =
            "Error when connect to server. Please try again later.";
          toast.error(errorMsg);
          setLoading("fail");
          throw new Error(errorMsg);
        }

        const data = await res.json();

        if (!res.ok) {
          const errMsg = data.message;
          toast.error(errMsg);
          setLoading("fail");
          return errMsg
        }

        toast.success(data.message);
        setUser(data);
        setLoading("success");
        router.navigate({ to: "/" });
      } catch (error) {
        if (error instanceof Error) toast.error(error?.message);
        else toast.error("Loggin failed.");
        throw error;
      }
    },
  });

  const { showPassword, toggleVisiblity, getType } = usePasswordHook();

  return (
    <>
      <div className="px-4 h-[calc(100dvh-56px)]">
        <Card className="w-full max-w-md mx-auto translate-y-1/4">
          <CardHeader>
            <CardTitle className="md:text-lg text-primary">Login</CardTitle>
            <CardDescription>Hi, Welcome back! Login now</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <form.Field
                name="identicator"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <Input
                      name={name}
                      placeholder="Username or Email"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                    />
                    {state.meta.errors.length > 0 &&
                      (state.meta.isDirty || state.meta.isTouched) && (
                        <p className="text-xs text-destructive">
                          {state.meta.errors[0]?.message}
                        </p>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="password"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <div className="relative">
                      <Input
                        name={name}
                        placeholder="Password"
                        type={getType(name)}
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="pr-10"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        className="absolute top-0 right-0"
                        onClick={() => toggleVisiblity(name)}
                      >
                        {showPassword[name] ? <EyeClosedIcon /> : <EyeIcon />}
                      </Button>
                    </div>
                    {state.meta.errors.length > 0 &&
                      (state.meta.isDirty || state.meta.isTouched) && (
                        <p className="text-xs text-destructive">
                          {state.meta.errors[0]?.message}
                        </p>
                      )}
                  </div>
                )}
              />
              <div className="flex justify-between items-center text-sm font-semibold">
                <form.Field
                  name="isRemember"
                  children={({ name, state, handleChange }) => (
                    <div className="flex items-center gap-1">
                      <Checkbox
                        id={name}
                        checked={state.value}
                        onCheckedChange={(check) => handleChange(!!check)}
                      />
                      <Label htmlFor={name}>Remember me</Label>
                    </div>
                  )}
                />
                {/* <Link to="/reset-password" className="text-primary"> */}
                <Button variant="link">Forgot password?</Button>
                {/* </Link> */}
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                )}
              />
            </form>
            <CardDescription className="w-full text-center mt-4">
              Don't have an account?{" "}
              <Link to="/demo/register" className="font-semibold text-primary">
                Register Now
              </Link>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
