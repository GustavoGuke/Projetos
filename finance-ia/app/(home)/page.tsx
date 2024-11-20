
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";


interface HomeProps {
  searchParams: { month: string };
}
export default async function Home({searchParams: {month}}: HomeProps) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const monthIsInvalid = !month || !isMatch(month, "MM")
  const monthNumber= new Date().getMonth() 
  if (monthIsInvalid) { 
    redirect("?month=01")
  }

  return (
    <>
      <Navbar />
      <div className="flex p-6 justify-between items-center">
        <h1>Dashboard</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month}/>
    </>
  );
}
