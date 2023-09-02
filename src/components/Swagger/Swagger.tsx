'use client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Swagger() {
  const systemUrl = process.env.NEXT_PUBLIC_SYSTEM_URL;
  return <SwaggerUI url={`${systemUrl}/docs/swagger.yaml`} deepLinking />;
}
