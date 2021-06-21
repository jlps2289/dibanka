import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import moment from 'moment';

// Antd
import Tag from 'antd/es/tag';
import Card from 'antd/es/card';
import Empty from 'antd/es/empty';
import Image from 'antd/es/image';
import Button from 'antd/es/button';
import Avatar from 'antd/es/avatar';
import Tooltip from 'antd/es/tooltip';
import Timeline from 'antd/es/timeline';

// Utilidades
import { getStorage, keys } from 'app/shared/tools/storage.tool';

// Iconos
import { FileImageFilled, FilePdfFilled } from '@ant-design/icons';

// Componentes
import { ModalComponent } from 'app/shared/components/modal.component';

// Hooks
import { useModalSetting } from 'app/shared/hooks/modal.hook';

// Servicios
import { ITramite, ITramiteHistory, ETypePQRSColor, tramiteServices } from 'app/services/tramites.service';
import { IUser } from 'app/services/auth.service';

export const TramiteHistoryComponent: React.FC<ITramiteHistoryProps> = (props) => {
  const { tramites } = props;
  const { search } = useLocation();

  //#region Información Tramite seleccionado

  const user = getStorage<IUser>(keys.token);

  const [tramite, setTramite] = useState<ITramite | undefined>();
  const [tramiteHistory, setTramiteHistory] = useState<ITramiteHistory[]>([]);

  const getHistory = useCallback(
    async (id: string) => {
      const resp = await tramiteServices.get_history(id);
      setTramiteHistory(resp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const query: any = queryString.parse(search);
    const _tramite = tramites.find((i) => i.id === query.q);
    setTramite(_tramite);
    getHistory(_tramite?.id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, tramites]);

  //#endregion
  //#region Modal Settings

  const { visible, setVisible, dataRecord, setDataRecord } = useModalSetting<ITramiteHistory>();

  const onOpen = (record: ITramiteHistory) => {
    setVisible(true);
    setDataRecord(record);
  };

  const onCancel = () => setVisible(false);

  //#endregion

  return (
    <div className='w-100'>
      {!!tramite ? (
        <>
          <div className='card mb-3 fadeIn'>
            <h4 className='card-header text-reset'>Información General</h4>
            <div className='card-body'>
              <small>{moment(tramite.date).fromNow()}</small>
              <h4>
                <small># {tramite.id}</small>
                <br />
                {tramite.title}
              </h4>
              <p>{tramite.comment}</p>
              <span>
                {tramite.categories.map((tag) => (
                  <Tag key={tag} color={ETypePQRSColor[tag]}>
                    {tag}
                  </Tag>
                ))}
              </span>
            </div>
          </div>
          <div className='card fadeIn'>
            <h4 className='card-header text-reset'>Historial</h4>
            <div className='card-body'>
              <Timeline className='mt-5' mode='left'>
                {tramiteHistory?.map((i) => {
                  return (
                    <Timeline.Item key={i.datetime} label={moment(i.datetime).format('DD MMMM YYYY [|] HH:mm:ss')}>
                      <Card className='mb-2 app-pointer' bodyStyle={{ padding: '1.5rem 1rem' }} onClick={() => onOpen(i)}>
                        <Card.Meta
                          avatar={<Avatar src={i.agent.photo} />}
                          title={i.agent.name}
                          description={
                            <>
                              <p>{i.comment}</p>
                              {!!i.documents.length && (
                                <Tooltip title='Adjuntos Documentos PFD'>
                                  <FilePdfFilled className='text-danger' style={{ fontSize: '1.25rem' }} />
                                </Tooltip>
                              )}
                              {!!i.images.length && (
                                <Tooltip title='Adjuntos Imágenes'>
                                  <FileImageFilled className='text-secondary' style={{ fontSize: '1.25rem' }} />
                                </Tooltip>
                              )}
                            </>
                          }
                        />
                      </Card>
                    </Timeline.Item>
                  );
                })}

                <Timeline.Item color='green' label='Inicio del Trámite'>
                  <Card className='mb-2' bodyStyle={{ padding: '1.5rem 1rem' }}>
                    <Card.Meta
                      avatar={<Avatar>{user?.name?.slice(0, 2).toUpperCase()}</Avatar>}
                      title={user?.name}
                      description={
                        <>
                          <p className='font-weight-bold'>{tramite?.title}</p>
                          <p>{tramite?.comment}</p>
                          <span>
                            {tramite?.categories.map((tag) => (
                              <Tag key={tag} color={ETypePQRSColor[tag]}>
                                {tag}
                              </Tag>
                            ))}
                          </span>
                        </>
                      }
                    />
                  </Card>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>

          <ModalComponent
            visible={visible}
            title={`Comentario Trámite #${tramite.id}`}
            closable={false}
            footer={[
              <Button key='back' onClick={onCancel}>
                Cerrar
              </Button>
            ]}
          >
            <Card className='mb-2' bodyStyle={{ padding: '1.5rem 1rem' }}>
              <Card.Meta
                avatar={<Avatar src={dataRecord?.agent.photo} />}
                title={dataRecord?.agent.name}
                description={`Realizado: ${moment(dataRecord?.datetime).format('LLLL')}`}
              />
            </Card>
            <Card className='mb-2'>
              <Card.Meta title='Comentario' description={dataRecord?.comment} />
            </Card>
            {!!dataRecord?.documents.length && (
              <Card className='mb-2'>
                <Card.Meta
                  title='Documentos'
                  description={
                    <ul className='m-0'>
                      {dataRecord.documents.map((i) => (
                        <li key={i.filename}>
                          <a className='text-danger' href={i.url} target='_blank' rel='noreferrer' download={i.filename}>
                            {i.filename}
                          </a>
                        </li>
                      ))}
                    </ul>
                  }
                />
              </Card>
            )}
            {!!dataRecord?.images.length && (
              <Card className='mb-2'>
                <Card.Meta
                  title='Imágenes'
                  description={
                    <>
                      {dataRecord.images.map((i) => (
                        <Image key={i} width={200} src={i} />
                      ))}
                    </>
                  }
                />
              </Card>
            )}
          </ModalComponent>
        </>
      ) : (
        <div className='card card-body py-5 fadeIn'>
          <Empty description='Seleccione un Trámite' />
        </div>
      )}
    </div>
  );
};

interface ITramiteHistoryProps {
  tramites: ITramite[];
}
