
document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
    FILTROS DEL MENÚ
    ========================================= */
    const filterButtons =
        document.querySelectorAll("[data-filter]");
    const groups =
        document.querySelectorAll(
            ".menu-group[data-category]"
        );
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter =
                button.dataset.filter;
            /* Quitar active */
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });
            /* Activar botón */
            button.classList.add("active");
            /* Mostrar categorías */
            groups.forEach(group => {
                if (
                    filter === "all" ||
                    group.dataset.category === filter
                ) {
                    group.style.display = "";
                } else {
                    group.style.display = "none";
                }
            });
        });
    });

    /* =========================================
        FORMULARIO DE RESERVAS
    ========================================= */
    const form =
        document.getElementById(
            "reservationForm"
        );
    if (form) {
        const dateInput =
            form.querySelector(
                'input[type="date"]'
            );
        /* No permitir fechas anteriores */
        const today =
            new Date()
                .toISOString()
                .split("T")[0];
        dateInput.min = today;
        form.addEventListener(
            "submit",
            (event) => {
                event.preventDefault();
                /* Validar */
                if (!form.checkValidity()) {
                    form.classList.add(
                        "was-validated"
                    );
                    return;
                }
                /* Obtener información */
                const data =
                    new FormData(form);
                const nombre =
                    data.get("nombre");
                /* Mensaje */
                const message =
                    document.getElementById(
                        "reservationMessage"
                    );
                message.innerHTML = `
                    <div
                        class="alert alert-success mt-3"
                        role="alert">
                        <strong>
                            ¡Gracias, ${nombre}!
                        </strong>
                        <br>
                        Recibimos tu solicitud
                        de reserva.
                        Te contactaremos para
                        confirmar disponibilidad.
                    </div>
                `;
                /* Limpiar formulario */
                form.reset();
                form.classList.remove(
                    "was-validated"
                );
                dateInput.min = today;
            }
        );
    }
});