import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
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
import { DatePickerDemo } from "./ui/date-picker";
import { addTransaction } from "../_actions/add-transaction";
import { useState } from "react";


const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    amount: z.number().positive().min(1, { message: "Valor é obrigatório" }),
    type: z.nativeEnum(TransactionType, { required_error: "O tipo é obrigatório" }),
    category: z.nativeEnum(TransactionCategory, { required_error: "Categoria é obrigatória" }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, { required_error: "O Método é obrigatório" }),
    date: z.date({ required_error: "Data é obrigatória" })
})

type FormSchema = z.infer<typeof formSchema>
interface UpsertTransactionDialogProps {
    isOpen: boolean;
    defaultValues?: FormSchema;
    transactionId?: string;
    setIsOpen: (isOpen: boolean) => void;
}
export default function UpserTransactionDialog({isOpen, defaultValues, transactionId, setIsOpen}: UpsertTransactionDialogProps) {

    const isUpdating = Boolean(transactionId)
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues ?? {
            name: "",
            amount: 0,
            category: TransactionCategory.OTHER,
            date: new Date(),
            paymentMethod: TransactionPaymentMethod.CASH,
            type: TransactionType.EXPENSE
        },
    })

    async function onSubmit(values: FormSchema) {
        try {
            await addTransaction({...values,id: transactionId})
            setIsOpen(false)
            form.reset()
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
      <Dialog
          open={isOpen}
          onOpenChange={(open) => {
              setIsOpen(open)
              if (!open) {
                  form.reset()
              }
          }}>
          <DialogTrigger asChild>
              
          </DialogTrigger>

          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{isUpdating ? "Editar Transação" : "Nova Transação"}</DialogTitle>
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
                                      <MoneyInput
                                          placeholder="Digite o valor"
                                          value={field.value}
                                          onValueChange={({ floatValue }) => field.onChange(floatValue)}
                                          onBlur={field.onBlur}
                                          disabled={field.disabled}
                                      />
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
                                  <DatePickerDemo value={field.value} onchange={field.onChange} />

                                  <FormMessage />
                              </FormItem>
                          )}
                      />

                      <DialogFooter>

                          <Button type="submit">Adicionar</Button>
                          <DialogClose asChild>
                              <Button type="button" variant="outline">Cancelar</Button>
                          </DialogClose>
                      </DialogFooter>

                  </form>

              </Form>
          </DialogContent>

      </Dialog>
  )
}
