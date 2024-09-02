import { useContext } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';

import { CorporationClassIcon } from '@/app/(group)/components';
import { RemarkIcon } from '@/app/(group)/search/components';
import { ReportContext } from '@/contexts';
import { useFetchReportListQuery } from '@/queries';

const TableRowLayout = styled.tr`
  border-bottom: 1px solid #0000001a;
  height: 50px;
  cursor: pointer;

  &:hover {
    background-color: #0000000a;
  }

  &:focus {
    border: 0px;
  }
`;

const TableRowElement = styled.td`
  color: #000000e5;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;

  &:focus {
    border: 0px;
  }
`;

const TableRowBox = styled.div<{ $hasLeftPadding: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: ${(props) => (props.$hasLeftPadding ? '40px;' : '0px')};

  &:focus {
    border: 0px;
  }
`;

interface TableRowProps {
  page: number;
  selectedCorporation: string;
}

const data = {
  items: [
    {
      corp_cls: '',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240611000462',
      filer_name: '송재혁',
      reception_date: '20240611',
      remark: '공',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240607000054',
      filer_name: '윤주한',
      reception_date: '20240607',
      remark: '유',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240607000045',
      filer_name: '박순철',
      reception_date: '20240607',
      remark: '코',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240607000008',
      filer_name: '김동욱',
      reception_date: '20240607',
      remark: '채',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240604000031',
      filer_name: '노태문',
      reception_date: '20240604',
      remark: '넥',
    },
  ],
  total: 2819,
  page: 1,
  pages: 10,
  size: 50,
  matched_corps_meta: {
    삼성전자: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },
    삼성전자1: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산1: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },

    삼성전자2: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산2: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },
    삼성전자4: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산5: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },
  },
  selected_corp: '',
};

const TableRow = ({ page, selectedCorporation }: TableRowProps) => {
  console.log('TableRow', page);
  const { updateReportContextValue } = useContext(ReportContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const corporationName = searchParams.get('name');
  const corporationCode = searchParams.get('code');

  const { isLoading, isError, error } = useFetchReportListQuery(corporationName, corporationCode, {
    page,
    size: 30,
    selected_corp: selectedCorporation,
  });

  const handleClickRow = (
    corporationClass: string,
    corporationName: string,
    reportTitle: string,
    receptionNumber: string,
  ) => {
    updateReportContextValue({ corporationClass, corporationName, reportTitle });
    router.push(`/report?receptionNumber=${receptionNumber}`);
  };

  return (
    <>
      {data.items.map((item) => {
        const {
          corp_cls: corporationClass,
          corp_name: corporationName,
          report_name: reportTitle,
          reception_number: receptionNumber,
        } = item;
        return (
          <TableRowLayout
            key={`${item.reception_number}`}
            onClick={() =>
              handleClickRow(corporationClass, corporationName, reportTitle, receptionNumber)
            }
          >
            <TableRowElement>{page}</TableRowElement>
            <TableRowElement>
              <TableRowBox $hasLeftPadding={!corporationClass}>
                {corporationClass && <CorporationClassIcon corporationClass={corporationClass} />}
                {corporationName}
              </TableRowBox>
            </TableRowElement>
            <TableRowElement>{reportTitle}</TableRowElement>
            <TableRowElement>{item.filer_name}</TableRowElement>
            <TableRowElement>{item.reception_date}</TableRowElement>
            <TableRowElement>
              {item.remark && <RemarkIcon remarkType={item.remark} />}
            </TableRowElement>
          </TableRowLayout>
        );
      })}
    </>
  );
};

export default TableRow;
