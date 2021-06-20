// Componentes
import { PageHeaderComponent } from 'app/shared/components/page-header.component';

// Interface
import { IUser } from 'app/services/auth.service';

// Utilidades
import { getStorage, keys } from 'app/shared/tools/storage.tool';
import { projectInfo } from 'app/shared/utils/constants.util';

const ModulePage = () => {
  const user = getStorage<IUser>(keys.token);

  return (
    <div className='fadeInTop container-fluid'>
      <PageHeaderComponent
        title={`¡Bienvenido/a ${user?.name || user?.userName}!`}
        subTitle={`Bienvenido a la aplicación ${projectInfo.name} desarrollada para ${projectInfo.developToWeb}.`}
        backIcon={null}
      />

      {/* TODO: [2021-06-06] Agregar la descripción correspondiente a la app. */}
    </div>
  );
};

export default ModulePage;
