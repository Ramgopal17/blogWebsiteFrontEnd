
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import globalEnv from "../../api/globalenv.js";
const ContactForm = ({ downloadWhitePaper }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    companyName: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      setErrorMessage('Please accept the terms and conditions.');
      return;
    }

    let formValid = true;
    const newTouchedFields = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        formValid = false;
        newTouchedFields[key] = true; 
      }
    });

    if (!formValid) {
      setTouchedFields(newTouchedFields);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const formInfo = {
      data: {
        First_Name: formData.firstName,
        Last_Name: formData.lastName,
        Email: formData.email,
        Company_Name: formData.companyName,
        Phone: formData.phoneNumber,
      },
    };

    try {
      const response = await fetch(`${globalEnv.api}/api/white-paper-download-forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInfo),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {!isSubmitted ? (
        <div className="container" style={{ padding: '50px', borderRadius: '10px', backgroundColor: 'white' }}>
          <h4 className="formHeading">Fill the form to download the whitepaper</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${touchedFields.firstName && formData.firstName === '' ? 'is-invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
             
              />
              {touchedFields.firstName && formData.firstName === '' && (
                <div className="invalid-feedback">Please fill in your first name.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${touchedFields.lastName && formData.lastName === '' ? 'is-invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            
              />
              {touchedFields.lastName && formData.lastName === '' && (
                <div className="invalid-feedback">Please fill in your last name.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${touchedFields.email && formData.email === '' ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
       
              />
              {touchedFields.email && formData.email === '' && (
                <div className="invalid-feedback">Please fill in your email.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number<span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className={`form-control ${touchedFields.phoneNumber && formData.phoneNumber === '' ? 'is-invalid' : ''}`}
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
    
              />
              {touchedFields.phoneNumber && formData.phoneNumber === '' && (
                <div className="invalid-feedback">Please fill in your phone number.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${touchedFields.companyName && formData.companyName === '' ? 'is-invalid' : ''}`}
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
   
              />
              {touchedFields.companyName && formData.companyName === '' && (
                <div className="invalid-feedback">Please fill in your company name.</div>
              )}
            </div>
            <div>
              <a href="https://metapercept.com/privacy-policy/" target="_blank" rel="noreferrer" style={{textDecoration:"underline"}}>GDPR/Privacy Declaration<span className="text-danger">*</span></a>
            </div>
            <div className="mb-3">
              <div>
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                 className='mr-5'/>
                <label htmlFor="privacy">
                  I accept the GDPR / Privacy Declaration of Metapercept
                </label>
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#324DA0' }}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="download-icon" style={{ marginTop: '20px',fontSize:"20px" }}>
          <a href={`${globalEnv.api}${downloadWhitePaper}`} download target="_blank" rel="noreferrer">
            <i className="fas fa-download"></i> Download White Paper
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

