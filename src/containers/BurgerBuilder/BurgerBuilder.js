import React, { Component } from 'react'

import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  purchaseContinueHandler = () => {

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
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
          <OrderSummary 
            ingridients={this.state.ingridients} 
            purchaseCanceled={this.modalClosedHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
        </Modal>
        <Burger ingridients={this.state.ingridients} />
        <BuildControls
          ingridientAdded={this.addIngridientHandler}
          ingridientRemoved={this.removeIngridientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler} />
      </Auxiliary>
    )
  }
}

export default BurgerBuilder