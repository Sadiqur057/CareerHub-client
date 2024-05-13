// const axios = require('axios');

import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";



const JobByCategoryCard = ({ job }) => {
  const { applicants_number, deadline, job_title, posted_by, posting_date, salary_range, _id } = job
  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col gap-3">
          <div >
            <div className="flex gap-6 mb-3 md:mb-2 justify-between md:justify-start">
              <h2 className="text-gray-900 text-xl font-semibold">{job_title}</h2>
              <div className="px-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0 py-1 self-center">
                active
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p>Posted by <span className="font-medium">{posted_by}</span></p>
              <p className="leading-relaxed text-base flex items-center gap-2"><CiCalendarDate className="text-2xl"></CiCalendarDate>{posting_date}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <p className="border border-c-primary text-c-primary font-medium px-3 rounded-xl py-[6px] ">{salary_range}</p>
              <p className="border border-indigo-500 text-indigo-500 font-medium px-3 rounded-xl py-[6px] flex items-center gap-[6px]"><IoPersonSharp></IoPersonSharp> {applicants_number} Applied</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <p className="md:text-lg font-medium">Application deadline: <span className="font-medium">{deadline}</span></p>
              <div className="flex justify-end w-full">
                <Link to={`/job-details/${_id}`}>
                  <button className="text-white bg-c-primary hover:bg-c-hover px-4 py-2 rounded-xl">View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobByCategoryCard;