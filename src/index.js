import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import createStore from './store';

import Todos from './components/Todos';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Menu from './components/Menu';
import UserPanel from './components/UserPanel';

import "./css/style.css"

const store = createStore()

const App = () => (
  <Provider store={store}>
    <div id="rootwrap">

      <Menu />
      <UserPanel />

      <div id="contents">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/post" component={NewPost} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </div>
  </Provider>
);

const Root = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

render(<Root />, document.getElementById('main'));

/*
<Route exact path="/write" render={(props) => ( 
  <Write
    user={this.state.user}
    addArticle={this.addArticle} /> 
)} />
<Route exact path="/edit/:id" render={(props) => ( 
  <Write
    user={this.state.user}
    addArticle={this.editArticle}
    id={props.match.params.id} />
)} />
<Route path="/post/:id" render={(props) => (
  <Post
    user={this.state.user}
    match={props.match}
    delArticle={this.delArticle} />
)} />
*/