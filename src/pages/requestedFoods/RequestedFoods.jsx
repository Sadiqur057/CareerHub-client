
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

const RequestedFoods = () => {
  
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const url = `/my-requested-foods/${user?.email}`

  const {isPending, data: requestedFoods } = useQuery({
    queryKey: ['my-foods'],
    queryFn: async ()=>{
      const response = await axiosSecure.get(url)
      return response.data
    }
  })
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }

  // useEffect(() => {
    
  //   // axios.get(`http://localhost:5000/my-requested-foods/${user?.email}`, { withCredentials: true })
  //   axiosSecure.get(url)
  //     .then(data => {
  //       setRequestedFoods(data.data)
  //       setUpdate(false)
  //     })
  // }, [url, axiosSecure, update])

  return (
    <div className="my-10 overflow-auto w-[90%] mx-auto">
      <table className="table">
        <thead className="bg-gray-100">
          <tr className="text-gray-800">
            <th>Donator Name</th>
            <th>Pickup From</th>
            <th>Expired Date</th>
            <th>Requested Date</th>
          </tr>
        </thead>
        <tbody>
          {
            requestedFoods.map((food) => <tr key={food._id}>
              <td>{food?.donator}</td>
              <td>{food?.pickup_location}</td>
              <td>{food?.expiry}</td>
              <td>{food?.request_date}</td>
            </tr>)
          }

        </tbody>
      </table>
    </div>
  );
};

export default RequestedFoods;