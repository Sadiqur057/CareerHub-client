import { useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import { FaUser } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { IoMdTimer } from "react-icons/io";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Input, Spinner, Textarea } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodDetails = () => {
  const { user } = useAuth()
  window.scrollTo(0, 0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const {id} = useParams()
  const axiosSecure = useAxiosSecure()

  
  const {mutate} = useMutation({
    mutationFn: (data) =>{
      axios.post('http://localhost:5000/requested-food',data)
      .then(res=> {
        handleClose()
        if (res.data.insertedId) {
          axios.put(`http://localhost:5000/update-food/${_id}`)
            .then(data => {
              console.log(data.data)
              Swal.fire({
                title: "Success!",
                text: "You have requested the food",
                icon: "success",
                confirmButtonColor: "#35a483",
              }).then(()=>{
                navigate('/requested-foods')
              })
            })
        }
      })
    }
  })

  const triggerMutation=(data)=>{
    mutate(data);
  }
    
  const {isPending, data: foodInformation } = useQuery({
    queryKey: ['food-details'],
    queryFn: async ()=>{
      const response = await axiosSecure.get(`http://localhost:5000/food-details?email=${user?.email}&id=${id}`)
      return response.data
    }
  })

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }

  const { _id,
    food_name,
    image,
    food_quantity,
    location,
    notes,
    user_name,
    user_email,
    expired_date } = foodInformation || {};

  const handleRequestFood = (e, id) => {
    e.preventDefault()
    console.log('clicked', id)
    const form = e.target;
    const pickup_location = form.location.value;
    const donator = form.donator_name.value;
    const expiry = form.expired_date.value;
    const request_date = form.request_date.value;
    const email = user?.email;
    const requestedFoodDetails = { pickup_location, donator, expiry, request_date, email }
    console.log(requestedFoodDetails)
    triggerMutation(requestedFoodDetails);

  }

  return (
    <div>
      <img className="relative z-10 object-cover object-center w-[90%] mx-auto rounded-md h-96" src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

      <div className="relative z-20 max-w-3xl xl:max-w-4xl p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900 mb-10">
        <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-2xl">
          {food_name}
        </a>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
          {notes}
        </p>

        <div className="grid lg:grid-cols-2 mt-4 gap-4 text-center">
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <FaUser className="text-c-primary text-3xl"></FaUser>
            <p className="text-gray-600">Donator</p>
            <p className=" text-c-primary"> {user_name}</p>
          </div>
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <BiSolidDish className="text-c-primary text-4xl"></BiSolidDish>
            <p className="text-gray-600">Pickup From</p>
            <p className=" text-c-primary"> {location}</p>
          </div>
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <BiSolidDish className="text-c-primary text-4xl"></BiSolidDish>
            <p className="text-gray-600">Dishes Available</p>
            <p className=" text-c-primary"> {food_quantity}</p>
          </div>
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <IoMdTimer className="text-c-primary text-4xl"></IoMdTimer>
            <p className="text-gray-600">Expired at</p>
            <p className=" text-c-primary"> {expired_date}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button onClick={handleOpen} className="text-white bg-c-primary px-4 py-2 rounded-lg">Request</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >


            <Box
              className="rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-3/4 p-4"
            >

              <div id="modal-modal-description" >
                <form
                  onSubmit={() => handleRequestFood(event, _id)}
                  className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-10 pb-5"
                >
                  <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                      <p className="text-center font-bold text-2xl md:text-3xl py-8 mb-4">
                        Request Food
                      </p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full ">
                      <div className="col-span-full sm:col-span-2">
                        <Input
                          label="Food Name"
                          color="orange"
                          name="food_name"
                          defaultValue={food_name}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-2">
                        <Input label="Food Image URL" color="orange" name="image" defaultValue={image} readOnly />
                      </div>

                      <div className="col-span-full sm:col-span-2">
                        <Input
                          label="Food Id"
                          color="orange"
                          name="food_id"
                          type="text"
                          defaultValue={_id}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Input
                          label="Donator Email"
                          color="orange"
                          name="donator_email"
                          type="text"
                          defaultValue={user_email}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Input
                          label="Donator Name"
                          color="orange"
                          name="donator_name"
                          type="text"
                          defaultValue={user_name}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Input
                          label="User Email"
                          color="orange"
                          name="user_email"
                          type="text"
                          defaultValue={user?.email}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Input
                          label="Request Date"
                          color="orange"
                          name="request_date"
                          type="text"
                          defaultValue={new Date().toLocaleDateString()}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Input
                          label="Pickup Location"
                          color="orange"
                          name="location"
                          type="text"
                          defaultValue={location}
                          readOnly
                        />
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Input label="Expired Date"
                          color="orange"
                          name="expired_date"
                          type="text"
                          defaultValue={expired_date}
                          readOnly>
                        </Input>

                      </div>

                      <div className="col-span-full">
                        <div className="relative w-full min-w-[200px]">
                          <Textarea
                            name="notes"
                            color="orange"
                            label="Additional Notes"
                            defaultValue={notes}
                          ></Textarea>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <input
                          type="submit"
                          value="Request"
                          className="bg-c-primary hover:bg-c-hover btn btn-neutral border-none text-white w-full"
                        />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>

  );
};

export default FoodDetails;