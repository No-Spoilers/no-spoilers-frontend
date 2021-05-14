import { Link } from "react-router-dom"
import dateFormat from "../../lib/dateFormat";
import './BookLineItem.css';

const BookLineItem = (props) => {
  const { book, index, spoilDate } = props;

  const earlierThanSpoilDate = (bookDate) => {
    const a = new Date(bookDate);
    const b = new Date(spoilDate);

    return a <= b;
  }

  return (
    <div className="book-line-item" key={book.bookId}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          id={index}
          name={book.name}
          onChange={() => props.handleCheckBox(book)}
          checked={earlierThanSpoilDate(book.pubDate)}
        />
      </label>
      <div className="checkbox-label">
        <Link to={`/${book.bookId}`} className="book-link">
          <span className='book-title'>{book.name}</span>
          <span>&nbsp;-&nbsp;</span>
          <span className='book-date'>{dateFormat(book.pubDate)}</span>
        </Link>
      </div>
    </div>
  )
}

export default BookLineItem;