import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import '../styles/HorizontalLayout.css';
import ShoppingCart from '../components/ShoppingCart';

function Cart() {
  return (
    <div className="homepage-container">
      <NavbarComp />
      <div className="content-container">
        <Sidebar />
        <ShoppingCart />
      </div>
    </div>
  );
}

export default Cart;
