import React from 'react';
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
      storageRef,
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
              storageRef={storageRef}
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
