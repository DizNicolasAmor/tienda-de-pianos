import React from 'react';

const Footer = () => (
    <footer id="footer">
    	<div className="row">
	    	<div className="col-md-6 footer-left">
		      <h5 className="footer-text">Malabia 1614 (MAL2DOP)
		        <br />Ciudad Autónoma de Buenos Aires, Argentina
		        <br />Teléfono: (011) 555 4321
		        <br /> casa.ramirez@gmail.com
		      </h5>
	    	</div>
	    	<div className="col-md-6 footer-right">
				<div className="footer-text">&copy; Casa Ramírez</div>
				<a href="" title="youtube" aria-label="Youtube">
		    		<i className='fa fa-youtube-square fa-4x footer-icons'></i>
	    		</a>
				<a href="" title="facebook" aria-label="Facebook">
					<i className='fa fa-facebook-square fa-4x footer-icons'></i>
	    		</a>
				<a href="" title="google plus" aria-label="Google Plus">
					<i className='fa fa-google-plus-square fa-4x footer-icons'></i>
	    		</a>
	    	</div>
    	</div>
    </footer>
);

export default Footer;
