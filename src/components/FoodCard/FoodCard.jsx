import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCard = ({item}) => {

    const {name, image, price, recipe, _id} = item; 

    const {user} = useAuth();
    const navigate = useNavigate()
    const location = useLocation()


    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        // console.log(food, user?.email);

        if (user && user.email) {
            //send cart item to the database 
            // console.log(user.email, food);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, 
                image, 
                price
            }
            axiosSecure.post('/carts', cartItem) 
                .then(res => {
                    console.log(res.data)
                    if(res.data.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 2500
                          });

                        //   refetch cart to update the cart items count
                        refetch()
                    }
                })
        } else {
            Swal.fire({
                title: "You are not logged in!",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
                // send the use to the login page 

                navigate('/login', {state: {form: location}})
                
                }
              });
        }
    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} /></figure>
            <p className=" bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                <button 
                onClick={ handleAddToCart}
                className="btn btn-outline bg-slate-100 border-0 border-orange-400 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default FoodCard; 