"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/app/_lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { SelectSingleEventHandler } from "react-day-picker"



interface DatePickerProps {
    value?: Date;
    onchange?: SelectSingleEventHandler
}
export function DatePickerDemo({value, onchange}: DatePickerProps) {
    

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>Selecione uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onchange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
