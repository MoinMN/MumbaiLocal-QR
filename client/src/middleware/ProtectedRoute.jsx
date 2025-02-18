import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../utility/AuthVerify';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import Unauthorized from '../components/Unauthorized';

const ProtectedRoute = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isAuthenticated()
      .then(res => {
        setIsAuthed(res);
      })
      .catch(err => {
        setIsAuthed(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading
        ? <Loading />
        : isAuthed
          ? <Outlet />
          : <Unauthorized />
      }
    </>
  )
}

export default ProtectedRoute
