import { Carousel } from "@material-tailwind/react";
import clientImg1 from "../../assets/images/clients/client-1.png";
import clientImg2 from "../../assets/images/clients/client-2.png";
import clientImg3 from "../../assets/images/clients/client-3.png";
import clientImg4 from "../../assets/images/clients/client-4.png";
import clientImg5 from "../../assets/images/clients/client-5.png";

const Testimonials = () => {
  const reviews = [{
    "clientName": "John Smith",
    "position": "Software Engineer",
    "review": "CareerHub helped me find the perfect remote job in software development. The platform is easy to use, and the job listings are top-notch! I particularly appreciated the filtering options, which allowed me to narrow down my search to exactly what I was looking for.",
    "img": clientImg2
  },
  {
    "clientName": "Emily Johnson",
    "position": "Marketing Specialist",
    "review": "I found my dream job as a marketing specialist through CareerHub. The process was smooth, and I appreciate the variety of job options available. The communication with employers was excellent, and I felt supported throughout the application process.",
    "img": clientImg1
  },
  {
    "clientName": "Michael Chen",
    "position": "Data Analyst",
    "review": "CareerHub is amazing! I was able to secure a hybrid job as a data analyst, allowing me to balance my work and personal life effectively. The platform's recommendation system matched me with the perfect job, and the interview preparation resources were incredibly helpful.",
    "img": clientImg3
  },
  {
    "clientName": "Sarah Davis",
    "position": "Software Developr",
    "review": "CareerHub exceeded my expectations! I quickly found a part-time customer service job that fits perfectly with my schedule. Highly recommended! The job alerts feature kept me updated on new opportunities, and the support team was responsive to my inquiries.",
    "img": clientImg5
  },
  {
    "clientName": "David Lee",
    "position": "Project Manager",
    "review": "I'm impressed with CareerHub's user-friendly interface and the quality of job listings. Thanks to CareerHub, I landed a great on-site job as a project manager. The interview tips provided by the platform helped me ace my interviews, and I'm grateful for the career guidance I received.",
    "img": clientImg4
  }]


  return (
    <div className='bg-cool'>
      <div className='py-10 md:py-20 lg:grid lg:grid-cols-12 items-center w-[90%] mx-auto gap-10'>
        <div className='col-span-4 text-center w-full'>
          <h2 className=" mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-10">
            Success Stories
            <br className="hidden md:block " />
            Straight from{' '}
            <span className="inline-block text-deep-purple-accent-400">
              Our Clients!
            </span>
          </h2>
          <p className='text-white pb-10'>Listen to the experiences of those who found their dream jobs and
            success through our services..</p> </div>
        <Carousel
          autoplay
          autoplayDelay={3000}
          loop

          className="rounded-xl col-span-8"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2 ">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >

          {reviews.map((data, idx) => (

            <div key={idx}
              className="rounded-md  text-center md:text-left">
              <div className="flex justify-center">
                <div className="w-full">
                  <div
                    className="md:m-4 block rounded-lg bg-white px-4 py-6 my-5 md:p-10 lg:p-10 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">

                    <div className="md:flex md:flex-row gap-2 md:gap-6">
                      <div
                        className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
                        <img
                          src={data.img}
                          className="w-full object-cover object-center rounded-full shadow-md dark:shadow-black/30"
                          alt="woman avatar" />
                      </div>
                      <div className="md:ms-6">
                        <p
                          className="mb-6 font-light text-neutral-500 dark:text-neutral-300 text-sm md:text-base">
                          {data.review.slice(0,100)}
                        </p>
                        <p
                          className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                          {data.clientName}
                        </p>
                        <p
                          className="mb-0 font-semibold text-neutral-500 dark:text-neutral-400">
                          {data.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;