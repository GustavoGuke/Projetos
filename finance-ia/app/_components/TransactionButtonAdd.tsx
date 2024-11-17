"use client";
import { useState } from "react";
import { ArrowDownUpIcon } from "lucide-react";

import { Button } from "./ui/button";
import UpserTransactionDialog from "./upser-transaction-dialog";

export function TransactionButtonAdd() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <>
            <Button 
                onClick={() => setDialogIsOpen(true)} 
                className="rounded-full">
                Adicionar Transação
                <ArrowDownUpIcon className="ml-2" />
            </Button>
            <UpserTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen}/>
        </>
    )
}