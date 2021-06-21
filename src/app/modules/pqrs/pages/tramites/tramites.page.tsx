import { useCallback, useEffect, useState } from 'react';

// Componentes
import { PageHeaderComponent } from 'app/shared/components/page-header.component';
import { TramitesListComponent } from './components/tramites-list.component';
import { TramiteHistoryComponent } from './components/tramite-history.component';

// Servicios
import { ITramite, tramiteServices } from 'app/services/tramites.service';

const TramitesPage = () => {
  //#region Listado de Trámites

  const [tramites, setTramites] = useState<ITramite[]>([]);
  const getTramites = useCallback(
    async () => {
      const resp = await tramiteServices.get_all();
      setTramites(resp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getTramites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  return (
    <div className='fadeInTop container-fluid'>
      <PageHeaderComponent title='Trámites PQRS' subTitle='Consulte el estado y proceso de sus trámites.' />
      <div className='d-lg-flex'>
        <TramitesListComponent tramites={tramites} style={{ maxWidth: 350 }} />
        <TramiteHistoryComponent tramites={tramites} />
      </div>
    </div>
  );
};

export default TramitesPage;
