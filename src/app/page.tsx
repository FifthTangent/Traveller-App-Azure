import { redirect } from 'next/navigation'
import Database from '../lib/database'

Database.connect()

export default function Redirect(){
    redirect('/library')
}