import SectionTitle from "../../../components/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg"
import './Featured.css'

const Featured = () => {
    return(
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle
            subHeading="Check it Out"
            heading="Featured Item"
            >
            </SectionTitle>

            <div className="md:flex  bg-opacity-40 bg-slate-500 justify-center items-center pb-20 pt-12 px-16">
                <div>
                    <img src={featuredImage} alt="" />
                </div>

                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can I get some?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis laborum molestias laboriosam animi maiores libero officiis inventore ducimus, reprehenderit quod molestiae blanditiis, beatae consectetur cumque voluptas labore, assumenda dolorum aut amet doloremque sint natus. Reprehenderit accusamus, eos libero rerum itaque blanditiis, mollitia dolorum ad eaque laborum quidem ab id error.</p>

                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default Featured;