import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { TableRow } from '@/app/(group)/search/components';

const TableLayout = styled.div``;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRowElement = styled.tr`
  font-weight: 500;
  font-size: 15px;
  color: #00000099;
  text-align: center;
  border-bottom: 1px solid #00000033;

  th {
    height: 50px;
    padding: 13px 12px;
    line-height: 24px;
  }

  th:nth-child(1) {
    width: 7%;
  }

  th:nth-child(2) {
    width: 24%;
  }

  th:nth-child(3) {
    width: 34;
  }

  th:nth-child(4) {
    width: 14%;
  }

  th:nth-child(5) {
    width: 14%;
  }

  th:nth-child(6) {
    width: 7%;
  }
`;

const TableHeader = styled.th``;

interface TableProps {
  page: number;
}

const Table = ({ page }: TableProps) => {
  return (
    <TableLayout>
      <TableElement>
        <thead>
          <TableRowElement>
            <TableHeader>번호</TableHeader>
            <TableHeader>공시대상회사</TableHeader>
            <TableHeader>보고서명</TableHeader>
            <TableHeader>제출인</TableHeader>
            <TableHeader>접수일자</TableHeader>
            <TableHeader>비고</TableHeader>
          </TableRowElement>
        </thead>
        <tbody>
          {Array(page)
            .fill(null)
            .map((value, index) => (
              <TableRow
                key={`${page}_${index + 1}`}
                page={index + 1}
              />
            ))}
        </tbody>
      </TableElement>
    </TableLayout>
  );
};

export default Table;
