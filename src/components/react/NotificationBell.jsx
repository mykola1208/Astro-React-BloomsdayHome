import React from 'react';
import { StreamApp, NotificationDropdown } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
const appId = import.meta.env.PUBLIC_GETSTREAM_APP_ID;
const apiKey = import.meta.env.PUBLIC_GETSTREAM_FEED_KEY;

function NotificationBell({ token }) {
  return (
    <StreamApp appId={appId} apiKey={apiKey} token={token}>
      <NotificationDropdown notify />
    </StreamApp>
  )
}

export default NotificationBell;