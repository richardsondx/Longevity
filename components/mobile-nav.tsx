"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Activity, TrendingUp, MessageSquare, UtensilsCrossed, History, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Activity },
    { href: "/biomarkers", label: "Biomarkers", icon: TrendingUp },
    { href: "/coach", label: "AI Coach", icon: MessageSquare },
    { href: "/meal-plan", label: "Meal Plan", icon: UtensilsCrossed },
    { href: "/history", label: "History", icon: History },
    { href: "/upload", label: "Upload Results", icon: Upload },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
