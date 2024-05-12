// const axios = require('axios');
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidDish } from "react-icons/bi";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { IoMdTimer } from "react-icons/io";




const AllFoodsCard = ({ food }) => {
  const { _id,
    food_name,
    food_quantity,
    user_name,
    location,
    notes,
    food_image,
    user_image,
    expired_date } = food || {}

  const { user } = useAuth()
  // Food Image
  // ● Food Name
  // ● Donator Image & Name
  // ● Food Quantity (no. of person to be served.)
  // ● Pickup Location
  // ● Expired Date/Time
  // ● View Detail Button
  return (
    <div className="flex ">
      <div className="w-full">
        <div className="flex rounded-lg h-full bg-gray-100 flex-col ">
          <div className="relative">
            <img className="rounded-t-xl w-full h-60 object-cover object-center" src="https://images.unsplash.com/photo-1715271040278-9c6fcd6e669b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8" alt="" />
            <p className="py-2 px-3 rounded-sm bg-c-primary text-white w-fit absolute bottom-4 left-4 flex items-center gap-2"><BsFillPeopleFill className="text-lg"/> For {food_quantity} person</p>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex gap-6 mb-3 md:mb-2 justify-between md:justify-start">
              <h2 className="text-gray-900 text-xl font-semibold">{food_name}</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700">{notes}</p>
              <div className="flex items-center text-c-primary gap-4">
                <FaLocationDot className="text-xl"></FaLocationDot>
                <p>Pickup from : {location}</p>
              </div>
              <div className="flex items-center text-c-primary gap-4">
                <IoMdTimer className="text-xl"></IoMdTimer>
                <p>Expired at : {expired_date}</p>
              </div>
            </div>
            <div className="border-t-2 border-gray-300 my-5"></div>

            <div className="flex items-center gap-4 text-gray-700">
              <img className="rounded-full w-11 h-11" src={user?.photoURL} alt="" />
              <div>
                <p>{user_name}</p>
                <p className="text-sm">Donator</p>
              </div>
            </div>

            <div className="space-y-4 mt-3">
              <div className="flex justify-end w-full">
                <Link to={`/food-details/${_id}`}>
                  <button className="text-white bg-c-primary hover:bg-c-hover px-4 py-2 rounded-lg font-medium">View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

AllFoodsCard.propTypes = {
  food: PropTypes.object,
}

export default AllFoodsCard;