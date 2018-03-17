import React from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';

import { Image } from 'components';

export default class UserAvatar extends React.PureComponent {
  static propTypes = {
    imgUrl: PropTypes.string,
    isEditable: PropTypes.bool,
    storageRef: PropTypes.object,
    onUploadStart: PropTypes.func.isRequired,
    onUploadError: PropTypes.func.isRequired,
    onUploadSuccess: PropTypes.func.isRequired,
  };

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
