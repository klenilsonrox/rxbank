export async function POST(request){
    const body = await request.json()
    try{
        const response = await fetch(`${baseUrl}/api/users/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:body.email
                ,
                password:body.password
            })
        })

        if(!response.ok){
            return Response.json({erro: "Dados inválidos"}, {status:401})
        }
    
    
    const data = await response.json()
    
    cookies().set('token', data.token, {
        httpOnly:true,
        secure:true
    })

    return Response.json({autorizado:true})
    
       } catch(error){
        return false
       }
}