import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router';
import { Button } from '../ui/button';

interface Props {
    totalPages: number;
    limit?: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryPage = searchParams.get('page') ?? '1'
    const currentPage = isNaN(+queryPage) ? 1 : Number(queryPage)

    const handlePageChange = (currentPage: number) => {
        if (currentPage < 1 || currentPage > totalPages) return;
        searchParams.set('page', currentPage.toString());
        setSearchParams(searchParams);
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Anteriores
            </Button>

            {
                // map(valor del arreglo, pos index)
                Array.from({ length: totalPages }).map((_, index) => (
                    <Button onClick={() => handlePageChange(index + 1)} key={index} variant={currentPage === index + 1 ? 'default' : 'outline'} size="sm">
                        {index + 1}
                    </Button>
                ))
            }


            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="outline" size="sm">
                Siguientes
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
