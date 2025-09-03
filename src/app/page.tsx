import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold">¡Hola! Bienvenido a MFLC</h1>
        <p className="mt-2 text-neutral-700">
          Esto es una prueba para confirmar que el Navbar aparece arriba.
        </p>
      </main>
    </>
  );
}
