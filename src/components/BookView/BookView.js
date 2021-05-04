import { useParams } from "react-router";
import { reduxConnect } from "../../redux/tools";
import dateFormat from '../../lib/dateFormat';

const BookView = (props) => {
  const seriesId = useParams().seriesId;
  const contentId = useParams().contentId;

  const { seriesDetails } = props;

  const book = seriesDetails[seriesId].books[contentId];

  return (
    <div className="book-view-container">
      <h1>{book.name}</h1>
      <p>{dateFormat(book.pubDate)}</p>
    </div>
  );

}

export default reduxConnect (BookView);
