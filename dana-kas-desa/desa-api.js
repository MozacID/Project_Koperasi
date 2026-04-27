/**
 * DESA DIGITAL - API & LOGIC CONTROLLER
 */

// 1. SISTEM TEMA & GAYA (Terang/Gelap & Normal/Kaca)
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
    if (!btnTheme || !btnStyle) return;
    const isDark = htmlElement.classList.contains('dark');
    const currentStyle = htmlElement.getAttribute('data-style');
    btnTheme.innerHTML = isDark ? icons.sun : icons.moon;
    btnStyle.innerHTML = currentStyle === 'normal' ? icons.glassStyle : icons.normalStyle;
    
    const liquidBg = document.getElementById('liquidBg');
    if (liquidBg) {
        if (currentStyle === 'glass') {
            liquidBg.classList.add('opacity-85');
            liquidBg.classList.remove('opacity-0');
        } else {
            liquidBg.classList.remove('opacity-85');
            liquidBg.classList.add('opacity-0');
        }
    }
}

document.addEventListener('DOMContentLoaded', updateIcons);

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


// 2. FUNGSI LOGIN DENGAN VALIDASI KETAT (HANYA NIK & EMAIL)
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        
        const userInput = document.getElementById('nik').value.trim();
        const password = passwordInput.value;
        const btnText = document.getElementById('btnText');
        const btnSpinner = document.getElementById('btnSpinner');
        const submitBtn = document.getElementById('submitBtn');
        const errorBox = document.getElementById('loginError');

        submitBtn.disabled = true;
        btnText.innerText = 'Memverifikasi...';
        btnSpinner.classList.remove('hidden');
        errorBox.classList.add('hidden');

        try {
            // REGEX VALIDATION: Cek apakah input adalah 16 angka ATAU format email
            const isNIK = /^\d{16}$/.test(userInput);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);

            if (!isNIK && !isEmail) {
                throw new Error('Gagal! Harap masukkan NIK (16 Angka) atau Email yang valid.');
            }

            // Simulasi Proses Jaringan
            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, token: 'xxx-abc', identitas: userInput });
                }, 1500);
            });

            if (data.success) {
                localStorage.setItem('desa_token', data.token);
                localStorage.setItem('desa_nama', data.identitas); 
                
                btnText.innerText = 'Berhasil Masuk!';
                submitBtn.classList.replace('bg-primary', 'bg-emerald-600');
                
                setTimeout(() => { window.location.href = 'dashboard-warga.html'; }, 500);
            }

        } catch (error) {
            errorBox.innerText = error.message;
            errorBox.classList.remove('hidden');
            submitBtn.disabled = false;
            btnText.innerText = 'Masuk Sekarang';
            btnSpinner.classList.add('hidden');
        }
    });
}

// 3. FUNGSI DASHBOARD WARGA & LOADING SCREEN
const dashboardMain = document.getElementById('totalSaldo');

if (dashboardMain) {
    const identitasWarga = localStorage.getItem('desa_nama');
    
    if (!identitasWarga) {
        alert("Sesi Anda telah habis. Silakan login kembali!");
        window.location.href = 'login-desa.html';
    } else {
        // Tempelkan NIK / Email dari login ke text "Halo, ..."
        document.getElementById('namaWarga').innerText = identitasWarga;
        
        // Logika Loading Screen (3 Detik)
        const loadingScreen = document.getElementById('loadingScreen');
        const dashboardContent = document.getElementById('dashboardContent');
        
        setTimeout(() => {
            // Fade out loading
            loadingScreen.classList.add('opacity-0');
            setTimeout(() => {
                loadingScreen.classList.add('hidden'); 
                dashboardContent.classList.remove('opacity-0'); 
                fetchDashboardData(); 
            }, 500); 
        }, 3000); 
    }
}

