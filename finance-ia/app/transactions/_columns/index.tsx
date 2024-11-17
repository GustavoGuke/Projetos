"use client"
import { Transaction} from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, TrashIcon } from "lucide-react"
import TransactionTypeBadge from "../_components/type-badge"
import { Button } from "@/app/_components/ui/button"
import { TRANSACTION_CATEGORY_LABELS, TRANSACTION_PAYMENT_METHOD_LABELS } from "@/app/_constants/transactionsTypeOptions"
import EditTransactionButton from "../_components/edit-transaction-button"


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
        cell: ({ row: { original: transaction } }) => 
            TRANSACTION_CATEGORY_LABELS[transaction.category]
    },
    {
        accessorKey: "paymentMethod",
        header: "Método de pagamento",
        cell: ({ row: { original: transaction } }) => 
            TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
    },
    {
        accessorKey: "date",
        header: "data",
        cell: ({ row: { original: transaction } }) => new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    },

    {
        accessorKey: "amount",
        header: "Valor",
        cell: ({ row: { original: transaction } }) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(transaction.amount))
    },
    {
        accessorKey: "actions",
        header: "Ações",
        cell: ({ row: { original: transaction } }) => {
            return (
                <div className="flex gap-2">
                    <EditTransactionButton transaction={transaction}/>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <TrashIcon />
                    </Button>
                    
                </div>
            )
        }
        
    },
]
