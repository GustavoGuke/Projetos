"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowDownUpIcon, CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./InputMoney";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transactionsTypeOptions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { DatePickerDemo } from "./ui/date-picker";


const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    amount: z.string().trim().min(1, { message: "Valor é obrigatório" }),
    type: z.nativeEnum(TransactionType, { required_error: "O tipo é obrigatório" }),
    category: z.nativeEnum(TransactionCategory, { required_error: "Categoria é obrigatória" }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, { required_error: "O Método é obrigatório" }),
    date: z.date({ required_error: "Data é obrigatória" })
})



export function TransactionButtonAdd() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: "0",
            category: TransactionCategory.OTHER,
            date: new Date(),
            paymentMethod: TransactionPaymentMethod.CASH,
            type: TransactionType.EXPENSE
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

    }


    return (
        <Dialog>
            <DialogTrigger>
                <Button className="rounded-full">
                    Adicionar Transação
                    <ArrowDownUpIcon className="ml-2" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Transação</DialogTitle>
                    <DialogDescription>
                        Insira as informações:
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome da transção" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <MoneyInput placeholder="Digite o valor" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                TRANSACTION_TYPE_OPTIONS.map((transaction) => {
                                                    return (
                                                        <SelectItem key={transaction.value} value={transaction.value}>{transaction.label}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Forma de pagamento</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => {
                                                    return (
                                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categotia</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                TRANSACTION_CATEGORY_OPTIONS.map((option) => {
                                                    return (
                                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                   <DatePickerDemo  value={field.value} onchange={field.onChange}/>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button >Adicionar</Button>
                            <Button variant="outline">Cancelar</Button>
                        </DialogFooter>

                    </form>

                </Form>
            </DialogContent>

        </Dialog>
    )
}