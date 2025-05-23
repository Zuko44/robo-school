import { MainPage } from '@/pages/main-page';

import { Layout } from './modules/layout';

import './styles/index.scss';

export const App = () => (
  <div>
    <Layout>
      <MainPage />
    </Layout>
  </div>
);
