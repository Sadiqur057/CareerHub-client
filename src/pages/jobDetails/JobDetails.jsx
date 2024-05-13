import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import { LuCircleDollarSign } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Input, Option, Select, Spinner, Textarea } from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import { useState } from "react";



const JobDetails = () => {

  const [deadlineDate, setDeadline] = useState(null);


  const { user } = useAuth()
  window.scrollTo(0, 0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()


  const { isPending, data: jobInformation } = useQuery({
    queryKey: ['job-details'],
    queryFn: async () => {
      const email = user?.email
      const response = await axiosSecure.get(`http://localhost:5000/job-details?email=${email}&id=${id}`)
      return response.data
    }
  })


  const { applicants_number, deadline, job_title, posted_by, posting_date, salary_range, _id, job_type, user_email:email } = jobInformation || {};
  console.log(_id)

  const {mutate} = useMutation({
    mutationFn: (data) =>{
      axios.post('http://localhost:5000/applied-job',data)
      .then(res=> {
        handleClose()
        if (res.data.insertedId) {
          const newApplicantsNumber = parseInt(applicants_number)+1;
          const data = {newApplicantsNumber}
          axios.put(`http://localhost:5000/update-job/${_id}`,data)
            .then(data => {
              console.log(data.data)
              Swal.fire({
                title: "Success!",
                text: "You have applied the job",
                icon: "success",
                confirmButtonColor: "#35a483",
              }).then(()=>{
                navigate('/')
              })
            })
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

  const handleApplyJob = (e) => {
    e.preventDefault();
    console.log('applied')
    const form = e.target;
    const user_name = form.name.value;
    const user_email = form.email.value;
    const resume = form.resume.value;
    const job_id = _id;
    const job_category = job_type;
    const job = job_title;

    const jobDetails = {
      user_name,user_email,resume,job_id,job,job_category
    }
    console.log(jobDetails)
    const currDate = new Date()
    if(currDate> new Date(deadline)){
      handleClose()
      return Swal.fire({
        title: "OOPS!",
        text: "Sorry! Application deadline has passed. Please try other jobs.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      })
     
    }else if(email === user.email){
      handleClose();
      return Swal.fire({
        title: "OOPS!",
        text: "Sorry! You can not apply your own job. Please try other jobs",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      })
    }
    triggerMutation(jobDetails)
  }

  return (
    <div>
      <img className="relative z-10 object-cover object-center w-[90%] mx-auto rounded-md h-96" src="https://images.unsplash.com/photo-1644018335954-ab54c83e007f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

      <div className="relative z-20 max-w-3xl xl:max-w-4xl p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900 mb-10">
        <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-2xl">
          {job_title}
        </a>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
          laudantium quia tempore delect
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <LuCircleDollarSign className="text-c-primary text-4xl"></LuCircleDollarSign>
            <p className="text-gray-600">Salary</p>
            <p className=" text-c-primary"> {salary_range}</p>
          </div>
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <FaUsers className="text-c-primary text-4xl"></FaUsers>
            <p className="text-gray-600">Applicants</p>
            <p className=" text-c-primary"> {applicants_number}</p>
          </div>
          <div className="bg-gray-100 flex flex-col p-4 justify-center items-center space-y-2 rounded-lg">
            <IoMdTimer className="text-c-primary text-4xl"></IoMdTimer>
            <p className="text-gray-600">Deadline</p>
            <p className=" text-c-primary"> {deadline}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button onClick={handleOpen} className="text-white bg-c-primary px-4 py-2 rounded-lg">Apply</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

          >
            <Box
              className="rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-[90%] md:w-2/3 lg:w-1/2"
            >
              <div id="modal-modal-description">
                <form
                  onSubmit={handleApplyJob}
                  className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-10 pb-5"
                >
                  <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                      <p className="text-center font-bold text-2xl md:text-3xl pb-10 py-2">
                        Add Job
                      </p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full ">
                      <div className="col-span-full ">
                        <Input
                          label="Username"
                          color="orange"
                          readOnly
                          defaultValue={user?.displayName}
                          name="name"
                        />
                      </div>
                      <div className="col-span-full ">
                        <Input
                          label="Email"
                          color="orange"
                          readOnly
                          defaultValue={user?.email}
                          name="email"
                        />
                      </div>

                      <div className="col-span-full">
                        <Input label="Resume URL" color="orange" name="resume" />
                      </div>
                      <div className="col-span-full">
                        <input
                          type="submit"
                          value="Submit Application"
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

export default JobDetails;