import './StartPage.css';

function StartPage() {
  return (
    <div className="startpage">
      <h1>D3 plots</h1>
      <p>Small React + D3 demo charts.</p>
      <ul>
        <li>
          <a href="#/barplot">Origin of the students</a>
        </li>
        <li>
          <a href="#/econplot">Escape artists</a>
        </li>
      </ul>
    </div>
  );
}

export default StartPage;
