export const verifyToken = async (req, res, next) =>{
   const token = req.headers["x-acces-token"]
   console.log(token)
   if(!token){
       res.status(403).json({message: 'no token'})
   }
   next()
}