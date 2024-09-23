import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Projeto desenvolvido por <a href="https://github.com/WesleyBatistaSouza" target='_blanck'>Wesley Batista</a></p>
        
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
