 {/* React Simple Captcha step-01 */}
import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';

const Login = () => {

    {/* React Simple Captcha step-03 */}
    const captchaRef = useRef(null)
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
    }

    {/* React Simple Captcha step-04 */}
    const validateCaptcha = e => {
        const value = captchaRef.current.value
        // console.log(value);
        if (validateCaptcha(value)==true) {
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
                <input ref={captchaRef} type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" required />
                <button onClick={validateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button>
              </div>


              <div className="form-control mt-6">
                <input disabled={disabled} type="submit" value="Login" className="btn btn-primary"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Login; 