import styled from 'styled-components';

const SymbolLayout = styled.div`
  display: flex;
  position: relative;
  height: 133px;
  left: -57px;
`;

const SymbolVerticalBox = styled.div<{ width: string; height: string }>`
  padding-right: 10px;

  span:nth-child(1) {
    display: block;
    height: 42px;
    border-left: 16px solid #0080ff;
    border-top: 16px solid transparent;
  }

  span:nth-child(2) {
    display: block;
    height: 42px;
    border-left: 16px solid #0080ff;
    border-bottom: 16px solid transparent;
  }
`;

const SymbolHorizontalBox = styled.div<{ width: string; height: string }>`
  display: flex;
  position: absolute;
  left: -2%;

  span:nth-child(1) {
    display: inline-block;
    width: 42px;
    border-top: 16px solid #0080ff;
    border-left: 16px solid transparent;
  }

  span:nth-child(2) {
    display: inline-block;
    width: 42px;
    border-bottom: 16px solid #0080ff;
    border-right: 16px solid transparent;
  }
`;

const SymbolRectangle = styled.div<{ width: string; height: string }>`
  position: absolute;
  top: 12%;
  left: 62%;
  margin-top: 8px;
  margin-left: 10px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid #0080ff;
  border-radius: 0px 8px 8px 8px;
  box-shadow: 4px 4px 6px 0px #00000029;
`;

const SymbolParagraph = styled.p<{ fontWeight: string; fontSize: string }>`
  color: #0080ff;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  margin-left: 8px;
`;

interface SymbolProps {
  style: {
    width: string;
    height: string;
    fontWeight: string;
    fontSize: string;
  };
}

const Symbol = ({ style }: SymbolProps) => {
  return (
    <SymbolLayout>
      <SymbolVerticalBox {...style}>
        <span />
        <span />
      </SymbolVerticalBox>
      <div>
        <SymbolHorizontalBox {...style}>
          <span />
          <span />
        </SymbolHorizontalBox>
        <SymbolRectangle {...style}>
          <SymbolParagraph {...style}>
            Aim
            <br />
            dat.
          </SymbolParagraph>
        </SymbolRectangle>
      </div>
    </SymbolLayout>
  );
};

export default Symbol;
