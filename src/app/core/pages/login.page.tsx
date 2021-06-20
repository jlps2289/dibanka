import { useState } from 'react';
import Helmet from 'react-helmet';

// Antd
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';

// Utils
import { projectInfo } from 'app/shared/utils/constants.util';

// Components
import { FooterComponent } from 'app/shared/components/layout/footer.component';

// Imágenes
import Logo from '../../../assets/images/brand/logo.svg';

// Services
import { authServices, IUser } from 'app/services/auth.service';
import { warningMessage } from 'app/services/settings/message.service';

const LoginPage = () => {
  const [form] = Form.useForm<IUser>();

  const [isUserName, setIsUserName] = useState(false);
  const [isNumberPhone, setIsNumberPhone] = useState(false);

  const onSubmit = (values: IUser) => authServices.login(values);

  const onChangeEmailOrPhone = (
    event: React.ChangeEvent<HTMLInputElement>,
    state: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const {
      target: { value }
    } = event;
    state(!!value);
    form.validateFields(['userName', 'numberPhone']);
  };

  const onGetNewPin = () =>
    form
      .validateFields(['userName', 'numberPhone'])
      .then((values) => authServices.get_new_pin(values))
      .catch(() => warningMessage({ content: `Debe ingresar un correo electrónico o número de celular.` }));

  return (
    <div className='app-container-login container-fluid fadeIn min-vw-100 min-vh-100 py-5'>
      <Helmet>
        <title>Inicio | {projectInfo.name}</title>
        <meta name='description' content={projectInfo.description} />
      </Helmet>

      <img className='d-block my-5 mx-auto' src={Logo} width='200' alt='Logo' />
      <h2 className='m-0'>¡Bienvenido a {projectInfo.name}!</h2>
      <h4 className='font-weight-light'>{projectInfo.fullname}</h4>
      <p className='d-none d-md-block' style={{ maxWidth: 1000 }}>
        {projectInfo.description}
      </p>

      <Form
        form={form}
        className='w-100 card p-4 my-5'
        style={{ maxWidth: 350 }}
        layout='vertical'
        onFinish={onSubmit}
        autoComplete='off'
      >
        <p className='mb-4 text-muted'>
          Ingrese su <b>Correo electrónico</b> y/o su número de <b>Teléfono celular</b> para consultar el estado de los trámites.
        </p>

        <Form.Item label='Teléfono celular' name='numberPhone' rules={[{ required: !isUserName, len: 10 }]}>
          <Input
            allowClear
            type='tel'
            placeholder='Número'
            autoComplete='off'
            onChange={(event) => onChangeEmailOrPhone(event, setIsNumberPhone)}
          />
        </Form.Item>

        <Form.Item label='Correo electrónico' name='userName' rules={[{ required: !isNumberPhone, type: 'email' }]}>
          <Input
            allowClear
            type='email'
            placeholder='usuario@ejemplo.com'
            autoComplete='off'
            onChange={(event) => onChangeEmailOrPhone(event, setIsUserName)}
          />
        </Form.Item>

        <Form.Item
          label='PIN'
          name='pin'
          tooltip='Número de 5 dígitos enviado al correo electrónico o al número de celular como mensaje de texto.'
          extra={
            <Button type='link' htmlType='button' onClick={onGetNewPin}>
              ¿Olvido su PIN? - Solicitar uno Nuevo
            </Button>
          }
          rules={[{ required: true, len: 5 }]}
        >
          <Input allowClear type='tel' placeholder='PIN 00000' autoComplete='off' />
        </Form.Item>

        <Form.Item className='mb-0 mt-4'>
          <Button type='primary' block htmlType='submit'>
            Consultar Trámites
          </Button>
        </Form.Item>
      </Form>

      <FooterComponent className='bg-transparent text-center px-0' style={{ maxWidth: 1100 }} />
    </div>
  );
};

export default LoginPage;
