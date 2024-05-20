import apiPool from 'api';
import moment from 'moment';
import Image from 'next/image';
import Logo from 'public/images/logo.png';
import { useEffect, useState } from 'react';
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineFacebook,
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineTwitter,
  AiOutlineYoutube
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'redux/action';

const Component = () => {
  const [timings, setTimings] = useState(null);
  const dispatch = useDispatch();
  const fetchTimings = () => {
    dispatch(loadingStart());
    apiPool
      .GetResturantTimes()
      .then((response) => {
        if (response) {
          setTimings(response.value);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  useEffect(() => {
    fetchTimings();
  }, []);
  return (
    <footer className="text-center lg:text-left bg-primary text-white">
      <div className="mx-15 py-10 text-center md:text-left">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-2">
          <div className="mb-5 lg:mb-0">
            <img src="/images/logo.png" alt="logo" className="h-24 w-48" />
            <div className="flex items-center gap-8 mt-4">
              <AiOutlineTwitter className="text-lightgray text-2xl hover:text-primarylight transition cursor-pointer" />
              <AiOutlineFacebook className="text-lightgray text-2xl hover:text-primarylight transition cursor-pointer" />
              <AiOutlineInstagram className="text-lightgray text-2xl hover:text-primarylight transition cursor-pointer" />
              <AiOutlineYoutube className="text-lightgray text-2xl hover:text-primarylight transition cursor-pointer" />
            </div>
          </div>

          <div className="mb-5 lg:mb-0">
            <h6 className="tracking-wider uppercase font-semibold mb-4 flex justify-center md:justify-start text-primarylight">
              Address
            </h6>
            <p className="text-lightgray flex items-center justify-center md:justify-start mb-4">
              <AiOutlineHome className="text-lightgray text-lg mr-3.5" />
              10386 W Ustick Rd
              <br />
              Boise, ID 83704
            </p>
          </div>
          <div className="mb-5 md:mb-0">
            <h6 className="tracking-wider uppercase font-semibold mb-4 flex justify-center md:justify-start text-primarylight">
              Contact Us
            </h6>
            <p className="text-lightgray flex items-center justify-center md:justify-start mb-4">
              <AiOutlineMail className="text-lightgray text-lg mr-3.5" />
              tasteofpersiallc@gmail.com
            </p>
            <p className="text-lightgray flex items-center justify-center md:justify-start mb-4">
              <AiOutlinePhone className="text-lightgray text-lg mr-3.5" />
              208-375-8312
            </p>
          </div>
          <div className="">
            <h6 className="tracking-wider uppercase font-semibold mb-4 flex justify-center md:justify-start text-primarylight">
              Opening Hours
            </h6>
            <p className="text-lightgray flex items-center justify-center md:justify-start mb-4">
              <AiOutlineClose className="text-lightgray text-lg mr-3.5" />
              Monday: Closed
            </p>

            <p className="text-lightgray flex items-center justify-center md:justify-start mb-4">
              <AiOutlineCheck className="text-lightgray text-lg mr-3.5" />
              Tue - Fri: {moment(timings?.['tue-fri']?.opens, 'HH:mm').format('h:mm A')}
              {' - '}
              {moment(timings?.['tue-fri']?.closed, 'HH:mm').format('h:mm A')}
            </p>
            <p className="text-lightgray flex items-center justify-center md:justify-start mb-4">
              <AiOutlineCheck className="text-lightgray text-lg mr-3.5" />
              Sat - Sun: {moment(timings?.['sat-sun']?.opens, 'HH:mm').format('h:mm A')}
              {' - '}
              {moment(timings?.['sat-sun']?.closed, 'HH:mm').format('h:mm A')}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-double border-primarylight w-5/6 m-auto" />
      <div className="text-center p-6 bg-primary text-xs">
        <span>Designed &amp; Developed by </span>
        <a
          className="tracking-wide text-primarylight font-semibold px-2"
          target="_blank"
          rel="noreferrer"
          href="https://www.ditinex.com/"
        >
          Ditinex
        </a>
        <span>© {new Date().getFullYear()} - All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Component;
