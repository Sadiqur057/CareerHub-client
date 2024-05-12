import axios from "axios";
import { useState } from "react";
import { Option, Select, Spinner } from "@material-tailwind/react";
import { TfiLayoutColumn3Alt, TfiLayoutColumn2Alt } from "react-icons/tfi";
import AllFoodsCard from "../../components/Foods/AllFoodsCard";
import { useQuery } from "@tanstack/react-query";


const AllFoods = () => {
  
  const [displayData, setDisplayData] = useState([])

  const [columns, setColumns] = useState(3);


  const {isPending, data: allFoods } = useQuery({
    queryKey: ['my-foods'],
    queryFn: async ()=>{
      const response = await axios.get(`http://localhost:5000/all-foods`)
      setDisplayData(response.data)
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

  const handleColumnChange = (numColumns) => {
    setColumns(numColumns);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    console.log("searched", keyword)
    if(!keyword){
      return setDisplayData(allFoods)
    }
    axios.get(`http://localhost:5000/search/${keyword}`)
      .then(data => {
        setDisplayData(data.data)
      })
  }

  const travelTimeOptions = [
    {
      label: "Sort By Expiry Date",
      value: "expiry",
    },
    {
      label: "Sort By Added Date",
      value: "posting",
    },
  ];

  const handleSortOptions = (value) => {
    if (value === "expiry") {
      const newSortedDate = [...allFoods].sort((a, b) => {
        return parseInt(a.expired_date) - parseInt(b.expired_date);
      });
      setDisplayData(newSortedDate);
    } else if (value === "posting") {
      const newSortedDate = [...allFoods].sort((a, b) => {
        return parseInt(a.added_date) - parseInt(b.added_date);
      });
      setDisplayData(newSortedDate);
    }
  };

  console.log(allFoods)
  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex flex-col gap-4 md:flex-row justify-between ">

        <div className="w-fit">
          <Select label="Sort By" color="orange" onChange={handleSortOptions}>
            {travelTimeOptions.map((travelTimeOption) => (
              <Option
                key={travelTimeOption.value}
                value={travelTimeOption.value}
              >
                {travelTimeOption.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="hidden lg:flex gap-4 w-fit items-center">
          <p>Change Layout:</p>
          <button className="text-xl border-2 p-2 text-c-primary border-c-primary rounded-md" onClick={() => handleColumnChange(2)}><TfiLayoutColumn2Alt></TfiLayoutColumn2Alt></button>
          <button className="text-xl border-2 p-2 text-c-primary border-c-primary rounded-md" onClick={() => handleColumnChange(3)}><TfiLayoutColumn3Alt></TfiLayoutColumn3Alt></button>
        </div>
        <div className="w-fit">
          <form onSubmit={handleSearch} className="flex justify-end gap-2">
            <input type="text" placeholder="Search" className="border-c-primary border outline-c-primary  px-4 rounded-xl" name="keyword" />
            <input type="submit" className="py-2 px-4 bg-c-primary rounded-lg text-white font-medium" value="submit" />
          </form>
        </div>
      </div>
      <div className={`py-16 grid md:grid-cols-2 lg:grid-cols-${columns} gap-6 md:gap-8`}>
        {
          displayData.map(food => <AllFoodsCard key={food._id} food={food}></AllFoodsCard>)
        }
      </div>
    </div>
  );
};

export default AllFoods;