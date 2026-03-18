import { loginSchema, type LoginType } from "#/@types/login.type";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Spinner } from "#/components/ui/spinner";
import { usePasswordHook } from "#/hooks/usePassword";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChromeIcon, EyeClosedIcon, EyeIcon } from "lucide-react";

export const Route = createFileRoute("/demo/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      isRemember: false,
    } as LoginType,
    validators: { onChange: loginSchema, onBlur: loginSchema },
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
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <form.Field
                name="identifier"
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
                <Link to="/reset-password" className="text-primary">
                  Forgot password?
                </Link>
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
