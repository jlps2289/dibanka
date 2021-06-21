import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';

// Componentes
import { PageHeaderComponent } from 'app/shared/components/page-header.component';
import { TramitesListComponent } from './components/tramites-list.component';

// Servicios
import { ITramite, tramiteServices } from 'app/services/tramites.service';

const TramitesPage = () => {
  const { search } = useLocation();

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

  useEffect(() => {
    const query: any = queryString.parse(search);
    /* TODO: [2021-06-21] Hacer la timelat del tramite y descargar archivos. */
    console.log(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className='fadeInTop container-fluid'>
      <PageHeaderComponent title='Trámites PQRS' subTitle='Consulte el estado y proceso de sus trámites.' />
      <div className='d-lg-flex'>
        <TramitesListComponent tramites={tramites} style={{ maxWidth: 350 }} />
        <div className='w-100 card card-body'>Resultados</div>
      </div>
    </div>
  );
};

export default TramitesPage;
