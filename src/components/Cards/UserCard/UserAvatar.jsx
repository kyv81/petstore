import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Image } from 'components';

export default class UserAvatar extends React.Component {
  render() {
    const {
      imgUrl,
      onUploadStart,
      onUploadError,
      onUploadSuccess,
      isEditable,
    } = this.props;
    return (
      <form>
        <label>
          <Image src={imgUrl} />
          {isEditable && (
            <FileUploader
              hidden
              accept="image/*"
              name="avatar"
              storageRef={firebase.storage().ref('img/user')}
              onUploadStart={onUploadStart}
              onUploadError={onUploadError}
              onUploadSuccess={onUploadSuccess}
            />
          )}
        </label>
      </form>
    );
  }
}
