export function initSimulator() {
    const form = document.getElementById('campaign-simulator');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const objective = document.getElementById('sim-objective').value;
        const budget = parseFloat(document.getElementById('sim-budget').value);
        const audience = document.getElementById('sim-audience').value;
        const creative = document.getElementById('sim-creative').value;

        // Lógica de simulação simplificada (baseada em médias de mercado)
        let baseCPA = objective === 'vendas' ? 40 : objective === 'leads' ? 15 : 2;
        let cpmModifier = audience === 'remarketing' ? 1.5 : audience === 'lookalike' ? 1.2 : 0.8;
        let ctrModifier = creative === 'alto' ? 2.5 : creative === 'medio' ? 1.0 : 0.4;

        // Cálculos fictícios para o simulador
        const estimativaCliques = Math.floor((budget / 2) * ctrModifier);
        const custoPorClique = (budget / estimativaCliques).toFixed(2);
        const estimativaConversoes = Math.floor(budget / (baseCPA * (2 - (ctrModifier/2))));
        
        const resultBox = document.getElementById('sim-result-box');
        resultBox.classList.remove('hidden');
        
        let feedbackHTML = `<h4 class="text-white font-bold border-b border-slate-800 pb-2 mb-3">Projeção Diária Estimada</h4>`;
        
        if (budget < 20 && objective === 'vendas') {
            feedbackHTML += `<div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg mb-3 text-xs">
                <i class="fa-solid fa-triangle-exclamation"></i> <strong>Aviso:</strong> Orçamento muito baixo para campanhas de conversão. O algoritmo terá dificuldade em sair da fase de aprendizado.
            </div>`;
        }

        feedbackHTML += `
            <div class="flex justify-between py-1 text-xs"><span class="text-slate-400">Cliques Estimados:</span> <strong class="text-white">${estimativaCliques} a ${estimativaCliques + 15}</strong></div>
            <div class="flex justify-between py-1 text-xs"><span class="text-slate-400">CPC Médio Projetado:</span> <strong class="text-white">R$ ${custoPorClique}</strong></div>
            <div class="flex justify-between py-1 text-xs"><span class="text-slate-400">Resultados (Conversões/Leads):</span> <strong class="text-emerald-400">${estimativaConversoes} a ${estimativaConversoes + 2}</strong></div>
        `;

        resultBox.innerHTML = feedbackHTML;
    });
}