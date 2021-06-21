import React, { useEffect, useState } from 'react';

// Antd
import Empty from 'antd/es/empty';
import { BasicProps } from 'antd/es/layout/layout';

// Services
import { ITramite } from 'app/services/tramites.service';

// Components
import { TramiteComponent } from './tramite.component';
import { SearchInputComponent } from 'app/shared/components/inputs/search-input.component';

export const TramitesListComponent: React.FC<ITramitesListProps> = (props) => {
  const { tramites: initTramites, ...tramitesListProps } = props;

  const [_tramites, setTramites] = useState<ITramite[]>([]);

  useEffect(() => {
    setTramites(initTramites);
  }, [initTramites]);

  return (
    <div className='w-100 card mb-3 mr-md-3' {...tramitesListProps}>
      <h4 className='card-header text-secondary'>Trámites</h4>
      <div className='card-body'>
        <SearchInputComponent dataSourceSearch={initTramites} setDataSourceResult={setTramites} />
      </div>
      {_tramites.length ? (
        <div className='list-group list-group-flush fadeIn'>
          {_tramites.map((i) => (
            <TramiteComponent key={i.id} tramite={i} />
          ))}
        </div>
      ) : (
        <div className='card-body py-5 fadeIn'>
          <Empty description='No hay registros' />
        </div>
      )}
    </div>
  );
};

interface ITramitesListProps extends BasicProps {
  tramites: ITramite[];
}