async function fetchDashboardData() {
    try {
        const data = await new Promise(resolve => setTimeout(() => resolve({
            saldoDesa: 455000000,
            pinjamanWarga: 0,
            statusPinjaman: 'Tidak ada pinjaman aktif',
            iuranTerbayar: 4,
            iuranTotal: 12,
            statusIuran: 'Menunggu Bulan Mei'
        }), 800));

        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

        const elSaldo = document.getElementById('totalSaldo');
        const elPinjaman = document.getElementById('pinjamanAktif');
        const elStatusPinj = document.getElementById('pinjamanStatus');
        const elIuran = document.getElementById('iuranTerbayar');
        const elStatusIur = document.getElementById('iuranStatus');

        elSaldo.innerText = 'Rp ' + data.saldoDesa.toLocaleString('id-ID');
        elSaldo.classList.remove('hidden');

        elPinjaman.innerText = 'Rp ' + data.pinjamanWarga.toLocaleString('id-ID');
        elPinjaman.classList.remove('hidden');
        
        elStatusPinj.innerText = data.statusPinjaman;
        elStatusPinj.classList.remove('hidden');

        elIuran.innerText = `${data.iuranTerbayar}/${data.iuranTotal} Bulan`;
        if(data.iuranTerbayar === data.iuranTotal) elIuran.classList.replace('text-danger', 'text-primary'); 
        elIuran.classList.remove('hidden');

        elStatusIur.innerText = 'Status: ' + data.statusIuran;
        elStatusIur.classList.remove('hidden');

    } catch (error) {
        console.error("Gagal memuat data:", error);
    }
}

function logoutWarga() {
    localStorage.removeItem('desa_token');
    localStorage.removeItem('desa_nama');
    window.location.href = 'login-desa.html';
}

// 4. LOGIKA MODAL FORM PINJAMAN & BAYAR KAS
function openAjukanModal() { document.getElementById('modalAjukanPinjaman').classList.replace('hidden', 'flex'); }
function closeAjukanModal() { document.getElementById('modalAjukanPinjaman').classList.replace('flex', 'hidden'); }

function openBayarModal() { document.getElementById('modalBayarKas').classList.replace('hidden', 'flex'); }
function closeBayarModal() { document.getElementById('modalBayarKas').classList.replace('flex', 'hidden'); }

function openLoanSuccessModal() { document.getElementById('loanSuccessModal').classList.replace('hidden', 'flex'); }
function closeLoanSuccessModal() { document.getElementById('loanSuccessModal').classList.replace('flex', 'hidden'); }

// --- FUNGSI SUBMIT PINJAMAN & UBAH STATUS DASHBOARD ---
function submitPinjaman(e) {
    e.preventDefault();
    
    // Ambil input nilai
    const nominal = document.getElementById('wargaNominal').value;
    const bank = document.getElementById('wargaJenisBank').value;
    const norek = document.getElementById('wargaNoRek').value;

    // Ubah Kartu Pinjaman di Dashboard Warga secara real-time
    const elPinjamanAktif = document.getElementById('pinjamanAktif');
    const elPinjamanStatus = document.getElementById('pinjamanStatus');

    if (elPinjamanAktif && elPinjamanStatus) {
        elPinjamanAktif.innerText = 'Rp ' + parseInt(nominal).toLocaleString('id-ID');
        elPinjamanAktif.classList.replace('hidden', 'block');
        elPinjamanAktif.style.color = '#f59e0b'; // Ubah warna jadi kuning/warning

        elPinjamanStatus.innerText = `Menunggu Persetujuan (Rek: ${bank} ${norek})`;
        elPinjamanStatus.classList.remove('hidden');
        elPinjamanStatus.style.color = '#f59e0b';
        elPinjamanStatus.style.fontWeight = 'bold';
    }

    // Tutup form, munculkan Pop-up Kaca Sukses di tengah layar
    closeAjukanModal();
    openLoanSuccessModal();
    
    // Reset form
    document.getElementById('formAjukanPinjaman').reset();
}

// --- FUNGSI SUBMIT BAYAR ---
function submitBayar(e) {
    e.preventDefault();
    alert("Mengalihkan ke Payment Gateway (Midtrans/Xendit)...");
    closeBayarModal();
}