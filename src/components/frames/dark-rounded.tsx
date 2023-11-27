export default function AuthFrame ({
	children,
    className,
}: {
  	children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`container px-6 py-10 bg-slate-950 rounded-md w-full h-full ${className}`}>
            { children }
        </div>
    )
}