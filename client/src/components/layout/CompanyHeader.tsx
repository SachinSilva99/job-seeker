import {Link} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import logo from "../../assets/logo.png";
import {useDispatch} from "react-redux";
import {deleteUserFailure, deleteUserStart, deleteUserSuccess} from "../../redux/user/UserSlice.ts";


const CompanyHeader = () => {
  const dispatch = useDispatch();
  const handleLogoutOnClick = () => {

    try {
      dispatch(deleteUserStart());
      dispatch(deleteUserSuccess());
    } catch (e) {
      dispatch(deleteUserFailure(e));
    }
  }
  return (
    <header className='flex w-full h-[10vh] justify-between px-4 pd:mx-8 lg:px-16'>
      <div className="left-nav flex items-center justify-start ">
        <img className='h-20' src={logo} alt=""/>
      </div>
      <div className="right-nav  items-center justify-between  gap-8 hidden md:flex">
        <Link to=''>
          <div className='custom-nav-hover'>Job Seekers</div>
        </Link>
        <Link to='vacancies'>
          <div className='custom-nav-hover'>Vacancies</div>
        </Link>
        <Link to='make-vacancy'>
          <div className='custom-nav-hover'>Make Vacancy</div>
        </Link>
        <Link to='applications'>
          <div className='custom-nav-hover'>Applications</div>
        </Link>

        <Link to='requests'>
          <div className='custom-nav-hover'>Requests</div>
        </Link>

        <Link to='profile'>
          <div className='custom-nav-hover rounded-full h-10 w-10'>
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              alt="img"/>
          </div>
        </Link>
        <Link to='/' className='hover:text-blue-500'>
          <div onClick={handleLogoutOnClick}>
            <MdLogout size={25}/>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default CompanyHeader;
