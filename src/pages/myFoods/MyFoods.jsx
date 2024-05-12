import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'


import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const MyFoods = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { isPending, data: myFoods, refetch } = useQuery({
    queryKey: ['my-foods'],
    queryFn: async () => {
      const response = await axiosSecure.get(`http://localhost:5000/my-foods/${user?.email}`)
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
  //   axios.get(`http://localhost:5000/my-foods/${user?.email}`)
  //     .then(data => {
  //       console.log(data.data)
  //       setMyFoods(data.data)
  //       setUpdate(false)
  //     })
  // }, [user?.email, update])


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/delete-food/${id}`)
          .then(data => {
            console.log(data.data)
            if (data.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }

          })

      }
    });

  }
  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="mb-10 overflow-auto">
        <table className="table">
          <thead className="bg-gray-100">
            <tr className="text-gray-800">
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Expired at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              myFoods.map((food) => <tr key={food._id}>
                <td>{food?.food_name}</td>
                <td>{food?.food_quantity}</td>
                <td>{food?.expired_date}</td>
                <td className="flex items-center gap-4">

                  <Link to={`/edit-food/${food._id}`}>
                    <FaEdit className="cursor-pointer text-base text-indigo-700"></FaEdit>
                  </Link>

                  <button onClick={() => handleDelete(food._id)}>
                    <MdDelete className="cursor-pointer text-base text-red-700"></MdDelete></button></td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoods;