import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: 'https://career-hub-server-one.vercel.app',
  withCredentials: true
})
const useAxiosSecure = () => {
  const {logOutUser} = useAuth()
  const navigate = useNavigate();
  useEffect(()=>{
    axiosSecure.interceptors.response.use(res=>{
      return res;
    }, error=>{
      if(error.response.status === 401 || error.response.status === 403){
        logOutUser()
        .then(()=>{
          navigate('/login')
        })
        .catch((error)=> console.log(error))

      }
    })
  },[logOutUser,navigate])
  return axiosSecure;
};

export default useAxiosSecure;