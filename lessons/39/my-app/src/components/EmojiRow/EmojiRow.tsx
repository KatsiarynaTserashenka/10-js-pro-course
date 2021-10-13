import React from 'react';
import './EmojiRow.css';
import { Emoji } from 'types/Emoji';

interface IProps {
  emoji: Emoji;
}

const EmojiRow: React.FC<IProps> = (props) => {
  const handleCopyEmoji = () => {
    window.navigator.clipboard.writeText(props.emoji.symbol);
  };

  const { emoji } = props;
  return (
    <li className="emoji__list-item">
      <span>
        {emoji.symbol} {emoji.title}
      </span>
      <span className="copy" onClick={handleCopyEmoji}>
        Click to copy emoji
      </span>
    </li>
  );
};

export default EmojiRow;
