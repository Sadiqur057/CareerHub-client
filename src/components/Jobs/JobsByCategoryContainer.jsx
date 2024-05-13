const JobsCategoryContainer = ({children}) => {
  
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 lg:gap-4 md:grid-cols-2 ">
      {children}
    </div>
  );
};

export default JobsCategoryContainer;