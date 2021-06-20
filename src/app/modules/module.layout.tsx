import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SetApplicationMenu } from 'app/redux/application/application.actions';
import { ToggleSideNav } from 'app/redux/ui/ui.actions';
import { AppState } from 'app/redux/app.reducers';
import { UIState } from 'app/redux/ui/ui.reducer';

// Antd
import Spin from 'antd/es/spin';
import Layout from 'antd/es/layout';
import BackTop from 'antd/es/back-top';

// Componentes
import { SidenavComponent } from 'app/shared/components/layout/sidenav.component';
import { NavbarComponent } from 'app/shared/components/layout/navbar.component';
import { FooterComponent } from 'app/shared/components/layout/footer.component';

// Módulos
import { ModuleRoutes } from './module.routes';

// Utils
import { projectInfo } from 'app/shared/utils/constants.util';

// Fragmentos
const { Content } = Layout;

const ModuleLayout = (props: { logout: () => void }) => {
  //#region Redux settings

  const { loading, sidenav }: UIState = useSelector<AppState, UIState>((state) => state.ui);

  const dispatch = useDispatch();

  const toggleSidenav = () => dispatch(ToggleSideNav(!sidenav));

  //#endregion
  //#region Application settings menu

  useEffect(() => {
    dispatch(SetApplicationMenu(projectInfo.menu));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  const classLayout = sidenav ? 'app-layout-content' : '';
  const marginTop = 64;

  return (
    <BrowserRouter>
      {loading && <Spin className='fadeIn app-loading' tip='Cargando Componentes...' />}
      <Layout className='fadeIn' style={{ minHeight: '100vh' }}>
        <SidenavComponent style={{ marginTop }} />
        <Layout>
          <NavbarComponent />
          {sidenav && (
            <div className='d-block d-md-none app-layout-backdrop' style={{ marginTop }} onClick={toggleSidenav} role='button' />
          )}
          <Content className={classLayout} style={{ marginTop }}>
            <ModuleRoutes />
          </Content>
          <FooterComponent className={classLayout} />
        </Layout>
        <BackTop />
      </Layout>
    </BrowserRouter>
  );
};

export default ModuleLayout;
