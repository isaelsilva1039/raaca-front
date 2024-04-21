import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function CustomPagination({ currentPage, totalPages, onPageChange }:any) {
  const handleChange = (event:any, value: any) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        showFirstButton
        showLastButton
        color="secondary"
        siblingCount={1}
        boundaryCount={1}
        // Localização para português
        getItemAriaLabel={(type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ir para '}página ${page}`;
          }
          if (type === 'first') {
            return 'Primeira página';
          }
          if (type === 'last') {
            return 'Última página';
          }
          if (type === 'next') {
            return 'Próxima página';
          }
          // 'previous'
          return 'Página anterior';
        }}
      />
    </Stack>
  );
}

export default CustomPagination;
