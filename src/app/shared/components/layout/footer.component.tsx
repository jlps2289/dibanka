import React from 'react';

// Antd
import Layout from 'antd/es/layout';
import Divider from 'antd/es/divider';
import { BasicProps } from 'antd/es/layout/layout';

// Utilidades
import { projectInfo } from 'app/shared/utils/constants.util';

const { Footer } = Layout;

export const FooterComponent: React.FC<BasicProps> = (props) => {
  const { className, style, ...footerProps } = props;
  return (
    <Footer className={`container-fluid ${className} mb-3`} style={{ width: 'auto', ...style }} {...footerProps}>
      <div className='text-muted'>
        <Divider />
        Copyright &copy; {projectInfo.versionYear} - {projectInfo.name} {projectInfo.version}&nbsp; Desarrollado para&nbsp;
        <a href={projectInfo.developToWeb} target='_bank'>
          {projectInfo.developToWeb}
        </a>
        <b className='d-none d-md-block'>{projectInfo.recommendedBrowsers}</b>
        <span className='d-none d-sm-block'>{projectInfo.information}</span>
      </div>
      {props.children}
    </Footer>
  );
};
