"use client"
import Link from "next/link"
import { User, Settings, LogOut, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserMenu() {
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.clear()
      window.location.href = "/"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm">Your Account</p>
            <p className="text-xs text-muted-foreground">Manage your health data</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="md:hidden">
          <Link href="/upload" className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            <span>Upload Results</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
