import { useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import { LuCircleDollarSign } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Input, Spinner } from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";



const JobDetails = () => {


  const { user, loading } = useAuth()
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
      const email = await user.email
      console.log(email)
      const response = await axiosSecure.get(`https://career-hub-server-one.vercel.app/job-details?email=${email}&id=${id}`)
      return response.data
    }
  })


  const { applicants_number, deadline, job_title, image, salary_range, _id, job_type, user_email: email, description } = jobInformation || {};


  const { mutate } = useMutation({
    mutationFn: (data) => {
      axios.post('https://career-hub-server-one.vercel.app/applied-job', data)
        .then(res => {
          handleClose()
          if (res.data.insertedId) {
            const newApplicantsNumber = parseInt(applicants_number) + 1;
            const data = { newApplicantsNumber }
            axios.put(`https://career-hub-server-one.vercel.app/update-job/${_id}`, data)
              .then(() => {
                Swal.fire({
                  title: "Success!",
                  text: "You have applied the job",
                  icon: "success",
                  confirmButtonColor: "#35a483",
                }).then(() => {
                  navigate('/')
                })
              })
          }
        })
    }
  })

  const triggerMutation = (data) => {
    mutate(data);
  }



  if (isPending || loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="orange" />
      </div>
    );
  }

  const handleApplyJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const user_name = form.name.value;
    const user_email = form.email.value;
    const resume = form.resume.value;
    const job_id = _id;
    const job_category = job_type;
    const job = job_title;

    const jobDetails = {
      user_name, user_email, resume, job_id, job, job_category
    }
    const currDate = new Date()
    if (currDate > new Date(deadline)) {
      handleClose()
      return Swal.fire({
        title: "OOPS!",
        text: "Sorry! Application deadline has passed. Please try other jobs.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      })

    } else if (email === user.email) {
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
      <Helmet>
        <title>CH | Job: {job_title}</title>
      </Helmet>
      <img className="relative z-10 object-cover object-center w-full mx-auto h-[30vh] max-h-[700px] md:h-[60vh] lg:h-[80vh]" src={image} alt="" />

      <div className="relative z-20 max-w-3xl xl:max-w-4xl p-6 mx-auto lg:-mt-56 bg-base-200 lg:rounded-md shadow  mb-10">
        <a href="#" className="font-semibold  hover:underline md:text-2xl">
          {job_title}
        </a>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm ">
          {description}
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
              className="rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[90%] md:w-2/3 lg:w-1/2"
            >
              <div id="modal-modal-description">
                <form
                  onSubmit={handleApplyJob}
                  className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-lg px-4 md:px-10 pb-5 "
                >
                  <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                      <p className="text-center font-bold text-2xl md:text-3xl pb-10 py-2">
                        Apply Job
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
                        <Input label="Resume URL" color="orange" name="resume" required />
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