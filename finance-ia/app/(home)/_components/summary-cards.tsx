import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { PiggyBankIcon, TrendingUpDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'
import React from 'react'
import ResumeCard from './resume-card'

export default function SummaryCards() {
    return (
        <div className='space-y-6'>
            <ResumeCard
                icon={<WalletIcon size={16} />}
                title="Saldo"
                amount={1000} 
                size='lg'
            />
          
            <div className='grid grid-cols-3 gap-6'>
                <ResumeCard
                    icon={<PiggyBankIcon size={16} />}
                    title="Investido"
                    amount={1000} 
                    />
                <ResumeCard
                    icon={<TrendingUpIcon size={16} className='text-primary'/>}
                    title="Receita"
                    amount={1000} 
                    />
                <ResumeCard
                    icon={<TrendingUpDownIcon size={16} className='text-red-400'/>}
                    title="Despesas"
                    amount={1000} 
                    />
            </div>
        </div>
    )
}
