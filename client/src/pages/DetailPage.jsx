import React, { useState,useContext, useEffect,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/loader';
import { LinkCard } from '../components/LinkCard';

const DetailPage = () => {  
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id
  
  const getLink = useCallback(async () => {
    try {
      const fetched=await request(`/api/link/${linkId}`, 'get', null, {
        Authorization:`Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) {
      
    }
  }, [token, linkId, request])
  
  useEffect(() => {
    getLink()
  }, [getLink])
  
  if (loading) {
    return <Loader/>
  }



  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  )
}

export default DetailPage