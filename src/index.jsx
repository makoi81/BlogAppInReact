import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import Edit from './Edit.jsx';
import DeletePost from './DeletePost.jsx';
import BlogApp from './BlogApp.jsx';

require('./css/style.css')
 
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const Home =(props)=> <div>
							<h1>Welcome to my BlogApp</h1>
							<Link to="/" >blogApp</Link><br/>
							{props.children}
						</div>
render(
	<Provider store={store}>
		<Router history={browserHistory}>			
			<Route path="/edit/:id" component={Edit} />
			<Route path="/delete/:id" component={DeletePost} /> 
			<Route path="/" component={BlogApp} >		
		</Route>
		</Router>
	</Provider>
	, document.getElementById('app'));