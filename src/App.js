import React from 'react';
import 'antd/dist/antd.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import routes from './routes';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} /> )
  

class App extends React.Component {

    render(){
        return (
            <BrowserRouter>
                <div>
                    {this.showContentMenu(routes)}
                </div>
            </BrowserRouter>
        );
    }

    showContentMenu = (routes) => {
        var result = null;
        if(routes.length > 0){
            result = routes.map((route, index) => {
                return(
                <AppRoute 
                    key={index} 
                    path={route.path}
                    exact={route.exact}
                    layout={route.layout}
                    component={route.main}
                />
                )
            } )
        }
    return <Switch>{result}</Switch>;
    }

}

export default App;