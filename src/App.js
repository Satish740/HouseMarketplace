import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import Sign from './pages/Sign'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listings from './pages/Listings';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';

function App() {
  return (
 <>
 <Router>

  <Routes>
    <Route path="/" element={<Explore />} />
    <Route path="/offers" element={<Offers />} />
    <Route path="/category/:categoryName" element={<Category />} />
    
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/profile" element={<PrivateRoute/>} >  
    <Route path="/profile" element={<Profile/>} /> 
    </Route>
    <Route path="/sign-in" element={<Sign />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/create-listing" element={<CreateListing />} />
    <Route path="/category/:categoryName/:listingId" element={<Listings />} />
    <Route path="/contact/:landlordId" element={<Contact />} />
    <Route path="/edit-listing/:listingId" element={<EditListing />} />
  </Routes>

<Navbar/>
 </Router>
 

 <ToastContainer/>

 </>
    )
}

export default App;
