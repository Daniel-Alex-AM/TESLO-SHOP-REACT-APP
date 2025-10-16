import { Button } from '@/components/ui/button'
import { Filter, Grid, List } from 'lucide-react'
import { useState } from 'react'
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { useSearchParams } from 'react-router';
import type { Product } from '@/interfaces/product.interface';

interface Props {
    products: Product[];
    productCount: number;

}

export const ProductsGrid = ({ products, productCount }: Props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const viewMode = searchParams.get('view-mode') || 'grid' //si view mode esta presente pero vacío, el || hace que sea 'grid'

    const [showFilters, setShowFilters] = useState(false)

    const handleViewModeChange = (mode: 'grid' | 'list') => {
        searchParams.set('view-mode', mode)
        setSearchParams(searchParams)
    }

    return (
        <section className="py-12 px-4 lg:px-8">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-3xl font-light">Productos</h2>
                        {/* <span className="text-muted-foreground">({products.length} productos)</span> */}
                        <span className="text-muted-foreground">({productCount} productos)</span>
                    </div>

                    <div className="flex items-center space-x-2">

                        {/* Este button se va ocultando si la pantalla es mas grande */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden" //Aqui se indica ocultar en lg
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filtros
                        </Button>

                        {/* Este div se oculta si la pantalla es pequeña */}
                        {/* hidden >=donde si mostrarse:block|flex */}
                        {/* O sea, se muestra en tamaños >=md (md y lg...) */}
                        <div className="hidden md:flex border rounded-md">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => handleViewModeChange('grid')}
                                className="rounded-r-none"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => handleViewModeChange('list')}
                                className="rounded-l-none"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar - Desktop */}
                    {/* Se oculta si pantalla es pequeña */}
                    {/* hidden donde-si-mostrarse:block */}
                    <div className="hidden lg:block">
                        <FilterSidebar />
                    </div>

                    {/* Mobile Filters */}
                    {showFilters && (
                        <div className="fixed inset-0 z-50 bg-background p-4 lg:hidden">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold">Filtros</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowFilters(false)}
                                >
                                    Cerrar
                                </Button>
                            </div>

                            <FilterSidebar />

                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className={
                            viewMode === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                        }>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.title}
                                    price={product.price}
                                    image={product.images[0]}
                                    gender={product.gender}
                                    category={product.tags.join(',')}
                                    sizes={product.sizes || []}
                                />
                            ))}
                        </div>

                      
                    </div>
                </div>
            </div>
        </section>
    )
}
