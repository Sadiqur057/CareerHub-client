import { motion } from "framer-motion"

const Banner = () => {
  return (
    <div className="hero bg-banner">
      
      <div className="hero-overlay bg-opacity-70"></div>
      <motion.div animate={{ y: 0, scale:1 }} initial ={{scale: 0, y:-100}} transition={{ duration: 0.5 }} className="hero-content text-center text-neutral-content">
        <div className="py-14 md:py-20 lg:py-32">
          <h1 className="mb-5 text-3xl md:text-5xl font-bold">Your Job, Your Way</h1>
          <p className="mb-5 max-w-xl lg:text-lg">Find the job thats just right for you on our website! Whether you like working from home, being at an office, a mix of both, or just need part-time hours, we have got options for you. Start your search now and get closer to your dream job</p>
          <button className="btn bg-c-primary border-none text-white">Get Started</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;