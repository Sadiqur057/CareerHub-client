import axios from 'axios';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobsCategoryContainer from '../../components/Jobs/JobsByCategoryContainer';
import JobByCategoryCard from '../../components/Jobs/JobByCategoryCard';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@material-tailwind/react';


const JobByCategory = () => {
  const [remoteJobs, setRemoteJobs] = useState([])
  const [onsiteJobs, setOnsiteJobs] = useState([])
  const [partTimeJobs, setPartTimeJobs] = useState([])
  const [hybridJobs, setHybridJobs] = useState([])



  const { isPending, data: jobs } = useQuery({
    queryKey: ['applied-jobs'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/all-jobs'); 
      const allJobs = response.data;
      console.log(allJobs)
      const categorizedJobs = allJobs.reduce((acc, job) => {
        const jobType = job['job_type'];
        if (!acc[jobType]) {
          acc[jobType] = [];
        }
        acc[jobType].push(job);
        return acc;
      }, {});
      setRemoteJobs(categorizedJobs['remote'] || []);
      setOnsiteJobs(categorizedJobs['on-site'] || []);
      setPartTimeJobs(categorizedJobs['part-time'] || []);
      setHybridJobs(categorizedJobs['hybrid'] || []); 
      return response.data;
    }
  });

  // useEffect(() => {
  //   axios.get('http://localhost:5000/all-jobs')
  //     .then(res => {
  //       const allJobs = res.data;
  //       console.log(allJobs)
  //       const categorizedJobs = allJobs.reduce((acc, job) => {
  //         const jobType = job['job_type'];
  //         if (!acc[jobType]) {
  //           acc[jobType] = [];
  //         }
  //         acc[jobType].push(job);
  //         return acc;
  //       }, {});
  //       setRemoteJobs(categorizedJobs['remote'] || []);
  //       setOnsiteJobs(categorizedJobs['on-site'] || []);
  //       setPartTimeJobs(categorizedJobs['part-time'] || []);
  //       setHybridJobs(categorizedJobs['hybrid'] || []);
  //     })
  // }, [])
  console.log(jobs)

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }
  return (
    <div className='w-[90%] mx-auto py-16'>
      <Tabs>
        <TabList>
          <Tab>On-Site Job</Tab>
          <Tab>Remote Job</Tab>
          <Tab>Hybrid Job</Tab>
          <Tab>Part-Time Job</Tab>
        </TabList>

        <TabPanel>
          <JobsCategoryContainer
          >
            {onsiteJobs.map(job => <JobByCategoryCard key={job._id} job={job}></JobByCategoryCard>)}
          </JobsCategoryContainer>
        </TabPanel>
        <TabPanel>
          <JobsCategoryContainer
          >
            {remoteJobs.map(job => <JobByCategoryCard key={job._id} job={job}></JobByCategoryCard>)}
          </JobsCategoryContainer>
        </TabPanel>
        <TabPanel>
          <JobsCategoryContainer
          >
            {hybridJobs.map(job => <JobByCategoryCard key={job._id} job={job}></JobByCategoryCard>)}
          </JobsCategoryContainer>
        </TabPanel>
        <TabPanel>
          <JobsCategoryContainer
          >
            {partTimeJobs.map(job => <JobByCategoryCard key={job._id} job={job}></JobByCategoryCard>)}
          </JobsCategoryContainer>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default JobByCategory;