import { useHistory } from 'react-router';

// Antd
import Input from 'antd/es/input';

// Componentes
import { PageHeaderComponent } from 'app/shared/components/page-header.component';

// Interface
import { IUser } from 'app/services/auth.service';

// Utilidades
import { getStorage, keys } from 'app/shared/tools/storage.tool';
import { projectInfo } from 'app/shared/utils/constants.util';

const ModulePage = () => {
  const user = getStorage<IUser>(keys.token);
  const history = useHistory();

  const onSearch = (value?: string) => {
    if (!value) {
      return;
    }

    history.push(`/pqrs/tramites?q=${value}`);
  };

  return (
    <div className='fadeInTop container-fluid'>
      <PageHeaderComponent
        title={`¡Bienvenido/a ${user?.name || user?.userName}!`}
        subTitle={`Bienvenido a ${projectInfo.name} donde podrás validar el estado de tus trámites.`}
        backIcon={null}
      />

      <div className='card card-body'>
        <h4 className='text-secondary'>{projectInfo.fullname}</h4>
        <p>{projectInfo.description}</p>

        <p>Puede buscar un número de trámite para ver el histórico de las acciones realizadas en su gestión.</p>
        <Input.Search
          className='mt-2'
          allowClear
          placeholder='Buscar número Radicado'
          autoComplete='off'
          enterButton
          size='large'
          onSearch={onSearch}
          style={{ maxWidth: 300 }}
        />
      </div>
    </div>
  );
};

export default ModulePage;
