import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Image } from 'components';

export default class UserAvatar extends React.Component {
  state = {
    isUploading: false,
    avatarURL: 'http://via.placeholder.com/350x150',
    avatar: '',
  };

  handleUploadStart = () => this.setState({ isUploading: true });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, isUploading: false });
    firebase
      .storage()
      .ref('img/user')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    const { avatarURL } = this.state;
    return (
      <form>
        <label>
          {avatarURL && <Image src={avatarURL} />}
          <FileUploader
            hidden
            accept="image/*"
            name="avatar"
            storageRef={firebase.storage().ref('img/user')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
          />
        </label>
      </form>
    );
  }
}
