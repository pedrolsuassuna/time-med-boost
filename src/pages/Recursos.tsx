import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Recursos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8">Recursos Educacionais</h1>
          <p className="text-xl text-muted-foreground">Em breve: artigos sobre produtividade médica</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Recursos;
