import { redirect } from "next/navigation";

export default function Home() {
  redirect("/documents");
  return <div className=""></div>;
}
