import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageButton from 'components/UploadZone/ImageButton';
import SheetSettings from 'components/UploadZone/SheetSettings';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select service management tool', 'Upload file', 'Sheet settings'];
}

const images = [
  {
    url: 'https://www.logiciel-libre.org/stock/img/product/logo-mantis.png',
    title: 'Mantis',
    width: '30%',
  },
  {
    url:
      'https://342sv54cwf1w32bxz36tm0bv-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/HP-service-manager-logo1.png',
    title: 'Sm9',
    width: '30%',
  },
  {
    url:
      'https://www.andeditions.org/wp-content/uploads/2015/11/grey-square-300x300.jpg',
    title: 'Digiself',
    width: '30%',
  },
];

export default function Upload() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [sourceTool, setSourceTool] = useState('');
  const [droppedFile, setDroppedFile] = useState([]);

  const [dataSheet, setdataSheet] = useState(0);
  const [lastRowData, setlastRowData] = useState(0);
  const [lastColumnData, setlastColumnData] = useState('A');

  const [slaSheet, setslaSheet] = useState(0);
  const [lastRowSla, setlastRowSla] = useState(0);
  const [lastColumnSla, setlastColumnSla] = useState('A');
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpload = () => {
    setActiveStep(0);
  };

  const chooseSourceTool = (tool) => {
    setSourceTool(tool);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleDropFile = (file) => {
    console.log(file);
    setDroppedFile(file);
  };
  const selectDataSheet = (params) => {
    console.log(params);
    setdataSheet(params);
  };
  const selectSlaSheet = (params) => {
    setslaSheet(params);
  };
  const selectLastRowData = (params) => {
    setlastRowData(params);
  };
  const selectLastRowSla = (params) => {
    selectLastRowSla(params);
  };
  const selectLastColumnData = (params) => {
    setlastColumnData(params);
  };
  const selectLastColumnSla = (params) => {
    setlastColumnSla(params);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <ImageButton images={images} chooseSourceTool={chooseSourceTool} />
        );
      case 1:
        return <DropzoneArea onChange={handleDropFile} filesLimit={1} />;
      case 2:
        return (
          <SheetSettings
            sourceTool={sourceTool}
            selectDataSheets={{
              selectDataSheet,
              selectSlaSheet,
              selectLastColumnData,
              selectLastColumnSla,
              selectLastRowData,
              selectLastRowSla,
            }}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleUpload}>Upload</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Typography className={classes.instructions}>
              source tool : {activeStep > 0 && sourceTool}
              <br />
              data file :{' '}
              {activeStep > 0 && droppedFile.length > 0 && droppedFile[0].name}
              <br />
              data sheet index :<br />
              sla data sheet index :
            </Typography>
            <React.Fragment>
              {activeStep !== 0 && (
                <React.Fragment>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </React.Fragment>
              )}
            </React.Fragment>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
}
