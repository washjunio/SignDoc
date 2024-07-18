import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let endpoint = process.env.REACT_APP_API_ENDPOINT;
debugger
      // Determina o endpoint baseado no productType
      if (formData.productType === 'KleverWise') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_KW;
      } else if (formData.productType === 'KleverWise-ES') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_KW_ES;
      } else if (formData.productType === 'KleverWise-CA-EN') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_KW_CA_EN;
      } else if (formData.productType === 'Standard') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_STD;
      } else if (formData.productType === 'Standard-ES') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_STD_ES;
      } else if (formData.productType === 'Standard-EN-CA') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_STD_CA_EN;
      } else if (formData.productType === 'ReLease90') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_RL90;
      } else if (formData.productType === 'ReLease90-ES') {
        endpoint = process.env.REACT_APP_API_ENDPOINT_RL90_ES;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        }
      });

      let updatedHtml = response.data.data.attributes.content;
      Object.keys(formData).forEach(key => {
        if (key !== 'lesseeSignature') {
          const regex = new RegExp(`{{${key}}}`, 'g');
          updatedHtml = updatedHtml.replace(regex, formData[key]);
        }
      });

      navigate('/contract', { state: { documentHtml: updatedHtml } });
    } catch (error) {
      setError('Erro ao buscar o documento. Por favor, tente novamente.');
      console.error('Erro ao buscar o documento:', error);
      toast.error('Erro ao buscar o documento. Por favor, tente novamente.', {
        position: toast.POSITION.TOP_RIGHT
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const fillFormRandomly = () => {
    const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomDate = () => new Date(randomValue(2000, 2023), randomValue(0, 11), randomValue(1, 28)).toISOString().split('T')[0];
    const recurringFrequencies = ['Monthly', 'twice a month', 'weekly', 'every 2 weeks'];

    const totalOfPayments = randomValue(1000, 5000);
    const leaseCost = (totalOfPayments * 1.2).toFixed(2);
    const cashPrice = (totalOfPayments * 1.1).toFixed(2);
    const initialPayment = '50.00';
    const recurringFrequency = recurringFrequencies[randomValue(0, recurringFrequencies.length - 1)];
    const numberOfPaymentsWithInitialPayment = randomValue(13, 24);
    const numberOfPayments = numberOfPaymentsWithInitialPayment - 1;

    setFormData({
      totalOfPayments: totalOfPayments,
      leaseCost: leaseCost,
      cashPrice: cashPrice,
      initialPayment: initialPayment,
      recurringFrequency: recurringFrequency,
      recurringPayment: randomValue(50, 1000).toString(),
      numberOfPaymentsWithInitialPayment: numberOfPaymentsWithInitialPayment.toString(),
      numberOfPayments: numberOfPayments.toString(),
      termInMonths: randomValue(1, 24).toString(),
      productCondition: ['New', 'Used'][randomValue(0, 1)],
      date: randomDate(),
      productType: ['KleverWise',  'KleverWise-CA-EN', 'Standard', 'Standard-ES', 'Standard-EN-CA', 'ReLease90', 'ReLease90-ES'][randomValue(0, 7)],
    });
  };

  const fillNameAndAddress = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const user = response.data.results[0];
      const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const randomDate = () => new Date(randomValue(2000, 2023), randomValue(0, 11), randomValue(1, 28)).toISOString().split('T')[0];
      const recurringFrequencies = ['Monthly', 'twice a month', 'weekly', 'every 2 weeks'];

      const totalOfPayments = randomValue(1000, 5000);
      const leaseCost = (totalOfPayments * 1.2).toFixed(2);
      const cashPrice = (totalOfPayments * 1.1).toFixed(2);
      const initialPayment = '50.00';
      const recurringFrequency = recurringFrequencies[randomValue(0, recurringFrequencies.length - 1)];
      const numberOfPaymentsWithInitialPayment = randomValue(13, 24);
      const numberOfPayments = numberOfPaymentsWithInitialPayment - 1;

      setFormData({
        ...formData,
        lessorName: `${user.name.first} ${user.name.last}`,
        customerFirstName: user.name.first,
        customerLastName: user.name.last,
        lessorStreetAddress: `${user.location.street.number} ${user.location.street.name}`,
        customerStreetAddress: `${user.location.street.number} ${user.location.street.name}`,
        lessorCity: user.location.city,
        customerCity: user.location.city,
        lessorState: user.location.state,
        customerState: user.location.state,
        lessorZip: user.location.postcode,
        customerZip: user.location.postcode,
        retailerStreetAddress: `${user.location.street.number} ${user.location.street.name}`,
        retailerCity: user.location.city,
        retailerState: user.location.state,
        retailerZip: user.location.postcode,
        lessorPhone: user.phone,
        retailerPhone: user.cell,
        totalOfPayments: totalOfPayments,
        leaseCost: leaseCost,
        cashPrice: cashPrice,
        initialPayment: initialPayment,
        recurringFrequency: recurringFrequency,
        recurringPayment: randomValue(50, 1000).toString(),
        numberOfPaymentsWithInitialPayment: numberOfPaymentsWithInitialPayment.toString(),
        numberOfPayments: numberOfPayments.toString(),
        termInMonths: randomValue(1, 24).toString(),
        productCondition: ['New', 'Used'][randomValue(0, 1)],
        date: randomDate(),
        productType: ['KleverWise', 'Standard', 'ReLease90'][randomValue(0, 2)],
      });
    } catch (error) {
      console.error('Erro ao buscar dados aleatórios:', error);
    }
  };

  const handleGetTestDataClick = () => {
    fillNameAndAddress();
    fillFormRandomly();
  };

  return (
    <div className="container">
    <ToastContainer />
    <Form onSubmit={handleSubmit}>
      {/* Campos existentes */}
      <Form.Group controlId="totalOfPayments">
        <Form.Label>Total of Payments:</Form.Label>
        <Form.Control
          type="text"
          name="totalOfPayments"
          value={formData.totalOfPayments}
          onChange={handleInputChange}
        />
      </Form.Group>
      {/* Repita o padrão para os campos adicionais */}
      <Form.Group controlId="leaseCost">
        <Form.Label>Lease Cost:</Form.Label>
        <Form.Control
          type="text"
          name="leaseCost"
          value={formData.leaseCost}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      {/* Adicione os outros campos conforme necessário */}
      <Form.Group controlId="cashPrice">
        <Form.Label>Cash Price:</Form.Label>
        <Form.Control
          type="text"
          name="cashPrice"
          value={formData.cashPrice}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="initialPayment">
        <Form.Label>Initial Payment:</Form.Label>
        <Form.Control
          type="text"
          name="initialPayment"
          value={formData.initialPayment}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="recurringFrequency">
        <Form.Label>Recurring Frequency:</Form.Label>
        <Form.Control
          as="select"
          name="recurringFrequency"
          value={formData.recurringFrequency}
          onChange={handleInputChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="twice a month">twice a month</option>
          <option value="weekly">weekly</option>
          <option value="every 2 weeks">every 2 weeks</option>
        </Form.Control>
      </Form.Group>
  
      <Form.Group controlId="recurringPayment">
        <Form.Label>Recurring Payment:</Form.Label>
        <Form.Control
          type="text"
          name="recurringPayment"
          value={formData.recurringPayment}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="numberOfPaymentsWithInitialPayment">
        <Form.Label>Number of Payments with Initial Payment:</Form.Label>
        <Form.Control
          type="text"
          name="numberOfPaymentsWithInitialPayment"
          value={formData.numberOfPaymentsWithInitialPayment}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="numberOfPayments">
        <Form.Label>Number of Payments:</Form.Label>
        <Form.Control
          type="text"
          name="numberOfPayments"
          value={formData.numberOfPayments}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="termInMonths">
        <Form.Label>Term in Months:</Form.Label>
        <Form.Control
          type="text"
          name="termInMonths"
          value={formData.termInMonths}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="productCondition">
        <Form.Label>Product Condition:</Form.Label>
        <Form.Control
          as="select"
          name="productCondition"
          value={formData.productCondition}
          onChange={handleInputChange}
        >
          <option value="New">New</option>
          <option value="Used">Used</option>
        </Form.Control>
      </Form.Group>
  
      <Form.Group controlId="date">
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      {/* Novos campos adicionados */}
      
  
      <Form.Group controlId="lessorName">
        <Form.Label>Lessor Name:</Form.Label>
        <Form.Control
          type="text"
          name="lessorName"
          value={formData.lessorName}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="customerFirstName">
        <Form.Label>Customer First Name:</Form.Label>
        <Form.Control
          type="text"
          name="customerFirstName"
          value={formData.customerFirstName}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="customerLastName">
        <Form.Label>Customer Last Name:</Form.Label>
        <Form.Control
          type="text"
          name="customerLastName"
          value={formData.customerLastName}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="lessorStreetAddress">
        <Form.Label>Lessor Street Address:</Form.Label>
        <Form.Control
          type="text"
          name="lessorStreetAddress"
          value={formData.lessorStreetAddress}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="customerStreetAddress">
        <Form.Label>Customer Street Address:</Form.Label>
        <Form.Control
          type="text"
          name="customerStreetAddress"
          value={formData.customerStreetAddress}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="retailerName">
        <Form.Label>Retailer Name:</Form.Label>
        <Form.Control
          type="text"
          name="retailerName"
          value={formData.retailerName}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="lessorCity">
        <Form.Label>Lessor City:</Form.Label>
        <Form.Control
          type="text"
          name="lessorCity"
          value={formData.lessorCity}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="lessorState">
        <Form.Label>Lessor State:</Form.Label>
        <Form.Control
          type="text"
          name="lessorState"
          value={formData.lessorState}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="lessorZip">
        <Form.Label>Lessor Zip:</Form.Label>
        <Form.Control
          type="text"
          name="lessorZip"
          value={formData.lessorZip}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="customerCity">
        <Form.Label>Customer City:</Form.Label>
        <Form.Control
          type="text"
          name="customerCity"
          value={formData.customerCity}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="customerState">
        <Form.Label>Customer State:</Form.Label>
        <Form.Control
          type="text"
          name="customerState"
          value={formData.customerState}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="customerZip">
        <Form.Label>Customer Zip:</Form.Label>
        <Form.Control
          type="text"
          name="customerZip"
          value={formData.customerZip}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="retailerStreetAddress">
        <Form.Label>Retailer Street Address:</Form.Label>
        <Form.Control
          type="text"
          name="retailerStreetAddress"
          value={formData.retailerStreetAddress}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="lessorPhone">
        <Form.Label>Lessor Phone:</Form.Label>
        <Form.Control
          type="text"
          name="lessorPhone"
          value={formData.lessorPhone}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="retailerCity">
        <Form.Label>Retailer City:</Form.Label>
        <Form.Control
          type="text"
          name="retailerCity"
          value={formData.retailerCity}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="retailerState">
        <Form.Label>Retailer State:</Form.Label>
        <Form.Control
          type="text"
          name="retailerState"
          value={formData.retailerState}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="retailerZip">
        <Form.Label>Retailer Zip:</Form.Label>
        <Form.Control
          type="text"
          name="retailerZip"
          value={formData.retailerZip}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group controlId="retailerPhone">
        <Form.Label>Retailer Phone:</Form.Label>
        <Form.Control
          type="text"
          name="retailerPhone"
          value={formData.retailerPhone}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="productType">
        <Form.Label>Product Type:</Form.Label>
        <Form.Control
          as="select"
          name="productType"
          value={formData.productType}
          onChange={handleInputChange}
        >
        <option value="KleverWise">KleverWise</option>
        <option value="KleverWise-CA-EN">KleverWise-CA-EN</option>
        <option value="ReLease90">ReLease90</option>
        <option value="ReLease90-ES">ReLease90-ES</option>
        <option value="Standard">Standard</option>
        <option value="Standard-ES">Standard-ES</option>
        <option value="Standard-EN-CA">Standard-EN-CA</option>

        </Form.Control>
      </Form.Group>
  
      {/* Botões de ação */}
      <Button variant="secondary" onClick={handleGetTestDataClick}>
        Get Test Data
      </Button>
      <Button variant="primary" type="submit">
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            />
            Loading...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </Form>
  </div>
  
  );
}

export default HomePage;
