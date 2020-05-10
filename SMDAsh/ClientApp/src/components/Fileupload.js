import React from 'react';

import { post } from 'axios';

class Fileupload extends React.Component {
  constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);

    this.state = {
      DataFile: '',
        SourceTool: '',
        test:'home'
    };
  }

  async submit(e) {
      e.preventDefault();
      this.setState({test:'submited'})

    const url = `api/Upload`;

    const formData = new FormData();

      formData.append('body', this.state.DataFile);
    formData.append('body', this.state.SourceTool);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return post(url, formData, config);
  }

  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }
  setSourceTool(e) {
    this.setState({ SourceTool: e.target.value });
  }

  render() {
    return (
      <div className='container-fluid'>
        <form onSubmit={(e) => this.submit(e)}>
          <div className='col-sm-12 btn btn-primary'>File Upload</div>

          <h1>File Upload</h1>

          <input type='file' onChange={(e) => this.setFile(e)} />
                <input type='text' onChange={(e) => this.setSourceTool(e)} />
                <div>{this.state.test}</div>
          <button className='btn btn-primary' type='submit'>
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default Fileupload;
