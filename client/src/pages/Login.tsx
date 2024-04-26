import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userInfo } from "@/redux/features/user/userSlice";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [errCode, setErrCode] = useState(0);
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/login", value);
    if (res.data.errCode === 0) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(userInfo());
      navigate("/");
    } else {
      setErrCode(res.data.errCode);
      setMessage(res.data.message);
    }
  };
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmitForm}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => {
                  setValue({ ...value, email: e.target.value });
                  setErrCode(0);
                }}
                value={value.email}
              />
            </div>
            {errCode === 1 && (
              <Alert variant="destructive" className="h-10 flex items-center">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  setValue({ ...value, password: e.target.value });
                  setErrCode(0);
                }}
                value={value.password}
              />
            </div>
            {errCode === 2 && (
              <Alert variant="destructive" className="h-10 flex items-center">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
            {errCode === 3 && (
              <Alert variant="destructive" className="h-10 flex items-center">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
