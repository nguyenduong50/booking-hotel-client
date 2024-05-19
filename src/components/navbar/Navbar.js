import { useLoaderData, useNavigate, Form } from "react-router-dom";
import classes from "./navbar.module.css"

const Navbar = () => {
  const navigate = useNavigate();
  const token = useLoaderData('root');
  const email = localStorage.getItem('email');

  const loginHandle = () => {
    navigate('/auth?mode=login');
  };

  const registerHandle = () => {
    navigate('/auth?mode=register');
  };

  const homeHandle = () => {
    navigate('/');
  };

  const transactionHandle = () => {
    navigate('/transaction');
  };

  return (
    <div className={classes['navbar']}>
      <div className={classes['navContainer']}>
        <span className={classes['logo']} onClick={homeHandle}>Booking Website</span>
        <div className={classes['navItems']}>
          {
            !token && (
              <>
                <button className={classes['navButton']} onClick={registerHandle}>Register</button>
                <button className={classes['navButton']} onClick={loginHandle}>Login</button>
              </>
            )           
          }
          {
            token && (
              <>
                <span>{email}</span>
                <button className={classes['navButton']} onClick={transactionHandle}>Transactions</button>
                <Form action="/logout" method="POST">
                  <button className={classes['navButton']}>Logout</button>
                  <input type="hidden" value={token} name="token" />
                </Form>
              </>
            )           
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
