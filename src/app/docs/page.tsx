import { notFound } from 'next/navigation';
import ReactSwagger from './react-swagger';

export default async function IndexPage() {
  if (process.env.NODE_ENV == 'production') {
    notFound();
  }

  return (
    <section className="container">
      <ReactSwagger />
    </section>
  );
}
