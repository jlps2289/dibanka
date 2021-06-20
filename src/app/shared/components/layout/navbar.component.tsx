import React from 'react';

// Antd
import Menu from 'antd/es/menu';
import Layout from 'antd/es/layout';
import { BasicProps } from 'antd/es/layout/layout';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ToggleSideNav } from 'app/redux/ui/ui.actions';
import { ResetApplication } from 'app/redux/application/application.actions';
import { AppState } from 'app/redux/app.reducers';

// Herramientas
import { confirmMessage } from 'app/services/settings/message.service';
import { getStorage, keys } from 'app/shared/tools/storage.tool';

// Iconos
import Logo from '../../../../assets/images/brand/logo.svg';
import { LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// Services
import { authServices, IUser } from 'app/services/auth.service';

// Componentes
const { Header } = Layout;

export const NavbarComponent: React.FC<BasicProps> = (props) => {
  const user = getStorage<IUser>(keys.token);

  const sidenav = useSelector<AppState, boolean>((state) => state.ui.sidenav);
  const dispatch = useDispatch();

  const toggleSidenav = () => dispatch(ToggleSideNav(!sidenav));

  const onLogout = () => {
    confirmMessage({
      title: 'Cerrar sesión',
      content: '¿Esta seguro de cerrar sesión?',
      okText: 'Si, cerrar sesión',
      okButtonProps: { type: 'primary', danger: true },
      onOk: () => {
        dispatch(ResetApplication());
        authServices.logout();
      }
    });
  };

  return (
    <Header
      {...props}
      className='d-flex justify-content-between app-bg-transparent border-bottom shadow w-100 fixed-top px-0'
      style={{ zIndex: 1003 }}
    >
      <div className='d-flex align-items-center'>
        <div className='d-none d-md-block' style={{ width: 192 }}>
          <img className='px-3' src={Logo} alt='Logo' height={25} />
        </div>
        <Menu className='bg-transparent' theme='dark' mode='horizontal'>
          <Menu.Item className='bg-transparent' key='1' onClick={toggleSidenav} title='Mostrar / Ocultar menú'>
            {React.createElement(sidenav ? MenuFoldOutlined : MenuUnfoldOutlined, {
              className: 'text-muted',
              style: { fontSize: 18 }
            })}
          </Menu.Item>
        </Menu>
        {props.children}
      </div>

      <div className='d-flex d-md-none align-items-center'>
        <img className='px-3' src={Logo} alt='Logo' height={25} />
      </div>

      <div className='d-flex align-items-center'>
        <span className='app-navbar-user text-truncate d-none d-md-block' title={`${user?.name} <${user?.userName}>`}>
          <span className='h5'>
            Bienvenido <b className='text-primary'>{user?.name}</b>
          </span>
          <br />
          <span className='text-muted'>{user?.userName}</span>
        </span>
        <Menu className='bg-transparent' theme='dark' mode='horizontal'>
          <Menu.Item className='bg-transparent' key='1' onClick={onLogout} title='Cerrar sesión'>
            <LogoutOutlined className='text-muted' style={{ fontSize: 18 }} />
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};
