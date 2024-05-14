import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyJobs = () => {

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();

  const { isPending, data: myJobs, refetch } = useQuery({
    queryKey: ['my-foods'],
    queryFn: async () => {
      const response = await axiosSecure.get(`https://career-hub-server-one.vercel.app/my-jobs/${user?.email}`)
      return response.data
    }
  })
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="orange" />
      </div>
    );
  }


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://career-hub-server-one.vercel.app/delete-job/${id}`)
          .then(data => {
            if (data.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });

  }
  return (
    <div className="w-[90%] mx-auto my-10">
      <Helmet>
        <title>CH | My Jobs</title>
      </Helmet>

      <div className="mb-10 overflow-auto">
        <table className="table">
          <thead className="bg-gray-100">
            <tr className="text-gray-800">
              <th>Title</th>
              <th>Salary</th>
              <th>Job Type</th>
              <th>Posting Date</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              myJobs.map((job) => <tr key={job._id}>
                <td>{job?.job_title}</td>
                <td>{job?.salary_range}</td>
                <td>{job?.job_type}</td>
                <td>{job?.posting_date}</td>
                <td>{job?.deadline}</td>
                <td className="flex items-center gap-4"><Link to={`/edit-job/${job._id}`}>
                  <FaEdit className="cursor-pointer text-base text-indigo-700"></FaEdit></Link>
                  <button onClick={() => handleDelete(job._id)}>
                    <MdDelete className="cursor-pointer text-base text-red-700"></MdDelete></button></td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;