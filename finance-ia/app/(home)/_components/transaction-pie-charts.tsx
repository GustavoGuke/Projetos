"use client"

import { PiggyBankIcon, TrendingDownIcon, TrendingUp, TrendingUpIcon } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types"
import PercentageItem from "./percentage-item"

interface TransactionsPieChartProps {
    typesPercentage: TransactionPercentagePerType;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
}

const chartConfig = {
    [TransactionType.INVESTMENT]: {
        label: "Investido",
        color: "#FFFFFF",
    },
    [TransactionType.DEPOSIT]: {
        label: "Receita",
        color: "#55B02E",
    },
    [TransactionType.EXPENSE]: {
        label: "Despesas",
        color: "#E93030",
    },
} satisfies ChartConfig

export function TransactionPieCharts({
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
}: TransactionsPieChartProps) {

    const chartData = [
        {
            type: TransactionType.DEPOSIT,
            amount: depositsTotal,
            fill: "#55B02E",
        },
        {
            type: TransactionType.EXPENSE,
            amount: expensesTotal,
            fill: "#E93030",
        },
        {
            type: TransactionType.INVESTMENT,
            amount: investmentsTotal,
            fill: "#FFFFFF",
        },
    ];
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Relatório em gráfico</CardTitle>
                <CardDescription>2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="type"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>

                <div className="space-y-3">
                    <PercentageItem
                        icon={<TrendingUpIcon size={16} className="text-primary" />}
                        title="Receita"
                        value={typesPercentage[TransactionType.DEPOSIT]}
                    />
                    <PercentageItem
                        icon={<TrendingDownIcon size={16} className="text-red-500" />}
                        title="Despesas"
                        value={typesPercentage[TransactionType.EXPENSE]}
                    />
                    <PercentageItem
                        icon={<PiggyBankIcon size={16} />}
                        title="Investido"
                        value={typesPercentage[TransactionType.INVESTMENT]}
                    />
                </div>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
}
