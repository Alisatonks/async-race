import Navbar from './NavBar';

export default function Header() {
  return (
    <header className="header">
      <Navbar />
      <div className="neon-title">
        <h1 className="neon-title">
          <span className="neon-title__span">
            As<span>y</span>nc Ra<span>c</span>e
          </span>
        </h1>
      </div>
    </header>
  );
}
