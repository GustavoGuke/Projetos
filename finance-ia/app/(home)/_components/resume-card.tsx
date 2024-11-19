import { TransactionButtonAdd } from '@/app/_components/TransactionButtonAdd'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import React from 'react'

interface ResumeCardProps {
    icon: React.ReactNode,
    title: string,
    amount: number,
    size?: "sm" | "lg"

}

export default function ResumeCard({ icon, title, amount, size = "sm" }: ResumeCardProps) {
    return (
        <Card>
            <CardHeader className='flex-row items-center gap-4'>
                {icon}
                <p className={`${size === "sm" ? "text-muted-foreground" : "text-white opacity-70"}`}>{title}</p>
            </CardHeader>
            <CardContent className='flex justify-between'>
                <p className={`font-bold ${size === "sm" ? "text-2xl" : "text-4xl"}`}>
                    {Intl.NumberFormat('pt-BR',
                        {
                            style: 'currency',
                            currency: 'BRL'
                        })
                        .format(amount)}
                </p>
                {size === "lg" && <TransactionButtonAdd />}
            </CardContent>
        </Card>
    )
}
