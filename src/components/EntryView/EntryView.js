import { useState } from "react";
import marked from 'marked';
import DOMPurify from 'dompurify';
import { Link, useParams } from "react-router-dom"
import sortByTimestamp from "../../lib/sortByTimestamp";
import urlText from "../../lib/urlText";
import { reduxConnect } from "../../redux/tools";
import EditEntryForm from "./EditEntryForm";
import SpoilerLevelDropDown from "./SpoilerLevelDropDown";

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
  const [ editOpen, setEditOpen ] = useState();

  const { seriesDetails, getSeriesDetail } = props;
  const seriesId = props.lookUp[entryId];
  const entry = seriesDetails?.[seriesId]?.entries?.[entryId] || {};

  useState(() => {
    if (!entry.name && !props.fetching) {
      getSeriesDetail(entryId);
    }
  }, [entry, getSeriesDetail, entryId]);



  const toggleEditEntry = () => {
    setEditOpen(!editOpen);
  }

  const seriesName = seriesDetails?.[seriesId]?.name || '';
  const breadcrumb = seriesName ? `>> ${seriesName}` : ''; // TODO: Expand to include book when linked from bookview

  const spolierLevelBookId = props.userSpoilerLevel[seriesId] || '';
  const bookList = seriesDetails?.[seriesId]?.books || {};


  const spoilerLevelDropdown = <SpoilerLevelDropDown />;

  let spoilerLevelText = <label htmlFor="spolierLevelBook">Set spoiler level: {spoilerLevelDropdown}</label>
  let entryMarkdown;

  if (spolierLevelBookId !== '') {

    spoilerLevelText = <label htmlFor="spolierLevelBook">This article potentially contains spoilers through {spoilerLevelDropdown}</label>

    const entryText = mostRecentEntry(entry.text, spolierLevelBookId, bookOrder(bookList));
    entryMarkdown = entryText ? entryText : `${entry.name} is mentioned in ${seriesName}.`;

  } else {

    const firstMention = bookList[earliestMentionId(entry.text, bookOrder(bookList))]?.name;
    entryMarkdown = firstMention ? `${entry.name} is first mentioned in ${firstMention}.` : `${entry.name} has no entries yet.`;

  }

  let articleOrEditForm;

  if (editOpen) {
    articleOrEditForm = <EditEntryForm cancel={toggleEditEntry} />
  } else {
    const innerHtml = DOMPurify.sanitize(marked(entryMarkdown));

    articleOrEditForm = (
      <div>
        <div className='entry-header-container'>
          <div className='breadcrumb-text'>
            <Link to={`/${seriesId}/${urlText(seriesName)}`}>{breadcrumb}</Link>
          </div>
          <div className="entry-edit-button" onClick={toggleEditEntry}>Edit</div>
        </div>
        
        <div className="spoiler-level-warning">
          <form>
            {spoilerLevelText}
          </form>
        </div>

        <div 
          className="entry-html"
          dangerouslySetInnerHTML={{__html: innerHtml}}
        ></div>
      </div>
    )
  } 

  return (
    <div className="entry-view-container">

      {articleOrEditForm}
    </div>
  )
}

export default reduxConnect(EntryView);