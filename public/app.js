let modalMode = "add";
let currentWhisperId = null;

window.openAddModal = function () {
  modalMode = "add";
  currentWhisperId = null;

  document.getElementById("modalTitle").textContent = "Ajouter un whisper";
  document.getElementById("modalSubmitBtn").textContent = "Ajouter";
  document.getElementById("modalSubmitBtn").className = "btn btn-primary";

  document.getElementById("messageField").classList.remove("d-none");
  document.getElementById("deleteText").classList.add("d-none");

  document.getElementById("message").value = "";
};

window.openEditModal = function (id, message) {
  modalMode = "edit";
  currentWhisperId = id;

  document.getElementById("modalTitle").textContent = "Modifier le whisper";
  document.getElementById("modalSubmitBtn").textContent = "Modifier";
  document.getElementById("modalSubmitBtn").className = "btn btn-warning";

  document.getElementById("messageField").classList.remove("d-none");
  document.getElementById("deleteText").classList.add("d-none");

  document.getElementById("message").value = message;
};

window.openDeleteModal = function (id, message) {
  modalMode = "delete";
  currentWhisperId = id;

  document.getElementById("modalTitle").textContent = "Supprimer le whisper";
  document.getElementById("modalSubmitBtn").textContent = "Supprimer";
  document.getElementById("modalSubmitBtn").className = "btn btn-danger";

  document.getElementById("messageField").classList.add("d-none");
  document.getElementById("deleteText").classList.remove("d-none");
  document.getElementById("deleteText").textContent =
    `Voulez-vous vraiment supprimer : "${message}" ?`;
};
document.getElementById("whisperForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let response;

  if (modalMode === "add") {
    const message = document.getElementById("message").value;

    response = await fetch("/api/v1/whisper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  }

  if (modalMode === "edit") {
    const message = document.getElementById("message").value;

    response = await fetch(`/api/v1/whisper/${currentWhisperId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  }

  if (modalMode === "delete") {
    response = await fetch(`/api/v1/whisper/${currentWhisperId}`, {
      method: "DELETE",
    });
  }

  if (response && response.ok) {
    location.reload();
  }
});
