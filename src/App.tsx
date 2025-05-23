import { MainPage } from '@/pages/main-page';

import './styles/index.scss';
import { Layout } from './modules/layout';

export const App = () => (
  <div>
    <Layout>
      <MainPage />
    </Layout>
  </div>
);
