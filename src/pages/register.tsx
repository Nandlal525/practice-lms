import { FormEvent } from "react";
import Button from "../component/button";
import Input from "../component/input";
import axios from "axios";

const Register =  () => {

     const handleSubmit =  async (e: FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const formData=new FormData(e.currentTarget);
            const formValues = Object.fromEntries(formData.entries());
            console.log(formValues);

            try{
                const response = await axios("http://localhost:3000/auth/register",{
                    headers:{
                        "Content-Type":"application/json",

                    },
                    method:"POST",
                    data:formValues,
                });
                localStorage.setItem("token",response.data.token);
                console.log(response);

            }
            catch(err){
                console.log(err);
            }
        }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" type="text" id="name" content="Name" />
          <Input name="email" type="email" id="email" content="Email" />
          <Input name="mobile" type="tel" id="mobile" content="Mobile" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          <Button content="Register" type="submit" bgColor="bg-blue-600" />
        </form>
      </div>
    </div>
  );
};

export default Register;