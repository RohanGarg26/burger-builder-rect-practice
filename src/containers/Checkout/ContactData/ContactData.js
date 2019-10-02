import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingridients)
    this.setState({
      loading: true
    })
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price, //not good for production
      customer: {
        name: 'RG',
        address: 'LIC'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({
          loading: false,
        })
        this.props.history.push('/')
      })
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"></input>
        <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;