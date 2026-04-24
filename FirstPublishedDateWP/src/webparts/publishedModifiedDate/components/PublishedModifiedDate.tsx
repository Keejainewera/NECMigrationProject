import * as React from 'react';
import { IPublishedModifiedDateProps } from './IPublishedModifiedDateProps';
import { SPHttpClient } from '@microsoft/sp-http';

const PublishedModifiedDate: React.FC<IPublishedModifiedDateProps> = ({ context }) => {

  const [modifiedDate, setModifiedDate] = React.useState<string>("N/A");
  const [firstPublishedDate, setFirstPublishedDate] = React.useState<string>("N/A");

  React.useEffect(() => {

    const itemId = context.pageContext.listItem?.id;

    if (!itemId) return;

    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Site Pages')/items(${itemId})?$select=Modified,FirstPublishedDate`;

    context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(res => res.json())
      .then(data => {
        setModifiedDate(data.Modified);
        setFirstPublishedDate(data.FirstPublishedDate);
      })
      .catch(err => console.error(err));

  }, []);

  const formatDate = (date: string): string => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Segoe UI',float: 'right' }}>
      <p><strong>First Published:</strong> {formatDate(firstPublishedDate)}&nbsp;&nbsp;&nbsp; 
      <strong>Last Modified:</strong> {formatDate(modifiedDate)}</p>
    </div>
  );
};

export default PublishedModifiedDate;