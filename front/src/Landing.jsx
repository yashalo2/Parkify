import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <h1>Welcome to Smart Parking</h1>
        <p>Find, reserve, and pay for parking with ease.</p>
        <div className="cta-buttons">
          <a href="/login" className="btn">Login</a>
          <a href="/register" className="btn">Register</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
