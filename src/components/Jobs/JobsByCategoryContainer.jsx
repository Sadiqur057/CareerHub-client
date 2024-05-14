import PropTypes from 'prop-types';
const JobsCategoryContainer = ({children}) => {
  
  return (
    <div className="mt-6 md:mt-10 grid grid-cols-1 gap-3 lg:gap-4 md:grid-cols-2 ">
      {children}
    </div>
  );
  
};
JobsCategoryContainer.propTypes = {
  children: PropTypes.node
};


export default JobsCategoryContainer;
