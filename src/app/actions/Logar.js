'use server'

import { cookies } from "next/headers"
import { baseUrl } from "../baseUrl"
import { redirect } from "next/navigation"


export async function Logar(email,password){
   try{
    const response = await fetch(`${baseUrl}/api/users/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            email,password
        })
    })

    if(!response.ok){
        return ("dados inválidos")
    }


const data = await response.json()

cookies().set('token', data.token, {
    httpOnly:true,
    secure:true
})


return true

   } catch(error){
    return false
   }


}