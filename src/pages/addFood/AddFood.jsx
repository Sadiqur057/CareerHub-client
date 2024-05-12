import { Input, Textarea } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const AddFood = () => {

  const { user } = useAuth();
  const [expireDate, setExpireDate] = useState(null);

  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn: (foodDetails) =>{
      axios.post("http://localhost:5000/add-food", foodDetails)
      .then(res=> {
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            title: "Success!",
            text: "You have added the food",
            icon: "success",
            confirmButtonColor: "#35a483",
          }).then(()=>{
            navigate('/my-foods')
          })
        }

      })
    }
  })

  const triggerMutation=(data)=>{
    mutate(data);
  }



  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const user_email = form.user_email.value;
    const user_image = form.user_image.value;
    const user_name = form.user_name.value
    const food_name = form.food_name.value;
    const food_quantity = form.food_quantity.value;
    const food_status = "available";
    const location = form.location.value
    const notes = form.notes.value;
    const image = form.image.value;
    const added_date = new Date().toLocaleDateString();
    const expired_date = expireDate.toLocaleDateString();
    const foodDetails = {
      user_image,
      user_name,
      user_email,
      food_name,
      food_quantity,
      notes,
      image,
      location,
      food_status,
      expired_date,
      added_date
    };
    console.log(foodDetails)
    triggerMutation(foodDetails)


      // axios.post("http://localhost:5000/add-food", foodDetails)
      // .then((data) => {
      //   if (data.data.insertedId) {
      //     Swal.fire({
      //       title: "Success!",
      //       text: "You have added the Foodt",
      //       icon: "success",
      //       confirmButtonColor: "#e0882f",
      //     })
      //     .then(()=>{
      //       navigate('/my-food')
      //     })
      //   }
      // });
  };


  return (
    <div className="bg-cool py-10">
      <Helmet>
        <title>TB | Add Food</title>
      </Helmet>
      <section className="p-6 w-[90%] max-w-4xl mx-auto rounded-md bg-cool">
        <form
          onSubmit={handleAddFood}
          className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-10 pb-5"
        >
          <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-center font-bold text-2xl md:text-3xl py-8">
                Add Food
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full ">
              <div className="col-span-full sm:col-span-3 ">
                <Input
                  label="Username"
                  color="orange"
                  readOnly
                  defaultValue={user?.displayName}
                  name="user_name"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Email"
                  color="orange"
                  readOnly
                  defaultValue={user?.email}
                  name="user_email"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="User Photo"
                  color="orange"
                  readOnly
                  defaultValue={user?.photoURL}
                  name="user_image"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Food Name"
                  color="orange"
                  name="food_name"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Food Quantity"
                  color="orange"
                  name="food_quantity"
                  type="text"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <DatePicker className="text-sm border border-gray-400 py-[9px] px-3 rounded-md focus:outline-c-primary w-full " selected={expireDate} onChange={(date) => setExpireDate(date)} placeholderText="Select Expire Date"
                  wrapperClassName="w-full" onKeyDown={(e) => {
                    e.preventDefault();
                  }} />
              </div>

              <div className="col-span-full">
                <div className="relative w-full min-w-[200px]">
                  <Textarea
                    name="notes"
                    color="orange"
                    label="Additional Notes"
                  ></Textarea>
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <Input label="Food Image URL" color="orange" name="image" />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Input label="Pickup Location" color="orange" name="location" />
              </div>
              <div className="col-span-full">
                <input
                  type="submit"
                  value="Add"
                  className="bg-c-primary hover:bg-c-hover btn btn-neutral border-none text-white w-full"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default AddFood;