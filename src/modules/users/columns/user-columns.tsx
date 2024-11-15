import type { User } from '@/modules/users/queries/get-user.ts';
import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { defaultCountries, parseCountry } from 'react-international-phone';

const useUserColumns = () => {
  const navigate = useNavigate();
  return useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        header: 'Actions',
        size: 80,
        Cell: ({ row }) => {
          return (
            <Tooltip label={`Go to ${row.original.name}`}>
              <ActionIcon
                variant={'transparent'}
                size={'xs'}
                onClick={async () => {
                  await navigate({
                    to: '/users/$user',
                    params: {
                      user: `${row.original.id}`,
                    },
                  });
                }}
              >
                <IconExternalLink />
              </ActionIcon>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 200,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 200,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        size: 200,
        accessorFn: ({ updatedAt }) => dayjs(updatedAt).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'height',
        header: 'Height',
        size: 100,
        Cell: ({ cell }) =>
          cell.getValue<number>() ? <Text fz={'sm'}>{cell.getValue<number>()} cm</Text> : null,
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
        size: 100,
        Cell: ({ cell }) =>
          cell.getValue<number>() ? <Text fz={'sm'}>{cell.getValue<number>()} kg</Text> : null,
      },
      {
        accessorKey: 'targetWeight',
        header: 'Target Weight',
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue<number>() ? <Text fz={'sm'}>{cell.getValue<number>()} kg</Text> : null,
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 150,
        accessorFn: ({ country }) => {
          const foundCountry = defaultCountries.find(
            (c) => parseCountry(c).iso2.toUpperCase() === country?.toUpperCase()
          );
          return foundCountry ? parseCountry(foundCountry).name : country;
        },
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 150,
      },
      {
        accessorKey: 'occupation',
        header: 'Occupation',
        size: 200,
      },
      {
        header: 'Date of Birth',
        size: 200,
        accessorFn: ({ dateOfBirth }) =>
          dateOfBirth
            ? dayjs(dateOfBirth).isValid()
              ? dayjs(dateOfBirth).format('DD/MM/YYYY')
              : 'Invalid Date'
            : 'N/A',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 100,
      },
      {
        accessorKey: 'activityLevel',
        header: 'Activity Level',
        size: 200,
      },
    ],
    [navigate]
  );
};

export default useUserColumns;
