import { useEffect } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';

// Componentes
import { PageHeaderComponent } from 'app/shared/components/page-header.component';

const TramitesPage = () => {
  const { search } = useLocation();

  useEffect(() => {
    const query = queryString.parse(search);
    console.log(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className='fadeInTop container-fluid'>
      <PageHeaderComponent title='Trámites PQRS' subTitle='Consulte el estado y proceso de sus trámites.' />
      DEMO
    </div>
  );
};

export default TramitesPage;
