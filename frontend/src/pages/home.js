// src/pages/Home.js
import { useEffect, useRef } from "react";
import Layout from "../layout";
import videoBg from "./stocks.mp4";
import { Link } from "react-router";
import "./home.css";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      if (containerRef.current) {
        containerRef.current.scrollTop += event.deltaY * 0.5; // Ajuste la vitesse
      }
    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleScroll);

    return () => container?.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <Layout>
      <div ref={containerRef} className="home">
        {/* Vidéo en arrière-plan */}
        <div className="hero">
          <video autoPlay loop muted className="background-video">
            <source src={videoBg} type="video/mp4" />
          </video>
        </div>

        {/* Section après le scroll */}
        <div className="content">
          <h2>Bienvenue sur notre site</h2>
          <p>Découvrez nos services et nouveautés.</p>
          <Link to="/about" className="btn">En savoir plus</Link>
        </div>
      </div>
    </Layout>
  );
}
