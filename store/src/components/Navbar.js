import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';

function NavbarComponent() {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart.items })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }

    const manageBilling = async () => {
        
        // await fetch('http://localhost:4000/create-customer-portal-session', {
        //     method: "POST",
        //     // mode: "no-cors",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin' : "http://localhost:3000"
        //     },
        //     body: JSON.stringify({ customer_id: "cus_NpOdr1RzvHVS11" })
        // }).then((response) => {
        //     console.log(response)
        //     return response.json();
        // }).then((response) => {
        //     if (response.url) {
        //         console.log(response.url)
        //         window.location.assign(response.url); // Forwarding user to Stripe
        //     }
        // });

        const url = 'http://localhost:4000/create-customer-portal-session';
        
    
        // const queryParams = new URLSearchParams().toString();
        const fetchUrl = url;
    
       await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers here as needed
          },
          body: JSON.stringify({ customer_id: "cus_NpOdr1RzvHVS11" })
        })
          .then(response => response.json())
          .then(data => {
            // Process the response data here
            
            console.log('customer data',data);
            // setCustomerData(data)
          })
          .catch(error => {
            // Handle any errors here
            console.error('error',error);
          });
    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Purchase items!
                            </Button>
                            <Button variant="success" onClick={manageBilling}>
                                Manage billing
                            </Button>
                            {/*<form method="POST" action="/create-customer-portal-session">
                                <button type="submit">Manage billing</button>
                            </form>*/}
                        </>
                        :
                        <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;