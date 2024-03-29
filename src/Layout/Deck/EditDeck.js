import React, { useState, useEffect } from "react";
import Breadcrumbs from "../BreadCrumbs";
import { useHistory, useParams } from "react-router-dom";
import { updateDeck } from "../../utils/api";
import { readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
//React and React router dom hooks /////////////////////////////////////////////////////////////////////////////
  const history = useHistory();
  const initialFormState = { cards: [], name: ``, description: `` };
  const [formData, setFormData] = useState({ ...initialFormState });
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setFormData({
        cards: response.cards,
        id: response.id,
        name: response.name,
        description: response.description,
      });
    });
  }, [deckId]);
// End of React and React router dom hooks ///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OnChange and OnSubmit handlers /////////////////////////////////////////////////////////////////////// 
function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateDeck(formData);
    setFormData({ ...initialFormState });
    history.push(`/decks/${deckId}`);
  }
  // End of OnChange and OnSubmit handlers ///////////////////////////////////////////////////////////////////////
  
  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: formData.name, link: `/decks/${deckId}` },
            { label: "Edit Deck" },
          ]}
        />
      </div>
      <div>
        <h1>Edit Deck</h1>
      </div>
      <div>
        <DeckForm
          deckId={deckId}
          submit={handleSubmit}
          change={handleChange}
          edit={true}
          name={formData.name}
          description={formData.description}
          button1={`Cancel`}
          button2={`Submit`}
        />
      </div>
    </div>
  );
}