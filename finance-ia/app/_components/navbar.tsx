"use client"

import { UserButton } from "@clerk/nextjs";
import { Sparkles, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Navbar() {
    const pathname = usePathname()
    return (
        <nav className="flex  justify-between p-6 border-b border-solid">
            <div className="flex items-center gap-4">
                <div>
                    <span>FINANCE.IA</span>
                    <Sparkles />
                </div>
                <Link href="/" 
                className={pathname === "/" ? "text-primary" : "text-muted-foreground"}>Dashboard</Link>
                <Link href="/transactions"
                className={pathname === "/transactions" ? "text-primary" : "text-muted-foreground"}>Transações</Link>
                <Link href="/subscription"
                className={pathname === "/subscription" ? "text-primary" : "text-muted-foreground"}>Assinatura</Link>
            </div>
            <UserButton showName appearance={{ variables: { colorText: 'white', fontSize: "12px" }, elements: { userButtonAvatarBox: "34" } }} />
        </nav>
    )
}
