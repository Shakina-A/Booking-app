import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutbutton from "./SignOutButton";


const Header =() =>{
    const {isLoggedIn}=useAppContext();
    return(<div className="bg-blue-500 py-4">
        <div className="container mx-auto flex justify-between">
            <span className="text-2xl text-white font-bold tracking-tight">
                <Link to="/">MernHolidays.com</Link>
            </span>
            <span className="flex space-x-2">

                {isLoggedIn?(<>
                <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-800" to="/my-bookings"> MY BOOKINGS</Link> 
                <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-800" to="/my-hotels"> MY HOTELS</Link>   
                <SignOutbutton/>             
                </>):(<Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500">
                    Sign In
                </Link>)}
            </span>
        </div>

    </div>);
};
export default Header;
