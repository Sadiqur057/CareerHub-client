export const QuickService = () => {
  const services = [
    {
      "title": "Job Search Assistance",
      "service": "Let our experts assist you in finding the perfect job match tailored to your skills and preferences."
    },
    {
      "title": "Resume Building",
      "service": "Get professional help in crafting a standout resume that highlights your strengths and catches the attention of employers."
    },
    {
      "title": "Interview Preparation",
      "service": "Prepare for your next interview with confidence through mock interviews, tips, and strategies provided by our experienced team."
    },
    {
      "title": "Career Coaching",
      "service": "Receive personalized guidance and advice from our career coaches to help you navigate your career path and achieve your goals."
    },
    {
      "title": "Networking Opportunities",
      "service": "Expand your professional network and connect with industry professionals through our networking events and platforms."
    },
    {
      "title": "Job Market Insights",
      "service": "Stay informed about the latest trends and developments in the job market with our comprehensive market insights and analysis."
    }
  ]
  return (

    <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16 mb-10 lg:mt-6">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">

        <div className="text-center mb-6 md:mb-10 space-y-4 md:space-y-6">
        <h2 className="text-center mb-6 md:mb-8 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
              Featured{' '}
              <span className="inline-block text-deep-purple-accent-400">
                Services
              </span>
            </h2>
          <p className="text-base md:text-lg">
            Unlock your full potential and achieve career success with CareerHub and tailored to your unique goals and aspirations.
          </p>
        </div>

      </div>
      <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
        <div className="space-y-6 sm:px-16">
        {
            services.slice(0,3).map((service, idx) => <div key={idx} className="flex flex-col max-w-md sm:flex-row text-center sm:text-left mx-auto">
              <div className="mb-4 mr-4 self-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-c-primary mx-auto">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h6 className="mb-3 text-xl font-bold leading-5">
                  {service.title}
                </h6>
                <p className="text-sm ">
                  {service.service}
                </p>
              </div>
            </div>)
          }
        </div>
        <div className="space-y-6 sm:px-16 ">
          {
            services.slice(3).map((service, idx) => <div key={idx} className="flex flex-col max-w-md sm:flex-row text-center sm:text-left mx-auto">
              <div className="mb-4 mr-4 self-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-c-primary mx-auto">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h6 className="mb-3 text-xl font-bold leading-5">
                  {service.title}
                </h6>
                <p className="text-sm ">
                  {service.service}
                </p>
              </div>
            </div>)
          }
        </div>

      </div>
    </div>
  );
};