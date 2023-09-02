import Swagger from '@Components/Swagger/Swagger';
import { notFound } from 'next/navigation';

export default async function DocsPage() {
  if (process.env.NODE_ENV == 'production') {
    notFound();
  }

  return (
    <section className="container">
      <Swagger />
    </section>
  );
}
