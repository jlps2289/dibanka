import { BrowserRouter } from 'react-router-dom';

// Routes
import { CoreRoutes } from './core.routes';

export const CoreModule = () => {
  return (
    <BrowserRouter>
      <CoreRoutes />
    </BrowserRouter>
  );
};
