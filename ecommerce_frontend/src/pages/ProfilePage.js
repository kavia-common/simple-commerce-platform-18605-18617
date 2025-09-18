import React, { useEffect, useState } from 'react';
import { meApi } from '../api/hooks';

// PUBLIC_INTERFACE
export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await meApi();
        setUser(me);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  if (!user) return <div className="helper">Please login to view your profile.</div>;

  return (
    <div className="section">
      <div className="title" style={{ fontSize: 22 }}>Your Profile</div>
      <div className="card" style={{ padding: 16 }}>
        <div><strong>Username:</strong> {user.username}</div>
        {user.email && <div><strong>Email:</strong> {user.email}</div>}
      </div>
    </div>
  );
}
