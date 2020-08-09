import React, { Fragment } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function SheetSettings(props) {
  const selectDataSheet = (n) => {
    props.selectDataSheets.selectDataSheet(n);
  };
  const selectSlaSheet = (n) => {
    props.selectDataSheets.selectSlaSheet(n);
  };
  const selectLastColumnData = (n) => {
    props.selectDataSheets.selectLastColumnData(n);
  };
  const selectLastColumnSla = (n) => {
    props.selectDataSheets.selectLastColumnSla(n);
  };
  const selectLastRowData = (n) => {
    props.selectDataSheets.selectLastRowData(n);
  };
  const selectLastRowSla = (n) => {
    props.selectDataSheets.selectLastRowSla(n);
    console.log(n);
  };
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      flexWrap='wrap'
    >
      <Box display='flex' marginBottom='20px'>
        <TextField
          id='data-sheet'
          label='Data sheet'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: '0', max: '99', step: '1' }}
          onChange={(e) => selectDataSheet(e.target.value)}
        />
        {/*
        <TextField
          id='data-last-row'
          label='Data last row'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: '0', step: '1' }}
          onChange={(e) => selectLastRowData(e.target.value)}
        />
        <TextField
          id='data-last-column'
          label='Data last column'
          type='text'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => selectLastColumnData(e.target.value)}
        />
        */}
      </Box>
      {props.sourceTool === 'Digiself' && (
        <Box display='flex'>
          <TextField
            id='sla-sheet'
            label='Sla sheet'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: '0', max: '99', step: '1' }}
            onChange={(e) => selectSlaSheet(e.target.value)}
          />
          {/*
          <TextField
            id='sla-last-row'
            label='Sla last row'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: '0', step: '1' }}
            onChange={(e) => selectLastRowSla(e.target.value)}
          />
          <TextField
            id='sla-last-column'
            label='Sla last column'
            type='text'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => selectLastColumnSla(e.target.value)}
          />
        */}
        </Box>
      )}
    </Box>
  );
}
