// ==========================================
// 1. DATA PUSAT 
// ==========================================
let dataPinjaman = [
    { id: 'P-101', idAnggota: 'A-001', nama: 'Budi Santoso', telp: '0812-3456-7890', alamat: 'Jl. Merdeka No. 10', total: 10000000, bayar: 6000000, status: 'Berjalan', tglBayar: '15 Mar 2026', denda: 0, statusAnggota: 'Aktif' },
    { id: 'P-102', idAnggota: 'A-002', nama: 'Siti Aminah', telp: '0856-7890-1234', alamat: 'Gg. Kelinci No. 5', total: 5000000, bayar: 5000000, status: 'Lunas', tglBayar: '01 Feb 2026', denda: 0, statusAnggota: 'Aktif' },
    { id: 'P-103', idAnggota: 'A-003', nama: 'Agus Pratama', telp: '0813-1122-3344', alamat: 'Jl. Sudirman No. 45', total: 15000000, bayar: 2000000, status: 'Terlambat', tglBayar: '10 Jan 2026', denda: 150000, statusAnggota: 'Aktif' },
    { id: 'P-104', idAnggota: 'A-004', nama: 'Dewi Lestari', telp: '0819-0099-8877', alamat: 'Blok M Kav 3', total: 8000000, bayar: 7500000, status: 'Berjalan', tglBayar: '20 Mar 2026', denda: 0, statusAnggota: 'Aktif' },
    { id: 'P-105', idAnggota: 'A-005', nama: 'Eko Wijaya', telp: '0877-6655-4433', alamat: 'Jl. Melati No. 12', total: 12000000, bayar: 4000000, status: 'Terlambat', tglBayar: '05 Jan 2026', denda: 120000, statusAnggota: 'Aktif' },
    { id: 'P-106', idAnggota: 'A-006', nama: 'Fani Rahma', telp: '0812-9988-7766', alamat: 'Perum Gading Indah', total: 3000000, bayar: 3000000, status: 'Lunas', tglBayar: '12 Des 2025', denda: 0, statusAnggota: 'Tidak Aktif' }, 
    { id: 'P-107', idAnggota: 'A-007', nama: 'Guntur Pro', telp: '0852-1234-5678', alamat: 'Jl. Elang No. 8', total: 20000000, bayar: 15000000, status: 'Berjalan', tglBayar: '18 Mar 2026', denda: 0, statusAnggota: 'Aktif' },
    { id: 'P-108', idAnggota: 'A-008', nama: 'Hana Pertiwi', telp: '0811-2233-4455', alamat: 'Jl. Mawar No. 1', total: 7000000, bayar: 2000000, status: 'Terlambat', tglBayar: '20 Feb 2026', denda: 70000, statusAnggota: 'Aktif' },
    { id: 'P-109', idAnggota: 'A-009', nama: 'Indra Kusuma', telp: '0813-8877-6655', alamat: 'Apartemen Green', total: 10000000, bayar: 10000000, status: 'Lunas', tglBayar: '15 Jan 2026', denda: 0, statusAnggota: 'Tidak Aktif' }, 
    { id: 'P-110', idAnggota: 'A-010', nama: 'Joko Susilo', telp: '0878-1111-2222', alamat: 'Jl. Kenari No. 9', total: 6000000, bayar: 1000000, status: 'Berjalan', tglBayar: '25 Mar 2026', denda: 0, statusAnggota: 'Aktif' }
];

const itemsPerPage = 5; 
let currentPagePinjaman = 1;
let currentPageAnggota = 1;
let deleteTargetId = null; // Menyimpan ID yang akan dihapus

// ==========================================
// 2. SISTEM TEMA & IKON
// ==========================================
const htmlElement = document.documentElement;
const btnTheme = document.getElementById('toggleTheme');
const btnStyle = document.getElementById('toggleStyle');

const icons = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    normalStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`,
    glassStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`
};

const savedTheme = localStorage.getItem('app-theme') || 'light';
const savedStyle = localStorage.getItem('app-style') || 'normal';

htmlElement.setAttribute('data-theme', savedTheme);
htmlElement.setAttribute('data-style', savedStyle);

function updateIcons() {
    if (!btnTheme || !btnStyle) return;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const currentStyle = htmlElement.getAttribute('data-style');
    btnTheme.innerHTML = currentTheme === 'light' ? icons.moon : icons.sun;
    btnStyle.innerHTML = currentStyle === 'normal' ? icons.glassStyle : icons.normalStyle;
}
updateIcons();

if (btnTheme) {
    btnTheme.addEventListener('click', () => {
        let newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('app-theme', newTheme);
        updateIcons();
    });
}
if (btnStyle) {
    btnStyle.addEventListener('click', () => {
        let newStyle = htmlElement.getAttribute('data-style') === 'normal' ? 'glass' : 'normal';
        htmlElement.setAttribute('data-style', newStyle);
        localStorage.setItem('app-style', newStyle);
        updateIcons();
    });
}

