import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import JobByCategory from "./JobByCategory";
import { JobFind } from "./JobFind";
import { QuickService } from "./QuickService";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CH | Home</title>
      </Helmet>
      <Banner></Banner> 
      <JobByCategory></JobByCategory>
      <JobFind></JobFind>
      <Testimonials></Testimonials>
      <QuickService></QuickService>
    </div>
  );
};

export default Home;