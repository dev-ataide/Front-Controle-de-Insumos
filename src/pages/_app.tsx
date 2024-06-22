import '../../styles/globals.css'
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AuthProvider } from '../contexts/AuthContext'
import { JsonDataProvider } from '../contexts/JsonContext';

function MyApp({ Component, pageProps }: AppProps, { children }) {
  return (
    <JsonDataProvider>

      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>

      </AuthProvider>
    </JsonDataProvider>

  )
}

export default MyApp
