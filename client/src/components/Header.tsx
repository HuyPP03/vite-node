import { MouseEvent, useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { userInfo } from "@/redux/features/user/userSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
type user = {
  name: string | null;
  email: string | null;
  token: string | null;
};
const Header = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    dispatch(userInfo());
  };
  const userData = useSelector((state: RootState) => state.user);
  useEffect(() => {
    setIsLoading(true);
    setUser(userData);
    setIsLoading(false);
  }, [userData]);
  return (
    <div className="h-16 border-b flex items-center gap-2 justify-end px-4">
      <ModeToggle />
      {isLoading ? (
        <></>
      ) : user?.name ? (
        <>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Logout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mx-10 mb-4">
                <DialogTitle>Bạn có muốn đăng xuất?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="flex mx-10 !justify-between">
                <DialogClose asChild>
                  <Button type="button" className="bg-red-800 hover:bg-red-900">
                    Close
                  </Button>
                </DialogClose>
                <Button onClick={handleLogout}>Logout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
