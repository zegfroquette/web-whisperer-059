import { useEffect } from 'react';

const BookNow = () => {
  useEffect(() => {
    window.location.replace('/booking.html');
  }, []);

  return null;
};

export default BookNow;
