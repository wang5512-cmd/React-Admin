import 'antd/dist/antd.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
      </Switch>
    </HashRouter>
  );
}

export default App;
