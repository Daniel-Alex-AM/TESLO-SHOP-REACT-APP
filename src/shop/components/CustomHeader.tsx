import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { useAuthStore } from "@/auth/store/auth.store";

export const CustomHeader = () => {
    // const [cartCount] = useState(3);
    const { authStatus, isAdmin } = useAuthStore();

    const [searchParams, setSearchParams] = useSearchParams(); // query parameters opcionales

    const { gender } = useParams(); //segmentos de ruta que vienen obligatorios

    const { logout } = useAuthStore();

    const inputRef = useRef<HTMLInputElement>(null)
    const searchQuery = searchParams.get('query') || ''

    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        const query = inputRef.current?.value

        const newSearchParams = new URLSearchParams() //Esto borra todos los params actuales de la url

        if (!query) {
            newSearchParams.delete('query');
        } else {
            newSearchParams.set('query', query || '')
        }

        setSearchParams(newSearchParams)
    }

    return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                {/* <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold tracking-tight">TESLA STYLE</h1>
                </div> */}
                <CustomLogo />

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        to="/"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            !gender ? 'underline underline-offset-4' : ''
                        )}>
                        Todos
                    </Link>
                    <Link
                        to="/gender/men"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            gender === 'men' ? 'underline underline-offset-4' : ''
                        )}>
                        Hombres
                    </Link>
                    <Link
                        to="/gender/women"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            gender === 'women' ? 'underline underline-offset-4' : ''
                        )}>
                        Mujeres
                    </Link>
                    <Link
                        to="/gender/kid"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            gender === 'kid' ? 'underline underline-offset-4' : ''
                        )}>
                        Niños
                    </Link>

                </nav>

                {/* Navigation - MOBILE */}
                <nav className="md:hidden flex items-center space-x-8">
                    <Link
                        to="/"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            !gender ? 'underline underline-offset-4' : ''
                        )}>
                        Todos
                    </Link>
                    <Link
                        to="/gender/men"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            gender === 'men' ? 'underline underline-offset-4' : ''
                        )}>
                        H
                    </Link>
                    <Link
                        to="/gender/women"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            gender === 'women' ? 'underline underline-offset-4' : ''
                        )}>
                        M
                    </Link>
                    <Link
                        to="/gender/kid"
                        className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                            gender === 'kid' ? 'underline underline-offset-4' : ''
                        )}>
                        N
                    </Link>

                </nav>

                {/* Search and Cart */}
                <div className="flex items-center space-x-4 p-10">
                    {/* Se movio a Filter Sidebar */}
                    
                    {/* <div className="hidden md:flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                placeholder="Buscar productos..."
                                className="pl-9 w-40 h-9 bg-white"
                                onKeyDown={handleSearch}
                                defaultValue={searchQuery}
                            />
                        </div>
                    </div> */}
{/* 
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button> */}

                    {
                        authStatus === 'not-authenticated' ? (
                            <Link to="/auth/login">
                                <Button
                                    variant='default'
                                    size='sm'
                                    className='ml-2'
                                >
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                variant='outline'
                                size='sm'
                                className='ml-2'
                                onClick={logout}
                            >
                                Cerrar Sesión
                            </Button>
                        )
                    }

                    {
                        isAdmin() && (
                            <Link to="/admin">
                                <Button
                                    variant='destructive'
                                    size='sm'
                                    className='ml-2'
                                >
                                    Admin
                                </Button>
                            </Link>
                        )
                    }



                    {/* <Button variant="ghost" size="icon" className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {cartCount}
                        </span>}
                    </Button> */}
                </div>
            </div>
        </div>
    </header>;
};
export default CustomHeader;