import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "./Cart";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  finalPurchase() {
    localStorage.clear();
  }

  handleClick(id, event) {
    event.preventDefault();
    this.deleteFromCart(id);
    this.forceUpdate();
  }
  handleSubmit(id, event) {
    event.preventDefault();
    this.changeQty(id, event);
    this.forceUpdate();
  }
  changeQty(id, event) {
    let cartMovies = JSON.parse(localStorage.getItem("products"));

    cartMovies.filter((movie) => {
      if (movie.id === id) {
        const quantity = Number(event.target.value);
        movie.qty = quantity;
      }
    });
    localStorage.setItem("products", JSON.stringify(cartMovies));
  }

  deleteFromCart(id) {
    let cartMovies = JSON.parse(localStorage.getItem("products"));
    let movies = cartMovies.filter((movie) => movie.id !== id);
    localStorage.setItem("products", JSON.stringify(movies));
  }

  render() {
    const cartMovies = JSON.parse(localStorage.getItem("products"));
    let itemsTotal = 0;
    let totalPrice = 0;
    cartMovies.filter((movie) => {
      itemsTotal += movie.qty;
      totalPrice += (movie.price * movie.qty).toFixed(2);
    });
    let b4taxed = totalPrice + 5.99;
    let tax = b4taxed * 0.065;

    return (
      <div>
        <div id="checkout-feats">
          <form id="ship-info">
            <h2>Shipping & Handling:</h2>
            <label>Your Name: </label>
            <input type="text" placeholder="Enter your name here" />
            <label>Email:</label>
            <input type="text" placeholder="example@domain.com" />
            <label>Shipping Address:</label>
            <input type="text" placeholder="123 Main St." />
            <label htmlFor="ccn">Credit Card Number:</label>
            <input maxLength="19" placeholder="xxxx xxxx xxxx xxxx" />
          </form>
          <div id="ord-summary">
            <Link to={`/confirmation`} id="purchase-button">
              <button type="submit" onClick={this.finalPurchase}>
                Confirm Purchase
              </button>
            </Link>
            <div id="ord-details">
              <h2>Order Summary:</h2>
              <div>
                <h3>Items({itemsTotal}):</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div>
                <h3>Shipping & Handling:</h3>
                <h3>$5.99</h3>
              </div>
              <div>
                <h3>Total before tax:</h3>
                <h3>{b4taxed}</h3>
              </div>
              <div>
                <h3>Estimated tax to be collected:</h3>
                <h3>{tax}</h3>
              </div>
              <div>
                <h1 id="total">Order total:</h1>
                <h1>{b4taxed + tax}</h1>
              </div>
            </div>
          </div>
        </div>


          <div id="cart">
          <h1 >Review Order: </h1>
            {cartMovies.map((movie) => {
              return (
                <div className="cart-items" key={movie.id}>
                  <Link to={`/movies/${movie.id}`} className="product">
                    <img src={movie.imageUrl} />
                    &nbsp; &nbsp;
                    <h2>{movie.name}</h2>
                  </Link>

                  <h2>${(movie.price * movie.qty).toFixed(2)}</h2>
                  <h3 id="cart-qty">
                    Qty:
                    <input
                      type="number"
                      min="1"
                      max="10"
                      defaultValue={movie.qty}
                      onClick={(event) => this.handleSubmit(movie.id, event)}
                    />
                  </h3>

                  <button
                    type="submit"
                    onClick={(event) => this.handleClick(movie.id, event)}
                    id="delete-button"
                  >
                    <img src="https://www.shareicon.net/data/512x512/2016/09/10/827820_delete_512x512.png" />
                  </button>
                </div>
              );
            })}
          </div>


            <div id="end-purchase">
        <Link to={`/confirmation`} id="purchase-button-2">
          <button type="submit" onClick={this.finalPurchase}>
            Confirm Purchase
          </button>
        </Link>
        <h1>Order Total: {b4taxed + tax}</h1>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    thisCart: state.cart,
    movies: state.movies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(fetchCart(id)),
    loadMovies: (id) => dispatch(fetchCartMovies(id)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
