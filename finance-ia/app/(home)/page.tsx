
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";

export default async function Home() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }
  return (
    <>
      <Navbar />
      <SummaryCards />
    </>
  );
}
