'use client';

import styled from 'styled-components';

import { Header, Footer } from '@/app/(group)/components';

const GroupLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f3f5;
  height: 100%;
`;

const ContentBox = styled.div`
  width: 95%;
  height: calc(100% - 140px);
  border: 0.6px solid #b0bec5;
  border-radius: 14px;
  margin-top: 16px;
  margin-left: 30px;
  background-color: #ffffff;
`;

const GroupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GroupLayoutContainer>
      <Header />
      <ContentBox>{children}</ContentBox>
      <Footer />
    </GroupLayoutContainer>
  );
};

export default GroupLayout;
