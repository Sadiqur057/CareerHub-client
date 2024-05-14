import { Select, Option, Input, Textarea } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deadlineDate, setDeadline] = useState(null);
  const [categoryValue, setCategoryValue] = useState("");


  const categoryOptions = [
    { label: "On Site", value: "on-site" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Part Time", value: "part-time" }
  ];


  const handleCategoryOptions = (value) => {
    setCategoryValue(value);
  };


  const {mutate} = useMutation({
    mutationFn: (jobDetails) =>{
      axios.post("https://career-hub-server-one.vercel.app/add-job", jobDetails)
      .then(res=> {
        if(res.data.insertedId){
          Swal.fire({
            title: "Success!",
            text: "You have added the job",
            icon: "success",
            confirmButtonColor: "#35a483",
          }).then(()=>{
            navigate('/my-jobs')
          })
        }

      })
    }
  })

  const triggerMutation=(data)=>{
    mutate(data);
  }

  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const posted_by = form.name.value;
    const user_email = form.email.value;
    const job_title = form.jobTitle.value;
    const salary_range = form.salary.value;
    const description = form.description.value;
    const image = form.image.value;
    const job_type = categoryValue;
    const deadline = deadlineDate.toLocaleDateString()
    const applicants_number = 0;
    const posting_date = new Date().toLocaleDateString()
    const jobDetails = {
      posted_by,
      user_email,
      job_title,
      salary_range,
      description,
      image,
      job_type,
      deadline,
      applicants_number,
      posting_date
    };
    triggerMutation(jobDetails)
    clearInputField(form.salary)
    clearInputField(form.jobTitle)
    clearInputField(form.description)
    clearInputField(form.image)
    setCategoryValue('');
    setDeadline('')
  };


  const clearInputField =(field)=>{
    field.value = "";
  }



  return (
    <div className="bg-cool py-10">
      <Helmet>
        <title>CH | Add Job</title>
      </Helmet>
      <section className="py-6 bg-base-100 w-[90%] max-w-4xl mx-auto rounded-md bg-cool">
        <form
          onSubmit={handleAddJob}
          className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-4ee md:px-10 pb-5"
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
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div>
                  <Select
                    label="Select Job Category"
                    color="orange"
                    required
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
                required
                  label="Salary Range"
                  color="orange"
                  name="salary"
                  type="text"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <DatePicker className="text-sm border border-gray-400 py-[9px] px-3 rounded-md focus:outline-c-primary w-full " selected={deadlineDate} onChange={(date) => setDeadline(date)}  required placeholderText="Application Deadline"
                  wrapperClassName="w-full" onKeyDown={(e) => {
                    e.preventDefault();
                  }} />
              </div>

              <div className="col-span-full">
                <div className="relative w-full min-w-[200px]">
                  <Textarea
                  required
                    name="description"
                    color="orange"
                    label="Job Description"
                  ></Textarea>
                </div>
              </div>

              <div className="col-span-full">
                <Input label="Image URL of Job Banner" color="orange" name="image" required />
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

export default AddJob;