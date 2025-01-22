import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
// components//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/master/dashboard" />;
  }

  if (!isInitialized) {
    return <Loader />;
  }

  return <> {children} </>;
}
