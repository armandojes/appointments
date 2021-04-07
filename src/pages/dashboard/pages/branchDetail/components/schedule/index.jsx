/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import branchModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import Card from 'src/components/card';
import { func } from 'prop-types';
import Day from '../day';
import mapObjects from '../../../../../../helpers/mapObject';
import orderDays from './orderDays';
import EditScheduleModal from '../edit_schedule';
import DisabledSchedulePerDayEditor from '../disabledSchedulePeerDayEditor';
import useNotification from '../../../../../../notifications/useSession';

const Schedule = () => {
  const setNotification = useNotification();
  const [branch, setBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { branchId } = useParams();
  const [dayEditinSchedule, setDayEditinSchedule] = useState();
  const [dayEditingDisableds, setDayEditingDisableds] = useState(null);

  const handleModalScheduleClose = () => setDayEditinSchedule(null);
  const handleEditClik = (dayData) => setDayEditinSchedule(dayData);
  const handleDisabledsClick = (dayData) => setDayEditingDisableds(dayData);
  const handleModalDisablesClose = () => setDayEditingDisableds(null);

  // data fetcher from API
  const handlefetch = async () => {
    const branchData = await branchModel.getSingle(branchId);
    setBranch({ ...branchData, days: orderDays(branchData.days) });
    setIsLoading(false);
  };

  const handleStatusChange = async (dayName, newStatus) => {
    const { status } = await branchModel.updateDayStatus(branchId, dayName, newStatus);
    handlefetch();
    if (status === 'success') setNotification({ type: 'success', message: 'El estado se cambió correctamente!' });
    else setNotification({ type: 'success', message: 'Error al actualizar los datos!' });
  };

  // fecth initial Data
  useFetch(handlefetch, []);

  if (isLoading) return null;

  return (
    <>
      <DisabledSchedulePerDayEditor
        data={dayEditingDisableds || {}}
        open={!!dayEditingDisableds}
        onClose={handleModalDisablesClose}
      />
      <EditScheduleModal
        data={dayEditinSchedule || {}}
        open={!!dayEditinSchedule}
        onClose={handleModalScheduleClose}
        onSuccess={handlefetch}
      />
      {!isLoading && (
        <Card>
          <Text color={colors.blue} fontWeight="bold" fontSize="1.2em" marginBottom="1em">Horarios y días hábiles</Text>
          {mapObjects(branch.days, (value, keyname) => (
            <Day
              onDisabledClick={() => handleDisabledsClick({ ...value, day: keyname, branchId })}
              onEditClick={() => handleEditClik({ ...value, day: keyname, branchId })}
              key={keyname}
              label={keyname}
              onStatusChange={(newValue) => handleStatusChange(keyname, newValue)}
              {...value}
            />
          ))}
        </Card>
      )}
    </>
  );
};

Schedule.propTypes = {
  setNotification: func.isRequired,
};

export default Schedule;
