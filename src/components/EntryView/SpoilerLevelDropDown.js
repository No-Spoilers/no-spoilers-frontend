import { useParams } from "react-router";
import sortByTimestamp from "../../lib/sortByTimestamp";
import { reduxConnect } from "../../redux/tools";

const SpoilerLevelDropDown = (props) => {
  const entryId = useParams().contentId;
  const { seriesDetails } = props;
  const seriesId = props.lookUp[entryId];
  const bookList = seriesDetails?.[seriesId]?.books || {};
  const spolierLevelBookId = props.userSpoilerLevel[seriesId] || '';

  const spoilerChangeHandler = (event) => {
    props.setSpoilerLevel(seriesId, event.target.value);
  }

  const spoilerChoices = Object.values(bookList).sort(sortByTimestamp(-1)).map(book => (
    <option value={book.bookId} key={book.bookId}>{book.name}</option>
  ));

  spoilerChoices.unshift(<option value="" key="1">-- No Spoilers --</option>);
  return (
    <select name="spolierLevelBook" id="books" className="spoiler-level-book" value={spolierLevelBookId || "0"} onChange={spoilerChangeHandler}>
      {spoilerChoices}
    </select>
  )
}

export default reduxConnect(SpoilerLevelDropDown);