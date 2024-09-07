import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SearchBar, Button } from '@/components';
import { OAuthModal } from '@/app/components';
import { useModal } from '@/hooks';
import headerLogo from '@/static/images/header_logo.png';

const HeaderLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: 68px;
  border: 0.6px solid #b0bec5;
  border-radius: 12px;
  margin-top: 16px;
  margin-left: 30px;
  padding-left: 7%;
  background-color: #ffffff;
`;

const HeaderButtonBox = styled.div`
  margin: 0px 25px 0px 25px;
`;

const HeaderButtonText = styled.span`
  display: block;
  color: #0080ff;
  font-weight: 400;
  font-size: 14px;
  line-height: 16.8px;
  align-content: center;
`;

const ImageBox = styled.div`
  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  const { isVisibleModal, changeModalStatus } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push('/');
  };

  return (
    <HeaderLayout>
      <ImageBox onClick={handleClick}>
        <Image src={headerLogo} alt='logo' />
      </ImageBox>
      <SearchBar
        style={{ width: '559px', height: '38px' }}
        placeholderText='기업명을 입력해 보세요.'
      />
      <HeaderButtonBox onClick={() => changeModalStatus(true)}>
        <Button style={{ width: '81px', height: '38px' }}>
          <HeaderButtonText>시작하기</HeaderButtonText>
        </Button>
      </HeaderButtonBox>
      {isVisibleModal && <OAuthModal changeModalStatus={changeModalStatus} />}
    </HeaderLayout>
  );
};

export default Header;
