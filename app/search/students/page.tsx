'use client';
import React, { FC, useState } from 'react';
import { SelectAsync } from '@/app/components/SelectAsync';
import { ActionIcon, Center, Loader, Text } from '@mantine/core';
import StudentsTable from '@/app/components/StudentsTable/StudentsTable';
import { useStudentsFilterQuery } from './useStudentsFilterQuery';
import { Handbook } from '@/types/handbook';
import { IconReload } from '@tabler/icons-react';
import { useStudentDelete } from './useStudentDelete';

interface SelectedFilters {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  enrollmentYear: Handbook | null;
}

const Students: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    firstName: null,
    lastName: null,
    birthDate: null,
    enrollmentYear: null,
  });

  const { data, refetch, filterOptions, isLoading } = useStudentsFilterQuery(selectedFilters);
  const { mutateAsync: deleteStudent } = useStudentDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Имя ученика"
              options={filterOptions.studentsFirstNameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, firstName: null }));
              }}
              value={selectedFilters.firstName}
              onChange={async item => {
                setSelectedFilters(prev => ({ ...prev, firstName: item }));
              }}
            />
            <SelectAsync
              className="w-full"
              placeholder="Фамилия ученика"
              options={filterOptions.studentsLastNameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, lastName: null }));
              }}
              value={selectedFilters.lastName}
              onChange={item => setSelectedFilters(prev => ({ ...prev, lastName: item }))}
            />

            <SelectAsync
              className="w-full"
              placeholder="Дата рождения"
              options={filterOptions.studentsBirthDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, birthDate: null }));
              }}
              value={selectedFilters.birthDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, birthDate: item }))}
            />

            <SelectAsync
              className="w-full"
              placeholder="Год поступления"
              options={filterOptions.studentsEnrollmentYearOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, enrollmentYear: null }));
              }}
              value={selectedFilters.enrollmentYear}
              onChange={item => setSelectedFilters(prev => ({ ...prev, enrollmentYear: item }))}
            />
          </div>
          <ActionIcon onClick={() => refetch()} size={36} color="#7c68ee">
            <IconReload size={18} />
          </ActionIcon>
        </div>

        {isLoading ? (
          <Center h="60vh">
            <Loader color="#7c68ee" />
          </Center>
        ) : data.length === 0 ? (
          <Center h="30vh">
            <Text fz={20}>Ничего не найдено</Text>{' '}
          </Center>
        ) : (
          <StudentsTable withDelete deleteRows={deleteStudent} data={data} />
        )}
      </div>
    </div>
  );
};

export default Students;
