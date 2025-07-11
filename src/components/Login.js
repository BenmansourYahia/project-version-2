import React, { useState, useRef } from 'react';

// Icônes sociales SVG (remplacement FontAwesome)
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b5998"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
);
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ea4335"><path d="M21.805 10.023h-9.765v3.955h5.627c-.243 1.243-1.486 3.655-5.627 3.655-3.386 0-6.146-2.8-6.146-6.25s2.76-6.25 6.146-6.25c1.927 0 3.222.82 3.963 1.527l2.71-2.633C16.07 2.527 13.97 1.5 11.5 1.5 5.701 1.5 1 6.201 1 12s4.701 10.5 10.5 10.5c6.037 0 10.5-4.25 10.5-10.25 0-.688-.07-1.227-.195-1.727z"/></svg>
);
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077b5"><path d="M22.23 0H1.77C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.77 24h20.459C23.208 24 24 23.229 24 22.271V1.723C24 .771 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633c-1.137 0-2.06-.926-2.06-2.066 0-1.14.923-2.066 2.06-2.066 1.137 0 2.06.926 2.06 2.066 0 1.14-.923 2.066-2.06 2.066zM20.452 20.452h-3.555v-5.605c0-1.336-.025-3.057-1.865-3.057-1.867 0-2.154 1.457-2.154 2.963v5.699h-3.555V9h3.414v1.561h.049c.476-.899 1.637-1.847 3.37-1.847 3.602 0 4.267 2.37 4.267 5.455v6.283z"/></svg>
);

export default function Login({ onLogin }) {
  const [rightPanel, setRightPanel] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'admin' && loginPassword === 'admin') {
      setLoginError('');
      onLogin();
    } else {
      setLoginError('Identifiants incorrects');
    }
  };

  // Signup handler (simulation)
  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');
    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError('Veuillez remplir tous les champs');
      return;
    }
    setSignupSuccess('Compte créé avec succès ! Vous pouvez vous connecter.');
    setTimeout(() => setRightPanel(false), 1200);
  };

  return (
    <div className={`container${rightPanel ? ' right-panel-active' : ''}`} id="container" style={{ fontFamily: 'Montserrat, sans-serif', margin: '0 auto', marginTop: 40 }}>
      {/* Sign Up */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup} autoComplete="off">
          <h1>Créer un compte</h1>
          <span>ou utilisez votre email pour l'inscription</span>
          <input type="text" placeholder="Nom" value={signupName} onChange={e => setSignupName(e.target.value)} />
          <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
          {signupError && <div style={{ color: '#EF4444', fontWeight: 500, fontSize: 14 }}>{signupError}</div>}
          {signupSuccess && <div style={{ color: '#10B981', fontWeight: 500, fontSize: 14 }}>{signupSuccess}</div>}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      {/* Sign In */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin} autoComplete="off">
          <h1>Connexion</h1>
          <span>ou utilisez votre compte</span>
          <input type="text" placeholder="Nom d'utilisateur" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          <a href="#" style={{ color: '#4333c0', fontSize: 13, margin: '8px 0' }}>Mot de passe oublié ?</a>
          {loginError && <div style={{ color: '#EF4444', fontWeight: 500, fontSize: 14 }}>{loginError}</div>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Bon retour !</h1>
            <p>Pour rester connecté, veuillez vous authentifier avec vos informations personnelles</p>
            <button className="btn-ovr" id="signIn" type="button" onClick={() => setRightPanel(false)}>Connexion</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Bienvenue !</h1>
            <p>Entrez vos informations personnelles et commencez votre aventure avec nous</p>
            <button className="btn-ovr" id="signUp" type="button" onClick={() => setRightPanel(true)}>Créer un compte</button>
          </div>
        </div>
      </div>
      {/* Style CSS du modèle CodePen intégré ici */}
      <style>{`
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
* { box-sizing: border-box; }
body { background: #f6f5f7; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: 'Montserrat', sans-serif; height: 100vh; margin: -20px 0 50px; }
h1 { font-weight: bold; margin: 0; }
h2 { text-align: center; }
p { font-size: 14px; font-weight: 100; line-height: 20px; letter-spacing: 0.5px; margin: 20px 0 30px; }
span { font-size: 12px; }
a { color: #333; font-size: 14px; text-decoration: none; margin: 15px 0; }
button { border-radius: 20px; border: 1px solid #6958ea; background-color: #6958ea; color: #FFFFFF; font-size: 12px; font-weight: bold; padding: 12px 45px; letter-spacing: 1px; text-transform: uppercase; transition: transform 80ms ease-in; }
button:active { transform: scale(0.95); }
button:focus { outline: none; }
button.btn-ovr { background-color: transparent; border-color: #FFFFFF; }
form { background-color: #FFFFFF; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 0 50px; height: 100%; text-align: center; }
input { background-color: #eee; border: none; padding: 12px 15px; margin: 8px 0; width: 100%; }
.container { background-color: #fff; border-radius: 10px; box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); position: relative; overflow: hidden; width: 768px; max-width: 100%; min-height: 480px; }
.form-container { position: absolute; top: 0; height: 100%; transition: all 0.6s ease-in-out; }
.sign-in-container { left: 0; width: 50%; z-index: 2; }
.container.right-panel-active .sign-in-container { transform: translateX(100%); }
.sign-up-container { left: 0; width: 50%; opacity: 0; z-index: 1; }
.container.right-panel-active .sign-up-container { transform: translateX(100%); opacity: 1; z-index: 5; animation: show 0.6s; }
@keyframes show { 0%, 49.99% { opacity: 0; z-index: 1; } 50%, 100% { opacity: 1; z-index: 5; } }
.overlay-container { position: absolute; top: 0; left: 50%; width: 50%; height: 100%; overflow: hidden; transition: transform 0.6s ease-in-out; z-index: 100; }
.container.right-panel-active .overlay-container{ transform: translateX(-100%); }
.overlay {
  /* background: #4333c0; */
  /* background: -webkit-linear-gradient(to right, #29bc9f, #4333c0); */
  background: linear-gradient(90deg, #6c4ccf 60%, #8B5CF6 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.container.right-panel-active .overlay { transform: translateX(50%); }
.overlay-panel { position: absolute; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 0 40px; text-align: center; top: 0; height: 100%; width: 50%; transform: translateX(0); transition: transform 0.6s ease-in-out; }
.overlay-left { transform: translateX(-20%); }
.container.right-panel-active .overlay-left { transform: translateX(0); }
.overlay-right { right: 0; transform: translateX(0); }
.container.right-panel-active .overlay-right { transform: translateX(20%); }
.social-container { margin: 20px 0; }
.social-container a { border: 1px solid #DDDDDD; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin: 0 5px; height: 40px; width: 40px; }
`}</style>
    </div>
  );
} 