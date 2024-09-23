import React from "react";
import Card from "../components/card/Card";
import WelcomeBook from "../components/animationBook/BookAnimation";
import Footer from "../components/footer/Footer";

class Home extends React.Component {
  
    render() {
      return (
        <div>
          <WelcomeBook />
          <Card />
          <Footer />
        </div>
      );
    }
  } 
  
  export default Home;