import Barplot from './Barplot';
import { data } from './data';

function App() {
  return (
    <div className="App">
      <Barplot 
        data={data}
        title="Origin of the D3 students"
        source="https://www.react-graph-gallery.com/course/introduction/project"
      />
    </div>
  );
}

export default App;