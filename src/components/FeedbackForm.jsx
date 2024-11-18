import React, { useState } from 'react';
import { db } from './firebase';  // Certifique-se de que o caminho está correto para o arquivo firebase.js
import { collection, addDoc } from 'firebase/firestore';
import './FeedbackForm.css'; // Se tiver um arquivo de CSS para o estilo

const FeedbackForm = ({ mapId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  // Função para lidar com o envio do feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita fechar o card ao submeter o formulário

    // Verifique se o 'mapId' está definido antes de tentar enviá-lo
    if (!mapId) {
      console.error("Erro: O 'mapId' não foi fornecido.");
      alert("Erro: Map ID não fornecido.");
      return;
    }

    try {
      const feedbackCollection = collection(db, 'feedback');
      await addDoc(feedbackCollection, {
        mapId,  // Usando o mapId para associar o feedback
        comment,
        rating,
        timestamp: new Date(),
      });

      console.log("Feedback enviado com sucesso!");
      alert("Obrigado pelo feedback!");
      setComment('');
      setRating(0);
    } catch (error) {
      console.error("Erro ao enviar feedback: ", error);
      alert("Erro ao enviar o feedback.");
    }
  };

  return (
    <form
      className="feedback-form"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()} // Evita fechar o card ao clicar no formulário
    >
      <h4>Avalie o Mapa: {mapId}</h4>
      <div>
        <label>Nota:</label>
        <input
          type="number"
          value={rating}
          min="1"
          max="5"
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <label>Comentário:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe seu comentário aqui"
        />
      </div>
      <button type="submit">Enviar Avaliação</button>
    </form>
  );
};

export default FeedbackForm;
