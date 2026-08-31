const achievementItems = document.querySelectorAll('.achievement-item');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalYear = document.getElementById('modalYear');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".carousel-track");

// Event listener saat item ditekan
achievementItems.forEach(item => {
    
  
    item.addEventListener('click', () => {
        const year = item.getAttribute('data-year');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const imageUrl = item.getAttribute('data-image');

        // Masukkan data ke modal
        modalYear.textContent = year;
        modalTitle.textContent = title;
        modalDesc.textContent = description;

        // Tampilkan gambar jika ada URL-nya
        if (imageUrl) {
            modalImage.src = imageUrl;
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }

        // Munculkan modal dan kunci scroll latar belakang
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Fungsi untuk menutup modal
const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        modalImage.src = '';
    }, 300);
}

// Tombol tutup diklik
modalClose.addEventListener('click', closeModal);

// Klik area gelap di luar modal untuk menutup
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Menutup modal dengan tombol 'Escape' pada keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// 1. Fungsi Menggeser Slider Galeri
function moveSlide(step) {
    slideIndex += step;
    
    // Kalau melebihi batas, kembali ke awal
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Efek menggeser
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Pasang Fungsi Tombol Geser
document.querySelector(".prev").addEventListener("click", function() {
    moveSlide(-1);
});
document.querySelector(".next").addEventListener("click", function() {
    moveSlide(1);
});

// 2. Buka Kotak Deskripsi dengan Data
slides.forEach(function(slide) {
    slide.addEventListener("click", function() {
        const modal = document.getElementById("detailModal");
        
        // Ambil data dari elemen yang diklik
        const imgSrc = this.querySelector("img").src;
        const title = this.querySelector("h3").innerText;
        const desc = this.querySelector("p").textContent;


        // Taruh ke dalam modal
        document.getElementById("modal-img").src = imgSrc;
        document.getElementById("modal-title").innerText = title;
        document.getElementById("modal-desc").innerText = desc;

        // Tampilkan modal
        modal.style.display = "flex";
    });
});

// 3. Menutup Kotak Deskripsi dengan Animasi
function tutupModal() {
    const modal = document.getElementById("detailModal");
    
    // Tambahkan efek memudar untuk hilang
    modal.classList.add("fade-out");
    
    // Tunggu 300ms sesuai durasi di CSS, lalu sembunyikan betul-betul
    setTimeout(function() {
        modal.style.display = "none";
        modal.classList.remove("fade-out"); // Reset untuk dipakai lagi nanti
    }, 300);
}

// Pasang Fungsi Tombol Tutup X
document.querySelector(".close-btn").addEventListener("click", tutupModal);

// Pasang Fungsi Klik Di Luar Kotak
window.addEventListener("click", function(event) {
    const modal = document.getElementById("detailModal");
    if (event.target === modal) {
        tutupModal();
    }
});
