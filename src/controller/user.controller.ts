
export class UserController{

    

    static login(request,response){
        response.status(200).json({
            message: 'Hello World' 
        })
    }
    
}