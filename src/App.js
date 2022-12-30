import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import SignUp from './components/SignUp';
import FilterTicket from './components/filter/filterTicket';
import NotFound from './components/404';
import Tickets from './components/Tickets';
import Admin from './components/admin/page/Admin';
import EditTickets from './components/admin/comp/EditTickets';
import DetailTickets from './components/admin/comp/DetailTickets';
import AddTickets from './components/admin/comp/AddTickets';
import Order from './components/Order';
import History from './components/History';
import Wishlist from './components/Wishlist';
import WishlistDetail from './components/WishlistDetail';
import Notifications from './components/Notifications';
import DeleteWishlist from './components/DeleteWishlist';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/filter' element={<FilterTicket />} />
        <Route path='/history-order' element={<History/>} />
        <Route path='/wishlist-order' element={<WishlistDetail/>} />
        <Route path='/wishlist-order/delete/:id' element={<DeleteWishlist/>} />
        <Route path='/notification-order' element={<Notifications/>} />
        <Route path='/filter/wishlist/:id' element={<Wishlist/>} />
        <Route path='/filter/order/:id' element={<Order/>} />
        <Route path='/allflights' element={<Tickets />} />
        <Route path='/allflights/wishlist/:id' element={<Wishlist/>} />
        <Route path='/allflights/order/:id' element={<Order/>} />
        <Route path='/user/:id' element={<UserProfile />} />
        <Route path='/allflights/user/:id' element={<UserProfile />} />
        <Route path='/notification-order/user/:id' element={<UserProfile />} />
        <Route path='/wishlist-order/user/:id' element={<UserProfile />} />
        <Route path='/history-order/user/:id' element={<UserProfile />} />
        <Route path='/user/:id/edit' element={<EditProfile />} />
        <Route path='allflights/user/:id/edit' element={<EditProfile />} />
        <Route path='wishlist-order/user/:id/edit' element={<EditProfile />} />
        <Route path='notification-order/user/:id/edit' element={<EditProfile />} />
        <Route path='history-order/user/:id/edit' element={<EditProfile />} />
        <Route path='/id/admin' element={<Admin/>} />
        <Route path='/id/admin/add' element={<AddTickets />} />
        <Route path='/id/admin/detail/:id' element={<DetailTickets/>} />
        <Route path='/id/admin/edit/:id' element={<EditTickets/>} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
