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

const earliestMentionId = (text = {}, orderedBookList, index = 0) => {
  if (text[orderedBookList[index]]) return orderedBookList[index];

  if (orderedBookList.length > index + 1) {
    return earliestMentionId(text, orderedBookList, index + 1)
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

  const spoilerChangeHandler = (event) => {
    props.setSpoilerLevel(seriesId, event.target.value);
  }

  const seriesName = seriesDetails?.[seriesId]?.name || '';
  const breadcrumb = seriesName ? `>> ${seriesName}` : ''; // TODO: Expand to include book when linked from bookview

  const spolierLevelBookId = props.userSpoilerLevel[seriesId] || '';
  const bookList = seriesDetails?.[seriesId]?.books || {};

  const spoilerChoices = Object.values(bookList).sort(sortByTimestamp(-1)).map(book => (
    <option value={book.bookId} key={book.bookId}>{book.name}</option>
  ));

  spoilerChoices.unshift(<option value="" key="1">-- No Spoilers --</option>);

  const spoilerLevelDropdown = (
    <select name="books" id="books" className="spoiler-level-book" value={spolierLevelBookId || "0"} onChange={spoilerChangeHandler}>
      {spoilerChoices}
    </select>
  )

  let spoilerLevelText = <label htmlFor="spolierLevelBook">Set spoiler level: {spoilerLevelDropdown}</label>
  let entryViewHtml;

  if (spolierLevelBookId !== '') {
    spoilerLevelText = <label htmlFor="spolierLevelBook">This article potentially contains spoilers through {spoilerLevelDropdown}</label>
    
    const entryText = mostRecentEntry(entry.text, spolierLevelBookId, bookOrder(bookList));
    entryViewHtml = entryText ? entryText : <p>{entry.name} is mentioned in {seriesName}.</p>;
  } else {
    const firstMention = bookList[earliestMentionId(entry.text, bookOrder(bookList))]?.name;
    entryViewHtml = firstMention ? <p>{entry.name} is first mentioned in {firstMention}.</p> : <p>{entry.name} has no entries yet.</p>;
  }

  return (
    <div className="entry-view-container">
      <Link to={`/${seriesId}/${urlText(seriesName)}`}>
        <div className='breadcrumb-text'>{breadcrumb}</div>
      </Link>
      <div className="spoiler-level-warning">
        <form>
          {spoilerLevelText}
        </form>
      </div>

      <div className="entry-html">
        {entryViewHtml}
      </div>
    </div>
  )
}

export default reduxConnect(EntryView);