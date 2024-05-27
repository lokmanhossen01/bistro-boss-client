 {/* React Simple Captcha step-01 */}
import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {


    // Login using email and password setup 
    const {signIn} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation()


    const form = location.state?.form?.pathname || '/';
    console.log('state in the location login page', location.state)
 

    {/* React Simple Captcha step-03 */}

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        loadCaptchaEnginge(6); 
    },[])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target; 
        const email = form.email.value; 
        const password = form.password.value; 
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user; 
                console.log(user)

                Swal.fire({
                    title: "User Login Successful.",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  
                  navigate(form, {replace: true})
            })
    }

    {/* React Simple Captcha step-04 */}
    const validateCaptcha = (e) => {
        const value = e.target.value
        // console.log(value);
        if (validateCaptcha(value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    }

    return(
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card md:w-1/2 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                    {/* React Simple Captcha step-02 */}
                    <LoadCanvasTemplate />
                </label>
                <input  onBlur={validateCaptcha} type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" required />
                {/* <button className="btn btn-outline btn-xs mt-2">Validate</button> */}
              </div>


              <div  className="form-control mt-6">
                {/* TODO: apply disabled for recaptcha */}
                <input disabled={false}  type="submit" value="Login" className="btn btn-primary"/>
              </div>
            </form>
            <p className=' text-center'><small>New here? <Link className=' text-orange-500' to="/signup">Create an account</Link></small></p>
          </div>
        </div>
      </div>
    )
}

export default Login; 