import * as React from "react";
import { UserList, UserShow, UserCreate, UserEdit } from "./users";
import {
  OrderList, OrderShow,
  // OrderCreate, 
  OrderEdit
} from "./order";
import {
  SaldoList, SaldoShow,
  // SaldoCreate,
  SaldoEdit
} from "./saldo";
import { Admin, Resource } from "react-admin";
import PostIcon from '@material-ui/icons/AccountCircle';
import OrderIcon from '@material-ui/icons/AddShoppingCart';
import SaldoIcon from '@material-ui/icons/Money';
import CustomLoginPage from './CustomLoginPage';
import RestProvider from './lib/RestProvider';
import AuthProvider from './lib/AuthProvider';
import { firebaseConfig as config } from './FIREBASE_CONFIG';
import MyLayout from './custom/MyLayout';

const options = {
  logging: true,
  rootRef: ''
}
const trackedResources = [{ name: 'users' }, { name: 'order' }, { name: 'saldo' }];

const dataProvider = RestProvider(config, { trackedResources });
const authProvider = AuthProvider(config, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        layout={MyLayout}
        loginPage={CustomLoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource
          name="users" options={{ label: 'Mitra' }}
          icon={PostIcon}
          list={UserList}
          show={UserShow}
          create={UserCreate}
          edit={UserEdit}
        />
        <Resource
          name="order" options={{ label: 'Order' }}
          icon={OrderIcon}
          list={OrderList}
          show={OrderShow}
        // create={OrderCreate}
        // edit={OrderEdit}
        />
        <Resource
          name="saldo" options={{ label: 'Saldo' }}
          icon={SaldoIcon}
          list={SaldoList}
          show={SaldoShow}
          // create={SaldoCreate}
          edit={SaldoEdit}
        />
      </Admin>
    );
  }
}

export default App;
