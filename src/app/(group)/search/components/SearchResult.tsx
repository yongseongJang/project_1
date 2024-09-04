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

interface SearchResultProps {
  result: number;
}

const SearchResult = ({
  result,
}: SearchResultProps) => {
  return (
    <SearchResultLayout>
      <SearchResultParagraph>
        검색결과 <SearchResultText>{result}</SearchResultText>
      </SearchResultParagraph>
    </SearchResultLayout>
  );
};

export default SearchResult;
