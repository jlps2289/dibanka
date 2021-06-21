import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';

// Antd
import Tag from 'antd/es/tag';

// Services
import { ITramite, ETypePQRSColor } from 'app/services/tramites.service';

export const TramiteComponent: React.FC<ITramiteProps> = (props) => {
  const { tramite } = props;
  const { search } = useLocation();

  const [id, setId] = useState<string | undefined>();
  useEffect(() => {
    const query: any = queryString.parse(search);
    setId(query?.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Link
      className={`fadeIn list-group-item list-group-item-action ${tramite.id === id && 'active'}`}
      key={tramite.id}
      to={`?q=${tramite.id}`}
    >
      <small>{moment(tramite.date).fromNow()}</small>
      <p className='mb-1'>
        <b>{tramite.id}</b> - {tramite.name}
      </p>
      {tramite.categories.map((tag) => (
        <Tag key={tag} color={ETypePQRSColor[tag]}>
          {tag}
        </Tag>
      ))}
    </Link>
  );
};

interface ITramiteProps {
  tramite: ITramite;
}
