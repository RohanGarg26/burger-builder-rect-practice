import React from 'react'

import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css'

const layout = (props) => (
  <Auxiliary>
    <div>
      toolbar,sidebar,backdrop
    </div>
    <main className={classes.Content}> {/* {classes.Content} not working !! */}
      {props.children}
    </main>
  </Auxiliary>
)

export default layout