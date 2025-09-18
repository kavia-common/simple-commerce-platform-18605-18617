import React, { useEffect, useState } from 'react';
import { meApi } from '../api/hooks';

/**
 * PUBLIC_INTERFACE
 * Profile page with Ocean styling.
 */
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
    <>
      <div className="page-heading">
        <h2 className="h1">Your Profile</h2>
        <span className="subtitle">Manage your account</span>
      </div>
      <div className="card">
        <div className="card-body" style={{ display: 'grid', gap: 8 }}>
          <div><strong>Username:</strong> {user.username}</div>
          {user.email && <div><strong>Email:</strong> {user.email}</div>}
        </div>
      </div>
    </>
  );
}
