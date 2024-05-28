import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic =  useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const onSubmit = async(data) => {
    console.log(data);
    // image upload to imgbb and then get an url 
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    if(res.data.success) {
        // now send the menu item data to the server with the image 
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }
        // 
        const menuRes = await axiosSecure.post('/menu', menuItem)
        console.log(menuRes.data) 
        if(menuRes.data.insertedId) {
          // show success popup
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is added to menu`,
            showConfirmButton: false,
            timer: 1500
          });
        }
    }
    console.log('with image url',res.data);

  };

  return (
    <div>
      <h2>Add Item Page</h2>
      <SectionTitle
        heading={"add an item"}
        subHeading={"What's new?"}
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label>
              <div className="label">
                <span className="label-text">Recipe Name*</span>
              </div>
              <input
                type="text"
                name=""
                {...register("name", {required: true})}
                required
                placeholder="Recipe Name"
                id=""
              />
            </label>
          </div>

          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label>
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
                <select defaultValue="default"
                  {...register("category", {required: true})}
                  className="select select-bordered w-full "
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </label>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label>
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
                <input
                  type="number"
                  name=""
                  {...register("price", {required: true})}
                  placeholder="Price"
                  id=""
                />
              </label>
            </div>
          </div>

          <div className=" form-control w-full my-6">
            {/* recipe details */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe Details</span>
              </div>
              <textarea {...register('recipe')}
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
              ></textarea>
            </label>
          </div>

          <div className=" form-control w-full my-6">
            <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" />
          </div>

          <button className="btn">
            Add Item <FaUtensils className=" ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
