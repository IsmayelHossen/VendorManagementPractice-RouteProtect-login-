
/**
 * App Header
 */

 import React from 'react';
 import { withRouter } from 'react-router-dom';
 import { Link } from 'react-router-dom';
 import 'font-awesome/css/font-awesome.min.css';

 import '../../assets/css/font-awesome.min.css';
 import '../../assets/css/line-awesome.min.css';
 
 import 'bootstrap/dist/css/bootstrap.min.css';
 import "../../assets/css/bootstrap.min.css";
 import '../../assets/css/select2.min.css';
 import '../../assets/js/app';
 import "../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
 import "../../assets/css/bootstrap-datetimepicker.min.css";
 import '../../assets/css/style.css';
 import { useLocation } from 'react-router-dom';

 const Sidebar = () => {

  const location = useLocation();
  let pathname = location.pathname;

  return (
    <>
    {/* for login and signup page conditions are given here */}
    {pathname!='/vendor/login' && pathname!='/vendor/signup' &&(
     
  
      <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className={pathname.includes('/') ?"active" :""}> 
              <Link to = "/vendor/add"><i className="la la-home" /> <span> Dashboard</span></Link>
            </li>
                {/* add Vendor */}
                <li className="submenu text-start">
              <a href="#"><i className="la la-gift" /> <span> Vendor</span> <span className="menu-arrow" /></a>
              <ul style={{display: 'none'}}>
              <li>
                  <Link className={pathname.includes('/vendor/add') ?"active" :""} to="/vendor/add">
                  Add  Vendor
                  </Link>
                </li>
               
              </ul>
            </li>
            {/* add product */}
            <li className="submenu text-start">
              <a href="#"><i className="fa fa-cart-plus " /> <span> Product</span> <span className="menu-arrow" /></a>
              <ul style={{display: 'none'}}>
              
                <li>
                  <Link className={pathname.includes('/vendor/product/status') ?"active" :""} to="/vendor/product/status">
                   Add Product 
                  </Link>
                </li>
                <li>
                  <Link className={pathname.includes('/vendor/product/order') ?"active" :""} to="/vendor/product/order">
                  Product Ordered 
                  </Link>
                </li>
                <li>
                  <Link className={pathname.includes('/vendor/product/completion') ?"active" :""} to="/vendor/product/completion">
                  Product Completion
                  </Link>
                </li>
               

               
              </ul>
            </li>
            

            {/* add service */}
            <li className="submenu text-start">
              <a href="#"><i className="la la-gift" /> <span> Service</span> <span className="menu-arrow" /></a>
              <ul style={{display: 'none'}}>
              
                
                <li>
                  <Link className={pathname.includes('/vendor/service/status') ?"active" :""} to="/vendor/service/status">
                   Add Service 
                  </Link>
                </li>
                <li>
                  <Link className={pathname.includes('/vendor/service/order') ?"active" :""} to="/vendor/service/order">
                    Service Ordered
                  </Link>
                </li>
                <li>
                  <Link className={pathname.includes('/vendor/service/completion') ?"active" :""} to="/vendor/service/completion">
                    Service Completion
                  </Link>
                </li>
               
               

               
              </ul>
            </li>
            
        
            
          </ul>
        </div>
      </div>
    </div>
      )}
    </>
    );
 
}

export default Sidebar;