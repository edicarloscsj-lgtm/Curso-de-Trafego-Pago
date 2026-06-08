export function initProtection() {
    // Bloqueia o botão direito
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Bloqueia atalhos de teclado comuns de desenvolvedor e cópia
    document.addEventListener('keydown', (e) => {
        // Bloqueia F12
        if (e.key === 'F12') e.preventDefault();
        
        // Bloqueia Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.key === 'u') e.preventDefault();
        
        // Bloqueia Ctrl+C, Ctrl+A, Ctrl+P (imprimir)
        if (e.ctrlKey && ['c', 'a', 'p'].includes(e.key.toLowerCase())) {
            e.preventDefault();
            // Opcional: Disparar um toast de aviso aqui
        }
    });

    // Bloqueia a seleção de texto via CSS diretamente no body
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    
    // Bloqueia o arrastar de elementos (imagens, etc)
    document.addEventListener('dragstart', (e) => e.preventDefault());
}