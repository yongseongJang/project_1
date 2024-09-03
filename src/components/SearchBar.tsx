import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import searchImage from '@/static/images/search.png';
import { useFetchCorporationQuery } from '@/queries';
import { useDebounce } from '@/hooks'

const SearchBarLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  position: relative;
`;

const SearchBarBox = styled.div<{ $width: string; $height: string; $isDropDown: boolean }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  padding: 0px 24px;
  border: ${(props) => (props.$isDropDown ? '1px solid #0080FF' : '1px solid #b0bec5')};
  border-bottom: ${(props) => (props.$isDropDown ? '0px' : '1px solid #b0bec5')};
  border-radius: ${(props) => (props.$isDropDown ? '19px 19px 0px 0px' : '100px')};

  > img {
    cursor: pointer;
  }
`;

const SearchBarInput = styled.input`
  flex-grow: 1;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
  text-align: center;
  color: #000000b2;
  margin-left: 32px;
  margin-right: 8px;

  &::placeholder {
    font-weight: 500;
    font-size: 16px;
    line-height: 19.2px;
    text-align: center;
    color: #000000b2;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const SearchBarDropDown = styled.div<{ $width: string; $height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => props.$width};
  border: 0.6px solid #0080ff;
  border-top: 0px;
  border-radius: 0px 0px 19px 19px;
  background-color: #fff;

  position: absolute;
  top: ${(props) => props.$height};
  z-index: 3400;
`;

const SearchBarDropDownItem = styled.div<{ $isFocused: boolean }>`
  height: 34px;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
  ${(props) => props.$isFocused && 'background-color: #0000000a'};

  &:hover {
    background-color: #0000000a;
  }
`;

const SearchBarDropDownItemText = styled.span`
  color: #0080ff;
`;

interface SearchBarProps {
  style: {
    width: string;
    height: string;
  };
  placeholderText: string;
}

const SearchBar = ({ style, placeholderText }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounce = useDebounce()
  const layoutRef = useRef<null>();
  const inputRef = useRef<null>();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [corporationName, setCorporationName] = useState<string>(searchParams.get('name') ?? '');
  const [debouncedCorporationName, setDebouncedCorporationName] = useState<string>(corporationName);
  const { isLoading, isError, error, data } = useFetchCorporationQuery(debouncedCorporationName);

  useEffect(() => {
    document.addEventListener('click', handleFocusOut);

    return () => {
      document.removeEventListener('click', handleFocusOut);
    };
  }, []);

  const handleFocusOut = (e) => {
    if (!layoutRef.current.contains(e.target)) {
      setIsFocus(false);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorporationName(e.target.value);
    debounce(() => setDebouncedCorporationName(e.target.value), 500)
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (focusedItemIndex === -1) {
        inputRef.current.blur();
        setIsFocus(false);
        setFocusedItemIndex(-1);

        router.push(`/search?name=${corporationName}`);
      } else {
        const name = data[focusedItemIndex].stock_name;
        const code = data[focusedItemIndex].corp_code;

        inputRef.current.blur();
        setIsFocus(false);
        setFocusedItemIndex(-1);

        setCorporationName(name);
        router.push(`/search?name=${name}&&code=${code}`);
      }
    } else if (e.key === 'ArrowDown' && data) {
      if (focusedItemIndex + 1 < data.length) {
        setFocusedItemIndex(focusedItemIndex + 1);
      } else if (data.length) {
        setFocusedItemIndex(0);
      }
    } else if (e.key === 'ArrowUp') {
      if (focusedItemIndex >= 0) {
        setFocusedItemIndex(focusedItemIndex - 1);
      }
    }
  };

  const handleFocusInput = () => {
    setIsFocus(true);
  };

  const handleClickImage = (e: React.ClickEvent<HTMLImageElement>) => {
    setIsFocus(false);
    setFocusedItemIndex(-1);

    router.push(`/search?name=${corporationName}`);
  };

  const handleClickDropDownItem = (corporationName: string, corporationCode: string) => {
    search(corporationName, corporationCode);
  };

  const handleMouseEnterDropDownItem = (index: number) => {
    setFocusedItemIndex(index);
  };

  const handleMouseLeaveDropDownItem = (e: React.MouseEvent<HTMLDivElement>) => {
    setFocusedItemIndex(-1);
  };

  const search = (corporationName: string, corporationCode: string) => {
    setIsFocus(false);
    setFocusedItemIndex(-1);

    setCorporationName(corporationName);
    router.push(`/search?name=${corporationName}&code=${corporationCode}`);
  };

  return (
    <SearchBarLayout ref={layoutRef}>
      <SearchBarBox
        $width={style.width}
        $height={style.height}
        $isDropDown={isFocus && data?.length > 0}
      >
        <SearchBarInput
          ref={inputRef}
          placeholder={placeholderText}
          value={focusedItemIndex === -1 ? corporationName : data[focusedItemIndex].stock_name}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDownInput}
          onFocus={handleFocusInput}
        />
        <Image src={searchImage} alt='search image' onClick={handleClickImage} />
      </SearchBarBox>
      {isFocus && data?.length > 0 && (
        <SearchBarDropDown $width={style.width} $height={style.height}>
          {data?.map((item, index) => {
            return (
              <SearchBarDropDownItem
                key={item.corp_code}
                onClick={() => handleClickDropDownItem(item.stock_name, item.corp_code)}
                onMouseEnter={() => handleMouseEnterDropDownItem(index)}
                onMouseLeave={handleMouseLeaveDropDownItem}
                $isFocused={index === focusedItemIndex}
              >
                <SearchBarDropDownItemText>
                  {item.stock_name.slice(0, corporationName.length)}
                </SearchBarDropDownItemText>
                <>{item.stock_name.slice(corporationName.length)}</>
              </SearchBarDropDownItem>
            );
          })}
        </SearchBarDropDown>
      )}
    </SearchBarLayout>
  );
};

export default SearchBar;
