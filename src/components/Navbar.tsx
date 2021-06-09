import React, {  useState } from 'react';
import { FaAlignRight, FaRegCalendarMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, Button, DialogContent } from '@material-ui/core';
import axios from 'axios';
import { setUserSession,getUser,getAppointment, setAppointmentDetails  } from '../Utils/Common';
import {  removeUserSession } from '../Utils/Common';
 import {useSelector} from 'react-redux';
function Navbar(props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [isLog, setLog] = useState(false);
    
    
    const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const phone=useFormInput('');
  const [error, setError] = useState(null);
  const bookinghistoryOpen = () => {
    setIsBooking(true);

  }
 // handle button click of login form
const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(' http://localhost:8083/users/signin', { username: username.value, password: password.value }).
    then(response => {
   
       if(response.status=== 200){
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
     
      handleClose();
    setLog(true);
    }
       
    }).catch(error => {
      setLoading(false);
     
       
    });
  }


    const handleClose = () => {
        setIsLogin(false);
       

    }
    const handleBookingClose = () => {
        var newLine = "\r\n"
       setIsBooking(false);
      
       alert("_id :" +getAppointment()._id+newLine+"name:" +getAppointment().name+newLine+
       "email:" +getAppointment().email+newLine+"phone:" + getAppointment().phone+newLine+"slots:"
       +getAppointment().slots);
    }

    const handleOpen = () => {
        setIsLogin(true);
        
      
    }
    
    const handleToggle = () => {
        setIsOpen(true);
    }
    const handleBooking = () => { 
        axios.get(' http://localhost:8083/api/appointments?phone='+phone.value).
    then(response => {
    
        console.log(response.data);

     if(response.status=== 200){
        setLoading(false);
        setAppointmentDetails(response.data);

        handleBookingClose();
       
       
         
      }
    
    
       
    }) 
       // handleBookingClose();
    }
 

    return (
        <>
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">

                        <Link to="/">
                            <h4>Play Fit</h4>
                        </Link>
                        <button type="button" className="nav-btn" onClick={handleToggle}>
                            <FaAlignRight className="nav-icon" />
                        </button>
                    </div>
                    <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/rooms">Courts Available</Link></li>
                        <li><Link to="/rooms">Partner with Us</Link></li>
                    </ul>
                    <input type="button" style={{backgroundColor:'#00a1ff',border:'none',color:'white',padding:'8px 22px',margin:'4px',cursor:'pointer',borderRadius:'30px'}} value= 'Booking History' onClick={bookinghistoryOpen} />
                    {isBooking && <Dialog onClose={handleBookingClose} open={isBooking}>
                <DialogTitle id="simple-dialog-title"></DialogTitle>
                <DialogContent>
                  
                    <div className="modal-body">
                    
                        <form>
                          <h3>Booking History </h3>
                            
                            <div className="form-group">
                                <label> Mobile Number</label>
                                <input type="text" {...phone}  className="form-control" placeholder="Enter Mobile Number" />
                            </div>
                            
                             <input type="button" value='Submit'onClick={()=>handleBooking()}   />
                            
                        </form>
                    </div>
                </DialogContent>
            </Dialog>}
        
                    <ul className="nav nav-links navbar-nav navbar-right" style={{ position: 'absolute', top: '15px', right: '15px' }}>
                        <li>{getUser()?(<button style={{backgroundColor:'#00a1ff',border:'none',color:'white',padding:'8px 22px',margin:'4px',cursor:'pointer',borderRadius:'30px'}}>{getUser().username}</button>):
                            <input type="button"   style={{backgroundColor:'#00a1ff',border:'none',color:'white',padding:'8px 22px',margin:'4px',cursor:'pointer',borderRadius:'30px'}}
                                  value={isLog ?'logout' : 'Login'} onClick={handleOpen} disabled={isLog} />}
                        </li>
                    </ul>
                </div>
            </nav>
            {isLogin && <Dialog onClose={handleClose} open={isLogin}>
                <DialogTitle id="simple-dialog-title"></DialogTitle>
                <DialogContent>
                    <div className="modal-body">
                        <form>
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label> UserName</label>
                                <input type="text" {...username} autoComplete="new-password" className="form-control" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"  {...password} autoComplete="new-password" className="form-control" placeholder="Enter password" />
                            </div>

                            
                            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                             <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} />
                            
                        </form>
                    </div>
                </DialogContent>
            </Dialog>}
        </>
    )
}
const useFormInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
  
export default Navbar;