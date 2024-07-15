import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const [formData, setFormData] = useState({
    totalOfPayments: '',
    leaseCost: '',
    cashPrice: '',
    initialPayment: '',
    recurringFrequency: '',
    recurringPayment: '',
    numberOfPaymentsWithInitialPayment: '',
    numberOfPayments: '',
    termInMonths: '',
    productCondition: '',
    lesseeSignature: '',
    date: '',
    productType: 'KleverWise',
    lessorName: '',
    customerFirstName: '',
    customerLastName: '',
    lessorStreetAddress: '',
    customerStreetAddress: '',
    retailerName: '',
    lessorCity: '',
    lessorState: '',
    lessorZip: '',
    customerCity: '',
    customerState: '',
    customerZip: '',
    retailerStreetAddress: '',
    lessorPhone: '',
    retailerCity: '',
    retailerState: '',
    retailerZip: '',
    retailerPhone: ''
  });
  const [mobileView, setMobileView] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = process.env.REACT_APP_API_ENDPOINT;

      // Determina o endpoint baseado no productType
      if (formData.productType === 'KleverWise') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_KW;
      } else if (formData.productType === 'Standard') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_STD;
      } else if (formData.productType === 'ReLease90') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_RL90;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        }
      });
      let updatedHtml = response.data.data.content;
      Object.keys(formData).forEach(key => {
        if (key !== 'lesseeSignature') { // Exclua a assinatura ao substituir os dados
          const regex = new RegExp(`{{${key}}}`, 'g');
          updatedHtml = updatedHtml.replace(regex, formData[key]);
        }
      });

      navigate('/contract', { state: { documentHtml: updatedHtml, mobileView } });
    } catch (error) {
      console.error('Erro ao buscar o documento:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setMobileView(e.target.checked);
  };

  const fillFormRandomly = () => {
    const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomString = () => Math.random().toString(36).substring(2, 10);
    const randomDate = () => new Date(randomValue(2000, 2023), randomValue(0, 11), randomValue(1, 28)).toISOString().split('T')[0];

    setFormData({
      totalOfPayments: randomValue(1, 100).toString(),
      leaseCost: randomValue(100, 10000).toString(),
      cashPrice: randomValue(100, 10000).toString(),
      initialPayment: randomValue(10, 1000).toString(),
      recurringFrequency: `${randomValue(1, 12)} months`,
      recurringPayment: randomValue(50, 1000).toString(),
      numberOfPaymentsWithInitialPayment: randomValue(1, 24).toString(),
      numberOfPayments: randomValue(1, 24).toString(),
      termInMonths: randomValue(1, 24).toString(),
      productCondition: ['New', 'Used'][randomValue(0, 1)],
      date: randomDate(),
      productType: ['KleverWise', 'Standard', 'ReLease90'][randomValue(0, 2)],
      lessorName: randomString(),
      customerFirstName: randomString(),
      customerLastName: randomString(),
      lessorStreetAddress: randomString(),
      customerStreetAddress: randomString(),
      retailerName: randomString(),
      lessorCity: randomString(),
      lessorState: randomString(),
      lessorZip: randomValue(10000, 99999).toString(),
      customerCity: randomString(),
      customerState: randomString(),
      customerZip: randomValue(10000, 99999).toString(),
      retailerStreetAddress: randomString(),
      lessorPhone: randomValue(1000000000, 9999999999).toString(),
      retailerCity: randomString(),
      retailerState: randomString(),
      retailerZip: randomValue(10000, 99999).toString(),
      retailerPhone: randomValue(1000000000, 9999999999).toString()
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total of Payments:</label>
          <input type="text" className="form-control" name="totalOfPayments" value={formData.totalOfPayments} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Lease Cost:</label>
          <input type="text" className="form-control" name="leaseCost" value={formData.leaseCost} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Cash Price:</label>
          <input type="text" className="form-control" name="cashPrice" value={formData.cashPrice} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Initial Payment:</label>
          <input type="text" className="form-control" name="initialPayment" value={formData.initialPayment} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Recurring Frequency:</label>
          <input type="text" className="form-control" name="recurringFrequency" value={formData.recurringFrequency} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Recurring Payment:</label>
          <input type="text" className="form-control" name="recurringPayment" value={formData.recurringPayment} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Number of Payments with Initial Payment:</label>
          <input type="text" className="form-control" name="numberOfPaymentsWithInitialPayment" value={formData.numberOfPaymentsWithInitialPayment} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Number of Payments:</label>
          <input type="text" className="form-control" name="numberOfPayments" value={formData.numberOfPayments} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Term in Months:</label>
          <input type="text" className="form-control" name="termInMonths" value={formData.termInMonths} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Product Condition:</label>
          <input type="text" className="form-control" name="productCondition" value={formData.productCondition} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="text" className="form-control" name="date" value={formData.date} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Product Type:</label>
          <select className="form-control" name="productType" value={formData.productType} onChange={handleInputChange}>
            <option value="KleverWise">KleverWise</option>
            <option value="Standard">Standard</option>
            <option value="ReLease90">ReLease90</option>
          </select>
        </div>
        <div className="form-group">
          <label>Lessor Name:</label>
          <input type="text" className="form-control" name="lessorName" value={formData.lessorName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Customer First Name:</label>
          <input type="text" className="form-control" name="customerFirstName" value={formData.customerFirstName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Customer Last Name:</label>
          <input type="text" className="form-control" name="customerLastName" value={formData.customerLastName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Lessor Street Address:</label>
          <input type="text" className="form-control" name="lessorStreetAddress" value={formData.lessorStreetAddress} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Customer Street Address:</label>
          <input type="text" className="form-control" name="customerStreetAddress" value={formData.customerStreetAddress} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Retailer Name:</label>
          <input type="text" className="form-control" name="retailerName" value={formData.retailerName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Lessor City:</label>
          <input type="text" className="form-control" name="lessorCity" value={formData.lessorCity} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Lessor State:</label>
          <input type="text" className="form-control" name="lessorState" value={formData.lessorState} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Lessor Zip:</label>
          <input type="text" className="form-control" name="lessorZip" value={formData.lessorZip} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Customer City:</label>
          <input type="text" className="form-control" name="customerCity" value={formData.customerCity} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Customer State:</label>
          <input type="text" className="form-control" name="customerState" value={formData.customerState} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Customer Zip:</label>
          <input type="text" className="form-control" name="customerZip" value={formData.customerZip} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Retailer Street Address:</label>
          <input type="text" className="form-control" name="retailerStreetAddress" value={formData.retailerStreetAddress} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Lessor Phone:</label>
          <input type="text" className="form-control" name="lessorPhone" value={formData.lessorPhone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Retailer City:</label>
          <input type="text" className="form-control" name="retailerCity" value={formData.retailerCity} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Retailer State:</label>
          <input type="text" className="form-control" name="retailerState" value={formData.retailerState} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Retailer Zip:</label>
          <input type="text" className="form-control" name="retailerZip" value={formData.retailerZip} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Retailer Phone:</label>
          <input type="text" className="form-control" name="retailerPhone" value={formData.retailerPhone} onChange={handleInputChange} />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" name="mobileView" checked={mobileView} onChange={handleCheckboxChange} />
          <label className="form-check-label">Page A4 Mobile View</label>
        </div>
        <button type="button" className="btn btn-secondary" onClick={fillFormRandomly}>Preencher Aleatoriamente</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default HomePage;
