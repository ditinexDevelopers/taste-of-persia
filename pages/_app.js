import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { Loader } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { loadCartFromLocal, loadSessionFromLocal, logout } from 'redux/action';
import Config from 'config';
import { useRouter } from 'next/router';
import firebaseCloudMessaging from 'hooks/firebase';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WrappingContainer pageProps={pageProps} Component={Component} />
    </Provider>
  );
}

export default MyApp;

const WrappingContainer = ({ Component, pageProps }) => {
  const { isLoading, session } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    firebaseCloudMessaging.init().then(() => {
      firebaseCloudMessaging.pushListener();
    });
  }, []);

  useEffect(() => {
    // Handle logout action on unauthorized api call
    if (Config.UNAUTHORIZED_EXCEPTION == true) {
      dispatch(logout());
      Config.UNAUTHORIZED_EXCEPTION = false;
      router.replace('/');
    }
  }, [Config.UNAUTHORIZED_EXCEPTION]);

  useEffect(() => {
    // This use Effect is only used to load localstorage data into redux on page reload.
    dispatch(
      loadCartFromLocal(
        localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
      )
    );

    dispatch(
      loadSessionFromLocal(
        localStorage.getItem('userSession') ? JSON.parse(localStorage.getItem('userSession')) : null
      )
    );
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {/* <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      /> */}
      <Component {...pageProps} />
    </>
  );
};
