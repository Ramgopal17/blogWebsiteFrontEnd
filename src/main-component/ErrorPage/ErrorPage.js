import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Error from '../../components/404/404'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from "../../components/footer/footer-12";

const ErrorPage =() => {
    return(
        <Fragment>
         <div className="theme-bg-black" >
            <Navbar/>
           </ div>
            <Error/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ErrorPage;

