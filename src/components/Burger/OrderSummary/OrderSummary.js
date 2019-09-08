import React from 'react'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingridientSummary = Object.keys(props.ingridients)
    .map(igKey => {
      return (<li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                  {igKey}
                </span>
                :{props.ingridients[igKey]}
              </li>)
    })
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingridients:</p>
      <ul>
        {ingridientSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purshaseContinued}>CONTINUE</Button>
    </Auxiliary>
  )
}

export default orderSummary;