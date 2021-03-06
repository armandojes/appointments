import { Box, Hidden, Menu } from '@material-ui/core';
import { ArrowDropDown, Business, Person, PlaylistAddCheck, StoreMallDirectory, Today } from '@material-ui/icons';
import { array, bool, func, string } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'src/components/card';
import Loading from 'src/components/loading';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { appointmentStatus, colors } from 'src/constants';
import Empty from '../../../../components/empty';
import styles from './styles.module.css';

const View = ({ isLoading, items, companyOptions, onCompanyChange, keyWords, onChangeKeywords, onBranchChange, branchOptions, disableShow }) => {
  const [menuAnchorElCompany, setAnchorElCompany] = useState(null);
  const [menuAnchorElBranch, setMenuAnchorElBranch] = useState(null);

  if (disableShow) {
    return (
      <Empty message="Aún no tienes ninguna sucursal asignado!" />
    );
  }

  return (
    <>
      <Menu
        open={!!menuAnchorElCompany}
        anchorEl={menuAnchorElCompany}
        onClose={() => setAnchorElCompany(null)}
        onClick={() => setAnchorElCompany(null)}
        className={styles.menu}
        anchorOrigin={{ vertical: 'top' }}
      >
        <Box padding="1em">
          <div onClick={() => onCompanyChange(null)} role="button" className={styles.menuItem}>
            Todos
          </div>
          {companyOptions.map((company) => (
            <div onClick={() => onCompanyChange(company.id)} role="button" className={styles.menuItem} key={company.id}>
              {company.name}
            </div>
          ))}
        </Box>
      </Menu>

      <Menu
        open={!!menuAnchorElBranch}
        anchorEl={menuAnchorElBranch}
        onClose={() => setMenuAnchorElBranch(null)}
        onClick={() => setMenuAnchorElBranch(null)}
        className={styles.menu}
        anchorOrigin={{ vertical: 'top' }}
      >
        <Box padding="1em">
          <div onClick={() => onBranchChange(null)} role="button" className={styles.menuItem}>
            Todos
          </div>
          {branchOptions.map((branch) => (
            <div onClick={() => onBranchChange(branch.id)} role="button" className={styles.menuItem} key={branch.id}>
              {branch.name}
            </div>
          ))}
        </Box>
      </Menu>

      <Card className={styles.headerCard}>
        <Text fontSize="1.2em" fontWeight="bold" color={colors.blue}>Citas</Text>
        <div className={styles.filtersWrapper}>
          <Hidden xsDown>
            <Input placeholder="buscar" value={keyWords} onChange={onChangeKeywords} />
          </Hidden>
          <div className={styles.filter} onClick={(e) => setAnchorElCompany(e.currentTarget)} role="button">
            Empresa <ArrowDropDown />
          </div>
          <div className={styles.filter} onClick={(e) => setMenuAnchorElBranch(e.currentTarget)} role="button">
            Sucursal <ArrowDropDown />
          </div>
        </div>
      </Card>

      {isLoading && <Loading />}
      {!isLoading && !!items && !!items.length && (
        <div className={styles.listWraper}>

          {items.map((item) => (
            <Link key={item.id} className={styles.itemWrapper} to={`/dashboard/appointment/${item.id}`}>
              <Card className={styles.itemCard}>
                {item.status === 'complete' && (
                  <div className={styles.captionText}>{appointmentStatus[item.status]}</div>
                )}
                <div className={styles.row}>
                  <PlaylistAddCheck className={styles.icon} />
                  {item.id}
                </div>
                <div className={styles.row}>
                  <Today className={styles.icon} />
                  {item.stringDate} - {item.stringTime} hrs.
                </div>
                <div className={styles.row}>
                  <Business className={styles.icon} />
                  {item.company.name}
                </div>
                <div className={styles.row}>
                  <StoreMallDirectory className={styles.icon} />
                  {branchOptions.find((el) => el.id === item.branch).name}
                </div>
                <div className={styles.row}>
                  <Person className={styles.icon} />
                  {item.patientName}
                </div>

              </Card>
            </Link>
          ))}

        </div>
      )}
      {!isLoading && !items.length && (
        <Empty
          message={keyWords ? 'No se encontraron resultados' : 'Aún no hay citas registradas'}
        />
      )}
    </>
  );
};

View.propTypes = {
  isLoading: bool.isRequired,
  items: array.isRequired,
  companyOptions: array.isRequired,
  onCompanyChange: func.isRequired,
  keyWords: string.isRequired,
  onChangeKeywords: func.isRequired,
  onBranchChange: func.isRequired,
  branchOptions: array.isRequired,
  disableShow: bool.isRequired,
};

export default View;
