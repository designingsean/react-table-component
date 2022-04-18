import DownloadTable from './components/DownloadTable';
import { tableData } from './data';
import './App.css';

function App() {
  return (
    <div className="App">
      <DownloadTable 
        data={tableData}
        title={'Downloadable Files'}
      />
    </div>
  );
}

export default App;
