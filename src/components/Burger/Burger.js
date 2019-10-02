import React from 'react'
import {withRouter} from 'react-router-dom'

import classes from './Burger.module.css'
import BurgerIngridient from './BurgerIngrideient/BurgerIngridient'

const burger = (props) => {
  // console.log(Object.keys(props.ingridients))
  let transformedIngridients = Object.keys(props.ingridients)
    .map(igKey => {
      // console.log(igKey)
      // console.log([...Array(props.ingridients[igKey])].length)
      return [...Array(props.ingridients[igKey])]
        .map((_, i) => {
          return <BurgerIngridient key={igKey + i} type={igKey} />
        })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
    if(transformedIngridients.length === 0){
      transformedIngridients = <p>Please start adding ingridients.</p>
    }
  return (
    <div className={classes.Burger}>
      <BurgerIngridient type="bread-top" />
      {transformedIngridients}
      <BurgerIngridient type="bread-bottom" />
    </div>
  )
}

export default withRouter(burger)