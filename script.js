document.addEventListener("DOMContentLoaded", function () {
    
    // --- CAPTURA DE ELEMENTOS ---
    const folderProyectos = document.getElementById("folder-proyectos"); 
    const dockFinder = document.getElementById("dock-finder");
    const windowGallery = document.getElementById("window-gallery");
    const widgetBody = document.getElementById("widget-body");
    
    const btnClose = document.getElementById("close-widget");
    const btnMinimize = document.getElementById("minimize-widget");
    const btnMaximize = document.getElementById("maximize-widget");
    const dragHeader = document.getElementById("window-drag-zone");

    const appleTrigger = document.getElementById("apple-trigger");
    const appleDropdown = document.getElementById("apple-dropdown-menu");
    const menuReset = document.getElementById("menu-reset");
    const menuAbout = document.getElementById("menu-about");
    const menuPowerOff = document.getElementById("menu-poweroff");

    let isMaximized = false;
    let originalStyles = {};

    // --- 1. MOSTRAR / ABRIR EL WIDGET ---
    function openWidget() {
        if (!windowGallery) return;
        windowGallery.style.display = "block";
        windowGallery.style.opacity = "1";
        windowGallery.style.zIndex = "1000";
    }

    folderProyectos?.addEventListener("click", openWidget);
    dockFinder?.addEventListener("click", openWidget);

    // --- 2. CONTROLES DEL SEMÁFORO MAC ---
    btnClose?.addEventListener("click", function (e) {
        e.stopPropagation();
        if (windowGallery) windowGallery.style.display = "none";
    });

    btnMinimize?.addEventListener("click", function (e) {
        e.stopPropagation();
        if (widgetBody) {
            widgetBody.style.display = widgetBody.style.display === "none" ? "block" : "none";
        }
    });

    btnMaximize?.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!windowGallery) return;

        if (isMaximized) {
            windowGallery.style.top = originalStyles.top;
            windowGallery.style.left = originalStyles.left;
            windowGallery.style.width = originalStyles.width;
            windowGallery.style.height = originalStyles.height;
            windowGallery.style.transform = "none";
            isMaximized = false;
        } else {
            const rect = windowGallery.getBoundingClientRect();
            originalStyles = {
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`
            };
            
            windowGallery.style.top = "24px";
            windowGallery.style.left = "0px";
            windowGallery.style.width = "100vw";
            windowGallery.style.height = "calc(100vh - 24px)";
            isMaximized = true;
        }
    });

    // --- 3. SISTEMA ARRASTRABLE (DRAGGABLE) ---
    let isDragging = false;
    let offsetX, offsetY;

    dragHeader?.addEventListener("mousedown", function (e) {
        if (isMaximized || !windowGallery) return;
        isDragging = true;
        
        const rect = windowGallery.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        windowGallery.style.zIndex = "1000";
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging || !windowGallery) return;
        
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        
        if (newY < 24) newY = 24;

        windowGallery.style.left = `${newX}px`;
        windowGallery.style.top = `${newY}px`;
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
    });

    windowGallery?.addEventListener("mousedown", function() {
        windowGallery.style.zIndex = "1000";
    });

    // --- 4. RELOJ SISTEMA MAC ---
    function actualizarRelojMac() {
        const contenedorReloj = document.getElementById("mac-clock");
        if (!contenedorReloj) return;

        const ahora = new Date();
        const opcionesFecha = { weekday: 'short', day: 'numeric', month: 'short' };
        let fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);
        
        fechaFormateada = fechaFormateada.replace('.', '');

        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        
        contenedorReloj.textContent = `${fechaFormateada} ${horas}:${minutos}`;
    }

    actualizarRelojMac();
    setInterval(actualizarRelojMac, 1000);

    // --- 5. MENÚ DESPLEGABLE APPLE NATIVO ---
    appleTrigger?.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!appleDropdown) return;
        
        const isOpened = appleDropdown.style.display === "block";
        if (isOpened) {
            appleDropdown.style.display = "none";
            appleTrigger.classList.remove("active-menu");
        } else {
            appleDropdown.style.display = "block";
            appleTrigger.classList.add("active-menu");
        }
    });

    document.addEventListener("click", function (e) {
        if (appleTrigger && appleDropdown && !appleTrigger.contains(e.target) && !appleDropdown.contains(e.target)) {
            appleDropdown.style.display = "none";
            appleTrigger.classList.remove("active-menu");
        }
    });

    menuReset?.addEventListener("click", function () {
        window.location.reload();
    });

    menuAbout?.addEventListener("click", function () {
        alert("freskOS De La Sierra version 10.13.6\nWeb Portfolio\nDiseño Industrial, Creative Tech & Visual Dev\nVersión 1.1.3.4 (Vanilla JS)");
    });

    menuPowerOff?.addEventListener("click", function () {
        if(confirm("¿Seguro que deseas simular el apagado de freskOS?")) {
            const wrap = document.getElementById("wrap");
            if (wrap) {
                wrap.style.filter = "brightness(0)";
                wrap.style.transition = "filter 2s ease";
            }
        }
    });
});
