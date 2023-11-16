import { Link } from "react-router-dom";
import { IGames } from "../../data/models";
import "./styleCard.css";

type CardProps = {
  card: IGames;
};

export function Card({ card }: CardProps) {
  return (
    <Link to={`${card.id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <img src={card.background_image} className="img_card" />
        <h3 className="name_game">{card.name}</h3>
        <p className="release_data">
          <span className="relesae_text">Release date: </span> {card.released}
        </p>
      </div>
    </Link>
  );
}
