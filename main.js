function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// submit zip pdf ... this gonna be REMOOOOOVED 
document.addEventListener("DOMContentLoaded", function () {
    const fileTypeRadios = document.querySelectorAll('input[name="file-type"]');
    const fileUploadSection = document.getElementById('file-upload-section');
    const fileInput = document.getElementById('course-file');
    const uploadLabel = document.getElementById('upload-label');

    const semesterRadios = document.querySelectorAll('input[name="semester"]');
    const courseTypeSection = document.getElementById('course-type-section');

    // Show file upload when a file type is selected
    fileTypeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            fileUploadSection.style.display = "flex";
            if (this.value === "pdf") {
                uploadLabel.innerText = "Upload PDF";
                fileInput.accept = "application/pdf";
            } else {
                uploadLabel.innerText = "Upload ZIP";
                fileInput.accept = "application/zip";
            }
        });
    });

    // Show course type selection when a semester is chosen
    semesterRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            courseTypeSection.style.display = "flex";
        });
    });

    // Handle form submission
    document.getElementById("course-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("course-name").value;
        const description = document.getElementById("course-description").value;
        const file = document.getElementById("course-file").files[0];
        const semester = document.querySelector('input[name="semester"]:checked');
        const courseType = document.querySelector('input[name="course-type"]:checked');

        if (name && description && file && semester && courseType) {
            const fileURL = URL.createObjectURL(file);

            // **Find the correct target section dynamically**
            const targetId = `${semester.value}-${courseType.value}`; // Example: "S1-Cours"
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${name}</strong>: ${description} - 
                <a href="${fileURL}" target="_blank">Download ${file.type.includes('pdf') ? 'PDF' : 'ZIP'}</a>`;
                
                targetSection.appendChild(listItem); // Add file to the correct section
            } else {
                // alert(`Error: Section "${targetId}" not found.`); later
            }

            // Reset form & hide sections after submission
            document.getElementById("course-form").reset();
            fileUploadSection.style.display = "none";
            courseTypeSection.style.display = "none";

            // showNotification(`"${file.name}" uploaded successfully!`); later
            showNotification(`Sorry Back End doesn t work for now...!`);
        }
    });
});

// *********************

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = 1;
    }, 0);
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

// courses
document.querySelectorAll('input[name="course"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const selectedCourse = this.value;
        const courseList = document.getElementById('course-list');
        const subCourseSection = document.getElementById('sub-course');
        
        // Show sub-course options
        subCourseSection.style.display = 'block';
        
        // Clear previous course list
        courseList.innerHTML = '';

        // Remove sub-course list when a new course is selected
        document.querySelectorAll('input[name="sub-course"]').forEach(radio => radio.checked = false);

        // Clear PDFs and set course-specific options
        const pdfs = fetchPDFs(selectedCourse);
        
        // Display the PDFs
        // pdfs.forEach(pdf => {
        //     const listItem = document.createElement('li');
        //     const pdfLink = document.createElement('a');
        //     pdfLink.href = pdf.path;
        //     pdfLink.target = "_blank";
        //     pdfLink.innerHTML = `<img class="pdf-icon" src="pdf.png" alt="PDF Icon"> ${pdf.name}`;
        //     listItem.appendChild(pdfLink);
        //     courseList.appendChild(listItem);
        // });
    });
});

// Handle sub-course selection (Cours, TD, TP)
document.querySelectorAll('input[name="sub-course"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const selectedSubCourse = this.value;
        const selectedCourse = document.querySelector('input[name="course"]:checked').value;
        const courseList = document.getElementById('course-list');
        
        courseList.innerHTML = ''; // Clear previous course list

        // Fetch the PDFs for the selected sub-course
        const pdfs = fetchSubCoursePDFs(selectedCourse, selectedSubCourse);

        // Display the PDFs
        pdfs.forEach(pdf => {
            const listItem = document.createElement('li');
            const pdfLink = document.createElement('a');
            pdfLink.href = pdf.path;
            pdfLink.target = "_blank";
            pdfLink.innerHTML = `<img class="pdf-icon" src="icon.png" alt="PDF Icon"> ${pdf.name}`;
            listItem.appendChild(pdfLink);
            courseList.appendChild(listItem);
        });
    });
});

// Fetch PDFs for the sub-course (Cours, TD, TP)
function fetchSubCoursePDFs(course, subCourse) {
    const pdfs = [];
    const courseFolder = `courses/${course}/${subCourse}/`; 
    if (course === "S1" && subCourse === "Cours") {
        pdfs.push({ name: "S1 - Théorie et programmation système 1", path: "https://drive.google.com/uc?export=download&id=1SllVJBeYmfl20iph8vdNrPIp0X6Vu3wL" });
        pdfs.push({ name: "S1 - Théorie et programmation système 2", path: "https://drive.google.com/uc?export=download&id=1SveoQwrhTJztkqen71WbI-9EN5hBokG6" });
        pdfs.push({ name: "S1 - Théorie et programmation système 3", path: "https://drive.google.com/uc?export=download&id=1SpKjb-_sx4XVdMkGure4NAO2OkhbnZ_G" });
        pdfs.push({ name: "S1 - Théorie et programmation système 4", path: "https://drive.google.com/uc?export=download&id=1SwRbYMMpKpsZF1Izhx4_tkWFVvGLqodT" });
        pdfs.push({ name: "S1 - Cpp POO 1", path: "https://drive.google.com/uc?export=download&id=1yv7fmXEvP34sLRe2n9eqc9OIV14gyr71" });
        pdfs.push({ name: "S1 - Cpp POO 2", path: "https://drive.google.com/uc?export=download&id=16SsESle5kXkHoeFxFoqy9HYH4bco3Hip" });
        pdfs.push({ name: "S1 - Cpp POO 3", path: "https://drive.google.com/uc?export=download&id=1yL0XMmzyk_NTM1-zCNMTBGSoX9MprjML" });
        pdfs.push({ name: "S1 - Cpp POO 4", path: "https://drive.google.com/uc?export=download&id=1J8yonr-80A0Sc7Uy02vPceLkf_x7kKVs" });
        pdfs.push({ name: "S1 - Cpp POO 5", path: "https://drive.google.com/uc?export=download&id=1LWLNuw5ZoBo6uEorIgSTgPo37xs0alo1" });
        pdfs.push({ name: "S1 - Cpp POO 6", path: "https://drive.google.com/uc?export=download&id=17DCwVj9QPo3UImFzhKsJ-tYcin3FtVeW" });
        pdfs.push({ name: "S1 - Réseaux 1", path: "https://drive.google.com/uc?export=download&id=1ap2xIWmSpLI-WGs6kJcqXdm9CrX853yo" });
        pdfs.push({ name: "S1 - Réseaux 2", path: "https://drive.google.com/uc?export=download&id=1b0z39VlrxI7bGl4beuwRDlkFm6gSlxna" });
        pdfs.push({ name: "S1 - Réseaux 3", path: "https://drive.google.com/uc?export=download&id=1UGJcrIvA6SLaxkYPd61Ed9WyzWC-Rjyy" });
        pdfs.push({ name: "S1 - Réseaux 4", path: "https://drive.google.com/uc?export=download&id=1WKjkbxyNeqmbvS9gWUTWz672kj_lIu09" });
        pdfs.push({ name: "S1 - Francais 1", path: "https://drive.google.com/uc?export=download&id=1T2IpFy5JQe8InqBGhV_Bi9v8iFlP87aN" });
        pdfs.push({ name: "S1 - Francais 2", path: "https://drive.google.com/uc?export=download&id=1T97_Tls0XYtLgsCI54RY4LSYZsmANXA5" });
        pdfs.push({ name: "S1 - Francais 3", path: "https://drive.google.com/uc?export=download&id=1T2IpFy5JQe8InqBGhV_Bi9v8iFlP87aN" });
        pdfs.push({ name: "S1 - Anglais 1", path: "https://drive.google.com/uc?export=download&id=1Rl-xEVYE08J9s-dEp3nTvmpHRuOr_1t0" });
        pdfs.push({ name: "S1 - Anglais 2", path: "https://drive.google.com/uc?export=download&id=1U9iDWS7cFiHUR27Sr7sw68yBqClw1efI" });
        pdfs.push({ name: "S1 - Base de données relatives 1", path: "https://drive.google.com/uc?export=download&id=1dzHTzPiV21fy8FylkAxg2Y6DNsTSR3rL" });
        pdfs.push({ name: "S1 - Base de données relatives 2", path: "https://drive.google.com/uc?export=download&id=1-at5w1oQfPIMiXpPmND3KRHhXdb4l_90" });
        pdfs.push({ name: "S1 - Base de données relatives 3", path: "https://drive.google.com/uc?export=download&id=1XO3CM8giFVoTxoZJvoyRUOELKn4U5-vt" });
        pdfs.push({ name: "S1 - Base de données relatives 4", path: "https://drive.google.com/uc?export=download&id=1PT3VPbFiS4a60CCBPJf6a4GRY_KVPmEf" });
        pdfs.push({ name: "S1 - Base de données relatives 5", path: "https://drive.google.com/uc?export=download&id=13gBFRkhjMrAl0tYyspqtsmeKwqyBFab_" });
        pdfs.push({ name: "S1 - Base de données relatives 6", path: "https://drive.google.com/uc?export=download&id=1tcJL_h5AFmVm8UIsnB3S8M4T6laBM8Wt" });
        pdfs.push({ name: "S1 - Base de données relatives 7", path: "https://drive.google.com/uc?export=download&id=1hVPZVEgC2ggeDJZDz20yOFpGlwEFGaS_" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 1", path: "https://drive.google.com/uc?export=download&id=1Tw-f1Tj56V4_uj3YJIFmtHDWstWPTq7i" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 2", path: "https://drive.google.com/uc?export=download&id=1cNuowIQN_12oclpk3tWCecgWyF33x32v" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 3", path: "https://drive.google.com/uc?export=download&id=1cLm1zTNXID_XnJz2hK8LeudM7Gk09Twy" });
    } else if (course === "S1" && subCourse === "TD") {
        pdfs.push({ name: "S1 - Théorie et programmation système 1", path: "https://drive.google.com/uc?export=download&id=1msuemPiXoO3UJDzeCDm0DYHYu3o97XDb" });
        pdfs.push({ name: "S1 - Réseaux 1", path: "https://drive.google.com/uc?export=download&id=1wsNsoTg-Dh_9jGF-g1nw13SkPHKNSXmH" });
        pdfs.push({ name: "S1 - Réseaux 2", path: "https://drive.google.com/uc?export=download&id=1EF9qJl4KCJINlkzFFsV0_owU9tdwsnCF" });
        pdfs.push({ name: "S1 - Réseaux 3", path: "https://drive.google.com/uc?export=download&id=1GAszwhWygsINDZPSN0gihusJmk4S4MHV" });
        pdfs.push({ name: "S1 - Base de données relatives 1", path: "https://drive.google.com/uc?export=download&id=1d0pK9_i9SMLN3PXVdmrRk5i3osS_3QgL" });
        pdfs.push({ name: "S1 - Base de données relatives 2", path: "https://drive.google.com/uc?export=download&id=1kIH-hFHNf9wN0PJGlqp4ZWW8WwfxuAAn" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 1", path: "https://drive.google.com/uc?export=download&id=1bzHbSKXq7gyazvCzfwEbFEK_IR-Ku4Yb" });
        pdfs.push({ name: "S1 - Exam BD 1", path: "https://drive.google.com/uc?export=download&id=1BpkajEhjaR1spjFIiev0Y9W8Nos3qJem" });
        pdfs.push({ name: "S1 - Exam BD 2", path: "https://drive.google.com/uc?export=download&id=1FESf4ak6nPqWaWj-YPhekYscOsSCRX6N" });
    } else if (course === "S1" && subCourse === "TP") {
        pdfs.push({ name: "S1 - Cpp POO 1", path: "https://drive.google.com/uc?export=download&id=1eBl2IYikdLGEzz9s7AG5E5eGLXt5mLkt" });
        pdfs.push({ name: "S1 - Cpp POO 2", path: "https://drive.google.com/uc?export=download&id=1-67yUKB2LOjlstW2ekfcMKFlzq8t9TJq" });
        pdfs.push({ name: "S1 - Cpp POO 3", path: "https://drive.google.com/uc?export=download&id=1X76CZ2l4Pn8MexaIKyxufRKXSaTHS9Qx" });
        pdfs.push({ name: "S1 - Cpp POO 4", path: "https://drive.google.com/uc?export=download&id=1ZEmoXDbOh-DPkkxpIK4UeW8Lj7Gyegtg" });
        pdfs.push({ name: "S1 - Cpp POO 5", path: "https://drive.google.com/uc?export=download&id=1adL9Yw2DwElPDgoAyko5uPPqUCz4ygzW" });
        pdfs.push({ name: "S1 - Réseaux 1", path: "https://drive.google.com/uc?export=download&id=1ZOHK1z7OqFo_Q2c09lWDyMSLd0HW5YQj" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 1", path: "https://drive.google.com/uc?export=download&id=1g0D294RWqR6Fk5pyLZKISDmSBuVwSQ4M" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 2", path: "https://drive.google.com/uc?export=download&id=1Ag3RTP2B4XeqhfdjQVYrZ1dVHQkHLVRe" });
        pdfs.push({ name: "S1 - Analyse de données et statistiques 3", path: "https://drive.google.com/uc?export=download&id=1_WmB8cocurBKBxHQNIO3iDaWUBsV3DMu" });
    }else if (course === "S2" && subCourse === "Cours") {
        pdfs.push({ name: "S2  - UML et génie logiciel 1", path: "https://drive.google.com/uc?export=download&id=1iNeH0ZDwRHnN9JjrWoTnC7fWh3KUxMAC" });
        pdfs.push({ name: "S2  - Théorie des graphes & recherche opérationnelle 1", path: "https://drive.google.com/uc?export=download&id=1CIK8uaOdzWpTds0u_My1XR9Uz5QwZLRP" });
        pdfs.push({ name: "S2  - Théorie des graphes & recherche opérationnelle 2", path: "https://drive.google.com/uc?export=download&id=1D7M83fJZUWEET4QxqwXxQgBj3DS6BVd0" });
        pdfs.push({ name: "S2  - Théorie des graphes & recherche opérationnelle 3", path: "https://drive.google.com/uc?export=download&id=1SiIoSrxWgUTo1dexjZETzLazt2k4jovg" });
        pdfs.push({ name: "S2  - Théorie des graphes & recherche opérationnelle 4", path: "https://drive.google.com/uc?export=download&id=1bdggWFXsPjFEzC81h394-R2quJMwtiYk" });
        pdfs.push({ name: "S2  - Théorie des graphes & recherche opérationnelle 5", path: "https://drive.google.com/uc?export=download&id=1SiIoSrxWgUTo1dexjZETzLazt2k4jovg" });
        pdfs.push({ name: "S2  - Python pour DS 1", path: "https://docs.google.com/presentation/d/1ZCJ77lOMwNcbgLy2bKOyk7eur4s0Sn_z/export/pptx" });
        pdfs.push({ name: "S2  - Python pour DS 2", path: "https://drive.google.com/uc?export=download&id=1RLRVWE2rEuSShNZjbKzrs3nDBDFV8eyi" });
        pdfs.push({ name: "S2  - Python pour DS 3", path: "https://docs.google.com/presentation/d/1Bqe9dybNJ_YME87CsHUcw6ndj8z34FBN/export/pptx" });
        pdfs.push({ name: "S2  - Python pour DS 4", path: "https://docs.google.com/presentation/d/1bljcqKKQ0iN6FZ06B9Ux1fGjLMpJ_j0H/export/pptx" });
        pdfs.push({ name: "S2  - Python pour DS 5", path: "https://docs.google.com/presentation/d/146Rsj9OjJLcms_nRXxBYLNmgaStprBWQ/export/pptx" });
        pdfs.push({ name: "S2  - Python pour DS 6", path: "https://drive.google.com/uc?export=download&id=1hm9QXKCvfNDOFJsC0RhejS1Y1H3nIeFv" });
        pdfs.push({ name: "S2  - Francais 1", path: "https://drive.google.com/uc?export=download&id=1D8pI8JLeWRDcu40taPhlrLnCI6D9LVOH" });
        pdfs.push({ name: "S2  - Francais 2", path: "https://drive.google.com/uc?export=download&id=1fciSo99DsF1CwIeuyzxBHSEPYLQqa3Ms" });
        pdfs.push({ name: "S2  - Francais 3", path: "https://drive.google.com/uc?export=download&id=1__QdGji2I3xjJMTiGGHlvcw29xkm4vmO" });
        pdfs.push({ name: "S2  - Francais 4", path: "https://docs.google.com/document/d/1DBdF08VaYyhrsVisFLhMvVJnfobSX9Kz/export?format=pdf" });
        pdfs.push({ name: "S2  - Anglais 1", path: "https://drive.google.com/uc?export=download&id=1XydDHqGfLDPqERiprwhtnARLQ7A1FFA6" });
        pdfs.push({ name: "S2  - Anglais 2", path: "https://drive.google.com/uc?export=download&id=1BlgKnuqCe4udgovEexQoSp2Uy3eohdXl" });
        pdfs.push({ name: "S2  - Anglais 3", path: "https://docs.google.com/presentation/d/1EdG3894lR32K-Nhb_W-sVxOHAtDh_ZBG/export/pptx" });
        pdfs.push({ name: "S2  - Excel Avance 1", path: "https://drive.google.com/uc?export=download&id=1tQ7HD3bNnjk5EmvTNb5e_aGd1YsU8Gnq" });
    }else if (course === "S2" && subCourse === "TD") {
        pdfs.push({ name: "S2  - UML et génie logiciel 1", path: "https://drive.google.com/uc?export=download&id=1Go80J30XycX6ItP8fk8sT2O0l2TaG9Ry" });
        pdfs.push({ name: "S2  - Théorie des graphes & recherche opérationnelle 1", path: "https://drive.google.com/uc?export=download&id=1gp3x2VA_KTXnfY5Oe_HwjCfoDS2LuPUw" });
        pdfs.push({ name: "S2  - Python pour DS 1", path: "https://docs.google.com/document/d/1kejk5F510gV_S40GZjYNJVvGdn1o9hAV/export?format=pdf" });
        pdfs.push({ name: "S2  - Python pour DS 1 (solution)", path: "https://docs.google.com/document/d/1DpW5eNfZM3APf5wJc5hbh8VtS596sGvE/export?format=pdf" });
        pdfs.push({ name: "S2  - Python pour DS 2", path: "https://docs.google.com/document/d/14ADd9jEAEVqqgEiZlELP0zWGFPTrrK5G/export?format=pdf" });
    }else if (course === "S2" && subCourse === "TP") {
        pdfs.push({ name: "S2  - Python pour DS 1", path: "https://docs.google.com/document/d/10-zfJpUUNUqszV7a0NqD3F0-cnWdm9VT/export?format=pdf" });
        pdfs.push({ name: "S2  - Python pour DS 2", path: "https://docs.google.com/document/d/1xx_PU3SqdSWqysm3icEhtfHvbxEcQtCo/export?format=pdf" });
        pdfs.push({ name: "S2  - Python pour DS 3", path: "https://docs.google.com/document/d/1hr3v65DqqrEc1nCVYLUKgeDAbJM_gICx/export?format=pdf" });
        pdfs.push({ name: "S2  - Python pour DS 4", path: "https://docs.google.com/document/d/1LU6JwnbWlE7n6V0IjZuB4hZpbp4T9VO_/export?format=pdf" });
        pdfs.push({ name: "S2  - Python pour DS 5", path: "https://drive.google.com/uc?export=download&id=16vxwHZKRciD8nLVJPDjflWAI8qj4JG_c" });
        pdfs.push({ name: "S2  - Python pour DS 6", path: "https://drive.google.com/uc?export=download&id=17Tz0gZKy1Nkk5529R41dZIqoGuC3GPYJ" });
        pdfs.push({ name: "S2  - JAVA POO 1", path: "https://docs.google.com/document/d/1aSTLCXoo50yl33GmU4_OWKmiZhwiO1O9/export?format=pdf" });
        pdfs.push({ name: "S2  - JAVA POO 2", path: "https://docs.google.com/document/d/1E_oaueX4DvsxjjHjKyW7nDBNV2KlpAA0/export?format=pdf" });
        pdfs.push({ name: "S2  - EXCEL avance 1", path: "https://drive.google.com/uc?export=download&id=1dQZqU6y_N5a9qJE0WN1wjaBcDOOghNq7" });
        pdfs.push({ name: "S2  - EXCEL avance 2", path: "https://drive.google.com/uc?export=download&id=1_clKVXN0j5w51jGShPWBbloi6KZTyjDA" });
        pdfs.push({ name: "S2  - EXCEL avance 3", path: "https://drive.google.com/uc?export=download&id=1MA5F3h_yqql9RnoCpYXawfkyAKyAG4w0" });
        pdfs.push({ name: "S2  - EXCEL avance 4", path: "https://drive.google.com/uc?export=download&id=10q4iIk8dPYrMF4dp60XZebLvxz911mri" });
    }else if (course === "S3" && subCourse === "Cours") {
        pdfs.push({ name: "S3  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S3" && subCourse === "TD") {
        pdfs.push({ name: "S3  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S3" && subCourse === "TP") {
        pdfs.push({ name: "S3  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "Cours") {
        pdfs.push({ name: "S4  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "TD") {
        pdfs.push({ name: "S4  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S4" && subCourse === "TP") {
        pdfs.push({ name: "S4  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "Cours") {
        pdfs.push({ name: "S5  - Pas de cours pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "TD") {
        pdfs.push({ name: "S5  - Pas de tds pour le moment", path: `${courseFolder}lab1.pdf` });
    }else if (course === "S5" && subCourse === "TP") {
        pdfs.push({ name: "S5  - Pas de tps pour le moment", path: `${courseFolder}lab1.pdf` });
    }
    return pdfs;
}

window.onload = function() {
    let updates = [
        "📢 Mise à jour 1 : Nouveau cours,tp ajouté en S2."
    ];

    let messageBox = document.createElement("div");
    messageBox.style.position = "fixed";
    messageBox.style.top = "10px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.backgroundColor = "green";  
    messageBox.style.color = "white";
    messageBox.style.padding = "15px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
    messageBox.style.zIndex = "1000";
    messageBox.style.fontFamily = "Arial, sans-serif";
    messageBox.style.fontSize = "16px";
    messageBox.style.textAlign = "left";
    messageBox.style.width = "80%"; // Takes 90% of the screen width
    messageBox.style.maxWidth = "600px"; // Limits max width for larger screens

    let messageContent = updates.map(update => `<p style="margin: 5px 0;">${update}</p>`).join("");
    messageBox.innerHTML = messageContent;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 7000); // Disappears after 7 seconds
};
