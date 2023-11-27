import type { Metadata } from 'next';
import '../styles/global.css'

export const metadata: Metadata = {
  title: 'Traveller App',
}

export default async function MainLayout(
    props: { 
        children: React.ReactNode, 
    }
){
    return (
        <html>
            <body className= "text-white justify-center bg-black">
                        {props.children} 

            </body>
        </html>
    )
}
