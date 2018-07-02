import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Catalog from './components/Catalog'
import Product from './components/Product'


export const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={App} />
    <Route path='catalog' component={Catalog} >
      <Route path='/catalog/product' component={Product} />
    </Route>
  </Route>
)