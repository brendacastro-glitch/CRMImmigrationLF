const clientList = document.getElementById("clientList");
const totalClientsEl = document.getElementById("totalClients");
const activeCasesEl = document.getElementById("activeCases");

// Fetch clients from Supabase
async function loadClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*");

  if (error) {
    console.error("Error loading clients:", error);
    return;
  }

  renderClients(data);
  totalClientsEl.textContent = data.length;
  activeCasesEl.textContent = data.filter(c => c.status === "active").length;
}

function renderClients(clients) {
  clientList.innerHTML = "";

  clients.forEach(client => {
    const div = document.createElement("div");
    div.className = "client";

    div.innerHTML = `
      <div>
        <strong>${client.first_name} ${client.last_name}</strong><br />
        <small>${client.case_type} • Priority: ${client.priority}</small>
      </div>
      <div class="stage ${statusClass(client.stage_status)}">
        ${client.stage_name}
      </div>
    `;

    clientList.appendChild(div);
  });
}

function statusClass(status) {
  if (status === "completed") return "completed";
  if (status === "in_progress") return "in-progress";
  return "pending";
}

// Init
loadClients();
