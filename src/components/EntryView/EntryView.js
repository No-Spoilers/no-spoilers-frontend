import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import sortByTimestamp from "../../lib/sortByTimestamp";
import urlText from "../../lib/urlText";
import { reduxConnect } from "../../redux/tools";
import "./EntryView.css";

const bookOrder = (bookList) => {
  return Object.values(bookList)
    .sort(sortByTimestamp(1))
    .map(book => book.bookId);    
}

const mostRecentEntry = (text, spoilId, orderedBookList) => {
  if (text?.[spoilId]) return text[spoilId];

  const bookPosition = orderedBookList.findIndex(entry => spoilId === entry);

  if (orderedBookList.length > bookPosition + 1) {
    return mostRecentEntry(text, orderedBookList[bookPosition + 1], orderedBookList);
  }

  return null;
}

const EntryView = (props) => {
  const entryId = useParams().contentId;
  const seriesId = props.lookUp[entryId];

  const { seriesDetails, getSeriesDetail } = props;

  const entry = seriesDetails?.[seriesId]?.entries?.[entryId] || {};

  useState(() => {
    if (!entry.name && !props.fetching) {
      getSeriesDetail(entryId);
    }
  }, [entry, getSeriesDetail, entryId]);


  const seriesName = seriesDetails?.[seriesId]?.name || '';
  const breadcrumb = seriesName ? `>> ${seriesName}` : ''; // TODO: Expand to include book when linked from bookview

  const spolierLevelBookId = props.userSpoilerLevel[seriesId];
  const bookList = seriesDetails?.[seriesId]?.books;
  const spoilerLevelBookName = bookList?.[spolierLevelBookId]?.name || '-- no level set --';

  let spoilerLevelText = (
    <div>
      <p>This article potentially contains spoilers through <span className="spoiler-level-book">{spoilerLevelBookName}.</span></p>
    </div>
  )

  const entryText = mostRecentEntry(entry.text, spolierLevelBookId, bookOrder(bookList));

  const entryViewHtml = entryText ? entryText : <p>{entry.name} is mentioned in {seriesName}.</p>;

  return (
    <div className="entry-view-container">
      <Link to={`/${seriesId}/${urlText(seriesName)}`}>
        <div className='breadcrumb-text'>{breadcrumb}</div>
      </Link>
      <div className="spoiler-level-warning">
        {spoilerLevelText}
      </div>

      <div className="entry-html">
        {entryViewHtml}
      </div>
    </div>
  )
}

export default reduxConnect(EntryView);