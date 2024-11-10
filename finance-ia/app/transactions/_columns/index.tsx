"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Transaction, TransactionType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, PencilIcon, TrashIcon } from "lucide-react"
import TransactionTypeBadge from "../_components/type-badge"
import { Button } from "@/app/_components/ui/button"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const TRANSACTION_CATEGORY_LABELS = {
    FOOD: "Alimentação",
    ENTERTAINMENT: "Entretenimento",
    HEALTH: 'Saude',
    OTHER: 'Outro',
    TRANSPORTATION: "Transporte",
    TRAVEL: 'Viagem',
    UTILITIES: 'Utilidades',
    WORK: 'Trabalho',
    EDUCATION: 'Educação',
    HOUSE: 'Casa',
    SALARY: 'Salario',
    FAMILY: 'Familia',
    HOBBY: 'Hobby',
    INSURANCE: 'Seguro',
    CAR: 'Carro',
}


const TRANSACTION_PAYMENT_METHOD_LABELS = {
    BANK_TRANSFER: "Transferência Bancária",
    BANK_SLIP: "Boleto Bancário",
    CASH: "Dinheiro",
    CREDIT_CARD: "Cartão de Crédito",
    DEBIT_CARD: "Cartão de Débito",
    OTHER: "Outros",
    PIX: "Pix",
};

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
        cell: () => {
            return (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <PencilIcon />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <TrashIcon />
                    </Button>
                    
                </div>
            )
        }
        
    },
]
