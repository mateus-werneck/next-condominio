'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function ReactSwagger() {
  const systemUrl = process.env.NEXT_PUBLIC_SYSTEM_URL;
  return <SwaggerUI url={`${systemUrl}/swagger.json`} deepLinking />;
}

export default ReactSwagger;