// ==========================================
// 3. FINANSIAL, STATISTIK, & NOTIFIKASI
// ==========================================
function updateDashboardStats() {
    const totalUangEl = document.getElementById('totalUang');
    const kasTersediaEl = document.getElementById('kasTersedia');
    const kasTerpinjamEl = document.getElementById('kasTerpinjam');
    const anggotaEl = document.getElementById('totalAnggota');
    const anggotaAktifEl = document.getElementById('anggotaAktif');
    const anggotaTidakAktifEl = document.getElementById('anggotaTidakAktif');

    if (totalUangEl && kasTersediaEl) {
        const totalUang = 500000000; 
        let kasTerpinjam = 0;
        let anggotaAktif = 0;
        let anggotaTidakAktif = 0;

        dataPinjaman.forEach(p => {
            if (p.status !== 'Lunas') kasTerpinjam += (p.total - p.bayar);
            if (p.statusAnggota === 'Aktif') anggotaAktif++;
            else anggotaTidakAktif++;
        });

        const kasTersedia = totalUang - kasTerpinjam;

        totalUangEl.setAttribute('data-target', totalUang);
        kasTersediaEl.setAttribute('data-target', kasTersedia);
        kasTerpinjamEl.setAttribute('data-target', kasTerpinjam);
        anggotaEl.setAttribute('data-target', dataPinjaman.length);
        
        if(anggotaAktifEl) anggotaAktifEl.setAttribute('data-target', anggotaAktif);
        if(anggotaTidakAktifEl) anggotaTidakAktifEl.setAttribute('data-target', anggotaTidakAktif);
        
        animateCounters();
    }
}

function setupNotifications() {
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const notifCount = document.getElementById('notifCount');
    const notifList = document.getElementById('notifList');
    
    if (!notifBtn) return; 

    const lateBorrowers = dataPinjaman.filter(p => p.status === 'Terlambat');
    const inactiveMembers = dataPinjaman.filter(p => p.statusAnggota === 'Tidak Aktif');
    const totalNotifs = lateBorrowers.length + inactiveMembers.length;

    if (totalNotifs > 0) {
        notifCount.innerText = totalNotifs;
        notifCount.style.display = 'flex';
        
        let notifHTML = '';
        lateBorrowers.forEach(p => {
            notifHTML += `
            <li onclick="showDetail('${p.id}'); document.getElementById('notifDropdown').style.display='none';">
                <strong>${p.nama}</strong> melewati tenggat.<br>
                <small style="opacity:0.8;">Denda: Rp ${p.denda.toLocaleString('id-ID')}</small>
            </li>`;
        });
        inactiveMembers.forEach(p => {
            notifHTML += `
            <li class="warning">
                <strong>${p.nama}</strong> berstatus Tidak Aktif.<br>
                <small style="opacity:0.8;">Cek halaman Data Anggota.</small>
            </li>`;
        });

        notifList.innerHTML = notifHTML;

        setTimeout(() => {
            const toast = document.getElementById('toastPopup');
            if(toast) {
                document.querySelector('.toast-icon').innerText = '⚠️';
                document.getElementById('toastMessage').innerText = `Terdapat ${totalNotifs} Peringatan (Telat Bayar & Tidak Aktif)!`;
                toast.style.borderLeftColor = '#f59e0b';
                toast.classList.add('show');
            }
        }, 1000);
    } else {
        notifCount.style.display = 'none';
        notifList.innerHTML = '<li style="background:transparent; border:none; text-align:center; opacity:0.6;">Tidak ada peringatan.</li>';
    }

    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        notifDropdown.style.display = notifDropdown.style.display === 'block' ? 'none' : 'block';
    });
    window.addEventListener('click', (e) => {
        if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
            notifDropdown.style.display = 'none';
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const currentString = counter.innerText.replace(/\./g, '');
            const count = +currentString;
            const inc = target / 150;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString('id-ID');
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target.toLocaleString('id-ID');
            }
        };
        updateCount();
    });
}

// ==========================================
// 4. PAGINATION, TABEL & FUNGSI HAPUS MODAL
// ==========================================
function renderPagination(totalItems, currentPage, containerId, callbackFunc) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return; 

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '‹ Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => { callbackFunc(currentPage - 1); };
    container.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => { callbackFunc(i); };
        container.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = 'Next ›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => { callbackFunc(currentPage + 1); };
    container.appendChild(nextBtn);
}

