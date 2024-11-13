import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback enviado! Avaliação: ${rating}, Comentário: ${comment}`);
    // Aqui você pode implementar a lógica para enviar o feedback para um servidor ou banco de dados
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="feedback-rating">
        <label>Avaliação: </label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value={0}>Selecione uma avaliação</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="feedback-comment">
        <label>Comentário: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Enviar Feedback</button>
    </form>
  );
};

export default FeedbackForm;
