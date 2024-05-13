import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Select, Option, Input, Textarea, Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

const EditJob = () => {

  const navigate = useNavigate();
  const [categoryValue, setCategoryValue] = useState("");
  const [deadlineDate, setDeadline] = useState(null);

  window.scrollTo(0, 0);
  const axiosSecure = useAxiosSecure()
  const { id } = useParams()
  const { user } = useAuth();

  const categoryOptions = [
    { label: "On Site", value: "on-site" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Part Time", value: "part-time" }
  ];

  const { isPending, data: jobInformation, refetch } = useQuery({
    queryKey: ['job-details'],
    queryFn: async () => {
      const response = await axiosSecure.get(`http://localhost:5000/job-details?email=${user?.email}&id=${id}`)

      setCategoryValue(response.data?.job_type)
      setDeadline(response.data?.deadline)
      console.log(response.data)
      const data = response.data;
      console.log(data)
      return data;
    }
  })





  const handleCategoryOptions = (value) => {
    setCategoryValue(value.toLocaleDateString());
  };

  
  const {mutate} = useMutation({
    mutationFn: (jobDetails) =>{
          axios.put(`http://localhost:5000/edit-job/${jobInformation?._id}`,jobDetails)
            .then(res => {
              console.log(res.data)
              if(res.data.modifiedCount>0){
                refetch()
                Swal.fire({
                  title: "Success!",
                  text: "You have Edited the Job",
                  icon: "success",
                  confirmButtonColor: "#35a483",
                }).then(()=>{
                  navigate('/my-jobs')
                })
              }else {
                Swal.fire({
                  title: "Warning!",
                  text: "You haven't updated anything",
                  icon: "warning",
                  confirmButtonColor: "#35a483",
                }).then(() => {
                  navigate("/my-jobs");
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

  const { applicants_number, deadline, job_title, posted_by, posting_date, salary_range, _id,description, image } = jobInformation;

  const handleEditJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const posted_by = form.name.value;
    const user_email = form.email.value;
    const job_title = form.jobTitle.value;
    const salary_range = form.salary.value;
    const description = form.description.value;
    const image = form.image.value;
    const job_type = categoryValue;
    const deadline = deadlineDate;
    const jobDetails = {
      posted_by,
      user_email,
      job_title,
      salary_range,
      description,
      image,
      job_type,
      deadline
    };
    console.log(jobDetails)
    triggerMutation(jobDetails)
  }

  return (
    <div className="bg-cool py-10">
      <Helmet>
        <title>CH | Add Job</title>
      </Helmet>
      <section className="p-6 bg-base-100 w-[90%] max-w-4xl mx-auto rounded-md bg-cool">
        <form
          onSubmit={handleEditJob}
          className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-10 pb-5"
        >
          <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-center font-bold text-2xl md:text-3xl py-8">
                Add Job
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full ">
              <div className="col-span-full sm:col-span-3 ">
                <Input
                  label="Username"
                  color="orange"
                  readOnly
                  defaultValue={user?.displayName}
                  name="name"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Email"
                  color="orange"
                  readOnly
                  defaultValue={user?.email}
                  name="email"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Job Title"
                  color="orange"
                  name="jobTitle"
                  defaultValue={job_title}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div>
                  <Select
                    label="Select Job Category"
                    color="orange"
                    value={categoryValue}
                    onChange={handleCategoryOptions}
                  >
                    {categoryOptions.map((categoryOption) => (
                      <Option
                        key={categoryOption.value}
                        value={categoryOption.value}
                      >
                        {categoryOption.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Salary Range"
                  color="orange"
                  name="salary"
                  type="text"
                  defaultValue={salary_range}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <DatePicker className="text-sm border border-gray-400 py-[9px] px-3 rounded-md focus:outline-c-primary w-full " selected={deadlineDate} onChange={(date) => setDeadline(date)} placeholderText="Select a date"
                  wrapperClassName="w-full" onKeyDown={(e) => {
                    e.preventDefault();
                  }} />
              </div>

              <div className="col-span-full">
                <div className="relative w-full min-w-[200px]">
                  <Textarea
                    name="description"
                    color="orange"
                    label="Description"
                    defaultValue={description}
                  ></Textarea>
                </div>
              </div>

              <div className="col-span-full">
                <Input label="Image URL" color="orange" name="image" defaultValue={image}/>
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

export default EditJob;