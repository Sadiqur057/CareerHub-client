import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import AllFoodsCard from '../../components/Foods/AllFoodsCard';
import { useQuery } from "@tanstack/react-query";
import { Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';



const AllFoodsContainer = () => {

  const { isPending, data: allFoods } = useQuery({
    queryKey: ['my-foods'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/all-foods')
      const allData = response.data;
      const sortedData = allData.sort((a, b) => {
        return parseInt(b.food_quantity) - parseInt(a.food_quantity)
      })
      console.log(sortedData)
      return sortedData.splice(0, 6);
    }
  })
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" color="teal" />
      </div>
    );
  }

  return (
    <div>
      <div className='w-[90%] mx-auto pt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          allFoods.map(food => <AllFoodsCard key={food._id} food={food}></AllFoodsCard>)
        }
      </div>
      <div className='flex py-10 justify-center'>
        <Link to='/all-foods'>
          <button className='px-3 py-2 bg-c-primary text-white rounded-lg'>Show All</button>
        </Link>
      </div>
    </div>
  );
}

export default AllFoodsContainer;