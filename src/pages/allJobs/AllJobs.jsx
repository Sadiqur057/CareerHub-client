import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";



const AllJobs = () => {

  const [displayData, setDisplayData] = useState([])

  const {isPending, data: allJobs } = useQuery({
    queryKey: ['all-jobs'],
    queryFn: async ()=>{
      const response = await axios.get(`https://career-hub-server-one.vercel.app/all-jobs`)
      setDisplayData(response.data)
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

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    if(!keyword){
      return setDisplayData(allJobs)
    }
    axios.get(`https://career-hub-server-one.vercel.app/search/${keyword}`)
      .then(data => {
        setDisplayData(data.data)
      })
  }


  return (
    <div className="w-[90%] mx-auto">
      <Helmet>
        <title>CH | All Jobs</title>
      </Helmet>
      <form onSubmit={handleSearch}  className="flex justify-end gap-2 my-6 ">
        <input type="text" placeholder="Search" className="border-c-primary border outline-c-primary  px-4 rounded-xl w-[180px] md:w-[230px]" name="keyword" />
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