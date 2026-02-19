/**
 * SettingsManager - Gestiona la lógica del modal de configuración del usuario
 */
class SettingsManager {
    constructor() {
        this.modalId = 'settings-modal';
    }

    /**
     * Abre el modal de configuración del usuario
     */
    openSettingsModal(currentUser, userManager, renderProblemCategoriesFn) {
        const modal = document.getElementById(this.modalId);
        if (!modal) return;

        // Rellenar nombre actual
        const nameInput = document.getElementById('settings-edit-name');
        if (nameInput && currentUser) {
            nameInput.value = currentUser;
        }

        // Rellenar checkboxes de operaciones desde el usuario actual
        const user = userManager.getCurrentUser();
        if (user && user.ops) {
            const cfgSum = document.getElementById('cfg-sum');
            const cfgRes = document.getElementById('cfg-res');
            const cfgMul = document.getElementById('cfg-mul');
            const cfgDiv = document.getElementById('cfg-div');
            if (cfgSum) cfgSum.checked = user.ops.includes('+');
            if (cfgRes) cfgRes.checked = user.ops.includes('-');
            if (cfgMul) cfgMul.checked = user.ops.includes('*');
            if (cfgDiv) cfgDiv.checked = user.ops.includes('/');
        }

        // Rellenar config de hints
        const hintsConfig = userManager.getHintsConfig();
        const cfgHintsEnabled = document.getElementById('cfg-hints-enabled');
        const cfgHintsDelayDisplay = document.getElementById('cfg-hints-delay-display');
        const hintsDelayRow = document.getElementById('hints-delay-row');
        if (cfgHintsEnabled) cfgHintsEnabled.checked = hintsConfig.enabled;
        if (cfgHintsDelayDisplay) cfgHintsDelayDisplay.textContent = hintsConfig.delay;
        if (hintsDelayRow) hintsDelayRow.style.display = hintsConfig.enabled ? 'flex' : 'none';

        // Renderizar categorías de problemas dentro del modal
        if (typeof renderProblemCategoriesFn === 'function') {
            renderProblemCategoriesFn();
        }

        modal.classList.add('active');
    }

    /**
     * Cierra el modal de configuración y guarda los cambios
     */
    closeSettingsModal(userManager, syncCallback) {
        // Guardar ops seleccionadas en el usuario
        const user = userManager.getCurrentUser();
        if (user) {
            user.ops = [];
            if (document.getElementById('cfg-sum')?.checked) user.ops.push('+');
            if (document.getElementById('cfg-res')?.checked) user.ops.push('-');
            if (document.getElementById('cfg-mul')?.checked) user.ops.push('*');
            if (document.getElementById('cfg-div')?.checked) user.ops.push('/');

            // Si quedó vacío, mantener sumas por defecto
            if (user.ops.length === 0) user.ops = ['+'];
        }

        // Guardar hints config
        const cfgHintsEnabled = document.getElementById('cfg-hints-enabled');
        const cfgHintsDelayDisplay = document.getElementById('cfg-hints-delay-display');
        const hintsEnabled = cfgHintsEnabled ? cfgHintsEnabled.checked : false;
        const hintsDelay = cfgHintsDelayDisplay ? parseInt(cfgHintsDelayDisplay.textContent, 10) : 12;
        userManager.setHintsConfig(hintsEnabled, hintsDelay);

        // Guardar cambios persistentes
        userManager.saveToStorage();

        if (typeof syncCallback === 'function') {
            syncCallback();
        }

        const modal = document.getElementById(this.modalId);
        if (modal) modal.classList.remove('active');
    }

    /**
     * Toggle visibilidad del row de delay cuando se activa/desactiva hints
     */
    onHintsEnabledChange() {
        const cfgHintsEnabled = document.getElementById('cfg-hints-enabled');
        const hintsDelayRow = document.getElementById('hints-delay-row');
        if (hintsDelayRow) {
            hintsDelayRow.style.display = cfgHintsEnabled?.checked ? 'flex' : 'none';
        }
    }

    /**
     * Ajusta el valor del delay de hints (+1 / -1 segundo)
     * @param {number} delta - +1 o -1
     */
    adjustHintDelay(delta) {
        const display = document.getElementById('cfg-hints-delay-display');
        if (!display) return;
        const current = parseInt(display.textContent, 10) || 12;
        const newVal = Math.max(1, Math.min(30, current + delta));
        display.textContent = newVal;
    }

    /**
     * Guarda el nombre de usuario editado desde el modal de settings
     */
    saveUserName(userManager, tFn, updateUIfn) {
        const input = document.getElementById('settings-edit-name');
        if (!input) return;

        const rawName = input.value.trim();
        const newName = rawName.replace(/[<>"'&]/g, '');
        const oldName = userManager.getCurrentUserName();

        if (!newName) {
            return alert(tFn('alert_invalid_name'));
        }
        if (newName === oldName) return;

        const usersObj = userManager.getUsers();
        if (usersObj[newName]) {
            return alert(tFn('alert_invalid_name'));
        }

        // Copiar usuario con nuevo nombre
        usersObj[newName] = JSON.parse(JSON.stringify(usersObj[oldName]));
        delete usersObj[oldName];
        userManager.saveToStorage();

        // Actualizar currentUser en manager
        userManager.currentUser = newName;

        if (typeof updateUIfn === 'function') {
            updateUIfn(newName);
        }

        alert(tFn('alert_name_updated'));
        userManager.renderUserList();
        userManager.renderLeaderboard();
    }
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsManager;
}

// Hacer disponible globalmente para navegadores
if (typeof window !== 'undefined') {
    window.SettingsManager = SettingsManager;
}
