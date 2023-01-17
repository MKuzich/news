import React, { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePickKeyWords = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';

  const pickKeyWords = (text: string): string | React.ReactNode => {
    if (filter.trim() === '') return text;
    const regexp = new RegExp(filter.split(' ').join('|'), 'ig');
    const matchValue = text.match(regexp);
    if (matchValue) {
      return text.split(regexp).map((itm, idx, arr) => {
        if (idx < arr.length - 1) {
          const pick = matchValue.shift();
          return (
            <Fragment key={`${itm}-${idx}`}>
              {itm}
              <span style={{ backgroundColor: 'yellow' }}>{pick}</span>
            </Fragment>
          );
        }
        return <Fragment key={`${itm}-${idx}`}>{itm}</Fragment>;
      });
    }
    return text;
  };

  return pickKeyWords;
};
