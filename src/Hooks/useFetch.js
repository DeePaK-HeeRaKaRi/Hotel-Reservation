import { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
const useFetch = (url) => {
  // console.log('url',url)
  // setData
  const [data,setData] = useState([]);

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  useEffect(() => {
    console.log('useEffect');
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(url);
        // console.log('res',res)
        setData(res.data);
      }catch(err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  },[url]);
   
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    }catch(err) {
      setError(err);
    }
    setLoading(false);
  };
    
  return { data,error,loading,reFetch };
};

export default useFetch;
