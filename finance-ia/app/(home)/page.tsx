
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { TransactionPieCharts } from "./_components/transaction-pie-charts";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";


interface HomeProps {
  searchParams: { month: string };
}
export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth()
  const dashboard = await getDashboard(month)
  if (!userId) {
    redirect("/login")
  }

  const monthIsInvalid = !month || !isMatch(month, "MM")
  console.log("mes",monthIsInvalid)
  let monthNumber = new Date().getMonth() + 1
  //monthNumber === 12 ? monthNumber = 1 : monthNumber
  if (monthIsInvalid) {
    redirect(`?month=${monthNumber}`);
    //redirect(`?month=${new Date().getMonth() + 1}`);
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex p-6 justify-between items-center ">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] h-full overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionPieCharts {...dashboard} />
              <ExpensesPerCategory expensesPerCategory={dashboard.totalExpensePerCategory} /> 
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions}/>
        </div>
      </div>
    </>
  );
}
