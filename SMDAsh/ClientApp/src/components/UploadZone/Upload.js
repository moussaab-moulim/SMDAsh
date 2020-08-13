import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageButton from 'components/UploadZone/ImageButton';
import SheetSettings from 'components/UploadZone/SheetSettings';
import { DropzoneArea } from 'material-ui-dropzone';
import UploadService from 'services/UploadService';
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
  const [droppedFile, setDroppedFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const [dataSheet, setdataSheet] = useState(0);

  const [slaSheet, setslaSheet] = useState(0);

  const [uploaded, setuploaded] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [currentFile, setCurrentFile] = useState(undefined);

  let btnRef = useRef();

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpload = () => {
    setProgress(0);
    let current = {
      sourceTool: sourceTool,
      droppedFile: droppedFile,
      dataSheet: dataSheet,
      slaSheet: slaSheet,
    };
    setCurrentFile(current);
    UploadService(current, (event) => {
      setProgress(Math.round((95 * event.loaded) / event.total));
      console.log(progress);
    })
      .then((response) => {
        setUploadMessage('File uploaded successfully');
        setProgress(100);

        console.log(response);
        return response;
      })
      .catch(() => {
        setProgress(0);
        setUploadMessage('Could not upload the file!');
        setuploaded(false);

        setCurrentFile(undefined);
        if (btnRef.current) {
          btnRef.current.removeAttribute('disabled');
        }
      })
      .finally(() => {
        setuploaded(true);
      });

    setDroppedFile(undefined);
  };
  const handleReset = () => {
    setActiveStep(0);
    setuploaded(false);
    setSourceTool('');
    setUploadMessage('');
    setdataSheet(0);
    setslaSheet(0);
    setDroppedFile(undefined);
    setCurrentFile(undefined);
  };
  const chooseSourceTool = (tool) => {
    setSourceTool(tool);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleDropFile = (file) => {
    console.log(file[0]);
    setDroppedFile(file[0]);
  };
  const selectDataSheet = (params) => {
    console.log(params);
    setdataSheet(params);
  };
  const selectSlaSheet = (params) => {
    setslaSheet(params);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <ImageButton images={images} chooseSourceTool={chooseSourceTool} />
        );
      case 1:
        return (
          <DropzoneArea
            onChange={handleDropFile}
            filesLimit={1}
            maxFileSize={50000000}
          />
        );
      case 2:
        return (
          <SheetSettings
            sourceTool={sourceTool}
            selectDataSheets={{
              selectDataSheet,
              selectSlaSheet,
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
              {!uploaded ? 'Ready to upload' : uploadMessage}
              <br />
              {currentFile && `${progress} %`}
            </Typography>
            {!uploaded ? (
              <Button
                onClick={handleUpload}
                variant='contained'
                color='primary'
                disabled={!!currentFile}
              >
                Upload
              </Button>
            ) : (
              <Button onClick={handleReset}>Reset</Button>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Typography className={classes.instructions}>
              source tool : {activeStep > 0 && sourceTool}
              <br />
              data file : {activeStep > 0 && droppedFile && droppedFile.name}
              <br />
              data sheet index : {activeStep > 1 && dataSheet}
              <br />
              sla data sheet index : {activeStep > 1 && slaSheet}
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
                    disabled={activeStep === 1 && !droppedFile}
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
