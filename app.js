fetch("data/sample.json")
  .then(r => r.json())
  .then(data => {

    let receita = 0;
    let despesa = 0;

    const tbody = document.querySelector("#table tbody");

    data.forEach(t => {
      if (t.type === "IN") receita += t.value;
      else despesa += t.value;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${t.date}</td>
        <td>${t.account}</td>
        <td>${t.owner}</td>
        <td>${t.type}</td>
        <td>R$ ${t.value.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });

    const saldo = receita - despesa;

    document.getElementById("saldo").innerText = `R$ ${saldo.toFixed(2)}`;
    document.getElementById("receita").innerText = `R$ ${receita.toFixed(2)}`;
    document.getElementById("despesa").innerText = `R$ ${despesa.toFixed(2)}`;
    document.getElementById("runway").innerText = despesa > 0 ? (saldo / despesa).toFixed(1) + " meses" : "∞";

    new Chart(document.getElementById("chart"), {
      type: "bar",
      data: {
        labels: ["Receita", "Despesa"],
        datasets: [{
          data: [receita, despesa]
        }]
      }
    });
  });
