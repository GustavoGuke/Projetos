import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { PiggyBankIcon, TrendingUpDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'
import React from 'react'
import ResumeCard from './resume-card'
import { db } from '@/app/_lib/prisma'


interface SummaryCardsProps {
    month: string;
    balance: number;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;

}

export default async function SummaryCards({ balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal, }: SummaryCardsProps) {

    return (
        <div className='space-y-6'>
            <ResumeCard
                icon={<WalletIcon size={16} />}
                title="Saldo"
                amount={balance}
                size='lg'
            />

            <div className='grid grid-cols-3 gap-6'>
                <ResumeCard
                    icon={<PiggyBankIcon size={16} />}
                    title="Investido"
                    amount={investmentsTotal}
                />
                <ResumeCard
                    icon={<TrendingUpIcon size={16} className='text-primary' />}
                    title="Receita"
                    amount={depositsTotal}
                />
                <ResumeCard
                    icon={<TrendingUpDownIcon size={16} className='text-red-400' />}
                    title="Despesas"
                    amount={expensesTotal}
                />
            </div>
        </div>
    )
}
