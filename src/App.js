import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import SignUp from './components/SignUp';
import FilterTicket from './components/filter/filterTicket';
import NotFound from './components/404';
import Tickets from './components/Tickets';
import Order from './components/Order';
import History from './components/History';
import Wishlist from './components/Wishlist';
import WishlistDetail from './components/WishlistDetail';
import Notifications from './components/Notifications';
import DeleteWishlist from './components/DeleteWishlist';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import FilterBeforeLogin from './components/FilterBeforeLogin';
import AdminTicket from './components/admin/page/AdminTicket';
import AddTickets from './components/admin/comp/AddTickets';
import DetailTickets from './components/admin/comp/DetailTickets';
import EditTickets from './components/admin/comp/EditTickets';
import DetailAirplanes from './components/admin/comp/DetailAirplanes';
import AdminAirplanes from './components/admin/page/AdminAirplanes';
import EditAirplanes from './components/admin/comp/EditAirplanes';
import AdminAirport from './components/admin/page/AdminAirport';
import DetailAirports from './components/admin/comp/DetailAirports';
import EditAirports from './components/admin/comp/EditAirports';
import AdminUser from './components/admin/page/AdminUser';
import DetailUsers from './components/admin/comp/DetailUsers';
import EditUsers from './components/admin/comp/EditUsers';
import AdminOrders from './components/admin/page/AdminOrders';
import IndexAdmin from './components/IndexAdmin';
import AddAirplanes from './components/admin/comp/AddAirplanes';
import AddAirports from './components/admin/comp/AddAirports';
import TicketsBeforeLogin from './components/TicketsBeforeLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/admin/index' element={<IndexAdmin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/filterticket' element={<FilterBeforeLogin/>} />
        <Route path='/filter' element={<FilterTicket />} />
        <Route path='/history-order' element={<History/>} />
        <Route path='/wishlist-order' element={<WishlistDetail/>} />
        <Route path='/wishlist-order/delete/:id' element={<DeleteWishlist/>} />
        <Route path='/notification-order' element={<Notifications/>} />
        <Route path='/filter/wishlist/:id' element={<Wishlist/>} />
        <Route path='/filter/order/:id' element={<Order/>} />
        <Route path='/filterticket/wishlist/:id' element={<Wishlist/>} />
        <Route path='/filterticket/order/:id' element={<Order/>} />
        <Route path='/all-flights' element={<TicketsBeforeLogin />} />
        <Route path='/allflights' element={<Tickets />} />
        <Route path='/all-flights/wishlist/:id' element={<Wishlist />} />
        <Route path='/allflights/wishlist/:id' element={<Wishlist/>} />
        <Route path='/wishlist-order/order/:id' element={<Order/>} />
        <Route path='/all-flights/order/:id' element={<Order />} />
        <Route path='/allflights/order/:id' element={<Order/>} />
        <Route path='/user/:id' element={<UserProfile />} />
        <Route path='/admin/index/user/:id' element={<UserProfile />} />
        <Route path='/allflights/user/:id' element={<UserProfile />} />
        <Route path='/notification-order/user/:id' element={<UserProfile />} />
        <Route path='/wishlist-order/user/:id' element={<UserProfile />} />
        <Route path='/history-order/user/:id' element={<UserProfile />} />
        <Route path='/filter/user/:id' element={<UserProfile />} />
        <Route path='/user/:id/edit' element={<EditProfile />} />
        <Route path='/admin/index/user/:id/edit' element={<EditProfile />} />
        <Route path='/admin/index/user/:id/user/:id' element={<EditProfile />} />
        <Route path='allflights/user/:id/edit' element={<EditProfile />} />
        <Route path='wishlist-order/user/:id/edit' element={<EditProfile />} />
        <Route path='notification-order/user/:id/edit' element={<EditProfile />} />
        <Route path='history-order/user/:id/edit' element={<EditProfile />} />
        <Route path='/filter/user/:id/edit' element={<EditProfile />} />
        <Route path='/admin/' element={<AdminTicket />} />
        <Route path='/admin/add-ticket' element={<AddTickets />} />
        <Route path='/admin/detail-ticket/:id' element={<DetailTickets />} />
        <Route path='/admin/edit-ticket/:id' element={<EditTickets />} />
        <Route path='/admin/airplane' element={<AdminAirplanes />} />
        <Route path='/admin/add-airplane' element={<AddAirplanes />} />
        <Route path='/admin/detail-airplane/:id' element={<DetailAirplanes />} />
        <Route path='/admin/edit-airplane/:id' element={<EditAirplanes />} />
        <Route path='/admin/airport' element={<AdminAirport />} />
        <Route path='/admin/add-airport' element={<AddAirports />} />
        <Route path='/admin/detail-airport/:id' element={<DetailAirports />} />
        <Route path='/admin/edit-airport/:id' element={<EditAirports />} />
        <Route path='/admin/user' element={<AdminUser/>} />
        <Route path='/admin/detail-user/:id' element={<DetailUsers />} />
        <Route path='/admin/edit-user/:id' element={<EditUsers />} />
        <Route path='/admin/orders' element={<AdminOrders />} />
       
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
