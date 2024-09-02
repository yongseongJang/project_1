'use client';

import { createElement, useState, useRef, forwardRef } from 'react';
import styled from 'styled-components';

import { Loading } from '@/app/(group)/components';
import { ReportDescription } from '.';
import { useFetchReportQuery, useDescribeMutation } from '@/queries';

import { data as data1 } from '../reportContent1.ts';
import { data as data2 } from '../reportContent2.ts';
import { data as data3 } from '../reportContent3.ts';

const ReportContentLayout = styled.div`
  position: relative;
`;

const ReportContentH2 = styled.h2`
  color: #0080ff;
  margin: 30px 0px;
`;

const ReportContentH3 = styled.h3`
  margin: 30px 0px;
`;

const ReportContentDiv = styled.div`
  margin: 15px 0px;
`;

const ReportContentTable = styled.table``;

const ReportContentBorderTable = styled.table`
  border-collapse: collapse;
  border: 1px solid;

  th {
    border: 1px solid;
  }

  td {
    border: 1px solid;
  }
`;

interface ReportContentProps {
  reportID: string;
  indexlabel: string;
}

const convertTag = (tag: string, style: { [key: string]: string }) => {
  switch (tag) {
    case 'h2':
      return ReportContentH2;
    case 'h3':
      return ReportContentH3;
    case 'div':
      return ReportContentDiv;
    case 'table':
      if (style.border === '0') {
        return ReportContentTable;
      } else {
        return ReportContentBorderTable;
      }
    default:
      return tag;
  }
};

const createElementRecursive = (tag: string, props: any, children: any) => {
  return createElement(
    convertTag(tag, props),
    props,
    ...children.map((child: any) => {
      return typeof child === 'string'
        ? child
        : createElementRecursive(child.tag, child.attrs, child.children);
    }),
  );
};

const ReportContent = forwardRef<ReportContentProps, { [key: string]: HTMLElement }>(
  ({ reportID, indexLabel }, ref) => {
    const [isVisibleBtn, setIsVisibleBtn] = useState<boolean>(false);
    const [isVisibleDescription, setIsVisibleDescription] = useState<boolean>(false);
    const [btnPosition, setBtnPosition] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });
    const textRef = useRef<string>('');
    const btnRef = useRef<null | HTMLDivElement>(null);
    const mutation = useDescribeMutation();
    const { isLoading, isError, error } = useFetchReportQuery(reportID, indexLabel);

    // if (isLoading) {
    //   return <Loading style={{ width: '90px', height: '90px' }} isVisibleText={true} />;
    // }

    // if (isError || mutation.isError) {
    //   throw error
    // }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === btnRef.current) return;

      const content = window.getSelection().toString();

      if (!content || content == textRef.current) {
        setIsVisibleBtn(false);
        textRef.current = '';
      } else {
        setIsVisibleBtn(true);
        textRef.current = content;
      }

      const position = e.currentTarget.getBoundingClientRect();
      setBtnPosition({ top: e.clientY - position.top, left: e.clientX - position.left });
    };

    const handleClick = (e: React.ClickEvent<HTMLDivElement>) => {
      mutation.mutate(textRef.current);
      setIsVisibleBtn(false);
    };

    return (
      <ReportContentLayout
        ref={(element) => (ref.current[indexLabel] = element)}
        onMouseUp={handleMouseUp}
      >
        {data1 && createElementRecursive(data1.tag, data1.attrs, data1.children)}
        {data2 && createElementRecursive(data2.tag, data2.attrs, data2.children)}
        {data3 && createElementRecursive(data3.tag, data3.attrs, data3.children)}
        {isVisibleBtn && (
          <div
            ref={btnRef}
            style={{
              background: 'red',
              top: btnPosition.top,
              left: btnPosition.left,
              position: 'absolute',
            }}
            onClick={handleClick}
          >
            go!go!
          </div>
        )}
        {mutation.isPending && (
          <div style={{ top: btnPosition.top, left: btnPosition.left, position: 'absolute' }}>
            <Loading style={{ width: '30px', height: '30px' }} isVisibleText={false} />;
          </div>
        )}
        {mutation.isSuccess && (
          <div style={{ top: btnPosition.top, left: btnPosition.left, position: 'absolute' }}>
            <ReportDescription description={mutation.data} />
          </div>
        )}
      </ReportContentLayout>
    );
  },
);

export default ReportContent;