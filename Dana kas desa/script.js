document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const btn = document.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Memproses...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        btn.innerHTML = 'Berhasil Masuk!';
        btn.style.opacity = '1';
        btn.style.background = 'var(--primary-color)';
        btn.style.color = '#fff';
        
        // Alihkan ke Dashboard
        setTimeout(() => {
            window.location.href = 'dashboard kades.html';
        }, 1500);
    }, 1500);
});