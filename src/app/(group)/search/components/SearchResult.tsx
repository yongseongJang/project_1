import styled from 'styled-components';

const SearchResultLayout = styled.div`
  width: 233px;
  height: 26px;
  padding-top: 8px;
`;

const SearchResultParagraph = styled.p`
  color: #00000099;
  font-weight: 500;
  font-size: 15px;
`;

const SearchResultText = styled.span`
  color: #0080ff;
  padding: 0px 8px;
`;

const SearchResultBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SearchResultCorpText = styled.span<{ $isSelected: boolean }>`
  color: #0080ff;
  margin: 12px 12px 0px 0px;
  cursor: pointer;
  border-bottom: 1px solid #0080ff;
  border-bottom-width: ${(props) => (props.$isSelected ? '1px' : '0px')};
`;

interface CorporationInfo {
  corp_code: string;
  count: number;
}

interface SearchResultProps {
  result: number;
  selectedCorporation: string;
  corporations: { [key: string]: CorporationInfo };
  onClickCorporation: (corporation: string) => void;
}

const SearchResult = ({
  result,
  selectedCorporation,
  corporations,
  onClickCorporation,
}: SearchResultProps) => {
  return (
    <SearchResultLayout>
      <SearchResultParagraph>
        검색결과 <SearchResultText>{result}</SearchResultText>
      </SearchResultParagraph>
      <SearchResultBox>
        {Object.keys(corporations).map((corporationName: string) => {
          return (
            <SearchResultCorpText
              $isSelected={selectedCorporation === corporationName}
              onClick={() => onClickCorporation(corporationName)}
            >{`${corporationName}(${corporations[corporationName].count})`}</SearchResultCorpText>
          );
        })}
      </SearchResultBox>
    </SearchResultLayout>
  );
};

export default SearchResult;
