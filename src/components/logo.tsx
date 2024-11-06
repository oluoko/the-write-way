import Link from "next/link";
import Image from "next/image";
import { Karla } from "next/font/google";
import { cn } from "@/lib/utils";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-karla",
});

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
      </Link>
      <h2 className={cn("text-2xl ml-2 font-bold", karla.className)}>
        The Write Way
      </h2>
    </div>
  );
};

export default Logo;
