import '../styles/global.css'

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