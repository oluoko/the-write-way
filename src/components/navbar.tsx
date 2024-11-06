import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-2 md:py-3 my-2 mx-4 md:mx-8 h-[50px]">
      {/* Logo */}
      <Logo />
      {/* Auth */}
      <div>
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
