import React, { useState, useEffect } from 'react';
import './EmojiContainer.css';
import EmojiRow from '../EmojiRow';
import { Emoji } from 'types/Emoji';

interface IProps {
  searchString: string;
}

const EmojiContainer: React.FC<IProps> = (props) => {
  const [emoji, setEmoji] = useState<Emoji[]>([]);
  const [displayLimit, setDisplayLimit] = useState(10);

  const fetchEmoji = () => {
    fetch(
      'https://raw.githubusercontent.com/asimonok/10-js-pro-course/lesson/38/lessons/38/emojiList.json'
    )
      .then((response): Promise<Emoji[]> => {
        return response.json();
      })
      .then((data) => setEmoji(data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchEmoji();
  }, []);

  const changeDisplayLimit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDisplayLimit(parseInt(event.target.value));
  };

  const { searchString } = props;

  const filteredEmojiList = emoji.filter((emoji) => {
    return (
      emoji.title.toLowerCase().includes(searchString) ||
      emoji.keywords.toLowerCase().includes(searchString)
    );
  });

  return (
    <div>
      <label htmlFor="display-limit">Choose display limit </label>
      <select
        className="display-limit"
        name="display-limit"
        onChange={changeDisplayLimit}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <ul className="emoji__list">
        {filteredEmojiList
          .map((emoji) => {
            return <EmojiRow emoji={emoji} key={emoji.title} />;
          })
          .slice(0, displayLimit)}
      </ul>
    </div>
  );
};

export default EmojiContainer;
