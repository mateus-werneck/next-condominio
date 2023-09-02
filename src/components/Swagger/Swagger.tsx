'use client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Swagger() {
  const systemUrl = window.location.protocol + '//' + window.location.host;
  return <SwaggerUI url={`${systemUrl}/docs/swagger.yaml`} deepLinking />;
}
