import { useState } from "react";
import { Link } from "react-router-dom";
import sortByTimestamp from "../../lib/sortByTimestamp";
import { reduxConnect } from "../../redux/tools";
import AddMentionForm from "./AddMentionForm";
import './MentionList.css';

const MentionList = (props) => {
  const { entries } = props;
  const [addMentionOpen, setAddMentionOpen] = useState(false);

  const sortDirection = -1; // TODO: make a button to switch direction

  const entryItems = Object.values(entries)
    .sort(sortByTimestamp(sortDirection, 'createdAt'))
    .map(entry => (
      <div key={entry.name} className="entry-item"><Link to={`/${entry.entryId}`}>{entry.name}</Link></div>
    ));

  function toggleAddMention() {
    setAddMentionOpen(!addMentionOpen);
  }

  let addMentionForm = <button className="add-mention-button" onClick={toggleAddMention}>Add Mention</button>;

  if (addMentionOpen) {
    addMentionForm = <AddMentionForm cancel={toggleAddMention} />;
  }

  return (
    <div className="mention-list">
      <h3 className="mention-list-header">Mention List:</h3>
      {entryItems}
      {addMentionForm}
    </div>
  )
}

export default reduxConnect(MentionList);
