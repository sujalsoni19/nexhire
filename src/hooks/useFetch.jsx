import { useSession } from '@clerk/clerk-react';
import React, { useState } from 'react'

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
  if (!session) return;

  setLoading(true);
  setError(null);

  try {
    const token = await session.getToken({ template: "supabase" });
    const data = await cb(token, options, ...args);
    setData(data);
  } catch (err) {
    setError(err);
    setData(undefined);
  } finally {
    setLoading(false);
  }
};


  return { fn, data, loading, error };
};

export default useFetch;
