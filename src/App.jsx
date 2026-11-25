import { useEffect, useState } from 'react';
import './App.css';
import Barplot from './studentdata/Barplot';
import EconBarplot from './econdata/Barplot';
import { data as econData } from './econdata/data';
import StartPage from './StartPage';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const backLink = (
    <a className="backlink" href="#/">
      &larr; Back to start
    </a>
  );

  const content =
    route === '#/barplot' ? (
      <>
        <Barplot />
        {backLink}
      </>
    ) : route === '#/econplot' ? (
      <>
        <EconBarplot
          data={econData}
          title="Escape artists"
          subtitle="Number of laboratory-acquired infections, 1970-2021"
          source="Source: Laboratory-Acquired Infection Database; American Biological Safety Association
The Economist"
        />
        {backLink}
      </>
    ) : (
      <StartPage />
    );

  return <div className="App">{content}</div>;
}

export default App;