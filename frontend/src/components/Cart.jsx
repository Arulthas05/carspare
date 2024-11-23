import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

import "./Cart.css";

function Cart({ cart, setCart }) {

  const handlePlaceOrder = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Place Your Order",
        html:
        '<input id="swal-input1" class="swal2-input" placeholder="Enter your name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter your address">' +
        '<select id="swal-input3" class="swal2-input">' +
        '<option value="" disabled selected>Select Payment Method</option>' +
        '<option value="credit_debit">Credit/Debit Card</option>' +
        '<option value="cash_on_delivery">Cash on Delivery</option>' +
        '</select>',
      focusConfirm: false,
      showCloseButton: true,
      preConfirm: () => {
        const customer_name = document.getElementById("swal-input1").value;
        const customer_address = document.getElementById("swal-input2").value;
        const payment_method = document.getElementById("swal-input3").value;

        if (!customer_name || !customer_address || !payment_method) {
          Swal.showValidationMessage("All fields are required");
          return false;
        }
        return [customer_name, customer_address, payment_method];
      },
    });

      if (formValues) {
        const [customer_name, customer_address] = formValues;

        let totalOrderPrice = 0;
        cart.forEach((item) => {
          totalOrderPrice += item.price * item.quantity;
        });

        for (const item of cart) {
          const total_price = item.price * item.quantity;

          await axios.post("http://localhost:3000/api/orders", {
            car_part_id: item.id,
            quantity: item.quantity,
            total_price,
            customer_name,
            customer_address,
          });
        }

        Swal.fire(
          "Success!",
          `Order placed successfully! Total amount: $${totalOrderPrice.toFixed(2)}`,
          "success"
        );
        setCart([]); // Clear the cart after placing order
      }
    } catch (error) {
      Swal.fire("Error", "There was an error placing your order.", "error");
    }
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = parseInt(quantity, 10);
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container1">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image_url} alt="Product Image" />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <div className="item-actions">
                    <label htmlFor={`quantity-${index}`}>Qty:</label>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(index, e.target.value)}
                    />
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Products: {cart.reduce((count, item) => count + item.quantity, 0)}</p>
          <p>Total Price: ${calculateTotalPrice()}</p>
          <button onClick={handlePlaceOrder} disabled={cart.length === 0} className="checkout-btn">
            Proceed to Checkout
          </button>
          {/* {cart.length > 0 ? (
            <button onClick={handlePlaceOrder} className="checkout-btn">
              Proceed to Checkout
            </button>
          ) : (
            <p>Your cart is empty. Add some items to proceed with checkout.</p>
          )} */}
        </div>

      </div>
    </div>
  );
}

export default Cart;

