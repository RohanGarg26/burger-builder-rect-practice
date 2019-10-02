import React, { Component } from 'react'
import axios from '../../axios-orders'


import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingridients: null,
    totalPrice: 6.9,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://burger-builder-a9048.firebaseio.com/ingridients.json')
      .then(response => {
        this.setState({
          ingridients: response.data
        })
      })
      .catch(err => {
        // console.log(err)
        this.setState({
          error: true
        })
      })
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    // eslint-disable-next-line
    for( let i in this.state.ingridients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&') 
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  modalClosedHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  //purchaseHandler(){} syntax cannot be used
  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  updatePurchaseState = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map(igKey => {
        return ingridients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({
      purchasable: sum > 0
    })
  }

  addIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updateIngridients = {
      ...this.state.ingridients
    }
    const updatedCounted = oldCount + 1;
    updateIngridients[type] = updatedCounted
    const priceAddition = INGRIDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({
      totalPrice: newPrice,
      ingridients: updateIngridients
    })
    this.updatePurchaseState(updateIngridients)
  }

  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updateIngridients = {
      ...this.state.ingridients
    }
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    updateIngridients[type] = updatedCounted
    const priceReduction = INGRIDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceReduction
    this.setState({
      totalPrice: newPrice,
      ingridients: updateIngridients
    })
    this.updatePurchaseState(updateIngridients)
  }

  render() {
    const disabledInfo = {
      ...this.state.ingridients
    }
    // eslint-disable-next-line
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = this.state.error ? <p>Ingridients can't be loaded :!</p> : <Spinner />
    let orderSummary = null
    // console.log(this.state.error);

    if (this.state.ingridients) {
      burger = <Auxiliary>
        <Burger ingridients={this.state.ingridients} />,
        <BuildControls
          ingridientAdded={this.addIngridientHandler}
          ingridientRemoved={this.removeIngridientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler} />
      </Auxiliary>
      orderSummary = <OrderSummary
        ingridients={this.state.ingridients}
        purchaseCanceled={this.modalClosedHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)