import React, { useEffect, useRef, useState } from "react";
export const Notes = () => {
  const [IsFocus, setIsFocus] = useState(false);
  useEffect(() => {
    const deleteBtn = document.querySelectorAll(".delete");
    const deleteHandler = () => {
      deleteBtn.forEach((Element) => {
        Element.addEventListener("click", (e) => {
          e.preventDefault();
          const noteBox = e.currentTarget.parentElement.parentElement;
          noteBox.remove();
        });
      });
    };
    deleteBtn ? deleteHandler() : console.log("notes not found");
  });
  return (
    <div className="notes-ui">
      <div className="input-field">
        <input
          type="text"
          readOnly
          className="input-area"
          placeholder="Take a note..."
          onFocus={() => setIsFocus(true)}
        />
        {IsFocus && <Form visibility={setIsFocus} />}
        <div className="notes-tab"></div>
      </div>
    </div>
  );
};
const Form = ({ visibility }) => {
  const title = useRef("");
  const NoteData = useRef("");
  const noteHandler = async () => {
    const RandomId = Math.floor(Math.random() * 0xffffff).toString(16);
    const noteTab = document.querySelector(".notes-tab");
    const noteBox = document.createElement("div");
    noteBox.classList.add("note-box", RandomId);
    const notesTitle = document.createElement("h3");
    notesTitle.textContent = title.current.value.trim();
    notesTitle.classList.add("note-title");
    const notesDetails = document.createElement("p");
    const time = new Date();
    notesDetails.innerHTML = `${NoteData.current.value.trim()} <br/> <span class="time">${time.toISOString()}</span> <img class="delete" src="delete-forever.svg"/>`;
    noteBox.appendChild(notesTitle);
    noteBox.appendChild(notesDetails);
    noteTab.appendChild(noteBox);
    const data = localStorage.getItem("notes");
  };
  return (
    <div className="form">
      <h1>Create New Note</h1>
      <div className="input-field">
        <input
          autoFocus
          type="text"
          className="input-area"
          placeholder="Add Title..."
          ref={title}
        />
        <textarea
          required
          rows={6}
          className="input-area"
          placeholder="Add Note Details..."
          ref={NoteData}
        />
        <button
          className="btn btn-add"
          onClick={() => {
            noteHandler();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
