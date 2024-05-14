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



  const { isPending } = useQuery({
    queryKey: ['applied-jobs'],
    queryFn: async () => {
      const response = await axios.get('https://career-hub-server-one.vercel.app/all-jobs'); 
      const allJobs = response.data;
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


  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="orange" />
      </div>
    );
  }
  return (
    <div className='w-[90%] mx-auto py-16 md:py-20'>
      <div>
      <h2 className="text-center mb-6 md:mb-10 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
              Featured{' '}
              <span className="inline-block text-deep-purple-accent-400">
                Jobs
              </span>
            </h2>
      </div>
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