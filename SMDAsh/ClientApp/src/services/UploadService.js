import axios from 'axios';

const UploadService = (sourceFile, onUploadProgress) => {
    const data = new FormData();
    data.set('SourceTool', sourceFile.sourceTool);
    data.append('DataFile', sourceFile.droppedFile, sourceFile.droppedFile.name);
    data.append('AllDataSheet', sourceFile.dataSheet);
    data.append('SlaDataSheet', sourceFile.slaSheet);
  
    return axios
      .post('/api/Upload', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });

};

export default UploadService;