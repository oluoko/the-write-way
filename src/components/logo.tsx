import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-montserrat",
});

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.svg" alt="Logo" width={30} height={30} />

      <h2
        className={cn(
          "textlg md:text-2xl ml-2 font-bold",
          montserrat.className
        )}
      >
        The Write Way
      </h2>
    </Link>
  );
};

export default Logo;
