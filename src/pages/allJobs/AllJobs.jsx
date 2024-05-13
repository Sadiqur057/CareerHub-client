import { Link, useLoaderData } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";
import { useState } from "react";
import { Option, Select, Spinner } from "@material-tailwind/react";
import { TfiLayoutColumn3Alt, TfiLayoutColumn2Alt } from "react-icons/tfi";
import { useQuery } from "@tanstack/react-query";



const AllJobs = () => {

  const [displayData, setDisplayData] = useState([])

  // const allJobs = useLoaderData()

  const {isPending, data: allJobs } = useQuery({
    queryKey: ['all-jobs'],
    queryFn: async ()=>{
      const response = await axios.get(`http://localhost:5000/all-jobs`)
      setDisplayData(response.data)
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

  const handleSearch = (e) => {
    console.log("clicked")
    e.preventDefault();
    const keyword = e.target.keyword.value;
    console.log("searched", keyword)
    if(!keyword){
      return setDisplayData(allJobs)
    }
    axios.get(`http://localhost:5000/search/${keyword}`)
      .then(data => {
        setDisplayData(data.data)
      })
  }


  return (
    <div className="w-[90%] mx-auto">

      <form onSubmit={handleSearch}  className="flex justify-end gap-2 my-6">
        <input type="text" placeholder="Search" className="border-c-primary border outline-c-primary  px-4 rounded-xl" name="keyword" />
        <input type="submit" className="py-2 px-4 bg-c-primary rounded-lg text-white font-medium" value="submit" />
      </form>
      <div className="mb-10 overflow-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-100">
            <tr className="text-gray-800">
              <th>Title</th>
              <th>Posting Date</th>
              <th>Application Deadline</th>
              <th>Salary Range</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              displayData.map((job) => <tr key={job._id}>
                <td>{job?.job_title}</td>
                <td>{job?.posting_date}</td>
                <td>{job?.deadline}</td>
                <td>{job?.salary_range}</td>
                <td><Link to={`/job-details/${job._id}`}>
                  <TbListDetails className="cursor-pointer text-c-primary text-xl"></TbListDetails></Link></td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobs;