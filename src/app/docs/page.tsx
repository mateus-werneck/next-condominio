import { getApiDocs } from '@Lib/Swagger/swagger';
import { notFound } from 'next/navigation';
import ReactSwagger from './react-swagger';

export default async function IndexPage() {
  if (process.env.NODE_ENV == 'production') {
    notFound();
  }

  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
