import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { LandingPage } from './pages/LandingPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { PricingPage } from './pages/PricingPage';
import { RegisterPage } from './pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'register', Component: RegisterPage },
      { path: 'simulator', Component: SimulatorPage },
    ],
  },
]);
