import { connect } from 'react-redux';

import './App.css';
import Wallet from './components/wallet/Wallet';
import TopList from './components/topList/TopList';
import IssuePage from './components/issuePage';
import List from './components/List/List' 

const App = props => {
  const wallet = props.wallet
  console.log('App.js : ' ,wallet)
  return (
    <div className="App">
      <Wallet />
      {props.wallet.issue && <IssuePage/>}
      <TopList/>
      <List/>
      
    </div>
  );
}
const mapStateToProps = state => {
  return {wallet : state.wallet}
}

export default connect(mapStateToProps, )(App)