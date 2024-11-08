"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Transaction, TransactionType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const transactionsColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "type",
        header: "tipo",
        cell: ({ row: { original: transaction } }) => {
            if (transaction.type === TransactionType.DEPOSIT) {
                return (
                    <Badge className="bg-muted font-bold text-primary hover:bg-muted bg-green-700 bg-opacity-10">
                        <CircleIcon className="fill-primary size-2.5 mr-1" />
                        Depósito
                    </Badge>
                )
            }
            if (transaction.type === TransactionType.EXPENSE) {
                return (
                    <Badge className="bg-muted font-bold text-red-400 hover:bg-muted bg-red-400 bg-opacity-10">
                        <CircleIcon className="fill-red-400  size-2.5 mr-1" />
                        Despesa
                    </Badge>
                )
            }
            return (
                <Badge className="bg-muted font-bold text-white hover:bg-muted bg-white bg-opacity-10">
                    <CircleIcon className="fill-white size-2.5 mr-1" />
                    Investimento
                </Badge>
            )
        }
    },
    {
        accessorKey: "category",
        header: "Categoria",
    },
    {
        accessorKey: "paymentMethod",
        header: "Método de pagamento",
    },
    {
        accessorKey: "date",
        header: "data",
    },
    {
        accessorKey: "actions",
        header: ""
    },
]
