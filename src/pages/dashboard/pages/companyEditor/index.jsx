import React, { useState } from 'react';
import useForm from 'src/hooks/useForm';
import { createNewCompany, updateCompany, getCompanyWithUser } from 'src/core/models/companies';
import useErrorMessage from 'src/hooks/useErrorMessage';
import { useHistory, useParams } from 'react-router';
import View from './view';
import useFetch from '../../../../hooks/useFetch';
import validators from '../../../../helpers/validators';
import useNotification from '../../../../notifications/useSession';

function CompanyEditor() {
  const setNotification = useNotification();
  const { getInputProps, values, setValues, handleValidateForm } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isLoading, setLoading] = useState(false);
  const { companyId } = useParams();
  const history = useHistory();

  const handleCreate = async () => {
    const errors = handleValidateForm({
      companyName: validators.companyName,
      userFullName: validators.userFullName,
      userEmail: validators.email,
      companyPhone: validators.phone,
      companyRazonSocial: validators.razonSocial,
      companyAddress: validators.address,
      companyRFC: validators.rfc,
      companyEmail: validators.email,
      password: validators.password,
    });

    if (Object.values(errors).length) return setErrorMessage(Object.values(errors)[0]);

    setLoading(true);
    const response = await createNewCompany({ ...values, repassword: values.password });
    if (response.status === 'success') {
      setNotification({ type: 'success', message: companyId ? 'Datos de la empresa actualizado' : 'Empresa creado correctamente' });
      setLoading(false);
      history.replace('/dashboard/companies');
    } else {
      setLoading(false);
      setErrorMessage(response.errorMessage);
    }
    return null;
  };

  const handleUpdate = async () => {
    setLoading(true);
    const response = await updateCompany(companyId, { ...values, repassword: values.password });
    if (response.status === 'success') {
      setNotification({ type: 'success', message: companyId ? 'Datos de la empresa actualizado' : 'Empresa creado correctamente' });
      history.replace('/dashboard/companies');
    } else {
      setLoading(false);
      setErrorMessage(response.errorMessage);
    }
  };

  const handleSave = () => (!companyId ? handleCreate() : handleUpdate());

  const handleFetch = async () => {
    if (companyId) {
      setLoading(true);
      const companyData = await getCompanyWithUser(companyId);
      console.log(companyData);
      if (!companyData) history.replace('/dashboard/companies');
      else {
        setValues({
          companyName: companyData.company.name,
          userFullName: companyData.fullName,
          userEmail: companyData.email,
          password: companyData.password,
          companyPhone: companyData.company.phone,
          companyRazonSocial: companyData.company.razonSocial,
          companyAddress: companyData.company.address,
          companyRFC: companyData.company.rfc,
          companyEmail: companyData.company.email,
        });
      }
      setLoading(false);
    }
  };

  useFetch(handleFetch);

  return (
    <View
      getInputProps={getInputProps}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onSave={handleSave}
      isEditing={!!companyId}
    />
  );
}

export default CompanyEditor;
