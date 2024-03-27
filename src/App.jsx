import Navigation from "./Components/Navigation"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
    <ToastContainer autoClose = { 2000 } />
    <Navigation />
    </>
  )
}

export default App
