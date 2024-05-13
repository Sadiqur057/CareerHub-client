
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Option, Select, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import PdfContainer from "./PdfContainer";


const AppliedJobs = () => {
  const [displayData, setDisplayData] = useState([]);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const url = `/my-applied-jobs/${user?.email}`

  const { isPending, data: jobs } = useQuery({
    queryKey: ['applied-jobs'],
    queryFn: async () => {
      const response = await axiosSecure.get(url);
      setDisplayData(response.data)
      return response.data;
    }
  });



  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center ">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }


  const categoryOptions = [
    { label: "All", value: "all" },
    { label: "On Site", value: "on-site" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Part Time", value: "part-time" }
  ];

  const handleCategoryOptions = (value) => {
    if (value === "all") {
      setDisplayData(jobs);
    } else {
      const filteredJobs = jobs.filter(job => {
        return job.job_category === value
      })
      setDisplayData(filteredJobs)
    }
  };


  return (
    <div className="w-[90%] mx-auto my-8">
      <div className="w-fit mx-auto mb-4 md:mb-8 flex justify-center gap-4">
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
        <div className="w-full self-center py-2 px-3 bg-c-primary text-white rounded-lg font-medium">
          <PdfContainer displayData={displayData}></PdfContainer>
        </div>
      </div>
      <div>
        <div className="mb-10 overflow-auto">
          <table className="table">
            <thead className="bg-gray-100">
              <tr className="text-gray-800">
                <th>Title</th>
                <th>Job Type</th>
                <th>Resume Link</th>
              </tr>
            </thead>
            <tbody>
              {
                displayData.map((job) => <tr key={job._id}>
                  <td>{job?.job}</td>
                  <td>{job?.job_category}</td>
                  <td>{job?.resume}</td>
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AppliedJobs;