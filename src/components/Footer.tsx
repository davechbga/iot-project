const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between mt-5">
      <div className="text-sm">
        &copy; {new Date().getFullYear()} David Chiriboga
      </div>
      <div className="text-sm">Mi Aplicación de Sensores - Tecnologías Emergentes - UNIR</div>
    </footer>
  );
};

export default Footer;
