import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const UserInfo = styled.div`
  margin-bottom: 1rem;
`;

const RolesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RoleItem = styled.li`
  background-color: #f0f0f0;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
`;

const MainPage = () => {
  const { token } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <h1>Welcome, {userProfile?.firstName}!</h1>
      <UserInfo>
        <p><strong>First Name:</strong> {userProfile?.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> {userProfile?.lastName || 'N/A'}</p>
        <p><strong>Username:</strong> {userProfile?.userName || 'N/A'}</p>
      </UserInfo>
      <h2>Roles:</h2>
      <RolesList>
        {userProfile?.roles.map((role, index) => (
          <RoleItem key={index}>
            <p><strong>Role Code:</strong> {role.roleCode}</p>
            <p><strong>Description:</strong> {role.roleDescription}</p>
            <p><strong>Authority:</strong> {role.authority}</p>
          </RoleItem>
        ))}
      </RolesList>
    </Container>
  );
};

export default MainPage;
