import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Select, Option, Input, Textarea, Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

const EditFood = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate()
  const foodData = useLoaderData();
  const axiosSecure = useAxiosSecure()
  const {id} = useParams()

  const { user } = useAuth();
  const [foodStatusValue, setFoodStatusValue] = useState('');
  const [expireDate, setExpireDate] = useState(foodData?.expired_date);


  const foodStatusOptions = [
    { label: "Available", value: "available" },
    { label: "Not Available", value: "not-available" },
  ];


  
  const {isPending, data: foodInformation, refetch } = useQuery({
    queryKey: ['food-details'],
    queryFn: async ()=>{
      const response = await axiosSecure.get(`http://localhost:5000/food-details?email=${user?.email}&id=${id}`)
      setFoodStatusValue(response.data?.food_status)
      setExpireDate(response.data.expired_date)
      return response.data;
    }
  })

  const {mutate} = useMutation({
    mutationFn: (foodDetails) =>{
          axios.put(`http://localhost:5000/edit-food/${foodData?._id}`,foodDetails)
            .then(res => {
              console.log(res.data)
              if(res.data.modifiedCount>0){
                refetch()
                Swal.fire({
                  title: "Success!",
                  text: "You have Edited the food",
                  icon: "success",
                  confirmButtonColor: "#35a483",
                }).then(()=>{
                  navigate('/my-foods')
                })
              }else {
                Swal.fire({
                  title: "Warning!",
                  text: "You haven't updated anything",
                  icon: "warning",
                  confirmButtonColor: "#35a483",
                }).then(() => {
                  navigate("/my-foods");
                });
              }
            })
        }
  })

  const triggerMutation=(data)=>{
    mutate(data);
  }

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }

  const { 
    food_name,
    image,
    food_quantity,
    location,
    notes,
    food_status,
    expired_date } = foodInformation || {};

    const handleFoodStatusOptions = (value) => {
    setFoodStatusValue(value);
  };


  const handleUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_quantity = form.food_quantity.value;
    const food_status = foodStatusValue;
    const location = form.location.value
    const notes = form.notes.value;
    const image = form.image.value;
    const expired_date = expireDate;
    const foodDetails = {
      id,
      food_name,
      food_quantity,
      notes,
      image,
      location,
      food_status,
      expired_date
    };
    triggerMutation(foodDetails)
    console.log(foodDetails)

  };
  return (
    <div className="bg-cool py-10">
      <Helmet>
        <title>TB | Add Food</title>
      </Helmet>
      <section className="p-6 w-[90%] max-w-4xl mx-auto rounded-md bg-cool">
        <form
          onSubmit={handleUpdateFood}
          className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-10 pb-5"
        >
          <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-center font-bold text-2xl md:text-3xl py-8">
                Add Food
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full ">
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Food Name"
                  color="orange"
                  name="food_name"
                  defaultValue={food_name}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div>
                  <Select
                    label="Select Food Status"
                    color="orange"
                    onChange={handleFoodStatusOptions}
                    value={food_status}
                  >
                    {foodStatusOptions.map((statusOption) => (
                      <Option
                        key={statusOption.value}
                        value={statusOption.value}
                      >
                        {statusOption.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Food Quantity"
                  color="orange"
                  name="food_quantity"
                  type="text"
                  defaultValue={food_quantity}
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

              <div className="col-span-full sm:col-span-3">
                <Input label="Food Image URL" color="orange" name="image" defaultValue={image} />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Input label="Pickup Location" color="orange" name="location" defaultValue={location} />
              </div>
              <div className="col-span-full">
                <input
                  type="submit"
                  value="Update"
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

export default EditFood;