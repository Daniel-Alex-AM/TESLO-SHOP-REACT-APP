interface Props {
    title: string;
    subtitle?: string;
}

const default_title = "Estilo Tesla"
const default_subtitle = "Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. Calidad premium para un estilo atemporal."

export const CustomJumbotron = ({ title = default_title, subtitle = default_subtitle }: Props) => {
    return (
        <section className="py-10 px-4 lg:px-8 bg-muted/30">
            <div className="container mx-auto text-center">
                <h1 className="font-montserrat text-5xl lg:text-5xl tracking-tight mb-6">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {subtitle}
                </p>

            </div>
        </section>
    )
}
