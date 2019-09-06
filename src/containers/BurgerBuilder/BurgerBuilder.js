import React, { Component } from 'react'

import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'

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
    totalPrice: 4
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
        <Burger ingridients={this.state.ingridients} />
        <BuildControls
          ingridientAdded={this.addIngridientHandler}
          ingridientRemoved={this.removeIngridientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice} />
      </Auxiliary>
    )
  }
}

export default BurgerBuilder