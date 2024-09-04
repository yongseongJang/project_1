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
}

const TableRow = ({ page }: TableRowProps) => {
  const { updateReportContextValue } = useContext(ReportContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const corporationName = searchParams.get('name');
  const corporationCode = searchParams.get('code');

  const { isLoading, isError, error, data } = useFetchReportListQuery('tableRow', corporationName, corporationCode, {
    page,
    size: 30,
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
