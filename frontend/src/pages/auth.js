// src/pages/Auth.js
import Layout from "../layout";
import Registration from "../security/registration.jsx";
import Login from "../security/login.jsx";

export default function Auth() {
  return (
    <Layout>
      <div className="auth-container">
        <h2>Connexion / Inscription</h2>
        <div className="auth-sections">
          <Registration />
          <Login />
        </div>
      </div>
    </Layout>
  );
}
