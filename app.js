function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

showTab("geral");

Promise.all([
 fetch("data/base-geral.json").then(r=>r.json()),
 fetch("data/base-mensal.json").then(r=>r.json()),
 fetch("data/base-anual.json").then(r=>r.json())
]).then(([geral, mensal, anual])=>{

  let receita = 0, despesa = 0;

  let html = "<table><tr><th>Data</th><th>Conta</th><th>Tipo</th><th>Valor</th></tr>";
  geral.forEach(t=>{
    if(t.tipo==="IN") receita+=t.valor;
    else despesa+=t.valor;

    html+=`<tr><td>${t.data}</td><td>${t.conta}</td><td>${t.tipo}</td><td>R$ ${t.valor}</td></tr>`;
  });
  html+="</table>";
  document.getElementById("geral").innerHTML = html;

  document.getElementById("receita").innerText = "R$ "+receita;
  document.getElementById("despesa").innerText = "R$ "+despesa;
  document.getElementById("saldo").innerText = "R$ "+(receita-despesa);
  document.getElementById("meses").innerText = mensal.length;

  new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["Receita","Despesa"],
      datasets:[{data:[receita,despesa]}]
    }
  });

});
