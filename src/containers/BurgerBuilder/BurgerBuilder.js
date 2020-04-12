import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'


import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  // state = {
  //   ingridients: null,
  //   totalPrice: 6.9,
  //   purchasable: false,
  //   purchasing: false,
  //   loading: false,
  //   error: false
  // }

  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngridients()
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  modalClosedHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  //purchaseHandler(){} syntax cannot be used
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true
      })
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  updatePurchaseState = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map(igKey => {
        return ingridients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  // addIngridientHandler = (type) => {
  //   const oldCount = this.state.ingridients[type];
  //   const updateIngridients = {
  //     ...this.state.ingridients
  //   }
  //   const updatedCounted = oldCount + 1;
  //   updateIngridients[type] = updatedCounted
  //   const priceAddition = INGRIDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingridients: updateIngridients
  //   })
  //   this.updatePurchaseState(updateIngridients)
  // }

  // removeIngridientHandler = (type) => {
  //   const oldCount = this.state.ingridients[type];
  //   const updateIngridients = {
  //     ...this.state.ingridients
  //   }
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCounted = oldCount - 1;
  //   updateIngridients[type] = updatedCounted
  //   const priceReduction = INGRIDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceReduction
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingridients: updateIngridients
  //   })
  //   this.updatePurchaseState(updateIngridients)
  // }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    // eslint-disable-next-line
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = this.props.error ? <p>Ingridients can't be loaded :!</p> : <Spinner />
    let orderSummary = null
    // console.log(this.state.error);

    if (this.props.ings) {
      burger = <Auxiliary>
        <Burger ingridients={this.props.ings} />,
        <BuildControls
          ingridientAdded={this.props.onIngridientAdded}
          ingridientRemoved={this.props.onIngridientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          isAuth={this.props.isAuthenticated}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler} />
      </Auxiliary>
      orderSummary = <OrderSummary
        ingridients={this.props.ings}
        purchaseCanceled={this.modalClosedHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price} />
      // console.log(this.props.ings)
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


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngridientAdded: (ingName) => dispatch(actions.addIngridient(ingName)),
    onIngridientRemoved: (ingName) => dispatch(actions.removeIngridient(ingName)),
    onInitIngridients: () => dispatch(actions.initIngridients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))