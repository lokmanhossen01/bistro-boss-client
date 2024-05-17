import Banner from "../Banner/Banner"
import Category from "../Category/Category"
import Featured from "../Featured/Featured"
import PopularMenu from "../PopularMenu/PopularMenu"
import Testimonials from "../Testimonials/Testimonials"

export const Home = () => {
    return(
        <div>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    )
}