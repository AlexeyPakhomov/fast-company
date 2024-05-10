import { useState, useEffect } from 'react';
import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';
import httpService from '../services/http.service';

const useMockData = () => {
  const statusConsts = {
    idle: 'Not started',
    pending: 'In process',
    successed: 'Ready',
    error: 'Error occured',
  };
  const [status, setStatus] = useState(statusConsts.idle);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  //const sumCount = professions.length + qualities.length + users.length;
  const sumCount = professions.length + qualities.length;

  useEffect(() => {
    updateProgress();
  }, [count]);

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }

    const newProgress = Math.floor((count / sumCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }

    if (newProgress === 100) {
      setStatus(statusConsts.successed);
      setCount(0);
    }
  };

  const initialize = async () => {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof);
        incrementCount();
      }
      for (const quality of qualities) {
        await httpService.put('quality/' + quality._id, quality);
        incrementCount();
      }
      //for (const user of users) {
      //  await httpService.put('user/' + user._id, user);
      //  incrementCount();
      //}
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  };

  return { error, status, progress, initialize };
};

export default useMockData;
