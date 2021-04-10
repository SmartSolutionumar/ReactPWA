import React , {Fragment }from 'react';
// import spinner from '../assets/img/spinner.gif';
import ChartLoader from '../assets/img/Chartloader.gif';

const Spinner = () => {
 return (
  <Fragment>
   <img src={ChartLoader} alt='Loading......'
      style={{ width: '100%',height:'100vh',  }}></img>
  </Fragment>
 )
}

export default Spinner
