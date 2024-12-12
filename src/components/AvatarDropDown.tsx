import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    PersonStandingIcon,
    Plus,
    PlusCircle,
    Router,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/Store"

interface AvatarDropDownProps {
    userName: String | ""
}

export function AvatarDropDown({ userName }: AvatarDropDownProps) {
    const router = useRouter()
    const { setUser } = useUserStore()
    const handleLogout = () => {
        localStorage.removeItem("ticket-master-token")
        setUser({})
        localStorage.removeItem("ticket-master-isAdmin")
        router.push('/login')
    }
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Avatar>
                        <AvatarImage src="https://github.com/zohaibsaeed117" />
                        <AvatarFallback>ZS</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={`/my-bookings`} className="flex items-center justify-between">
                            <User className="mr-2 h-4 w-4" />
                            <span>My Bookings</span>
                        </Link>
                    </DropdownMenuItem>
                    {localStorage.getItem("ticket-master-isAdmin") === "true" && <DropdownMenuItem>
                        <Link href="/admin" className="flex items-center justify-between">
                            <PersonStandingIcon className="mr-2 h-4 w-4" />
                            <span>Admin</span>
                        </Link>
                    </DropdownMenuItem>}
                    {/* <DropdownMenuItem>
                        <Link href="/profile/settings" className="flex items-center justify-between">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button onClick={handleLogout} className="flex items-center justify-between">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
