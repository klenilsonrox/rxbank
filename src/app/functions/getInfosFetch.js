import { redirect } from "next/navigation"
import { getToken } from "../actions/getToken"
import { baseUrl } from "../baseUrl"


export async function getInfosFetch(){
    const token = await getToken()
    try {
        const responseUser = await fetch(`${baseUrl}/api/users/me` ,{
            next:{
                revalidate:1
            },
            headers:{
                "authorization":`Bearer ${token}`
            }
        })

     

       if(responseUser.status===401){
        window.location.href="/"
       }

        const dataUser = await responseUser.json()

    
        const responseContacts = await fetch(`${baseUrl}/api/mycontacts` ,{
            next:{
                revalidate:0
            },
            headers:{
                "authorization":`Bearer ${token}`
            }
        })

        if(responseContacts.status===401){
            window.location.href="/"
           }
    
        const datContacts= await responseContacts.json()
    
        const responseAmount = await fetch(`${baseUrl}/api/account/email` ,{
            next:{
                revalidate:1
            },
            headers:{
                "authorization":`Bearer ${token}`
            }
        })

        if(responseAmount.status===401){
            window.location.href="/"
           }
    
    
        const dataAmount = await responseAmount.json()

    
        const responseTransactions = await fetch(`${baseUrl}/api/mytransactions`
            ,{
                next:{
                    revalidate:3
                },
                headers:{
                    "authorization":`Bearer ${token}`
                }
            }
        )

        if(responseTransactions.status===401){
            window.location.href="/"
           }
    
        const dataTransactions = await responseTransactions.json()
    
        let dados = {
            dataUser,
            dataAmount,
            dataTransactions,
            datContacts
        }
        
        return dados
    } catch (error) {
 
    }
}