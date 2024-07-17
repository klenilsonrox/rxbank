'use server'


import { cookies } from "next/headers"
import { baseUrl } from "../baseUrl"
import { redirect } from "next/navigation"

export async function Cadastrar(name,email,password){
   try{
    const response = await fetch(`${baseUrl}/api/users/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            name,
            email,password
        })
    })

    if(!response.ok){
        return ("Já existe um usuário cadastrado com esse email")
    }


const data = await response.json()



cookies().set("token", data.token,{
    httpOnly:true,
    secure:true
})


redirect("/")


   } catch(error){
    return false
   }


}