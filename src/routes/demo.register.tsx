import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { registerSchema, type RegisterType } from "#/@types/register.type";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { usePasswordHook } from "#/hooks/usePassword";
import { toast } from "sonner";

export const Route = createFileRoute("/demo/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as RegisterType,
    validators: {
      onChange: registerSchema,
      onBlur: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { email, firstName, lastName, username, password } = value;
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              firstName,
              lastName,
              username,
              password,
            }),
          },
        );
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorMsg =
            "Error when connect to server. Please try again later.";
          toast.error(errorMsg);
          throw new Error(errorMsg);
        }

        const data = await res.json();
        if (!res.ok) {
          const errMsg = data.message;
          toast.error(errMsg);
          throw new Error(errMsg);
        }

        toast.success(data.message);
        router.navigate({ to: "/demo/login" });
      } catch (error) {
        if (error instanceof Error) toast.error(error?.message);
        else toast.error("Register failed.");
      }
    },
  });

  const { showPassword, toggleVisiblity, getType } = usePasswordHook();

  return (
    <>
      <div className="px-4 h-[calc(100dvh-56px)] grid place-items-center-safe">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="md:text-lg text-primary">Register</CardTitle>
            <CardDescription>Student Registration</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <form.Field
                name="firstName"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <Input
                      name={name}
                      placeholder="First Name"
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
                name="lastName"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <Input
                      name={name}
                      placeholder="Last Name"
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
                name="username"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <Input
                      name={name}
                      placeholder="Username"
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
                name="email"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <Input
                      name={name}
                      placeholder="Email"
                      type="email"
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
              <form.Field
                name="confirmPassword"
                children={({ name, state, handleChange, handleBlur }) => (
                  <div className="space-y-1">
                    <div className="relative">
                      <Input
                        name={name}
                        placeholder="Confirm Password"
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
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                )}
              />
            </form>
            <CardDescription className="w-full text-center mt-4">
              Already have an account?{" "}
              <Link to="/demo/login" className="font-semibold text-primary">
                Login Now
              </Link>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
