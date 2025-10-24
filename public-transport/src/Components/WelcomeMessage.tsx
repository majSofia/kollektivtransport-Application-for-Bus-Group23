//Vi har bestemt at brukeren skal få en velkomstmelding når han logger inn med e-post.
//Derfor har vi brukt et interface med props, 
//som betyr at komponenten skal få informasjon fra brukeren.
interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <div className="welcome-box">
      <h2>Welcome, {userName}! </h2>
      <p>Plan your next trip with Kudo Transport</p>
    </div>
  );
};

export default WelcomeMessage;