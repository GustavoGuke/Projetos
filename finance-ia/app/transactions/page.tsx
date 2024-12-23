
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data.table";
import { transactionsColumns } from "./_columns";
import { TransactionButtonAdd } from "../_components/TransactionButtonAdd";
import { Navbar } from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";

export default async function Transactions() {
    const {userId} = await auth()
    if (!userId) {
        redirect("/login")
    }
    const transactions = await db.transaction.findMany({
        where: {
            userId
        }
    })
    
    return (
        <>
            <Navbar/>
            <div className="p-6 space-y-6 overflow-hidden" >

                <div className="flex w-full justify-between items-center">
                    <h1 className="text-2xl font-bold">Transações</h1>
                    <TransactionButtonAdd />
                </div>

                <ScrollArea>
                    <DataTable columns={transactionsColumns} data={transactions} />
                </ScrollArea>

            </div>
        </>
    );
}