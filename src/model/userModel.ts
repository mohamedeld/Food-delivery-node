import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
        unique:true
    },
    password:{
        type:String,
        
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});
export default mongoose.model('User',userSchema);