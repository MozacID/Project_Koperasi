/**
 * DESA DIGITAL - API & LOGIC CONTROLLER (ANTI-ERROR)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SISTEM TEMA & GAYA
    const htmlElement = document.documentElement;
    const btnTheme = document.getElementById('toggleTheme');
    const btnStyle = document.getElementById('toggleStyle');

    const icons = {
        sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>`,
        moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        normalStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`,
        glassStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`
    };

    const savedTheme = localStorage.getItem('desa-theme') || 'light';
    const savedStyle = localStorage.getItem('desa-style') || 'glass';

    htmlElement.setAttribute('data-theme', savedTheme);
    htmlElement.setAttribute('data-style', savedStyle);
    if(savedTheme === 'dark') htmlElement.classList.add('dark');

    function updateIcons() {
        if (btnTheme) btnTheme.innerHTML = htmlElement.classList.contains('dark') ? icons.sun : icons.moon;
        if (btnStyle) btnStyle.innerHTML = htmlElement.getAttribute('data-style') === 'normal' ? icons.glassStyle : icons.normalStyle;
        
        const liquidBg = document.getElementById('liquidBg');
        if (liquidBg) {
            if (htmlElement.getAttribute('data-style') === 'glass') {
                liquidBg.classList.add('opacity-85'); liquidBg.classList.remove('opacity-0');
            } else {
                liquidBg.classList.remove('opacity-85'); liquidBg.classList.add('opacity-0');
            }
        }
    }
    updateIcons();

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const newTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('desa-theme', newTheme);
            updateIcons();
        });
    }

    if (btnStyle) {
        btnStyle.addEventListener('click', () => {
            const newStyle = htmlElement.getAttribute('data-style') === 'normal' ? 'glass' : 'normal';
            htmlElement.setAttribute('data-style', newStyle);
            localStorage.setItem('desa-style', newStyle);
            updateIcons();
        });
    }

    // 2. MENGHILANGKAN LOADING SCREEN DENGAN AMAN
    const loadingScreen = document.getElementById('loadingScreen');
    const dashboardContent = document.getElementById('dashboardContent');
    
    if (loadingScreen && dashboardContent) {
        // Pastikan loading screen hilang apapun yang terjadi agar layar tidak blank
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            dashboardContent.classList.remove('opacity-0');
            setTimeout(() => loadingScreen.style.display = 'none', 500);
            
            // Panggil data setelah loading selesai
            if (typeof fetchDashboardData === "function") fetchDashboardData();
        }, 1500); 
    } else if (dashboardContent) {
        // Fallback jika tidak ada elemen loading
        dashboardContent.classList.remove('opacity-0');
    }

    // 3. LOGIKA DASHBOARD WARGA
    const elNamaWarga = document.getElementById('namaWarga');
    if (elNamaWarga) {
        const identitasWarga = localStorage.getItem('desa_nama');
        if (!identitasWarga) {
            window.location.href = 'login-desa.html';
        } else {
            elNamaWarga.innerText = identitasWarga;
        }
    }

    // 4. LOGIKA LOGIN FORM
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                passwordInput.setAttribute('type', passwordInput.getAttribute('type') === 'password' ? 'text' : 'password');
            });
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const userInput = document.getElementById('nik').value.trim();
            const btnText = document.getElementById('btnText');
            const submitBtn = document.getElementById('submitBtn');
            const errorBox = document.getElementById('loginError');

            submitBtn.disabled = true;
            btnText.innerText = 'Memverifikasi...';
            errorBox.classList.add('hidden');

            try {
                const isNIK = /^\d{16}$/.test(userInput);
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);

                if (!isNIK && !isEmail) throw new Error('Harap masukkan NIK (16 Angka) atau Email yang valid.');

                setTimeout(() => {
                    localStorage.setItem('desa_token', 'xxx-abc');
                    localStorage.setItem('desa_nama', userInput); 
                    window.location.href = 'dashboard-warga.html';
                }, 1000);
            } catch (error) {
                errorBox.innerText = error.message;
                errorBox.classList.remove('hidden');
                submitBtn.disabled = false;
                btnText.innerText = 'Masuk Sekarang';
            }
        });
    }
});

// FUNGSI GLOBAL (Dipanggil dari atribut onclick HTML)
async function fetchDashboardData() {
    try {
        const data = await new Promise(resolve => setTimeout(() => resolve({
            saldoDesa: 455000000, pinjamanWarga: 0, statusPinjaman: 'Tidak ada pinjaman aktif', iuranTerbayar: 4, iuranTotal: 12, statusIuran: 'Menunggu Bulan Mei'
        }), 500));

        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

        if(document.getElementById('totalSaldo')) {
            document.getElementById('totalSaldo').innerText = 'Rp ' + data.saldoDesa.toLocaleString('id-ID');
            document.getElementById('totalSaldo').classList.remove('hidden');
        }
        if(document.getElementById('pinjamanAktif')) {
            document.getElementById('pinjamanAktif').innerText = 'Rp ' + data.pinjamanWarga.toLocaleString('id-ID');
            document.getElementById('pinjamanAktif').classList.remove('hidden');
        }
        if(document.getElementById('pinjamanStatus')) {
            document.getElementById('pinjamanStatus').innerText = data.statusPinjaman;
            document.getElementById('pinjamanStatus').classList.remove('hidden');
        }
        if(document.getElementById('iuranTerbayar')) {
            document.getElementById('iuranTerbayar').innerText = `${data.iuranTerbayar}/${data.iuranTotal} Bulan`;
            document.getElementById('iuranTerbayar').classList.remove('hidden');
        }
        if(document.getElementById('iuranStatus')) {
            document.getElementById('iuranStatus').innerText = 'Status: ' + data.statusIuran;
            document.getElementById('iuranStatus').classList.remove('hidden');
        }
    } catch (error) { console.error("Error memuat data"); }
}

function logoutWarga() {
    localStorage.removeItem('desa_token'); localStorage.removeItem('desa_nama');
    window.location.href = 'login-desa.html';
}

function openAjukanModal() { document.getElementById('modalAjukanPinjaman')?.classList.replace('hidden', 'flex'); }
function closeAjukanModal() { document.getElementById('modalAjukanPinjaman')?.classList.replace('flex', 'hidden'); }
function openBayarModal() { document.getElementById('modalBayarKas')?.classList.replace('hidden', 'flex'); }
function closeBayarModal() { document.getElementById('modalBayarKas')?.classList.replace('flex', 'hidden'); }
function openLoanSuccessModal() { document.getElementById('loanSuccessModal')?.classList.replace('hidden', 'flex'); }
function closeLoanSuccessModal() { document.getElementById('loanSuccessModal')?.classList.replace('flex', 'hidden'); }

function submitPinjaman(e) {
    e.preventDefault();
    const nominal = document.getElementById('wargaNominal')?.value || 0;
    const bank = document.getElementById('wargaJenisBank')?.value || '';
    const norek = document.getElementById('wargaNoRek')?.value || '';

    const elPinjamanAktif = document.getElementById('pinjamanAktif');
    const elPinjamanStatus = document.getElementById('pinjamanStatus');

    if (elPinjamanAktif && elPinjamanStatus) {
        elPinjamanAktif.innerText = 'Rp ' + parseInt(nominal).toLocaleString('id-ID');
        elPinjamanAktif.style.color = '#f59e0b';
        elPinjamanStatus.innerText = `Menunggu Persetujuan (Rek: ${bank} ${norek})`;
        elPinjamanStatus.style.color = '#f59e0b';
        elPinjamanStatus.style.fontWeight = 'bold';
    }

    closeAjukanModal();
    openLoanSuccessModal();
    document.getElementById('formAjukanPinjaman')?.reset();
}

function submitBayar(e) {
    e.preventDefault();
    alert("Mengalihkan ke Payment Gateway (Midtrans)...");
    closeBayarModal();
}
