import { IonApp, setupIonicReact } from '@ionic/react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ContactFormModalProvider } from './contexts/ContactFormModalContext';
import { AppContent } from './App';
import { DetailBootstrapProvider, type DetailBootstrap } from './ssr/bootstrap';

setupIonicReact();

export function render(url: string, bootstrap: DetailBootstrap): string {
  return renderToString(<DetailBootstrapProvider value={bootstrap}><IonApp><StaticRouter location={url}><ContactFormModalProvider><AppContent /></ContactFormModalProvider></StaticRouter></IonApp></DetailBootstrapProvider>);
}
