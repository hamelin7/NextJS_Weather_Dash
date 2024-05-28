import Link from "next/link";
import React from "react";
import Header from "../components/header"; // Assuming header is now in TypeScript or using correct extension
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.discover}>
        <div className={styles['discover-text']}>
          <h2>Discover the Power of Weather Data</h2>
          <p className={styles.text}>Empowering you with real-time weather insights at your fingertips.</p>
          <Link href="/weather" passHref>
            <a className={styles['cta-button']}>Get Started</a>
          </Link>
        </div>
      </section>

      <section id="getStarted" className={styles['get-started']}>
        <h2>Get Started in Minutes</h2>
        <p className={styles.text}>Experience the simplicity of WeatherWiz:</p>
        <ul className={styles.list}>
          <li className={styles['list-item']}>Enter your Zip Code.</li>
          <li className={styles['list-item']}>Click &quot;Get Weather&quot;.</li>
          <li className={styles['list-item']}>Explore detailed weather information instantly.</li>
        </ul>
        <Link href="/weather" passHref>
          <a className={styles['cta-button']}>Try It Out</a>
        </Link>
      </section>

      <section id="tryItOut" className={styles['try-it-out']}>
        <h2>See the Weather, Feel the Weather</h2>
        <p className={styles.text}>Immerse yourself in a delightful weather experience with WeatherWiz.</p>
        <div className={styles['cta-container']}>
          <Link href="/weather" passHref>
            <a className={styles['cta-button']}>Go to Dashboard</a>
          </Link>
        </div>
      </section>

      <footer className={styles['page-footer']}>
        <p>© 2023 WeatherWiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
