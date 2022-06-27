import './App.css';
import './components/wallet/Wallet'
import Wallet from './components/wallet/Wallet';
import TopList from './components/topList/TopList';
import FileButton from './components/upload/fileButton';

function App() {
  return (
    <div className="App">
      <Wallet />
      <TopList/>
      <FileButton/>
    </div>
  );
}

export default App;
