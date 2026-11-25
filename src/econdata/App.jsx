import Barplot from './Barplot';
import { data } from './data';

function App() {
  return (
    <div className="App">
      <Barplot 
        data={data}
        title="Escape artists"
        subtitle="Number of laboratory-acquired infections, 1970-2021"
        source="Source: Laboratory-Acquired Infection Database; American Biological Safety Association
The Economist"
      />
    </div>
  );
}
export default App;