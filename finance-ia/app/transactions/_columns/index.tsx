"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Transaction, TransactionType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"
import TransactionTypeBadge from "../_components/type-badge"


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
        cell: ({ row: { original: transaction } }) => (
            <TransactionTypeBadge transaction={transaction} />
        )
        
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
