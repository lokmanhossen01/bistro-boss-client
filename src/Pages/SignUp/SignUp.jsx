import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const SignUp = () => {

    const {createUser, updateUserProfile} = useContext(AuthContext)

    const navigate = useNavigate();

    const {
        register,
        handleSubmit, reset, 
        formState: { errors },
      } = useForm()

      const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user; 
            console.log(loggedUser)

            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                console.log('user profile info updated')
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User added successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/')
            })
            .catch(error => console.log(error))
        })
      }

    return(
       <>
       
       <Helmet>
            <title>Bistro Boss || SignUp</title>
       </Helmet>
       
       <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}  className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text"  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered"  />

                {errors.name && <span className="text-red-600">Name is required</span>}
                </div>
                
                <div className="form-control">
                <label className="label">
                    <span className="label-text">photoURL</span>
                </label>
                <input type="text"  {...register("photoURL", { required: true })} placeholder="photoURL" className="input input-bordered"  />

                {errors.photoURL && <span className="text-red-600">photoURL is required</span>}
                </div>


                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email"  {...register("email", { required: true })} name="email"  placeholder="email" className="input input-bordered"  />
                {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password"  {...register("password", { 
                    required: true,      
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/,
                 })} name="password" placeholder="password" className="input input-bordered" required />
                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 Characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less then 20 Characters</span>}
                
                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must be one uppercase one lower case and one special Characters</span>}
                
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
            </form>
            </div>
        </div>
        </div>

       </>
    )
}

export default SignUp; 