function renderTablePinjaman() {
    const tableBody = document.getElementById('tablePinjamanBody');
    if (!tableBody) return;
    tableBody.innerHTML = ''; 
    
    const start = (currentPagePinjaman - 1) * itemsPerPage;
    const paginatedData = dataPinjaman.slice(start, start + itemsPerPage);

    paginatedData.forEach(p => {
        const badgeClass = p.status === 'Lunas' ? 'bg-green' : (p.status === 'Terlambat' ? 'bg-red' : 'bg-yellow');
        tableBody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><strong>${p.nama}</strong><br><small>${p.telp}</small></td>
                <td>${p.alamat}</td>
                <td>Rp ${p.total.toLocaleString('id-ID')}</td>
                <td><span class="badge ${badgeClass}">${p.status}</span></td>
                <td><button class="btn-primary" onclick="showDetail('${p.id}')">Detail</button></td>
            </tr>
        `;
    });
    renderPagination(dataPinjaman.length, currentPagePinjaman, 'paginationPinjaman', (newPage) => {
        currentPagePinjaman = newPage; renderTablePinjaman();
    });
}

function renderTableAnggota() {
    const tableBody = document.getElementById('tableAnggotaBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    
    const start = (currentPageAnggota - 1) * itemsPerPage;
    const paginatedData = dataPinjaman.slice(start, start + itemsPerPage);

    paginatedData.forEach(p => {
        const statusClass = p.statusAnggota === 'Aktif' ? 'bg-green' : 'bg-gray';
        const isDisable = p.statusAnggota === 'Aktif' ? 'disabled' : '';
        
        tableBody.innerHTML += `
            <tr>
                <td><strong>#${p.idAnggota}</strong></td>
                <td>${p.nama}</td>
                <td>${p.telp}</td>
                <td>${p.alamat}</td>
                <td><span class="badge ${statusClass}">${p.statusAnggota}</span></td>
                <td>
                    <button class="btn-danger" onclick="hapusAnggota('${p.id}')" ${isDisable} title="${isDisable ? 'Anggota aktif tidak bisa dihapus' : 'Hapus Anggota'}">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });
    renderPagination(dataPinjaman.length, currentPageAnggota, 'paginationAnggota', (newPage) => {
        currentPageAnggota = newPage; renderTableAnggota();
    });
}

// --- FUNGSI MUNCULKAN MODAL HAPUS ---
function hapusAnggota(id) {
    const member = dataPinjaman.find(p => p.id === id);
    if (member && member.statusAnggota === 'Tidak Aktif') {
        deleteTargetId = id;
        document.getElementById('deleteMemberName').innerText = member.nama;
        document.getElementById('deleteModal').style.display = 'flex';
    }
}

// --- FUNGSI TUTUP MODAL HAPUS ---
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    deleteTargetId = null;
}

// --- FUNGSI EKSEKUSI HAPUS (SAAT KLIK 'YA, HAPUS') ---
function confirmDelete() {
    if (deleteTargetId) {
        const index = dataPinjaman.findIndex(p => p.id === deleteTargetId);
        if (index !== -1) {
            dataPinjaman.splice(index, 1);
            
            renderTableAnggota();
            updateDashboardStats();
            setupNotifications();
            
            // Munculkan Toast Sukses
            const toast = document.getElementById('toastPopup');
            if(toast) {
                document.querySelector('.toast-icon').innerText = '✅';
                document.getElementById('toastMessage').innerText = "Data Anggota berhasil dihapus!";
                toast.style.borderLeftColor = '#10b981'; // Warna hijau sukses
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 4000);
            }
        }
        closeDeleteModal();
    }
}

function showDetail(id) {
    const loan = dataPinjaman.find(p => p.id === id);
    if (!loan) return;

    const sisa = loan.total - loan.bayar;
    document.getElementById('modalNama').innerText = loan.nama;
    document.getElementById('modalID').innerText = loan.id;
    document.getElementById('modalTotal').innerText = 'Rp ' + loan.total.toLocaleString('id-ID');
    document.getElementById('modalTerbayar').innerText = 'Rp ' + loan.bayar.toLocaleString('id-ID');
    document.getElementById('modalSisa').innerText = 'Rp ' + sisa.toLocaleString('id-ID');
    document.getElementById('modalTgl').innerText = loan.tglBayar;
    document.getElementById('modalDenda').innerText = 'Rp ' + loan.denda.toLocaleString('id-ID');
    
    const dendaNote = document.getElementById('modalDendaNote');
    if(loan.denda > 0) {
        dendaNote.innerText = "Melewati tenggat waktu.";
        dendaNote.style.color = "var(--danger-color)";
    } else {
        dendaNote.innerText = "Pembayaran rajin, tidak ada denda.";
        dendaNote.style.color = "var(--primary-color)";
    }
    document.getElementById('detailModal').style.display = 'flex';
}

function closeModal() { document.getElementById('detailModal').style.display = 'none'; }

// ==========================================
// 5. INISIALISASI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats(); 
    setupNotifications();   
    renderTablePinjaman();  
    renderTableAnggota();   
    
    const uploadInput = document.getElementById('uploadPhoto');
    const profilePreview = document.getElementById('profilePreview');
    const savedPhoto = localStorage.getItem('profile-photo');
    
    if (savedPhoto && profilePreview) profilePreview.src = savedPhoto;
    
    if(uploadInput) {
        uploadInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                    localStorage.setItem('profile-photo', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });
    }
});